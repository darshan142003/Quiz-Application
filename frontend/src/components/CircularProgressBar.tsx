
const CircularProgressBar = ({
    score = 0,
    total = 100,
    size = 200,
    stroke = 8,
    progressColor = "#10b981",
    backgroundColor = "#f3f4f6",
    showPercentage = true,
    label = "",
    animationDuration = 1.2,
    glowEffect = true
}) => {
    const radius = size / 2;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const percentage = total ? Math.min((score / total) * 100, 100) : 0;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`${label || 'Progress'}: ${score} out of ${total}`}
        >

            <svg
                height={size}
                width={size}
                className="transform -rotate-90"
            >

                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={progressColor} stopOpacity="1" />
                        <stop offset="50%" stopColor="#059669" stopOpacity="1" />
                        <stop offset="100%" stopColor="#047857" stopOpacity="1" />
                    </linearGradient>

                    {glowEffect && (
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    )}
                </defs>

                <circle
                    stroke={backgroundColor}
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

                <circle
                    stroke="url(#progressGradient)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    filter={glowEffect ? "url(#glow)" : "none"}
                    style={{
                        transition: `stroke-dashoffset ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                    }}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">

                <div className="text-center">
                    <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-3xl font-bold text-gray-900 tracking-tight">
                            {score}
                        </span>
                        <span className="text-lg text-gray-500 font-medium">
                            /{total}
                        </span>
                    </div>

                    {showPercentage && (
                        <div className="mt-1">
                            <span className="text-sm font-semibold text-emerald-600">
                                {percentage.toFixed(0)}%
                            </span>
                        </div>
                    )}

                    {label && (
                        <div className="mt-2">
                            <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                                {label}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CircularProgressBar;
