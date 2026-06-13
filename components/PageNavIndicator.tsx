'use client';

/**
 * PageNavIndicator
 *
 * Two-part mobile navigation indicator, combined into a single component:
 *
 * ① SCROLL PROGRESS BAR (top, 5px)
 *   - Fixed at the very top of the viewport, z-[60] (above the z-50 nav).
 *   - Uses CSS transform scaleX() for GPU-composited animation — no layout reflow.
 *   - Gradient fill: deep gold → bright yellow → pale highlight.
 *   - Small glowing cap dot rides the leading edge.
 *   - Fades in after 80px of scroll to avoid flashing at the top.
 *
 * ② VERTICAL SECTION DOT NAV (right side, mobile/tablet by default)
 *   - Fixed at mid-viewport, right edge, z-[55].
 *   - Hidden on lg+ unless showDotsOnDesktop is enabled.
 *   - IntersectionObserver-equivalent: scroll listener walks sections,
 *     finds the one whose top has passed 38% down the viewport.
 *   - Active dot: yellow (#FFDD00), enlarged, glowing ring.
 *   - Active label: pill slides in to the left of the dot.
 *   - Inactive dots: neutral/semi-transparent, visible on both light and dark sections.
 *   - Tap-to-scroll: clicking any dot smooth-scrolls to that section.
 *   - Fades in after 120px of scroll; entirely pointer-events-none when hidden.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface NavSection {
  id: string;     // must match an element id in the DOM
  label: string;  // short label shown next to active dot (≤10 chars)
}

interface PageNavIndicatorProps {
  sections: NavSection[];
  showDotsOnDesktop?: boolean;
}

export function PageNavIndicator({ sections, showDotsOnDesktop = false }: PageNavIndicatorProps) {
  const [progress, setProgress] = useState(0);         // 0–1
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [barVisible, setBarVisible] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);
  const sectionsRef = useRef(sections);
  const dotNavVisibility = showDotsOnDesktop
    ? `${dotsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} lg:opacity-100 lg:pointer-events-auto`
    : `${dotsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  useEffect(() => {
    /** 38% from the top of the viewport is the "active" threshold.
     *  A section becomes active when its top edge has scrolled above this line. */
    const THRESHOLD = 0.38;
    let ticking = false;
    let rafId: number | null = null;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docH > 0 ? scrollTop / docH : 0;
      const nextBarVisible = scrollTop > 80;
      const nextDotsVisible = scrollTop > 120;
      const sectionList = sectionsRef.current;

      // Progress bar fill
      setProgress((prev) => (prev === nextProgress ? prev : nextProgress));
      setBarVisible((prev) => (prev === nextBarVisible ? prev : nextBarVisible));
      setDotsVisible((prev) => (prev === nextDotsVisible ? prev : nextDotsVisible));

      // Active section detection:
      // Walk sections in order. Each section that has scrolled above the threshold
      // becomes the candidate; the last one wins (= deepest visible section).
      const cutoff = window.innerHeight * THRESHOLD;
      let current = sectionList[0]?.id ?? '';
      for (const { id } of sectionList) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= cutoff) {
          current = id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));

      ticking = false;
      rafId = null;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress(); // initialize once on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  /** Smooth-scroll to a section by id */
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      {/* ── ① PROGRESS BAR ──────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[5px] pointer-events-none"
        aria-hidden="true"
      >
        {/*
         * The bar fill.
         * scaleX drives the animation entirely on the GPU compositor.
         * will-change-transform pre-promotes this layer before the first scroll.
         * The gradient goes from a muted gold at the start → bright yellow → pale tip,
         * creating a sense of depth/glow as the bar grows.
         */}
        <div
          className="h-full w-full origin-left will-change-transform"
          style={{
            transform: `scaleX(${progress})`,
            opacity: barVisible ? 1 : 0,
            background: 'linear-gradient(to right, #c4a800, #FFDD00 60%, #fff9c4)',
            transition: 'opacity 0.4s ease',
          }}
        />

        {/*
         * Glow cap at the leading edge.
         * Repositioned via `left` (minor style recalc on each tick, negligible for a 7px element).
         * box-shadow creates the soft yellow aura.
         */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full"
          style={{
            left: `calc(${progress * 100}% - 3.5px)`,
            background: '#FFDD00',
            opacity: barVisible && progress > 0.015 ? 1 : 0,
            boxShadow:
              '0 0 8px rgba(255,221,0,1), 0 0 18px rgba(255,221,0,0.6)',
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* ── ② SECTION DOT NAVIGATION ────────────────────────── */}
      {/*
       * Dots can be mobile-only or all breakpoints depending on page needs.
       * Fades in/out smoothly; pointer-events-none when invisible so it never
       * intercepts touches when the page is at the very top.
       */}
      <nav
        className={`fixed right-3 top-1/2 -translate-y-1/2 z-[55] flex flex-col gap-3 lg:right-6 lg:gap-2.5 ${showDotsOnDesktop ? 'lg:rounded-2xl lg:border lg:border-neutral-200/70 lg:bg-white/75 lg:px-2 lg:py-3 lg:shadow-sm lg:backdrop-blur-md' : 'lg:hidden'}
          transition-all duration-500 ease-out
          ${dotNavVisibility}`}
        aria-label="Page section navigation"
      >
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              className="
                group relative flex items-center justify-end gap-1.5 rounded-full
                py-2 pl-3 pr-0
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDD00]/70
              "
            >

              {/*
               * Section label pill — slides in horizontally when this section is active.
               * backdrop-blur-sm keeps it legible over both light and dark page sections.
               * Semi-transparent white background with a soft border and shadow.
               */}
              <span
                className={`
                  text-[8px] font-black uppercase tracking-[0.18em] whitespace-nowrap
                  px-2 py-[3px] rounded-full border backdrop-blur-sm
                  transition-all duration-300 ease-out
                  ${isActive
                    ? 'opacity-100 translate-x-0 bg-white/90 border-neutral-200/80 text-neutral-500 shadow-sm'
                    : 'opacity-0 translate-x-2 pointer-events-none bg-white/60 border-transparent text-neutral-400'
                  }
                `}
                aria-hidden={!isActive}
              >
                {label}
              </span>

              {!isActive && (
                <span
                  className="
                    absolute right-5 top-1/2 hidden -translate-y-1/2 translate-x-1
                    whitespace-nowrap rounded-full border border-white/10 bg-neutral-950/95 px-2.5 py-1
                    text-[8px] font-black uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-sm
                    opacity-0 transition-all duration-150 ease-out
                    group-hover:translate-x-0 group-hover:opacity-100
                    group-focus-within:translate-x-0 group-focus-within:opacity-100
                    motion-reduce:translate-x-0 motion-reduce:transition-none
                    lg:block
                  "
                  aria-hidden="true"
                >
                  {label}
                </span>
              )}

              {/*
               * The dot itself.
               * Active state: #FFDD00 background, 8×8px, subtle glow ring.
               * Inactive: neutral-400/50, 5×5px — legible on both white and dark sections.
               * scale-110 on hover gives touch-friendly affordance feedback.
               */}
              <span
                aria-hidden="true"
                className={`
                  rounded-full flex-shrink-0
                  transition-all duration-300 ease-out
                  ${isActive
                    ? 'w-[8px] h-[8px] scale-110'
                    : 'w-[5px] h-[5px] bg-neutral-400/50 group-hover:bg-neutral-400/80 group-hover:scale-125 group-active:scale-90'
                  }
                `}
                style={
                  isActive
                    ? {
                        background: '#FFDD00',
                        /* Double ring: inner halo + outer diffuse glow */
                        boxShadow:
                          '0 0 0 3px rgba(255,221,0,0.2), 0 0 10px rgba(255,221,0,0.75)',
                      }
                    : undefined
                }
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
