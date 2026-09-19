import React, { useState } from "react";

export interface ChartSegment {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

interface Props {
  segments: ChartSegment[];
  totalLabel?: string;
  totalValue?: number;
  centerSubtitle?: string;
  size?: number;
}

export const SvgDonutChart: React.FC<Props> = ({
  segments,
  totalLabel = "Total Spends",
  totalValue,
  centerSubtitle = "per month",
  size = 240,
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<ChartSegment | null>(null);

  const sum = totalValue ?? segments.reduce((acc, curr) => acc + curr.value, 0);

  const radius = 78;
  const strokeWidth = 26;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />

          {segments.map((seg) => {
            if (sum === 0 || seg.value <= 0) return null;
            const fraction = seg.value / sum;
            const strokeDasharray = `${fraction * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;
            accumulatedPercent += fraction;

            const isHovered = hoveredSegment?.id === seg.id;

            return (
              <circle
                key={seg.id}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredSegment(seg)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {hoveredSegment ? hoveredSegment.name : totalLabel}
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            ₹
            {hoveredSegment
              ? hoveredSegment.value.toLocaleString("en-IN")
              : sum.toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] font-medium text-emerald-700 mt-0.5">
            {hoveredSegment
              ? `${Math.round((hoveredSegment.value / Math.max(1, sum)) * 100)}% of total`
              : centerSubtitle}
          </span>
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 w-full max-w-md">
        {segments.map((seg) => {
          const pct = sum > 0 ? Math.round((seg.value / sum) * 100) : 0;
          const isSelected = hoveredSegment?.id === seg.id;
          return (
            <div
              key={seg.id}
              onMouseEnter={() => setHoveredSegment(seg)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                isSelected ? "bg-slate-100 font-bold" : "hover:bg-slate-50"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <div className="truncate">
                <span className="text-slate-800 truncate block">{seg.name}</span>
                <span className="text-slate-500 text-[10px]">
                  ₹{seg.value.toLocaleString("en-IN")} ({pct}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
