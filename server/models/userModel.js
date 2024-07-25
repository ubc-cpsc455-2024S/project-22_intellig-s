const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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
  itineraries: [{
    type: Schema.Types.ObjectId,
    ref: 'Itinerary'
  }],
  preferences: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
