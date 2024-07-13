const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  days: {
    type: [Object],
    default: [],
  },
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
