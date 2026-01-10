'use client';

/**
 * ConditionalNavbar
 * - Conditionally renders navbar based on pathname
 * - Hides navbar on homepage ONLY
 * - Shows navbar on all other pages (including project pages)
 */

import { usePathname } from 'next/navigation';
import StaticNavbar from '@/components/StaticNavbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on homepage, project pages, and mockups
  if (pathname === '/' || (pathname && pathname.startsWith('/projects/')) || (pathname && pathname.startsWith('/mockups/'))) {
    return null;
  }
  
  // Show navbar on all other pages
  return <StaticNavbar />;
}
