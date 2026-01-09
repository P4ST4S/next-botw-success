"use client";

interface Props {
  completed: number;
  total: number;
  percentage: number;
}

export function ProgressGauge({ completed, total, percentage }: Props) {
  return (
    <div className="relative">
      {/* Outer frame */}
      <div className="w-full max-w-2xl mx-auto h-12 bg-sheikah-card border-2 border-sheikah-blue rounded-full relative overflow-hidden">
        {/* Inner progress bar */}
        <div
          className="h-full bg-gradient-to-r from-sheikah-blue to-sheikah-gold transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Animated glow */}
          <div className="absolute inset-0 animate-pulse opacity-60"></div>
        </div>

        {/* Progress text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-lg z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ color: percentage > 50 ? "#0a0a0a" : "#00FDFF" }}>
            {completed} / {total}
          </span>
        </div>
      </div>

      {/* Percentage indicator */}
      <div className="text-center mt-2 font-bold text-2xl text-sheikah-blue">
        {percentage}%
      </div>
    </div>
  );
}
