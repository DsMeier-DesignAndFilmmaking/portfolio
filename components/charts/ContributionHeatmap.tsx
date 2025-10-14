"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ContributionData {
  date: string;
  count: number;
  level: number;
}

interface ContributionHeatmapProps {
  data: ContributionData[];
  className?: string;
}

export default function ContributionHeatmap({ data, className = "" }: ContributionHeatmapProps) {
  const [hoveredDate, setHoveredDate] = useState<ContributionData | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null);

  // Process data for heatmap visualization
  const { weeks, totalContributions, maxDailyContributions } = useMemo(() => {
    const weeks: ContributionData[][] = [];
    let currentWeek: ContributionData[] = [];
    let total = 0;
    let maxDaily = 0;

    // Group data by weeks
    data.forEach((contribution, index) => {
      const date = new Date(contribution.date);
      const dayOfWeek = date.getDay();
      
      currentWeek.push(contribution);
      total += contribution.count;
      maxDaily = Math.max(maxDaily, contribution.count);
      
      // Start new week on Sunday
      if (dayOfWeek === 6 || index === data.length - 1) {
        // Pad week to 7 days if needed
        while (currentWeek.length < 7) {
          currentWeek.push({ date: '', count: 0, level: 0 });
        }
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return { weeks, totalContributions: total, maxDailyContributions: maxDaily };
  }, [data]);

  // Get contribution level color
  const getLevelColor = (level: number) => {
    const colors = [
      '#161b22', // Level 0 - no contributions
      '#0e4429', // Level 1 - 1-2 contributions
      '#006d32', // Level 2 - 3-4 contributions
      '#26a641', // Level 3 - 5-6 contributions
      '#39d353'  // Level 4 - 7+ contributions
    ];
    return colors[level] || colors[0];
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Activity Heatmap</h3>
          <p className="text-sm text-gray-400">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getLevelColor(level) }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">More</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="relative">
        <div className="grid grid-cols-53 gap-1 overflow-x-auto">
          {/* Day labels */}
          <div className="grid grid-rows-7 gap-1 mr-2">
            {dayLabels.map((day, index) => (
              <div
                key={day}
                className="text-xs text-gray-400 flex items-center justify-center h-3"
                style={{ gridRow: index + 1 }}
              >
                {index % 2 === 1 ? day : ''}
              </div>
            ))}
          </div>

          {/* Contribution squares */}
          <div className="grid grid-rows-7 gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="contents">
                {week.map((contribution, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className="w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50"
                    style={{ 
                      backgroundColor: getLevelColor(contribution.level),
                      gridRow: dayIndex + 1,
                      gridColumn: weekIndex + 1
                    }}
                    whileHover={{ scale: 1.2 }}
                    onMouseEnter={(e) => {
                      setHoveredDate(contribution);
                      setHoveredPosition({
                        x: e.clientX,
                        y: e.clientY
                      });
                    }}
                    onMouseLeave={() => {
                      setHoveredDate(null);
                      setHoveredPosition(null);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredDate && hoveredPosition && hoveredDate.date && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed z-50 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-xl border border-gray-700 pointer-events-none"
            style={{
              left: hoveredPosition.x + 10,
              top: hoveredPosition.y - 10,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="font-semibold">
              {hoveredDate.count} contribution{hoveredDate.count !== 1 ? 's' : ''}
            </div>
            <div className="text-gray-300 text-xs">
              {formatDate(hoveredDate.date)}
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>Max daily: {maxDailyContributions} contributions</span>
        <span>Avg daily: {(totalContributions / 365).toFixed(1)} contributions</span>
      </div>
    </div>
  );
}
