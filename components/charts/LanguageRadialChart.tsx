"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface LanguageData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  repositories: number;
}

interface LanguageRadialChartProps {
  data: LanguageData[];
  className?: string;
}

export default function LanguageRadialChart({ data, className = "" }: LanguageRadialChartProps) {
  const [hoveredLanguage, setHoveredLanguage] = useState<LanguageData | null>(null);

  // Process data for radial chart
  const { totalValue, segments } = useMemo(() => {
    const total = data.reduce((sum, lang) => sum + lang.value, 0);
    
    let currentAngle = 0;
    const segments = data.map(lang => {
      const angle = (lang.value / total) * 360;
      const segment = {
        ...lang,
        angle,
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        pathData: createArcPath(50, 50, 40, currentAngle, currentAngle + angle)
      };
      currentAngle += angle;
      return segment;
    });

    return { totalValue: total, segments };
  }, [data]);

  // Create SVG arc path
  function createArcPath(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  }

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Programming Languages</h3>
        <div className="text-sm text-gray-400">
          {data.length} languages
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Radial Chart */}
          <svg width="200" height="200" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <motion.path
                key={segment.name}
                d={segment.pathData}
                fill={segment.color}
                stroke="#1f2937"
                strokeWidth="1"
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredLanguage(segment)}
                onMouseLeave={() => setHoveredLanguage(null)}
                whileHover={{ scale: 1.05 }}
                style={{ transformOrigin: "100px 100px" }}
              />
            ))}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-white">
              {totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">
              total bytes
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        {data.slice(0, 8).map((language, index) => (
          <motion.div
            key={language.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
            onMouseEnter={() => setHoveredLanguage(language)}
            onMouseLeave={() => setHoveredLanguage(null)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: language.color }}
              />
              <div>
                <div className="text-white font-medium">{language.name}</div>
                <div className="text-xs text-gray-400">
                  {language.repositories} repo{language.repositories !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">
                {language.percentage.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">
                {language.value.toLocaleString()} bytes
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Tooltip */}
      {hoveredLanguage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-50 bg-gray-900 text-white text-sm rounded-lg px-4 py-3 shadow-xl border border-gray-700"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: hoveredLanguage.color }}
            />
            <span className="font-semibold">{hoveredLanguage.name}</span>
          </div>
          <div className="text-gray-300">
            <div>{hoveredLanguage.percentage.toFixed(1)}% of total code</div>
            <div>{hoveredLanguage.value.toLocaleString()} bytes</div>
            <div>{hoveredLanguage.repositories} repositories</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
