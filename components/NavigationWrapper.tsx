'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

/**
 * Global Navigation Wrapper
 * 
 * This component ensures the Navbar appears consistently across appropriate pages.
 * Project pages have their own custom navigation and are excluded to prevent double navbar flash.
 */
export default function NavigationWrapper() {
  const pathname = usePathname();
  
  // Hide global navbar on project pages (they have their own custom navbars)
  // Show it everywhere else including homepage and My Pulse
  const isProjectPage = pathname?.startsWith('/projects/');
  
  // Don't render global navbar on project pages to prevent flash
  if (isProjectPage) {
    return null;
  }
  
  return <Navbar />;
} 