import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { quizState } from "../store/quizAtom";
import { useQuiz } from "../hooks/useQuiz";
import { type UserAnswer } from "../types/quiz.types";
import Option from "../components/Options";
import NavigationButton from "../components/NavigationButton";
import ResultScreen from "../components/ResultScreen";
import QuizTimer from "../components/Timer";

export default function Quiz() {
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useRecoilState(quizState);
    const [answers, setAnswers] = useState<UserAnswer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const {
        quiz: fetchedQuiz,
        loading,
        submissionLoading,
        result,
        error,
        submitQuiz
    } = useQuiz(id!);

    useEffect(() => {
        if (fetchedQuiz && !quiz) {
            setQuiz(fetchedQuiz);
        }
    }, [fetchedQuiz, quiz, setQuiz]);

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
        await submitQuiz(answers);
    };

    const currentQuestion = quiz?.questions[currentIndex];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (submissionLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Submitting your answers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (result) {
        return <ResultScreen result={result} quiz={quiz} answers={answers} />;
    }

    return (
        <div className="h-[calc(100vh-100px)] w-screen bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden">
            <div className="flex-shrink-0 h-16 flex justify-between items-center px-4 sm:px-6 bg-white border-b border-gray-200">
                <div>
                    <span className="text-sm text-gray-500">Question {currentIndex + 1} of {quiz?.questions.length}</span>
                </div>
                <QuizTimer duration={45} onTimeUp={onSubmit} />
            </div>

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

            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-4 min-h-0">
                <div className="w-full max-w-4xl mx-auto">
                    {currentQuestion && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
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

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <NavigationButton
                                    text="Previous"
                                    type="previous"
                                    currentIndex={currentIndex}
                                    totalQuestions={quiz?.questions.length || 0}
                                    onNavigate={setCurrentIndex}
                                    color="gray"
                                />

                                <div className="flex items-center space-x-1 order-first sm:order-none">
                                    {quiz?.questions.slice(0, 8).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentIndex
                                                ? "bg-blue-500 scale-125"
                                                : answers.some(
                                                    (a) => a.questionId === quiz.questions[index].id
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
                                        type="next"
                                        currentIndex={currentIndex}
                                        totalQuestions={quiz?.questions.length || 0}
                                        onNavigate={setCurrentIndex}
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
