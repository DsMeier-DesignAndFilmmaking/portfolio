/**
 * Enhanced utility functions for handling anchor scrolling with proper content loading detection
 * 
 * The issue with first-click misalignment occurs because:
 * 1. Images are still loading, causing layout shifts
 * 2. Fonts are still loading, affecting text rendering and element heights
 * 3. Dynamic content (React components) may still be settling
 * 4. CSS animations/transitions may not have completed
 * 5. Lazy-loaded content (IntersectionObserver) may not be ready
 * 
 * This utility ensures all content is fully loaded before performing anchor scrolls.
 */

// Track if content has been fully loaded
let isContentFullyLoaded = false;
let contentLoadPromise: Promise<void> | null = null;

/**
 * Wait for all content to be fully loaded (images, fonts, DOM, lazy content)
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
            // Wait for images to load
            waitForImages().then(() => {
              // Small delay to ensure layout is stable
              setTimeout(() => {
                isContentFullyLoaded = true;
                resolve();
              }, 100);
            });
          });
        } else {
          // Fallback if fonts API not available
          waitForImages().then(() => {
            setTimeout(() => {
              isContentFullyLoaded = true;
              resolve();
            }, 150);
          });
        }
      } else {
        // Wait for page to load completely
        window.addEventListener('load', () => {
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              waitForImages().then(() => {
                setTimeout(() => {
                  isContentFullyLoaded = true;
                  resolve();
                }, 100);
              });
            });
          } else {
            waitForImages().then(() => {
              setTimeout(() => {
                isContentFullyLoaded = true;
                resolve();
              }, 150);
            });
          }
        }, { once: true });
      }
    };

    checkIfReady();
  });

  return contentLoadPromise;
};

/**
 * Wait for all images to load (including lazy-loaded ones)
 */
const waitForImages = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    const images = Array.from(document.images);
    const pendingImages = images.filter(img => !img.complete);
    
    if (pendingImages.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = pendingImages.length;

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        resolve();
      }
    };

    const onImageError = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        resolve();
      }
    };

    pendingImages.forEach(img => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener('load', onImageLoad, { once: true });
        img.addEventListener('error', onImageError, { once: true });
      }
    });
  });
};

/**
 * Wait for layout to stabilize (no size changes for a period)
 */
const waitForLayoutStable = (timeout = 500): Promise<void> => {
  return new Promise<void>((resolve) => {
    let lastHeight = document.documentElement.scrollHeight;
    let lastWidth = document.documentElement.scrollWidth;
    let stableTime = 0;
    const checkInterval = 50;
    const stableThreshold = 200; // 200ms of no changes

    const checkStability = () => {
      const currentHeight = document.documentElement.scrollHeight;
      const currentWidth = document.documentElement.scrollWidth;

      if (currentHeight === lastHeight && currentWidth === lastWidth) {
        stableTime += checkInterval;
        if (stableTime >= stableThreshold) {
          resolve();
          return;
        }
      } else {
        stableTime = 0;
        lastHeight = currentHeight;
        lastWidth = currentWidth;
      }

      setTimeout(checkStability, checkInterval);
    };

    // Start checking
    setTimeout(checkStability, checkInterval);

    // Fallback timeout
    setTimeout(resolve, timeout);
  });
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
 * Enhanced scroll to element with comprehensive content loading detection
 */
export const scrollToElement = async (
  targetElement: HTMLElement, 
  navbarElement?: HTMLElement | null,
  options: { 
    behavior?: ScrollBehavior; 
    correctionDelay?: number;
    correctionThreshold?: number;
    waitForLazyContent?: boolean;
  } = {}
): Promise<void> => {
  const {
    behavior = 'smooth',
    correctionDelay = 300,
    correctionThreshold = 5,
    waitForLazyContent = true
  } = options;

  try {
    console.log('Starting scroll to element:', targetElement.id);
    
    // Wait for content to be fully loaded
    await waitForContentLoad();
    
    // Wait for layout to stabilize
    await waitForLayoutStable();
    
    // If waiting for lazy content, check for IntersectionObserver-triggered content
    if (waitForLazyContent) {
      await waitForLazyContentInSection(targetElement);
    }
    
    // Force a reflow to get accurate measurements
    targetElement.offsetHeight;
    
    // Calculate target position
    const targetPosition = calculateTargetPosition(targetElement, navbarElement);
    console.log('Calculated target position:', targetPosition);
    
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
      
      console.log('Position check - Current:', currentPosition, 'Expected:', expectedPosition, 'Delta:', delta);
      
      // If position is significantly off, correct it
      if (delta > correctionThreshold) {
        console.log('Correcting scroll position');
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
 * Wait for lazy-loaded content in a specific section
 */
const waitForLazyContentInSection = async (sectionElement: HTMLElement): Promise<void> => {
  return new Promise<void>((resolve) => {
    // Check if section has lazy-loaded content
    const lazyImages = sectionElement.querySelectorAll('img[loading="lazy"]');
    const iframes = sectionElement.querySelectorAll('iframe[loading="lazy"]');
    
    if (lazyImages.length === 0 && iframes.length === 0) {
      resolve();
      return;
    }

    console.log('Waiting for lazy content in section:', sectionElement.id);
    
    // Wait for all lazy content to load
    const allLazyElements = [...lazyImages, ...iframes];
    let loadedCount = 0;
    const totalElements = allLazyElements.length;

    const onElementLoad = () => {
      loadedCount++;
      if (loadedCount >= totalElements) {
        console.log('All lazy content loaded in section:', sectionElement.id);
        resolve();
      }
    };

    allLazyElements.forEach(element => {
      if (element instanceof HTMLImageElement) {
        if (element.complete) {
          onElementLoad();
        } else {
          element.addEventListener('load', onElementLoad, { once: true });
          element.addEventListener('error', onElementLoad, { once: true });
        }
      } else if (element instanceof HTMLIFrameElement) {
        // For iframes, we can't easily detect load, so we'll wait a bit
        setTimeout(onElementLoad, 100);
      }
    });

    // Fallback timeout
    setTimeout(resolve, 2000);
  });
};

/**
 * Enhanced anchor scroll function that handles all edge cases
 */
export const scrollToAnchor = async (
  anchorId: string,
  navbarElement?: HTMLElement | null,
  options: {
    behavior?: ScrollBehavior;
    waitForLazyContent?: boolean;
    maxWaitTime?: number;
  } = {}
): Promise<void> => {
  const {
    behavior = 'smooth',
    waitForLazyContent = true,
    maxWaitTime = 3000
  } = options;

  console.log('Scroll to anchor called:', anchorId);

  // Wait for target element to exist
  let targetElement = document.getElementById(anchorId);
  if (!targetElement) {
    console.warn('Target element not found:', anchorId);
    return;
  }

  // Use Promise.race to implement timeout
  const scrollPromise = scrollToElement(targetElement, navbarElement, {
    behavior,
    waitForLazyContent
  });

  const timeoutPromise = new Promise<void>((_, reject) => {
    setTimeout(() => reject(new Error('Scroll timeout')), maxWaitTime);
  });

  try {
    await Promise.race([scrollPromise, timeoutPromise]);
  } catch (error) {
    console.warn('Scroll timeout or error, using fallback:', error);
    // Fallback: immediate scroll
    const targetPosition = calculateTargetPosition(targetElement, navbarElement);
    window.scrollTo({
      top: targetPosition,
      behavior: 'auto'
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
