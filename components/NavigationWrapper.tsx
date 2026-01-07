'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import Navbar from './Navbar';

/**
 * Global Navigation Wrapper
 * 
 * This component ensures the Navbar appears consistently across appropriate pages.
 * Project pages and My Pulse have their own custom navigation and are excluded to prevent double navbar flash.
 * 
 * Excluded routes: /projects/* and /my-pulse
 */
export default function NavigationWrapper() {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  
  // Small delay to ensure clean navigation transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 0);
    
    return () => {
      clearTimeout(timer);
      setIsReady(false);
    };
  }, [pathname]);
  
  // Memoize the check to prevent unnecessary re-renders
  const shouldShowNavbar = useMemo(() => {
    // Handle null/undefined pathname gracefully
    if (!pathname) {
      return false;
    }
    
    // Normalize pathname (remove trailing slash for consistent checking)
    const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
      ? pathname.slice(0, -1) 
      : pathname;
    
    // Hide global navbar on project pages and My Pulse (they have their own custom navbars)
    // Show it on homepage and other general pages
    const isProjectPage = normalizedPath.startsWith('/projects/');
    const isMyPulsePage = normalizedPath.startsWith('/my-pulse');
    
    // Don't render global navbar on project pages or My Pulse
    return !(isProjectPage || isMyPulsePage);
  }, [pathname]);
  
  // Don't render anything if we shouldn't show navbar, pathname is not ready, or not ready for render
  if (!shouldShowNavbar || !pathname || !isReady) {
    return null;
  }
  
  return <Navbar />;
} 