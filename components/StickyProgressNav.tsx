'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface StickyProgressNavProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
}

const StickyProgressNav: React.FC<StickyProgressNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollAnimationRef = useRef<number | null>(null);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Show nav after scrolling past hero section (approximately 100vh)
    setIsVisible(scrollPosition > windowHeight * 0.8);

    // Find the active section using IntersectionObserver approach
    const sectionElements = sections.map(section => ({
      id: section.id,
      element: document.getElementById(section.id)
    })).filter(section => section.element);

    if (sectionElements.length === 0) return;

    // Find which section is currently in view
    let currentSection = '';
    const scrollOffset = windowHeight * 0.3; // Offset for better UX

    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const element = sectionElements[i].element;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= scrollOffset) {
          currentSection = sectionElements[i].id;
          break;
        }
      }
    }

    // If no section is found, use the first one
    if (!currentSection && sectionElements.length > 0) {
      currentSection = sectionElements[0].id;
    }

    setActiveSection(currentSection);
  }, [sections]);

  // ✅ Track RAF ID for throttled scroll to ensure proper cleanup
  const throttledRafRef = useRef<number | null>(null);

  useEffect(() => {
    // Guard: Ensure we're on the client side
    if (typeof window === 'undefined') return;

    // Throttle scroll events for better performance
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        // ✅ Cancel any pending RAF before scheduling new one
        if (throttledRafRef.current !== null) {
          cancelAnimationFrame(throttledRafRef.current);
        }
        throttledRafRef.current = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
          throttledRafRef.current = null;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    // ✅ Proper cleanup: cancel RAFs and remove listeners
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      
      // Cancel any pending throttled RAF
      if (throttledRafRef.current !== null) {
        cancelAnimationFrame(throttledRafRef.current);
        throttledRafRef.current = null;
      }
      
      // Cancel any ongoing scroll animation
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    // Prevent multiple scroll animations
    if (isScrolling) return;
    
    // Cancel any existing scroll animation
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      
      // Calculate proper offset based on screen size
      const isMobile = window.innerWidth < 768;
      const mainNavHeight = 80; // Main navbar height
      const stickyNavHeight = isMobile ? 60 : 0; // Sticky progress nav height on mobile
      const totalOffset = mainNavHeight + stickyNavHeight + 20; // Extra 20px for breathing room
      
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - totalOffset;

      // Enhanced smooth scroll with better performance and accessibility
      const startPosition = window.scrollY;
      const distance = offsetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) / 1.5, 1000); // Max 1000ms, faster scroll
      let startTime: number | null = null;

      // Improved easing function for smoother animation
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easedProgress);
        
        if (progress < 1) {
          scrollAnimationRef.current = requestAnimationFrame(animateScroll);
        } else {
          // Animation complete
          scrollAnimationRef.current = null;
          setIsScrolling(false);
          
          // Focus the target element for accessibility
          element.focus({ preventScroll: true });
        }
      };

      // Use requestAnimationFrame for consistent performance
      scrollAnimationRef.current = requestAnimationFrame(animateScroll);
    }
  };

  return (
    <>
      {/* Desktop Navigation - Right Side */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="hidden md:block fixed right-6 top-[40%] -translate-y-1/2 z-40"
        role="navigation"
        aria-label="Page sections navigation"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg border border-gray-200/50">
          <ul className="flex flex-col space-y-3" role="list">
            {sections.map((section, index) => (
              <li key={section.id} role="listitem">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeSection === section.id
                      ? 'bg-black text-white'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  aria-label={`Go to ${section.label} section`}
                  aria-current={activeSection === section.id ? 'true' : 'false'}
                  tabIndex={0}
                >
                  {/* Progress indicator */}
                  <div className="absolute -left-8 w-6 h-px bg-gray-200" aria-hidden="true">
                    <motion.div
                      className="h-full bg-black"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: activeSection === section.id ? '100%' : '0%'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Section number */}
                  <span className="text-xs font-medium" aria-hidden="true">
                    {index + 1}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none" aria-hidden="true">
                    {section.label}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Top Fixed */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="md:hidden fixed top-20 left-0 right-0 z-40 px-6"
        role="navigation"
        aria-label="Page sections navigation"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50">
          <ul className="flex justify-center space-x-2" role="list">
            {sections.map((section, index) => (
              <li key={section.id} role="listitem">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeSection === section.id
                      ? 'bg-black text-white'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  aria-label={`Go to ${section.label} section`}
                  aria-current={activeSection === section.id ? 'true' : 'false'}
                  tabIndex={0}
                >
                  <span className="text-xs font-medium" aria-hidden="true">
                    {index + 1}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default StickyProgressNav;
