'use client';

/**
 * PathnameKeyWrapper
 * - Wraps children with pathname key to ensure clean DOM sweeps
 * - Prevents React from trying to "diff" between 3D project pages and static homepage
 * - Ensures complete clean sweep when navigating from /projects/* to /
 */

import { usePathname } from 'next/navigation';

export default function PathnameKeyWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div key={pathname || 'default'}>
      {children}
    </div>
  );
}
