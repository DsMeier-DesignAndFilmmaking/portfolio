'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Annotation {
  label: string;
  text: string;
  side?: 'left' | 'right';
}

interface Stage {
  id: string;
  step: string;
  title: string;
  timeRange: string;
  description: string;
  dotColor: string;
  accentColor: string;
  badgeLabel: string;
  annotation?: Annotation;
}

const preventWidow = (text: string) => {
  const words = text.trim().split(" ");
  if (words.length < 3) return text;
  return [...words.slice(0, -2), words.slice(-2).join("\u00A0")].join(" ");
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const stages: Stage[] = [
  {
    id: 'observe',
    step: '01',
    title: 'Passive Observation',
    timeRange: '0 – 30 min',
    description:
      'HADE reads movement patterns, dwell time, and ambient signals — pace, noise level, crowd density — without surfacing anything to the traveler. Building a baseline before it speaks.',
    dotColor: '#94a3b8',
    accentColor: 'rgba(148,163,184,0.15)',
    badgeLabel: 'OBSERVE',
    annotation: {
      label: 'UGC signal',
      text: '"quiet street, no crowds"',
      side: 'right',
    },
  },
  {
    id: 'suggest',
    step: '02',
    title: 'First Suggestion',
    timeRange: '30 – 60 min',
    description:
      'Confidence threshold crossed. HADE issues one high-signal suggestion — not a list, not a feed. A single contextual nudge derived from synthesized local knowledge and the traveler\'s observed rhythm.',
    dotColor: '#FFDD00',
    accentColor: 'rgba(255,221,0,0.12)',
    badgeLabel: 'SURFACE',
    annotation: {
      label: 'System output',
      text: '"Campo dei Frari — 8 min walk, opens in 20"',
      side: 'left',
    },
  },
  {
    id: 'adapt',
    step: '03',
    title: 'Full Adaptation',
    timeRange: '60 – 120 min',
    description:
      'The model has enough session context to anticipate. Suggestions become predictive rather than reactive — calibrated to tempo, stated interests, and implicit signals like a repeated pause near a museum entrance.',
    dotColor: '#818cf8',
    accentColor: 'rgba(129,140,248,0.12)',
    badgeLabel: 'ADAPT',
    annotation: {
      label: 'Implicit signal',
      text: '"3× pause near art&nbsp;venues"',
      side: 'right',
    },
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PulsingDot({ color }: { color: string }) {
  return (
    <div className="relative flex items-center justify-center w-5 h-5">
      <motion.div
        className="absolute rounded-full"
        style={{ backgroundColor: color, width: 20, height: 20, opacity: 0.15 }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0, 0.15] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="relative rounded-full z-10"
        style={{ width: 10, height: 10, backgroundColor: color }}
      />
    </div>
  );
}

function ConnectorLine({ index, total }: { index: number; total: number }) {
  if (index >= total - 1) return null;
  return (
    <div className="relative flex flex-col items-center" style={{ width: 20 }}>
      <motion.div
        className="w-px"
        style={{
          height: 64,
          background: 'linear-gradient(to bottom, rgba(148,163,184,0.4), rgba(148,163,184,0.08))',
        }}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      />
      {/* Animated travelling dot */}
      <motion.div
        className="absolute rounded-full bg-slate-400"
        style={{ width: 3, height: 3, top: 0 }}
        animate={{ top: [0, 60, 0], opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
      />
    </div>
  );
}

function AnnotationBubble({ annotation }: { annotation: Annotation }) {
  return (
    <motion.div
      className="hidden md:flex flex-col gap-0.5 max-w-[180px]"
      initial={{ opacity: 0, x: annotation.side === 'left' ? -12 : 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">
        {annotation.label}
      </span>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
        <span className="text-[11px] font-mono text-slate-300 italic">{annotation.text}</span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SessionTimeline() {
  return (
<section
  className="relative w-full overflow-hidden"
  style={{ backgroundColor: '#0a0a0b' }}
  aria-label="Session Timeline"
>
  {/* Noise */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.025]"
    style={{
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      backgroundSize: '200px 200px',
    }}
  />

<div className="relative container mx-auto px-6 py-24 md:py-32">

        {/* ── Section header ── */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase font-mono mb-4">
            Session Arc // 0–120 min
          </p>
          <h2
            className="text-4xl md:text-5xl text-white leading-tight"
            style={{ fontFamily: "'tiempos-headline-regular', serif" }}
          >
            How the System Earns<br className="hidden md:block" /> the Right to Speak
          </h2>
          <p className="mt-5 text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
            HADE withholds output until it has enough signal to be useful. The session arc defines
            when that threshold is crossed — and what changes after it is.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="flex flex-col gap-0">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <motion.div
                className="relative grid items-start gap-6 md:gap-10"
                style={{
                  gridTemplateColumns: 'auto 1fr auto',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Col A: dot */}
                <div className="flex flex-col items-center pt-1">
                  <PulsingDot color={stage.dotColor} />
                </div>

                {/* Col B: content card */}
                <div
                  className="rounded-2xl p-6 md:p-8 border border-white/[0.06]"
                  style={{ backgroundColor: stage.accentColor }}
                >
                  {/* Top row: step + badge + time */}
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-500 tracking-[0.18em]">
                      {stage.step} //
                    </span>
                    <span
                      className="text-[9px] font-mono tracking-[0.2em] px-2 py-0.5 rounded-full border"
                      style={{
                        color: stage.dotColor,
                        borderColor: stage.dotColor + '40',
                        backgroundColor: stage.dotColor + '12',
                      }}
                    >
                      {stage.badgeLabel}
                    </span>
                    <span className="ml-auto text-[10px] font-mono text-slate-600 tracking-[0.15em]">
                      {stage.timeRange}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-white text-xl md:text-2xl mb-3 leading-snug"
                    style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                  >
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {preventWidow(stage.description)}
                  </p>
                </div>

                {/* Col C: annotation bubble (desktop only) */}
                <div className="hidden md:flex items-start pt-1 w-[180px]">
                  {stage.annotation && (
                    <AnnotationBubble annotation={stage.annotation} />
                  )}
                </div>
              </motion.div>

              {/* Connector between stages */}
              <div className="flex" style={{ marginLeft: 0 }}>
                <ConnectorLine index={index} total={stages.length} />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ── Micro statement ── */}
        <motion.div
          className="mt-16 md:mt-20 border-t border-white/[0.07] pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p
              className="text-white text-xl md:text-2xl max-w-lg leading-snug"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              Good timing isn't fast — it's earned.
            </p>
            <div className="flex gap-6 md:gap-8">
              {[
                { value: '< 200ms', label: 'Inference latency' },
                { value: '95%', label: 'Confidence floor' },
                { value: '3 signals', label: 'Minimum to surface' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-xl md:text-2xl font-semibold"
                    style={{ color: '#FFDD00' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default SessionTimeline;
