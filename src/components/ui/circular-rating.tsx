import React from 'react';

interface CircularRatingProps {
    rating: number; // 0 to 10
    size?: number;
    strokeWidth?: number;
}

const CircularRating: React.FC<CircularRatingProps> = ({
    rating,
    size = 34,
    strokeWidth = 3
}) => {
    const percentage = rating * 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    // Determine color based on rating
    let strokeColor = "#21d07a"; // Green
    let trackColor = "#204529";  // Dark Green

    if (percentage < 70) {
        strokeColor = "#d2d531"; // Yellow
        trackColor = "#423d0f";  // Dark Yellow
    }
    if (percentage < 40) {
        strokeColor = "#db2360"; // Red
        trackColor = "#571435";  // Dark Red
    }
    if (percentage === 0) {
        strokeColor = "#666666";
        trackColor = "#666666";
    }

    return (
        <div
            className="relative flex items-center justify-center bg-gray-900 rounded-full"
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="rotate-[-90deg]"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute text-white font-bold text-[10px]">
                {percentage > 0 ? (
                    <>
                        {Math.round(percentage)}<span className="text-[6px] align-top">%</span>
                    </>
                ) : (
                    "NR"
                )}
            </div>
        </div>
    );
};

export default CircularRating;
