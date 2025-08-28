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
    let rafId: number;
    let lastScrollY = 0;

    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          setIsScrolling(true);
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 100);
          
          lastScrollY = currentScrollY;
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
    console.log(`Attempting to scroll to: ${targetId}`);
    setIsScrollingToAnchor(true);
    setIsMobileMenuOpen(false);
    
    const targetElement = document.getElementById(targetId);
    console.log(`Target element found:`, targetElement);
    
    if (targetElement) {
      // Force a reflow to ensure accurate measurements
      targetElement.offsetHeight;
      const navElement = document.getElementById('site-navbar') as HTMLElement | null;
      
      const measureHeaderOffset = () => {
        if (!navElement) return 0;
        const navRect = navElement.getBoundingClientRect();
        const computed = window.getComputedStyle(navElement);
        const marginTop = parseFloat(computed.marginTop || '0');
        return navRect.height + marginTop;
      };

      const computeTargetTop = () => {
        const rect = targetElement.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset;
        const offset = measureHeaderOffset();
        return Math.max(absoluteTop - offset, 0);
      };

      // Wait for any pending layout operations to complete
      const performScroll = () => {
        console.log('Performing scroll to target element');
        const initialScroll = window.pageYOffset;
        const targetTop = computeTargetTop();
        console.log(`Initial scroll position: ${initialScroll}, Target position: ${targetTop}`);
        
        // Try direct scroll first for more reliable positioning
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
        
        // Double-check position after scroll animation and correct if needed
        setTimeout(() => {
          const corrected = computeTargetTop();
          const currentScroll = window.pageYOffset;
          const delta = Math.abs(currentScroll - corrected);
          
          console.log(`After scroll - Current: ${currentScroll}, Target: ${corrected}, Delta: ${delta}`);
          
          // If we're more than 5px off, correct the position
          if (delta > 5) {
            console.log(`Correcting scroll position: current=${currentScroll}, target=${corrected}, delta=${delta}`);
            window.scrollTo({ 
              top: corrected, 
              behavior: 'auto' 
            });
            
            // Final check after correction
            setTimeout(() => {
              const finalScroll = window.pageYOffset;
              const finalDelta = Math.abs(finalScroll - corrected);
              console.log(`Final position check: ${finalScroll}, delta: ${finalDelta}`);
              
              // If still off, try one more time with a different approach
              if (finalDelta > 10) {
                console.log('Using fallback scroll method');
                const rect = targetElement.getBoundingClientRect();
                const absoluteTop = rect.top + window.pageYOffset;
                const navHeight = navElement ? navElement.offsetHeight : 0;
                window.scrollTo({
                  top: absoluteTop - navHeight - 20, // Extra 20px buffer
                  behavior: 'auto'
                });
              }
            }, 50);
          }
        }, 150); // Increased delay to account for smooth scroll animation
      };

      // Ensure DOM is ready and images are loaded before scrolling
      const waitForImages = () => {
        const images = document.querySelectorAll('img');
        const promises = Array.from(images).map(img => {
          if (img.complete) {
            return Promise.resolve();
          } else {
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // Don't wait for failed images
            });
          }
        });
        
        return Promise.all(promises);
      };

      const performScrollWithImageCheck = async () => {
        try {
          // Wait for images to load (with a timeout)
          await Promise.race([
            waitForImages(),
            new Promise(resolve => setTimeout(resolve, 1000)) // 1 second timeout
          ]);
          
          // Wait for layout to stabilize using ResizeObserver
          const waitForLayoutStable = () => {
            return new Promise<void>((resolve) => {
              let resizeTimeout: NodeJS.Timeout;
              let lastHeight = document.body.scrollHeight;
              let stableCount = 0;
              
              const observer = new ResizeObserver(() => {
                clearTimeout(resizeTimeout);
                const currentHeight = document.body.scrollHeight;
                
                if (Math.abs(currentHeight - lastHeight) < 5) {
                  stableCount++;
                  if (stableCount >= 2) {
                    observer.disconnect();
                    resolve();
                    return;
                  }
                } else {
                  stableCount = 0;
                }
                
                lastHeight = currentHeight;
                resizeTimeout = setTimeout(() => {
                  observer.disconnect();
                  resolve();
                }, 200);
              });
              
              observer.observe(document.body);
              
              // Fallback timeout
              setTimeout(() => {
                observer.disconnect();
                resolve();
              }, 500);
            });
          };
          
          await waitForLayoutStable();
          performScroll();
        } catch (error) {
          console.warn('Error waiting for images:', error);
          performScroll();
        }
      };

      if (document.readyState === 'complete') {
        performScrollWithImageCheck();
      } else {
        // Wait for page to be fully loaded
        window.addEventListener('load', performScrollWithImageCheck, { once: true });
      }
    } else {
      console.warn(`Target element with id '${targetId}' not found`);
    }
    
    // Reset the scrolling state after animation completes
    setTimeout(() => {
      setIsScrollingToAnchor(false);
    }, 1000);
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
      className={`fixed top-0 left-0 right-0 z-50 mt-5 transition-transform duration-300 scroll-optimized ${
        isScrolling && !isScrollingToAnchor ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'
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
    </motion.nav>
  );
};

export default Navbar; 