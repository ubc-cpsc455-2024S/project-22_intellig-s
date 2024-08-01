const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: String,
  userId: String,
  data: Buffer,
  contentType: String,
});

imageSchema.methods.toJSON = function () {
  let image = this.toObject();
  delete image.data;
  return image;
};

const Photo = mongoose.model("Photo", imageSchema);

module.exports = Photo;
