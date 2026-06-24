'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BrainCircuit,
  ChevronDown,
  Compass,
  Layers3,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import type { ProjectRecord } from '@/data/projects';

// ── Card types ────────────────────────────────────────────────────────────────
type CardTone = 'teal' | 'violet' | 'amber' | 'blue';

type LinkedCard = {
  id: string;
  title: string;
  label: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
  tagTone?: 'stone';
};

type StaticCard = {
  id: string;
  title: string;
  label: string;
  description: string;
  tags: string[];
  href: string;
  icon: LucideIcon;
};

// ── Tone map — identical to original DesignWork.tsx ──────────────────────────
const TONE = {
  teal: {
    cardBorder: 'border-teal-100',
    cardBorderFeatured: 'border-teal-200',
    cardBorderDashed: 'border-teal-200',
    iconContainer: 'border-teal-100 bg-teal-50 text-teal-700',
    label: 'text-teal-700/65',
    cta: 'text-teal-700 hover:text-teal-800 focus:ring-teal-700',
    ctaHoverBg: 'hover:bg-teal-50/60 hover:text-teal-800',
    methodCta: 'text-teal-700 hover:text-teal-800 focus:ring-teal-700',
  },
  violet: {
    cardBorder: 'border-violet-100',
    cardBorderFeatured: 'border-violet-200',
    cardBorderDashed: 'border-violet-200',
    iconContainer: 'border-violet-100 bg-violet-50 text-violet-700',
    label: 'text-violet-700/65',
    cta: 'text-violet-700 hover:text-violet-800 focus:ring-violet-700',
    ctaHoverBg: 'hover:bg-violet-50/60 hover:text-violet-800',
    methodCta: 'text-violet-700 hover:text-violet-800 focus:ring-violet-700',
  },
  amber: {
    cardBorder: 'border-amber-100',
    cardBorderFeatured: 'border-amber-200',
    cardBorderDashed: 'border-amber-200',
    iconContainer: 'border-amber-100 bg-amber-50 text-amber-700',
    label: 'text-amber-700/65',
    cta: 'text-amber-700 hover:text-amber-800 focus:ring-amber-700',
    ctaHoverBg: 'hover:bg-amber-50/60 hover:text-amber-800',
    methodCta: 'text-amber-700 hover:text-amber-800 focus:ring-amber-700',
  },
  blue: {
    cardBorder: 'border-blue-100',
    cardBorderFeatured: 'border-blue-200',
    cardBorderDashed: 'border-blue-200',
    iconContainer: 'border-blue-100 bg-blue-50 text-blue-700',
    label: 'text-blue-700/65',
    cta: 'text-blue-700 hover:text-blue-800 focus:ring-blue-700',
    ctaHoverBg: 'hover:bg-blue-50/60 hover:text-blue-800',
    methodCta: 'text-blue-700 hover:text-blue-800 focus:ring-blue-700',
  },
} as const;

// ── Tag list ──────────────────────────────────────────────────────────────────
function TagList({ tags, compact = false }: { tags: string[]; compact?: boolean }) {
  return (
    <ul className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`} aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
              compact
                ? 'border-stone-200 bg-white/70 text-stone-500'
                : 'border-stone-200 bg-stone-50 text-stone-600'
            }`}
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ── Card components (relocated from original DesignWork.tsx) ─────────────────

/** Used for: Framework, Experimental Build */
function LinkedProjectCard({ card, tone }: { card: LinkedCard; tone: CardTone }) {
  const Icon = card.icon;
  const t = TONE[tone];
  return (
    <article
      className={`rounded-lg border bg-white px-6 py-6 shadow-sm md:px-7 md:py-7 ${
        card.featured ? t.cardBorderFeatured : t.cardBorder
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>
              {card.label}
            </p>
            <h3
              className="mt-1 text-2xl font-bold leading-tight text-gray-950 text-balance"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              {card.title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base text-pretty">{card.description}</p>
        <div className="mt-4">
          <TagList tags={card.tags} />
        </div>
      </div>
      <div className="mt-6 flex">
        <Link
          href={card.href}
          className={`inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-4 ${t.cta}`}
        >
          {card.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/** Used for: Research OS */
function ResearchOSCard({ card, tone }: { card: StaticCard; tone: CardTone }) {
  const Icon = card.icon;
  const t = TONE[tone];
  return (
    <article className={`rounded-lg border bg-white p-5 shadow-sm ${t.cardBorder}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>
              {card.label}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-gray-950 text-balance">{card.title}</h3>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 text-pretty">{card.description}</p>
        <div className="mt-4">
          <TagList tags={card.tags} compact />
        </div>
      </div>
      <div className="mt-6 flex">
        <Link
          href={card.href}
          className={`inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-4 ${t.methodCta}`}
        >
          Explore Research OS
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/** Used for: Concepts */
function ConceptCard({ card, tone }: { card: StaticCard; tone: CardTone }) {
  const Icon = card.icon;
  const t = TONE[tone];
  return (
    <article className={`rounded-lg border border-dashed bg-white p-5 ${t.cardBorderDashed}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>
              {card.label}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-gray-950 text-balance">{card.title}</h3>
          </div>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 text-pretty">{card.description}</p>
        <div className="mt-5">
          <TagList tags={card.tags} compact />
        </div>
        <div className="mt-4 pt-2">
          <Link
            href={card.href}
            aria-label={`Explore ${card.title}`}
            className={`group -ml-3 inline-flex min-h-[44px] items-center justify-start gap-2 rounded-lg px-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-4 ${t.cta} ${t.ctaHoverBg}`}
          >
            <span>Explore Project</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ── Stage config ──────────────────────────────────────────────────────────────
const STAGES = [
  {
    key: 'research',
    label: 'Research',
    type: 'Research OS',
    tone: 'teal' as CardTone,
    // Full Tailwind strings so JIT includes them
    activePill: 'border-teal-200 bg-teal-50 text-teal-700',
    countBubble: 'bg-teal-100 text-teal-700',
    chevron: 'text-teal-500',
    stageLabel: 'text-teal-600',
    divider: 'border-teal-100',
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    type: 'Framework',
    tone: 'violet' as CardTone,
    activePill: 'border-violet-200 bg-violet-50 text-violet-700',
    countBubble: 'bg-violet-100 text-violet-700',
    chevron: 'text-violet-500',
    stageLabel: 'text-violet-600',
    divider: 'border-violet-100',
  },
  {
    key: 'concepts',
    label: 'Concepts',
    type: 'Concept',
    tone: 'amber' as CardTone,
    activePill: 'border-amber-200 bg-amber-50 text-amber-700',
    countBubble: 'bg-amber-100 text-amber-700',
    chevron: 'text-amber-500',
    stageLabel: 'text-amber-600',
    divider: 'border-amber-100',
  },
  {
    key: 'builds',
    label: 'Experimental Builds',
    type: 'Experimental Build',
    tone: 'blue' as CardTone,
    activePill: 'border-blue-200 bg-blue-50 text-blue-700',
    countBubble: 'bg-blue-100 text-blue-700',
    chevron: 'text-blue-500',
    stageLabel: 'text-blue-600',
    divider: 'border-blue-100',
  },
] as const;

// ── Icon + card-shape config ──────────────────────────────────────────────────
const PROJECT_ICONS: Record<string, LucideIcon> = {
  'environmental-systems-design-os': Layers3,
  'architecture-of-confidence': ShieldCheck,
  'wayfinding-matrix': Compass,
  'intention-engine': BrainCircuit,
  'responsive-ecologies': Route,
  'adaptive-ranch-experience-companion': Compass,
  'travel-and-ai': BrainCircuit,
  'digital-executor': Zap,
  'field-notes': MapPinned,
};

const FEATURED_IDS = new Set(['architecture-of-confidence', 'travel-and-ai']);

const CTA_BY_TYPE: Record<string, string> = {
  Framework: 'Explore Framework',
  'Experimental Build': 'Explore Build',
};

// ── Main component ────────────────────────────────────────────────────────────
export default function PipelineSection({ projects }: { projects: ProjectRecord[] }) {
  // All stages expanded by default — visitors see the full picture on first load
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(STAGES.map((s) => s.key)),
  );

  const toggle = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const byType = (type: string) => projects.filter((p) => p.type === type);

  const toLinked = (p: ProjectRecord): LinkedCard => ({
    id: p.id,
    title: p.title,
    label: p.type,
    description: p.summary,
    tags: p.tags,
    tagTone: p.id === 'architecture-of-confidence' ? 'stone' : undefined,
    cta: CTA_BY_TYPE[p.type] ?? 'Explore',
    href: p.href,
    icon: PROJECT_ICONS[p.id] ?? Sparkles,
    featured: FEATURED_IDS.has(p.id),
  });

  const toStatic = (p: ProjectRecord): StaticCard => ({
    id: p.id,
    title: p.title,
    label: p.type,
    description: p.summary,
    tags: p.tags,
    href: p.href,
    icon: PROJECT_ICONS[p.id] ?? Sparkles,
  });

  return (
    <div className="max-w-4xl mx-auto px-6 pb-24">
      {/* ── Pipeline visual ───────────────────────────────────────────────── */}
      <div className="pt-12 pb-10">
        <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
          The pipeline
        </p>

        {/* Horizontal flow: boxes + SVG arrows */}
        <div
          className="flex items-stretch gap-0 overflow-x-auto pb-1"
          role="navigation"
          aria-label="Pipeline stages"
        >
          {STAGES.map((stage, i) => {
            const count = byType(stage.type).length;
            const isExpanded = expanded.has(stage.key);
            return (
              <div key={stage.key} className="flex items-center">
                {i > 0 && (
                  <div className="shrink-0 px-1 text-neutral-300" aria-hidden="true">
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path
                        d="M1 8h16M12 2l7 6-7 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <button
                  onClick={() => toggle(stage.key)}
                  aria-expanded={isExpanded}
                  aria-controls={`stage-panel-${stage.key}`}
                  className={`flex min-w-[100px] shrink-0 flex-col items-start gap-1.5 rounded-lg border px-3.5 py-2.5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 ${
                    isExpanded
                      ? stage.activePill
                      : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-xs font-semibold leading-tight">{stage.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold ${
                        isExpanded ? stage.countBubble : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {count}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3 w-3 transition-transform duration-200 ${
                        isExpanded ? `rotate-180 ${stage.chevron}` : 'text-neutral-400'
                      }`}
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Stage sections ────────────────────────────────────────────────── */}
      <div className="space-y-10">
        {STAGES.map((stage, idx) => {
          const isExpanded = expanded.has(stage.key);
          const stageProjects = byType(stage.type);

          return (
            <section key={stage.key} aria-labelledby={`stage-heading-${stage.key}`}>
              {/* Section header — also acts as toggle */}
              <button
                id={`stage-heading-${stage.key}`}
                onClick={() => toggle(stage.key)}
                aria-expanded={isExpanded}
                aria-controls={`stage-panel-${stage.key}`}
                className="group mb-5 flex w-full items-center justify-between rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-4"
              >
                <div className="text-left">
                  <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${stage.stageLabel}`}>
                    Stage {idx + 1}
                  </p>
                  <h2 className="mt-0.5 text-lg font-semibold text-gray-900">{stage.label}</h2>
                </div>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 ${stage.chevron} ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Animated card grid */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`stage-panel-${stage.key}`}
                    key={`panel-${stage.key}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-5 pb-2 md:gap-6">
                      {stageProjects.map((p) => {
                        if (p.type === 'Research OS') {
                          return (
                            <ResearchOSCard key={p.id} card={toStatic(p)} tone={stage.tone} />
                          );
                        }
                        if (p.type === 'Concept') {
                          return (
                            <ConceptCard key={p.id} card={toStatic(p)} tone={stage.tone} />
                          );
                        }
                        return (
                          <LinkedProjectCard key={p.id} card={toLinked(p)} tone={stage.tone} />
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stage divider */}
              {idx < STAGES.length - 1 && (
                <div className={`mt-10 border-t ${stage.divider}`} aria-hidden="true" />
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
