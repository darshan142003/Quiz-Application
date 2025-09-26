
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            {quiz ? (
                quiz.map(q => (
                    <div onClick={() => handleClick(q.id)} key={q.id} className="m-20 cursor-pointer">
                        <h2>{q.title}</h2>
                        <p>{q.description}</p>
                    </div>
                ))
            ) : (
                <p>Loading quizzes...</p>
            )}
        </div>
    );

}
