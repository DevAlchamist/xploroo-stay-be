const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }], // Array of Review ObjectIds
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of Review ObjectIds
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Array of Review ObjectIds
});

const Bookings = mongoose.model("Bookings", bookingSchema);
module.exports = Bookings;
