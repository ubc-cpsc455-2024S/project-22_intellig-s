const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  id: { type: String, required: true },
  parentItineraryId: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  overview: { type: String, required: true },
  imageUrl: { type: String, required: true },
  activities: [
    {
      time: { type: String, required: true },
      activity: { type: String, required: true },
    },
  ],
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;
