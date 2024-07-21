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
  imageUrl: {
    type: String,
  },
  bounds: {
    north: { type: Number, required: true },
    east: { type: Number, required: true },
    south: { type: Number, required: true },
    west: { type: Number, required: true },
  },
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
