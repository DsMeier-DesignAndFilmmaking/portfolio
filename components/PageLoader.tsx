'use client';

import { useEffect } from 'react';

/**
 * Page Loader Component
 * Full-screen overlay that hides until all assets (images, videos, frames) are loaded
 * Prevents layout shifts during anchor link scrolling
 */
export default function PageLoader() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const loader = document.getElementById('page-loader');
    const body = document.body;

    if (!loader) return;

    // Prevent scrolling while loading
    body.style.overflow = 'hidden';

    const waitForVideos = (): Promise<void> => {
      return new Promise((resolve) => {
        const videos = document.querySelectorAll('video');
        const iframes = document.querySelectorAll('iframe[src*="vimeo"], iframe[src*="youtube"]');
        
        if (videos.length === 0 && iframes.length === 0) {
          resolve();
          return;
        }

        let videosReady = 0;
        let iframesReady = 0;
        const totalVideos = videos.length;
        const totalIframes = iframes.length;
        const total = totalVideos + totalIframes;

        if (total === 0) {
          resolve();
          return;
        }

        const checkComplete = () => {
          if (videosReady === totalVideos && iframesReady === totalIframes) {
            resolve();
          }
        };

        // Wait for video metadata
        videos.forEach((video) => {
          let videoHandled = false;
          
          const markReady = () => {
            if (!videoHandled) {
              videoHandled = true;
              videosReady++;
              checkComplete();
            }
          };
          
          if (video.readyState >= 1) {
            // Metadata already loaded
            markReady();
          } else {
            video.addEventListener('loadedmetadata', markReady, { once: true });
            
            // Fallback timeout for videos that don't fire loadedmetadata
            setTimeout(() => {
              if (video.readyState >= 1) {
                markReady();
              }
            }, 2000);
          }
        });

        // For iframes, wait for load event (they don't have readyState)
        iframes.forEach((iframe) => {
          let iframeHandled = false;
          
          const markReady = () => {
            if (!iframeHandled) {
              iframeHandled = true;
              iframesReady++;
              checkComplete();
            }
          };
          
          // Check if iframe is already loaded
          if (iframe.contentWindow) {
            markReady();
          } else {
            iframe.addEventListener('load', markReady, { once: true });
            
            // Fallback timeout for iframes that don't fire load event
            setTimeout(() => {
              markReady();
            }, 3000);
          }
        });
      });
    };

    const handleLoad = async () => {
      // Wait for window.load event
      // Then wait for video metadata to ensure dimensions are known
      await waitForVideos();
      
      // Wait a tiny bit to ensure all layout calculations are complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Add the hidden class for smooth fade-out transition
          loader.classList.add('loader-hidden');

          // After transition completes, remove overflow restriction and handle hash
          setTimeout(() => {
            body.style.overflow = '';
            
            // Layout recalculation delay to re-sync page height
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // Handle hash anchor after loader is gone and layout is stable
                if (window.location.hash) {
                  const hash = window.location.hash;
                  const targetElement = document.querySelector(hash);
                  
                  if (targetElement) {
                    // Get navbar height for offset calculation
                    const navbar = document.querySelector('header');
                    const navbarHeight = navbar ? navbar.offsetHeight : 64; // Fallback to 64px (h-16)
                    
                    // Use getBoundingClientRect for accurate position calculation
                    const rect = targetElement.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const offsetPosition = rect.top + scrollTop - navbarHeight;
                    
                    // Smooth scroll to element with navbar offset
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              });
            });
          }, 500); // Match transition duration
        });
      });
    };

    // Check if page is already loaded (e.g., on navigation)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Listen for window.load event (not DOMContentLoaded) to ensure all assets are loaded
      window.addEventListener('load', handleLoad, { once: true });
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
      body.style.overflow = '';
    };
  }, []);

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ease-out"
      aria-label="Loading page"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#2F2A3B] border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* Loading text */}
        <p className="text-sm font-medium text-[#2F2A3B]/60">Loading...</p>
      </div>
    </div>
  );
}
