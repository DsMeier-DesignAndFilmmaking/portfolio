'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface AnchorScrollLoaderProps {
  isVisible: boolean;
  progress?: number;
  onComplete?: () => void;
}

export default function AnchorScrollLoader({ isVisible, progress = 0, onComplete }: AnchorScrollLoaderProps) {
  const pathname = usePathname();
  const [internalProgress, setInternalProgress] = useState(0);
  const [showStabilizationOverlay, setShowStabilizationOverlay] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationControlsRef = useRef<any>(null);

  // ✅ Route guard: Only render on homepage
  if (pathname !== '/') {
    return null;
  }

  useEffect(() => {
    // ✅ Cleanup on unmount or route change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setInternalProgress(0);
      setShowStabilizationOverlay(false);
    };
  }, [pathname]);

  useEffect(() => {
    if (isVisible) {
      // Reset progress when loader becomes visible
      setInternalProgress(0);
      setShowStabilizationOverlay(false);
      
      // If no external progress provided, simulate progress animation
      if (progress === 0) {
        // ✅ Clear any existing interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        intervalRef.current = setInterval(() => {
          setInternalProgress(prev => {
            if (prev >= 100) {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              return 100;
            }
            return prev + 10;
          });
        }, 50); // 500ms total duration

        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        };
      }
    } else {
      // ✅ Cleanup when not visible
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setInternalProgress(0);
      setShowStabilizationOverlay(false);
    }
  }, [isVisible, progress]);

  // Use external progress if provided, otherwise use internal
  const displayProgress = progress > 0 ? progress : internalProgress;

  useEffect(() => {
    if (displayProgress >= 90) {
      // Show stabilization overlay near the end to prevent layout shifts
      setShowStabilizationOverlay(true);
    }
  }, [displayProgress]);

  useEffect(() => {
    if (displayProgress >= 100 && onComplete) {
      // Wait a bit longer to ensure scroll animation is completely finished
      const timer = setTimeout(onComplete, 500);
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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          {/* Single Progress Ring Spinner */}
          <div className="relative flex flex-col items-center">
            {/* Progress Ring with Animation */}
            <div className="w-16 h-16 relative">
              <motion.svg 
                className="w-16 h-16 transform -rotate-90" 
                viewBox="0 0 64 64"
                animate={isVisible ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: isVisible ? Infinity : 0, ease: 'linear' }}
              >
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
              </motion.svg>
              
              {/* Center Text - Fixed Position */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {Math.round(displayProgress)}%
                </span>
              </div>
            </div>
            
            {/* Loading Text */}
            <div className="mt-8 text-center">
              <span className="text-white/80 text-sm font-medium">
                {displayProgress >= 90 ? 'Stabilizing Layout...' : 'Loading Page Elements...'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Stabilization Overlay - prevents layout shifts during final scroll */}
      <AnimatePresence>
        {showStabilizationOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-screen h-screen z-[99998] bg-black/20 backdrop-blur-[1px]"
            style={{ 
              pointerEvents: 'none',
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              margin: 0,
              padding: 0,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
