const { default: mongoose } = require("mongoose");
const razorpay = require("../config/razorpay.js");
const Bookings = require("../models/booking.model.js");
const Payment = require("../models/pyament.model.js");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const {
      propertyId,
      userId,
      checkIn,
      checkOut,
      guests,
      amount,
      paymentMethod,
    } = req.body;
    console.log(req.body);
    if (!propertyId || !userId || !checkIn || !checkOut || !guests || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create an order in the database
    const order = new Bookings({
      property: propertyId,
      user: userId,
      checkIn,
      checkOut,
      guests,
      amount,
      paymentMethod: "upi",
      status: "pending",
    });

    await order.save();

    let razorpayOrder = null;
    if (paymentMethod !== "cash") {
      razorpayOrder = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: order._id.toString(),
      });

      order.razorpayOrderId = razorpayOrder.id;
      await order.save();
    }

    res.status(201).json({ order, razorpayOrder });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: req.body.amount,
      status: "Paid",
    });

    await payment.save();

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getKey = async (req, res) => {
  try {
    const razorpayKey = process.env.RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      return res.status(500).json({ error: "Razorpay Key not configured" });
    }

    res.json({ key: razorpayKey });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Razorpay Key" });
  }
};
const getUserBooking = async (req, res) => {
  try {
    const { userId, propertyId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(propertyId)
    ) {
      return res.status(400).json({ message: "Invalid userId or propertyId" });
    }

    const booking = await Bookings.findOne({
      user: userId,
      property: propertyId,
      status: "pending",
    });

    if (!booking) {
      return res.status(404).json({ message: "No pending booking found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { verifyPayment, getUserBooking, createOrder, getKey };
