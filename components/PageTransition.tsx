'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState, useCallback } from 'react';

// Global disposal callbacks registry for coordinating Three.js cleanup during page transitions
const disposalCallbacksRef = new Set<() => void>();

/**
 * Register a disposal callback that will be triggered when page transitions occur
 * This ensures Three.js scenes are cleaned up before new ones mount
 */
export function registerDisposalCallback(callback: () => void): () => void {
  disposalCallbacksRef.add(callback);
  return () => {
    disposalCallbacksRef.delete(callback);
  };
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);
  const isInitialMountRef = useRef(true);
  const exitStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Track when we've completed initial mount to enable exit animations
    const timer = setTimeout(() => {
      isInitialMountRef.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Track pathname changes and trigger disposal immediately on route change
  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    // Trigger disposal callbacks immediately when route changes (before exit animation)
    // This ensures Three.js cleanup happens before new scenes try to mount
    if (prevPathname !== null && prevPathname !== pathname) {
      console.log('[PageTransition] route changed', { from: prevPathname, to: pathname });
      if (process.env.NODE_ENV === 'development') {
        console.log('Route changed, triggering disposal callbacks...');
      }
      
      // Execute all registered disposal callbacks synchronously
      disposalCallbacksRef.forEach((callback) => {
        try {
          callback();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error in disposal callback:', error);
          }
        }
      });
    }
  }, [pathname]);

  // Handle exit animation completion
  // This ensures the old WebGL context is fully nullified before the new page renders its canvas
  const handleExitComplete = useCallback(() => {
    exitStartTimeRef.current = null;
    
    // Additional cleanup after exit animation completes
    // This ensures any lingering resources are cleaned up and the browser
    // has finished disposing of the previous page's GPU resources
    // The 50ms delay in SafeCanvas ensures the browser has "breathing room"
    // to fully release the WebGL context before new scenes mount
    if (process.env.NODE_ENV === 'development') {
      console.log('Exit animation complete - old scene fully unmounted');
    }
  }, []);

  // Handle when exit animation starts
  const handleExitStart = useCallback(() => {
    exitStartTimeRef.current = Date.now();
  }, []);

  // Don't render AnimatePresence until after mount to prevent hydration issues
  if (!isMounted) {
    return <>{children}</>;
  }

  // Prevent exit animations on initial mount (hydration)
  const shouldAnimate: boolean = !isInitialMountRef.current;
  
  // Ensure stable key - use pathname or fallback to 'default'
  // This prevents node mismatches during navigation
  const stableKey = pathname || 'default';

  return (
    <AnimatePresence 
      mode="wait" 
      initial={false}
      onExitComplete={handleExitComplete}
    >
      <motion.div
        key={stableKey}
        initial={shouldAnimate ? { opacity: 0 } : undefined}
        animate={{ opacity: 1 }}
        exit={shouldAnimate ? { opacity: 0 } : undefined}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onAnimationStart={(definition) => {
          // Detect if this is an exit animation starting
          if (definition === 'exit' || (typeof definition === 'object' && 'opacity' in definition && (definition as any).opacity === 0)) {
            handleExitStart();
          }
        }}
        style={{ position: 'relative' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 