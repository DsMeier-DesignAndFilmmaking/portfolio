'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import Navbar from './Navbar';

/**
 * Global Navigation Wrapper
 *
 * This component ensures the Navbar appears consistently across appropriate pages.
 * Project pages have their own custom navigation and are excluded to prevent double navbar flash.
 *
 * Excluded routes: /projects/*
 */
export default function NavigationWrapper() {
  const pathname = usePathname();

  // Memoize the check to prevent unnecessary re-renders
  const shouldShowNavbar = useMemo(() => {
    // Handle null/undefined pathname gracefully - wait for pathname to be available
    if (!pathname) {
      return false;
    }

    // Normalize pathname (remove trailing slash for consistent checking)
    const normalizedPath = pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname;

    // Hide global navbar on project pages (they have their own custom navbars)
    // Show it on homepage and other general pages
    const isProjectPage = normalizedPath.startsWith('/projects/');

    // Don't render global navbar on project pages
    return !isProjectPage;
  }, [pathname]);
  
  // Don't render anything if we shouldn't show navbar or pathname is not ready
  if (!shouldShowNavbar || !pathname) {
    return null;
  }
  
  return <Navbar />;
} 