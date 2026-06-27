import type { Metadata } from 'next';
import Link from 'next/link';
import PracticeNav from '@/components/PracticeNav';
import PipelineSection from './PipelineSection';
import { CONTENT_BOUNDS, COPY_MAX_WIDTH } from './layoutClasses';
import { independentResearchProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Systems Design Practice',
  description:
    'An independent systems design practice developing frameworks, concepts, and experimental products that explore decision-making, outdoor hospitality, stewardship, and environmental complexity.',
};

const CAPABILITY_LIBRARY = [
  {
    label: 'Signature framework',
    title: 'Architecture of Confidence',
    body: 'Decision support, trust, recovery, and confidence-building in complex service environments.',
    href: '/projects/architecture-of-confidence',
  },
  {
    label: 'Research infrastructure',
    title: 'Environmental Systems Design OS',
    body: 'A working system for turning field observation into patterns, frameworks, concepts, and resources.',
    href: '/projects/environmental-systems-design-os',
  },
  {
    label: 'Environmental systems',
    title: 'Responsive Ecologies',
    body: 'Adaptive stewardship, land operations, climate signals, and ecological decision support.',
    href: '/projects/responsive-ecologies',
  },
  {
    label: 'Outdoor hospitality',
    title: 'Adaptive Outdoor Hospitality Companion',
    body: 'Guest guidance, operational recovery, stewardship, and confidence-centered hospitality systems.',
    href: '/projects/adaptive-ranch-experience-companion',
  },
  {
    label: 'AI trust layer',
    title: 'Trust Framework for AI Travel',
    body: 'Verification, provenance, and auditable recommendations inside adaptive AI product systems.',
    href: '/projects/travel-and-ai/projects/trust-framework-ai-travel',
  },
  {
    label: 'Wayfinding logic',
    title: 'Wayfinding Matrix',
    body: 'Environmental cues, timing, safety signals, and low-friction guidance in physical places.',
    href: '/projects/wayfinding-matrix',
  },
] as const;

export default function ResearchPracticePage() {
  return (
    <>
      <PracticeNav />

      <main>
        {/* ── Hero / thesis ────────────────────────────────────────────── */}
        <section
          className="bg-white pb-16 pt-32"
          aria-labelledby="hub-headline"
        >
          <div className={CONTENT_BOUNDS}>
            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              Public Practice Front Door
            </p>

            <h1
              id="hub-headline"
              className="text-balance text-4xl font-bold leading-tight text-gray-950 md:text-5xl"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              Independent systems design practice.
              <br />
              Research, frameworks, proof, and hireable offers.
            </h1>

            <div className={`mt-7 ${COPY_MAX_WIDTH} space-y-4 text-[1.05rem] leading-relaxed text-gray-700 text-pretty`}>
              <p>
                This is the public operating layer for my independent systems design practice:
                the place where field observation becomes frameworks, frameworks become applied
                concepts, and concepts become prototypes, audits, resources, or consulting
                engagements.
              </p>
              <p>
                The focus is where physical environments, service operations, digital products,
                and adaptive technology meet. The work is organized so a visitor can understand
                the thesis, inspect the methods, review the proof, and move toward a concrete
                engagement.
              </p>
              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-4"
                >
                  Work With Me
                </Link>
                <Link
                  href="/projects/previous"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-4"
                >
                  View Professional Validation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Capability library ───────────────────────────────────────────── */}
        <section
          className="border-y border-neutral-100 bg-neutral-50 py-16"
          aria-labelledby="capability-library-title"
        >
          <div className={CONTENT_BOUNDS}>
            <div className={`${COPY_MAX_WIDTH} mb-8`}>
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Framework / Capability Library
              </p>
              <h2
                id="capability-library-title"
                className="text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                Reusable methods behind the practice.
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-gray-700 text-pretty">
                These are the clearest current capabilities: the frameworks, systems concepts,
                and product layers that can become audits, workshops, reports, prototypes, or
                client engagements.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {CAPABILITY_LIBRARY.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-4"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-neutral-950 underline-offset-4 group-hover:underline">
                    Explore capability
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pipeline accordion ───────────────────────────────────────── */}
        <PipelineSection projects={independentResearchProjects} />
      </main>
    </>
  );
}
