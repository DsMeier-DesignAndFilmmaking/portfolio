'use client';

import { useEffect, useRef } from 'react';

interface HashNavigationHandlerProps {
  /** Delay before attempting to scroll to hash */
  delay?: number;
  /** Whether to use smooth scrolling */
  smooth?: boolean;
  /** Offset for fixed navbar */
  offset?: number;
}

export default function HashNavigationHandler({
  delay = 100,
  smooth = true,
  offset = 120
}: HashNavigationHandlerProps) {
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Step 1: Prevent browser from auto-scrolling on load
    // Reset to top immediately if there's a hash, so browser doesn't jump
    if (window.location.hash) {
      // Prevent native instant jump
      window.scrollTo(0, 0);
    }

    // Handle all anchor links with href starting with "#"
    const handleAnchorClick = (e: MouseEvent) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const hash = link.getAttribute('href');

      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      // Stop native jump
      e.preventDefault();

      // Cancel any pending RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        // Let lazy content settle
        const timer = setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, delay);
        timersRef.current.push(timer);
      });
    };

    // Attach click listeners to all anchor links
    const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Handle page load with hash - ensure only one smooth scroll happens
    const handlePageLoad = () => {
      if (!window.location.hash) return;

      const el = document.querySelector(window.location.hash);
      if (!el) return;

      const timer = setTimeout(() => {
        el.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, delay);
      timersRef.current.push(timer);
    };

    // Wait for load event before handling initial hash
    window.addEventListener('load', handlePageLoad, { once: true });

    // Also handle if already loaded
    if (document.readyState === 'complete') {
      handlePageLoad();
    }

    // Cleanup
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('load', handlePageLoad);
      
      // Clear all timers
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
      
      // Cancel any pending RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [delay]);

  // This component doesn't render anything
  return null;
}
