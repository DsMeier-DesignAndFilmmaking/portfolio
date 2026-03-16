'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function MobileBackToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Logic: Show on any sub-page under /projects/
  const isProjectPage = pathname?.startsWith('/projects/');

  const checkMobile = useCallback(() => {
    if (typeof window === 'undefined') return;
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    setIsVisible(window.scrollY > 600); // Only show after scrolling down significantly
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    checkMobile();
    
    const throttledScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    const throttledResize = () => {
      window.requestAnimationFrame(checkMobile);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledResize);
    };
  }, [checkMobile, handleScroll]);

  // Don't render if we aren't in the projects section or on desktop
  if (!isProjectPage || !isMobile) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-[9999] w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/90 border border-neutral-200 shadow-xl active:scale-90 transition-transform"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 text-neutral-900" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}