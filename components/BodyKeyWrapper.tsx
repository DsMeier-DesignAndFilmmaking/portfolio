'use client';

/**
 * BodyKeyWrapper
 * - Wraps content inside body with pathname key to force complete DOM reset
 * - The key={pathname} is the "Magic Bullet" - forces React to throw away old DOM
 * - Clears any "ghost" elements left by 3D project pages
 * - Ensures clean state when navigating from /projects/* to /
 * - Uses a div, NEVER a body tag (body is only in layout.tsx)
 */

import { usePathname } from 'next/navigation';

export default function BodyKeyWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // ✅ The key={pathname} forces React to throw away the old DOM and paint the new one
  // from scratch whenever the URL changes. This clears any "ghost" elements left by
  // the Travel & AI page or other 3D project pages.
  // ✅ Use a div, NEVER a body tag - body is only rendered in layout.tsx
  return (
    <div key={pathname || 'default'} className="min-h-screen relative">
      {children}
    </div>
  );
}
