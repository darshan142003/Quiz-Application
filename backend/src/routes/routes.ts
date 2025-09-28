import { Router } from "express";
import { getQuizQuestions, getQuizzes, submitQuiz } from "../controller/quizController";

const router = Router();


router.get("/quiz", getQuizzes);
router.get("/:id/questions", getQuizQuestions);
router.post("/:id/submit", submitQuiz);

export default router;
