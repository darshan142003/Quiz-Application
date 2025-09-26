import { Router } from "express";
import { getQuiz, submitQuiz } from "../controller/quizController";


const router = Router();

router.get("/:id/questions", getQuiz);
router.post("/:id/submit", submitQuiz);


export default router;