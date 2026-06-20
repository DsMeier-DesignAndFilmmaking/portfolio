'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ProjectPracticeNavDropdown, {
  PROJECT_NAV_MOBILE_MENU_ID,
} from '@/components/ProjectPracticeNavDropdown';

export default function IntentionEngineProjectHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [isNavbarWhite, setIsNavbarWhite] = useState(false);
  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarWhite(currentScrollY > 100);
      setAtTop(currentScrollY < 10);
      if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);
      if (currentScrollY > lastScrollYRef.current) setScrollDirection('down');
      else if (currentScrollY < lastScrollYRef.current) setScrollDirection('up');
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 motion-reduce:transition-none ${
          isNavbarWhite ? 'border-b border-neutral-100 bg-white/95 backdrop-blur-md' : 'bg-transparent'
        } ${
          atTop ? 'translate-y-0' : scrollDirection === 'down' ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'
        }`}
      >
        <div className="container relative z-20 mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="m-0 flex h-fit w-fit items-center p-0 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4"
                aria-label="Return to home page"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
                  alt="Dan Meier"
                  width={150}
                  height={37}
                  priority
                  className="h-9 w-auto brightness-0"
                />
              </button>
              <div className="ml-3 flex flex-shrink-0 items-center">
                <div className="h-5 w-px flex-shrink-0 bg-slate-300" aria-hidden="true" />
                <span className={`ml-3 whitespace-nowrap text-xs font-medium transition-colors duration-500 motion-reduce:transition-none md:text-sm ${isNavbarWhite ? 'text-black' : 'text-gray-700'}`}>
                  Work
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              data-project-nav-trigger
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls={PROJECT_NAV_MOBILE_MENU_ID}
              className={`flex min-h-[44px] items-center justify-end py-2 pl-4 transition-colors duration-500 motion-reduce:transition-none lg:hidden ${isNavbarWhite ? 'text-black' : 'text-gray-700'}`}
              aria-label="Toggle mobile menu"
            >
              <span className="relative flex h-5 w-6 flex-col items-center justify-between" aria-hidden="true">
                <span className={`h-0.5 w-full bg-current transition-all duration-300 motion-reduce:transition-none ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-all duration-300 motion-reduce:transition-none ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-all duration-300 motion-reduce:transition-none ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </span>
            </button>

            <ProjectPracticeNavDropdown
              pathname={pathname}
              isNavbarWhite={isNavbarWhite}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}
