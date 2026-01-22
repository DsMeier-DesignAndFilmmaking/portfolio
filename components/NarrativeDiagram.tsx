'use client';

import React from 'react';
import { motion } from 'framer-motion';

const NarrativeDiagram = () => {
  // Defining the emotional arc nodes
  // Value represents 'Intensity' or 'Emotional Depth'
  const arcPoints = [
    { label: 'Anticipation', intensity: 40, delay: 0 },
    { label: 'Threshold', intensity: 80, delay: 0.5 },
    { label: 'Submersion', intensity: 30, delay: 1.0 },
    { label: 'Revelation', intensity: 90, delay: 1.5 },
    { label: 'Resonance', intensity: 60, delay: 2.0 },
  ];

  // SVG Path calculation for a smooth wave
  const pathData = "M 40 10 Q 90 60, 40 110 T 40 210 T 40 310 T 40 410";

  return (
    <div className="relative w-full max-w-md mx-auto h-[400px] md:h-[500px] flex items-center justify-center py-8 md:py-12 overflow-visible">
      {/* Background Textural Element: Narrative Infrastructure */}
      <div className="absolute inset-0 flex justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="text-[10rem] font-bold rotate-90 leading-none">NARRATIVE</span>
      </div>

      <svg
        viewBox="0 0 100 420"
        className="absolute h-full w-full overflow-visible"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* The "Infrastructure" Path - The invisible logic */}
        <motion.path
          d={pathData}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-blue-200"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* The Emotional Wave - The felt experience */}
        <motion.path
          d={pathData}
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" /> {/* blue-400 */}
            <stop offset="50%" stopColor="#818CF8" /> {/* indigo-400 */}
            <stop offset="100%" stopColor="#C084FC" /> {/* purple-400 */}
          </linearGradient>
        </defs>
      </svg>

      {/* Narrative Anchors */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-4">
        {arcPoints.map((point, index) => (
          <motion.div
            key={point.label}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: point.delay, duration: 0.8 }}
            className={`relative flex items-center w-full ${
              index % 2 === 0 ? 'flex-row-reverse pr-[20%]' : 'flex-row pl-[20%]'
            }`}
          >
            {/* The "Feeling" Pulse */}
            <div className="relative group">
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: point.delay,
                }}
                className="absolute inset-0 rounded-full bg-indigo-400 blur-xl"
              />
              
              <div className="relative w-4 h-4 rounded-full bg-white border-2 border-indigo-500 shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
              
              {/* Floating Label */}
              <div className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-4
                ${index % 2 === 0 ? 'right-full mr-4 text-right' : 'left-full ml-4 text-left'}`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-[-2px]">
                  State {index + 1}
                </p>
                <h4 className="text-sm font-light text-slate-800 tracking-tight italic">
                  {point.label}
                </h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Axis Labels */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 h-full py-12 flex flex-col justify-between pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-slate-300 -rotate-90 origin-left translate-y-8">
          Intensity
        </span>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-0 right-0 text-[10px] uppercase tracking-widest text-indigo-400 font-bold border-b border-indigo-400 pb-1"
      >
        Emotional Arc v.1.0
      </motion.div>
    </div>
  );
};

export default NarrativeDiagram;
