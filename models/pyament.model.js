const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: Number,
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  },
  { timestamps: true }
);
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
