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
          className="fixed top-0 left-0 w-screen h-screen z-[99999] bg-black flex items-center justify-center"
          style={{ 
            pointerEvents: 'none',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            margin: 0,
            padding: 0,
            top: '-20px', // Account for navbar mt-5 (20px)
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          {/* Single Progress Ring Spinner */}
          <div className="relative flex flex-col items-center">
            {/* Progress Ring with Animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 relative"
            >
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
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
            </motion.div>
            
            {/* Loading Text */}
            <div className="mt-8 text-center">
              <span className="text-white/80 text-sm font-medium">
                Loading Page Elements...
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
