"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.quizService = {
    getAllQuizzes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.quiz.findMany({
                    select: { id: true, title: true, description: true }
                });
            }
            catch (error) {
                throw new Error('Failed to fetch quizzes');
            }
        });
    },
    getQuizById(quizId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.quiz.findUnique({
                    where: { id: quizId },
                    include: {
                        questions: {
                            include: { options: true }
                        }
                    }
                });
            }
            catch (error) {
                throw new Error('Failed to fetch quiz');
            }
        });
    },
    calculateScore(quiz, userAnswers) {
        return __awaiter(this, void 0, void 0, function* () {
            let score = 0;
            const results = quiz.questions.map(q => {
                const userAnswer = userAnswers.find(a => a.questionId === q.id);
                const correctOption = q.options.find(o => o.isCorrect);
                const isCorrect = (userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.optionId) === (correctOption === null || correctOption === void 0 ? void 0 : correctOption.id);
                if (isCorrect)
                    score++;
                return { questionId: q.id, isCorrect, correctAnswer: correctOption };
            });
            return { score, total: quiz.questions.length, results };
        });
    }
};
