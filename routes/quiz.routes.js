const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getActiveQuizzes,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getSubmissionsForQuiz,
  markQuizAsEnded,
} = require("../controllers/quiz.controller");
const { submitAnswer } = require("../controllers/submission.controller");

// CRUD routes for quizzes
router.get("/", getActiveQuizzes); // Active quizzes
router.get("/all", getAllQuizzes); // All quizzes (admin-only)
router.get("/:id", getQuizById); // Get a single quiz
router.post("/", createQuiz); // Create a new quiz
router.put("/:id", updateQuiz); // Update quiz by ID (admin-only)
router.delete("/:id", deleteQuiz); // Delete quiz by ID (admin-only)
router.post("/:quizId/submit", submitAnswer);

// Other routes
router.get("/:id/submissions", getSubmissionsForQuiz); // Get all submissions for a quiz
router.post("/:id/mark-ended", markQuizAsEnded); // Mark quiz as ended manually

module.exports = router;
