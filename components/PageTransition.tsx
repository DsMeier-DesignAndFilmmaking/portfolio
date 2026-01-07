'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    setIsMounted(true);
    // Track when we've completed initial mount to enable exit animations
    const timer = setTimeout(() => {
      isInitialMountRef.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

  // Don't render AnimatePresence until after mount to prevent hydration issues
  if (!isMounted) {
    return <>{children}</>;
  }

  // Prevent exit animations on initial mount (hydration)
  const shouldAnimate = !isInitialMountRef.current;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname || 'default'}
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={shouldAnimate ? { opacity: 0 } : false}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ position: 'relative' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 