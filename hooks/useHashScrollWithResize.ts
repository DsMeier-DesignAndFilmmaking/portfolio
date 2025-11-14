// hooks/useHashScrollWithResize.ts
import { useEffect, useRef } from "react";

export function useHashScrollWithResize(deps: any[] = []) {
  const roRef = useRef<ResizeObserver | null>(null);
  const lastScrolledHashRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = (hash?: string) => {
      const theHash = hash ?? window.location.hash;
      if (!theHash) return;
      // avoid re-scrolling repeatedly to same hash in short time
      if (lastScrolledHashRef.current === theHash) return;
      const el = document.querySelector(theHash);
      if (!el) return;
      lastScrolledHashRef.current = theHash;
      // ensure the browser has painted / layout stable
      requestAnimationFrame(() => {
        // give a small additional delay to allow ResizeObserver to run (if any)
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      });
    };

    // initial attempt on mount
    // run a couple of times spaced out to cover different race conditions
    setTimeout(() => scrollToHash(), 20);
    setTimeout(() => scrollToHash(), 300);

    // If any element that affects layout resizes (e.g., video container), re-run scroll
    // Observe the entire document body for size changes (could be optimized to just the video container)
    if ("ResizeObserver" in window) {
      roRef.current = new ResizeObserver(() => {
        // on size changes, re-run scroll to the same hash (if present)
        scrollToHash();
      });
      roRef.current.observe(document.body);
    }

    // Also listen for hashchange events
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      if (roRef.current) roRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
