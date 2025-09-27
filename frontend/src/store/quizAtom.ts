// store/quizStore.ts
import { atom } from "recoil";

interface Option {
    id: number;
    text: string;
    isCorrect?: boolean;
    questionId?: number;
}

interface Question {
    id: number;
    text: string;
    options?: Option[];
}

interface Quiz {
    quizId: number;
    title: string;
    questions: Question[];
}

export const quizState = atom<Quiz | null>({
    key: "quizState",
    default: null,
});
