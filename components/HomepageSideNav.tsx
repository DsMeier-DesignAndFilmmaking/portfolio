'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function HomepageSideNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const isInitialLoadRef = useRef(true);
  const pageLoadedRef = useRef(false);
  const clickedSectionRef = useRef<string | null>(null);
  const clickedSectionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track when page is fully loaded
  useEffect(() => {
    if (pathname !== '/') return;

    const checkPageLoaded = () => {
      // Check if all images are loaded and layout is stable
      const images = document.querySelectorAll('img');
      let loadedImages = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        // No images, consider page loaded after a delay
        setTimeout(() => {
          pageLoadedRef.current = true;
        }, 500);
        return;
      }

      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener('load', () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              // All images loaded, wait a bit for layout to stabilize
              setTimeout(() => {
                pageLoadedRef.current = true;
              }, 200);
            }
          }, { once: true });
          
          img.addEventListener('error', () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              setTimeout(() => {
                pageLoadedRef.current = true;
              }, 200);
            }
          }, { once: true });
        }
      });

      if (loadedImages === totalImages) {
        setTimeout(() => {
          pageLoadedRef.current = true;
        }, 200);
      }

      // Fallback timeout - consider page loaded after 2 seconds regardless
      setTimeout(() => {
        pageLoadedRef.current = true;
      }, 2000);
    };

    // Check on mount
    if (document.readyState === 'complete') {
      checkPageLoaded();
    } else {
      window.addEventListener('load', checkPageLoaded, { once: true });
    }

    // Also check after a delay to catch lazy-loaded content
    const timeoutId = setTimeout(() => {
      checkPageLoaded();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Track active section on homepage only
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['hero', 'about', 'work', 'travelogue', 'contact'];
    const offset = 150; // Offset from top to trigger active state

    const checkActiveSection = () => {
      // Don't override a manually-clicked section during the lock window
      if (clickedSectionRef.current) {
        setActiveSection(clickedSectionRef.current);
        return;
      }

      const scrollPosition = window.scrollY + offset;

      // If near top, set hero as active
      if (scrollPosition < 200) {
        setActiveSection('hero');
        return;
      }

      // Find the section currently in view
      let currentSection = 'hero';

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          // Check if section is above the scroll threshold
          if (scrollPosition >= elementTop - 100) {
            currentSection = sections[i];
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Initial check after DOM is ready
    const timeoutId = setTimeout(checkActiveSection, 100);

    // Throttled scroll handler for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkActiveSection, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkActiveSection);
    };
  }, [pathname]);

  const isActive = (sectionId: string) => {
    if (pathname !== '/') return false;
    return activeSection === sectionId;
  };

  const getIndicatorClassName = (sectionId: string) => {
    const baseClasses = "rounded-full transition-all duration-300";
    if (isActive(sectionId)) {
      return `${baseClasses} w-3 h-3 bg-neutral-800`;
    }
    return `${baseClasses} w-2 h-2 bg-neutral-400 group-hover:bg-neutral-600`;
  };

  const getLabelClassName = (sectionId: string) => {
    const baseClasses = "text-xs transition-opacity duration-300";
    if (isActive(sectionId)) {
      return `${baseClasses} text-neutral-800 opacity-100 font-medium`;
    }
    return `${baseClasses} text-neutral-500 opacity-0 group-hover:opacity-100`;
  };

  const handleAnchorClick = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = document.getElementById(sectionId);
    if (!target) {
      window.location.href = `#${sectionId}`;
      return;
    }

    // Lock active state immediately — prevents scroll detection from overriding
    if (clickedSectionTimeoutRef.current) clearTimeout(clickedSectionTimeoutRef.current);
    clickedSectionRef.current = sectionId;
    setActiveSection(sectionId);

    window.history.pushState(null, '', `#${sectionId}`);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Release lock after smooth scroll completes (~1s)
        clickedSectionTimeoutRef.current = setTimeout(() => {
          clickedSectionRef.current = null;
        }, 1500);
      });
    });
  };

  const handleWorkClick = handleAnchorClick('work');
  const handleTravelogueClick = handleAnchorClick('travelogue');

  return (
    <>
      {/* Desktop Navigation - Left Side, positioned closer to content */}
      <nav 
        className="hidden lg:flex fixed top-1/2 -translate-y-1/2 flex-col gap-4 z-40"
        style={{ left: 'calc((100% - 896px) / 2 - 80px)' }}
        aria-label="Page sections navigation"
      >
        <a 
          href="#hero" 
          className="group flex items-center gap-2"
          aria-label="Go to Intro section"
          aria-current={isActive('hero') ? 'page' : undefined}
        >
          <span className={getIndicatorClassName('hero')} />
          <span className={getLabelClassName('hero')}>
            Intro
          </span>
        </a>
        
        <a 
          href="#about" 
          className="group flex items-center gap-2"
          aria-label="Go to About section"
          aria-current={isActive('about') ? 'page' : undefined}
        >
          <span className={getIndicatorClassName('about')} />
          <span className={getLabelClassName('about')}>
            About
          </span>
        </a>
        
        <a 
          href="#work" 
          onClick={handleWorkClick}
          className="group flex items-center gap-2"
          aria-label="Go to Work section"
          aria-current={isActive('work') ? 'page' : undefined}
        >
          <span className={getIndicatorClassName('work')} />
          <span className={getLabelClassName('work')}>
            Work
          </span>
        </a>
        
        <a 
          href="#travelogue" 
          onClick={handleTravelogueClick}
          className="group flex items-center gap-2"
          aria-label="Go to Travel section"
          aria-current={isActive('travelogue') ? 'page' : undefined}
        >
          <span className={getIndicatorClassName('travelogue')} />
          <span className={getLabelClassName('travelogue')}>
            Travel
          </span>
        </a>
        
        <a
          href="#contact"
          onClick={handleAnchorClick('contact')}
          className="group flex items-center gap-2"
          aria-label="Go to Contact section"
          aria-current={isActive('contact') ? 'page' : undefined}
        >
          <span className={getIndicatorClassName('contact')} />
          <span className={getLabelClassName('contact')}>
            Contact
          </span>
        </a>
      </nav>

      {/* Mobile Navigation - Floating Top Nav (matches project pages design) */}
      {/* Raised position: top-16 (64px) + safe-area-inset-top for better thumb reach */}
      <nav 
        className="lg:hidden fixed left-0 right-0 z-40 px-6"
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) + 64px)' /* 64px base + safe area */
        }}
        aria-label="Page sections navigation"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg min-h-[56px] flex items-center justify-center">
          <ul className="flex justify-center space-x-2" role="list">
            <li role="listitem">
              <a
                href="#hero"
                className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  isActive('hero') 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-label="Go to Intro section"
                aria-current={isActive('hero') ? 'page' : undefined}
              >
                <span className="text-xs font-medium" aria-hidden="true">1</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#about"
                className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                  isActive('about') 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-label="Go to About section"
                aria-current={isActive('about') ? 'page' : undefined}
              >
                <span className="text-xs font-medium" aria-hidden="true">2</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#work"
                onClick={handleWorkClick}
                className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  isActive('work') 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-label="Go to Work section"
                aria-current={isActive('work') ? 'page' : undefined}
              >
                <span className="text-xs font-medium" aria-hidden="true">3</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#travelogue"
                onClick={handleTravelogueClick}
                className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive('travelogue') 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-label="Go to Travel section"
                aria-current={isActive('travelogue') ? 'page' : undefined}
              >
                <span className="text-xs font-medium" aria-hidden="true">4</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#contact"
                onClick={handleAnchorClick('contact')}
                className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive('contact')
                    ? 'bg-gray-900 text-white'
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-label="Go to Contact section"
                aria-current={isActive('contact') ? 'page' : undefined}
              >
                <span className="text-xs font-medium" aria-hidden="true">5</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
