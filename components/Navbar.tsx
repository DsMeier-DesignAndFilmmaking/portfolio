'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateTravelogueScrollOffset } from '@/utils/travelogueScrollUtils';
import { smoothScrollToId } from '@/utils/scrollUtils';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrollingToAnchor, setIsScrollingToAnchor] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverBlackSection, setIsOverBlackSection] = useState(false);
  const [isInDesignSection, setIsInDesignSection] = useState(false);
  const [hasEnteredDesignSection, setHasEnteredDesignSection] = useState(false);



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
        const travelogueSection = document.getElementById('travelogue');
        const aboutSection = document.getElementById('about');

        const navRect = navbar.getBoundingClientRect();
        const navBottom = navRect.bottom;
        const navTop = navRect.top;

        // Check if navbar overlaps with About section
        let isCurrentlyInAbout = false;
        if (aboutSection) {
          // Find the actual About section element (the section that follows the anchor-offset div)
          const aboutSectionElement = aboutSection.nextElementSibling as HTMLElement;
          if (aboutSectionElement && aboutSectionElement.tagName === 'SECTION') {
            const aboutRect = aboutSectionElement.getBoundingClientRect();
            if (navTop < aboutRect.bottom && navBottom > aboutRect.top) {
              isCurrentlyInAbout = true;
            }
          }
        }

        // Check if navbar overlaps with black section (Work section)
        let isCurrentlyInDesign = false;
        if (blackSection) {
          const blackRect = blackSection.getBoundingClientRect();
          if (navTop < blackRect.bottom && navBottom > blackRect.top) {
            isOverBlack = true;
            isCurrentlyInDesign = true;
          }
        }

        // Check if navbar overlaps with video section
        if (videoSection && !isOverBlack) {
          const videoRect = videoSection.getBoundingClientRect();
          if (navTop < videoRect.bottom && navBottom > videoRect.top) {
            isOverBlack = true;
          }
        }

        // Check if navbar overlaps with travelogue section
        if (travelogueSection && !isOverBlack) {
          const travelogueRect = travelogueSection.getBoundingClientRect();
          if (navTop < travelogueRect.bottom && navBottom > travelogueRect.top) {
            isOverBlack = true;
          }
        }

        // Track if we've ever entered a section that requires navbar shrink
        // This includes About, Work (black-section), Video, and Travelogue sections
        if ((isCurrentlyInAbout || isCurrentlyInDesign) && !hasEnteredDesignSection) {
          setHasEnteredDesignSection(true);
        }

        // Determine if navbar should be shrunk
        // Once we've entered any section requiring shrink (About, Work, Video, Travelogue),
        // keep shrunk for all sections below
        // Only un-shrink if we scroll back above all these sections
        if (hasEnteredDesignSection) {
          // Check if we're back above the About section (first section that triggers shrink)
          if (aboutSection) {
            const aboutSectionElement = aboutSection.nextElementSibling as HTMLElement;
            if (aboutSectionElement && aboutSectionElement.tagName === 'SECTION') {
              const aboutRect = aboutSectionElement.getBoundingClientRect();
              const aboutSectionTop = aboutRect.top + scrollY;
              
              // If we're above the About section (with some buffer), reset
              if (scrollY < aboutSectionTop - 200) {
                setHasEnteredDesignSection(false);
                setIsInDesignSection(false);
              } else {
                // We're at or past the About section, keep shrunk
                setIsInDesignSection(true);
              }
            } else if (blackSection) {
              // Fallback to black section check
              const blackRect = blackSection.getBoundingClientRect();
              const designSectionTop = blackRect.top + scrollY;
              
              if (scrollY < designSectionTop - 200) {
                setHasEnteredDesignSection(false);
                setIsInDesignSection(false);
              } else {
                setIsInDesignSection(true);
              }
            } else {
              // Fallback: if we're near the top of the page, reset
              if (scrollY < 300) {
                setHasEnteredDesignSection(false);
                setIsInDesignSection(false);
              } else {
                setIsInDesignSection(true);
              }
            }
          } else if (blackSection) {
            // Fallback to black section check if About section not found
            const blackRect = blackSection.getBoundingClientRect();
            const designSectionTop = blackRect.top + scrollY;
            
            if (scrollY < designSectionTop - 200) {
              setHasEnteredDesignSection(false);
              setIsInDesignSection(false);
            } else {
              setIsInDesignSection(true);
            }
          } else {
            // Fallback: if we're near the top of the page, reset
            if (scrollY < 300) {
              setHasEnteredDesignSection(false);
              setIsInDesignSection(false);
            } else {
              setIsInDesignSection(true);
            }
          }
        } else {
          // Use normal logic if we haven't entered any shrink-triggering section yet
          // Trigger shrink if we're in About, Work, Video, or Travelogue sections
          setIsInDesignSection(isCurrentlyInAbout || isOverBlack);
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
  }, [isOnPurduePage, hasEnteredDesignSection]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Immediately prevent ALL default anchor behavior to stop browser from auto-scrolling
    e.preventDefault();
    e.stopPropagation();
    
    setIsScrollingToAnchor(true);
    setIsMobileMenuOpen(false);
    
    // If clicking "Work" (black-section) or "About", immediately trigger navbar width animation
    if (targetId === 'black-section' || targetId === 'about') {
      setHasEnteredDesignSection(true);
      setIsInDesignSection(true);
    }
    
    // Add # prefix if not present
    const selector = targetId.startsWith('#') ? targetId : `#${targetId}`;
    console.log('Scrolling to:', selector);
    
    // For travelogue section, use a more robust approach to ensure stable scroll
    const scrollToTarget = async () => {
      // For black-section and about, wait for navbar state change to apply before calculating scroll
      // This ensures the navbar shrink animation doesn't cause layout shifts during scroll
      if (targetId === 'black-section' || targetId === 'about') {
        // Wait for React state update to propagate and navbar layout to stabilize
        await new Promise(resolve => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Give navbar shrink animation time to apply (typically one frame)
              setTimeout(resolve, 50);
            });
          });
        });
        
        // Force reflow to ensure navbar measurements are accurate
        const navbar = document.getElementById('site-navbar');
        if (navbar) {
          navbar.offsetHeight;
        }
        
        // For black-section, ensure FadeInSection animations are triggered before scroll calculation
        if (targetId === 'black-section') {
          const section = document.getElementById('black-section');
          if (section && section.tagName === 'SECTION') {
            // Trigger FadeInSection visibility by simulating intersection
            // Dispatch scrollComplete to trigger FadeInSection's event listener
            window.dispatchEvent(new CustomEvent('scrollComplete'));
            
            // Wait for FadeInSection state updates and initial animation frame
            await new Promise(resolve => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setTimeout(resolve, 150);
                  });
                });
              });
            });
            
            // Force reflow on the section and all its children
            section.offsetHeight;
            const allChildren = section.querySelectorAll('*');
            allChildren.forEach((child) => {
              (child as HTMLElement).offsetHeight;
            });
          }
        }
      }
      
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
      
      // Special handling for contact - scroll to bottom of page
      if (targetId === 'contact') {
        const scrollToBottom = () => {
          const scrollHeight = document.documentElement.scrollHeight;
          const viewportHeight = window.innerHeight;
          const finalPosition = scrollHeight - viewportHeight;
          
          console.log('Scrolling to bottom of page for contact');
          
          window.scrollTo({
            top: finalPosition,
            behavior: 'smooth'
          });
          
          // Mark scrolling as complete after animation
          setTimeout(() => {
            setIsScrollingToAnchor(false);
            window.dispatchEvent(new CustomEvent('scrollComplete'));
          }, 800);
        };
        
        scrollToBottom();
        return;
      }
      
      // Scroll function that can be called multiple times
      const performScroll = async () => {
        // Wait for layout to stabilize - handle both loaded and loading states
        await new Promise<void>((resolve) => {
          const waitForStableLayout = () => {
            // Use multiple requestAnimationFrames to ensure layout is stable
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // Additional timeout for lazy-loaded elements and animations
                setTimeout(() => {
                  resolve();
                }, 100);
              });
            });
          };
          
          // If document is still loading, wait for load event first
          if (document.readyState === 'loading') {
            const onDOMContentLoaded = () => {
              document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
              if (document.readyState === 'complete') {
                waitForStableLayout();
              } else {
                window.addEventListener('load', () => {
                  waitForStableLayout();
                }, { once: true });
              }
            };
            document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
          } else if (document.readyState === 'interactive') {
            // DOM ready but resources still loading, wait for load event
            window.addEventListener('load', () => {
              waitForStableLayout();
            }, { once: true });
          } else {
            // Document fully loaded (readyState === 'complete'), just wait for layout stability
            waitForStableLayout();
          }
        });
      
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
          
          // Force reflow on parent containers that might affect layout
          const section = (targetElement as HTMLElement).closest('section');
          if (section) {
            (section as HTMLElement).offsetHeight;
          }
          
          // Force reflow on all sections before this one to ensure accurate layout
          const allSections = document.querySelectorAll('section');
          allSections.forEach((sec) => {
            if (sec.compareDocumentPosition(targetElement as HTMLElement) & Node.DOCUMENT_POSITION_PRECEDING) {
              (sec as HTMLElement).offsetHeight;
            }
          });
        
        const rect = targetElement.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset;
        
        // Check for CSS scroll-margin-top (used by anchor-offset elements)
        const computedStyle = window.getComputedStyle(targetElement as HTMLElement);
        const scrollMarginTop = parseFloat(computedStyle.scrollMarginTop || '0');
        
        // Special handling for different sections
        let navbarHeight = 80; // Default navbar height
        if (targetId === 'travelogue') {
          // Calculate dynamic offset based on video section loading state
          navbarHeight = calculateTravelogueScrollOffset();
        } else if (targetId === 'video-projects') {
          // Subtract 60px offset for video-projects (Travelogue link) to scroll further down
          navbarHeight = 80 - 60;
        } else if (targetId === 'about') {
          // Subtract 90px offset for about section to scroll further down (40px + 20px + 30px)
          navbarHeight = 80 - 90;
        } else if (targetId === 'black-section' && scrollMarginTop > 0) {
          // For black-section with anchor-offset, use CSS scroll-margin-top
          navbarHeight = scrollMarginTop;
        }
        
        // Calculate final scroll position
        // If scrollMarginTop is set, it's already accounted for in navbarHeight
        const finalPosition = Math.max(absoluteTop - navbarHeight, 0);
        
        console.log('Scrolling to position:', finalPosition, 'for target:', targetId);
        
          return { targetElement, finalPosition };
        } else {
          console.log('Target element not found:', selector);
          return null;
        }
      };
      
      // Single, accurate scroll after layout is fully stable
      const scrollResult = await performScroll();
      if (scrollResult) {
        window.scrollTo({
          top: scrollResult.finalPosition,
          behavior: 'smooth'
        });
        
        // Mark scrolling as complete after animation
        setTimeout(() => {
          setIsScrollingToAnchor(false);
          window.dispatchEvent(new CustomEvent('scrollComplete'));
        }, 800);
      } else {
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
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
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
                href="#about" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'about')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                About
              </a>
              <a
                href="#black-section"
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Work
              </a>
              <a 
                href="#video-projects" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Travelogue
              </a>
              <a 
                href="#contact" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'contact')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-white' : 'text-black'
                }`}
              >
                Contact
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
                href="#about" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'about')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                About
              </a>
              
              <a 
                href="#black-section" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'black-section')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Work
              </a>
              
              <a 
                href="#video-projects" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'video-projects')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Travelogue
              </a> 
              
              <a 
                href="#contact" 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => handleAnchorClick(e, 'contact')}
                className={`text-12pt hover-text-blue-400 transition-all duration-500 cursor-pointer transform hover:translate-y-[-1px] ${
                  isOverBlackSection ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Contact
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