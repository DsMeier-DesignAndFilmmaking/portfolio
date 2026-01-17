'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function SystemsGraphic({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const smoothTransition = {
    opacity: { duration: 1.2, ease: "easeInOut" },
    scale: { duration: 1.2, ease: "easeOut" },
  };

  const floatingAnimation = (xRange: number[], yRange: number[], duration: number) => ({
    x: prefersReducedMotion ? 0 : xRange,
    y: prefersReducedMotion ? 0 : yRange,
    transition: {
      x: { duration: duration, repeat: Infinity, ease: "easeInOut" },
      y: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" },
    }
  });

  if (!mounted) return <div className={`w-full h-[600px] ${className}`} />;

  return (
<div className={`w-full h-[400px] md:h-[600px] relative overflow-hidden bg-transparent ${className}`}>      
  {/* The "Cluster Container" uses VW for its dimensions. 
        This ensures the distance between items scales linearly with the screen.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[85vw] h-[100vw] md:w-[85vw] md:h-[85vw] max-w-[550px] max-h-[550px]">          
          {/* 1. Spontaneity Engine (Core) - High Contrast Text, Subtle BG */}
          <motion.div
            className="absolute z-30"
            style={{ left: '18%', top: '22%' }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1, transition: smoothTransition }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div animate={floatingAnimation([0, 5, 0], [0, -10, 0], 12)}>
              <div className="w-[32vw] h-[32vw] max-w-[170px] max-h-[170px] rounded-full bg-gradient-to-br from-indigo-200/60 via-indigo-300/50 to-violet-200/60 backdrop-blur-md border-2 border-indigo-300/40 shadow-2xl relative flex items-center justify-center">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-400/20 to-violet-400/20" />
                <span className="text-[2.8vw] md:text-[12px] font-bold text-indigo-950 uppercase text-center px-4 z-10 leading-tight">Spontaneity Engine</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Trust & Authenticity (Overlaps Engine) */}
          <motion.div
            className="absolute z-40"
            style={{ left: '40%', top: '34%' }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 0.9, scale: 1, transition: smoothTransition }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div animate={floatingAnimation([0, -5, 0], [0, 8, 0], 14)}>
              <div className="w-[30vw] h-[30vw] max-w-[160px] max-h-[160px] rounded-full bg-gradient-to-br from-teal-200/50 via-teal-300/40 to-cyan-200/50 backdrop-blur-md border-2 border-teal-300/40 shadow-xl relative flex items-center justify-center">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-400/20" />
                <span className="text-[2.5vw] md:text-[11px] font-bold text-teal-950 uppercase text-center px-3 z-10 leading-tight">Trust & Authenticity</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3. Social Graph Network (Overlaps Trust) */}
          <motion.div
            className="absolute z-20"
            style={{ left: '52%', top: '46%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.9, scale: 1, transition: { ...smoothTransition, delay: 0.2 } }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div animate={floatingAnimation([0, 8, 0], [0, -12, 0], 11)}>
              <div className="w-[28vw] h-[28vw] max-w-[140px] max-h-[140px] rounded-full bg-gradient-to-br from-indigo-100/40 to-indigo-300/40 backdrop-blur-sm border-2 border-indigo-300/30 shadow-lg flex items-center justify-center p-4">
                <span className="text-[2.2vw] md:text-[10px] font-bold text-indigo-950 uppercase text-center leading-tight">Social Graph Network</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 4. Narrative Experiences (Overlaps Social Graph & Engine) */}
          <motion.div
            className="absolute z-10"
            style={{ left: '32%', top: '56%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.9, scale: 1, transition: { ...smoothTransition, delay: 0.3 } }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div animate={floatingAnimation([0, -8, 0], [0, 10, 0], 10)}>
              <div className="w-[26vw] h-[26vw] max-w-[130px] max-h-[130px] rounded-full bg-gradient-to-br from-amber-100/40 to-amber-300/40 backdrop-blur-sm border-2 border-amber-300/30 shadow-lg flex items-center justify-center p-3">
                <span className="text-[2.2vw] md:text-[10px] font-bold text-amber-950 uppercase text-center leading-tight">Narrative Experiences</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 5. Travel Decisions (Overlaps Engine left) */}
          <motion.div
            className="absolute z-10"
            style={{ left: '8%', top: '45%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.9, scale: 1, transition: { ...smoothTransition, delay: 0.4 } }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div animate={floatingAnimation([0, 12, 0], [0, -8, 0], 9)}>
              <div className="w-[24vw] h-[24vw] max-w-[120px] max-h-[120px] rounded-full bg-gradient-to-br from-blue-100/40 to-blue-300/40 backdrop-blur-sm border-2 border-blue-300/30 shadow-lg flex items-center justify-center p-3">
                <span className="text-[2.2vw] md:text-[10px] font-bold text-blue-950 uppercase text-center leading-tight">Travel Decisions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 6. Social Micro-Events (Overlaps Engine top) */}
          <motion.div
            className="absolute z-10"
            style={{ left: '12%', top: '10%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.9, scale: 1, transition: { ...smoothTransition, delay: 0.5 } }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div animate={floatingAnimation([0, -10, 0], [0, 15, 0], 13)}>
              <div className="w-[24vw] h-[24vw] max-w-[110px] max-h-[110px] rounded-full bg-gradient-to-br from-purple-100/40 to-purple-300/40 backdrop-blur-sm border-2 border-purple-300/30 shadow-lg flex items-center justify-center p-3">
                <span className="text-[2.2vw] md:text-[10px] font-bold text-purple-950 uppercase text-center leading-tight">Social Micro-Events</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}