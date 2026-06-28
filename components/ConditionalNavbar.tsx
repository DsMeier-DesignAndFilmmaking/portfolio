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
import { useEffect, useState } from 'react';
import StaticNavbar from '@/components/StaticNavbar';

function shouldHideNavbar(pathname: string | null): boolean {
  return (
    pathname === '/' ||
    Boolean(pathname?.startsWith('/projects/')) ||
    Boolean(pathname?.startsWith('/mockups/')) ||
    Boolean(pathname?.startsWith('/services'))
  );
}

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  const hideNavbar = isHydrated && shouldHideNavbar(pathname);

  // Keep a stable layout sibling before <main>. The server and first client
  // render both include StaticNavbar; hidden routes remove it only after the
  // client pathname is available, avoiding a header/main hydration mismatch.
  return (
    <div data-global-navbar-slot="">
      {hideNavbar ? null : <StaticNavbar />}
    </div>
  );
}
