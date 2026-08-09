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
        className="hidden min-[1080px]:flex fixed top-1/2 -translate-y-1/2 flex-col gap-4 z-40"
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
    </>
  );
}
