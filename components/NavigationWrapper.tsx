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
  
  // Hide global navbar on project pages and My Pulse (they have their own custom navbars)
  // Show it only on homepage and other general pages
  const hasCustomNavbar = pathname?.startsWith('/projects/') || pathname === '/my-pulse';
  
  // Don't render global navbar on pages with custom navigation to prevent flash
  if (hasCustomNavbar) {
    return null;
  }
  
  return <Navbar />;
} 