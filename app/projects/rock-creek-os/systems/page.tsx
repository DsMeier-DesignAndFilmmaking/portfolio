import Link from 'next/link';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import {
  DecisionArchitectureMap,
  EnvironmentalExperienceEcosystem,
  InfrastructureDependencyModel,
  RusticReliabilityGap,
  SovereigntyLayerStack,
  StewardshipFeedbackLoop,
} from '../components';
import { ExperienceNav } from '../components/ExperienceNav';

// ─────────────────────────────────────────────────────────────────────────────
// The Systems Atlas — the intellectual core of the Infrastructure Sovereignty
// OS case study. Five sections transform research findings into visual
// models of how environmental, operational, infrastructure, and experience
// systems interact. The goal is not to display data — it is to reveal
// relationships, so every section is built to make a specific relationship
// visible: dependency, sequence, decision flow, authority, or feedback.
//
// Only Atlas 04's primary artifact (SovereigntyLayerStack) is a client
// component. Everything else stays server-rendered, per the practice
// standard: motion and interactivity are used sparingly and intentionally,
// not by default.
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

const sectionNavigation = [
  { id: 'rcos-atlas-hero', label: 'Overview' },
  { id: 'rcos-atlas-01', label: 'Ecosystem' },
  { id: 'rcos-atlas-02', label: 'Gap' },
  { id: 'rcos-atlas-03', label: 'Decisions' },
  { id: 'rcos-atlas-04', label: 'Sovereignty' },
  { id: 'rcos-atlas-05', label: 'Loop' },
];

const roles = [
  'Environmental Experience Systems Designer',
  'Information Architect',
  'Systems Strategist',
  'Landscape Systems Thinker',
];

const atlasSections = [
  {
    id: 'rcos-atlas-01',
    eyebrow: '01 // Environmental Experience Ecosystem',
    title: 'Everything is connected. Not everything is connected equally.',
    intro:
      'Nine actors, three domains, and a weighted relationship ledger — with the closed feedback loops and the failure points both surfaced explicitly, not left for the reader to infer.',
    tone: 'white' as const,
    render: () => <EnvironmentalExperienceEcosystem />,
  },
  {
    id: 'rcos-atlas-02',
    eyebrow: '02 // The Rustic Reliability Gap',
    title: 'The current chain and the future chain spend the same capacity in opposite directions.',
    intro:
      'A before/after systems analysis, plus the four named risks — structural obsolescence, connectivity risk, climate risk, and the authenticity paradox — that make the current chain unstable.',
    tone: 'muted' as const,
    render: () => <RusticReliabilityGap />,
  },
  {
    id: 'rcos-atlas-03',
    eyebrow: '03 // Decision Architecture Map',
    title: 'Who decides what, on which horizon, using which information — and where it breaks down.',
    intro:
      'Four decision tiers with their data sources, inputs, outputs, missing information, and the cross-tier feedback loops that connect — and bottleneck — them.',
    tone: 'white' as const,
    render: () => <DecisionArchitectureMap />,
  },
  {
    id: 'rcos-atlas-04',
    eyebrow: '04 // Infrastructure Sovereignty Model',
    title: 'Authority runs down the stack. Constraint runs back up it.',
    intro:
      'A five-layer operating model, click-to-expand — plus a physical dependency model as supporting evidence for what actually breaks together.',
    tone: 'muted' as const,
    render: () => (
      <div className="space-y-8">
        <SovereigntyLayerStack />
        <InfrastructureDependencyModel />
      </div>
    ),
  },
  {
    id: 'rcos-atlas-05',
    eyebrow: '05 // Stewardship Feedback Loop',
    title: 'Land health and revenue stability are the same conversation, on different clocks.',
    intro:
      'One closed cycle — land health, guest experience, revenue stability, stewardship investment — shown running in both directions, with a measurable example at every node and edge.',
    tone: 'white' as const,
    render: () => <StewardshipFeedbackLoop />,
  },
];

export default function SystemsAtlasPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-rockcreek-200/50">
      <a
        href="#rcos-atlas-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
      >
        Skip to the Systems Atlas
      </a>

      <PageNavIndicator sections={sectionNavigation} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-rockcreek-600" />
      <ExperienceNav />

      {/* Hero */}
      <section id="rcos-atlas-hero" className={`${CONTENT_BOUNDS} mt-8 md:mt-10`}>
        <div className="max-w-3xl">
          <div className="mb-6">
            <ProjectBreadcrumb projectId="rock-creek-os" nameProject />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">
              Intellectual Core
            </span>
          </div>

          <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
            The Systems Atlas
          </h1>
          <p className="mt-5 font-tiempos text-xl italic text-gray-500 md:text-2xl">
            Where complex relationships become understandable.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            The goal here is not to display data. It is to reveal relationships — the
            dependencies, sequences, decisions, authority, and feedback that make a remote,
            high-consequence hospitality landscape behave like a single system rather than five
            unrelated departments.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" aria-label="Roles this Atlas demonstrates">
            {roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Atlas map — the five sections at a glance, before the detail */}
      <section className={`${CONTENT_BOUNDS} pb-16 md:pb-24`} aria-label="Atlas contents">
        <div className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
            Five sections
          </p>
          <ol className="mt-5 grid gap-2 sm:grid-cols-2">
            {atlasSections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-rockcreek-300 hover:bg-rockcreek-50 hover:text-rockcreek-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
                >
                  <span className="font-mono text-xs font-black text-rockcreek-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.eyebrow.replace(/^0\d \/\/ /, '')}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {atlasSections.map(({ id, eyebrow, title, intro, tone, render }) => (
        <section key={id} id={id} className={`py-16 md:py-28 ${tone === 'muted' ? 'bg-neutral-50' : 'bg-white'}`}>
          <div className={CONTENT_BOUNDS}>
            <div className="mb-10 max-w-3xl md:mb-14">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-rockcreek-700">
                {eyebrow}
              </p>
              <h2 className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
                {intro}
              </p>
            </div>

            {render()}
          </div>
        </section>
      ))}

      {/* Onward */}
      <section className="bg-neutral-950 py-16 md:py-24">
        <div className={CONTENT_BOUNDS}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-300">
              Continue
            </p>
            <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
              The Atlas is the model. The case study is the argument built on it.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Move from frameworks to the interactive Systems Explorer — or enter the Experience OS
              control room to see modeled environmental telemetry.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/projects/rock-creek-os/explorer"
                className="group inline-flex items-center gap-2 rounded-xl border border-rockcreek-500 bg-rockcreek-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-rockcreek-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Explore the Problems
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
