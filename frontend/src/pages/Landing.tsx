import { useNavigate } from "react-router-dom";
import { useQuizList } from "../hooks/useQuizList";
import QuizCard from "../components/QuizCard";

export default function Landing() {
    const navigate = useNavigate();
    const { quizzes, loading, error, refetch } = useQuizList();

    const handleClick = (id: number) => {
        navigate(`/quiz/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading quizzes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <h3 className="text-red-800 font-semibold mb-2">Error</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!quizzes || quizzes.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-medium text-gray-500">No quizzes available</p>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            <div className="flex flex-col items-center space-y-8 p-10 w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Available Quizzes</h1>
                {quizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        id={quiz.id}
                        title={quiz.title}
                        description={quiz.description}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </div>
    );
}
