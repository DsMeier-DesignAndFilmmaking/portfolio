'use client';

import { usePathname } from 'next/navigation';

export default function BackToTopButton() {
  const pathname = usePathname();
  
  // Hide on travel-and-ai and previous pages
  const hideBackToTop = pathname?.includes('/projects/travel-and-ai') || pathname?.includes('/projects/previous');
  
  if (hideBackToTop) {
    return null;
  }
  
  return (
    <a
      href="#hero"
      className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors"
    >
      ↑ Back to top
    </a>
  );
}
