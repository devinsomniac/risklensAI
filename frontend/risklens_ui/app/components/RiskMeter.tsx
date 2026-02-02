type RiskMeterProps = {
  score: number; // 0–100
};

export default function RiskMeter({ score }: RiskMeterProps) {
  const radius = 80;
  const stroke = 14;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const clampedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset =
    circumference - (clampedScore / 100) * circumference;

  function getColor(score: number) {
    if (score <= 30) return "#2e7d32"; // green
    if (score <= 60) return "#f9a825"; // amber
    return "#c62828"; // red
  }

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={getColor(clampedScore)}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        {/* Center text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="-4"
          className="fill-[#003d5c] text-3xl font-bold"
        >
          {clampedScore}%
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="20"
          className="fill-gray-500 text-xs tracking-wide"
        >
          DEFAULT RISK
        </text>
      </svg>

      {/* Legend */}
      <div className="flex gap-6 text-xs mt-2">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 bg-[#2e7d32] rounded-full" /> Low (0–30)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 bg-[#f9a825] rounded-full" /> Medium (31–60)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 bg-[#c62828] rounded-full" /> High (61–100)
        </span>
      </div>
    </div>
  );
}
