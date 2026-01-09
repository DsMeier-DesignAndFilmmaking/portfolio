'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SystemsGraphicProps {
  className?: string;
}

/**
 * SystemsGraphic - Ambient AI infrastructure visualization
 * Communicates system hierarchy through motion, depth, and density
 * Shows active processing, data flow, and system layers without explicit labels
 */
export default function SystemsGraphic({ className = '' }: SystemsGraphicProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Motion variants - foundational systems (slow, heavy, stabilizing)
  const foundationalVariants = {
    animate: {
      y: prefersReducedMotion ? 0 : [0, -15, 0],
      x: prefersReducedMotion ? 0 : [0, 8, 0],
      opacity: [0.9, 1, 0.9],
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: prefersReducedMotion ? 0 : 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Motion variants - applied systems (lighter, reactive)
  const appliedVariants = (index: number) => ({
    animate: {
      y: prefersReducedMotion ? 0 : [0, -20, 10, 0],
      x: prefersReducedMotion ? 0 : [0, 12, -8, 0],
      opacity: [0.7, 0.9, 0.8, 0.7],
      scale: [1, 1.05, 0.98, 1],
    },
    transition: {
      duration: prefersReducedMotion ? 0 : 8 + index * 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.8,
    },
  });

  // Background field motion
  const fieldVariants = {
    animate: {
      opacity: prefersReducedMotion ? 0.3 : [0.25, 0.4, 0.25],
      scale: prefersReducedMotion ? 1 : [1, 1.05, 1],
    },
    transition: {
      duration: prefersReducedMotion ? 0 : 15,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Particle motion for data flow visualization
  const particleVariants = (delay: number) => ({
    animate: {
      y: prefersReducedMotion ? 0 : [0, -100, -200],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.5],
    },
    transition: {
      duration: prefersReducedMotion ? 0 : 4,
      repeat: Infinity,
      ease: "easeOut",
      delay: delay,
    },
  });

  if (!isVisible) {
    return (
      <div className={`w-full h-[400px] md:h-[500px] relative ${className}`} aria-hidden="true" />
    );
  }

  return (
    <div 
      className={`w-full h-[400px] md:h-[500px] relative overflow-hidden ${className}`}
      aria-label="AI systems infrastructure visualization"
      role="img"
    >
      {/* Background Field Layer - Subtle gradient motion with data density */}
      <motion.div
        className="absolute inset-0"
        variants={fieldVariants}
        initial="animate"
        animate="animate"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-violet-50/40 to-blue-50/50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
        
        {/* Subtle grid pattern suggesting data structure */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </motion.div>

      {/* Data Flow Particles - Suggesting active processing */}
      {!prefersReducedMotion && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-indigo-400/40"
              style={{
                left: `${15 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
              }}
              variants={particleVariants(i * 0.3)}
              initial="animate"
              animate="animate"
            />
          ))}
        </>
      )}

      {/* Foundational Systems Layer (2 anchors) - Slow, heavy, stabilizing */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Foundational System 1 - Spontaneity Engine */}
        <motion.div
          className="absolute"
          style={{
            left: '25%',
            top: '45%',
          }}
          variants={foundationalVariants}
          initial="animate"
          animate="animate"
        >
          <motion.div
            className="relative"
            whileHover={prefersReducedMotion ? {} : { scale: 1.08, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Core orb - structural, load-bearing feel */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-200/75 via-indigo-300/65 to-violet-200/75 backdrop-blur-xl border-2 border-indigo-300/60 shadow-2xl">
              {/* Inner processing core */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-400/40 to-violet-400/30" />
              {/* System name */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center px-2">
                  <div className="text-[9px] md:text-[11px] font-semibold text-indigo-900/90 uppercase tracking-tight leading-tight" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Spontaneity Engine
                  </div>
                </div>
              </div>
              {/* Active processing indicators */}
              {!prefersReducedMotion && (
                <>
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 360) / 6;
                    const rad = (angle * Math.PI) / 180;
                    const radius = 18;
                    const x = 20 + Math.cos(rad) * radius;
                    const y = 20 + Math.sin(rad) * radius;
                    return (
                      <motion.div
                        key={`core-1-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500/60"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </>
              )}
            </div>
            
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            
            {/* Outer ring - processing field */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-indigo-200/40"
              style={{ transform: 'scale(1.3)' }}
              animate={{
                scale: prefersReducedMotion ? 1.3 : [1.3, 1.5, 1.3],
                opacity: prefersReducedMotion ? 0.3 : [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Foundational System 2 - Trust & Authenticity Layer */}
        <motion.div
          className="absolute"
          style={{
            right: '25%',
            top: '45%',
          }}
          animate={{
            y: prefersReducedMotion ? 0 : [0, -12, 0],
            x: prefersReducedMotion ? 0 : [0, -6, 0],
            opacity: [0.9, 1, 0.9],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: prefersReducedMotion ? 0 : 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <motion.div
            className="relative"
            whileHover={prefersReducedMotion ? {} : { scale: 1.08, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Core orb */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-teal-200/70 via-teal-300/60 to-cyan-200/70 backdrop-blur-xl border-2 border-teal-300/50 shadow-xl">
              {/* Inner processing core */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-teal-400/40 to-cyan-400/30" />
              {/* System name */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center px-2">
                  <div className="text-[8px] md:text-[10px] font-semibold text-teal-900/90 uppercase tracking-tight leading-tight" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Trust & Authenticity
                  </div>
                </div>
              </div>
              {/* Active processing indicators */}
              {!prefersReducedMotion && (
                <>
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 360) / 6;
                    const rad = (angle * Math.PI) / 180;
                    const radius = 14;
                    const x = 18 + Math.cos(rad) * radius;
                    const y = 18 + Math.sin(rad) * radius;
                    return (
                      <motion.div
                        key={`core-2-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full bg-teal-500/60"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3 + 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </>
              )}
            </div>
            
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            
            {/* Outer ring - processing field */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-teal-200/40"
              style={{ transform: 'scale(1.3)' }}
              animate={{
                scale: prefersReducedMotion ? 1.3 : [1.3, 1.5, 1.3],
                opacity: prefersReducedMotion ? 0.3 : [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Applied Systems Layer (3 elements) - Lighter, reactive, situational */}
      <div className="absolute inset-0">
        {/* Applied System 1 - Travel Decisions */}
        <motion.div
          className="absolute"
          style={{
            left: '15%',
            top: '25%',
          }}
          variants={appliedVariants(0)}
          initial="animate"
          animate="animate"
        >
          <motion.div
            className="relative"
            whileHover={prefersReducedMotion ? {} : { scale: 1.15, opacity: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-200/60 via-cyan-200/50 to-blue-300/60 backdrop-blur-lg border-2 border-blue-300/40 shadow-lg">
              {/* Inner core */}
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/20" />
              {/* System name */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center px-2">
                  <div className="text-[8px] md:text-[10px] font-semibold text-blue-900/90 uppercase tracking-tight leading-tight" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Travel Decisions
                  </div>
                </div>
              </div>
              {/* Processing dots */}
              {!prefersReducedMotion && (
                <>
                  {[...Array(4)].map((_, i) => {
                    const angle = (i * 90);
                    const rad = (angle * Math.PI) / 180;
                    const radius = 8;
                    const x = 12 + Math.cos(rad) * radius;
                    const y = 12 + Math.sin(rad) * radius;
                    return (
                      <motion.div
                        key={`applied-1-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-blue-500/70"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Applied System 2 - Social Micro-Events */}
        <motion.div
          className="absolute"
          style={{
            right: '18%',
            top: '28%',
          }}
          variants={appliedVariants(1)}
          initial="animate"
          animate="animate"
        >
          <motion.div
            className="relative"
            whileHover={prefersReducedMotion ? {} : { scale: 1.15, opacity: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-purple-200/60 via-pink-200/50 to-purple-300/60 backdrop-blur-lg border-2 border-purple-300/40 shadow-lg">
              {/* Inner core */}
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/20" />
              {/* System name */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center px-2">
                  <div className="text-[8px] md:text-[10px] font-semibold text-purple-900/90 uppercase tracking-tight leading-tight" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Social Micro-Events
                  </div>
                </div>
              </div>
              {/* Processing dots */}
              {!prefersReducedMotion && (
                <>
                  {[...Array(4)].map((_, i) => {
                    const angle = (i * 90);
                    const rad = (angle * Math.PI) / 180;
                    const radius = 8;
                    const x = 12 + Math.cos(rad) * radius;
                    const y = 12 + Math.sin(rad) * radius;
                    return (
                      <motion.div
                        key={`applied-2-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-purple-500/70"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2 + 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Applied System 3 - Narrative Experiences */}
        <motion.div
          className="absolute"
          style={{
            left: '50%',
            bottom: '12%',
            transform: 'translateX(-50%)',
          }}
          variants={appliedVariants(2)}
          initial="animate"
          animate="animate"
        >
          <motion.div
            className="relative"
            whileHover={prefersReducedMotion ? {} : { scale: 1.15, opacity: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-200/60 via-orange-200/50 to-amber-300/60 backdrop-blur-lg border-2 border-amber-300/40 shadow-lg">
              {/* Inner core */}
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-400/20" />
              {/* System name */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center px-2">
                  <div className="text-[8px] md:text-[10px] font-semibold text-amber-900/90 uppercase tracking-tight leading-tight" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                    Narrative Experiences
                  </div>
                </div>
              </div>
              {/* Processing dots */}
              {!prefersReducedMotion && (
                <>
                  {[...Array(4)].map((_, i) => {
                    const angle = (i * 90);
                    const rad = (angle * Math.PI) / 180;
                    const radius = 8;
                    const x = 12 + Math.cos(rad) * radius;
                    const y = 12 + Math.sin(rad) * radius;
                    return (
                      <motion.div
                        key={`applied-3-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-amber-500/70"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2 + 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* Connection Fields - Soft data flow between systems */}
      {!prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="fieldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fieldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fieldGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Soft field lines suggesting data flow */}
          <motion.path
            d="M 120 225 Q 100 175, 80 125"
            stroke="url(#fieldGradient1)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 6"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 280 225 Q 300 175, 300 100"
            stroke="url(#fieldGradient2)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 6"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.path
            d="M 200 225 Q 200 350, 200 400"
            stroke="url(#fieldGradient3)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 6"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>
      )}
    </div>
  );
}
