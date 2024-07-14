var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");

const Itinerary = require("../models/itineraryModel");

const getImageFromSearch = require("../google/getImageFromSearch");
const generateItinerary = require("../replicate/generateItinerary");
const Day = require("../models/Day");

/* GET itineraries listing. */
router.get("/", async function (req, res, next) {
  res.send(await Itinerary.find());
});

router.post("/", async function (req, res, next) {
  const { location, startDate, endDate } = req.body;

  const response = JSON.parse(
    await generateItinerary(location, startDate, endDate)
  );

  const itineraryId = uuid();

  let dayDate = new Date(startDate);
  let index = 1;

  for (const day of response.days) {
    dayId = uuid();
    const dayImageUrl = await getImageFromSearch(day.activities[0].location);

    const newDay = new Day({
      id: uuid(),
      parentItineraryId: itineraryId,
      dayNumber: index,
      date: dayDate.setDate(dayDate.getDate() + 1),
      overview: `Day ${index} in ${location}`,
      imageUrl: dayImageUrl,
      activities: day.activities.map((activity) => {
        return { time: activity.time, activity: activity.location };
      }),
    });

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
  });

  itinerary.save();

  res.send(itinerary);
});

router.delete("/:itineraryId", async function (req, res, next) {
  const itineraryId = req.params.itineraryId;

  await Day.deleteMany({ parentItineraryId: itineraryId });
  await Itinerary.deleteOne({ id: itineraryId });
  return res.status(200).send({ message: "Member deleted successfully" });
});

module.exports = router;
