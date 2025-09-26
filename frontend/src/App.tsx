import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  id: number;
  text: string;
  options?: { id: number, text: string }[];
}

interface Quiz {
  quizId: number;
  title: string;
  questions: Question[]

}

function App() {

  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const response = axios.get("http://localhost:3000/quizzes/1/questions");
    response.then(res => {
      setQuiz(res.data);
      console.log(res.data);
    })
  }, [])

  return (
    <div>
      <h2>{quiz?.title}</h2>

      {quiz?.questions.map(q => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <div>{q.text}</div>
          <div style={{ paddingLeft: "20px" }}>
            {q.options?.map(o => (
              <div key={o.id}>{o.text}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App
