'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EmotionalArcGraph = () => {
  // Generate points for a sine wave representing emotional intensity over 3 days
  const width = 600;
  const height = 300;
  const padding = 40;
  const days = 3;
  const pointsPerDay = 8;
  const totalPoints = days * pointsPerDay;
  
  // Generate sine wave points
  const points: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= totalPoints; i++) {
    const x = padding + (i / totalPoints) * (width - 2 * padding);
    // Sine wave with decreasing amplitude (emotional intensity varies but trends toward familiarity)
    const normalizedX = (i / totalPoints) * Math.PI * 2;
    const sineValue = Math.sin(normalizedX * 1.5) * 0.6;
    // Add a slight downward trend to show movement toward familiarity
    const trend = -0.2 * (i / totalPoints);
    const y = padding + (height - 2 * padding) * (0.5 - sineValue * 0.3 - trend);
    points.push({ x, y });
  }
  
  // Create SVG path
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  // Phase markers
  const phaseMarkers = [
    { day: 0, label: 'Arrival', x: padding, intensity: 'High' },
    { day: 1, label: 'Exploration', x: padding + (width - 2 * padding) / 2, intensity: 'Variable' },
    { day: 2, label: 'Familiarity', x: padding + (width - 2 * padding), intensity: 'Stable' },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 md:p-8 border border-white/10 shadow-2xl">
        {/* Title */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Emotional Arc Over 3 Days
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
            The rhythm of experience: intensity ebbs and flows as novelty transforms into familiarity
          </p>
        </div>

        {/* SVG Graph */}
        <div className="relative">
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible"
          >
            {/* Grid lines */}
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding + ratio * (height - 2 * padding);
              return (
                <line
                  key={`grid-h-${ratio}`}
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Vertical grid lines for days */}
            {phaseMarkers.map((marker) => (
              <line
                key={`grid-v-${marker.day}`}
                x1={marker.x}
                y1={padding}
                x2={marker.x}
                y2={height - padding}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Emotional arc path */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 4"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Phase markers */}
            {phaseMarkers.map((marker, index) => (
              <g key={`marker-${marker.day}`}>
                {/* Vertical line at phase boundary */}
                <line
                  x1={marker.x}
                  y1={padding}
                  x2={marker.x}
                  y2={height - padding}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                
                {/* Phase label */}
                <text
                  x={marker.x}
                  y={height - padding + 25}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-400"
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                >
                  {marker.label}
                </text>
                
                {/* Intensity indicator */}
                <text
                  x={marker.x}
                  y={padding - 10}
                  textAnchor="middle"
                  className="text-xs font-mono fill-gray-500"
                >
                  {marker.intensity}
                </text>
              </g>
            ))}

            {/* Y-axis label */}
            <text
              x={15}
              y={height / 2}
              textAnchor="middle"
              transform={`rotate(-90, 15, ${height / 2})`}
              className="text-xs font-medium fill-gray-400 uppercase tracking-wider"
              style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
            >
              Emotional Intensity
            </text>

            {/* X-axis label */}
            <text
              x={width / 2}
              y={height - 5}
              textAnchor="middle"
              className="text-xs font-medium fill-gray-400 uppercase tracking-wider"
              style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
            >
              Time
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500"></div>
              <span>Emotional Arc</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 border-t border-dashed border-gray-500"></div>
              <span>Phase Boundaries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalArcGraph;
