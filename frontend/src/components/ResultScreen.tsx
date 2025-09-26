import CircularProgressBar from "./CircularProgressBar";

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

    return (
        <div className="min-h-screen flex">
            <div className="w-80 flex-shrink-0 bg-gray-50 p-8 sticky top-0 h-screen flex items-center justify-center">
                <div className="text-center">
                    <CircularProgressBar
                        score={result.score}
                        total={result.total}
                        label="SCORE"
                        size={200}
                    />

                    <div className="mt-6 space-y-2">
                        <div className="text-sm text-gray-600">
                            Quiz Results
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {((result.score / result.total) * 100).toFixed(1)}% Complete
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <div className="max-w-3xl mx-auto">

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Quiz Results
                            </h1>
                            <p className="text-gray-600">
                                Review your answers and see where you can improve
                            </p>
                        </div>

                        <div className="space-y-6">
                            {result.results.map((r, index) => {
                                const q = quiz?.questions.find((q) => q.id === r.questionId);
                                const userAnswerText = q?.options?.find(
                                    (o) => answers.find((a) => a.questionId === q.id)?.optionId === o.id
                                )?.text;

                                return (
                                    <div
                                        key={r.questionId}
                                        className={`relative p-6 rounded-xl shadow-sm border-2 transition-all duration-200 ${r.isCorrect
                                            ? "bg-green-50 border-green-200 hover:bg-green-100"
                                            : "bg-red-50 border-red-200 hover:bg-red-100"
                                            }`}
                                    >
                                        <div className="absolute -top-3 -left-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${r.isCorrect ? "bg-green-500" : "bg-red-500"
                                                }`}>
                                                {index + 1}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                                                {q?.text}
                                            </h3>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">

                                            <div className="bg-white rounded-lg p-4 border border-green-200">
                                                <div className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-green-800 mb-1">
                                                            Correct Answer
                                                        </p>
                                                        <p className="text-gray-900 font-medium">
                                                            {r.correctAnswer.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`bg-white rounded-lg p-4 border ${r.isCorrect ? "border-green-200" : "border-red-200"
                                                }`}>
                                                <div className="flex items-start space-x-3">
                                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${r.isCorrect
                                                        ? "bg-green-100"
                                                        : "bg-red-100"
                                                        }`}>
                                                        {r.isCorrect ? (
                                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`text-sm font-medium mb-1 ${r.isCorrect ? "text-green-800" : "text-red-800"
                                                            }`}>
                                                            Your Answer
                                                        </p>
                                                        <p className={`font-medium ${r.isCorrect ? "text-gray-900" : "text-red-700"
                                                            }`}>
                                                            {userAnswerText || "No Answer"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="h-8"></div>
                    </div>
                </div>
            </div>
        </div>
    );

}
