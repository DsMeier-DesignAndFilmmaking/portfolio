/**
 * Utility functions for handling anchor scrolling with proper content loading detection
 * 
 * The issue with first-click misalignment occurs because:
 * 1. Images are still loading, causing layout shifts
 * 2. Fonts are still loading, affecting text rendering and element heights
 * 3. Dynamic content (React components) may still be settling
 * 4. CSS animations/transitions may not have completed
 * 
 * This utility ensures all content is fully loaded before performing anchor scrolls.
 */

// Track if content has been fully loaded
let isContentFullyLoaded = false;
let contentLoadPromise: Promise<void> | null = null;

/**
 * Wait for all content to be fully loaded (images, fonts, DOM)
 * This ensures accurate scroll positioning on first click
 */
export const waitForContentLoad = (): Promise<void> => {
  // Return cached promise if already resolved
  if (isContentFullyLoaded) {
    return Promise.resolve();
  }
  
  // Return existing promise if already waiting
  if (contentLoadPromise) {
    return contentLoadPromise;
  }

  contentLoadPromise = new Promise<void>((resolve) => {
    const checkIfReady = () => {
      // Check if page is fully loaded
      if (document.readyState === 'complete') {
        // Wait for fonts to be ready
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            // Small delay to ensure layout is stable
            setTimeout(() => {
              isContentFullyLoaded = true;
              resolve();
            }, 50);
          });
        } else {
          // Fallback if fonts API not available
          setTimeout(() => {
            isContentFullyLoaded = true;
            resolve();
          }, 100);
        }
      } else {
        // Wait for page to load completely
        window.addEventListener('load', () => {
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              setTimeout(() => {
                isContentFullyLoaded = true;
                resolve();
              }, 50);
            });
          } else {
            setTimeout(() => {
              isContentFullyLoaded = true;
              resolve();
            }, 100);
          }
        }, { once: true });
      }
    };

    checkIfReady();
  });

  return contentLoadPromise;
};

/**
 * Calculate the target scroll position accounting for fixed navbar
 */
export const calculateTargetPosition = (targetElement: HTMLElement, navbarElement?: HTMLElement | null): number => {
  const rect = targetElement.getBoundingClientRect();
  const absoluteTop = rect.top + window.pageYOffset;
  
  // Calculate navbar offset
  let navbarOffset = 0;
  if (navbarElement) {
    const navRect = navbarElement.getBoundingClientRect();
    const computed = window.getComputedStyle(navbarElement);
    const marginTop = parseFloat(computed.marginTop || '0');
    navbarOffset = navRect.height + marginTop;
  }
  
  return Math.max(absoluteTop - navbarOffset, 0);
};

/**
 * Perform smooth scroll to target element with proper positioning
 */
export const scrollToElement = async (
  targetElement: HTMLElement, 
  navbarElement?: HTMLElement | null,
  options: { 
    behavior?: ScrollBehavior; 
    correctionDelay?: number;
    correctionThreshold?: number;
  } = {}
): Promise<void> => {
  const {
    behavior = 'smooth',
    correctionDelay = 300,
    correctionThreshold = 5
  } = options;

  try {
    // Wait for content to be fully loaded
    await waitForContentLoad();
    
    // Force a reflow to get accurate measurements
    targetElement.offsetHeight;
    
    // Calculate target position
    const targetPosition = calculateTargetPosition(targetElement, navbarElement);
    
    // Perform smooth scroll to target
    window.scrollTo({
      top: targetPosition,
      behavior
    });
    
    // Verify and correct position after scroll animation
    setTimeout(() => {
      const currentPosition = window.pageYOffset;
      const expectedPosition = calculateTargetPosition(targetElement, navbarElement);
      const delta = Math.abs(currentPosition - expectedPosition);
      
      // If position is significantly off, correct it
      if (delta > correctionThreshold) {
        window.scrollTo({
          top: expectedPosition,
          behavior: 'auto'
        });
      }
    }, correctionDelay);
    
  } catch (error) {
    console.warn('Error during anchor scroll:', error);
    // Fallback to immediate scroll
    const targetPosition = calculateTargetPosition(targetElement, navbarElement);
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Reset the content load state (useful for testing or page transitions)
 */
export const resetContentLoadState = (): void => {
  isContentFullyLoaded = false;
  contentLoadPromise = null;
};
