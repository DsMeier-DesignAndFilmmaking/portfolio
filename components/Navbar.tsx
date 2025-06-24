'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrollingToAnchor, setIsScrollingToAnchor] = useState(false);
  const [textColor, setTextColor] = useState('white');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let anchorScrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);

      // Get the sections
      const blackSection = document.getElementById('black-section');
      const videoSection = document.getElementById('video-projects');

      if (blackSection && videoSection) {
        const navRect = document.querySelector('nav')?.getBoundingClientRect();
        if (navRect) {
          const navBottom = navRect.bottom;
          const blackSectionTop = blackSection.getBoundingClientRect().top;
          const videoSectionTop = videoSection.getBoundingClientRect().top;

          // Only change color if we've scrolled past the hero section
          if (window.scrollY > 100) {
            if (navBottom > videoSectionTop) {
              // Over the video section (black background)
              setTextColor('white');
            } else if (navBottom > blackSectionTop) {
              // Over the black section (black background)
              setTextColor('white');
            } else {
              // Over the hero section (light background)
              setTextColor('white');
            }
          } else {
            // At the top, over the hero section
            setTextColor('white');
          }
        }
      }
    };

    const handleAnchorClick = () => {
      setIsScrollingToAnchor(true);
      clearTimeout(anchorScrollTimeout);
      anchorScrollTimeout = setTimeout(() => {
        setIsScrollingToAnchor(false);
      }, 1000);
      setIsMobileMenuOpen(false); // Close mobile menu when clicking a link
    };

    // Add click event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    window.addEventListener('scroll', handleScroll);
    // Set initial color to white
    setTextColor('white');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      clearTimeout(scrollTimeout);
      clearTimeout(anchorScrollTimeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 mt-5 transition-transform duration-300 ${
        isScrolling ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-6">
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
                src="./images/signature-25.png"
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
              <Link 
                href="#black-section" 
                className={`text-[12pt] transition-colors duration-200 ${
                  textColor === 'white' 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Digital Design
              </Link>
              <Link 
                href="#video-projects" 
                className={`text-[12pt] transition-colors duration-200 ${
                  textColor === 'white' 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Video
              </Link>
              <Link 
                href="#photography" 
                className={`hidden text-[12pt] transition-colors duration-200 ${
                  textColor === 'white' 
                    ? 'text-white hover:text-blue-400' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Wayfinder Diaries
              </Link>
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
              <Link 
                href="#black-section" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors"
              >
                Digital Design
              </Link>
              <Link 
                href="#video-projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors"
              >
                Video
              </Link>
              <Link 
                href="#photography" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hidden text-[12pt] text-gray-600 hover:text-gray-900 transition-colors"
              >
                Wayfinder Diaries
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 