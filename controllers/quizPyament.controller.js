const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const QuizPayment = require("../models/quizPayment.model");

const createQuizOrder = async (req, res) => {
  try {
    const { userId, quizId } = req.body;
    console.log(req.body);
    const amount = 100 * 100; // ₹100 in paisa
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `${quizId}-${Date.now()}`,
    });
    console.log(order);
    const newPayment = new QuizPayment({
      userId,
      quizId,
      razorpay_order_id: order.id,
      amount,
    });

    await newPayment.save();

    res.status(201).json({ order });
  } catch (error) {
    console.error("Quiz Order Error:", error);
    res.status(500).json({ error: "Failed to create quiz payment order" });
  }
};

const verifyQuizPayment = async (req, res) => {
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
        .json({ success: false, message: "Invalid signature" });
    }

    const updated = await QuizPayment.findOneAndUpdate(
      { razorpay_order_id },
      {
        razorpay_payment_id,
        razorpay_signature,
        status: "Paid",
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Payment record not found" });
    }

    res.json({ success: true, message: "Payment verified", payment: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const hasUserPaidForQuiz = async (req, res) => {
  try {
    const { userId, quizId } = req.query;

    const payment = await QuizPayment.findOne({
      userId,
      quizId,
      status: "Paid",
    });

    if (!payment) {
      return res.status(403).json({ allowed: false });
    }

    res.json({ allowed: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createQuizOrder,
  verifyQuizPayment,
  hasUserPaidForQuiz,
};
