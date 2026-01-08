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

  // ✅ STRENGTHENED JANITOR: Ultimate safety net for navbar reset
  // This runs specifically on pathname changes to override any stale CSS classes
  useEffect(() => {
    if (pathname !== '/') return undefined;

    const resetNavbarStyles = () => {
      const nav = document.getElementById('site-navbar');
      if (nav) {
        // Force Tailwind/CSS resets with 'important' flag to override any stale classes
        nav.style.setProperty('background-color', 'transparent', 'important');
        nav.style.setProperty('backdrop-filter', 'none', 'important');
        nav.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
      }
    };

    resetNavbarStyles();
    // Run again after 150ms to ensure React's render cycle hasn't 
    // re-applied the "tint" classes from a stale state.
    const timer = setTimeout(resetNavbarStyles, 150);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Only run on homepage
    if (!isHome) return undefined;

    // ✅ Use requestAnimationFrame to ensure DOM is ready
    // This prevents blocking the initial render
    let timerId: NodeJS.Timeout | null = null;
    let rafId: number | null = null;
    
    rafId = requestAnimationFrame(() => {
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
        
        // ✅ AGGRESSIVE NAVBAR RESET: Reset navbar styles that project pages might set
        // Find navbar - check both header and nav elements, including by ID
        const header = document.querySelector('header');
        const nav = document.querySelector('header nav') || 
                    document.querySelector('nav') ||
                    document.getElementById('site-navbar');
        
        // ✅ JANITOR RESET: Aggressive reset function
        const resetNavbar = () => {
          // ✅ CRITICAL: Reset header first (it's the parent container)
          if (header) {
            const headerElement = header as HTMLElement;
            
            // ✅ Step 1: Aggressively reset ALL inline styles that could cause tint
            // Set to explicit values to override any project page styles
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
            headerElement.style.borderColor = '';
          }
          
          // ✅ AGGRESSIVE: Reset nav element specifically (including by ID)
          if (nav) {
            const navElement = nav as HTMLElement;
            // Remove any lingering inline styles or forced tints
            navElement.style.backgroundColor = '';
            navElement.style.background = '';
            navElement.style.backdropFilter = '';
            // @ts-ignore - webkitBackdropFilter is a valid CSS property but not in TypeScript types
            navElement.style.webkitBackdropFilter = 'none';
            navElement.style.opacity = '1';
            navElement.style.boxShadow = '';
            navElement.style.filter = '';
            navElement.style.transform = '';
            navElement.style.color = '';
            navElement.style.borderColor = '';
          }
        };
        
        // ✅ Run reset immediately
        resetNavbar();
        
        // ✅ Catch late renders with a timer
        timerId = setTimeout(resetNavbar, 100);
        
        // ✅ Also use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          resetNavbar();
        });
      }
    });

    // Cleanup on unmount (when navigating away from homepage)
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
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
