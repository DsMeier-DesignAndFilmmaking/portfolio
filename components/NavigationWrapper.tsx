'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  
  // Wait for pathname to be available before rendering to prevent flash
  useEffect(() => {
    if (pathname) {
      setIsReady(true);
    }
  }, [pathname]);
  
  // Don't render anything until pathname is confirmed (prevents flash)
  if (!isReady || !pathname) {
    return null;
  }
  
  // Hide global navbar on project pages and My Pulse (they have their own custom navbars)
  // Show it on homepage and other general pages
  const isProjectPage = pathname.startsWith('/projects/');
  const isMyPulsePage = pathname.startsWith('/my-pulse');
  
  // Don't render global navbar on project pages or My Pulse
  if (isProjectPage || isMyPulsePage) {
    return null;
  }
  
  return <Navbar />;
} 