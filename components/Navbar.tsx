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
  const [navStyles, setNavStyles] = useState({
    top: 32,
    opacity: 0.7,
    blur: 8
  });

  useEffect(() => {
    let rafId: number;
    let ticking = false;
    let currentStyles = {
      top: 32,
      opacity: 0.7,
      blur: 8
    };

    const updateNavbar = () => {
      const isDesktop = window.innerWidth >= 768;
      const scrollY = window.scrollY;

      if (!isDesktop) {
        // Mobile: pinned flush-top with fixed styles
        currentStyles = {
          top: 0,
          opacity: 0.9,
          blur: 8
        };
        setNavStyles(currentStyles);
        ticking = false;
        return;
      }

      // Desktop: fluid interpolation based on scroll
      const maxOffset = 50; // max scroll distance for full effect
      const progress = Math.min(scrollY / maxOffset, 1);

      // Damping factor for smooth momentum
      const damping = 0.15;

      // Interpolate top position (32px to 0px)
      const targetTop = 32 - (32 * progress);
      currentStyles.top += (targetTop - currentStyles.top) * damping;

      // Interpolate opacity (0.7 to 0.95)
      const targetOpacity = 0.7 + (0.25 * progress);
      currentStyles.opacity += (targetOpacity - currentStyles.opacity) * damping;

      // Interpolate blur (8px to 12px)
      const targetBlur = 8 + (4 * progress);
      currentStyles.blur += (targetBlur - currentStyles.blur) * damping;

      setNavStyles({ ...currentStyles });
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    // Initial update
    updateNavbar();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateNavbar, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbar);
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
    <div 
      className="navbar-wrapper fixed left-0 right-0 z-50 pointer-events-none scroll-optimized"
      style={{
        top: `${navStyles.top}px`,
        transition: 'none'
      }}
    >
      <motion.nav 
        id="site-navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto w-full md:w-[95%] rounded-none md:rounded-2xl border-0 md:border md:border-white/20 pointer-events-auto"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${navStyles.opacity})`,
          backdropFilter: `blur(${navStyles.blur}px)`,
          WebkitBackdropFilter: `blur(${navStyles.blur}px)`,
          boxShadow: 'none'
        }}
      >
        <div className="px-6">
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
                className="h-9 w-auto transition-all duration-200"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden pl-4 py-2 rounded-lg transition-colors flex items-center justify-end text-black"
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
                className="text-[12pt] text-black hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Digital Design
              </a>
              <a 
                href="#video-projects" 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className="text-[12pt] text-black hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Video
              </a>
              <a 
                href="#world-travel-diaries" 
                onClick={(e) => handleAnchorClick(e, 'world-travel-diaries')}
                className="text-[12pt] text-black hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Travelogue
              </a>
              <a 
                href="#photography" 
                onClick={(e) => handleAnchorClick(e, 'photography')}
                className="hidden text-[12pt] text-black hover:text-blue-600 transition-colors duration-200 cursor-pointer"
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
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-0 md:mx-auto md:w-[95%] md:max-w-4xl bg-white/95 backdrop-blur-md rounded-lg pointer-events-auto"
          >
            <nav className="flex flex-col p-4 px-6 space-y-4">
              <a 
                href="#black-section" 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Digital Design
              </a>
              <a 
                href="#video-projects" 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Video
              </a>
              <a 
                href="#world-travel-diaries" 
                onClick={(e) => handleAnchorClick(e, 'world-travel-diaries')}
                className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Travelogue
              </a>
              <a 
                href="#photography" 
                onClick={(e) => handleAnchorClick(e, 'photography')}
                className="hidden text-[12pt] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Wayfinder Diaries
              </a>
            </nav>
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