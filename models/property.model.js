const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  guests: { type: Number, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  amenities: {
    wifi: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Array of Review ObjectIds
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
