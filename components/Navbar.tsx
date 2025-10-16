'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrollingToAnchor, setIsScrollingToAnchor] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    
    // Add # prefix if not present
    const selector = targetId.startsWith('#') ? targetId : `#${targetId}`;
    console.log('Scrolling to:', selector);
    
    // For travelogue section, use a more robust approach to ensure stable scroll
    const scrollToTarget = async () => {
      if (targetId === 'travelogue') {
        console.log('Ensuring stable layout for travelogue scroll...');
        
        // Wait for DOM to be fully stable and all elements to have their final dimensions
        await new Promise(resolve => {
          // Wait for any pending layout calculations
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Additional wait for any lazy-loaded content to settle
              setTimeout(resolve, 100);
            });
          });
        });
        
        // Force a reflow to ensure all measurements are accurate
        const videoSection = document.getElementById('video-projects');
        if (videoSection) {
          videoSection.offsetHeight; // Force reflow
        }
      }
      
      // Now scroll to the actual target with accurate measurements
      let targetElement = document.querySelector(selector);
      
      // For travelogue, target the background element specifically
      if (targetId === 'travelogue') {
        const backgroundElement = document.getElementById('world-travel-diaries-background');
        if (backgroundElement) {
          targetElement = backgroundElement;
          console.log('Using background element for travelogue scroll');
        }
      }
      
      if (targetElement) {
        console.log('Target element found:', targetElement);
        
        // Force a reflow to ensure accurate measurements
        (targetElement as HTMLElement).offsetHeight;
        
        const rect = targetElement.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset;
        
        // Special handling for travelogue section to show earth-map background better
        let navbarHeight = 80; // Default navbar height
        if (targetId === 'travelogue') {
          navbarHeight = 40; // Reduced offset for travelogue to show more of the background image
        }
        
        const finalPosition = Math.max(absoluteTop - navbarHeight, 0);
        
        console.log('Scrolling to position:', finalPosition, 'for target:', targetId);
        
        // Smooth scroll to target
        window.scrollTo({
          top: finalPosition,
          behavior: 'smooth'
        });
        
        // Mark scrolling as complete after animation
        setTimeout(() => {
          setIsScrollingToAnchor(false);
          window.dispatchEvent(new CustomEvent('scrollComplete'));
        }, 800); // Slightly longer than scroll duration
      } else {
        console.log('Target element not found:', selector);
        setIsScrollingToAnchor(false);
      }
    };
    
    scrollToTarget();
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
                href="#travelogue" 
                onClick={(e) => handleAnchorClick(e, 'travelogue')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Travelogue
              </a>
              <Link 
                href="/my-pulse"
                className={`text-12pt hover-text-blue-400 transition-colors duration-500 ${
                  pathname === '/my-pulse' ? 'text-blue-400' : isOverBlackSection ? 'text-white' : 'text-black'
                }`}
                target="_self"
                rel=""
              >
                My Pulse
              </Link>
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
                href="#travelogue" 
                onClick={(e) => handleAnchorClick(e, 'travelogue')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Travelogue
              </a>
              <Link 
                href="/my-pulse"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-12pt hover-text-blue-400 transition-colors duration-500 ${
                  pathname === '/my-pulse' ? 'text-blue-400' : isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
                target="_self"
                rel=""
              >
                My Pulse
              </Link>
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
    </div>
  );
};

export default Navbar; 