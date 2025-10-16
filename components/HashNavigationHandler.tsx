'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const hasHandledHashRef = useRef(false);

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      
      if (!hash || hasHandledHashRef.current) {
        return;
      }

      // Mark as handled to prevent multiple attempts
      hasHandledHashRef.current = true;

      const scrollToTarget = () => {
        const target = document.querySelector(hash);
        
        if (target) {
          console.log('HashNavigationHandler: Scrolling to', hash);
          
          // Calculate position with offset
          const rect = target.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const finalPosition = Math.max(absoluteTop - offset, 0);
          
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

    // Reset flag when route changes
    const handleRouteChange = () => {
      hasHandledHashRef.current = false;
    };

    router.events?.on?.('routeChangeComplete', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      router.events?.off?.('routeChangeComplete', handleRouteChange);
    };
  }, [delay, smooth, offset, router]);

  // This component doesn't render anything
  return null;
}
