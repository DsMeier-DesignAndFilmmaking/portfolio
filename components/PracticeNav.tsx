'use client';

// Shared practice navigation header.
// Fixed, transparent at the top of the page and tinting white on scroll, with the
// signature logo, a "Work" label, and the shared ProjectPracticeNavDropdown trigger.
// Used by the practice front door (/practice) and the
// engagements page (/services) so both wear the same nav as the project pages.
//
// NAVIGATION TIERS (intentional — do not "unify" without a deliberate decision):
//   1. Homepage (/)         → desktop: HomepageSideNav's left-side section dots,
//                             untouched, not this component. Mobile: HomepageMobileNav
//                             (components/HomepageMobileNav.tsx) mirrors this header's
//                             fixed-top-bar + hamburger + slide-in pattern via
//                             ProjectPracticeNavDropdown's `items` flat-list mode, but
//                             with the homepage's 5 section anchors instead of page
//                             links, and no "Work" page-level item. (Previously the
//                             homepage had no fixed header at all, removed to end
//                             WebGL/hydration crashes; that WebGL scene is now fully
//                             disabled and the old persistent global Navbar that
//                             caused those crashes no longer exists, so the mobile
//                             header was reintroduced as a deliberate decision.)
//   2. Flagship + services  → this PracticeNav (the full mega-nav).
//   3. Legacy client work   → thin nav only (ProjectBreadcrumb + "Back to
//      (/projects/previous/*)  Projects"), intentionally NOT this header. Accepted
//                             decision — see app/projects/previous/layout.tsx.
//                             Don't re-flag it or extend the mega-nav to them.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ProjectPracticeNavDropdown, {
  PROJECT_NAV_MOBILE_MENU_ID,
} from '@/components/ProjectPracticeNavDropdown';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function PracticeNav() {
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
      setIsScrolled(window.scrollY > 100);
      if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 motion-reduce:transition-none ${
        isScrolled ? 'border-b border-neutral-100 bg-white/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container relative z-20 mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="m-0 flex h-fit w-fit items-center p-0 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
              aria-label="Return to home page"
            >
              <Image
                src={`${basePath}/images/signature-25.png`}
                alt="Dan Meier"
                width={150}
                height={37}
                priority
                className="h-9 w-auto brightness-0"
              />
            </button>
            <div className="ml-3 flex flex-shrink-0 items-center">
              <div className="h-5 w-px flex-shrink-0 bg-slate-300" aria-hidden="true" />
              <span
                className={`ml-3 whitespace-nowrap text-xs font-medium transition-colors duration-500 motion-reduce:transition-none md:text-sm ${
                  isScrolled ? 'text-black' : 'text-gray-700'
                }`}
              >
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
            className={`flex min-h-[44px] items-center justify-end py-2 pl-4 transition-colors duration-500 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 lg:hidden ${
              isScrolled ? 'text-black' : 'text-gray-700'
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
            pathname={pathname ?? ''}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isNavbarWhite={isScrolled}
          />
        </div>
      </div>
    </header>
  );
}
