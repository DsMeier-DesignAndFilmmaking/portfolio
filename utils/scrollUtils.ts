/**
 * Enhanced utility functions for handling anchor scrolling with proper content loading detection
 * 
 * The issue with first-click misalignment occurs because:
 * 1. Images are still loading, causing layout shifts
 * 2. Fonts are still loading, affecting text rendering and element heights
 * 3. Dynamic content (React components) may still be settling
 * 4. CSS animations/transitions may not have completed
 * 5. Lazy-loaded content (IntersectionObserver) may not be ready
 * 6. Video iframes loading asynchronously, causing layout shifts
 * 
 * This utility ensures all content is fully loaded before performing anchor scrolls.
 */

// Track if content has been fully loaded
let isContentFullyLoaded = false;
let contentLoadPromise: Promise<void> | null = null;

// Track active scroll animations to prevent conflicts
let activeScrollAnimation: number | null = null;

// Track if we're currently performing an anchor scroll to prevent IntersectionObserver interference
let isAnchorScrolling = false;

/**
 * Custom smooth scroll function with easing
 */
export const smoothScrollTo = (targetY: number, duration: number = 600): Promise<void> => {
  return new Promise((resolve) => {
    // Cancel any existing scroll animation
    if (activeScrollAnimation) {
      cancelAnimationFrame(activeScrollAnimation);
    }

    const startY = window.scrollY;
    const diff = targetY - startY;
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);

      // easeInOutCubic for smooth animation
      const easing = percent < 0.5
        ? 4 * percent * percent * percent
        : 1 - Math.pow(-2 * percent + 2, 3) / 2;

      window.scrollTo(0, startY + diff * easing);

      if (time < duration) {
        activeScrollAnimation = requestAnimationFrame(step);
      } else {
        activeScrollAnimation = null;
        resolve();
      }
    }

    activeScrollAnimation = requestAnimationFrame(step);
  });
};


// utils/scrollUtils.ts

export function smoothScrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;

  // Wait for layout to settle (images, fonts, animations)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const y =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        (window.visualViewport?.offsetTop || 0) -
        offset;

      const duration = 500; // scroll duration
      const start = window.scrollY;
      const distance = y - start;
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // easeInOutQuad easing
        const eased = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, start + distance * eased);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      }

      window.requestAnimationFrame(step);
    });
  });
}



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
 * Enhanced to be more stable and less affected by other sections
 */
export const calculateTargetPosition = (targetElement: HTMLElement, navbarElement?: HTMLElement | null): number => {
  // Force a reflow to ensure accurate measurements
  targetElement.offsetHeight;
  
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
  
  // Use CSS scroll-margin-top if available, otherwise use calculated offset
  const computedStyle = window.getComputedStyle(targetElement);
  const scrollMarginTop = parseFloat(computedStyle.scrollMarginTop || '0');
  
  // Use CSS scroll-margin-top if it's set, otherwise use calculated navbar offset
  const finalPosition = scrollMarginTop > 0 
    ? Math.max(absoluteTop - scrollMarginTop, 0)
    : Math.max(absoluteTop - navbarOffset, 0);
  
  console.log('Target element:', targetElement.id, 'Absolute top:', absoluteTop, 'CSS scroll-margin-top:', scrollMarginTop, 'Final position:', finalPosition);
  
  return finalPosition;
};

/**
 * Enhanced scroll to element with comprehensive content loading detection
 */
export const scrollToElement = async (
  targetElement: HTMLElement, 
  navbarElement?: HTMLElement | null,
  options: { 
    duration?: number;
    waitForLazyContent?: boolean;
  } = {}
): Promise<void> => {
  const {
    duration = 700,
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
    
    // Perform smooth scroll to target using custom function
    await smoothScrollTo(targetPosition, duration);
    
  } catch (error) {
    console.warn('Error during anchor scroll:', error);
    // Fallback to immediate scroll
    const targetPosition = calculateTargetPosition(targetElement, navbarElement);
    window.scrollTo({
      top: targetPosition,
      behavior: 'auto'
    });
  }
};

/**
 * Wait for lazy-loaded content in a specific section
 * Enhanced to avoid interference from other sections
 */
const waitForLazyContentInSection = async (sectionElement: HTMLElement): Promise<void> => {
  return new Promise<void>((resolve) => {
    // Check if section has lazy-loaded content
    const lazyImages = sectionElement.querySelectorAll('img[loading="lazy"]');
    const iframes = sectionElement.querySelectorAll('iframe[loading="lazy"]');
    
    if (lazyImages.length === 0 && iframes.length === 0) {
      console.log('No lazy content in section:', sectionElement.id);
      resolve();
      return;
    }

    console.log('Waiting for lazy content in section:', sectionElement.id, 'Found:', lazyImages.length + iframes.length, 'elements');
    
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
        // But reduce the wait time to avoid delays
        setTimeout(onElementLoad, 50);
      }
    });

    // Reduced fallback timeout to prevent long delays
    setTimeout(() => {
      console.log('Timeout waiting for lazy content in section:', sectionElement.id);
      resolve();
    }, 1000);
  });
};

/**
 * Enhanced anchor scroll function that handles all edge cases
 */
export const scrollToAnchor = async (
  anchorId: string,
  navbarElement?: HTMLElement | null,
  options: {
    duration?: number;
    waitForLazyContent?: boolean;
    maxWaitTime?: number;
    onProgress?: (progress: number) => void;
  } = {}
): Promise<void> => {
  const {
    duration = 700,
    waitForLazyContent = true,
    maxWaitTime = 3000,
    onProgress
  } = options;

  // Prevent multiple anchor scrolls from running simultaneously
  if (isAnchorScrolling) {
    console.log('Anchor scroll already in progress, ignoring request for:', anchorId);
    return;
  }

  isAnchorScrolling = true;
  console.log('Scroll to anchor called:', anchorId);

  // Wait for target element to exist
  let targetElement = document.getElementById(anchorId);
  if (!targetElement) {
    console.warn('Target element not found:', anchorId);
    isAnchorScrolling = false;
    return;
  }

  // Progress tracking for loader
  let progress = 0;
  const updateProgress = (newProgress: number) => {
    progress = newProgress;
    onProgress?.(progress);
  };

  // Use Promise.race to implement timeout
  const scrollPromise = (async () => {
    updateProgress(10);
    
    // Wait for content to be fully loaded
    await waitForContentLoad();
    updateProgress(30);
    
    // Wait for layout to stabilize
    await waitForLayoutStable();
    updateProgress(50);
    
    // For travelogue sections, wait for video layout to stabilize instead of lazy content
    if (anchorId === 'travelogue' || anchorId === 'world-travel-diaries') {
      console.log('Waiting for video layout stabilization for travelogue section');
      const { waitForVideoLayoutStable } = await import('./videoLayoutUtils');
      await waitForVideoLayoutStable();
    } else if (waitForLazyContent) {
      // For other sections, use normal lazy content waiting
      await waitForLazyContentInSection(targetElement);
    }
    updateProgress(70);
    
    // Calculate target position and perform direct scroll
    const targetPosition = calculateTargetPosition(targetElement, navbarElement);
    console.log('Direct scroll to', anchorId, 'at position:', targetPosition);
    
    // Perform smooth scroll to target
    await smoothScrollTo(targetPosition, duration);
    
    // Add a small delay to ensure scroll is completely finished
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Scroll to', anchorId, 'completed');
    
    updateProgress(90);
    
    // Wait for scroll animation to be completely stable
    await new Promise(resolve => {
      let lastScrollY = window.scrollY;
      let stableCount = 0;
      const maxStableCount = 10; // Reduced for faster completion
      
      const checkStable = () => {
        const currentScrollY = window.scrollY;
        
        // Check if scroll position is stable (within 1px)
        if (Math.abs(currentScrollY - lastScrollY) < 1) {
          stableCount++;
          if (stableCount >= maxStableCount) {
            console.log('Scroll stable for', anchorId, 'after', stableCount, 'readings');
            resolve(true);
            return;
          }
        } else {
          stableCount = 0;
          lastScrollY = currentScrollY;
        }
        
        // Continue checking
        requestAnimationFrame(checkStable);
      };
      
      // Start checking after a short delay
      setTimeout(checkStable, 50);
    });
    
    updateProgress(100);
  })();

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
    updateProgress(100);
  } finally {
    // Always reset the anchor scrolling flag
    isAnchorScrolling = false;
  }
};

/**
 * Check if we're currently performing an anchor scroll
 */
export const isCurrentlyAnchorScrolling = (): boolean => {
  return isAnchorScrolling;
};

/**
 * Reset the content load state (useful for testing or page transitions)
 */
export const resetContentLoadState = (): void => {
  isContentFullyLoaded = false;
  contentLoadPromise = null;
  isAnchorScrolling = false;
};
