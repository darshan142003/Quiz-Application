import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Option from "../components/Options";
import Question from "../components/Question";
import NavigationButton from "../components/NavigationButton";
import ResultScreen from "../components/ResultScreen";
import { useRecoilState } from "recoil";
import { quizState } from "../store/quizAtom";
import QuizTimer from "../components/Timer";

interface Option {
    id: number;
    text: string;
    isCorrect?: boolean;
    questionId?: number;
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
    const [quiz, setQuiz] = useRecoilState(quizState);
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
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Submitting your answers...</p>
                </div>
            </div>
        );
    }

    if (result) {
        return <ResultScreen result={result} quiz={quiz} answers={answers} />;
    }

    return (
        <div className="h-[calc(100vh-100px)] w-screen bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden">
            {/* Header with Timer - Fixed height */}
            <div className="flex-shrink-0 h-16 flex justify-between items-center px-4 sm:px-6 bg-white border-b border-gray-200">
                <div>
                    <span className="text-sm text-gray-500">Question {currentIndex + 1} of {quiz?.questions.length}</span>
                </div>
                <QuizTimer duration={45} onTimeUp={onSubmit} />
            </div>

            {/* Progress Bar - Fixed height */}
            <div className="flex-shrink-0 h-3 flex items-center px-4 sm:px-6 bg-white">
                <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-300"
                        style={{
                            width: `${((currentIndex + 1) / (quiz?.questions.length || 1)) * 100}%`
                        }}
                    />
                </div>
            </div>

            {/* Main Content Area - Flexible height */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-4 min-h-0">
                <div className="w-full max-w-4xl mx-auto">
                    {currentQuestion && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                            {/* Question and Options */}
                            <div className="mb-6">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 leading-tight">
                                    {currentQuestion.text}
                                </h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {currentQuestion?.options?.map((option) => (
                                        <Option
                                            key={option.id}
                                            text={option.text}
                                            selected={answers.some(
                                                (a) =>
                                                    a.questionId === currentQuestion.id &&
                                                    a.optionId === option.id
                                            )}
                                            onClick={() =>
                                                handleClick(currentQuestion.id, option.id)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <NavigationButton
                                    text="Previous"
                                    onClick={prevQuestion}
                                    disabled={currentIndex === 0}
                                    color="gray"
                                />

                                {/* Question Dots */}
                                <div className="flex items-center space-x-1 order-first sm:order-none">
                                    {quiz?.questions.slice(0, 8).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentIndex
                                                ? "bg-blue-500 scale-125"
                                                : answers.some(
                                                    (a) =>
                                                        a.questionId ===
                                                        quiz.questions[index].id
                                                )
                                                    ? "bg-green-400"
                                                    : "bg-gray-300"
                                                }`}
                                        />
                                    ))}
                                    {quiz && quiz.questions.length > 8 && (
                                        <span className="text-xs text-gray-500 ml-1">
                                            +{quiz.questions.length - 8}
                                        </span>
                                    )}
                                </div>

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
                    )}
                </div>
            </div>
        </div>
    );
}

