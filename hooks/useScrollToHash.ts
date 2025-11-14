import { useEffect, useRef } from 'react';
import { calculateTravelogueScrollOffset } from '@/utils/travelogueScrollUtils';

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
        let target = document.querySelector(hash);
        
        // For travelogue, target the background element specifically
        if (hash === '#travelogue') {
          const backgroundElement = document.getElementById('world-travel-diaries-background');
          if (backgroundElement) {
            target = backgroundElement;
            console.log('useScrollToHash: Using background element for travelogue scroll');
          }
        }
        
        if (target) {
          console.log('Scrolling to hash target:', hash);
          
          // Special handling for travelogue section
          if (hash === '#travelogue' || hash === '#world-travel-diaries') {
            console.log('useScrollToHash: Ensuring stable layout for travelogue...');
            
            // Wait for DOM to be fully stable
            await new Promise(resolve => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setTimeout(resolve, 200); // Wait for any lazy content
                });
              });
            });
            
            // Force reflow on video section to ensure stable measurements
            const videoSection = document.getElementById('video-projects');
            if (videoSection) {
              videoSection.offsetHeight; // Force reflow
            }
          }
          
          // Force reflow on target element for accurate measurements
          (target as HTMLElement).offsetHeight;
          
          // Calculate position with offset
          const rect = target.getBoundingClientRect();
          const absoluteTop = rect.top + window.pageYOffset;
          
          // Special offset for travelogue to show earth-map background better
          let finalOffset = offset;
          if (hash === '#travelogue') {
            // Calculate dynamic offset based on video section loading state
            finalOffset = calculateTravelogueScrollOffset();
          }
          const finalPosition = Math.max(absoluteTop - finalOffset, 0);
          
          console.log('useScrollToHash: Final scroll position:', finalPosition, 'for hash:', hash);
          
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
          
          // Dispatch scroll completion event
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('scrollComplete'));
          }, 100);
        } else {
          console.log('Hash target not found, retrying:', hash);
          // Reset flag and retry
          hasScrolledRef.current = false;
          setTimeout(scrollToTarget, 200);
        }
      };

      // Wait for page to be fully loaded and stable
      if (document.readyState === 'complete') {
        requestAnimationFrame(() => {
          setTimeout(scrollToTarget, delay);
        });
      } else {
        window.addEventListener('load', () => {
          requestAnimationFrame(() => {
            setTimeout(scrollToTarget, delay);
          });
        });
      }
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
