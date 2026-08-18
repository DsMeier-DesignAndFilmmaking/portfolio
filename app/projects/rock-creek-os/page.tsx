import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
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
// Between the hero and those three cards sits a problem-statement pair —
// "Three Interconnected Problems, One System" plus its Evidence Boundary —
// sourced from `rock-creek-os-foundation.md`. That document establishes a
// hierarchy (one primary problem, two supporting systems, one design
// question) deliberately NOT mirrored by the three destination cards below:
// those cards still describe what /explorer, /systems, /dashboard actually
// contain today (the Infrastructure Sovereignty frame), which predates the
// foundation doc's hydrological-stewardship research. The new section is
// this page's own framing, not a rewrite of what the cards promise — see
// the foundation doc's §0 for why those two frames haven't been reconciled
// yet. The Evidence Boundary module closes the gap `rock-creek-os--portfolio-audit.md`
// flagged as a publish-blocker: this project names a real property and
// states modeled figures without the practice's required ✓/✗ trust module
// (format specified in `rock-creek-os--page-ia-spec.md` §3.8).
//
// The full 10-band case-study narrative (research signals, problem set,
// interventions, outcomes, evidence boundary, reflection) is specified in
// `rock-creek-os--page-ia-spec.md` and is not built yet — this page remains
// a landing page, now with a stated problem, until that build is commissioned.
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

      {/* Problem statement. The card treatment deliberately reuses this page's
          existing visual grammar from the destination cards below — tinted
          rockcreek surface + colored label for the one that matters most,
          plain white + muted neutral-400 label for the rest — so primary vs.
          supporting reads at a glance without inventing new language for it.
          Here that grammar encodes primacy rather than sequence. */}
      <section id="rcos-challenge" className={`${CONTENT_BOUNDS} pt-16 md:pt-24`}>
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-rockcreek-200 bg-rockcreek-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-700">
            One System, One Design Question
          </span>

          <h2 className="mt-6 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-4xl">
            Three Interconnected Problems, One System
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            How can a luxury destination operating within a dynamic natural landscape adapt its
            operations and guest experience as environmental conditions change? The answer isn&rsquo;t
            three separate fixes. Water, fire, and transportation each surface the same underlying
            challenge — adaptive coordination between environmental conditions, stewardship
            decisions, operations, and guest experience.
          </p>
        </div>

        <div className="mt-10 grid max-w-3xl gap-4">
          <article className="rounded-[2rem] border border-rockcreek-200 bg-rockcreek-50 p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-700">
              Primary Problem
            </p>
            <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
              Predictive Hydrological Activity Orchestration
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
              Rock Creek&rsquo;s water temperature regularly crosses the 70°F stress threshold for
              trout, triggering mandatory 2:00 PM &ldquo;Hoot Owl&rdquo; fishing closures — with only
              days, sometimes hours, of warning. For a property built around all-inclusive fly
              fishing, an unpredicted closure doesn&rsquo;t just cancel an activity; it breaks the
              promise of a virtually flawless stay. This is the problem every other system here
              exists to solve for.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-neutral-500">
              Source: <cite className="not-italic">Low Flows, Hot Trout</cite> — National Wildlife
              Federation
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Supporting System — Environmental
              </p>
              <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
                Fire-Resilient Defensible Space Design
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                A century of fire suppression has left the surrounding forest over-stocked and
                fire-prone. Left unmanaged, high-severity wildfire wouldn&rsquo;t just threaten
                structures — it would sterilize soil and send erosion into the stream the primary
                problem depends on. Thinning toward a biodiversity mosaic protects the watershed as
                much as the buildings.
              </p>
              <p className="mt-5 text-xs leading-relaxed text-neutral-500">
                Sources: Montana Forest Consultants; Granite County CWPP
              </p>
            </article>

            <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Supporting System — Operational
              </p>
              <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
                Invisible Logistics Mobility System
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                Across a 10-square-mile property built to stay free of unnecessary vehicle use,
                logistics is the mechanism that actually delivers an adaptive response. When a
                closure or a smoke event forces a pivot, this is what moves people and gear to the
                next experience — without making the wilderness feel like a worksite.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Required trust module — format per `rock-creek-os--page-ia-spec.md` §3.8.
          Pairs color with an icon and a text label on both columns rather than
          relying on emerald-vs-neutral alone, so the distinction survives
          grayscale and color-vision deficiency. */}
      <section className={`${CONTENT_BOUNDS} pt-10 md:pt-14`}>
        <div className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50/60 p-6 md:p-8">
          <h3 className="font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
            What this establishes, and what it does not
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Established
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
                <li>
                  Documented stream-temperature thresholds and &ldquo;Hoot Owl&rdquo; closure
                  triggers (National Wildlife Federation)
                </li>
                <li>
                  Regional forest-condition and wildfire-risk data (Montana Forest Consultants;
                  Granite County CWPP)
                </li>
                <li>Published property sustainability initiatives</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Not claimed
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                <li>
                  That The Ranch at Rock Creek operates a unified system connecting these domains
                  today
                </li>
                <li>Any measured or deployed intervention</li>
                <li>Non-public operating, financial, or engineering data</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-500">
            Independent research and systems-design exploration; no client relationship;
            interventions are conceptual.
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
