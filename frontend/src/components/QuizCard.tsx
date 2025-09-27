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
            className="group w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer p-8 flex flex-col gap-6"
        >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                {title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                {description}
            </p>

            {/* Call to Action */}
            <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                    Start Quiz
                </span>

                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
                    <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
