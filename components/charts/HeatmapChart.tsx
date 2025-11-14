"use client";

import { motion } from "framer-motion";

interface HeatmapChartProps {
  data: Array<{ date: string; count: number; [key: string]: any }>;
  height?: number;
  colorScale?: string[];
  animate?: boolean;
  className?: string;
  showTooltip?: boolean;
}

export default function HeatmapChart({
  data,
  height = 200,
  colorScale = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  animate = true,
  className = "",
  showTooltip = true,
}: HeatmapChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-${height} ${className}`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">🔥</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  // Group data by weeks
  const weeks: Array<Array<{ date: string; count: number; dayOfWeek: number }>> = [];
  let currentWeek: Array<{ date: string; count: number; dayOfWeek: number }> = [];

  data.forEach(item => {
    const date = new Date(item.date);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Start new week on Sunday
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    
    currentWeek.push({
      ...item,
      dayOfWeek
    });
  });

  // Add the last week if it has data
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const maxCount = Math.max(...data.map(d => d.count));
  
  const getColor = (count: number) => {
    if (count === 0) return colorScale[0];
    const intensity = Math.min(4, Math.ceil((count / maxCount) * 4));
    return colorScale[intensity];
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`w-full ${className}`}>
      <div className="relative" style={{ height: `${height}px` }}>
        <div className="absolute inset-0 overflow-x-auto">
          <div className="flex gap-1 h-full">
            {/* Day labels */}
            <div className="flex flex-col justify-around text-xs text-gray-500 dark:text-gray-400 mr-2">
              {dayLabels.map(day => (
                <div key={day} className="h-3 text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap weeks */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {dayLabels.map((_, dayIndex) => {
                    const dayData = week.find(d => d.dayOfWeek === dayIndex);
                    const count = dayData?.count || 0;
                    
                    return (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className="w-3 h-3 rounded-sm cursor-pointer"
                        style={{ backgroundColor: getColor(count) }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: animate ? 0.3 : 0,
                          delay: animate ? (weekIndex * 7 + dayIndex) * 0.02 : 0
                        }}
                        whileHover={{ scale: 1.2 }}
                        title={showTooltip ? `${dayData?.date || 'No data'}: ${count} activities` : undefined}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-0 right-0 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <span>Less</span>
          {colorScale.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
