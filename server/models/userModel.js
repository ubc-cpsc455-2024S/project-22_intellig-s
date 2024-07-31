const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
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
  imageId: {
    type: String,
    required: false,
  },
  preferences: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
