import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PracticeNav from '@/components/PracticeNav';
import PipelineSection from './PipelineSection';
import { CONTENT_BOUNDS, COPY_MAX_WIDTH } from './layoutClasses';
import { independentResearchProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Systems Design Practice',
  description:
    'The intellectual home of an independent systems design practice — its thesis, method, capabilities, research pipeline, and how ideas are developed and validated across environmental, AI, and operational systems.',
  alternates: { canonical: '/practice' },
};

// ── How the practice thinks (manifesto) ────────────────────────────────────
const PRINCIPLES = [
  {
    title: 'Read the system before designing it.',
    body: 'Most visible problems are symptoms. The work begins by mapping where information, decisions, and operations actually break down — the discipline of reading an environment before changing it.',
  },
  {
    title: 'Structure is the real product.',
    body: 'Screens change; structure endures. The practice designs the component, information, and decision architecture a product or operation can grow against without losing coherence.',
  },
  {
    title: 'Design for the moment conditions break.',
    body: 'Real systems degrade. The practice designs the fallback, recovery, and adaptive logic that keep people oriented — and in control — when conditions shift.',
  },
] as const;

// ── Capability map ─────────────────────────────────────────────────────────
// One durable model — See it · Decide it · Build it. These three capabilities
// are the source of truth; the service engagements derive from them, and every
// project below demonstrates one or more of them in a domain.
const CAPABILITIES = [
  {
    verb: 'See it',
    title: 'Systems Diagnosis',
    body: 'Reading a system — physical, digital, or operational — to locate where information, decisions, and hand-offs break down.',
  },
  {
    verb: 'Decide it',
    title: 'Adaptive Logic',
    body: 'Defining how a system decides and behaves as conditions change: decision rules, state, AI and agent workflows, fallback and recovery.',
  },
  {
    verb: 'Build it',
    title: 'Structural Architecture',
    body: 'Designing the component, information, and decision architecture — and the governing rules — a system can scale against.',
  },
] as const;

// The contexts the capabilities are applied in. Peers, not separate practices —
// which is how environmental systems and AI systems coexist here.
const DOMAINS = [
  'Environmental systems',
  'AI systems',
  'Outdoor hospitality & operations',
  'Digital products',
] as const;

// ── How ideas are validated ────────────────────────────────────────────────
const VALIDATION = [
  {
    title: 'Advanced modeling',
    body: 'Concepts are pressure-tested through modeling and prototypes before they touch the real world.',
  },
  {
    title: 'Real-world construction',
    body: 'Frameworks are built and observed in real environments — from landscape construction to field study across 40+ countries.',
  },
  {
    title: 'Enterprise delivery',
    body: 'The same thinking has shipped across a decade of enterprise, healthcare, and commerce work.',
  },
] as const;

export default function PracticePage() {
  return (
    <>
      <PracticeNav />

      <main>
        {/* ── Hero / manifesto ─────────────────────────────────────────── */}
        <section id="practice-hero" className="bg-white mt-[100px] pb-16 md:pb-24" aria-labelledby="practice-headline">
          <div className={CONTENT_BOUNDS}>
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                Systems Design Practice
              </p>

              <h1
                id="practice-headline"
                className="mt-4 text-balance font-tiempos text-4xl font-bold leading-[1.05] text-neutral-950 md:text-6xl"
              >
                Designing the systems beneath products, places, and decisions.
              </h1>

              <p className="mt-5 text-pretty font-tiempos text-xl italic text-neutral-500 md:text-2xl">
                An independent systems design practice — where field observation becomes frameworks, prototypes, and proof.
              </p>

              <div className={`mt-6 ${COPY_MAX_WIDTH} space-y-4 text-pretty text-lg leading-relaxed text-neutral-600`}>
                <p>
                  Most teams do not have a design problem; they have a systems problem. This is the working home for how that problem is read, structured, and resolved — a body of frameworks, concepts, and builds kept open for inspection.
                </p>
                <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                  <a
                    href="#capabilities"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-4"
                  >
                    Explore the practice
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-4"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Principles / how it thinks (manifesto) ───────────────────── */}
        <section
          className="border-t border-neutral-100 bg-white pb-16 md:pb-20"
          aria-labelledby="principles-title"
        >
          <div className={CONTENT_BOUNDS}>
            <div className={`${COPY_MAX_WIDTH} mb-10 pt-16`}>
              <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                How It Thinks
              </p>
              <h2
                id="principles-title"
                className="text-balance font-tiempos text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
              >
                Three convictions underneath the work.
              </h2>
            </div>

            <dl className="grid gap-x-8 gap-y-8 md:grid-cols-3">
              {PRINCIPLES.map((principle, i) => (
                <div key={principle.title}>
                  <dt className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] font-black text-amber-700">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-tiempos text-xl font-bold leading-tight text-neutral-950 text-balance">
                      {principle.title}
                    </span>
                  </dt>
                  <dd className="mt-3 text-pretty text-[1.02rem] leading-relaxed text-gray-700">
                    {principle.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Capability map ───────────────────────────────────────────── */}
        <section
          id="capabilities"
          className="scroll-mt-24 border-y border-neutral-100 bg-neutral-50 py-16"
          aria-labelledby="capabilities-title"
        >
          <div className={CONTENT_BOUNDS}>
            <div className={`${COPY_MAX_WIDTH} mb-8`}>
              <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                Capability Map
              </p>
              <h2
                id="capabilities-title"
                className="text-balance font-tiempos text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
              >
                See it. Decide it. Build it.
              </h2>
              <p className="mt-4 text-pretty text-[1.02rem] leading-relaxed text-gray-700">
                Three durable capabilities run through every framework, concept, and build — and every engagement derives from them.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {CAPABILITIES.map((cap) => (
                <article
                  key={cap.title}
                  className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-7"
                >
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                    {cap.verb}
                  </span>
                  <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950 text-balance">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[1.02rem] leading-relaxed text-gray-700">
                    {cap.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Applied across
              </p>
              <ul className="flex flex-wrap gap-2">
                {DOMAINS.map((domain) => (
                  <li
                    key={domain}
                    className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700"
                  >
                    {domain}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-2xl text-pretty text-[1.02rem] leading-relaxed text-gray-700">
                The same three capabilities travel across every domain — which is why environmental systems and AI systems are neighbors in this practice, not separate disciplines.
              </p>
            </div>
          </div>
        </section>

        {/* ── Method / how ideas are developed ─────────────────────────── */}
        <section
          id="method"
          className="scroll-mt-24 bg-white pt-16"
          aria-labelledby="method-title"
        >
          <div className={CONTENT_BOUNDS}>
            <div className={COPY_MAX_WIDTH}>
              <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                The Method
              </p>
              <h2
                id="method-title"
                className="text-balance font-tiempos text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
              >
                How ideas are developed.
              </h2>
              <p className="mt-4 text-pretty text-[1.02rem] leading-relaxed text-gray-700">
                Field research becomes a framework. A framework becomes a concept. A concept becomes a build — each stage tested before it earns the next. The pipeline below is the practice in motion.
              </p>
            </div>
          </div>
        </section>

        {/* ── Pipeline accordion (research hub) ─────────────────────────── */}
        <PipelineSection projects={independentResearchProjects} />

        {/* ── Validation / how ideas are proven ────────────────────────── */}
        <section
          className="border-y border-neutral-100 bg-neutral-50 py-16"
          aria-labelledby="validation-title"
        >
          <div className={CONTENT_BOUNDS}>
            <div className={`${COPY_MAX_WIDTH} mb-8`}>
              <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                Validation
              </p>
              <h2
                id="validation-title"
                className="text-balance font-tiempos text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
              >
                How ideas are proven.
              </h2>
              <p className="mt-4 text-pretty text-[1.02rem] leading-relaxed text-gray-700">
                Nothing here rests on assertion. Frameworks are modeled, built, and carried into environments that do not cooperate.
              </p>
            </div>

            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {VALIDATION.map((item) => (
                <div key={item.title}>
                  <dt className="text-lg font-semibold leading-tight text-neutral-950">
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-pretty text-[1.02rem] leading-relaxed text-gray-700">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <Link
                href="/projects/previous"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-4"
              >
                See the delivery record
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Work with the practice (educational-first close) ─────────── */}
        <section
          className="bg-white py-16 md:py-20"
          aria-labelledby="work-with-title"
        >
          <div className={CONTENT_BOUNDS}>
            <div className="max-w-3xl">
              <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                Work With the Practice
              </p>
              <h2
                id="work-with-title"
                className="text-balance font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-4xl"
              >
                Start with the thinking.
              </h2>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-600">
                The practice is a body of work in progress. Read the frameworks, follow the research, and take what is useful. When there is a system worth solving together, the engagements are one step away.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects/environmental-systems-design-os"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-4"
                >
                  Explore the Research OS
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-4"
                >
                  See Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
