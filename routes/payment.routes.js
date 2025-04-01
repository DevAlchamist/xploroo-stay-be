const express = require("express");
const {
  createOrder,
  verifyPayment,
  getKey,
  getUserBooking,
} = require("../controllers/payment.controller.js");

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/get-key", getKey);
router.get("/bookings/user/:userId/property/:propertyId", getUserBooking);

module.exports = router;
