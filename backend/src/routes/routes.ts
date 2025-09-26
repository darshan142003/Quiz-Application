import { Router } from "express";
import { getQuestions, getQuiz, submitQuiz } from "../controller/quizController";


const router = Router();

router.get("/:id/questions", getQuestions);
router.post("/:id/submit", submitQuiz);
router.get("/quiz", getQuiz);

export default router;