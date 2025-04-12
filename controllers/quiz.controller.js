const Quiz = require("../models/quiz.model");
const Submission = require("../models/submission.model");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get active quizzes (quizzes that haven't ended)
exports.getActiveQuizzes = async (req, res) => {
  const now = new Date();
  try {
    const quizzes = await Quiz.find({ active: true });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all quizzes (active and ended)
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
  console.log(req.params);
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get all submissions for a quiz
exports.getSubmissionsForQuiz = async (req, res) => {
  try {
    const submissions = await Submission.find({ quiz: req.params.id });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark a quiz as ended manually
exports.markQuizAsEnded = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Mark the quiz as ended
    quiz.isEnded = true;
    await quiz.save();
    res.json({ message: "Quiz marked as ended" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
