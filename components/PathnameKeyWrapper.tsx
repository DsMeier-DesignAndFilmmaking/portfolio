'use client';

/**
 * PathnameKeyWrapper
 * - Wraps children with pathname key to ensure clean DOM sweeps
 * - Prevents React from trying to "diff" between 3D project pages and static homepage
 * - Ensures complete clean sweep when navigating from /projects/* to /
 * - Renders immediately without blocking
 */

import { usePathname } from 'next/navigation';

export default function PathnameKeyWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // ✅ Always render - never return null to avoid blank screen
  // The key forces a complete re-mount of the page content on every route change
  return (
    <div key={pathname || 'default'} style={{ minHeight: '100%' }}>
      {children}
    </div>
  );
}
