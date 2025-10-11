'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToAnchor } from '@/utils/scrollUtils';
import AnchorScrollLoader from './AnchorScrollLoader';

const Navbar = () => {
  const [isScrollingToAnchor, setIsScrollingToAnchor] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverBlackSection, setIsOverBlackSection] = useState(false);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const updateNavbarColor = () => {
      const navbar = document.getElementById('site-navbar');
      const blackSection = document.getElementById('black-section');
      const videoSection = document.getElementById('video-projects');

      if (!navbar) {
        ticking = false;
        return;
      }

      const navRect = navbar.getBoundingClientRect();
      const navBottom = navRect.bottom;
      const navTop = navRect.top;

      let isOverBlack = false;

      // Check if navbar overlaps with black section
      if (blackSection) {
        const blackRect = blackSection.getBoundingClientRect();
        if (navTop < blackRect.bottom && navBottom > blackRect.top) {
          isOverBlack = true;
        }
      }

      // Check if navbar overlaps with video section
      if (videoSection && !isOverBlack) {
        const videoRect = videoSection.getBoundingClientRect();
        if (navTop < videoRect.bottom && navBottom > videoRect.top) {
          isOverBlack = true;
        }
      }

      setIsOverBlackSection(isOverBlack);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateNavbarColor);
        ticking = true;
      }
    };

    // Initial check
    updateNavbarColor();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateNavbarColor, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbarColor);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsScrollingToAnchor(true);
    setIsMobileMenuOpen(false);
    
    // Show loader immediately and reset progress
    setShowLoader(true);
    setScrollProgress(0);
    
    const navElement = document.getElementById('site-navbar') as HTMLElement | null;
    
    // Use the enhanced anchor scroll function with progress tracking
    scrollToAnchor(targetId, navElement, {
      duration: 700,
      waitForLazyContent: true,
      maxWaitTime: 3000,
      onProgress: (progress) => {
        setScrollProgress(progress);
      }
    }).then(() => {
      // Hide loader after scroll completes successfully
      setShowLoader(false);
      setIsScrollingToAnchor(false);
      setScrollProgress(0);
      
      // Dispatch scroll completion event to trigger fade-in animations
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scrollComplete'));
      }, 100);
    }).catch((error) => {
      console.warn('Error during anchor scroll:', error);
      // Hide loader even if there's an error
      setShowLoader(false);
      setIsScrollingToAnchor(false);
      setScrollProgress(0);
      
      // Still dispatch scroll completion event even on error
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scrollComplete'));
      }, 100);
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar-wrapper fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <motion.nav 
        id="site-navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full backdrop-blur-md border-0 pointer-events-auto transition-colors duration-500 ${
          isOverBlackSection ? 'bg-black/90' : 'bg-white/90'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center">
          {/* Left side navigation */}
          <div className="py-4">
            <button
              onClick={() => {
                scrollToTop();
                setIsMobileMenuOpen(false);
              }}
              className="hover:opacity-80 transition-opacity flex items-center justify-center"
              aria-label="Return to home page"
            >
              <Image
                src="/portfolio/images/signature-25.png"
                alt="Daniel Meier"
                width={150}
                height={37}
                className={`h-9 w-auto transition-all duration-500 ${
                  isOverBlackSection ? 'invert' : ''
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden pl-4 py-2 rounded-lg transition-colors duration-500 flex items-center justify-end ${
              isOverBlackSection ? 'text-white' : 'text-black'
            }`}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between items-center">
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block py-4">
            <nav className="flex items-center space-x-8">
              <a 
                href="#black-section" 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className={`text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Digital Design
              </a>
              <a 
                href="#video-projects" 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className={`text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Video
              </a>
              <a 
                href="#world-travel-diaries" 
                onClick={(e) => handleAnchorClick(e, 'world-travel-diaries')}
                className={`text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Travelogue
              </a>
              <a 
                href="#photography" 
                onClick={(e) => handleAnchorClick(e, 'photography')}
                className={`hidden text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Wayfinder Diaries
              </a>
            </nav>
          </div>
        </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md pointer-events-auto transition-colors duration-500 ${
              isOverBlackSection ? 'bg-black/95' : 'bg-white/95'
            }`}
          >
            <div className="max-w-4xl mx-auto px-6">
              <nav className="flex flex-col py-4 space-y-4">
              <a 
                href="#black-section" 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className={`text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Digital Design
              </a>
              <a 
                href="#video-projects" 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className={`text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Video
              </a>
              <a 
                href="#world-travel-diaries" 
                onClick={(e) => handleAnchorClick(e, 'world-travel-diaries')}
                className={`text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Travelogue
              </a>
              <a 
                href="#photography" 
                onClick={(e) => handleAnchorClick(e, 'photography')}
                className={`hidden text-[12pt] hover:text-blue-400 transition-colors duration-500 cursor-pointer ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Wayfinder Diaries
              </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Anchor Scroll Loader */}
      <AnchorScrollLoader 
        isVisible={showLoader}
        progress={scrollProgress}
        onComplete={() => {
          // Hide loader when progress reaches 100%
          setShowLoader(false);
          setIsScrollingToAnchor(false);
          setScrollProgress(0);
        }}
      />
    </div>
  );
};

export default Navbar; 