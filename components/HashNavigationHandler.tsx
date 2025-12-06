'use client';

import { useEffect, useRef } from 'react';
import { waitForVideoLayoutStable } from '@/utils/videoLayoutUtils';

interface HashNavigationHandlerProps {
  /** Delay before attempting to scroll to hash */
  delay?: number;
  /** Whether to use smooth scrolling */
  smooth?: boolean;
  /** Offset for fixed navbar */
  offset?: number;
}

export default function HashNavigationHandler({
  delay = 500,
  smooth = true,
  offset = 120
}: HashNavigationHandlerProps) {
  const hasHandledHashRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Step 1: Prevent browser from auto-scrolling on load
    // Reset to top immediately if there's a hash, so browser doesn't jump
    if (window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Step 2: Use IntersectionObserver to scroll when target is fully measurable
    const handleInitialHashScroll = () => {
      const hash = window.location.hash;
      
      if (!hash || hasHandledHashRef.current) {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) {
        // Element not found yet, retry after load event if not already loaded
        if (document.readyState !== 'complete') {
          window.addEventListener('load', handleInitialHashScroll, { once: true });
        }
        return;
      }

      // Mark as handled to prevent multiple attempts
      hasHandledHashRef.current = true;

      console.log('HashNavigationHandler: Setting up IntersectionObserver for', hash);

      // Use IntersectionObserver to detect when target is fully measurable
      // This handles lazy-loaded components, image placeholders, and variable-height blocks
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // Check if element has dimensions (is measurable/rendered)
          const rect = entry.boundingClientRect;
          const hasDimensions = rect.width > 0 || rect.height > 0;
          
          // Only proceed if element is measurable (has dimensions)
          // We scroll regardless of intersection status since we reset to top
          if (!hasDimensions) return;

          console.log('HashNavigationHandler: Target is measurable, scrolling to', hash);

          // If scrolling to travelogue section, wait for video layout to stabilize
          const performScroll = async () => {
            if (hash === '#travelogue' || hash === '#world-travel-diaries') {
              console.log('HashNavigationHandler: Waiting for video layout to stabilize...');
              await waitForVideoLayoutStable();
            }

            // Re-measure after potential layout changes
            const targetRect = target.getBoundingClientRect();
            const absoluteTop = targetRect.top + window.pageYOffset;
            const finalPosition = Math.max(absoluteTop - offset, 0);

            console.log('HashNavigationHandler: Final scroll position:', finalPosition);

            // Scroll to target with smooth behavior
            window.scrollTo({
              top: finalPosition,
              behavior: 'smooth'
            });

            // Dispatch custom event to trigger animations
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('scrollComplete'));
            }, 100);

            // Disconnect observer after scrolling
            io.disconnect();
            observerRef.current = null;
          };

          performScroll();
        },
        {
          // Use large rootMargin to ensure we detect elements outside viewport
          // This ensures the element is fully rendered and measurable
          threshold: 0,
          rootMargin: '9999px 0px 9999px 0px'
        }
      );

      observerRef.current = io;
      
      // Observe the anchor target itself
      io.observe(target);
    };

    // Start handling hash scroll after DOM is ready
    if (document.readyState === 'complete') {
      // Already loaded, execute immediately
      requestAnimationFrame(() => {
        handleInitialHashScroll();
      });
    } else {
      // Wait for load event (images/media/layout shifts finish)
      window.addEventListener('load', handleInitialHashScroll, { once: true });
      // Also try on DOMContentLoaded as fallback
      document.addEventListener('DOMContentLoaded', handleInitialHashScroll, { once: true });
    }

    // Handle hash changes (when user clicks anchor links after page load)
    const handleHashChange = () => {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      hasHandledHashRef.current = false;
      
      const hash = window.location.hash;
      if (!hash) return;
      
      const target = document.querySelector(hash);
      if (!target) return;

      // Use IntersectionObserver for hash changes too
      const io = new IntersectionObserver(
        async (entries) => {
          const entry = entries[0];
          // Check if element has dimensions (is measurable/rendered)
          const rect = entry.boundingClientRect;
          const hasDimensions = rect.width > 0 || rect.height > 0;
          
          if (!hasDimensions) return;

          // If scrolling to travelogue section, wait for video layout to stabilize
          if (hash === '#travelogue' || hash === '#world-travel-diaries') {
            await waitForVideoLayoutStable();
          }

          const targetRect = target.getBoundingClientRect();
          const absoluteTop = targetRect.top + window.pageYOffset;
          const finalPosition = Math.max(absoluteTop - offset, 0);

          window.scrollTo({
            top: finalPosition,
            behavior: smooth ? 'smooth' : 'auto'
          });

          io.disconnect();
        },
        {
          threshold: 0,
          rootMargin: '9999px 0px 9999px 0px' // Large margin to detect elements outside viewport
        }
      );

      observerRef.current = io;
      io.observe(target);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      // Clean up observers
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      window.removeEventListener('load', handleInitialHashScroll);
      document.removeEventListener('DOMContentLoaded', handleInitialHashScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [delay, smooth, offset]);

  // This component doesn't render anything
  return null;
}
