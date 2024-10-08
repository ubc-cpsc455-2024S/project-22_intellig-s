var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");
const ics = require("ics");

const path = require("path");
const pupeteer = require("puppeteer");

const Itinerary = require("../models/itineraryModel");
const Day = require("../models/dayModel");
const User = require("../models/userModel");

const generateItinerary = require("../replicate/generateItinerary");
const debugJson = require("../replicate/debugJson");

const getImageFromSearch = require("../google/getImageFromSearch");
const getBoundsFromLocation = require("../google/getBoundsFromLocation");
const getCoordsFromLocation = require("../google/getCoordsFromLocation");
const getAddressFromLocation = require("../google/getAddressFromLocation");
const { verifyToken } = require("../utils/jwtUtils");
const retry = require("../utils/retry");

/* GET itineraries listing. */
router.get("/", verifyToken, async function (req, res, next) {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error occurred connecting to the database" });
  }

  try {
    res.send(await Itinerary.find({ userId: userId }).sort({ $natural: -1 }));
  } catch (e) {
    res.status(500).json({
      message: `Getting itineraries from database failed, ${e.message}`,
    });
  }
});

router.get("/explore", async function (req, res, next) {
  try {
    res.send(
      await Itinerary.find({ userId: { $exists: false } }).sort({
        $natural: -1,
      })
    );
  } catch (e) {
    res.status(500).json({
      message: `Getting itineraries from database failed, ${e.message}`,
    });
  }
});

router.get("/cal/:itineraryId", verifyToken, async (req, res, next) => {
  const { itineraryId } = req.params;

  try {
    const days = await Day.find({ parentItineraryId: itineraryId });

    const events = days
      .map((day) =>
        day.activities.map((activity, index) => {
          const date = new Date(day.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return {
            title: activity.activity,
            start: Date.parse(`${date}, ${activity.time}`),
            end:
              index + 1 < day.activities.length
                ? Date.parse(`${date}, ${day.activities[index + 1].time}`)
                : undefined,
            duration:
              index + 1 === day.activities.length
                ? { hours: 2, minutes: 30 }
                : undefined,
            location: activity.address,
          };
        })
      )
      .flat();

    const cal = ics.createEvents(events);

    return res
      .set({
        "Content-Type": "text/calendar",
      })
      .status(200)
      .send(cal.value);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/pdf/:itineraryId", verifyToken, async (req, res, next) => {
  const { itineraryId } = req.params;
  try {
    const itinerary = await Itinerary.findOne({ id: itineraryId });
    const days = await Day.find({ parentItineraryId: itineraryId });
    const itineraryLocation = itinerary.location;

    const diffTime = Math.abs(
      new Date(itinerary.endDate) - new Date(itinerary.startDate)
    );
    const welcomeMessage = `Welcome to your ${
      Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
    }-day getaway`;

    const dayComponents = days
      .map((day) => {
        return `
      <article id="intro">
        <h2 class="major">Day ${day.dayNumber}</h2>
        <span style="display: flex; justify-content: center; align-items: center;"><img src="${
          day.imageUrl
        }" alt="" height="200" width="200"/></span>
        </br>
        <ol>
        ${day.activities
          .map((activity) => {
            return `
          <li>
            ${activity.activity}
            <ul>
              <li>${activity.time}</li>
              <li>${activity.address}</li>
            </ul>
          </li>
          `;
          })
          .join("\n")}
        </ol>
      </article>
      `;
      })
      .join("\n");

    const browser = await pupeteer.launch();
    const page = await browser.newPage();

    const filePath = path.resolve(__dirname, "..", "pdf", "index.html");
    await page.goto(`file://${filePath}`, { waitUntil: "domcontentloaded" });

    await page.evaluate(
      async (location, welcome, days) => {
        console.log("here");
        const locationElement = document.getElementById("itinerary-location");
        if (locationElement) locationElement.textContent = location;

        const welcomeElement = document.getElementById("itinerary-welcome");
        welcomeElement.textContent = welcome;

        const mainElement = document.getElementById("main");
        mainElement.innerHTML = days;

        const images = Array.from(document.querySelectorAll("img"));
        await Promise.all(
          images.map((img) => {
            if (img.complete) return;
            return new Promise((resolve, reject) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", resolve);
            });
          })
        );
      },
      itineraryLocation,
      welcomeMessage,
      dayComponents
    );

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      printBackground: true,
      format: "letter",
    });
    await browser.close();

    return res
      .set({
        "Content-Type": "application/pdf",
      })
      .status(200)
      .send(pdfBuffer);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/", verifyToken, async function (req, res, next) {
  const { location, startDate, endDate } = req.body;
  const userId = req.user.id;

  let preferences = {};
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.preferences) {
      preferences = user.preferences;
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error occurred connecting to the database" });
  }
  try {
    const aiResponse = await retry(2, async () => {
      const jsonString = await generateItinerary(
        location,
        startDate,
        endDate,
        preferences
      );

      try {
        return JSON.parse(jsonString);
      } catch (e) {
        console.log("debugging json");
        return JSON.parse(await debugJson(jsonString));
      }
    });

    const itineraryId = uuid();
    const bounds = await getBoundsFromLocation(location);
    let dayDate = new Date(startDate);
    let index = 1;

    for (const day of aiResponse.days) {
      const dayImageUrl = await getImageFromSearch(day.activities[0].location);

      const activities = [];
      for (const [index, activity] of day.activities.entries()) {
        const coords = await getCoordsFromLocation(
          `${activity.location}, ${location}`
        );
        const address = await getAddressFromLocation(
          `${activity.location}, ${location}`
        );

        activities.push({
          time: activity.time,
          activity: activity.location,
          activityNumber: index + 1,
          address: address,
          coordinates: coords,
        });
      }

      const newDay = new Day({
        id: uuid(),
        parentItineraryId: itineraryId,
        dayNumber: index,
        date: dayDate,
        overview: `Day ${index} in ${location}`,
        imageUrl: dayImageUrl,
        activities: activities,
      });
      await newDay.save();

      dayDate.setDate(dayDate.getDate() + 1);
      index++;
    }

    const itineraryImageUrl = await getImageFromSearch(location);

    let itinerary = new Itinerary({
      id: itineraryId,
      location: location,
      startDate: startDate,
      endDate: endDate,
      imageUrl: itineraryImageUrl,
      bounds: bounds,
      userId: userId,
    });

    itinerary.save();
    res.send(itinerary);
  } catch (e) {
    res.status(500).json({
      message: `Error during itinerary creation. Error message: ${e.message}`,
    });
  }
});

router.delete("/:itineraryId", verifyToken, async function (req, res, next) {
  const { itineraryId } = req.params;
  const userId = req.user.id;

  try {
    const itinerary = await Itinerary.findOne({ id: itineraryId });
    if (itinerary.userId !== userId)
      return res
        .status(403)
        .json({ message: "Not authorized to delete this itinerary" });

    await Day.deleteMany({ parentItineraryId: itineraryId });
    await Itinerary.deleteOne({ id: itineraryId });
    return res.status(200).send({ message: "Itinerary deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was a problem with the database connection" });
  }
});

module.exports = router;
