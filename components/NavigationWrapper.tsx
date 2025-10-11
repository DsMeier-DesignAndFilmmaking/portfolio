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
 * Note: My Pulse uses a dedicated layout.tsx file so this won't even be called for that route.
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
  
  // Hide global navbar on project pages (they have their own custom navbars)
  // Show it on homepage and other general pages
  const isProjectPage = pathname.startsWith('/projects/');
  
  // Don't render global navbar on project pages
  if (isProjectPage) {
    return null;
  }
  
  return <Navbar />;
} 