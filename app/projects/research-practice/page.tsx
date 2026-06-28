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

// High-level vocabulary of the practice. Intentionally project-agnostic — the
// specific projects live (and only live) inside the pipeline stages below.
const PRACTICE_CAPABILITIES = [
  {
    title: 'Systems Infrastructure',
    body: 'Turning raw field observations into reusable pattern libraries and operational frameworks.',
  },
  {
    title: 'Decision Support & Wayfinding',
    body: 'Designing ambient, low-friction guidance systems that reduce uncertainty and preserve human agency.',
  },
  {
    title: 'Adaptive Stewardship',
    body: 'Building telemetry-driven, multi-agent AI concepts for land management and remote operations.',
  },
  {
    title: 'Service Recovery',
    body: 'Creating frameworks and digital tools that help operations and guests pivot gracefully when conditions break.',
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
              The public canvas for an independent systems design practice.
              This is where field observations are built into frameworks, prototypes, and applied strategies. The focus is the convergence of physical environments, service operations, digital products, and adaptive technology—designed for clear inspection and direct collaboration.
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

        {/* ── Practice capabilities overview ───────────────────────────────── */}
        <section
          className="border-y border-neutral-100 bg-neutral-50 py-16"
          aria-labelledby="practice-capabilities-title"
        >
          <div className={CONTENT_BOUNDS}>
            <div className={`${COPY_MAX_WIDTH} mb-8`}>
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Practice Capabilities
              </p>
              <h2
                id="practice-capabilities-title"
                className="text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                The vocabulary of the practice.
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-gray-700 text-pretty">
                Four capabilities run through every framework, concept, and build below —
                the through-lines the pipeline turns into applied work.
              </p>
            </div>

            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {PRACTICE_CAPABILITIES.map((cap) => (
                <div key={cap.title}>
                  <dt className="text-lg font-semibold leading-tight text-neutral-950">
                    {cap.title}
                  </dt>
                  <dd className="mt-2 text-[1.02rem] leading-relaxed text-gray-700 text-pretty">
                    {cap.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Pipeline accordion ───────────────────────────────────────── */}
        <PipelineSection projects={independentResearchProjects} />
      </main>
    </>
  );
}
