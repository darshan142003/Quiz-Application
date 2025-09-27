interface NavigationButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    color?: "gray" | "blue" | "green";
    type?: "previous" | "next" | "submit";
    currentIndex?: number;
    totalQuestions?: number;
    onNavigate?: (newIndex: number) => void;
}

export default function NavigationButton({
    text,
    onClick,
    disabled = false,
    color = "gray",
    type,
    currentIndex = 0,
    totalQuestions = 0,
    onNavigate,
}: NavigationButtonProps) {
    const colorClasses = {
        gray: "bg-gray-600 hover:bg-gray-500",
        blue: "bg-blue-600 hover:bg-blue-500",
        green: "bg-green-600 hover:bg-green-500",
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }

        if (type === "previous" && currentIndex > 0 && onNavigate) {
            onNavigate(currentIndex - 1);
        } else if (type === "next" && currentIndex < totalQuestions - 1 && onNavigate) {
            onNavigate(currentIndex + 1);
        }
    };

    const isDisabled = disabled ||
        (type === "previous" && currentIndex === 0) ||
        (type === "next" && currentIndex >= totalQuestions - 1);

    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-lg text-white disabled:opacity-50 ${colorClasses[color]}`}
        >
            {text}
        </button>
    );
}
