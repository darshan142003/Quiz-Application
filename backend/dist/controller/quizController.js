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
exports.submitQuiz = exports.getQuizQuestions = exports.getQuizzes = void 0;
const quizService_1 = require("../services/quizService");
const getQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield quizService_1.quizService.getAllQuizzes();
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch quizzes' });
    }
});
exports.getQuizzes = getQuizzes;
const getQuizQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = parseInt(req.params.id);
        if (isNaN(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }
        const quiz = yield quizService_1.quizService.getQuizById(quizId);
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
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch quiz questions' });
    }
});
exports.getQuizQuestions = getQuizQuestions;
const submitQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = parseInt(req.params.id);
        const userAnswers = req.body.answers;
        if (isNaN(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }
        if (!userAnswers || !Array.isArray(userAnswers)) {
            return res.status(400).json({ message: 'Invalid answers format' });
        }
        const quiz = yield quizService_1.quizService.getQuizById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found!" });
        }
        const result = yield quizService_1.quizService.calculateScore(quiz, userAnswers);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to submit quiz' });
    }
});
exports.submitQuiz = submitQuiz;
