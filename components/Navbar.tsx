'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToAnchor } from '@/utils/scrollUtils';
import AnchorScrollLoader from './AnchorScrollLoader';

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrollingToAnchor, setIsScrollingToAnchor] = useState(false);
  const [textColor, setTextColor] = useState('white');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let rafId: number;
    let lastScrollY = 0;
    let scrollDirection: 'up' | 'down' = 'down';
    let isScrollingDown = false;

    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // Determine scroll direction
        if (scrollDelta > 0) {
          scrollDirection = 'down';
        } else if (scrollDelta < 0) {
          scrollDirection = 'up';
        }
        
        // Only update if scroll position changed significantly and we're not at the top
        if (Math.abs(scrollDelta) > 10 && currentScrollY > 100) {
          // On mobile, only hide navbar when scrolling down, show when scrolling up
          if (window.innerWidth < 768) {
            if (scrollDirection === 'down' && currentScrollY > lastScrollY) {
              isScrollingDown = true;
            } else if (scrollDirection === 'up') {
              isScrollingDown = false;
            }
          } else {
            // Desktop behavior - hide on any scroll
            isScrollingDown = true;
          }
          
          setIsScrolling(isScrollingDown);
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 150); // Increased timeout for smoother behavior
          
          lastScrollY = currentScrollY;
        } else if (currentScrollY <= 100) {
          // Always show navbar when near the top
          setIsScrolling(false);
        }
      });
    };

    // Throttled scroll handler for color changes
    let colorUpdateTimeout: NodeJS.Timeout;
    let lastColorUpdate = 0;
    const handleColorUpdate = () => {
      const now = Date.now();
      if (now - lastColorUpdate < 100) return; // Throttle to 10fps
      
      if (colorUpdateTimeout) {
        clearTimeout(colorUpdateTimeout);
      }
      
      colorUpdateTimeout = setTimeout(() => {
        // Cache DOM queries
        const blackSection = document.getElementById('black-section');
        const videoSection = document.getElementById('video-projects');
        const navElement = document.querySelector('nav');

        if (blackSection && videoSection && navElement) {
          const navRect = navElement.getBoundingClientRect();
          const blackSectionTop = blackSection.getBoundingClientRect().top;
          const videoSectionTop = videoSection.getBoundingClientRect().top;

          // Only change color if we've scrolled past the hero section
          if (window.scrollY > 100) {
            if (navRect.bottom > videoSectionTop) {
              setTextColor('white');
            } else if (navRect.bottom > blackSectionTop) {
              setTextColor('white');
            } else {
              setTextColor('white');
            }
          } else {
            setTextColor('white');
          }
        }
        lastColorUpdate = Date.now();
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleColorUpdate, { passive: true });
    
    // Set initial color to white
    setTextColor('white');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleColorUpdate);
      clearTimeout(scrollTimeout);
      clearTimeout(colorUpdateTimeout);
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
    <motion.nav 
      id="site-navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 mt-5 transition-transform duration-500 ease-in-out scroll-optimized ${
        isScrolling && !isScrollingToAnchor ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'
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
                className={`h-9 w-auto transition-all duration-200 ${
                  textColor === 'white' 
                    ? 'brightness-0 invert' 
                    : 'brightness-0'
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden pl-4 py-2 rounded-lg transition-colors flex items-center justify-end ${
              textColor === 'white' ? 'text-white' : 'text-gray-900'
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
          <div className="hidden md:block rounded-lg px-6 py-4">
            <nav className="flex items-center space-x-8">
              <a 
                href="#black-section" 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className={`text-[12pt] transition-colors duration-200 cursor-pointer ${
                  textColor === 'white' 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Digital Design
              </a>
              <a 
                href="#video-projects" 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className={`text-[12pt] transition-colors duration-200 cursor-pointer ${
                  textColor === 'white' 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Video
              </a>
              <a 
                href="#world-travel-diaries" 
                onClick={(e) => handleAnchorClick(e, 'world-travel-diaries')}
                className={`text-[12pt] transition-colors duration-200 cursor-pointer ${
                  textColor === 'white' 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Travelogue
              </a>
              <a 
                href="#photography" 
                onClick={(e) => handleAnchorClick(e, 'photography')}
                className={`hidden text-[12pt] transition-colors duration-200 cursor-pointer ${
                  textColor === 'white' 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Wayfinder Diaries
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 rounded-lg shadow-lg"
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
    </motion.nav>
  );
};

export default Navbar; 