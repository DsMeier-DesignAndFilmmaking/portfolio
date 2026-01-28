'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function MobilePreviousProjectsBackToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a /projects/previous/* route
  const isPreviousProjectsPage = pathname?.match(/^\/projects\/previous/);

  // Check if mobile viewport
  const checkMobile = useCallback(() => {
    if (typeof window === 'undefined') return;
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Handle scroll visibility
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 400);
  }, []);

  // Initialize mobile check and scroll listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial check
    checkMobile();
    
    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttled resize handler
    let resizeTicking = false;
    const throttledResize = () => {
      if (!resizeTicking) {
        window.requestAnimationFrame(() => {
          checkMobile();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledResize, { passive: true });
    
    // Initial scroll check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledResize);
    };
  }, [checkMobile, handleScroll]);

  // Don't render if not on previous projects page or not mobile
  if (!isPreviousProjectsPage || !isMobile) {
    return null;
  }

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25
          }}
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-[9999] w-[50px] h-[50px] rounded-full flex items-center justify-center backdrop-blur-[8px] bg-white/80 border border-white/20 shadow-lg hover:bg-white/90 transition-colors active:scale-95"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6 text-gray-900" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
