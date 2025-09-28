import { useState, useEffect } from 'react';
import axios from 'axios';
import { type QuizListItem } from '../types/quiz.types';

interface UseQuizListReturn {
    quizzes: QuizListItem[] | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useQuizList = (): UseQuizListReturn => {
    const [quizzes, setQuizzes] = useState<QuizListItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("http://localhost:3000/api/quiz");
            setQuizzes(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load quizzes';
            setError(errorMessage);
            console.error('Error fetching quizzes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return {
        quizzes,
        loading,
        error,
        refetch: fetchQuizzes,
    };
};
