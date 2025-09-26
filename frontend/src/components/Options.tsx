interface OptionProps {
    text: string;
    selected: boolean;
    onClick: () => void;
}

export default function Option({ text, selected, onClick }: OptionProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-5 py-3 rounded-lg font-medium transition-all duration-200 shadow ${selected
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
        >
            {text}
        </button>
    );
}
