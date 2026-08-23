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
// ─────────────────────────────────────────────────────────────────────────────

const HEADER_HEIGHT_FALLBACK = 68;

const EXPERIENCES = [
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
  outerClassName = 'container mx-auto w-full px-6 md:px-8',
  innerClassName = 'max-w-3xl',
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

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelId = useId();

  const [isMounted, setIsMounted] = useState(false);
  const [triggerRect, setTriggerRect] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeIndex = Math.max(
    0,
    EXPERIENCES.findIndex((exp) => current === normalize(exp.href)),
  );

  const closePicker = useCallback((returnFocus = false) => {
    setIsPickerOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const openPicker = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setTriggerRect({ top: rect.bottom, left: rect.left, width: rect.width });
    setIsPickerOpen(true);
  }, []);

  const focusItem = useCallback((index: number) => {
    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;
    const wrapped = (index + items.length) % items.length;
    items[wrapped]?.focus();
  }, []);

  useEffect(() => {
    if (!isPickerOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
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
    window.addEventListener('resize', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isPickerOpen, closePicker]);

  useEffect(() => {
    setIsPickerOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(([entry]) => setRailHeight(entry.contentRect.height));
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

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
      {isStuck && <div aria-hidden="true" style={{ height: railHeight }} />}
      <div
        ref={railRef}
        className={`z-40 w-full transition-[background-color,border-color] duration-700 ease-out motion-reduce:transition-none ${
          isDark
            ? 'border-b border-white/10 bg-neutral-950'
            : 'border-b border-neutral-200 bg-white'
        } ${
          isStuck
            ? `fixed inset-x-0 w-full ${
                isDark ? 'bg-neutral-950/90' : 'bg-white/95 backdrop-blur-md'
              }`
            : ''
        }`}
        style={
          isStuck
            ? {
                top: 'var(--project-header-height)',
                transform: 'translateY(var(--project-header-shift))',
              }
            : undefined
        }
      >
        <div className={outerClassName}>
          <div className={innerClassName}>
            <nav aria-label="Case Study: The Ranch at Rock Creek sections">
              {/* ─── Below `sm`: disclosure picker ───────────────────────── */}
              <div ref={pickerRef} className="relative z-30 sm:hidden">
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => (isPickerOpen ? setIsPickerOpen(false) : openPicker())}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                      event.preventDefault();
                      openPicker();
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
                                        setIsPickerOpen(false);
                                      }
                                    }}
                                    className={`flex min-h-[44px] items-center justify-between gap-3 px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rockcreek-600 ${
                                      isActive
                                        ? isDark
                                          ? 'bg-white/10 font-bold text-white'
                                          : 'bg-neutral-100 font-bold text-neutral-950'
                                        : isDark
                                        ? 'text-neutral-300 hover:bg-white/5 hover:text-white'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                                    }`}
                                  >
                                    <span>{exp.label}</span>
                                    {isActive && (
                                      <span
                                        className={`h-1.5 w-1.5 rounded-full ${
                                          isDark ? 'bg-white' : 'bg-neutral-950'
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

              {/* ─── `sm:` and up: standard desktop tab rail ────────────────────────── */}
              <ul
                ref={scrollerRef}
                className="no-scrollbar hidden min-w-full flex-nowrap items-center gap-8 overflow-x-auto whitespace-nowrap sm:flex"
              >
                {EXPERIENCES.map((exp) => {
                  const isActive = current === normalize(exp.href);
                  return (
                    <li key={exp.href} className="flex-shrink-0">
                      <Link
                        ref={isActive ? activeRef : undefined}
                        href={exp.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`relative inline-flex items-center py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 ${
                          isActive
                            ? isDark
                              ? 'font-bold text-white'
                              : 'font-bold text-neutral-950'
                            : isDark
                            ? 'text-neutral-400 hover:text-white'
                            : 'text-neutral-500 hover:text-neutral-950'
                        }`}
                      >
                        {exp.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className={`absolute inset-x-0 bottom-0 h-0.5 ${
                              isDark ? 'bg-white' : 'bg-neutral-950'
                            }`}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
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