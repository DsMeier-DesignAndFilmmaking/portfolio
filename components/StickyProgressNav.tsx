'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
        className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg border border-gray-200/50">
          <ul className="flex flex-col space-y-3">
            {sections.map((section, index) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-black text-white'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  aria-label={`Go to ${section.label} section`}
                >
                  {/* Progress indicator */}
                  <div className="absolute -left-8 w-6 h-px bg-gray-200">
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
                  <span className="text-xs font-medium">
                    {index + 1}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
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
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50">
          <ul className="flex justify-center space-x-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-black text-white'
                      : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  aria-label={`Go to ${section.label} section`}
                >
                  <span className="text-xs font-medium">
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
