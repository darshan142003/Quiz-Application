import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Quiz, type Result, type UserAnswer } from '../types/quiz.types';

interface UseQuizReturn {
    quiz: Quiz | null;
    loading: boolean;
    submissionLoading: boolean;
    result: Result | null;
    error: string | null;
    submitQuiz: (answers: UserAnswer[]) => Promise<void>;
}

export const useQuiz = (id: string): UseQuizReturn => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`http://localhost:3000/api/${id}/questions`);
                setQuiz(response.data);
            } catch (err) {
                setError('Failed to load quiz');
                console.error('Error fetching quiz:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchQuiz();
        }
    }, [id]);

    const submitQuiz = async (answers: UserAnswer[]) => {
        try {
            setSubmissionLoading(true);
            setError(null);
            const response = await axios.post(`http://localhost:3000/api/${id}/submit`, {
                answers,
            });
            setResult(response.data);
        } catch (err) {
            setError('Failed to submit quiz');
            console.error('Error submitting answers:', err);
        } finally {
            setSubmissionLoading(false);
        }
    };


    return {
        quiz,
        loading,
        submissionLoading,
        result,
        error,
        submitQuiz,
    };
};
