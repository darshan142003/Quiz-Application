import { PrismaClient } from "@prisma/client";
import { type Quiz, type UserAnswer } from "../types/quiz.types";
import { handleError } from "../utils/errors";

const prisma = new PrismaClient();

export const quizService = {
    async getAllQuizzes() {
        try {
            return await prisma.quiz.findMany({
                select: { id: true, title: true, description: true }
            });
        } catch (error) {
            throw new Error('Failed to fetch quizzes');
        }
    },

    async getQuizById(quizId: number): Promise<Quiz | null> {
        try {
            return await prisma.quiz.findUnique({
                where: { id: quizId },
                include: {
                    questions: {
                        include: { options: true }
                    }
                }
            }) as Quiz;
        } catch (error) {
            throw new Error('Failed to fetch quiz');
        }
    },

    async calculateScore(quiz: Quiz, userAnswers: UserAnswer[]) {
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
};
