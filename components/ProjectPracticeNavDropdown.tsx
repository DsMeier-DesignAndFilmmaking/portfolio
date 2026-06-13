'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { topLevelProjectNavGroups } from '@/utils/projectNavigation';

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
  const desktopRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const isDark = tone === 'dark';

  useEffect(() => {
    if (!isDesktopOpen && !isMobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isMobileTrigger = target instanceof Element && Boolean(target.closest('[data-project-nav-trigger]'));

      if (isMobileTrigger) return;
      if (desktopRef.current?.contains(target)) return;

      setIsDesktopOpen(false);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsDesktopOpen(false);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
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
  const desktopLinkClass = (isActive: boolean) =>
    isDark
      ? `relative min-h-[34px] text-[11pt] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
          isActive ? 'text-white' : 'text-white/65 hover:text-white'
        }`
      : `relative min-h-[34px] text-[11pt] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          isActive ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'
        }`;
  const activeIndicatorClass = isDark ? 'bg-white/80' : 'bg-blue-400';

  return (
    <>
      <div
        ref={desktopRef}
        className="relative hidden lg:block px-6 py-4"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsDesktopOpen(false);
          }
        }}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isDesktopOpen}
          aria-controls={menuId}
          className={desktopTriggerClass}
          onClick={() => setIsDesktopOpen((open) => !open)}
        >
          Work
          <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.12em]" aria-hidden="true">
            {isDesktopOpen ? 'Close' : 'Menu'}
          </span>
        </button>

        <AnimatePresence>
          {isDesktopOpen && (
            <motion.div
              id={menuId}
              role="menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className={`absolute right-0 top-full z-50 mt-2 max-h-[min(72vh,36rem)] w-[min(88vw,46rem)] overflow-y-auto rounded-lg border p-5 backdrop-blur-md ${desktopMenuClass}`}
            >
              <nav className="grid gap-5 md:grid-cols-[1.3fr_1fr_1fr]" aria-label="Project practice navigation">
                {topLevelProjectNavGroups.map((group) => (
                  <div key={group.label} className="flex flex-col gap-2">
                    <p className={`font-mono text-[9px] font-semibold uppercase tracking-[0.18em] ${desktopHeadingClass}`}>
                      {group.label}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {group.items.map((item) => {
                        const isActive = Boolean(item.href && !item.external && pathname.startsWith(item.href));

                        if (!item.href || item.disabled) {
                          return (
                            <span key={item.label} className={`cursor-default text-[11pt] ${desktopDisabledClass}`}>
                              {item.label}
                              {item.status && (
                                <span className={`block font-mono text-[9px] uppercase tracking-[0.12em] ${desktopStatusClass}`}>
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
                              role="menuitem"
                              className={desktopLinkClass(false)}
                              onClick={closeMenus}
                            >
                              {item.label}
                              <span className={`ml-1 font-mono text-[9px] uppercase tracking-[0.12em] ${desktopStatusClass}`}>
                                External
                              </span>
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className={desktopLinkClass(isActive)}
                            onClick={closeMenus}
                          >
                            {item.label}
                            {isActive && (
                              <span className={`absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full ${activeIndicatorClass}`} />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            id={PROJECT_NAV_MOBILE_MENU_ID}
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 mt-2 max-h-[min(78vh,38rem)] overflow-y-auto rounded-lg border border-white/10 bg-black/95 mx-6 shadow-lg backdrop-blur-md"
          >
            <nav className="flex flex-col space-y-5 p-4 px-6" aria-label="Project practice navigation">
              {topLevelProjectNavGroups.map((group) => (
                <div key={group.label} className="flex flex-col space-y-3">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-500">{group.label}</p>
                  {group.items.map((item) => {
                    const isActive = Boolean(item.href && !item.external && pathname.startsWith(item.href));

                    if (!item.href || item.disabled) {
                      return (
                        <span key={item.label} className="cursor-default text-[11pt] text-gray-500">
                          {item.label}
                          {item.status && (
                            <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-gray-600">
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
                          className="min-h-[44px] text-[11pt] text-gray-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          {item.label}
                          <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.12em] text-gray-500">External</span>
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        className={`min-h-[44px] text-[11pt] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                          isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
