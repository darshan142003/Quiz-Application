import { Request, Response } from "express";
import { quizService } from "../services/quizService";
import { type UserAnswer } from "../types/quiz.types";

export const getQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quizzes' });
    }
};

export const getQuizQuestions = async (req: Request, res: Response) => {
    try {
        const quizId = parseInt(req.params.id);
        if (isNaN(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }

        const quiz = await quizService.getQuizById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found!" });
        }

        const questions = quiz.questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options.map(o => ({
                id: o.id,
                text: o.text
            }))
        }));

        res.json({ quizId: quiz.id, title: quiz.title, questions });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quiz questions' });
    }
};

export const submitQuiz = async (req: Request, res: Response) => {
    try {
        const quizId = parseInt(req.params.id);
        const userAnswers: UserAnswer[] = req.body.answers;

        if (isNaN(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }

        if (!userAnswers || !Array.isArray(userAnswers)) {
            return res.status(400).json({ message: 'Invalid answers format' });
        }

        const quiz = await quizService.getQuizById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found!" });
        }

        const result = await quizService.calculateScore(quiz, userAnswers);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit quiz' });
    }
};
