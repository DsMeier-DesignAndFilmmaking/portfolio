'use client';

/**
 * BodyKeyWrapper
 * - Wraps body content with pathname key to force complete DOM reset
 * - The key={pathname} is the "Magic Bullet" - forces React to throw away old DOM
 * - Clears any "ghost" elements left by 3D project pages
 * - Ensures clean state when navigating from /projects/* to /
 */

import { usePathname } from 'next/navigation';

export default function BodyKeyWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // ✅ The key={pathname} forces React to throw away the old DOM and paint the new one
  // from scratch whenever the URL changes. This clears any "ghost" elements left by
  // the Travel & AI page or other 3D project pages.
  return (
    <div key={pathname || 'default'} id="__next-body-key-wrapper">
      {children}
    </div>
  );
}
