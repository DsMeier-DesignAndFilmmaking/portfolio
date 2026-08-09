'use client';

// Homepage's mobile-only top nav — mirrors the fixed header + hamburger +
// slide-in menu pattern used by PracticeNav/ProjectHeader on every other page
// (see components/PracticeNav.tsx), so the homepage belongs to the same
// mobile navigation system as the rest of the site. Desktop is untouched:
// this component renders nothing at the `lg` breakpoint and up — desktop
// navigation stays exclusively HomepageSideNav's left-side section nav.
//
// Menu content is the same five section anchors as HomepageSideNav's desktop
// nav (Intro/About/Work/Travel/Contact), not the page-level Practice/Work/
// Services/Contact links used elsewhere — the homepage isn't a work page.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ProjectPracticeNavDropdown, {
  PROJECT_NAV_MOBILE_MENU_ID,
} from '@/components/ProjectPracticeNavDropdown';

// Selector for a real (non-nav) instance of the homepage's content container.
// This must be `.homepage-container` itself, NOT the narrower `.homepage-copy-column`
// nested inside it (36rem-capped reading column) — `.homepage-copy-column` only
// coincidentally matches `.homepage-container`'s edges at phone widths, where it's
// too narrow to hit its own cap and just fills 100% of the available space. Past
// that (roughly >600px), the copy column caps at 576px and centers itself *inside*
// `.homepage-container`, which keeps growing up to its own 56rem cap — the two
// diverge badly in the ~600–944px range if this selector is wrong. `.homepage-container`
// (`--homepage-container-max: 56rem`) is the canonical content boundary elsewhere in
// this file too (it's what the desktop side-nav's own position calc is built on).
// See the `contentInset` effect below.
const HOMEPAGE_CONTENT_CONTAINER_SELECTOR = 'section#hero .homepage-container';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const HOMEPAGE_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'travelogue', label: 'Travel' },
  { id: 'contact', label: 'Contact' },
];

export default function HomepageMobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobileMenuOpenRef = useRef(false);
  // The nav's own `.homepage-container` box — its outer (border-box) edges are
  // used as the coordinate frame for `contentInset` below. Since this element
  // uses `box-sizing: border-box`, its own outer edges never move when its
  // padding changes, so it's a stable local reference regardless of what
  // padding value we're currently applying.
  const containerRef = useRef<HTMLDivElement>(null);
  // Rendered left/right inset of the homepage's own content container, in px,
  // measured relative to `containerRef`'s own outer edges (not `window.innerWidth`
  // or the `<header>`'s edges — both diverge from this element's true edges once
  // `.homepage-container`'s max-width/auto-margin centering kicks in above
  // ~944px, or when a scrollbar changes the viewport available to fixed-position
  // elements at other widths). Falls back to the class's static 1.5rem padding
  // (via `undefined` style, before this resolves) — correct in the common case.
  const [contentInset, setContentInset] = useState<{ left: number; right: number } | null>(null);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const measure = () => {
      const reference = document.querySelector<HTMLElement>(HOMEPAGE_CONTENT_CONTAINER_SELECTOR);
      if (!reference || !containerRef.current) return;
      // `.homepage-container`'s own rect is its padding-box (outer) edge — add its
      // own computed padding back in to land on the actual content-box edge, which
      // is what should align with the signature/hamburger.
      const contentRect = reference.getBoundingClientRect();
      const contentStyle = getComputedStyle(reference);
      const contentPaddingLeft = parseFloat(contentStyle.paddingLeft) || 0;
      const contentPaddingRight = parseFloat(contentStyle.paddingRight) || 0;
      const contentLeftEdge = contentRect.left + contentPaddingLeft;
      const contentRightEdge = contentRect.right - contentPaddingRight;

      const localRect = containerRef.current.getBoundingClientRect();
      setContentInset({
        left: contentLeftEdge - localRect.left,
        right: localRect.right - contentRightEdge,
      });
    };

    measure();
    window.addEventListener('resize', measure);

    const reference = document.querySelector<HTMLElement>(HOMEPAGE_CONTENT_CONTAINER_SELECTOR);
    const resizeObserver = reference && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(reference!);

    return () => {
      window.removeEventListener('resize', measure);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    window.history.pushState(null, '', `#${sectionId}`);
    // Closing the menu unlocks `body.style.overflow` via a passive effect that
    // fires after this handler returns — scrolling before that lock clears is a
    // no-op, so this waits a tick past the close instead of racing it with rAF.
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const items = HOMEPAGE_SECTIONS.map(({ id, label }) => ({
    label,
    href: `#${id}`,
    onClick: scrollToSection(id),
  }));

  return (
    <header
      className={`hidden max-[1079px]:block fixed inset-x-0 top-0 z-50 transition-all duration-500 motion-reduce:transition-none ${
        isScrolled ? 'border-b border-neutral-100 bg-white/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/*
        Homepage uses its own container system (`.homepage-container`, defined in
        app/globals.css under `.homepage-root`), not the interior pages' Tailwind
        `.container`. `.homepage-root` is re-declared here (harmless — it only
        defines CSS custom properties) so `--homepage-container-max` resolves
        correctly even though this header sits outside the page's `.homepage-root`
        content wrapper, keeping the signature/hamburger aligned to the same
        56rem/1.5rem-padding grid as the homepage content below. `contentInset`
        (measured above) overrides the class's static padding once available, so
        alignment holds pixel-for-pixel even if the rendered content edge ever
        diverges from the static 1.5rem value.
      */}
      <div
        ref={containerRef}
        className="homepage-root homepage-container relative z-20"
        style={contentInset ? { paddingLeft: contentInset.left, paddingRight: contentInset.right } : undefined}
      >
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={scrollToSection('hero')}
            className="m-0 flex h-fit w-fit items-center p-0 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
            aria-label="Return to top of page"
          >
            <Image
              src={`${basePath}/images/signature-25.png`}
              alt="Dan Meier"
              width={150}
              height={37}
              priority
              className="h-9 w-auto brightness-0"
            />
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            data-project-nav-trigger
            aria-haspopup="menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls={PROJECT_NAV_MOBILE_MENU_ID}
            className={`flex min-h-[44px] items-center justify-end py-2 pl-4 transition-colors duration-500 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
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
            pathname="/"
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            items={items}
          />
        </div>
      </div>
    </header>
  );
}
