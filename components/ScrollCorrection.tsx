'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll Correction Component
 * Re-triggers scroll position when content loads to ensure anchor links land correctly
 */
export default function ScrollCorrection() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const smoothScrollTo = (targetSelector: string) => {
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const getFixedHeaderOffset = () => {
        const header = Array.from(
          document.querySelectorAll<HTMLElement>('#site-navbar, header.sticky, header.fixed')
        ).find((element) => {
          const position = window.getComputedStyle(element).position;
          return position === 'fixed' || position === 'sticky';
        });

        if (header) return header.offsetHeight;

        return window.innerWidth <= 768 ? 64 : 0;
      };

      // Only use actual fixed/sticky page chrome, not in-page section headers.
      const navbarHeight = getFixedHeaderOffset();

      // Check if mobile (viewport width <= 768px)
      const isMobile = window.innerWidth <= 768;
      
      // Add extra offset for #work section on mobile to prevent navbar covering headline
      const extraOffset = (isMobile && targetSelector === '#work') ? 96 : 0; // 96px extra on mobile for work section

      // Track if user is manually scrolling to prevent ResizeObserver from firing
      let isUserScrolling = false;
      let userScrollTimeout: NodeJS.Timeout | null = null;

      const handleUserScroll = () => {
        isUserScrolling = true;
        if (userScrollTimeout) clearTimeout(userScrollTimeout);
        userScrollTimeout = setTimeout(() => {
          isUserScrolling = false;
        }, 150);
      };

      // Listen for manual scroll events
      window.addEventListener('scroll', handleUserScroll, { passive: true });

      // Use getBoundingClientRect for accurate position calculation
      // This accounts for any layout shifts that may have occurred
      const rect = target.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offsetPosition = rect.top + scrollTop - navbarHeight - extraOffset;

      // Mobile-only logic for #work section to handle image loading layout shifts
      if (isMobile && targetSelector === '#work') {
        // Show scroll shield overlay to hide jerky adjustments
        setIsScrolling(true);
        
        // 1. Initial "jump" scroll to estimated position + 300px to trigger image loading
        const initialJumpPosition = offsetPosition + 300;
        window.scrollTo({
          top: initialJumpPosition,
          behavior: 'auto' // Instant jump, not smooth
        });

        // 2. Final precise scroll after images have time to load and displace layout
        setTimeout(() => {
          // Recalculate position after images have pushed content down
          const updatedRect = target.getBoundingClientRect();
          const updatedScrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const finalOffsetPosition = updatedRect.top + updatedScrollTop - navbarHeight - extraOffset;
          
          window.scrollTo({
            top: finalOffsetPosition,
            behavior: 'smooth'
          });
          
          // Hide overlay after scroll completes with fade-out transition
          setTimeout(() => {
            setIsScrolling(false);
          }, 300);
        }, 300);
      } else if (isMobile) {
        // Mobile scroll for all other sections - show overlay
        setIsScrolling(true);
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Hide overlay after scroll completes with fade-out transition
        // Estimate scroll duration (typically 500-1000ms for smooth scroll)
        setTimeout(() => {
          setIsScrolling(false);
        }, 600);
      } else {
        // Desktop: standard smooth scroll without overlay
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      // 3. The "Safety Check": If images/videos load and move the section, re-align.
      // But prevent firing if user is manually scrolling to avoid "scroll fighting"
      const observer = new ResizeObserver(() => {
        // Don't adjust if user is manually scrolling
        if (isUserScrolling) return;

        // Recalculate position after layout changes
        const updatedRect = target.getBoundingClientRect();
        const updatedScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const updatedOffsetPosition = updatedRect.top + updatedScrollTop - navbarHeight - extraOffset;
        
        window.scrollTo({
          top: updatedOffsetPosition,
          behavior: 'smooth'
        });
      });

      // Observe the section for 2 seconds, then disconnect to save performance
      observer.observe(target);
      setTimeout(() => {
        observer.disconnect();
        window.removeEventListener('scroll', handleUserScroll);
        if (userScrollTimeout) clearTimeout(userScrollTimeout);
      }, 2000);
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

  return (
    <>
      {/* Scroll Shield Overlay - Hides jerky scroll adjustments on mobile */}
      <div 
        className={`fixed inset-0 z-[40] bg-white transition-opacity duration-300 pointer-events-none ${
          isScrolling ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
