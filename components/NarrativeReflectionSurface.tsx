"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Clock } from 'lucide-react';

interface Moment {
  time: string;
  event: string;
  weight: number;
  type: "planned" | "spontaneous";
  inputs?: string;
}

interface NarrativeReflectionSurfaceProps {
  narrativeData: {
    narrativeThemes: string[];
    dailySummary: string;
    spontaneityScore: {
      planned: number;
      spontaneous: number;
    };
    moments: Moment[];
    voiceTones: {
      concierge: string;
      friend: string;
      minimalist: string;
    };
  };
}

const NarrativeReflectionSurface: React.FC<NarrativeReflectionSurfaceProps> = ({ narrativeData }) => {
  const [voiceTone, setVoiceTone] = useState<'concierge' | 'friend' | 'minimalist'>('concierge');
  const [hoveredMoment, setHoveredMoment] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState('');

  // Typewriter effect for story text
  React.useEffect(() => {
    const toneText = narrativeData.voiceTones[voiceTone];
    setDisplayText('');
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < toneText.length) {
        setDisplayText(toneText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30); // Typing speed

    return () => clearInterval(typeInterval);
  }, [voiceTone, narrativeData.voiceTones]);

  // Calculate arc path for SVG
  const generateArcPath = (moments: Moment[]) => {
    const width = 400;
    const height = 200;
    const padding = 40;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;
    
    const points = moments.map((moment, index) => {
      const x = padding + (index / (moments.length - 1)) * usableWidth;
      const y = padding + usableHeight - (moment.weight * usableHeight);
      return { x, y, moment };
    });

    // Create smooth bezier curve
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const cp1x = current.x + (next.x - current.x) / 3;
      const cp1y = current.y;
      const cp2x = next.x - (next.x - current.x) / 3;
      const cp2y = next.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    return { path, points };
  };

  const { path, points } = generateArcPath(narrativeData.moments);

  // Calculate spontaneity percentages
  const total = narrativeData.spontaneityScore.planned + narrativeData.spontaneityScore.spontaneous;
  const spontaneousPercent = (narrativeData.spontaneityScore.spontaneous / total) * 100;
  const plannedPercent = (narrativeData.spontaneityScore.planned / total) * 100;

  // Circular chart calculations
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const spontaneousOffset = circumference - (spontaneousPercent / 100) * circumference;
  const plannedOffset = circumference - (plannedPercent / 100) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl border border-amber-500/20 overflow-hidden">
        {/* Paper Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Golden Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                Memory Mirror
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              The Day's Narrative: {narrativeData.narrativeThemes.join(' & ')}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left: Daily Arc Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-4">
                  Daily Arc
                </div>
                <div className="relative">
                  <svg width="100%" height="200" viewBox="0 0 400 200" className="overflow-visible">
                    {/* Grid lines */}
                    <defs>
                      <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    
                    {/* Background grid */}
                    <g opacity="0.2">
                      {[0, 0.25, 0.5, 0.75, 1].map((y) => (
                        <line
                          key={y}
                          x1="40"
                          y1={40 + y * 120}
                          x2="360"
                          y2={40 + y * 120}
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1"
                        />
                      ))}
                    </g>

                    {/* Emotional Pulse Path */}
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#arcGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Moment Nodes */}
                    {points.map((point, index) => (
                      <g key={index}>
                        {/* Hover area */}
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="20"
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredMoment(index)}
                          onMouseLeave={() => setHoveredMoment(null)}
                        />
                        
                        {/* Node circle */}
                        <motion.circle
                          cx={point.x}
                          cy={point.y}
                          r={hoveredMoment === index ? 8 : 6}
                          fill={point.moment.type === 'spontaneous' ? '#f59e0b' : '#64748b'}
                          stroke="white"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2, type: "spring" }}
                        />
                        
                        {/* Time label */}
                        <text
                          x={point.x}
                          y={point.y - 15}
                          textAnchor="middle"
                          className="fill-white text-[8px] font-mono"
                        >
                          {point.moment.time}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Tooltip for Narrative Weighting */}
                  <AnimatePresence>
                    {hoveredMoment !== null && points[hoveredMoment] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900/95 backdrop-blur-md border border-amber-500/30 rounded-lg p-3 shadow-xl z-20"
                        style={{ minWidth: '200px' }}
                      >
                        <div className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                          Narrative Weighting
                        </div>
                        <div className="text-xs text-white font-semibold mb-2">
                          {points[hoveredMoment].moment.event}
                        </div>
                        <div className="space-y-1 text-[10px] font-mono text-slate-300">
                          <div>
                            <span className="text-slate-400">Weight:</span>{' '}
                            <span className="text-amber-400">{points[hoveredMoment].moment.weight.toFixed(2)}</span>
                          </div>
                          {points[hoveredMoment].moment.inputs && (
                            <div>
                              <span className="text-slate-400">Input:</span>{' '}
                              <span className="text-amber-300">{points[hoveredMoment].moment.inputs}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right: Spontaneity Score Widget */}
            <div>
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <div className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-4 text-center">
                  Spontaneity Score
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-4">
                    <svg className="transform -rotate-90 w-20 h-20">
                      {/* Planned arc */}
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="rgba(100, 116, 139, 0.3)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#64748b"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: plannedOffset }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      
                      {/* Spontaneous arc */}
                      <motion.circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: spontaneousOffset }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{Math.round(spontaneousPercent)}%</div>
                        <div className="text-[8px] text-slate-400 font-mono">Spont.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between text-[9px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-slate-300">Spontaneous</span>
                      </div>
                      <span className="text-white font-semibold">{narrativeData.spontaneityScore.spontaneous}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-500" />
                        <span className="text-slate-300">Planned</span>
                      </div>
                      <span className="text-white font-semibold">{narrativeData.spontaneityScore.planned}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-amber-500/10 backdrop-blur-sm rounded-2xl border-2 border-amber-500/30 p-6 md:p-8 shadow-xl shadow-amber-500/10 mb-6">
            {/* Voice Tone Toggle */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-[9px] font-mono text-amber-300/70 uppercase tracking-wider">Voice Tone:</span>
              <div className="flex gap-1 bg-slate-800/60 rounded-lg p-1 border border-amber-500/20">
                {(['concierge', 'friend', 'minimalist'] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setVoiceTone(tone)}
                    className={`px-3 py-1.5 rounded text-[9px] font-semibold uppercase tracking-wider transition-all ${
                      voiceTone === tone
                        ? 'bg-amber-500/80 text-white shadow-lg'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Synthesis Text */}
            <div className="text-center mb-4">
              <div className="text-[10px] font-mono text-amber-400/70 uppercase tracking-wider mb-3">
                Story Synthesis
              </div>
              <motion.p
                key={voiceTone}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base md:text-lg text-white leading-relaxed"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                {displayText}
                {displayText.length < narrativeData.voiceTones[voiceTone].length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-amber-400 ml-1 align-middle"
                  />
                )}
              </motion.p>
            </div>
          </div>

          {/* Daily Summary */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Reflection
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              {narrativeData.dailySummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarrativeReflectionSurface;
