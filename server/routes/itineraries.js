var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");

const Itinerary = require("../models/itineraryModel");

const generateItinerary = require("../replicate/generateItinerary");

/* GET itineraries listing. */
router.get("/", async function (req, res, next) {
  res.send(await Itinerary.find());
});

router.post("/", async function (req, res, next) {
  const { location, startDate, endDate } = req.body;

  console.log(req.body);
  const response = JSON.parse(
    await generateItinerary(location, startDate, endDate)
  );

  let itinerary = new Itinerary({
    id: uuid(),
    location: location,
    startDate: startDate,
    endDate: endDate,
    days: response.days,
  });

  itinerary.save();

  res.send(itinerary);
});

router.delete("/:itineraryId", async function (req, res, next) {
  const itineraryId = req.params.itineraryId;

  await Itinerary.deleteOne({ id: itineraryId });
  return res.status(200).send({ message: "Member deleted successfully" });
});

module.exports = router;
