const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    clues: [
      {
        type: {
          type: String, // "text" or "image"
          enum: ["text", "image"],
          required: true,
        },
        content: {
          type: String, // actual text or image URL
          required: true,
        },
      },
    ],
    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    numberOfWinners: { type: Number, default: 1 },
    active: { type: Boolean, default: true }, // Mark inactive after the day ends
    endsAt: { type: Date, required: true }, // Used to end the quiz daily
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
