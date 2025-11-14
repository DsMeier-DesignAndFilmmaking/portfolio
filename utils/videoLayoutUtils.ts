/**
 * Utility functions to handle video layout stabilization
 * Prevents iframe loading from affecting scroll calculations
 */

/**
 * Wait for video sections to stabilize their layout
 * This prevents iframe loading from causing scroll calculation errors
 */
export const waitForVideoLayoutStable = (timeout = 2000): Promise<void> => {
  return new Promise<void>((resolve) => {
    const videoSection = document.getElementById('video-projects');
    if (!videoSection) {
      console.log('Video section not found, skipping video layout wait');
      resolve();
      return;
    }

    const iframes = videoSection.querySelectorAll('iframe');
    if (iframes.length === 0) {
      console.log('No iframes found in video section, skipping video layout wait');
      resolve();
      return;
    }

    console.log('Waiting for video layout to stabilize...');

    let stableCount = 0;
    let lastHeight = videoSection.offsetHeight;
    let lastScrollHeight = document.documentElement.scrollHeight;
    const requiredStableReadings = 5;
    const checkInterval = 100;

    const checkStability = () => {
      const currentHeight = videoSection.offsetHeight;
      const currentScrollHeight = document.documentElement.scrollHeight;

      // Check if layout is stable (no height changes)
      if (currentHeight === lastHeight && currentScrollHeight === lastScrollHeight) {
        stableCount++;
        if (stableCount >= requiredStableReadings) {
          console.log('Video layout stabilized after', stableCount, 'readings');
          resolve();
          return;
        }
      } else {
        stableCount = 0;
        lastHeight = currentHeight;
        lastScrollHeight = currentScrollHeight;
      }

      // Continue checking
      setTimeout(checkStability, checkInterval);
    };

    // Start checking after a short delay
    setTimeout(checkStability, 200);

    // Fallback timeout
    setTimeout(() => {
      console.log('Video layout wait timeout, proceeding anyway');
      resolve();
    }, timeout);
  });
};

/**
 * Check if video section is currently loading iframes
 */
export const isVideoSectionLoading = (): boolean => {
  const videoSection = document.getElementById('video-projects');
  if (!videoSection) return false;

  const iframes = videoSection.querySelectorAll('iframe');
  return Array.from(iframes).some(iframe => {
    // Check if iframe src is still "about:blank" or if it hasn't loaded yet
    return iframe.src === 'about:blank' || !iframe.contentDocument;
  });
};

/**
 * Wait for all iframes in video section to load
 */
export const waitForVideoIframesLoad = (timeout = 3000): Promise<void> => {
  return new Promise<void>((resolve) => {
    const videoSection = document.getElementById('video-projects');
    if (!videoSection) {
      resolve();
      return;
    }

    const iframes = videoSection.querySelectorAll('iframe');
    if (iframes.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalIframes = iframes.length;

    const onIframeLoad = () => {
      loadedCount++;
      console.log(`Iframe ${loadedCount}/${totalIframes} loaded`);
      if (loadedCount >= totalIframes) {
        console.log('All video iframes loaded');
        resolve();
      }
    };

    // Set up load listeners
    iframes.forEach(iframe => {
      if (iframe.src !== 'about:blank') {
        iframe.addEventListener('load', onIframeLoad, { once: true });
        iframe.addEventListener('error', onIframeLoad, { once: true });
      } else {
        // Iframe not started loading yet, count it as loaded
        onIframeLoad();
      }
    });

    // Fallback timeout
    setTimeout(() => {
      console.log('Video iframe load timeout, proceeding anyway');
      resolve();
    }, timeout);
  });
};
