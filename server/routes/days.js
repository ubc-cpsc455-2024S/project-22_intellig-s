const express = require("express");
const router = express.Router();
const Day = require("../models/dayModel"); // Import the Day model

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
    await Day.findOneAndDelete({
      parentItineraryId: req.params.itineraryId,
      id: req.params.id,
    });
    res.status(200).json({ message: "Day deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
