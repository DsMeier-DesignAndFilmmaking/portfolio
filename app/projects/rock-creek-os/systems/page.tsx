import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import { ExperienceNav } from '../components/ExperienceNav';
import {
  FeedbackLoop,
  LogisticsResponseLayer,
  PrimaryLifecycle,
  SystemArchitectureStack,
  WildfireExtensibility,
} from './components';
import { AtlasSectionHeader } from './components/systems-primitives';
import {
  architectureLayers,
  futureArtifacts,
  futureDesignCopy,
  systemsEvidenceBoundary,
  systemsHero,
  systemsSections,
} from './content/systems-data';

// ─────────────────────────────────────────────────────────────────────────────
// The Systems Atlas — the mechanism half of the Adaptive Stewardship OS case
// study. Authoritative content source: `rock-creek-os-foundation.md`.
//
// Explorer answers WHAT the problem is: hydrology as primary, fire and
// logistics as the two systems that support it. This page answers HOW a
// system connecting them would actually work — the architecture, the
// hydrology lifecycle, the extensibility argument, the logistics propagation,
// and the feedback loop that makes it adaptive rather than automated.
//
//   01 Architecture     five layers, Environment → Guest Experience
//   02 Primary lifecycle  hydrology's Sense→Interpret→Decide→Adapt→Learn
//   03 Extensibility     wildfire, same architecture, different signal
//   04 Logistics         the response layer + "quiet infrastructure"
//   05 Feedback          the loop that makes this adaptive, not automated
//   06 Future design     mapped to the architecture, not repeated from Explorer
//      Evidence boundary
//
// This replaced a five-framework structure (Environmental Experience
// Ecosystem, Rustic-Reliability Gap, Decision Architecture Map, Infrastructure
// Sovereignty Model, Stewardship Feedback Loop) built for the older
// Infrastructure Sovereignty frame. Three of those five components were
// evolved rather than discarded outright — SovereigntyLayerStack became
// SystemArchitectureStack, DecisionArchitectureMap's row grammar became
// PrimaryLifecycle, RusticReliabilityGap's parallel-chain became
// WildfireExtensibility, and StewardshipFeedbackLoop became FeedbackLoop —
// each keeping its interaction pattern and accessibility contract while the
// content underneath changed completely. The two that didn't transfer
// (EnvironmentalExperienceEcosystem, InfrastructureDependencyModel) were
// removed, recoverable from git — see `components/index.ts`.
//
// Interactivity is deliberately scarce: SystemArchitectureStack is the only
// client component, continuing the previous Atlas's own stated principle.
// Explorer is where a visitor investigates; this page is where they read a
// map.
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

const sectionNavigation = [{ id: 'systems-hero', label: 'Overview' }, ...systemsSections];

const layerNameById = (id: string) => architectureLayers.find((l) => l.id === id)?.name ?? id;

export default function SystemsAtlasPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-rockcreek-200/50">
      <a
        href="#systems-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
      >
        Skip to the Systems Atlas
      </a>

      <PageNavIndicator sections={sectionNavigation} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-rockcreek-600" />
      <ExperienceNav />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="systems-hero" className={`${CONTENT_BOUNDS} mt-8 md:mt-10`}>
        <div className="max-w-3xl">
          <div className="mb-6">
            <ProjectBreadcrumb projectId="rock-creek-os" nameProject />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">
              {systemsHero.eyebrow}
            </span>
          </div>

          <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
            {systemsHero.title}
          </h1>
          <p className="mt-5 font-tiempos text-xl italic text-gray-500 md:text-2xl">{systemsHero.deck}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            {systemsHero.bridge}
          </p>
        </div>
      </section>

      {/* ── 01 · System architecture (interactive) ──────────────────── */}
      <div className="mt-14 md:mt-20">
        <SystemArchitectureStack />
      </div>

      {/* ── 02 · Primary lifecycle ───────────────────────────────────── */}
      <PrimaryLifecycle />

      {/* ── 03 · Wildfire extensibility ──────────────────────────────── */}
      <WildfireExtensibility />

      {/* ── 04 · Logistics response layer ────────────────────────────── */}
      <LogisticsResponseLayer />

      {/* ── 05 · Feedback & learning ──────────────────────────────────── */}
      <FeedbackLoop />

      {/* ── 06 · Future design, mapped to the architecture ───────────── */}
      <section
        id={futureDesignCopy.id}
        aria-labelledby={`${futureDesignCopy.id}-title`}
        className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50 py-16 md:py-24"
      >
        <div className={CONTENT_BOUNDS}>
          <AtlasSectionHeader
            kicker={futureDesignCopy.kicker}
            number={futureDesignCopy.number}
            title={futureDesignCopy.title}
            intro={futureDesignCopy.intro}
          />
          <h2 id={`${futureDesignCopy.id}-title`} className="sr-only">
            {futureDesignCopy.title}
          </h2>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {futureArtifacts.map((artifact) => (
              <li key={artifact.id} className="rounded-2xl border border-dashed border-neutral-300 bg-white p-5">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-violet-700">
                  Proposed
                </span>
                <span className="mt-2 block text-sm font-bold leading-snug text-neutral-900">
                  {artifact.label}
                </span>
                <span className="mt-2 block text-xs leading-relaxed text-neutral-600">{artifact.note}</span>
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-3">
                  {artifact.layerIds.map((layerId) => (
                    <span
                      key={layerId}
                      className="inline-flex items-center rounded-full border border-rockcreek-200 bg-rockcreek-50 px-2 py-0.5 text-[10px] font-semibold text-rockcreek-700"
                    >
                      {layerNameById(layerId)}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Evidence boundary — required trust module ────────────────── */}
      <section aria-labelledby="systems-evidence-title" className={`${CONTENT_BOUNDS} pb-16 pt-16 md:pb-24 md:pt-24`}>
        <div className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50/60 p-6 md:p-8">
          <h2
            id="systems-evidence-title"
            className="font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl"
          >
            {systemsEvidenceBoundary.title}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Established
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
                {systemsEvidenceBoundary.established.map((item) => (
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
                {systemsEvidenceBoundary.notClaimed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-500">{systemsEvidenceBoundary.disclosure}</p>
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
              The architecture is modeled. The Experience OS shows what it would look like running.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Move from mechanism to a modeled operations-center view — or back to the Systems
              Explorer for the problem this architecture answers.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/projects/rock-creek-os/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl border border-rockcreek-500 bg-rockcreek-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-rockcreek-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Enter the Experience OS
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/projects/rock-creek-os/explorer"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Back to the Systems Explorer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
