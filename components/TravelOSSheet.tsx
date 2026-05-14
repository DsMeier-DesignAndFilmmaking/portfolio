'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

interface TravelOSSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Moment Data ──────────────────────────────────────────────────────────────
type MomentId = 'arrival' | 'rainy' | 'connection';

interface Moment {
  id: MomentId;
  timeLabel: string;
  icon: 'luggage' | 'rain' | 'social';
  headline: string;
  tagline: string;
  body: string;
  actor: 'fieldnotes' | 'hade';
  techTooltip: string;
  hadeSpark: boolean;
  offlineNote: string;
}

const moments: Moment[] = [
  {
    id: 'arrival',
    timeLabel: 'Morning',
    icon: 'luggage',
    headline: 'The Arrival',
    tagline: 'You land. Your itinerary is already waiting.',
    body: 'Before you even clear customs, Field Notes has your transit options, local essentials, and your first hour mapped — cached and ready even without signal. No Googling. No overwhelm. Just clarity.',
    actor: 'fieldnotes',
    techTooltip: 'logic: arrival_context_init · transit_layer.query(gps)',
    hadeSpark: false,
    offlineNote: 'Field Notes Vault active — all cached essentials available.',
  },
  {
    id: 'rainy',
    timeLabel: 'Afternoon',
    icon: 'rain',
    headline: 'The Rainy Afternoon',
    tagline: 'It starts raining. HADE suggests a cozy café two minutes away.',
    body: 'HADE reads the weather shift, cross-references your taste profile and the time of day, and surfaces one confident suggestion — not a list of ten. The right answer, not every answer.',
    actor: 'hade',
    techTooltip: 'logic: env_pivot_rain_active · weather.confidence=0.94',
    hadeSpark: true,
    offlineNote: 'HADE paused. Field Notes showing nearby verified spots.',
  },
  {
    id: 'connection',
    timeLabel: 'Evening',
    icon: 'social',
    headline: 'The Connection',
    tagline: 'A friend is two streets away. You get a quiet pulse.',
    body: 'When your social graph lights up, HADE surfaces it gently. Verified, trusted, and timely — without the noise of a notification barrage. Spontaneity, with a safety net.',
    actor: 'hade',
    techTooltip: 'logic: social_pulse · trust_layer.score=0.91 · proximity<400m',
    hadeSpark: true,
    offlineNote: 'Social signals unavailable. Field Notes showing local essentials.',
  },
];

// ─── Illustrative SVG Icons ───────────────────────────────────────────────────
function LuggageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a3.375 3.375 0 00-3.375 3.375v1.875M15.75 18.75H8.25m7.5 0H18M8.25 18.75H6M15.75 7.5H8.25M6 7.5h-.75A2.25 2.25 0 003 9.75v9A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-9A2.25 2.25 0 0018.75 7.5H18" />
    </svg>
  );
}

function RainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5l-.75 2.25m3.75-2.25l-.75 2.25m3.75-2.25l-.75 2.25" />
    </svg>
  );
}

function SocialIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

function MomentIcon({ icon, className }: { icon: Moment['icon']; className?: string }) {
  if (icon === 'luggage') return <LuggageIcon className={className} />;
  if (icon === 'rain') return <RainIcon className={className} />;
  return <SocialIcon className={className} />;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TravelOSSheet({ isOpen, onClose }: TravelOSSheetProps) {
  const [isAirplaneMode, setIsAirplaneMode] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<MomentId>('arrival');
  const [hoveredMoment, setHoveredMoment] = useState<MomentId | null>(null);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const activeMoment = moments.find((m) => m.id === selectedMoment)!;
  const hadeSpark = activeMoment.hadeSpark && !isAirplaneMode;
  const entranceTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };
  const quickTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    if (!isOpen) {
      setIsAirplaneMode(false);
      setSelectedMoment('arrival');
      setHoveredMoment(null);
      setIsSpecsOpen(false);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] overflow-hidden" role="dialog" aria-modal="true" aria-label="Your Travel Companion — HADE × Field Notes">

          {/* Backdrop */}
          <motion.button
            aria-label="Close"
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={quickTransition}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.section
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.985 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={entranceTransition}
            className="absolute inset-x-0 bottom-0 flex h-[90dvh] max-h-[90vh] min-h-0 flex-col overflow-hidden rounded-t-[2rem] text-white shadow-[0_-32px_120px_rgba(0,0,0,0.7)] transform-gpu will-change-transform"
            style={{
              backgroundColor: '#0a0b12',
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px',
            }}
          >
            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">

              {/* ── Sticky Header ── */}
              <div className="sticky top-0 z-20 shrink-0 border-b border-white/[0.07] px-6 py-5 backdrop-blur-xl md:px-10"
                style={{ backgroundColor: 'rgba(10,11,18,0.94)' }}>
                <div className="mx-auto flex w-full max-w-5xl items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.38em] text-sky-400/50">HADE × Field Notes · Travel OS</p>
                    <h2 className="mt-1 text-xl font-semibold text-white md:text-2xl">Your Travel Companion, Explained</h2>
                    <p className="mt-0.5 text-sm text-zinc-400">
                      HADE brings the spark. Field Notes is always your foundation.
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-3">
                    {/* Airplane Mode Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsAirplaneMode((p) => !p)}
                      className={`flex min-w-[150px] items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 ${
                        isAirplaneMode
                          ? 'border-amber-400/40 bg-amber-400/10 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                          : 'border-white/12 bg-white/[0.04] text-zinc-300 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                      </svg>
                      {isAirplaneMode ? 'Airplane Mode On' : 'No Signal?'}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-full border border-white/12 p-2 text-zinc-500 transition-[border-color,color,transform] duration-200 ease-out hover:border-white/25 hover:text-white active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mx-auto w-full max-w-5xl px-6 pb-10 pt-8 md:px-10">

                {/* ── HADE Spark Visualizer ── */}
                <div className="mb-8 flex items-center gap-5">
                  {/* Pulsing orb */}
                  <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-sky-400/10"
                      animate={
                        prefersReducedMotion
                          ? { scale: hadeSpark ? 1 : 0.6, opacity: hadeSpark ? 0.28 : 0 }
                          : hadeSpark ? { scale: [1, 1.6, 1], opacity: [0.2, 0.5, 0.2] } : { scale: 0.6, opacity: 0 }
                      }
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute h-8 w-8 rounded-full bg-sky-400/20"
                      animate={
                        prefersReducedMotion
                          ? { scale: hadeSpark ? 1 : 0.5, opacity: hadeSpark ? 0.45 : 0 }
                          : hadeSpark ? { scale: [1, 1.35, 1], opacity: [0.3, 0.7, 0.3] } : { scale: 0.5, opacity: 0 }
                      }
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
                    />
                    <motion.div
                      className="relative z-10 h-3.5 w-3.5 rounded-full"
                      animate={hadeSpark
                        ? { backgroundColor: '#7dd3fc', boxShadow: '0 0 20px rgba(56,189,248,0.9)' }
                        : { backgroundColor: '#334155', boxShadow: '0 0 0px rgba(56,189,248,0)' }
                      }
                      transition={quickTransition}
                    />
                  </div>

                  <div className="flex-1">
                    <motion.p
                      animate={{ opacity: hadeSpark ? 1 : 0.3, color: hadeSpark ? '#bae6fd' : '#64748b' }}
                      transition={quickTransition}
                      className="text-sm font-medium"
                    >
                      {hadeSpark ? 'HADE Active — Personal Concierge Online' : 'HADE Standby'}
                    </motion.p>
                    <motion.p
                      animate={{ opacity: hadeSpark ? 0.55 : 0.2 }}
                      transition={quickTransition}
                      className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-sky-400"
                    >
                      {hadeSpark ? activeMoment.techTooltip : 'awaiting signal ···'}
                    </motion.p>
                  </div>

                  {/* Value layer pills */}
                  <div className="hidden items-center gap-2 md:flex">
                    {[
                      { label: 'The Knowledge Base', sub: 'Maps · Transit · Verified Spots' },
                      { label: 'The Personal Concierge', sub: 'Weather · Vibe · Friends' },
                      { label: 'Your Companion Apps', sub: 'Field Notes · HADE' },
                    ].map((layer) => (
                      <div
                        key={layer.label}
                        className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-center"
                      >
                        <p className="text-[10px] font-medium text-white/60">{layer.label}</p>
                        <p className="text-[9px] text-zinc-600">{layer.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Three Moments Timeline ── */}
                <div className="relative mb-4">
                  {/* Connector line */}
                  <div
                    className="pointer-events-none absolute left-[16%] right-[16%] top-[2.1rem] h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)' }}
                  />

                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    {moments.map((moment) => {
                      const isSelected = selectedMoment === moment.id;
                      const isHovered = hoveredMoment === moment.id;
                      return (
                        <button
                          key={moment.id}
                          type="button"
                          onClick={() => setSelectedMoment(moment.id)}
                          onMouseEnter={() => setHoveredMoment(moment.id)}
                          onMouseLeave={() => setHoveredMoment(null)}
                          className={`relative rounded-2xl border p-4 text-left transition-[background-color,border-color,box-shadow,transform,opacity] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-5 ${
                            isSelected
                              ? 'border-white/15 bg-white/[0.06] shadow-[0_0_40px_rgba(255,255,255,0.03)]'
                              : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                          }`}
                        >
                          {/* Time dot + label */}
                          <div className="mb-4 flex items-center gap-2">
                            <motion.div
                              animate={isSelected
                                ? { backgroundColor: '#7dd3fc', boxShadow: '0 0 10px rgba(56,189,248,0.7)' }
                                : { backgroundColor: 'rgba(255,255,255,0.15)', boxShadow: '0 0 0px rgba(56,189,248,0)' }
                              }
                              transition={quickTransition}
                              className="h-2 w-2 rounded-full flex-shrink-0"
                            />
                            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                              {moment.timeLabel}
                            </p>
                          </div>

                          {/* Illustrative icon */}
                          <MomentIcon
                            icon={moment.icon}
                            className={`mb-3 h-7 w-7 transition-colors duration-200 ease-out motion-reduce:transition-none md:h-8 md:w-8 ${
                              isSelected
                                ? moment.actor === 'hade' ? 'text-sky-300' : 'text-lime-300'
                                : 'text-zinc-600'
                            }`}
                          />

                          {/* Text */}
                          <h3 className={`mb-1 text-sm font-semibold transition-colors duration-200 ease-out motion-reduce:transition-none ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
                            {moment.headline}
                          </h3>
                          <p className={`text-xs leading-relaxed transition-colors duration-200 ease-out motion-reduce:transition-none ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            {moment.tagline}
                          </p>

                          {/* Actor badge (selected only) */}
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                key="badge"
                                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 3 }}
                                transition={quickTransition}
                                className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 ${
                                  moment.actor === 'hade'
                                    ? 'border-sky-400/25 bg-sky-400/8 text-sky-300'
                                    : 'border-lime-400/25 bg-lime-400/8 text-lime-300'
                                }`}
                              >
                                <div className={`h-1.5 w-1.5 rounded-full ${moment.actor === 'hade' ? 'bg-sky-400' : 'bg-lime-400'}`} />
                                <span className="font-mono text-[8px] uppercase tracking-[0.18em]">
                                  {moment.actor === 'hade' ? 'HADE Spark' : 'Field Notes'}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Ghost tech tooltip on hover (unselected) */}
                          <div className="mt-2 min-h-[26px]">
                            <motion.div
                              animate={{ opacity: isHovered && !isSelected ? 1 : 0 }}
                              transition={quickTransition}
                              className="rounded-md border border-white/[0.06] bg-black/30 px-2 py-1"
                              aria-hidden={!isHovered || isSelected}
                            >
                              <p className="font-mono text-[8px] text-zinc-600">{moment.techTooltip}</p>
                            </motion.div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Selected Moment Detail ── */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMoment + String(isAirplaneMode)}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
                    transition={quickTransition}
                    className="mb-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 md:p-6"
                  >
                    {isAirplaneMode ? (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 rounded-xl bg-amber-400/12 p-3">
                          <svg className="h-5 w-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-amber-200">No signal? No problem.</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                            Your Field Notes{' '}
                            <span className="font-medium text-lime-300">Tactical Vault</span>{' '}
                            has everything you need to navigate safely — maps, essentials, and verified spots — all cached and ready offline.
                          </p>
                          <p className="mt-2.5 font-mono text-[9px] text-zinc-600">{activeMoment.offlineNote}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 rounded-xl p-3 ${
                          activeMoment.actor === 'hade' ? 'bg-sky-400/12' : 'bg-lime-400/12'
                        }`}>
                          <MomentIcon
                            icon={activeMoment.icon}
                            className={`h-5 w-5 ${activeMoment.actor === 'hade' ? 'text-sky-300' : 'text-lime-300'}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white">{activeMoment.headline}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{activeMoment.body}</p>
                          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/20 px-3 py-1">
                            <span className="font-mono text-[9px] text-zinc-600">{activeMoment.techTooltip}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* ── Field Notes Foundation Bar ── */}
                <motion.div
                  animate={isAirplaneMode
                    ? {
                        borderColor: 'rgba(163,230,53,0.35)',
                        boxShadow: '0 0 48px rgba(163,230,53,0.12)',
                        backgroundColor: 'rgba(163,230,53,0.05)',
                      }
                    : {
                        borderColor: 'rgba(255,255,255,0.07)',
                        boxShadow: '0 0 0px rgba(163,230,53,0)',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                      }
                  }
                  transition={quickTransition}
                  className="mb-6 rounded-2xl border p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                        Your Safety Net · Always On
                      </p>
                      <motion.h3
                        animate={{ color: isAirplaneMode ? '#bef264' : '#f4f4f5' }}
                        transition={quickTransition}
                        className="mt-1 text-sm font-semibold"
                      >
                        Field Notes Foundation
                      </motion.h3>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {isAirplaneMode
                          ? 'Tactical Vault active — offline essentials ready.'
                          : 'Your plan, maps, and essentials — synced and cached.'}
                      </p>
                    </div>
                    <motion.div
                      animate={isAirplaneMode
                        ? prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: [1, 1.08, 1], opacity: 1 }
                        : { scale: 1, opacity: 0.45 }
                      }
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.8, repeat: isAirplaneMode ? Infinity : 0, ease: 'easeInOut' }}
                      className={`flex-shrink-0 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] ${
                        isAirplaneMode
                          ? 'border-lime-400/35 bg-lime-400/10 text-lime-300'
                          : 'border-white/[0.08] text-zinc-600'
                      }`}
                    >
                      {isAirplaneMode ? 'Vault Active' : 'Live Sync'}
                    </motion.div>
                  </div>
                </motion.div>

                {/* ── Technical Specs Accordion ── */}
                <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
                  <button
                    type="button"
                    onClick={() => setIsSpecsOpen((p) => !p)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left transition-[background-color] duration-200 ease-out hover:bg-white/[0.025] motion-reduce:transition-none"
                  >
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">For Technical Reviewers</p>
                      <p className="mt-0.5 text-sm font-medium text-zinc-400">View Architecture & Unified Schema</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isSpecsOpen ? 180 : 0 }}
                      transition={quickTransition}
                    >
                      <ChevronDown className="h-4 w-4 text-zinc-600" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isSpecsOpen && (
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                        transition={quickTransition}
                        className="overflow-hidden border-t border-white/[0.07]"
                      >
                        <div className="space-y-4 p-5">
                          {/* Layer mapping */}
                          <div>
                            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.26em] text-zinc-600">Human → Technical Layer Map</p>
                            <div className="space-y-2">
                              {[
                                {
                                  human: 'The Knowledge Base',
                                  tech: 'Infrastructure Layer',
                                  detail: 'Supabase/PostGIS · Redis/Celery · IndexedDB Vault',
                                },
                                {
                                  human: 'The Personal Concierge',
                                  tech: 'Intelligence Middleware',
                                  detail: 'Context Engine · Signal Aggregator · Trust Layer · Scoring Logic',
                                },
                                {
                                  human: 'Your Companion Apps',
                                  tech: 'Interface Layer',
                                  detail: 'Field Notes PWA · HADE Native · SDK Clients',
                                },
                              ].map((layer) => (
                                <div
                                  key={layer.tech}
                                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-white/80">{layer.human}</p>
                                    <p className="mt-0.5 font-mono text-[9px] text-zinc-600">
                                      {layer.tech} · {layer.detail}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Unified Schema */}
                          <div>
                            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.26em] text-zinc-600">Unified Schema · TravelContext.h</p>
                            <pre
                              className="overflow-x-auto rounded-xl border border-white/[0.07] bg-black/40 p-4 text-[10px] leading-5"
                              style={{ fontFamily: '"JetBrains Mono", monospace' }}
                            >
                              <code className="text-zinc-600">{`/** @module TravelContext.h
 *  Compiled by Dan Meier / Solo Founder
 *  Shared contract: HADE ↔ Field Notes
 */\n\n`}</code>
                              <code className="text-cyan-200/60">{`interface TravelContext {
  identity: "Anonymous" | "Verified";
  location: { lat: number; lng: number; altitude: number };
  environment: {
    weather: string;
    uv_index: number;
    time_bucket: "morning" | "noon" | "night";
  };
  // null → Environmental Pivot logic
  social_graph: string[] | null;
}`}</code>
                            </pre>
                          </div>

                          <p className="text-right font-mono text-[9px] text-zinc-700">
                            Compiled by Dan Meier // Solo Founder Architecture
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
