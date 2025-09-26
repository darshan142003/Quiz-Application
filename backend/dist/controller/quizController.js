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
exports.submitQuiz = exports.getQuestions = exports.getQuiz = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield prisma.quiz.findMany();
    res.json(quiz);
});
exports.getQuiz = getQuiz;
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = parseInt(req.params.id);
    const quiz = yield prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });
    if (!quiz)
        return res.status(404).json({ message: "Quiz not found !!" });
    const questions = quiz.questions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options.map(o => ({
            id: o.id,
            text: o.text
        }))
    }));
    res.json({ quizId: quiz.id, title: quiz.title, questions });
});
exports.getQuestions = getQuestions;
const submitQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = parseInt(req.params.id);
    const userAnswers = req.body.answers;
    const quiz = yield prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });
    if (!quiz)
        return res.json(404).json({ messgae: "Quiz not found!!" });
    let score = 0;
    const results = quiz.questions.map(q => {
        const userAnswer = userAnswers.find(a => a.questionId === q.id);
        const correctOption = q.options.find(o => o.isCorrect);
        const isCorrect = (userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.optionId) === (correctOption === null || correctOption === void 0 ? void 0 : correctOption.id);
        if (isCorrect)
            score++;
        return { questionId: q.id, isCorrect: isCorrect, correctAnswer: correctOption };
    });
    res.json({ score, total: quiz.questions.length, results });
});
exports.submitQuiz = submitQuiz;
