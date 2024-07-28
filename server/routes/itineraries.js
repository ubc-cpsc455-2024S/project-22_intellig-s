var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");
const ics = require("ics");

const Itinerary = require("../models/itineraryModel");
const Day = require("../models/dayModel");
const User = require("../models/userModel");

const generateItinerary = require("../replicate/generateItinerary");
const getImageFromSearch = require("../google/getImageFromSearch");
const getBoundsFromLocation = require("../google/getBoundsFromLocation");
const getCoordsFromLocation = require("../google/getCoordsFromLocation");
const getAddressFromLocation = require("../google/getAddressFromLocation");

validateUserId = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error occurred connecting to the database" });
  }
  return null;
};

async function retry(maxRetries, fn) {
  return await fn().catch(function (err) {
    if (maxRetries <= 0) {
      throw err;
    }
    console.log(err.message);
    return retry(maxRetries - 1, fn);
  });
}

/* GET itineraries listing. */
router.get("/:userId", async function (req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error occurred connecting to the database" });
  }

  try {
    res.send(await Itinerary.find({ userId: userId }));
  } catch (e) {
    res
      .status(500)
      .json({ message: `Getting itineraries from database, ${e.message}` });
  }
});

router.get("/cal/:itineraryId", async (req, res, next) => {
  const itineraryId = req.params.itineraryId;

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
        "Content-Disposition": `attachment; filename="itinerary.ics"`,
      })
      .status(200)
      .send(cal.value);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/:userId", async function (req, res, next) {
  const { location, startDate, endDate } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error occurred connecting to the database" });
  }

  try {
    const aiResponse = await retry(3, async () =>
      JSON.parse(await generateItinerary(location, startDate, endDate))
    );

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

      dayDate.setDate(dayDate.getDate() + 1);

      await newDay.save();
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

router.delete("/:itineraryId", async function (req, res, next) {
  const itineraryId = req.params.itineraryId;

  await Day.deleteMany({ parentItineraryId: itineraryId });
  await Itinerary.deleteOne({ id: itineraryId });
  return res.status(200).send({ message: "Member deleted successfully" });
});

module.exports = router;
