'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnchorScrollLoaderProps {
  isVisible: boolean;
  progress?: number;
  onComplete?: () => void;
}

export default function AnchorScrollLoader({ isVisible, progress = 0, onComplete }: AnchorScrollLoaderProps) {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Reset progress when loader becomes visible
      setInternalProgress(0);
      
      // If no external progress provided, simulate progress animation
      if (progress === 0) {
        const interval = setInterval(() => {
          setInternalProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 50); // 500ms total duration

        return () => clearInterval(interval);
      }
    } else {
      setInternalProgress(0);
    }
  }, [isVisible, progress]);

  // Use external progress if provided, otherwise use internal
  const displayProgress = progress > 0 ? progress : internalProgress;

  useEffect(() => {
    if (displayProgress >= 100 && onComplete) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(onComplete, 200);
      return () => clearTimeout(timer);
    }
  }, [displayProgress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          {/* Animated Spinner */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
            />
            
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-white/40"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - displayProgress / 100)}`}
                style={{
                  transition: 'stroke-dashoffset 0.1s ease-out'
                }}
              />
            </svg>
            
            {/* Center Text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {Math.round(displayProgress)}%
                </span>
              </div>
          </div>
          
          {/* Subtle Pulse Effect */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-24 h-24 border border-white/10 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
