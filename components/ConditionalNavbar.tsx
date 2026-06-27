'use client';

/**
 * ConditionalNavbar
 * - Conditionally renders navbar based on pathname
 * - Hides navbar on homepage (homepage uses left side navigation instead)
 * - Hides navbar on project pages and mockups (they have their own navigation)
 * - Hides navbar on /services (it uses the shared practice nav, PracticeNav)
 * - Shows navbar on all other pages
 */

import { usePathname } from 'next/navigation';
import StaticNavbar from '@/components/StaticNavbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on homepage, project pages, mockups, and the services/engagements page.
  // Homepage uses HomepageSideNav (left side navigation); project pages and /services
  // render the shared practice nav (PracticeNav) instead.
  if (
    pathname === '/' ||
    (pathname && pathname.startsWith('/projects/')) ||
    (pathname && pathname.startsWith('/mockups/')) ||
    (pathname && pathname.startsWith('/services'))
  ) {
    return null;
  }
  
  // Show navbar on all other pages
  return <StaticNavbar />;
}
