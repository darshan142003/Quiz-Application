import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        return (
            <div className="p-6 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">
                    Score: {result.score} / {result.total}
                </h2>
                <div className="w-full max-w-xl space-y-4">
                    {result.results.map((r) => {
                        const q = quiz?.questions.find((q) => q.id === r.questionId);
                        return (
                            <div
                                key={r.questionId}
                                className={`p-4 rounded-lg shadow ${r.isCorrect ? "bg-green-200" : "bg-red-200"
                                    }`}
                            >
                                <h3 className="font-semibold">{q?.text}</h3>
                                <p>
                                    Correct Answer:{" "}
                                    <span className="font-medium">{r.correctAnswer.text}</span>
                                </p>
                                <p>
                                    Your Answer:{" "}
                                    <span
                                        className={
                                            r.isCorrect ? "text-green-700" : "text-red-700"
                                        }
                                    >
                                        {
                                            q?.options?.find(
                                                (o) =>
                                                    answers.find((a) => a.questionId === q.id)
                                                        ?.optionId === o.id
                                            )?.text
                                        }
                                    </span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-6">{quiz?.title}</h2>

            {currentQuestion && (
                <div className="w-full max-w-xl bg-gray-800 text-white rounded-lg shadow-lg p-6">
                    <p className="text-lg font-medium mb-4">
                        Question {currentIndex + 1} of {quiz?.questions.length}
                    </p>
                    <h3 className="text-xl mb-6">{currentQuestion.text}</h3>

                    <div className="space-y-3">
                        {currentQuestion.options?.map((o) => {
                            const selected = answers.find(
                                (a) =>
                                    a.questionId === currentQuestion.id && a.optionId === o.id
                            );
                            return (
                                <button
                                    key={o.id}
                                    onClick={() => handleClick(currentQuestion.id, o.id)}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition ${selected
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-700 hover:bg-gray-600"
                                        }`}
                                >
                                    {o.text}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between w-full max-w-xl mt-6">
                <button
                    onClick={prevQuestion}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-gray-600 rounded-lg text-white disabled:opacity-50"
                >
                    Previous
                </button>
                {quiz && currentIndex === quiz.questions.length - 1 ? (
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-green-600 rounded-lg text-white"
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={nextQuestion}
                        className="px-4 py-2 bg-blue-600 rounded-lg text-white"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}
