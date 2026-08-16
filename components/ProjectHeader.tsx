'use client';

// Shared, scroll-aware header for the flagship practice/concept project pages.
// Consolidates the header shell that was previously duplicated ~10× (four local
// ProjectHeader.tsx files + six inline copies in page.tsx): a fixed bar that
// tints white on scroll, hides on scroll-down / reappears on scroll-up (mobile
// only; always visible on desktop), the logo-as-home button, the intentional
// "Work" label, the animated hamburger, and the shared ProjectPracticeNavDropdown.
//
// NOTE: PracticeNav is a separate, simpler header (no hide-on-scroll) used by
// /practice, /services, /services/scoping-call — intentionally NOT merged here
// (see the tier note in PracticeNav.tsx).

import { useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ProjectPracticeNavDropdown, {
  PROJECT_NAV_MOBILE_MENU_ID,
} from '@/components/ProjectPracticeNavDropdown';

type ProjectHeaderProps = {
  /** Label shown next to the logo. Defaults to the intentional "Work". */
  label?: string;
  /** focus-visible ring color for the logo-home button (per-page accent). */
  focusRingClassName?: string;
  /**
   * Surface the header sits on. 'light' (default) is the established behavior
   * for every white-canvas project page and is unchanged. 'dark' inverts the
   * logo, label, divider, and hamburger, and hands `tone="dark"` to the
   * dropdown — needed by dark-canvas routes (e.g. the Rock Creek Experience OS
   * operations view) so the shared nav stays legible instead of being
   * re-implemented locally.
   */
  tone?: 'light' | 'dark';
};

export default function ProjectHeader({
  label = 'Work',
  focusRingClassName = 'focus-visible:ring-neutral-900',
  tone = 'light',
}: ProjectHeaderProps = {}) {
  const isDark = tone === 'dark';
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
          isNavbarWhite
            ? isDark
              ? 'border-b border-white/10 bg-neutral-950/95 backdrop-blur-md'
              : 'border-b border-neutral-100 bg-white/95 backdrop-blur-md'
            : 'bg-transparent'
        } ${
          atTop
            ? 'translate-y-0'
            : scrollDirection === 'down'
              ? '-translate-y-full lg:translate-y-0'
              : 'translate-y-0'
        }`}
      >
        <div className="container relative z-20 mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => router.push('/')}
                className={`m-0 flex h-fit w-fit items-center p-0 py-4 focus-visible:outline-none focus-visible:ring-2 ${focusRingClassName} focus-visible:ring-offset-4`}
                aria-label="Return to home page"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
                  alt="Dan Meier"
                  width={150}
                  height={37}
                  priority
                  className={`h-9 w-auto ${isDark ? 'brightness-0 invert' : 'brightness-0'}`}
                />
              </button>
              <div className="ml-3 flex flex-shrink-0 items-center">
                <div
                  className={`h-5 w-px flex-shrink-0 ${isDark ? 'bg-white/25' : 'bg-slate-300'}`}
                  aria-hidden="true"
                />
                <span
                  className={`ml-3 whitespace-nowrap text-xs font-medium transition-colors duration-500 motion-reduce:transition-none md:text-sm ${
                    isDark
                      ? isNavbarWhite
                        ? 'text-white'
                        : 'text-neutral-300'
                      : isNavbarWhite
                        ? 'text-black'
                        : 'text-gray-700'
                  }`}
                >
                  {label}
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
              className={`flex min-h-[44px] items-center justify-end py-2 pl-4 transition-colors duration-500 motion-reduce:transition-none lg:hidden ${
                isDark
                  ? isNavbarWhite
                    ? 'text-white'
                    : 'text-neutral-300'
                  : isNavbarWhite
                    ? 'text-black'
                    : 'text-gray-700'
              }`}
              aria-label="Toggle mobile menu"
            >
              <span className="relative flex h-5 w-6 flex-col items-center justify-between" aria-hidden="true">
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 motion-reduce:transition-none ${
                    isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 motion-reduce:transition-none ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 motion-reduce:transition-none ${
                    isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>

            <ProjectPracticeNavDropdown
              pathname={pathname}
              tone={tone}
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
