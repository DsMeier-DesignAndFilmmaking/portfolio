'use client';

/**
 * HomePageBodyReset
 * - Minimal client component to reset body styles on homepage mount
 * - Fixes black screen issue when navigating from project pages (which set body.backgroundColor = 'black')
 * - Only runs on client-side, safe for server components
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HomePageBodyReset() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    // Only run on homepage
    if (!isHome) return undefined;

    // Reset body and html styles that might persist from other pages
    if (typeof document !== 'undefined') {
      // Reset background colors (project pages set these to black)
      // Let CSS classes handle the background (body has bg-white class from layout)
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
      
      // Reset overflow (in case it was locked)
      document.body.style.overflow = '';
    }

    // Cleanup on unmount (when navigating away from homepage)
    return () => {
      if (typeof document !== 'undefined') {
        // Reset to empty string to let CSS classes take over
        document.body.style.backgroundColor = '';
        document.documentElement.style.backgroundColor = '';
      }
    };
  }, [isHome]);

  // This component doesn't render anything
  return null;
}
