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

      // Get navbar height for offset calculation (h-16 = 64px)
      const navbar = document.querySelector('header');
      const navbarHeight = navbar ? navbar.offsetHeight : 64;

      // Use getBoundingClientRect for accurate position calculation
      // This accounts for any layout shifts that may have occurred
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offsetPosition = rect.top + scrollTop - navbarHeight;

      // 1. Initial Scroll with navbar offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // 2. The "Safety Check": If images/videos load and move the section, re-align.
      const observer = new ResizeObserver(() => {
        // Recalculate position after layout changes
        const updatedRect = target.getBoundingClientRect();
        const updatedScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const updatedOffsetPosition = updatedRect.top + updatedScrollTop - navbarHeight;
        
        window.scrollTo({
          top: updatedOffsetPosition,
          behavior: 'smooth'
        });
      });

      // Observe the section for 2 seconds, then disconnect to save performance
      observer.observe(target);
      setTimeout(() => observer.disconnect(), 2000);
    };

    // Use event delegation to handle all anchor links (including dynamically added ones)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked element or its parent is an anchor link
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        e.stopPropagation();
        
        // Update URL hash immediately
        window.location.hash = href;
        
        // Check if page loader is still visible
        const loader = document.getElementById('page-loader');
        const isLoading = loader && !loader.classList.contains('loader-hidden');
        
        if (isLoading) {
          // Page is still loading - the PageLoader will handle scrolling after load
          // Just update the hash and wait
          return;
        }
        
        // Page is loaded - scroll immediately
        smoothScrollTo(href);
      }
    };

    // Attach event listener to document for event delegation
    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
}
