'use client';

/**
 * ConditionalNavbar
 * - Conditionally renders navbar based on pathname
 * - Hides navbar on homepage (homepage uses left side navigation instead)
 * - Hides navbar on project pages and mockups (they have their own navigation)
 * - Shows navbar on all other pages
 */

import { usePathname } from 'next/navigation';
import StaticNavbar from '@/components/StaticNavbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on homepage, project pages, and mockups
  // Homepage uses HomepageSideNav (left side navigation) instead
  if (pathname === '/' || (pathname && pathname.startsWith('/projects/')) || (pathname && pathname.startsWith('/mockups/'))) {
    return null;
  }
  
  // Show navbar on all other pages
  return <StaticNavbar />;
}
