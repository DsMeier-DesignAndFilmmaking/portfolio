import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import HeroDraftingPlate from '@/components/HeroDraftingPlate';
import { HERO_PLATES } from '@/data/heroPlates';
import { ExperienceNav } from './components/ExperienceNav';

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

      {/* Hero Section */}
      <section id="rcos-hero" className={`${CONTENT_BOUNDS} relative mt-8 md:mt-12`}>
        <HeroDraftingPlate plate={HERO_PLATES['rock-creek-os']!} />
        
        <div className="relative z-10 max-w-3xl">
          <div className="mb-6">
            <ProjectBreadcrumb projectId="rock-creek-os" nameProject terminalIsCurrent />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-rockcreek-200 bg-rockcreek-50 px-3.5 py-1 text-xs font-black uppercase tracking-[0.24em] text-rockcreek-700">
              Independent Research
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Environmental &amp; Experience Systems Architecture
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            A systems design model for mapping how guest experience, off-grid utilities, and local ecology work together in a remote wilderness setting. (Independent, unaffiliated study)
          </p>
        </div>
      </section>

      {/* Challenge & Strategy Section */}
      <section id="rcos-challenge" className={`${CONTENT_BOUNDS} border-t border-neutral-100 pt-16 md:pt-24`}>
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-rockcreek-200 bg-rockcreek-50 px-3.5 py-1 text-xs font-black uppercase tracking-[0.24em] text-rockcreek-700">
            The Strategy
          </span>

          <h2 className="mt-6 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-4xl">
            Three Signals of One System
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-neutral-600 md:text-xl">
            <strong className="font-semibold text-neutral-900">Water</strong>,{" "}
            <strong className="font-semibold text-neutral-900">wildfire</strong>, and{" "}
            <strong className="font-semibold text-neutral-900">mobility</strong> appear to be separate challenges. In reality, they are all symptoms of a single core need: coordinating{" "}
            <strong className="font-semibold text-neutral-900">environmental conditions</strong>,{" "}
            <strong className="font-semibold text-neutral-900">daily operations</strong>, and the{" "}
            <strong className="font-semibold text-neutral-900">guest experience</strong> as one system.
          </p>
        </div>

        {/* Primary & Supporting Problems */}
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          {/* Primary Core Challenge Card */}
          <article className="rounded-[2rem] border border-rockcreek-200 bg-rockcreek-50/70 p-6 md:col-span-12 md:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-start md:gap-8">
              
              {/* Left Column: Eyebrow + Title + Source */}
              <div className="flex flex-col justify-between md:col-span-5 md:h-full">
                <div>
                  <span className="font-mono text-xs font-black uppercase tracking-[0.24em] text-rockcreek-700">
                    Core Challenge
                  </span>
                  <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
                    Predictive Stream &amp; Activity Sensing
                  </h3>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-neutral-500 md:mt-8 md:text-sm">
                  Source: <cite className="not-italic font-medium text-neutral-700">Low Flows, Hot Trout</cite> — National Wildlife Federation
                </p>
              </div>

              {/* Right Column: Copy + Metric Badge */}
              <div className="flex flex-col justify-between border-t border-rockcreek-200/60 pt-6 md:col-span-7 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                  Rising stream temperatures trigger mandatory fishing closures that directly impact the resort&apos;s signature experience. The core design opportunity is anticipating hydrological disruptions early enough to adapt operations long before guests are impacted.
                </p>

                {/* Inline Impact Badge */}
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-rockcreek-200/80 bg-white/80 p-4 backdrop-blur-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-rockcreek-700 md:text-sm">
                    Impact
                  </span>
                  <span className="h-4 w-px bg-neutral-200" aria-hidden="true" />
                  <p className="text-sm font-medium text-neutral-700 md:text-base">
                    Unplanned activity cancellations &amp; guest experience degradation
                  </p>
                </div>
              </div>

            </div>
          </article>

          {/* Supporting Cards Grid */}
          <article className="flex flex-col justify-between rounded-[2rem] border border-neutral-200 bg-white p-6 md:col-span-6 md:p-8">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-neutral-400">
                Supporting System — Environmental
              </p>

              <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
                Fire-Resilient Space Design
              </h3>

              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Decades of fire suppression have increased wildfire risk across the
                landscape. Strategic forest stewardship reduces the likelihood of severe
                fire while protecting watersheds, habitat, and infrastructure.
              </p>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-neutral-500 md:text-sm">
              Sources: Montana Forest Consultants; Granite County CWPP
            </p>
          </article>

          <article className="flex flex-col justify-between rounded-[2rem] border border-neutral-200 bg-white p-6 md:col-span-6 md:p-8">
            <div>
              <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-neutral-400">
                Supporting System — Operational
              </p>

              <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
                Silent Mobility System
              </h3>

              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Across a 10-square-mile car-free property, mobility systems quietly
                connect people, places, and operations. When conditions change, they
                enable seamless adaptation without disrupting the guest experience.
              </p>
            </div>
          </article>
        </div>

        {/* Research Boundaries Box */}
        <div className="mt-10 rounded-[2rem] border border-neutral-200 bg-neutral-50/60 p-6 md:p-8">
          <h3 className="font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
            Research Boundaries
          </h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 md:p-6">
              <p className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.24em] text-emerald-700">
                <Check className="h-4 w-4" aria-hidden="true" />
                Established
              </p>

              <ul className="mt-4 space-y-2.5 text-base leading-relaxed text-neutral-700">
                <li>Published stream-temperature closure thresholds</li>
                <li>Regional wildfire-risk and forest-condition data</li>
                <li>Public sustainability and stewardship initiatives</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
              <p className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.24em] text-neutral-500">
                <X className="h-4 w-4" aria-hidden="true" />
                Not Claimed
              </p>

              <ul className="mt-4 space-y-2.5 text-base leading-relaxed text-neutral-600">
                <li>That a unified system exists today</li>
                <li>Any deployed or measured intervention</li>
                <li>Access to non-public operational, financial, or engineering data</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-500 md:text-base">
            Independent systems-design exploration based on public sources. No client
            relationship. All interventions are conceptual.
          </p>
        </div>
      </section>

      {/* Bottom Navigation Grid */}
      <section className={`${CONTENT_BOUNDS} border-t border-neutral-100 pb-16 pt-14 md:pb-24 md:pt-20`}>
        <div className="mb-8 md:mb-12">
          <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-rockcreek-700">
            Project Navigation
          </p>
          <h2 className="mt-2 font-tiempos text-3xl font-bold text-neutral-950 md:text-4xl">
            Explore the System
          </h2>
        </div>

        {/* Changed md:grid-cols-3 to lg:grid-cols-3 to break to single-column earlier */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 01 */}
          <Link
            href="/projects/rock-creek-os/explorer"
            className="group flex flex-col justify-between rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-rockcreek-300 hover:bg-rockcreek-50 hover:shadow-sm md:p-8"
          >
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-[0.24em] text-rockcreek-700">
                01 · Start Here
              </span>
              <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                Systems Explorer
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Four interactive investigations into the environmental, operational, and experience tensions shaping this model.
              </p>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 text-base font-bold text-rockcreek-700">
              Explore Problems
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          {/* Card 02 */}
          <Link
            href="/projects/rock-creek-os/systems"
            className="group flex flex-col justify-between rounded-[2rem] border border-neutral-200 bg-white p-6 transition-all hover:border-rockcreek-300 hover:bg-rockcreek-50 hover:shadow-sm md:p-8"
          >
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-[0.24em] text-neutral-400">
                02 · Architecture
              </span>
              <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                Systems Atlas
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Five core frameworks mapping how ecology, operations, and guest experience intersect:
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Ecosystem", "Rustic-Reliability", "Decision Arch", "Sovereignty", "Stewardship"].map((tag) => (
                  <span key={tag} className="rounded-md bg-neutral-100 px-2.5 py-1 font-mono text-xs font-medium text-neutral-600 group-hover:bg-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 text-base font-bold text-rockcreek-700">
              Explore Frameworks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          {/* Card 03 */}
          <Link
            href="/projects/rock-creek-os/dashboard"
            className="group flex flex-col justify-between rounded-[2rem] border border-neutral-200 bg-white p-6 transition-all hover:border-rockcreek-300 hover:bg-rockcreek-50 hover:shadow-sm md:p-8"
          >
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-[0.24em] text-neutral-400">
                03 · Prototype
              </span>
              <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                Environmental OS
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                An ops-center prototype with live telemetry across autonomy, stewardship, and operations—featuring a digital twin.
              </p>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 text-base font-bold text-rockcreek-700">
              Launch Ops Center
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}