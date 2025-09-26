
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";

interface Quiz {
    id: number;
    title: string;
    description: string;
}



export default function Landing() {
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz[] | null>(null);

    useEffect(() => {
        async function fetchQuiz() {
            try {
                const response = await axios.get("http://localhost:3000/api/quiz");
                const quiz = response.data;
                setQuiz(quiz);
            } catch (e) {
                console.log(e);
            }
        }

        fetchQuiz();
    }, [])

    const handleClick = (id: number) => {
        navigate(`/quiz/${id}`)
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {quiz ? (
                quiz.map((q) => (
                    <QuizCard
                        key={q.id}
                        id={q.id}
                        title={q.title}
                        description={q.description}
                        onClick={handleClick} // pass your click handler
                    />
                ))
            ) : (
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                    Loading quizzes...
                </p>
            )}
        </div>

    );

}
