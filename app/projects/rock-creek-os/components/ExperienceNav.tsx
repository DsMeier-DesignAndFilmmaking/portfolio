'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
// TWO VARIANTS, split at `sm` (640px). The rail above is the `sm:`-and-up
// presentation. Below that it is replaced by a disclosure picker, because the
// rail does not merely get tight on a phone — the fourth section becomes
// completely invisible. Measured at 375px: the rail is 327px wide with 547px of
// content, "Systems Atlas" ends at 325px, and "Environmental Experience OS"
// starts at 349px. So there is a 22px blank gutter and then nothing — no
// partial peek to imply more, and `.no-scrollbar` (globals.css) removes the
// scrollbar too, leaving the rail looking like a complete three-item set.
//
// 640px is not a taste call, it is where the content first fits: 320/375/430px
// all need 557px against 272/327/382px available; 640px is the first width with
// enough room (592 available). Shortening the labels was measured as an
// alternative — "Overview / Explorer / Atlas / Dashboard" needs 304px, so it
// fits from ~360px but still fails at 320px and under iOS Dynamic Type, and it
// throws away names that carry the case study's information scent.
//
// The picker's trigger states the count outright ("SECTION 1 OF 4") rather than
// relying on a fade or a peeking edge, so the existence of the fourth section is
// declared instead of left to be discovered by swiping — which was the actual
// reported problem. It is an anchored inline panel, deliberately NOT a
// full-screen sheet: the global header's hamburger already owns that pattern
// (`fixed inset-0 z-[120]` in ProjectPracticeNavDropdown), and a second
// full-screen menu on the same page would make the two nav layers
// indistinguishable.
//
// The split is done with CSS (`sm:hidden` / `hidden sm:flex`), never a JS width
// check: these routes are statically exported, and a JS variant switch would
// paint the wrong control before hydration. Both variants live inside ONE `<nav>`
// landmark so the accessibility tree never sees a duplicated nav or a duplicated
// link set — whichever variant is `display:none` drops out of the tree entirely.
//
// Active state is derived from `usePathname()` rather than passed in, so a
// deep link or a hard refresh on any nested route resolves the correct state
// with no page-level wiring. Note `trailingSlash: true` in next.config.js —
// pathnames arrive as `/projects/rock-creek-os/systems/`, hence normalization.
// ─────────────────────────────────────────────────────────────────────────────

// Offset architecture — see the token block in `app/globals.css`.
//
// The rail pins to `--project-header-height` (republished at runtime by
// ProjectHeader from a ResizeObserver on its own box) plus
// `--project-header-shift`, applied as a transform.
//
// The shift is the part that makes this correct on mobile. ProjectHeader's
// height really is the same 68px at every breakpoint — but on mobile it is not
// always *there*: below `lg` it hides itself on scroll-down and slides back on
// scroll-up (`-translate-y-full lg:translate-y-0`). A rail pinned to a constant
// `top: 68` therefore floats a 68px band of scrolling content above it for as
// long as the user keeps scrolling down, then has the header slide back
// underneath it — which is the "inconsistent gap / not synchronized with the
// mobile navbar" behavior this replaced. Desktop never hid the header, which is
// exactly why desktop always looked right. Carrying the same shift the header
// carries, over the same 500ms and the same easing, keeps the two locked
// together: flush under the header when it's up, flush to the viewport top when
// it's away.
//
// This constant is only the pre-hydration fallback for the IntersectionObserver
// margin below, which needs a resolved number rather than a `var()`.
const HEADER_HEIGHT_FALLBACK = 68;

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
   * clears the header for its entire layout via `--project-header-height`, so
   * adding the full 100px again here would double the gap.
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
  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT_FALLBACK);

  // Below-`sm` picker (see the file header). Everything below is inert at `sm`
  // and up, where the trigger and panel are `display:none` and unreachable.
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelId = useId();

  // The panel is PORTALED to <body> and positioned from a measured trigger rect
  // rather than rendered inline as an absolutely-positioned child. It has to be:
  // globals.css enforces `main { overflow-x: hidden !important }` and
  // `[class*="container"] { overflow-x: hidden !important }` on mobile (the
  // sitewide horizontal-scroll guards), and this rail's own wrapper carries
  // `container`. Per the overflow spec a non-`visible` value on one axis
  // computes the other to `auto`, so each of those becomes a clipping box on Y
  // too — and an inline panel, whose containing block sits inside them, gets
  // clipped to roughly the trigger's own height. Measured live before this
  // changed: four 44px rows laid out, but only ~53px of them could paint.
  // Escaping to a portal is the same fix ProjectPracticeNavDropdown already
  // uses for its own menu.
  const [isMounted, setIsMounted] = useState(false);
  const [triggerRect, setTriggerRect] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Falls back to the first section rather than rendering an empty trigger: a
  // pathname that matches nothing (a future nested route) should still leave the
  // control readable and operable.
  const activeIndex = Math.max(
    0,
    EXPERIENCES.findIndex((exp) => current === normalize(exp.href)),
  );

  const closePicker = useCallback((returnFocus = false) => {
    setIsPickerOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Measured at open time only. Safe because the panel closes on both scroll and
  // resize, which are the only two things that could invalidate the rect while
  // it is up.
  const openPicker = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setTriggerRect({ top: rect.bottom, left: rect.left, width: rect.width });
    setIsPickerOpen(true);
  }, []);

  // Moves focus between rows without the `role="menu"` semantics — see the
  // render below for why these stay plain links.
  const focusItem = useCallback((index: number) => {
    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;
    const wrapped = (index + items.length) % items.length;
    items[wrapped]?.focus();
  }, []);

  // Dismissal, mirroring the contract the site's other menus already use:
  // outside pointerdown and Escape (ProjectPracticeNavDropdown), plus close-on-
  // scroll (ProjectHeader does the same to its mobile menu). Scroll matters more
  // here than elsewhere — this panel is anchored to a control that re-pins as
  // the page moves, so leaving it open across a scroll would detach it visually.
  useEffect(() => {
    if (!isPickerOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      // Both boxes, because the panel is portaled out of `pickerRef`'s subtree.
      if (pickerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setIsPickerOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePicker(true);
    };
    const handleScroll = () => setIsPickerOpen(false);

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    // The panel is positioned from a rect captured at open time, so a resize
    // would leave it stranded. Closing is the honest response.
    window.addEventListener('resize', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isPickerOpen, closePicker]);

  // Every row is a route navigation, so the panel has to let go once the route
  // actually changes — otherwise it survives the transition and hangs over the
  // page the user just landed on.
  useEffect(() => {
    setIsPickerOpen(false);
  }, [pathname]);

  // Reads the shared token for the one place that can't consume a `var()`:
  // IntersectionObserver's `rootMargin`, which takes a resolved length string.
  // ProjectHeader may publish the real value a tick after this mounts, hence
  // the rAF re-read; `resize` covers the (currently theoretical) case of the
  // header's height becoming breakpoint-dependent later.
  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(
        '--project-header-height',
      );
      const value = Number.parseFloat(raw);
      if (Number.isFinite(value) && value > 0) setHeaderHeight(value);
    };
    read();
    const raf = requestAnimationFrame(read);
    window.addEventListener('resize', read);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', read);
    };
  }, []);


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
  // same measured header height by construction, so the handoff from static to
  // `fixed` lands exactly where the rail already was, with no visible jump.
  // Deliberately keyed to the header's resting height rather than its current
  // on-screen position: this decides WHEN to pin, and that threshold should not
  // move around as the header hides and reappears.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [headerHeight]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className={`h-px ${topOffsetClassName}`} />
      {/* Reserves the rail's own footprint the instant it leaves flow for
          `fixed`, so nothing below it jumps up. Absent while resting in
          normal flow — the rail is already reserving its own space there. */}
      {isStuck && <div aria-hidden="true" style={{ height: railHeight }} />}
      <div
        ref={railRef}
        className={`z-40 ${outerClassName} ${
          isStuck ? 'fixed inset-x-0 transition-transform duration-700 ease-out motion-reduce:transition-none' : ''
        }`}
        style={
          isStuck
            ? {
                // Both halves come from the shared tokens, so this stays
                // correct at any breakpoint without a second offset to
                // maintain.
                //
                // Timing is deliberately NOT matched to ProjectHeader's
                // `duration-500`: the rail trails it by 200ms on a decelerating
                // curve, so the movement reads as a settle rather than a snap.
                // Both directions stay clean under that lag because the header
                // is opaque and paints above the rail (z-50 vs z-40) — on the
                // way back down the rail finishes from *behind* the header and
                // slides out from under it; on the way up it simply keeps
                // easing into space the header has already vacated. What must
                // not drift is the resting geometry, and that's a token, not a
                // duration, so the two always agree about where the rail ends
                // up even if they disagree about how fast to get there.
                //
                // The transition is intentionally live on the very first stuck
                // frame, so the browser animates the transform's first
                // application rather than snapping it. That first application is
                // a real 68px move, not an artifact: scrolling down past the
                // pin threshold, the header is already hidden (it leaves at
                // 10px of scroll, the rail pins at ~33px), so the rail's flow
                // position is a header-height below where a pinned rail under
                // an absent header belongs. Animating from `none` starts the
                // glide exactly where the rail physically was a frame earlier,
                // which is what makes the handoff continuous. Unsticking needs
                // no equivalent, because it can only happen while scrolling up
                // — and scrolling up is what brings the header back, so the
                // shift is already 0 by the time the rail returns to flow.
                top: 'var(--project-header-height)',
                transform: 'translateY(var(--project-header-shift))',
              }
            : undefined
        }
      >
        <div className={innerClassName}>
          {/* The rail's chrome fades in over the same 700ms as the travel
              above, so pinning reads as one continuous settle instead of a
              slow slide with a quick flash of background under it. The
              `backdrop-blur-md` inside still snaps rather than interpolating,
              which is deliberate: making it gradual would mean carrying a
              `backdrop-blur-none` in the resting state too, and a live
              backdrop-filter layer over a page this long is a real cost on
              mobile Safari for an effect the background fade already hides. */}
          <div
            className={`transition-[background-color,border-color] duration-700 ease-out motion-reduce:transition-none ${
              isStuck
                ? `border-b backdrop-blur-md ${
                    isDark ? 'border-white/10 bg-neutral-950/90' : 'border-neutral-100 bg-white/90'
                  }`
                : ''
            }`}
          >
            <nav aria-label="Case Study: The Ranch at Rock Creek sections">
              {/* ─── Below `sm`: disclosure picker ─────────────────────────
                  Plain disclosure semantics (`aria-expanded` + `aria-controls`
                  over a list of links), NOT `role="menu"`/`menuitem`. These
                  rows are ordinary navigation links, and menu roles would make
                  a screen reader announce them as application menu items and
                  suppress the link semantics users actually want here. Arrow
                  keys are still wired up below as a convenience, which the
                  disclosure pattern permits. */}
              <div
                ref={pickerRef}
                className={`relative z-30 sm:hidden ${
                  isStuck ? '' : `border-b ${isDark ? 'border-white/10' : 'border-neutral-200'}`
                }`}
              >
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => (isPickerOpen ? setIsPickerOpen(false) : openPicker())}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                      event.preventDefault();
                      openPicker();
                      // Defer past the panel's mount so the refs exist.
                      requestAnimationFrame(() =>
                        focusItem(event.key === 'ArrowDown' ? 0 : EXPERIENCES.length - 1),
                      );
                    }
                  }}
                  aria-expanded={isPickerOpen}
                  aria-controls={panelId}
                  className={`flex min-h-[44px] w-full items-center justify-between gap-4 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 focus-visible:ring-offset-2 ${
                    isDark ? 'focus-visible:ring-offset-neutral-950' : ''
                  }`}
                >
                  <span className="flex min-w-0 flex-col">
                    {/* The count is the whole point of this control: it states
                        that a fourth section exists instead of leaving it to be
                        found by swiping. Derived from the array, never a
                        hardcoded 4. */}
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {`Section ${activeIndex + 1} of ${EXPERIENCES.length}`}
                    </span>
                    <span
                      className={`truncate text-sm font-bold ${
                        isDark ? 'text-white' : 'text-neutral-950'
                      }`}
                    >
                      {EXPERIENCES[activeIndex].label}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                      isPickerOpen ? 'rotate-180' : ''
                    } ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}
                  />
                </button>

                {isMounted &&
                  createPortal(
                    <AnimatePresence>
                      {isPickerOpen && triggerRect && (
                        <motion.div
                          id={panelId}
                          ref={panelRef}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          // Fixed and portaled — see the note by `triggerRect`.
                          // Overlays the page rather than pushing it: pushing
                          // would shift content under the user's thumb mid-tap
                          // and fight the pinned placeholder's measured height.
                          // z-45 sits above the rail (z-40) and below the global
                          // header (z-50), so the panel can never cover the
                          // primary nav.
                          style={{
                            position: 'fixed',
                            top: triggerRect.top,
                            left: triggerRect.left,
                            width: triggerRect.width,
                            zIndex: 45,
                          }}
                          className={`overflow-hidden rounded-b-lg border shadow-lg sm:hidden ${
                            isDark ? 'border-white/10 bg-neutral-950' : 'border-neutral-200 bg-white'
                          }`}
                        >
                          <ul className="m-0 list-none p-0">
                            {EXPERIENCES.map((exp, index) => {
                              const isActive = index === activeIndex;
                              return (
                                <li key={exp.href}>
                              <Link
                                ref={(node) => {
                                  itemRefs.current[index] = node;
                                }}
                                href={exp.href}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => setIsPickerOpen(false)}
                                onKeyDown={(event) => {
                                  if (event.key === 'ArrowDown') {
                                    event.preventDefault();
                                    focusItem(index + 1);
                                  } else if (event.key === 'ArrowUp') {
                                    event.preventDefault();
                                    focusItem(index - 1);
                                  } else if (event.key === 'Home') {
                                    event.preventDefault();
                                    focusItem(0);
                                  } else if (event.key === 'End') {
                                    event.preventDefault();
                                    focusItem(EXPERIENCES.length - 1);
                                  } else if (event.key === 'Tab') {
                                    // Tab leaves the panel entirely rather than
                                    // cycling inside it — this is a small
                                    // anchored disclosure, not a modal, so
                                    // trapping focus here would be wrong.
                                    setIsPickerOpen(false);
                                  }
                                }}
                                // Same three channels the rail uses, so "current"
                                // survives grayscale and color-vision deficiency:
                                // the dot, the weight, and the contrast step.
                                className={`flex min-h-[44px] items-center justify-between gap-3 px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rockcreek-600 motion-reduce:transition-none ${
                                  isActive
                                    ? isDark
                                      ? 'font-bold text-white'
                                      : 'font-bold text-neutral-950'
                                    : isDark
                                      ? 'font-medium text-neutral-400 hover:bg-white/5 hover:text-neutral-100'
                                      : 'font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                              >
                                <span className="min-w-0">{exp.label}</span>
                                {isActive && (
                                  <span
                                    aria-hidden="true"
                                    className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                                      isDark ? 'bg-rockcreek-400' : 'bg-rockcreek-600'
                                    }`}
                                  />
                                )}
                              </Link>
                            </li>
                          );
                        })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>,
                    document.body,
                  )}
              </div>

              {/* ─── `sm` and up: the original tab rail, unchanged ───────── */}
              <ul
                ref={scrollerRef}
                className={`no-scrollbar m-0 hidden list-none gap-6 overflow-x-auto p-0 sm:flex md:gap-8 ${
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
