const express = require("express");
const router = express.Router();
const {
  createQuizOrder,
  verifyQuizPayment,
  hasUserPaidForQuiz,
} = require("../controllers/quizPyament.controller");

router.post("/quiz/order", createQuizOrder);
router.post("/quiz/verify", verifyQuizPayment);
router.get("/quiz/access", hasUserPaidForQuiz);

module.exports = router;
