// utils/travelogueScrollUtils.ts

/**
 * Calculates the appropriate scroll offset for travelogue section based on video loading state
 * @returns The offset to use for travelogue scroll positioning
 */
export function calculateTravelogueScrollOffset(): number {
  // Check if video section has loaded iframes
  const videoSection = document.getElementById('video-projects');
  const videoIframes = videoSection?.querySelectorAll('iframe[src*="vimeo.com"]');
  const hasLoadedVideos = videoIframes && videoIframes.length > 0 && 
    Array.from(videoIframes).some(iframe => {
      const iframeElement = iframe as HTMLIFrameElement;
      return iframeElement.src && iframeElement.src !== 'about:blank';
    });
  
  if (hasLoadedVideos) {
    // Video section is loaded - use normal offset (video section height is already accounted for)
    console.log('Travelogue scroll - Videos loaded, using standard offset: 40px');
    return 40; // Standard offset when videos are loaded
  } else {
    // Video section not loaded - use negative offset to compensate for missing video height
    console.log('Travelogue scroll - Videos not loaded, using negative offset: -426px');
    return -426; // Negative offset to scroll to desired position when videos not loaded
  }
}

/**
 * Checks if video section has loaded iframes
 * @returns boolean indicating if videos are loaded
 */
export function hasLoadedVideoIframes(): boolean {
  const videoSection = document.getElementById('video-projects');
  const videoIframes = videoSection?.querySelectorAll('iframe[src*="vimeo.com"]');
  return videoIframes && videoIframes.length > 0 && 
    Array.from(videoIframes).some(iframe => {
      const iframeElement = iframe as HTMLIFrameElement;
      return iframeElement.src && iframeElement.src !== 'about:blank';
    });
}
