import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Option from "../components/Options";
import Question from "../components/Question";
import NavigationButton from "../components/NavigationButton";
import ResultScreen from "../components/ResultScreen";

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

interface UserAnswer {
    questionId: number;
    optionId: number;
}

interface Result {
    score: number;
    total: number;
    results: {
        questionId: number;
        isCorrect: boolean;
        correctAnswer: Option;
    }[];
}

export default function Quiz() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const { id } = useParams<{ id: string }>();
    const [answers, setAnswers] = useState<UserAnswer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/${id}/questions`).then((res) => {
            setQuiz(res.data);
            console.log(res.data);
        });
    }, [id]);

    const handleClick = (questionId: number, optionId: number) => {
        setAnswers((prev) =>
            prev.some((a) => a.questionId === questionId)
                ? prev.map((a) =>
                    a.questionId === questionId ? { ...a, optionId } : a
                )
                : [...prev, { questionId, optionId }]
        );
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:3000/api/${id}/submit`, {
                answers,
            });
            setResult(response.data);
        } catch (err) {
            console.error("Error submitting answers", err);
        } finally {
            setLoading(false);
        }
    };

    const nextQuestion = () => {
        if (quiz && currentIndex < quiz.questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const currentQuestion = quiz?.questions[currentIndex];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl font-bold">
                Loading...
            </div>
        );
    }

    if (result) {
        return <ResultScreen result={result} quiz={quiz} answers={answers} />;
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-6">{quiz?.title}</h2>

            {currentQuestion && (
                <Question
                    questionId={currentQuestion.id}
                    text={currentQuestion.text}
                    options={currentQuestion.options}
                    selectedOptions={answers}
                    onOptionClick={handleClick}
                    questionNumber={currentIndex + 1}
                    totalQuestions={quiz?.questions.length || 0}
                />
            )}

            <div className="flex justify-between w-full max-w-xl mt-6">
                <NavigationButton
                    text="Previous"
                    onClick={prevQuestion}
                    disabled={currentIndex === 0}
                    color="gray"
                />

                {quiz && currentIndex === quiz.questions.length - 1 ? (
                    <NavigationButton
                        text="Submit"
                        onClick={onSubmit}
                        color="green"
                    />
                ) : (
                    <NavigationButton
                        text="Next"
                        onClick={nextQuestion}
                        color="blue"
                    />
                )}
            </div>
        </div>
    );
}
