export interface Option {
    id: number;
    text: string;
    isCorrect?: boolean;
    questionId?: number;
}

export interface Question {
    id: number;
    text: string;
    options?: Option[];
}

export interface Quiz {
    quizId: number;
    title: string;
    questions: Question[];
}


export interface UserAnswer {
    questionId: number;
    optionId: number;
}

export interface Result {
    score: number;
    total: number;
    results: {
        questionId: number;
        isCorrect: boolean;
        correctAnswer: Option;
    }[];
}

export interface QuizListItem {
    id: number;
    title: string;
    description: string;
}
