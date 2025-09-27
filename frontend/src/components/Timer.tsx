import { useEffect, useState } from "react";

interface QuizTimerProps {
    duration: number;
    onTimeUp: () => void;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ duration, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState<number>(duration);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / duration) * circumference;

    let color = "green";
    if (timeLeft <= duration * 0.3) color = "red";
    else if (timeLeft <= duration * 0.6) color = "orange";

    return (
        <div style={{ position: "relative", width: "60px", height: "60px" }}>
            <svg width="60" height="60">
                <circle
                    stroke="#ddd"
                    fill="transparent"
                    strokeWidth="6"
                    r={radius}
                    cx="30"
                    cy="30"
                />
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth="6"
                    r={radius}
                    cx="30"
                    cy="30"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
                />
            </svg>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color,
                }}
            >
                {timeLeft}s
            </div>
        </div>
    );
};

export default QuizTimer;
