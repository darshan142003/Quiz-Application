import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserAnswer {
    questionId: number;
    optionId: number;
}

export const getQuiz = async (req: Request, res: Response) => {

    const quiz = await prisma.quiz.findMany();
    res.json(quiz);

}

export const getQuestions = async (req: Request, res: Response) => {

    const quizId = parseInt(req.params.id);

    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    })

    if (!quiz) return res.status(404).json({ message: "Quiz not found !!" });

    const questions = quiz.questions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options.map(o => ({
            id: o.id,
            text: o.text
        }))
    }));

    res.json({ quizId: quiz.id, title: quiz.title, questions })

}

export const submitQuiz = async (req: Request, res: Response) => {
    const quizId = parseInt(req.params.id);
    const userAnswers: UserAnswer[] = req.body.answers;

    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });

    if (!quiz) return res.json(404).json({ messgae: "Quiz not found!!" });


    let score = 0;

    const results = quiz.questions.map(q => {

        const userAnswer = userAnswers.find(a => a.questionId === q.id);
        const correctOption = q.options.find(o => o.isCorrect);
        const isCorrect = userAnswer?.optionId === correctOption?.id;

        if (isCorrect) score++;

        return { questionId: q.id, isCorrect: isCorrect, correctAnswer: correctOption };
    })

    res.json({ score, total: quiz.questions.length, results });
}

