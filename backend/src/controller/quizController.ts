import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//Types
interface UserAnswer {
    questionId: number;
    optionId: number;
}

interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

interface Quiz {
    id: number;
    title: string;
    questions: Question[];
}


//*************HELPER FUNCTIONS*********** */

//returns the specific quiz along with its question
export const findQuiz = async (quizId: number) => {

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

    return quiz;
}


//return the score of the quiz as per the answers submitted by user
function calculateScore(quiz: Quiz, userAnswers: UserAnswer[]) {
    let score = 0;

    const results = quiz.questions.map(q => {
        const userAnswer = userAnswers.find(a => a.questionId === q.id);
        const correctOption = q.options.find(o => o.isCorrect);
        const isCorrect = userAnswer?.optionId === correctOption?.id;

        if (isCorrect) score++;

        return { questionId: q.id, isCorrect, correctAnswer: correctOption };
    });

    return { score, total: quiz.questions.length, results };
}



//returns all the quiz with it its title 
export const getQuiz = async (req: Request, res: Response) => {
    const quiz = await prisma.quiz.findMany();
    res.json(quiz);

}


//returns all the questions for perticular quiz
export const getQuestions = async (req: Request, res: Response) => {

    const quizId = parseInt(req.params.id);

    const quiz = await findQuiz(quizId);

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

//returns score of the user along with its quiz analysis
export const submitQuiz = async (req: Request, res: Response) => {
    const quizId = parseInt(req.params.id);
    const userAnswers: UserAnswer[] = req.body.answers;

    const quiz = await findQuiz(quizId);

    if (!quiz) return res.status(404).json({ message: "Quiz not found!!" });

    const { score, total, results } = calculateScore(quiz, userAnswers);

    res.json({ score, total, results });
};

