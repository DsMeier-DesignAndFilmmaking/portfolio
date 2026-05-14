'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function BackToTopButton() {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }
  
  // Update: Only hide on the root home page if desired, 
  // but let it show on all project sub-pages.
  const isHomePage = pathname === '/';
  
  if (isHomePage) {
    return null;
  }

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button
      onClick={scrollToTop}
      className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors bg-transparent border-none cursor-pointer p-0"
    >
      ↑ Back to top
    </button>
  );
}
