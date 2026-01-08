'use client';

/**
 * RouteChangeCleanup
 * - Global cleanup hook that runs on every route change
 * - Resets body overflow to prevent scroll locks
 * - Ensures clean state between route transitions
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteChangeCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // ✅ Global cleanup on route change
    // Reset body overflow to prevent scroll locks
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }

    // ✅ Cleanup function runs on unmount or route change
    return () => {
      if (typeof document !== 'undefined') {
        // Ensure overflow is reset on route change
        document.body.style.overflow = '';
      }
    };
  }, [pathname]); // Run on every route change

  // This component doesn't render anything
  return null;
}
