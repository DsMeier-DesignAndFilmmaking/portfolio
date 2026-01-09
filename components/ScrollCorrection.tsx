'use client';

import { useEffect } from 'react';

/**
 * Scroll Correction Component
 * Re-triggers scroll position when content loads to ensure anchor links land correctly
 */
export default function ScrollCorrection() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const smoothScrollTo = (targetSelector: string) => {
      const target = document.querySelector(targetSelector);
      if (!target) return;

      // 1. Initial Scroll
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 2. The "Safety Check": If images/videos load and move the section, re-align.
      const observer = new ResizeObserver(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      // Observe the section for 2 seconds, then disconnect to save performance
      observer.observe(target);
      setTimeout(() => observer.disconnect(), 2000);
    };

    // Apply to all anchor links
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    };

    // Find all anchor links that point to sections
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Cleanup
    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return null;
}
