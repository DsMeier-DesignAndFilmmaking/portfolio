'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
import { CONTENT_BOUNDS, COPY_MAX_WIDTH } from './layoutClasses';

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

// ── Tone map ──────────────────────────────────────────────────────────────────
// Dark-surface tones — tuned for WCAG-AA contrast against the slate-900/800 card system.
const TONE = {
  teal: {
    cardBorder: 'border-white/5',
    cardBorderFeatured: 'border-teal-400/30',
    cardBorderDashed: 'border-teal-400/25',
    iconContainer: 'border-teal-400/25 bg-teal-400/10 text-teal-300',
    label: 'text-teal-300/80',
    cta: 'text-teal-300 hover:text-teal-200 focus:ring-teal-300',
    ctaHoverBg: 'hover:bg-teal-400/10 hover:text-teal-200',
    methodCta: 'text-teal-300 hover:text-teal-200 focus:ring-teal-300',
  },
  violet: {
    cardBorder: 'border-white/5',
    cardBorderFeatured: 'border-violet-400/30',
    cardBorderDashed: 'border-violet-400/25',
    iconContainer: 'border-violet-400/25 bg-violet-400/10 text-violet-300',
    label: 'text-violet-300/80',
    cta: 'text-violet-300 hover:text-violet-200 focus:ring-violet-300',
    ctaHoverBg: 'hover:bg-violet-400/10 hover:text-violet-200',
    methodCta: 'text-violet-300 hover:text-violet-200 focus:ring-violet-300',
  },
  amber: {
    cardBorder: 'border-white/5',
    cardBorderFeatured: 'border-amber-400/30',
    cardBorderDashed: 'border-amber-400/25',
    iconContainer: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
    label: 'text-amber-300/80',
    cta: 'text-amber-300 hover:text-amber-200 focus:ring-amber-300',
    ctaHoverBg: 'hover:bg-amber-400/10 hover:text-amber-200',
    methodCta: 'text-amber-300 hover:text-amber-200 focus:ring-amber-300',
  },
  blue: {
    cardBorder: 'border-white/5',
    cardBorderFeatured: 'border-blue-400/30',
    cardBorderDashed: 'border-blue-400/25',
    iconContainer: 'border-blue-400/25 bg-blue-400/10 text-blue-300',
    label: 'text-blue-300/80',
    cta: 'text-blue-300 hover:text-blue-200 focus:ring-blue-300',
    ctaHoverBg: 'hover:bg-blue-400/10 hover:text-blue-200',
    methodCta: 'text-blue-300 hover:text-blue-200 focus:ring-blue-300',
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
                ? 'border-white/10 bg-white/5 text-slate-400'
                : 'border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ── Card components ───────────────────────────────────────────────────────────

/** Used for: Framework, Experimental Build */
function LinkedProjectCard({ card, tone }: { card: LinkedCard; tone: CardTone }) {
  const Icon = card.icon;
  const t = TONE[tone];
  return (
    <article
      className={`w-full ${COPY_MAX_WIDTH} rounded-lg border bg-slate-800/60 px-6 py-6 shadow-sm shadow-black/20 md:px-7 md:py-7 ${
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
              className="mt-1 text-2xl font-bold leading-tight text-white text-balance"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              {card.title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base text-pretty">{card.description}</p>
        <div className="mt-4">
          <TagList tags={card.tags} />
        </div>
      </div>
      <div className="mt-6 flex">
        <Link
          href={card.href}
          className={`inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-slate-800 ${t.cta}`}
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
    <article className={`w-full ${COPY_MAX_WIDTH} rounded-lg border bg-slate-800/60 p-5 shadow-sm shadow-black/20 ${t.cardBorder}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>
              {card.label}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-white text-balance">{card.title}</h3>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 text-pretty">{card.description}</p>
        <div className="mt-4">
          <TagList tags={card.tags} compact />
        </div>
      </div>
      <div className="mt-6 flex">
        <Link
          href={card.href}
          className={`inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-slate-800 ${t.methodCta}`}
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
    <article className={`w-full ${COPY_MAX_WIDTH} rounded-lg border border-dashed bg-slate-800/30 p-5 ${t.cardBorderDashed}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>
              {card.label}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-white text-balance">{card.title}</h3>
          </div>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 text-pretty">{card.description}</p>
        <div className="mt-5">
          <TagList tags={card.tags} compact />
        </div>
        <div className="mt-4 pt-2">
          <Link
            href={card.href}
            aria-label={`Explore ${card.title}`}
            className={`group -ml-3 inline-flex min-h-[44px] items-center justify-start gap-2 rounded-lg px-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-slate-900 ${t.cta} ${t.ctaHoverBg}`}
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
// Full Tailwind class strings — required so JIT includes them at build time.
const STAGES = [
  {
    key: 'research',
    label: 'Research',
    type: 'Research OS',
    tone: 'teal' as CardTone,
    activePill: 'border-teal-200 bg-teal-50 text-teal-700',
    countBubble: 'bg-teal-100 text-teal-700',
    chevron: 'text-teal-500',
    stageLabel: 'text-teal-300/80',
    // Interaction design tokens
    openRowBg: 'bg-teal-400/10',
    openChevronContainer: 'border-teal-400/30 bg-teal-400/15',
    openChevronIcon: 'text-teal-300',
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    type: 'Framework',
    tone: 'violet' as CardTone,
    activePill: 'border-violet-200 bg-violet-50 text-violet-700',
    countBubble: 'bg-violet-100 text-violet-700',
    chevron: 'text-violet-500',
    stageLabel: 'text-violet-300/80',
    openRowBg: 'bg-violet-400/10',
    openChevronContainer: 'border-violet-400/30 bg-violet-400/15',
    openChevronIcon: 'text-violet-300',
  },
  {
    key: 'concepts',
    label: 'Concepts',
    type: 'Concept',
    tone: 'amber' as CardTone,
    activePill: 'border-amber-200 bg-amber-50 text-amber-700',
    countBubble: 'bg-amber-100 text-amber-700',
    chevron: 'text-amber-500',
    stageLabel: 'text-amber-300/80',
    openRowBg: 'bg-amber-400/10',
    openChevronContainer: 'border-amber-400/30 bg-amber-400/15',
    openChevronIcon: 'text-amber-300',
  },
  {
    key: 'builds',
    label: 'Experimental Builds',
    type: 'Experimental Build',
    tone: 'blue' as CardTone,
    activePill: 'border-blue-200 bg-blue-50 text-blue-700',
    countBubble: 'bg-blue-100 text-blue-700',
    chevron: 'text-blue-500',
    stageLabel: 'text-blue-300/80',
    openRowBg: 'bg-blue-400/10',
    openChevronContainer: 'border-blue-400/30 bg-blue-400/15',
    openChevronIcon: 'text-blue-300',
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
  // Stage 1 open by default — establishes the accordion pattern immediately.
  // Visitors see one stage revealed and three collapsed, so the interaction is
  // obvious without explanation.
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['research']));

  // Respect the OS/browser reduced-motion preference for panel animations.
  const prefersReducedMotion = useReducedMotion();

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
    <div className={`${CONTENT_BOUNDS} pt-8 pb-16 md:pb-20`}>
      <div className="space-y-5">
        {STAGES.map((stage, idx) => {
          const isExpanded = expanded.has(stage.key);
          const stageProjects = byType(stage.type);

          return (
            <section
              key={stage.key}
              aria-labelledby={`stage-heading-${stage.key}`}
              className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg shadow-slate-950/30 ring-1 ring-white/[0.06]"
            >
              {/* ── Toggle row ──────────────────────────────────────────────── */}
              <button
                id={`stage-heading-${stage.key}`}
                onClick={() => toggle(stage.key)}
                aria-expanded={isExpanded}
                aria-controls={`stage-panel-${stage.key}`}
                className={`group flex w-full min-h-[56px] cursor-pointer items-center justify-between py-4 px-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80 md:px-7 ${
                  isExpanded
                    ? stage.openRowBg
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="text-left">
                  <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${stage.stageLabel}`}>
                    Stage {idx + 1}
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <h2
                      className={`text-lg font-semibold transition-colors duration-200 ${
                        isExpanded ? 'text-white' : 'text-slate-100 group-hover:text-white'
                      }`}
                    >
                      {stage.label}
                    </h2>
                    <span className="font-mono text-[10px] text-slate-500" aria-label={`${stageProjects.length} projects`}>
                      · {stageProjects.length}
                    </span>
                  </div>
                </div>

                {/* Chevron in a contained icon box — makes the control unambiguous */}
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                    isExpanded
                      ? stage.openChevronContainer
                      : 'border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10'
                  }`}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                      isExpanded
                        ? `${stage.openChevronIcon} rotate-180`
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                </span>
              </button>

              {/* ── Animated card grid ──────────────────────────────────────── */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`stage-panel-${stage.key}`}
                    key={`panel-${stage.key}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.25,
                      ease: 'easeInOut',
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-5 border-t border-white/5 px-5 pt-5 pb-6 md:gap-6 md:px-7 md:pb-7">
                      {stageProjects.map((p) => {
                        if (p.type === 'Research OS') {
                          return <ResearchOSCard key={p.id} card={toStatic(p)} tone={stage.tone} />;
                        }
                        if (p.type === 'Concept') {
                          return <ConceptCard key={p.id} card={toStatic(p)} tone={stage.tone} />;
                        }
                        return <LinkedProjectCard key={p.id} card={toLinked(p)} tone={stage.tone} />;
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </div>
  );
}
