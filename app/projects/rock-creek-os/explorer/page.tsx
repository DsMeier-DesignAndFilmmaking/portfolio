import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import { ExperienceNav } from '../components/ExperienceNav';
import { toneStyles } from '../components/diagram-primitives';
import { PrimaryChallenge } from './components/PrimaryChallenge';
import { SupportingSystems } from './components/SupportingSystems';
import { SystemOverlayDiagram } from './components/SystemOverlayDiagram';
import { SignalToExperience } from './components/SignalToExperience';
import {
  evidenceBoundary,
  explorerHero,
  explorerSections,
  futureDesign,
  overlayCopy,
  premiseConditions,
} from './content/explorer-data';

// ─────────────────────────────────────────────────────────────────────────────
// Systems Explorer — the narrative spine of the Adaptive Stewardship OS case
// study. Authoritative content source: `rock-creek-os-foundation.md`.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Systems Explorer — Case Study: The Ranch at Rock Creek | Dan Meier',
  description:
    'How a luxury destination adapts operations and guest experience as environmental conditions change — one adaptive system across hydrology, wildfire, and logistics. Independent systems-design research.',
};

const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

const sectionNavigation = [{ id: 'explorer-hero', label: 'Overview' }, ...explorerSections];

export default function SystemsExplorerPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-rockcreek-200/50">
      <a
        href="#explorer-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
      >
        Skip to Systems Explorer
      </a>

      <PageNavIndicator sections={sectionNavigation} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-rockcreek-600" />
      <ExperienceNav />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="explorer-hero" className={`${CONTENT_BOUNDS} mt-8 md:mt-10`}>
        <div className="max-w-3xl">
          <div className="mb-6">
            <ProjectBreadcrumb projectId="rock-creek-os" nameProject />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">
              {explorerHero.eyebrow}
            </span>
          </div>

          <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
            {explorerHero.title}
          </h1>
          <p className="mt-5 font-tiempos text-xl italic text-gray-500 md:text-2xl">
            {explorerHero.deck}
          </p>
        </div>
      </section>

      {/* ── 01 · The premise ─────────────────────────────────────────── */}
<section 
  id="premise" 
  aria-labelledby="premise-title" 
  className={`${CONTENT_BOUNDS} scroll-mt-32 py-16 md:py-24`}
>
  <div className="max-w-3xl">
    
    {/* ── 1. Main Narrative Stack ── */}
    <div className="flex flex-col">
      <h2
        id="premise-title"
        className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400"
      >
        01 · The Premise
      </h2>

      <p className="mt-6 text-lg font-medium leading-relaxed text-neutral-900 md:mt-8 md:text-xl md:leading-relaxed">
        {explorerHero.premise}
      </p>

      <blockquote className="mt-6 border-l-[3px] border-rockcreek-600 pl-6 pt-1 font-tiempos text-2xl italic leading-snug text-neutral-800 md:mt-8 md:text-3xl">
        {explorerHero.question}
      </blockquote>
    </div>

    {/* ── 2. Variables / Context Component (Tightened Spacing) ── */}
    <div className="mt-6 md:mt-8">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm ring-1 ring-neutral-950/5">
        
        {/* Card Body */}
        <div className="bg-neutral-50/50 p-6 md:p-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              What changes underneath the promise
            </h3>
            <span className="text-xs text-neutral-400">
              {premiseConditions.length} core variables
            </span>
          </div>

          <ul 
            aria-label="Operating conditions" 
            className="mt-4 flex flex-wrap gap-2 md:mt-5"
          >
            {premiseConditions.map((condition) => {
              const tone = toneStyles[condition.tone];
              return (
                <li
                  key={condition.id}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors ${tone.chip}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} aria-hidden="true" />
                  {condition.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Card Footer Context */}
        <div className="border-t border-neutral-200/75 bg-neutral-50/30 px-6 py-4 md:px-8">
          <p className="text-xs leading-relaxed text-neutral-600 md:text-sm">
            <span className="font-semibold text-neutral-900">The Context:</span> Three of these 
            compound into the systems examined below. The rest are the operating context they move 
            within.
          </p>
        </div>

      </div>
    </div>

  </div>
</section>

      {/* ── 02 · Primary problem (heaviest treatment on the page) ────── */}
      <PrimaryChallenge />

      {/* ── 03 & 04 · Supporting systems (deliberately lighter) ──────── */}
      <SupportingSystems />

      {/* ── 05 · System overlay — the page's key visual moment ───────── */}
      <section
        id={overlayCopy.id}
        aria-labelledby={`${overlayCopy.id}-title`}
        className="scroll-mt-24 border-t border-neutral-200 bg-white py-16 md:py-28"
      >
        <div className={CONTENT_BOUNDS}>
          <header className="mb-10 max-w-3xl md:mb-14">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-rockcreek-700">
                {overlayCopy.kicker}
              </span>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-neutral-400">
                {overlayCopy.number}
              </span>
            </div>
            <h2
              id={`${overlayCopy.id}-title`}
              className="mt-5 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl md:leading-tight"
            >
              {overlayCopy.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
              {overlayCopy.intro}
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Diagram legend">
              {overlayCopy.legend.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.swatch}`} aria-hidden="true" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </header>

          <SystemOverlayDiagram />

          <div className="mt-10 max-w-3xl rounded-2xl border-l-4 border-neutral-900 bg-neutral-50 p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
              Why it has to be one system
            </p>
            <p className="mt-3 text-base leading-relaxed text-neutral-800 md:text-lg">
              {overlayCopy.synthesis}
            </p>
          </div>
        </div>
      </section>

      {/* ── 06 · Sense → Interpret → Adapt → Experience ──────────────── */}
      <SignalToExperience />

      {/* ── 07 · Future design opportunity ──────────────────────────── */}
      <section
        id={futureDesign.id}
        aria-labelledby={`${futureDesign.id}-title`}
        className="scroll-mt-24 bg-white py-16 md:py-24"
      >
        <div className={CONTENT_BOUNDS}>
          <header className="mb-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-rockcreek-700">
                {futureDesign.kicker}
              </span>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-neutral-400">
                {futureDesign.number}
              </span>
            </div>
            <h2
              id={`${futureDesign.id}-title`}
              className="mt-5 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-4xl"
            >
              {futureDesign.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
              {futureDesign.intro}
            </p>
          </header>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {futureDesign.artifacts.map((artifact) => (
              <li
                key={artifact.id}
                className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/60 p-5"
              >
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-violet-700">
                  Proposed
                </span>
                <span className="mt-2 block text-sm font-bold leading-snug text-neutral-900">
                  {artifact.label}
                </span>
                <span className="mt-2 block text-xs leading-relaxed text-neutral-600">
                  {artifact.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Evidence boundary — required trust module ────────────────── */}
      <section aria-labelledby="explorer-evidence-title" className={`${CONTENT_BOUNDS} pb-16 md:pb-24`}>
        <div className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50/60 p-6 md:p-8">
          <h2
            id="explorer-evidence-title"
            className="font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl"
          >
            {evidenceBoundary.title}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Established
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
                {evidenceBoundary.established.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Not claimed
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                {evidenceBoundary.notClaimed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-500">{evidenceBoundary.disclosure}</p>
        </div>
      </section>

      {/* ── Onward ───────────────────────────────────────────────────── */}
      <section className="bg-neutral-950 py-16 md:py-24">
        <div className={CONTENT_BOUNDS}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-300">
              Continue
            </p>
            <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
              The system is named. The frameworks model how it holds together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Move from this narrative to the Systems Atlas — frameworks mapping how experience,
              operations, infrastructure, ecology, and landscape constrain and reinforce each other.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/projects/rock-creek-os/systems"
                className="group inline-flex items-center gap-2 rounded-xl border border-rockcreek-500 bg-rockcreek-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-rockcreek-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Explore the Systems Atlas
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/projects/rock-creek-os/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Enter the Experience OS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}