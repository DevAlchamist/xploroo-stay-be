const cron = require("node-cron");
const Quiz = require("../models/Quiz");
const Submission = require("../models/Submission");

cron.schedule("59 23 * * *", async () => {
  const now = new Date();
  const quizzes = await Quiz.find({ endsAt: { $lte: now }, isEnded: false });

  for (const quiz of quizzes) {
    const submissions = await Submission.find({ quiz: quiz._id, isCorrect: true });

    const sorted = submissions.sort((a, b) => {
      const timeA = new Date(a.endTime) - new Date(a.createdAt);
      const timeB = new Date(b.endTime) - new Date(b.createdAt);
      if (timeA === timeB) return a.attempts - b.attempts;
      return timeA - timeB;
    });

    const winners = sorted.slice(0, quiz.numberOfWinners).map((s) => s.user);
    quiz.winners = winners;
    quiz.isEnded = true;
    await quiz.save();
  }

  console.log("Quiz check job completed");
});
