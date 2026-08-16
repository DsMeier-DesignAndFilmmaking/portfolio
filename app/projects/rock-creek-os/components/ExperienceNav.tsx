'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ─────────────────────────────────────────────────────────────────────────────
// Section navigation between the four experiences inside the single
// Case Study: The Ranch at Rock Creek project.
//
// This is deliberately NOT a second fixed navbar. The portfolio's project-page
// nav architecture is: one global fixed header (`ProjectHeader`, which carries
// Practice / Work▾ / Services / Contact) plus in-content links between nested
// experiences — the same shape travel-and-ai uses for its nested detail routes.
// It IS, however, pinned beneath that header once scrolled past, and it has to
// be rendered as a DIRECT child of the page's outermost flow container
// (`<main>`, sibling to every `<section>`), not nested inside the hero section
// or any wrapper that contains nothing else — whatever pins it can only stay
// pinned for as long as its own direct parent's box keeps intersecting the
// scroll position, and pinning it inside the ~700px-tall hero on a
// ~20,000px page would make it let go after the first screenful and never
// reappear. The breadcrumb is NOT part of this component — it stays in the
// hero, rendered separately, and simply scrolls away with it.
//
// Pinning mechanism: NOT CSS `position: sticky`, even though that's the
// obviously-preferable, zero-JS approach and was the first thing tried here.
// `<body>` carries a load-bearing sitewide `overflow-x: hidden` (globals.css —
// it's what keeps dozens of other pages from horizontal-scrolling); per the
// CSS overflow spec, an explicit non-`visible` value on one axis computes the
// other axis to `auto` too, so `<body>` ends up a registered scroll container
// on the Y axis as well, even though nothing inside it actually overflows it
// (the visual viewport scroll happens on `<html>` instead, confirmed via
// `document.scrollingElement`). Browsers resolve a sticky element's "nearest
// scrolling ancestor" to that box, and since `<body>`'s own scrollTop never
// moves, sticky never sees a scroll delta and never engages — verified live by
// toggling `document.body.style.overflow` and watching the rail start/stop
// tracking scroll. Changing that global rule to fix one project's nav would
// risk reintroducing whatever horizontal-scroll bug it was added for, site
// wide — out of scope for a navigation-only enhancement. So the pin itself is
// done by hand: `isStuck` (below) flips from an IntersectionObserver — which
// doesn't depend on `position: sticky` or body's overflow at all — and drives
// a manual switch from static to `position: fixed`, with a measured
// placeholder reserving the vacated space so nothing beneath it jumps.
//
// Rendered as a documentation-style tab rail (Vercel / Stripe / GitHub) rather
// than a pill row. The active tab is marked on three independent channels —
// indicator position, font weight, and text contrast — so the current section
// stays unmistakable in grayscale, under any color-vision deficiency, and at a
// glance. A pill treatment would encode state almost entirely in fill color and
// would add the heaviest enclosed shape on the page directly above the H1.
//
// Active state is derived from `usePathname()` rather than passed in, so a
// deep link or a hard refresh on any nested route resolves the correct state
// with no page-level wiring. Note `trailingSlash: true` in next.config.js —
// pathnames arrive as `/projects/rock-creek-os/systems/`, hence normalization.
// ─────────────────────────────────────────────────────────────────────────────

// `components/ProjectHeader.tsx`'s rendered height. Fixed value, not a
// measurement: the header's content (h-9 logo + py-4) is identical at every
// breakpoint — verified via getBoundingClientRect at 375px and 1280px widths,
// and it's the same number the dashboard route already uses in `pt-[68px]` to
// clear the same header. Sticky `top` has to match it exactly, or the rail
// either leaves a gap under the header or tucks a few px beneath it.
const HEADER_HEIGHT = 68;

const EXPERIENCES = [
  // "Overview" rather than "Case Study": the breadcrumb in the hero already
  // reads "Case Study: The Ranch at Rock Creek", and repeating it as a tab
  // label would collapse two hierarchy levels into the same words.
  { label: 'Overview', href: '/projects/rock-creek-os' },
  { label: 'Systems Explorer', href: '/projects/rock-creek-os/explorer' },
  { label: 'Systems Atlas', href: '/projects/rock-creek-os/systems' },
  { label: 'Environmental Experience OS', href: '/projects/rock-creek-os/dashboard' },
];

const normalize = (value: string) => {
  if (!value || value === '/') return '/';
  return value.replace(/\/+$/, '');
};

export function ExperienceNav({
  tone = 'light',
  /**
   * Outer horizontal rhythm, matched to whatever bounds the primary header's
   * logo and the hero's content actually use — NOT a self-centered box of its
   * own. `ProjectHeader` positions the logo via `container mx-auto px-6
   * md:px-8`, and every hero on the three narrative routes nests its content
   * in the exact same class string, so the rail has to use it too: `container`
   * has its own responsive max-width per breakpoint, different from a bare
   * `max-w-3xl`, so pairing `mx-auto` with `max-w-3xl` directly (the previous
   * approach) self-centers a narrower, independently-centered box — at a
   * typical desktop width the two diverge by a couple hundred px, which is
   * exactly the misalignment this was reported against. The dashboard route
   * doesn't use `container` at all — its header/status-strip/grid are all
   * self-centered via `mx-auto max-w-[1600px] px-4 md:px-6` directly — so it
   * passes that instead, with `innerClassName` empty since there's no second
   * cap to apply.
   *
   * Always carries `w-full` (added to both defaults below, not just this
   * one) for a reason that has nothing to do with the alignment logic above:
   * on the dashboard, this element is a DIRECT flex-item child of the page's
   * outer `flex flex-col` shell. A flex item with `mx-auto` but no explicit
   * width doesn't stretch to fill the cross axis the way a plain block
   * element would — the auto margins instead shrink it to fit its content
   * and center *that*, which silently reintroduces a self-centered,
   * off-alignment box even with the correct class string. `w-full` forces
   * the stretch explicitly, sidestepping the flex/block distinction — and is
   * a no-op on the three narrative routes, where this sits inside a plain
   * (non-flex) `<main>` that already stretches `width:auto` children fully.
   */
  outerClassName = 'container mx-auto w-full px-6 md:px-8',
  /**
   * Inner width cap, nested inside `outerClassName` with NO `mx-auto` of its
   * own — it just sits flush at the outer box's left (padded) edge, exactly
   * like the plain `<div className="max-w-3xl">` every hero wraps its H1 and
   * breadcrumb in. Centering this too would reintroduce the same divergence
   * `outerClassName` above exists to avoid.
   */
  innerClassName = 'max-w-3xl',
  /**
   * Clearance above the rail's resting (pre-stick) position, so it doesn't
   * render underneath the fixed header on first paint. Defaults to the
   * `mt-[100px]` convention every hero on this project already uses. The
   * dashboard route passes a much smaller value: its outer shell already
   * applies `pt-[68px]` to clear the header for its entire layout, so adding
   * the full 100px again here would double the gap.
   */
  topOffsetClassName = 'mt-[100px]',
}: {
  tone?: 'light' | 'dark';
  outerClassName?: string;
  innerClassName?: string;
  topOffsetClassName?: string;
}) {
  const pathname = usePathname();
  const current = normalize(pathname ?? '');
  const isDark = tone === 'dark';

  const scrollerRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [railHeight, setRailHeight] = useState(0);

  // Keeps the placeholder's reserved height in sync with the rail's actual
  // rendered height (border/padding can vary a px or two by tone or content),
  // so the moment it switches to `fixed` and leaves flow, the placeholder
  // that takes its place is exactly as tall as it was — no jump either way.
  // ResizeObserver, not a scroll listener: fires only when the rail's box
  // actually changes size.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(([entry]) => setRailHeight(entry.contentRect.height));
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  // On a phone the rail scrolls horizontally, and the active tab can sit past
  // the right edge (the fourth label is the longest). Center it so the nav
  // answers "where am I" without the user having to discover the scroll. Only
  // the rail's own scrollLeft is touched — never the page scroll position,
  // which `scrollIntoView` would disturb.
  //
  // Driven by ResizeObserver rather than a one-shot mount effect: on the
  // dashboard route specifically, this rail sits inside a deeper flex/motion
  // layout that hasn't always finished sizing by the time an effect fires
  // synchronously after mount, so a single `rail.clientWidth` read could
  // observe 0 and bake a bogus scroll offset in permanently (nothing else
  // would ever re-trigger the calculation). ResizeObserver always reports the
  // real current size immediately on `.observe()`, and again on every
  // subsequent resize, so it self-corrects once real layout lands instead of
  // trusting whatever was measurable at the first paint.
  useEffect(() => {
    const rail = scrollerRef.current;
    if (!rail) return;
    const center = () => {
      const tab = activeRef.current;
      if (!tab || rail.clientWidth === 0) return;
      const target = tab.offsetLeft - (rail.clientWidth - tab.clientWidth) / 2;
      rail.scrollLeft = Math.max(0, target);
    };
    center();
    const observer = new ResizeObserver(center);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [current]);

  // Drives the pin itself (see the file-header note on why this isn't CSS
  // `position: sticky`). One observer watches a 1px sentinel placed
  // immediately before the rail, carrying the SAME top clearance the rail
  // rests at. `rootMargin` shrinks the observed viewport by exactly the
  // header's height, so the sentinel is reported "not intersecting" at the
  // precise scroll position where the rail's natural top would reach the
  // header's bottom edge — sentinel and rail share the same clearance and the
  // same HEADER_HEIGHT by construction, so the handoff from static to `fixed`
  // lands exactly where the rail already was, with no visible jump.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className={`h-px ${topOffsetClassName}`} />
      {/* Reserves the rail's own footprint the instant it leaves flow for
          `fixed`, so nothing below it jumps up. Absent while resting in
          normal flow — the rail is already reserving its own space there. */}
      {isStuck && <div aria-hidden="true" style={{ height: railHeight }} />}
      <div
        ref={railRef}
        className={`z-40 ${outerClassName} ${isStuck ? 'fixed inset-x-0' : ''}`}
        style={isStuck ? { top: HEADER_HEIGHT } : undefined}
      >
        <div className={innerClassName}>
          <div
            className={`transition-[background-color,border-color] duration-300 motion-reduce:transition-none ${
              isStuck
                ? `border-b backdrop-blur-md ${
                    isDark ? 'border-white/10 bg-neutral-950/90' : 'border-neutral-100 bg-white/90'
                  }`
                : ''
            }`}
          >
            <nav aria-label="Case Study: The Ranch at Rock Creek sections">
              <ul
                ref={scrollerRef}
                className={`no-scrollbar m-0 flex list-none gap-6 overflow-x-auto p-0 md:gap-8 ${
                  isStuck ? '' : `border-b ${isDark ? 'border-white/10' : 'border-neutral-200'}`
                }`}
              >
                {EXPERIENCES.map((exp) => {
                  const isActive = current === normalize(exp.href);

                  // Channel 1 of 3: the indicator is physically attached to
                  // one tab, so position alone identifies the section with
                  // color fully removed.
                  const indicator = isActive
                    ? isDark
                      ? 'border-rockcreek-400'
                      : 'border-rockcreek-600'
                    : isDark
                      ? 'border-transparent hover:border-white/25'
                      : 'border-transparent hover:border-neutral-300';

                  // Channels 2 and 3: weight and contrast both step up on the
                  // active tab, keeping it legible as "current" in grayscale.
                  const type = isActive
                    ? isDark
                      ? 'font-bold text-white'
                      : 'font-bold text-neutral-950'
                    : isDark
                      ? 'font-medium text-neutral-400 hover:text-neutral-100'
                      : 'font-medium text-neutral-500 hover:text-neutral-900';

                  return (
                    <li key={exp.href} className="flex-shrink-0">
                      <Link
                        ref={isActive ? activeRef : undefined}
                        href={exp.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`-mb-px inline-flex min-h-[44px] items-center whitespace-nowrap border-b-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 focus-visible:ring-offset-2 motion-reduce:transition-none ${
                          isDark ? 'focus-visible:ring-offset-neutral-950' : ''
                        } ${indicator} ${type}`}
                      >
                        {exp.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
