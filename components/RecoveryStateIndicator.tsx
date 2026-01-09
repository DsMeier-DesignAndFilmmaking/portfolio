'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RecoveryStateIndicatorProps {
  initialState?: 'narrative' | 'safety';
  autoTransition?: boolean;
  transitionDelay?: number;
}

const RecoveryStateIndicator = ({ 
  initialState = 'narrative', 
  autoTransition = true,
  transitionDelay = 3000 
}: RecoveryStateIndicatorProps) => {
  const [state, setState] = useState<'narrative' | 'safety'>(initialState);

  useEffect(() => {
    if (autoTransition && state === 'narrative') {
      const timer = setTimeout(() => {
        setState('safety');
      }, transitionDelay);
      return () => clearTimeout(timer);
    }
  }, [autoTransition, transitionDelay, state]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 border border-white/10">
        {/* Status Label */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            System State
          </div>
          <div className="flex items-center gap-2">
            {state === 'narrative' ? (
              <>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-xs font-mono text-blue-400">Narrative Mode</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-xs font-mono text-amber-500">Safety Anchor</span>
              </>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="relative h-12 bg-black/30 rounded-lg border border-white/10 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50" />
          
          {/* Fluid/Wavy State (Narrative) */}
          {state === 'narrative' && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 400 48"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="narrativeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,24 Q100,12 200,24 T400,24 L400,48 L0,48 Z"
                  fill="url(#narrativeGradient)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M0,24 Q100,36 200,24 T400,24 L400,48 L0,48 Z"
                  fill="url(#narrativeGradient)"
                  fillOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </svg>
            </motion.div>
          )}

          {/* Solid/Fixed State (Safety Anchor) */}
          {state === 'safety' && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-amber-500/80 to-orange-500/80"
            >
              {/* Solid bar with subtle pattern */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-[length:200%_100%]"
              />
            </motion.div>
          )}

          {/* Transition indicator - shows once when transitioning to safety */}
          {state === 'safety' && (
            <motion.div
              key="transition"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            />
          )}
        </div>

        {/* State Description */}
        <div className="mt-4 pt-4 border-t border-white/10">
          {state === 'narrative' ? (
            <div className="text-xs text-gray-400" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              <span className="font-mono text-blue-400">Fluid State:</span> Narrative engine generating atmospheric, immersive guidance
            </div>
          ) : (
            <div className="text-xs text-gray-400" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              <span className="font-mono text-amber-500">Fixed State:</span> Trust Layer intervention—literal, high-legibility guidance activated
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecoveryStateIndicator;
