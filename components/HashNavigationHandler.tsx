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
    const handleHashNavigation = () => {
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
          
          // Scroll to target
          if (smooth) {
            window.scrollTo({
              top: finalPosition,
              behavior: 'smooth'
            });
          } else {
            window.scrollTo({
              top: finalPosition,
              behavior: 'auto'
            });
          }
          
          // Dispatch custom event to trigger animations
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('scrollComplete'));
          }, 100);
        } else {
          console.log('HashNavigationHandler: Target not found, retrying:', hash);
          // Retry after a short delay if element not found
          setTimeout(scrollToTarget, 200);
        }
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setTimeout(scrollToTarget, delay);
      });
    };

    // Handle initial hash on mount
    handleHashNavigation();

    // Handle hash changes
    const handleHashChange = () => {
      hasHandledHashRef.current = false;
      handleHashNavigation();
    };

    window.addEventListener('hashchange', handleHashChange);

    // Reset flag when route changes (for App Router, we'll use a different approach)
    // Note: App Router doesn't have events like Pages Router
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [delay, smooth, offset]);

  // This component doesn't render anything
  return null;
}
