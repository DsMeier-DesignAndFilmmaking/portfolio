'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../components/diagram-primitives';

export function useExplorerMotion() {
  const prefersReducedMotion = useReducedMotion();
  return {
    prefersReducedMotion,
    fade: prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
      : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } },
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function SystemExplorerSection({
  id,
  number,
  title,
  intro,
  designQuestion,
  children,
  tone = 'white',
}: {
  id: string;
  number: string;
  title: string;
  intro: string;
  designQuestion?: string;
  children: ReactNode;
  tone?: 'white' | 'muted';
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('scroll-mt-24 py-16 md:py-28', tone === 'muted' ? 'bg-neutral-50' : 'bg-white')}
    >
      <div className="container mx-auto px-6 md:px-8">
        <header className="mb-10 max-w-3xl md:mb-14">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-rockcreek-700">
            Explorer {number}
          </p>
          <h2 id={`${id}-title`} className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">{intro}</p>
          {designQuestion && (
            <blockquote className="mt-6 border-l-2 border-rockcreek-600 pl-4 font-tiempos text-lg italic text-neutral-700 md:text-xl">
              {designQuestion}
            </blockquote>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

export function TensionAxis({
  top,
  bottom,
  className = '',
}: {
  top: string;
  bottom: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 md:px-10',
        className,
      )}
      aria-label={`Tension between ${top} and ${bottom}`}
    >
      <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rose-700">{top}</span>
      <div className="flex flex-col items-center gap-1" aria-hidden="true">
        <span className="h-8 w-px bg-neutral-300" />
        <span className="font-mono text-[10px] font-black text-neutral-400">↕</span>
        <span className="h-8 w-px bg-neutral-300" />
      </div>
      <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-rockcreek-700">{bottom}</span>
    </div>
  );
}

export function SystemStepReveal({
  steps,
  activeIndex,
  onStepChange,
}: {
  steps: Array<{ id: string; label: string; body: string; detail?: string }>;
  activeIndex: number;
  onStepChange: (index: number) => void;
}) {
  const { fade, transition, prefersReducedMotion } = useExplorerMotion();
  const active = steps[activeIndex];

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Step controls — vertical on desktop, horizontal scroll on mobile */}
      <ol
        className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
        aria-label="Progressive system layers"
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isRevealed = index <= activeIndex;
          return (
            <li key={step.id} className="shrink-0 lg:shrink">
              <button
                type="button"
                aria-current={isActive ? 'step' : undefined}
                aria-expanded={isActive}
                onClick={() => onStepChange(index)}
                className={cn(
                  'w-full min-w-[140px] rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 focus-visible:ring-offset-2 lg:min-w-0',
                  isActive
                    ? 'border-rockcreek-600 bg-rockcreek-50'
                    : isRevealed
                      ? 'border-neutral-200 bg-white hover:border-rockcreek-300'
                      : 'border-neutral-100 bg-neutral-50 text-neutral-400',
                )}
              >
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'mt-1 block text-sm font-bold leading-snug',
                    isActive ? 'text-rockcreek-900' : isRevealed ? 'text-neutral-800' : 'text-neutral-400',
                  )}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Active step detail */}
      <div className="lg:col-span-8">
        <motion.div
          key={active.id}
          {...fade}
          transition={transition}
          className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8"
        >
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
            Layer {String(activeIndex + 1).padStart(2, '0')} · {active.label}
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg">{active.body}</p>
          {active.detail && (
            <p className="mt-4 border-t border-neutral-100 pt-4 text-sm leading-relaxed text-neutral-500">
              {active.detail}
            </p>
          )}
        </motion.div>

        {/* Mobile-friendly step navigation */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={activeIndex === 0}
            onClick={() => onStepChange(activeIndex - 1)}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-rockcreek-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
          >
            Previous
          </button>
          <span className="font-mono text-xs text-neutral-500">
            {activeIndex + 1} / {steps.length}
          </span>
          <button
            type="button"
            disabled={activeIndex === steps.length - 1}
            onClick={() => onStepChange(activeIndex + 1)}
            className="rounded-lg border border-rockcreek-600 bg-rockcreek-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rockcreek-700 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 focus-visible:ring-offset-2"
          >
            {activeIndex === steps.length - 1 ? 'Complete' : 'Next layer'}
          </button>
        </div>

        {/* Progress indicator for reduced motion / screen readers */}
        {!prefersReducedMotion && (
          <div className="mt-4 flex gap-1" aria-hidden="true">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn('h-1 flex-1 rounded-full', i <= activeIndex ? 'bg-rockcreek-600' : 'bg-neutral-200')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SystemTradeoff({
  stateA,
  stateB,
  activeState,
  onToggle,
}: {
  stateA: { label: string; metrics: Array<{ label: string; value: string; tone: 'positive' | 'negative' | 'neutral' }>; summary: string };
  stateB: { label: string; metrics: Array<{ label: string; value: string; tone: 'positive' | 'negative' | 'neutral' }>; summary: string };
  activeState: 'a' | 'b';
  onToggle: (state: 'a' | 'b') => void;
}) {
  const active = activeState === 'a' ? stateA : stateB;
  const { fade, transition } = useExplorerMotion();

  const toneStyles = {
    positive: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    negative: 'text-rose-700 bg-rose-50 border-rose-200',
    neutral: 'text-neutral-700 bg-neutral-50 border-neutral-200',
  };

  return (
    <div>
      <div
        className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5"
        role="radiogroup"
        aria-label="Compare tradeoff states"
      >
        {(['a', 'b'] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={activeState === key}
            onClick={() => onToggle(key)}
            className={cn(
              'rounded-md px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600',
              activeState === key ? 'bg-white text-rockcreek-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700',
            )}
          >
            State {key.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div key={activeState} {...fade} transition={transition} className="mt-6">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">{active.label}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {active.metrics.map((metric) => (
            <li
              key={metric.label}
              className={cn('rounded-xl border px-4 py-3', toneStyles[metric.tone])}
            >
              <span className="block font-mono text-[10px] font-black uppercase tracking-wider opacity-70">
                {metric.label}
              </span>
              <span className="mt-1 block text-lg font-bold">{metric.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">{active.summary}</p>
      </motion.div>
    </div>
  );
}

export function SystemLayerToggle<T extends string>({
  layers,
  active,
  onChange,
  ariaLabel,
}: {
  layers: Array<{ id: T; label: string; description: string }>;
  active: T;
  onChange: (id: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {layers.map((layer) => {
        const isActive = active === layer.id;
        return (
          <button
            key={layer.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(layer.id)}
            className={cn(
              'rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600 focus-visible:ring-offset-2',
              isActive
                ? 'border-rockcreek-600 bg-rockcreek-50'
                : 'border-neutral-200 bg-white hover:border-rockcreek-300',
            )}
          >
            <span className="block font-mono text-[10px] font-black uppercase tracking-[0.14em] text-rockcreek-700">
              {layer.label}
            </span>
            <span className="mt-1 block text-xs text-neutral-500">{layer.description}</span>
          </button>
        );
      })}
    </div>
  );
}

export function LayerLegend({
  items,
  className = '',
}: {
  items: Array<{ swatch: string; label: string }>;
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)} aria-label="Diagram legend">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span className={cn('h-2.5 w-2.5 rounded-full', item.swatch)} aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ConceptDisclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 flex gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs leading-relaxed text-neutral-500">
      <span className="shrink-0 font-mono font-black uppercase tracking-[0.12em] text-neutral-400">
        Research
      </span>
      <span>{children}</span>
    </p>
  );
}

export function OutcomeCallout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-neutral-900 bg-neutral-950 p-5 md:p-6">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-300">
        {label}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">{children}</p>
    </div>
  );
}
