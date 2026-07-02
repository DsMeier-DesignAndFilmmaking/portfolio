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

  // ✅ JANITOR: Ensure the top of the page is always a clean white slate
  useEffect(() => {
    if (pathname === '/') {
      if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        // Kill any lingering styles on the body and html
        document.body.style.backgroundColor = 'white';
        document.documentElement.style.backgroundColor = 'white';

        // Force the scroll to top to prevent the "scrolled" state on mount
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Only run on homepage
    if (!isHome) return undefined;

    // ✅ Use requestAnimationFrame to ensure DOM is ready
    // This prevents blocking the initial render
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
      }
    });

    // Cleanup on unmount (when navigating away from homepage)
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
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
