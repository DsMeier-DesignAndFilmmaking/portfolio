'use client';

/**
 * HomePageBodyReset
 * - Minimal client component to reset body styles on homepage mount
 * - Fixes black screen issue when navigating from project pages (which set body.backgroundColor = 'black')
 * - Only runs on client-side, safe for server components
 * - Never blocks rendering - always returns null immediately
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HomePageBodyReset() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    // Only run on homepage
    if (!isHome) return undefined;

    // ✅ Use requestAnimationFrame to ensure DOM is ready
    // This prevents blocking the initial render
    const rafId = requestAnimationFrame(() => {
      if (typeof document !== 'undefined') {
        // ✅ CRITICAL: Reset all styles that project pages might set
        // These are the "Z-Index" or "Opacity" traps that cause blank screens
        
        // Reset opacity (project pages might set opacity: 0 for transitions)
        document.documentElement.style.opacity = '1';
        document.body.style.opacity = '1';
        
        // Reset overflow (project pages might set overflow: hidden)
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = '';
        
        // Reset background colors (project pages set these to black)
        document.body.style.backgroundColor = '';
        document.documentElement.style.backgroundColor = '';
        
        // Reset z-index (project pages might set high z-index on body/html)
        document.body.style.zIndex = '';
        document.documentElement.style.zIndex = '';
        
        // Reset visibility (project pages might set visibility: hidden)
        document.body.style.visibility = '';
        document.documentElement.style.visibility = '';
        
        // Reset pointer-events (project pages might disable interactions)
        document.body.style.pointerEvents = '';
        document.documentElement.style.pointerEvents = '';
        
        // ✅ NAVBAR CLEAN SLATE: Reset navbar styles that project pages might set
        // Find navbar - check both header and nav elements
        const header = document.querySelector('header');
        const navbar = document.querySelector('header nav') || 
                      document.querySelector('nav') || 
                      header ||
                      document.querySelector('.navbar');
        
        // ✅ CRITICAL: Reset header first (it's the parent container)
        if (header) {
          const headerElement = header as HTMLElement;
          // Force reset ALL background and filter properties that cause "tint"
          headerElement.style.backgroundColor = '';
          headerElement.style.background = '';
          headerElement.style.backdropFilter = '';
          // @ts-ignore - webkitBackdropFilter is a valid CSS property but not in TypeScript types
          headerElement.style.webkitBackdropFilter = '';
          headerElement.style.opacity = '1';
          headerElement.style.boxShadow = '';
          headerElement.style.filter = '';
          headerElement.style.transform = '';
          headerElement.style.color = '';
          
          // ✅ Force reapply CSS classes by removing and re-adding
          // This ensures bg-white/80 backdrop-blur-sm is applied
          const originalClasses = headerElement.className;
          headerElement.className = '';
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            headerElement.className = originalClasses;
          });
        }
        
        // Also reset nav element if it exists separately
        if (navbar && navbar !== header) {
          const navElement = navbar as HTMLElement;
          // Force reset the background and filters that cause "tint"
          navElement.style.backgroundColor = '';
          navElement.style.background = '';
          navElement.style.backdropFilter = '';
          // @ts-ignore - webkitBackdropFilter is a valid CSS property but not in TypeScript types
          navElement.style.webkitBackdropFilter = '';
          navElement.style.opacity = '1';
          navElement.style.boxShadow = '';
          navElement.style.filter = '';
          navElement.style.transform = '';
          navElement.style.color = '';
        }
      }
    });

    // Cleanup on unmount (when navigating away from homepage)
    return () => {
      cancelAnimationFrame(rafId);
      if (typeof document !== 'undefined') {
        // Reset to empty string to let CSS classes take over
        document.body.style.backgroundColor = '';
        document.documentElement.style.backgroundColor = '';
      }
    };
  }, [isHome]);

  // ✅ Always return null immediately - never block rendering
  // This component only runs side effects, never renders content
  return null;
}
