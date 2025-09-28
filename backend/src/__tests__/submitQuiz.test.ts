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

describe('submitQuiz Score Calculation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should calculate score correctly for all correct answers', async () => {
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

    it('should calculate score correctly for mixed correct/incorrect answers', async () => {
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

    it('should calculate score correctly for all wrong answers', async () => {
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
                    { questionId: 1, optionId: 1 },
                    { questionId: 2, optionId: 4 }
                ]
            }
        );
        const res = mockResponse();

        await submitQuiz(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({
            score: 0,
            total: 2,
            results: [
                {
                    questionId: 1,
                    isCorrect: false,
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

    it('should calculate score correctly when no answers provided', async () => {
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

    it('should calculate score correctly when some questions are unanswered', async () => {
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
                    { questionId: 1, optionId: 2 }

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
});
