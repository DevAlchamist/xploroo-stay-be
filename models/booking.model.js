const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  razorpayOrderId: { type: String },
  status: { type: String, enum: ["pending", "confirmed", "failed"], default: "pending" }
});

const Bookings = mongoose.model("Bookings", bookingSchema);
module.exports = Bookings;
