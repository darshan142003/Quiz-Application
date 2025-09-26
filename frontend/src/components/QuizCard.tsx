
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
            className="w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col"
        >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
    );
}
