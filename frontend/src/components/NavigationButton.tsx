
interface NavigationButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    color?: "gray" | "blue" | "green";
}

export default function NavigationButton({
    text,
    onClick,
    disabled = false,
    color = "gray",
}: NavigationButtonProps) {
    const colorClasses = {
        gray: "bg-gray-600 hover:bg-gray-500",
        blue: "bg-blue-600 hover:bg-blue-500",
        green: "bg-green-600 hover:bg-green-500",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg text-white disabled:opacity-50 ${colorClasses[color]}`}
        >
            {text}
        </button>
    );
}
