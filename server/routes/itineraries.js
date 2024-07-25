var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");

const Itinerary = require("../models/itineraryModel");
const Day = require("../models/dayModel");

const generateItinerary = require("../replicate/generateItinerary");
const getImageFromSearch = require("../google/getImageFromSearch");
const getBoundsFromLocation = require("../google/getBoundsFromLocation");
const getCoordsFromLocation = require("../google/getCoordsFromLocation");
const getAddressFromLocation = require("../google/getAddressFromLocation");

/* GET itineraries listing. */
router.get("/", async function (req, res, next) {
  try {
    res.send(await Itinerary.find());
  } catch (e) {
    res
      .status(500)
      .json({ message: `Getting itineraries from database, ${e.message}` });
  }
});

router.post("/", async function (req, res, next) {
  const { location, startDate, endDate } = req.body;

  try {
    const aiResponse = JSON.parse(
      await generateItinerary(location, startDate, endDate)
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
