'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { topLevelProjectNavGroups } from '@/utils/projectNavigation';
import { ChevronDown } from 'lucide-react';

type ProjectPracticeNavDropdownProps = {
  pathname: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  tone?: 'light' | 'dark';
  isNavbarWhite?: boolean;
};

export const PROJECT_NAV_MOBILE_MENU_ID = 'project-practice-mobile-menu';

export default function ProjectPracticeNavDropdown({
  pathname,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  tone = 'light',
  isNavbarWhite = true,
}: ProjectPracticeNavDropdownProps) {
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  const desktopRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const menuId = useId();
  const isDark = tone === 'dark';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Monitor inner view panel to shift custom visual scroll capsule
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const totalScrollable = scrollHeight - clientHeight;
    if (totalScrollable <= 0) {
      setScrollPercentage(0);
    } else {
      setScrollPercentage(scrollTop / totalScrollable);
    }
  };

  useEffect(() => {
    if (!isDesktopOpen && !isMobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isMobileTrigger =
        target instanceof Element && Boolean(target.closest('[data-project-nav-trigger]'));

      if (isMobileTrigger) return;
      if (desktopRef.current?.contains(target)) return;
      if (mobilePanelRef.current?.contains(target)) return;

      setIsDesktopOpen(false);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDesktopOpen(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !isMobileMenuOpen || !mobilePanelRef.current) return;

      const focusableElements = Array.from(
        mobilePanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.getAttribute('aria-hidden') && element.offsetParent !== null);

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!mobilePanelRef.current.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDesktopOpen, isMobileMenuOpen, setIsMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);

      const previousElement = previouslyFocusedElementRef.current;
      previouslyFocusedElementRef.current = null;

      if (previousElement && document.contains(previousElement)) {
        previousElement.focus({ preventScroll: true });
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Reset indicator when dropdown closes/opens
  useEffect(() => {
    if (isDesktopOpen) {
      setTimeout(handleScroll, 50);
    }
  }, [isDesktopOpen]);

  const closeMenus = () => {
    setIsDesktopOpen(false);
    setIsMobileMenuOpen(false);
  };

  const desktopTriggerClass = isDark
    ? 'text-[11pt] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-black'
    : `text-[11pt] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 ${
        isNavbarWhite ? 'text-black hover:text-blue-400' : 'text-gray-700 hover:text-blue-400'
      }`;

  const desktopMenuClass = isDark
    ? 'border-white/10 bg-black/95 text-white shadow-2xl'
    : 'border-neutral-200 bg-white/95 text-gray-900 shadow-2xl';

  const desktopHeadingClass = isDark ? 'text-white/35' : 'text-gray-400';
  const desktopDisabledClass = isDark ? 'text-white/35' : 'text-gray-400/80';
  const desktopStatusClass = isDark ? 'text-white/30' : 'text-gray-400/70';
  const desktopDividerClass = isDark ? 'border-white/10' : 'border-neutral-200/80';

  const desktopLinkClass = (isActive: boolean) =>
    isDark
      ? `relative flex min-h-[46px] items-center rounded-lg px-4 text-[11pt] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          isActive ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
        }`
      : `relative flex min-h-[46px] items-center rounded-lg px-4 text-[11pt] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-neutral-100 hover:text-blue-600'
        }`;

  const activeIndicatorClass = isDark ? 'bg-white/80' : 'bg-blue-400';

  const mobilePanel = (
    <AnimatePresence mode="wait">
      {isMobileMenuOpen && (
        <motion.div
          id={PROJECT_NAV_MOBILE_MENU_ID}
          key="mobile-menu"
          ref={mobilePanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Project practice navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] h-[100dvh] overflow-y-auto overscroll-contain bg-black/95 text-white backdrop-blur-md lg:hidden"
        >
          <div className="flex min-h-[100dvh] flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
            <div className="flex min-h-[44px] items-center justify-between border-b border-white/10 pb-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Work Navigation
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenus}
                className="min-h-[44px] px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Close project navigation"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col space-y-7 py-8" aria-label="Project practice navigation">
              <div className="flex flex-col space-y-3">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Site
                </p>
                <Link
                  href="/"
                  onClick={closeMenus}
                  className="flex min-h-[44px] items-center text-[11pt] text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  onClick={closeMenus}
                  className="flex min-h-[44px] items-center text-[11pt] text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  About
                </Link>
                <Link
                  href="/#contact"
                  onClick={closeMenus}
                  className="flex min-h-[44px] items-center text-[11pt] text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Contact
                </Link>
              </div>
              {topLevelProjectNavGroups.map((group) => (
                <div key={group.label} className="flex flex-col space-y-3">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                    {group.label}
                  </p>

                  {group.items.map((item) => {
                    const isActive = Boolean(item.href && !item.external && pathname.startsWith(item.href));

                    if (!item.href || item.disabled) {
                      return (
                        <span
                          key={item.label}
                          className="flex min-h-[44px] cursor-default flex-col justify-center text-[11pt] text-gray-500"
                        >
                          {item.label}
                          {item.status && (
                            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-gray-600">
                              {item.status}
                            </span>
                          )}
                        </span>
                      );
                    }

                    if (item.external) {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMenus}
                          className="flex min-h-[44px] items-center text-[11pt] text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          {item.label}
                          <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em] text-gray-500">
                            External
                          </span>
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        className={`flex min-h-[44px] items-center text-[11pt] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                          isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {item.label}
                        {item.status && (
                          <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em] text-gray-500">
                            {item.status}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Constants mapping the explicit pill dimension layout
  const thumbHeightPercent = 30; 
  const maxTopPercent = 100 - thumbHeightPercent;
  const currentTopPosition = scrollPercentage * maxTopPercent;

  return (
    <>
      <div className="relative hidden lg:flex lg:items-center">
        <Link
          href="/#about"
          className={`${desktopTriggerClass} inline-flex min-h-[44px] items-center rounded-md px-2 py-1`}
        >
          About
        </Link>
        <Link
          href="/#contact"
          className={`${desktopTriggerClass} inline-flex min-h-[44px] items-center rounded-md px-2 py-1`}
        >
          Contact
        </Link>
        <div ref={desktopRef} className="relative">
        <button
          type="button"
          onClick={() => setIsDesktopOpen((open) => !open)}
          className={`
            ${desktopTriggerClass}
            inline-flex
            min-h-[44px]
            items-center
            gap-1.5
            rounded-md
            px-2
            py-1
          `}
          aria-expanded={isDesktopOpen}
          aria-controls={menuId}
        >
          <span>Projects</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-200 ${
              isDesktopOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isDesktopOpen && (
            <motion.div
              id={menuId}
              key="desktop-project-nav"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={`
                absolute right-0 top-full z-50 mt-2 
                h-[26rem] w-[min(94vw,38rem)] 
                rounded-lg border backdrop-blur-md flex overflow-hidden
                ${desktopMenuClass}
              `}
            >
              {/* Main Scrollable View Panel */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto overscroll-contain px-7 py-6 pr-2 h-full"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <nav
                  className="flex flex-col"
                  aria-label="Project practice navigation"
                >
                  {topLevelProjectNavGroups.map((group, groupIndex) => (
                    <div
                      key={group.label}
                      className={`min-w-0 py-5 first:pt-1 last:pb-1 ${
                        groupIndex > 0 ? `border-t ${desktopDividerClass}` : ''
                      }`}
                    >
                      <p
                        className={`mb-3 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] ${desktopHeadingClass}`}
                      >
                        {group.label}
                      </p>

                      <div className="flex flex-col gap-1">
                        {group.items.map((item) => {
                          const isActive = Boolean(item.href && !item.external && pathname.startsWith(item.href));

                          if (!item.href || item.disabled) {
                            return (
                              <span
                                key={item.label}
                                className={`flex min-h-[46px] cursor-default flex-col justify-center rounded-lg px-4 text-[11pt] ${desktopDisabledClass}`}
                              >
                                {item.label}
                                {item.status && (
                                  <span className={`mt-1 font-mono text-[9px] uppercase tracking-[0.12em] ${desktopStatusClass}`}>
                                    {item.status}
                                  </span>
                                )}
                              </span>
                            );
                          }

                          if (item.external) {
                            return (
                              <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenus}
                                className={desktopLinkClass(false)}
                              >
                                {item.label}
                                <span className={`ml-2 font-mono text-[9px] uppercase tracking-[0.12em] ${desktopStatusClass}`}>
                                  External
                                </span>
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMenus}
                              className={desktopLinkClass(isActive)}
                            >
                              {isActive && (
                                <span
                                  aria-hidden="true"
                                  className={`absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${activeIndicatorClass}`}
                                />
                              )}
                              {item.label}
                              {item.status && (
                                <span className={`ml-2 font-mono text-[9px] uppercase tracking-[0.12em] ${desktopStatusClass}`}>
                                  {item.status}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Dynamic Visual Scrollbar Track */}
              <div className="w-1.5 my-4 mr-2 flex flex-col relative h-[calc(100%-2rem)]">
                <div 
                  className={`w-full h-full rounded-full transition-colors ${
                    isDark ? 'bg-white/5' : 'bg-neutral-200/50'
                  }`}
                >
                  {/* Dynamic absolute handle Capsule */}
                  <div 
                    className={`w-full rounded-full absolute left-0 transition-colors duration-150 ${
                      isDark ? 'bg-white/30' : 'bg-neutral-400'
                    }`}
                    style={{ 
                      height: `${thumbHeightPercent}%`,
                      top: `${currentTopPosition}%`
                    }}
                  />
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

      {isMounted ? createPortal(mobilePanel, document.body) : null}
    </>
  );
}