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

  useEffect(() => {
    // Step 1: Prevent browser from auto-scrolling on load
    // Reset to top immediately if there's a hash, so browser doesn't jump
    if (window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Step 2: Wait for images/lazy-loaded elements to render, then scroll
    const handleInitialHashScroll = () => {
      const hash = window.location.hash;
      
      if (!hash || hasHandledHashRef.current) {
        return;
      }

      // Mark as handled to prevent multiple attempts
      hasHandledHashRef.current = true;

      const scrollToTarget = async () => {
        const target = document.querySelector(hash);
        
        if (target) {
          console.log('HashNavigationHandler: Scrolling to', hash);
          
          // If scrolling to travelogue section, wait for video layout to stabilize
          if (hash === '#travelogue' || hash === '#world-travel-diaries') {
            console.log('HashNavigationHandler: Waiting for video layout to stabilize...');
            await waitForVideoLayoutStable();
          }
          
          // Calculate position with offset
          const rect = target.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const finalPosition = Math.max(absoluteTop - offset, 0);
          
          console.log('HashNavigationHandler: Final scroll position:', finalPosition);
          
          // Wait a bit more for any remaining layout shifts
          setTimeout(() => {
            // Scroll to target with smooth behavior
            window.scrollTo({
              top: finalPosition,
              behavior: 'smooth'
            });
            
            // Dispatch custom event to trigger animations
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('scrollComplete'));
            }, 100);
          }, 150);
        } else {
          console.log('HashNavigationHandler: Target not found, retrying:', hash);
          // Retry after a short delay if element not found
          setTimeout(scrollToTarget, 200);
        }
      };

      scrollToTarget();
    };

    // Wait for load event (images/media/layout shifts finish)
    if (document.readyState === 'complete') {
      // Already loaded, execute immediately
      handleInitialHashScroll();
    } else {
      // Wait for load event
      window.addEventListener('load', handleInitialHashScroll, { once: true });
    }

    // Handle hash changes (when user clicks anchor links after page load)
    const handleHashChange = () => {
      hasHandledHashRef.current = false;
      // For hash changes after load, use the original logic
      const scrollToTarget = async () => {
        const hash = window.location.hash;
        if (!hash) return;
        
        const target = document.querySelector(hash);
        if (target) {
          // If scrolling to travelogue section, wait for video layout to stabilize
          if (hash === '#travelogue' || hash === '#world-travel-diaries') {
            await waitForVideoLayoutStable();
          }
          
          const rect = target.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const finalPosition = Math.max(absoluteTop - offset, 0);
          
          setTimeout(() => {
            window.scrollTo({
              top: finalPosition,
              behavior: smooth ? 'smooth' : 'auto'
            });
          }, 150);
        }
      };
      
      requestAnimationFrame(() => {
        setTimeout(scrollToTarget, delay);
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('load', handleInitialHashScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [delay, smooth, offset]);

  // This component doesn't render anything
  return null;
}
