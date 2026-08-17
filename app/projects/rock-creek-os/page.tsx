import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import HeroDraftingPlate from '@/components/HeroDraftingPlate';
import { HERO_PLATES } from '@/data/heroPlates';
import { ExperienceNav } from './components/ExperienceNav';

// ─────────────────────────────────────────────────────────────────────────────
// Case-study landing for the Infrastructure Sovereignty OS project.
//
// This route is the narrative entry point of a four-part IA: Case Study
// (here) → Systems Explorer (/explorer) → Systems Atlas (/systems) →
// Environmental Experience OS (/dashboard), presented below as three
// sequential cards. It intentionally does NOT duplicate the five framework
// diagrams — those live once, at /systems, and this page links to them
// rather than re-rendering them.
//
// The full 10-band case-study narrative (research signals, problem set,
// interventions, outcomes, evidence boundary, reflection) is specified in
// `rock-creek-os--page-ia-spec.md` and is not built yet — this page is a
// deliberately thin landing until that build is commissioned.
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

const sectionNavigation = [{ id: 'rcos-hero', label: 'Overview' }];

export default function RockCreekOsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-rockcreek-200/50">
      <a
        href="#rcos-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rockcreek-600"
      >
        Skip to content
      </a>

      <PageNavIndicator sections={sectionNavigation} showDotsOnDesktop={false} />
      <ProjectHeader focusRingClassName="focus-visible:ring-rockcreek-600" />
      <ExperienceNav />

      <section id="rcos-hero" className={`${CONTENT_BOUNDS} relative mt-8 md:mt-10`}>
        <HeroDraftingPlate plate={HERO_PLATES['rock-creek-os']!} />
        <div className="relative z-10 max-w-3xl">
          <div className="mb-6">
            <ProjectBreadcrumb projectId="rock-creek-os" nameProject terminalIsCurrent />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-rockcreek-200 bg-rockcreek-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-700">
              Independent Research
            </span>
            
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
  Environmental & Experience Systems Architecture
</h1>
<p className="mt-3 text-lg font-semibold uppercase tracking-wider text-[#b32025]">
  Case Study: The Ranch at Rock Creek
</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
  A systems design model for mapping how guest experience, off-grid utilities, and local ecology work together in a remote wilderness setting. (Independent, unaffiliated study)
</p>
        </div>
      </section>

      <section className={`${CONTENT_BOUNDS} pb-16 pt-14 md:pb-24 md:pt-20`}>
        <div className="grid max-w-3xl gap-4">
          <Link
            href="/projects/rock-creek-os/explorer"
            className="group block rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 transition-colors hover:border-rockcreek-300 hover:bg-rockcreek-50 md:p-8"
          >
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-700">
              Start here
            </p>
            <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
              The Systems Explorer
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
              Four interactive investigations into the environmental, infrastructure, operational,
              and experience-design tensions that shaped this operating model.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rockcreek-700">
              Explore the Problems
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          <Link
            href="/projects/rock-creek-os/systems"
            className="group block rounded-[2rem] border border-neutral-200 bg-white p-6 transition-colors hover:border-rockcreek-300 hover:bg-rockcreek-50 md:p-8"
          >
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
              Then
            </p>
            <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
              The Systems Atlas
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
              Five frameworks mapping how experience, operations, infrastructure, ecology, and
              landscape interact — the environmental experience ecosystem, the rustic-reliability
              gap, the decision architecture, the five-layer sovereignty model, and the stewardship
              feedback loop.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rockcreek-700">
              Explore the Atlas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          <Link
            href="/projects/rock-creek-os/dashboard"
            className="group block rounded-[2rem] border border-neutral-200 bg-white p-6 transition-colors hover:border-rockcreek-300 hover:bg-rockcreek-50 md:p-8"
          >
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
              Finally
            </p>
            <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
              Environmental Experience OS
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
              An operations-center prototype for the model itself — modeled telemetry across
              resource autonomy, human experience, stewardship, and operations, plus a digital
              twin of the property's experience and infrastructure layers.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-rockcreek-700">
              Enter the Operations Center
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
