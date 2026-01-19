'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EmotionalArcGraph = () => {
  // Generate points for a sine wave representing emotional intensity over 3 days
  const width = 600;
  const graphHeight = 300;
  const topPadding = 50; // Extra space for intensity labels
  const bottomPadding = 50; // Extra space for phase labels
  const height = graphHeight + topPadding + bottomPadding; // Total height including label space
  const padding = 40;
  const graphStartY = topPadding; // Y position where the graph area starts
  const graphAreaHeight = graphHeight - 2 * padding; // Height of the actual graph area
  
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
    const y = graphStartY + padding + graphAreaHeight * (0.5 - sineValue * 0.3 - trend);
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
      <div className="relative">
        {/* SVG Graph */}
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
          preserveAspectRatio="xMidYMid meet"
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
            const y = graphStartY + padding + ratio * graphAreaHeight;
            return (
              <line
                key={`grid-h-${ratio}`}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(0, 0, 0, 0.08)"
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
              y1={graphStartY + padding}
              x2={marker.x}
              y2={graphStartY + padding + graphAreaHeight}
              stroke="rgba(0, 0, 0, 0.08)"
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
                y1={graphStartY + padding}
                x2={marker.x}
                y2={graphStartY + padding + graphAreaHeight}
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              
              {/* Phase label */}
              <text
                x={marker.x}
                y={graphStartY + padding + graphAreaHeight + 25}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-600"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
              >
                {marker.label}
              </text>
              
              {/* Intensity indicator */}
              <text
                x={marker.x}
                y={graphStartY + padding - 10}
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
            y={graphStartY + padding + graphAreaHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90, 15, ${graphStartY + padding + graphAreaHeight / 2})`}
            className="text-xs font-medium fill-gray-600 uppercase tracking-wider"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
          >
            Emotional Intensity
          </text>

          {/* X-axis label */}
          <text
            x={width / 2}
            y={graphStartY + padding + graphAreaHeight + 35}
            textAnchor="middle"
            className="text-xs font-medium fill-gray-600 uppercase tracking-wider"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
          >
            Time
          </text>
        </svg>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500"></div>
              <span>Emotional Arc</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 border-t border-dashed border-gray-400"></div>
              <span>Phase Boundaries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalArcGraph;
