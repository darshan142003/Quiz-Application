interface QuizCardProps {
    id: number;
    title: string;
    description: string;
    onClick: (id: number) => void;
}

export default function QuizCard({ id, title, description, onClick }: QuizCardProps) {
    return (
        <div
            onClick={() => onClick(id)}
            className="w-full max-w-4xl bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer p-10 flex flex-col justify-between"
        >

            <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>


            <p className="text-gray-700 text-lg mb-8">{description}</p>


            <div>
                <span className="text-blue-600 font-semibold inline-flex items-center hover:underline">
                    Start Quiz
                    <svg
                        className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </span>
            </div>
        </div>
    );
}
