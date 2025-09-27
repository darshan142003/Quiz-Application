import { Request, Response } from 'express';


const mockFindUnique = jest.fn();

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        quiz: {
            findUnique: mockFindUnique
        }
    }))
}));

import { submitQuiz } from '../controller/quizController';

const mockRequest = (params: any, body: any): Partial<Request> => ({
    params,
    body
});

const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('submitQuiz Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct score for all correct answers', async () => {
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

        const req = mockRequest(
            { id: '1' },
            {
                answers: [
                    { questionId: 1, optionId: 2 },
                    { questionId: 2, optionId: 5 }
                ]
            }
        );
        const res = mockResponse();

        await submitQuiz(req as Request, res as Response);

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
    });

    it('should return partial score for mixed answers', async () => {
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

        const req = mockRequest(
            { id: '1' },
            {
                answers: [
                    { questionId: 1, optionId: 2 },
                    { questionId: 2, optionId: 4 }
                ]
            }
        );
        const res = mockResponse();

        await submitQuiz(req as Request, res as Response);

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
    });

    it('should return 404 for non-existent quiz', async () => {
        mockFindUnique.mockResolvedValue(null);

        const req = mockRequest({ id: '999' }, { answers: [] });
        const res = mockResponse();

        await submitQuiz(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Quiz not found!!'
        });
    });

    it('should handle empty answers array', async () => {
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

        await submitQuiz(req as Request, res as Response);

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
    });
});
