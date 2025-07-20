const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  type: String,
  price: Number,
  bedrooms: String,
  tenure: String,
  added: Date,
  postcode: String,
  title: String,
  shortDescription: String,
  longDescription: String,
  image: String,
  images: [String],
  floorPlan: String,
  googleMap: String
});

module.exports = mongoose.model("Property", PropertySchema);
