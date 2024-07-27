const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  itineraries: {
    type: [String],
    default: [],
  },
  preferences: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
