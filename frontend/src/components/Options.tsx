
interface OptionProps {
    text: string;
    selected: boolean;
    onClick: () => void;
}

export default function Option({ text, selected, onClick }: OptionProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${selected
                ? "bg-green-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
        >
            {text}
        </button>
    );
}
