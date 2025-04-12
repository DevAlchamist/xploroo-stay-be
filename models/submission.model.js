const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    attempts: { type: Number, default: 1 },
    timeTaken: { type: Number }, // when user started
    isCorrect: { type: Boolean, default: false },
    lastAnswer: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);
