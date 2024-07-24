const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const Day = require("../models/dayModel"); // Import the Day model
const Itinerary = require("../models/itineraryModel");
const generateDay = require("../replicate/generateDay");
const getAddressFromLocation = require("../google/getAddressFromLocation");
const getCoordsFromLocation = require("../google/getCoordsFromLocation");
const getImageFromSearch = require("../google/getImageFromSearch");

// Get all days for an itinerary
router.get("/:itineraryId", async (req, res) => {
  try {
    console.log("In get by itinerary id: ", req.params.itineraryId);
    const days = await Day.find({ parentItineraryId: req.params.itineraryId });
    res.status(200).json(days);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new day
router.post("/", async (req, res) => {
  console.log("In days.js");
  const day = new Day(req.body.day);
  console.log("In days.js", req.body);
  try {
    const newDay = await day.save();
    res.status(201).json(newDay);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reorder all days by itinerary id
router.put("/reorder", async (req, res) => {
  const itineraryId = req.body.itineraryId;
  const days = req.body.days;
  try {
    days.forEach(async (day) => {
      await Day.updateOne(
        { parentItineraryId: day.parentItineraryId, id: day.id },
        {
          $set: {
            dayNumber: day.dayNumber,
            date: day.date,
            overview: day.overview,
            imageUrl: day.imageUrl,
            activities: day.activities,
          },
        }
      );
    });

    res.status(200).json({
      itineraryId: itineraryId,
      days,
      message: "Days reordered successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reorder all activities by day id
router.put("/activities/reorder", async (req, res) => {
  const dayId = req.body.dayId;
  const activities = req.body.activities;
  try {
    const day = await Day.updateOne(
      { id: dayId },
      { $set: { activities: activities } }
    );

    res.status(200).json({
      dayId: dayId,
      activities,
      message: "activities reordered successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/generate", async (req, res) => {
  const { itineraryId } = req.body;

  try {
    const itinerary = await Itinerary.findOne({ id: itineraryId });
    const days = await Day.find({ parentItineraryId: itineraryId });

    const lastDate = days
      .map((day) => day.date)
      .reduce((a, b) => (Date.parse(a) > Date.parse(b) ? a : b));
    const currentActivities = days
      .map((day) => day.activities.map((activity) => activity.activity))
      .flat();

    const aiResponse = JSON.parse(
      await generateDay(itinerary.location, currentActivities.join(", "))
    );

    const imageUrl = await getImageFromSearch(
      `${aiResponse.activities[0].location}, ${itinerary.location}`
    );

    const newActivities = [];
    for (const [index, activity] of aiResponse.activities.entries()) {
      const address = await getAddressFromLocation(
        `${activity.location}, ${itinerary.location}`
      );
      const coordinates = await getCoordsFromLocation(
        `${activity.location}, ${itinerary.location}`
      );

      newActivities.push({
        time: activity.time,
        activity: activity.location,
        activityNumber: index + 1,
        address: address,
        coordinates: coordinates,
      });
    }

    const newDay = new Day({
      id: uuid(),
      parentItineraryId: itineraryId,
      dayNumber: days.length + 1,
      date: new Date(lastDate.setDate(lastDate.getDate() + 1)),
      overview: `Day ${days.length + 1} in ${itinerary.location}`,
      imageUrl: imageUrl,
      activities: newActivities,
    });

    await newDay.save();
    res.status(201).send(newDay);
  } catch (e) {
    res.status(400).send(`error generating new day: ${e}`);
  }
});

// Update an existing day
router.put("/:itineraryId/:dayNumber", async (req, res) => {
  try {
    const { itineraryId, dayNumber } = req.params;
    const updatedFields = req.body;

    const updatedDay = await Day.findOneAndUpdate(
      { parentItineraryId: itineraryId, dayNumber: dayNumber },
      updatedFields,
      { new: true } // Returns the updated document
    );

    if (!updatedDay) {
      return res.status(404).json({ message: "Day not found" });
    }

    res.status(200).json(updatedDay);
  } catch (error) {
    console.error("Error updating day:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a day
router.delete("/:itineraryId/:id", async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ id: req.params.itineraryId });
    const startDate = itinerary.startDate;

    await Day.findOneAndDelete({
      parentItineraryId: req.params.itineraryId,
      id: req.params.id,
    });

    const days = await Day.find({
      parentItineraryId: req.params.itineraryId,
    }).sort({ dayNumber: 1 });

    for (const [index, day] of days.entries()) {
      await Day.updateOne(
        { id: day.id },
        { $set: { dayNumber: index + 1, date: new Date(startDate) } }
      );
      startDate.setDate(startDate.getDate() + 1);
    }
    res.status(200).json({ message: "Day deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
