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
const mockFindUnique = jest.fn();
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        quiz: {
            findUnique: mockFindUnique
        }
    }))
}));
const quizController_1 = require("../controller/quizController");
const mockRequest = (params, body) => ({
    params,
    body
});
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
describe('submitQuiz Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return correct score for all correct answers', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFindUnique.mockResolvedValue({
            id: 1,
            title: 'Test Quiz',
            questions: [
                {
                    id: 1,
                    text: 'What is 2 + 2?',
                    options: [
                        { id: 1, text: '3', isCorrect: false },
                        { id: 2, text: '4', isCorrect: true },
                        { id: 3, text: '5', isCorrect: false }
                    ]
                },
                {
                    id: 2,
                    text: 'Capital of France?',
                    options: [
                        { id: 4, text: 'London', isCorrect: false },
                        { id: 5, text: 'Paris', isCorrect: true }
                    ]
                }
            ]
        });
        const req = mockRequest({ id: '1' }, {
            answers: [
                { questionId: 1, optionId: 2 },
                { questionId: 2, optionId: 5 }
            ]
        });
        const res = mockResponse();
        yield (0, quizController_1.submitQuiz)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            score: 2,
            total: 2,
            results: [
                {
                    questionId: 1,
                    isCorrect: true,
                    correctAnswer: { id: 2, text: '4', isCorrect: true }
                },
                {
                    questionId: 2,
                    isCorrect: true,
                    correctAnswer: { id: 5, text: 'Paris', isCorrect: true }
                }
            ]
        });
    }));
    it('should return partial score for mixed answers', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFindUnique.mockResolvedValue({
            id: 1,
            title: 'Test Quiz',
            questions: [
                {
                    id: 1,
                    text: 'What is 2 + 2?',
                    options: [
                        { id: 1, text: '3', isCorrect: false },
                        { id: 2, text: '4', isCorrect: true }
                    ]
                },
                {
                    id: 2,
                    text: 'Capital of France?',
                    options: [
                        { id: 4, text: 'London', isCorrect: false },
                        { id: 5, text: 'Paris', isCorrect: true }
                    ]
                }
            ]
        });
        const req = mockRequest({ id: '1' }, {
            answers: [
                { questionId: 1, optionId: 2 },
                { questionId: 2, optionId: 4 }
            ]
        });
        const res = mockResponse();
        yield (0, quizController_1.submitQuiz)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            score: 1,
            total: 2,
            results: [
                {
                    questionId: 1,
                    isCorrect: true,
                    correctAnswer: { id: 2, text: '4', isCorrect: true }
                },
                {
                    questionId: 2,
                    isCorrect: false,
                    correctAnswer: { id: 5, text: 'Paris', isCorrect: true }
                }
            ]
        });
    }));
    it('should return 404 for non-existent quiz', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFindUnique.mockResolvedValue(null);
        const req = mockRequest({ id: '999' }, { answers: [] });
        const res = mockResponse();
        yield (0, quizController_1.submitQuiz)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Quiz not found!!'
        });
    }));
    it('should handle empty answers array', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFindUnique.mockResolvedValue({
            id: 1,
            title: 'Test Quiz',
            questions: [
                {
                    id: 1,
                    text: 'What is 2 + 2?',
                    options: [
                        { id: 1, text: '3', isCorrect: false },
                        { id: 2, text: '4', isCorrect: true }
                    ]
                }
            ]
        });
        const req = mockRequest({ id: '1' }, { answers: [] });
        const res = mockResponse();
        yield (0, quizController_1.submitQuiz)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            score: 0,
            total: 1,
            results: [
                {
                    questionId: 1,
                    isCorrect: false,
                    correctAnswer: { id: 2, text: '4', isCorrect: true }
                }
            ]
        });
    }));
});
