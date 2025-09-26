
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

interface Result {
    score: number;
    total: number;
    results: {
        questionId: number;
        isCorrect: boolean;
        correctAnswer: Option;
    }[];
}

interface Props {
    result: Result;
    quiz: { questions: Question[] } | null;
    answers: { questionId: number; optionId: number }[];
}

export default function ResultScreen({ result, quiz, answers }: Props) {
    const radius = 60;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset =
        circumference - (result.score / result.total) * circumference;

    return (
        <div className="p-6 flex flex-col items-center space-y-8">
            {/* Circular Progress */}
            <div className="relative w-36 h-36">
                <svg height={radius * 2} width={radius * 2}>
                    <circle
                        stroke="#d1d5db"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#22c55e"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{result.score}</span>
                    <span className="text-gray-500">/ {result.total}</span>
                </div>
            </div>

            <div className="w-full max-w-xl space-y-4">
                {result.results.map((r) => {
                    const q = quiz?.questions.find((q) => q.id === r.questionId);
                    const userAnswerText = q?.options?.find(
                        (o) => answers.find((a) => a.questionId === q.id)?.optionId === o.id
                    )?.text;

                    return (
                        <div
                            key={r.questionId}
                            className={`p-4 rounded-lg shadow ${r.isCorrect ? "bg-green-100" : "bg-red-100"
                                }`}
                        >
                            <h3 className="font-semibold mb-2">{q?.text}</h3>
                            <p>
                                Correct Answer:{" "}
                                <span className="font-medium">{r.correctAnswer.text}</span>
                            </p>
                            <p>
                                Your Answer:{" "}
                                <span className={r.isCorrect ? "text-green-700" : "text-red-700"}>
                                    {userAnswerText || "No Answer"}
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
