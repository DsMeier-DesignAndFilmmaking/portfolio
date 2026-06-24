'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ProjectPracticeNavDropdown, {
  PROJECT_NAV_MOBILE_MENU_ID,
} from '@/components/ProjectPracticeNavDropdown';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function HubNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-neutral-100 bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex items-center py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              aria-label="Return to home page"
            >
              <Image
                src={`${basePath}/images/signature-25.png`}
                alt="Dan Meier"
                width={120}
                height={30}
                priority
                className="h-7 w-auto brightness-0"
              />
            </button>
            <span className="select-none text-neutral-300">/</span>
            <span className="hidden text-sm font-medium text-neutral-500 sm:inline">
              Independent Research Practice
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            data-project-nav-trigger
            aria-haspopup="menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls={PROJECT_NAV_MOBILE_MENU_ID}
            className="flex min-h-[44px] items-center justify-end py-2 pl-4 text-neutral-700 transition-colors duration-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 lg:hidden"
            aria-label="Toggle mobile menu"
          >
            <span className="relative flex h-5 w-6 flex-col items-center justify-between" aria-hidden="true">
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>

          <ProjectPracticeNavDropdown
            pathname={pathname ?? ''}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            tone="light"
            isNavbarWhite
          />
        </div>
      </div>
    </header>
  );
}
