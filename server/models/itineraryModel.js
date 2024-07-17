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
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
