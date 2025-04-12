const Submission = require("../models/submission.model");
const Quiz = require("../models/quiz.model");

exports.submitAnswer = async (req, res) => {
  const { answer, userId, timeTaken } = req.body; // timeTaken comes from frontend
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz || !quiz.active) {
    return res.status(400).json({ message: "Quiz is not active" });
  }

  if (!answer || answer.trim() === "") {
    return res.status(400).json({ message: "Answer cannot be empty" });
  }

  const isCorrect =
  answer.trim().toLowerCase() === quiz.correctAnswer?.trim().toLowerCase();


  try {
    let submission = await Submission.findOne({ user: userId, quiz: quiz._id });

    if (!submission) {
      submission = await Submission.create({
        user: userId,
        quiz: quiz._id,
        attempts: 1,
        lastAnswer: answer,
        isCorrect,
        timeTaken: isCorrect ? timeTaken : undefined,
      });
    } else {
      submission.attempts += 1;
      submission.lastAnswer = answer;

      if (isCorrect && !submission.isCorrect) {
        submission.isCorrect = true;
        submission.timeTaken = timeTaken;
      }

      await submission.save();
    }

    if (!quiz.participants.includes(userId)) {
      quiz.participants.push(userId);
      await quiz.save();
    }

    res.json({
      isCorrect,
      attempts: submission.attempts,
      timeTaken: isCorrect ? timeTaken : null,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
