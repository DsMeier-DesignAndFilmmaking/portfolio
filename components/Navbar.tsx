'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToAnchor } from '@/utils/scrollUtils';
import AnchorScrollLoader from './AnchorScrollLoader';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrollingToAnchor, setIsScrollingToAnchor] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverBlackSection, setIsOverBlackSection] = useState(false);
  const [isInDesignSection, setIsInDesignSection] = useState(false);



  // Determine if we're on a project page
  const isOnPurduePage = pathname?.includes('/projects/purdue');

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const updateNavbarColor = () => {
      const navbar = document.getElementById('site-navbar');
      const scrollY = window.scrollY;

      if (!navbar) {
        ticking = false;
        return;
      }


      let isOverBlack = false;

      // Special handling for Purdue page - turn black on scroll
      if (isOnPurduePage) {
        // Turn black after scrolling down 100px
        isOverBlack = scrollY > 100;
      } else {
        // Homepage behavior - check section overlap
        const blackSection = document.getElementById('black-section');
        const videoSection = document.getElementById('video-projects');

        const navRect = navbar.getBoundingClientRect();
        const navBottom = navRect.bottom;
        const navTop = navRect.top;

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

        // Width transition should trigger at the same time as color transition
        // Use the same isOverBlack logic for perfect synchronization
        setIsInDesignSection(isOverBlack);
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
  }, [isOnPurduePage]);

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
    <div className="navbar-wrapper">
      <motion.nav 
        id="site-navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`navbar-container ${
          isOverBlackSection ? 'bg-black-90' : 'bg-white-90'
        }`}
      >
        <div className="navbar-inner">
          <div 
            className={`navbar-content ${isInDesignSection ? 'shrink' : ''}`}
          >
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
            <div className="hamburger-container">
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-1 open' : 'hamburger-line-1'}`} />
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-2 open' : 'hamburger-line-2'}`} />
              <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-3 open' : 'hamburger-line-3'}`} />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block py-4">
            <nav className="flex items-center space-x-8">
              <a 
                href="#black-section" 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Digital Design
              </a>
              <a 
                href="#video-projects" 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Video
              </a>
              <a 
                href="#world-travel-diaries" 
                onClick={(e) => handleAnchorClick(e, 'world-travel-diaries')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Travelogue
              </a>
              {/* Temporarily hidden - My Pulse navbar item */}
              {/* <Link 
                href="/my-pulse"
                className={`text-12pt hover-text-blue-400 transition-colors duration-500 ${
                  pathname === '/my-pulse' ? 'text-blue-400' : isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                My Pulse
              </Link> */}
              <a 
                href="#photography" 
                onClick={(e) => handleAnchorClick(e, 'photography')}
                className={`hidden text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
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
            className={`mobile-menu md:hidden ${
              isOverBlackSection ? 'bg-black-95' : 'bg-white-95'
            }`}
          >
            <div className="max-w-4xl mx-auto px-6">
              <nav className="flex flex-col py-4 space-y-4">
              <a 
                href="#black-section" 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Digital Design
              </a>
              <a 
                href="#video-projects" 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Video
              </a>
              <a 
                href="#world-travel-diaries" 
                onClick={(e) => handleAnchorClick(e, 'world-travel-diaries')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Travelogue
              </a>
              {/* Temporarily hidden - My Pulse navbar item */}
              {/* <Link 
                href="/my-pulse"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-12pt hover-text-blue-400 transition-colors duration-500 ${
                  pathname === '/my-pulse' ? 'text-blue-400' : isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                My Pulse
              </Link> */}
              <a 
                href="#photography" 
                onClick={(e) => handleAnchorClick(e, 'photography')}
                className={`hidden text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
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