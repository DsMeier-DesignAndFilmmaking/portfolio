'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PivotAnimationProps {
  autoPlay?: boolean;
  transitionDelay?: number;
}

const PivotAnimation = ({ autoPlay = true, transitionDelay = 2000 }: PivotAnimationProps) => {
  const width = 600;
  const height = 200;
  const padding = 40;

  // Generate chaotic/jagged path for High Anxiety
  const generateAnxietyPath = () => {
    const points: Array<{ x: number; y: number }> = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const x = padding + (i / segments) * (width - 2 * padding);
      // Chaotic, jagged pattern with high variance
      const baseY = height / 2;
      const variance = Math.random() * 60 - 30;
      const spike = Math.sin(i * 0.8) * 40 + Math.cos(i * 1.2) * 30;
      const y = baseY + variance + spike;
      points.push({ x, y });
    }
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  // Generate calm, steady wave for Familiarity
  const generateFamiliarityPath = () => {
    const points: Array<{ x: number; y: number }> = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const x = padding + (i / segments) * (width - 2 * padding);
      // Smooth, gentle wave
      const baseY = height / 2;
      const wave = Math.sin((i / segments) * Math.PI * 2) * 15;
      const y = baseY + wave;
      points.push({ x, y });
    }
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  const anxietyPath = generateAnxietyPath();
  const familiarityPath = generateFamiliarityPath();

  const [phase, setPhase] = useState<'anxiety' | 'transition' | 'familiarity'>('anxiety');
  const [currentPath, setCurrentPath] = useState(anxietyPath);

  useEffect(() => {
    if (autoPlay) {
      const timer1 = setTimeout(() => {
        setPhase('transition');
        setCurrentPath(familiarityPath);
      }, transitionDelay);
      
      const timer2 = setTimeout(() => {
        setPhase('familiarity');
      }, transitionDelay + 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [autoPlay, transitionDelay, familiarityPath]);

  // Color gradient: yellow/orange (anxiety) to teal (familiarity)
  const getGradientColors = () => {
    if (phase === 'anxiety') {
      return {
        start: '#fbbf24', // amber-400
        end: '#f97316', // orange-500
      };
    }
    if (phase === 'familiarity') {
      return {
        start: '#14b8a6', // teal-500
        end: '#0d9488', // teal-600
      };
    }
    // Transition: blend between colors
    return {
      start: '#f59e0b', // amber-500 (midpoint)
      end: '#06b6d4', // cyan-500 (midpoint)
    };
  };

  const colors = getGradientColors();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 md:p-8 border border-emerald-500/20 shadow-2xl">
        {/* Title */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Soft Pivot: Path Transition
          </h3>
          <p className="text-sm text-gray-400" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
            System adapts narrative without breaking immersion—from chaotic exploration to calm familiarity
          </p>
        </div>

        {/* SVG Animation */}
        <div className="relative">
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="pivotGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.start} stopOpacity="0.9" />
                <stop offset="100%" stopColor={colors.end} stopOpacity="0.9" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid background */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding + ratio * (height - 2 * padding);
              return (
                <line
                  key={`grid-h-${ratio}`}
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.03)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              );
            })}

            {/* Path visualization */}
            {phase === 'anxiety' && (
              <motion.path
                key="anxiety"
                d={anxietyPath}
                fill="none"
                stroke="url(#pivotGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pathGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            )}

            {phase === 'transition' && (
              <motion.path
                key="transition"
                d={currentPath}
                fill="none"
                stroke="url(#pivotGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pathGlow)"
                initial={{ pathLength: 0.5 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            )}

            {phase === 'familiarity' && (
              <motion.path
                key="familiarity"
                d={familiarityPath}
                fill="none"
                stroke="url(#pivotGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pathGlow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            )}

            {/* Phase labels */}
            <g>
              <text
                x={padding}
                y={padding - 10}
                className="text-xs font-mono fill-gray-400"
              >
                {phase === 'anxiety' ? 'High Anxiety' : phase === 'transition' ? 'Transitioning...' : 'Familiarity'}
              </text>
              <text
                x={width - padding}
                y={padding - 10}
                textAnchor="end"
                className="text-xs font-mono fill-gray-400"
              >
                {phase === 'familiarity' ? 'Calm State' : 'Adapting...'}
              </text>
            </g>
          </svg>
        </div>

        {/* Status indicator */}
        <div className="mt-6 pt-6 border-t border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {phase === 'anxiety' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-amber-400">Chaotic Path: High Sensory Load</span>
                </>
              )}
              {phase === 'transition' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-cyan-400">Soft Pivot: Narrative Adapting</span>
                </>
              )}
              {phase === 'familiarity' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  <span className="text-xs font-mono text-teal-400">Steady Path: Familiarity Node Reached</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PivotAnimation;
