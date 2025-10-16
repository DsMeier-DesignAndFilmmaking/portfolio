import { useEffect, useRef } from 'react';

interface UseScrollToHashOptions {
  /** Delay before scrolling to allow components to mount */
  delay?: number;
  /** Dependencies that should trigger re-checking for hash */
  dependencies?: any[];
  /** Whether to scroll smoothly or instantly */
  smooth?: boolean;
  /** Custom offset for fixed navbar */
  offset?: number;
}

export function useScrollToHash(options: UseScrollToHashOptions = {}) {
  const {
    delay = 400,
    dependencies = [],
    smooth = true,
    offset = 120
  } = options;

  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      
      if (!hash || hasScrolledRef.current) {
        return;
      }

      // Wait for components to mount and animations to stabilize
      const scrollToTarget = async () => {
        const target = document.querySelector(hash);
        
        if (target) {
          console.log('Scrolling to hash target:', hash);
          
          // If scrolling to travelogue section, wait for video layout to stabilize
          if (hash === '#travelogue' || hash === '#world-travel-diaries') {
            console.log('useScrollToHash: Waiting for video layout to stabilize...');
            const { waitForVideoLayoutStable } = await import('../utils/videoLayoutUtils');
            await waitForVideoLayoutStable();
          }
          
          // Calculate position with offset
          const rect = target.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          const finalPosition = Math.max(absoluteTop - offset, 0);
          
          console.log('useScrollToHash: Final scroll position:', finalPosition);
          
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
          
          hasScrolledRef.current = true;
          
          // Reset flag after a delay to allow for subsequent navigation
          setTimeout(() => {
            hasScrolledRef.current = false;
          }, 1000);
        } else {
          console.log('Hash target not found, retrying:', hash);
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
    handleHashScroll();

    // Handle hash changes
    const handleHashChange = () => {
      hasScrolledRef.current = false;
      handleHashScroll();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [delay, smooth, offset, ...dependencies]);
}

export default useScrollToHash;
