"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HeatmapOverlayProps {
  environment: {
    weather: string;
    crowds: string;
  };
}

const HeatmapOverlay: React.FC<HeatmapOverlayProps> = ({ environment }) => {
  // Generate heatmap points based on crowd density
  const getCrowdIntensity = (crowds: string) => {
    if (crowds.toLowerCase() === 'high') return 0.7;
    if (crowds.toLowerCase() === 'medium') return 0.4;
    return 0.2;
  };

  const intensity = getCrowdIntensity(environment.crowds);
  const weatherColor = environment.weather.toLowerCase() === 'clear' 
    ? 'rgba(34, 197, 94, 0.3)' // emerald for clear
    : 'rgba(59, 130, 246, 0.3)'; // blue for other

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Crowd Density Heatmap */}
      <svg className="w-full h-full opacity-60">
        <defs>
          <radialGradient id="heatmap-gradient">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" stopOpacity={intensity} />
            <stop offset="50%" stopColor="rgba(251, 191, 36, 0.4)" stopOpacity={intensity * 0.6} />
            <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Animated heatmap circles */}
        {[
          { x: 20, y: 30, size: 120 },
          { x: 60, y: 50, size: 100 },
          { x: 80, y: 25, size: 90 },
          { x: 35, y: 70, size: 110 },
          { x: 70, y: 75, size: 95 },
        ].map((point, index) => (
          <motion.circle
            key={index}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={point.size}
            fill="url(#heatmap-gradient)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Weather Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${weatherColor} 0%, transparent 70%)`
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default HeatmapOverlay;
