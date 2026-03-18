'use client';

/**
 * ScrollProgressBar
 *
 * A fixed 2px bar anchored to the very top of the viewport (z-[60], above the z-50 nav).
 *
 * How it works:
 * - A passive scroll listener computes: scrollY / (totalDocHeight - viewportHeight)
 * - That ratio drives `scaleX()` on the bar via an inline style — GPU-composited,
 *   zero layout reflow, no jank on long pages.
 * - The bar fades in smoothly after the user has scrolled 60px (avoids a flash at top).
 * - A small glowing cap dot rides the leading edge of the bar for polish.
 * - `pointer-events-none` keeps the element fully transparent to all gestures.
 * - `aria-hidden` removes it from the accessibility tree.
 *
 * Color: #FFDD00 (portfolio accent), matched to the yellow used in section labels.
 */

import { useState, useEffect } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0); // 0–1
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setVisible(scrollTop > 60);
    };

    // Passive listener — browser can skip waiting for JS before painting scroll frames
    window.addEventListener('scroll', update, { passive: true });
    update(); // run once on mount so SSR→CSR hydration is immediate

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      {/*
       * The bar itself.
       * `scaleX` animates on the GPU compositor — no style recalc, no layout.
       * `will-change-transform` hints the browser to promote this layer early.
       * `origin-left` ensures it grows left → right.
       * Opacity transitions on a separate 400ms ease to fade in/out gently.
       */}
      <div
        className="h-full w-full origin-left will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          opacity: visible ? 1 : 0,
          /* Gradient: slightly deeper gold at the start, bright yellow at the tip */
          background: 'linear-gradient(to right, #d4b800, #FFDD00)',
          /* Opacity on its own transition so scaleX can run at near-realtime (50ms) */
          transition: 'opacity 0.4s ease, transform 0.05s linear',
        }}
      />

      {/*
       * Leading-edge glow cap.
       * Positioned absolutely at `left: progress * 100%` inside the container.
       * The `left` property does cause a style recalc on each scroll tick, but
       * since this is a single tiny 6×6 element it is negligible in practice.
       * box-shadow creates the soft yellow halo.
       */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
        style={{
          left: `calc(${progress * 100}% - 2.5px)`,
          background: '#FFDD00',
          opacity: visible && progress > 0.01 ? 1 : 0,
          boxShadow:
            '0 0 6px rgba(255, 221, 0, 0.9), 0 0 14px rgba(255, 221, 0, 0.5)',
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  );
}
