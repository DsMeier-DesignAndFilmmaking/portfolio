'use client';

/**
 * ConditionalFooter
 * - Conditionally renders footer based on pathname
 * - Hides footer on mockups routes to create clean document views
 */

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import StaticFooter from '@/components/StaticFooter';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }
  
  // Hide footer on mockups routes
  if (pathname && pathname.startsWith('/mockups/')) {
    return null;
  }

  const normalizedPathname = pathname?.replace(/\/+$/, '') || '/';
  const usesInternalFooterWidth =
    normalizedPathname === '/practice' ||
    normalizedPathname === '/projects' ||
    normalizedPathname === '/services' ||
    normalizedPathname.startsWith('/practice/') ||
    normalizedPathname.startsWith('/projects/') ||
    normalizedPathname.startsWith('/services/');
  
  // Show footer on all other pages
  return (
    <StaticFooter
      compactSpacing={normalizedPathname === '/'}
      containerVariant={usesInternalFooterWidth ? 'internal' : 'home'}
    />
  );
}
