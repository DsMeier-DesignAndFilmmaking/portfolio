// Static Work section: no client hooks, no global navigation behavior.
import Link from 'next/link';
import { Fragment } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Cpu,
  Layers3,
  MapPinned,
  Zap,
} from 'lucide-react';

type WorkNode = {
  number: string;
  title: string;
  label: string;
  role: string;
  description: string;
  listLabel: string;
  items: string[];
  cta: string;
  href: string;
  signal: string;
  icon: LucideIcon;
  scenario?: string;
};

const hadeCore: WorkNode = {
  number: '01',
  title: 'HADE Core Engine',
  label: 'Adaptive Decision Infrastructure',
  role: 'The orchestration layer behind every HADE experience.',
  description:
    'HADE is a context-aware decision architecture that transforms live environmental signals into actionable recommendations. Rather than generating more options, the system evaluates timing, trust, constraints, and relevance to surface a single confident next move.',
  listLabel: 'Key system layers',
  items: [
    'Context Ingestion',
    'Signal Translation',
    'Adaptive Decision Logic',
    'Trust & Confidence Layer',
    'Human Action Surface',
  ],
  cta: 'Explore Architecture',
  href: '/projects/travel-and-ai',
  signal:
    'Foundational SDK protocol, agentic reasoning model, schema logic, token orchestration, and decision infrastructure.',
  icon: BrainCircuit,
};

const appliedModules: WorkNode[] = [
  {
    number: '02',
    title: 'Module: Field Logistics',
    label: 'HADE Applied to Travel & Exploration',
    role: 'A live deployment of the HADE architecture within real-world movement systems.',
    description:
      'Field Logistics demonstrates how HADE operates inside dynamic travel and adventure environments where weather, timing, local conditions, energy level, spatial context, and field notes continuously evolve.',
    listLabel: 'Example signal stack',
    items: [
      'Rain onset detected',
      'Traveler moving through Chiado',
      'Low energy profile',
      'Verified local venue availability',
      'Detour still viable',
    ],
    cta: 'Open Field Logistics Case Study',
    href: '/projects/field-notes',
    signal:
      'Proves horizontal platform scalability. Travel is not a random project; it is an applied module using the HADE decision engine in high-variance physical environments.',
    icon: MapPinned,
    scenario:
      'Instead of forcing the traveler to repeatedly plan and re-plan, the module interprets changing conditions and identifies one viable next action.',
  },
  {
    number: '03',
    title: 'Module: The Digital Executor',
    label: 'Automated Resolution Infrastructure',
    role: 'Moving from recommendation into execution.',
    description:
      'The Digital Executor explores how autonomous systems can manage operational complexity after a decision has been made. If the Core Engine determines what should happen, the Executor handles what happens next.',
    listLabel: 'Potential execution domains',
    items: [
      'Vendor coordination',
      'Dynamic itinerary changes',
      'Credit issuance',
      'Reservation management',
      'Service recovery',
      'Multi-agent workflows',
    ],
    cta: 'Explore Execution Layer',
    href: '/projects/digital-executor',
    signal:
      'Shows HADE financial and operational utility through automated settlement, disruption handling, insurance logic, and multi-vendor resolution workflows.',
    icon: Zap,
  },
];

const historicalFoundation: WorkNode = {
  number: '04',
  title: 'Historical Foundations',
  label: 'Production Experience Behind the System',
  role: 'The practical foundation that informed the design of HADE.',
  description:
    'HADE was shaped by more than a decade of designing digital products, workflows, and operational systems across complex organizations. Those experiences revealed recurring patterns: information overload, decision fatigue, fragmented workflows, low trust in recommendations, and operational complexity.',
  listLabel: 'Experience domains',
  items: [
    'Healthcare access',
    'Higher education',
    'Food & CPG',
    'Enterprise dashboards',
    'Travel systems',
    'Commerce recovery',
    'Data products',
    'Brand platforms',
  ],
  cta: 'View Project Archive',
  href: '/projects/previous',
  signal:
    'Reframes older client and contract work as empirical production experience, not disconnected legacy projects.',
  icon: Building2,
};

const ecosystemLayers = [
  'HADE Core Engine: foundational decision infrastructure',
  'Field Logistics: real-world travel and adventure implementation',
  'Digital Executor: automated execution and resolution layer',
  'Historical Foundations: 10+ years of product, agency, and client work behind the system. Travel to over 40 countries.',
];

function EvidenceLine({ items }: { items: string[] }) {
  return (
    <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold leading-relaxed text-stone-700">
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <span aria-hidden="true" className="text-stone-300">
              /
            </span>
          )}
          <span className="min-w-0">{item}</span>
        </Fragment>
      ))}
    </div>
  );
}

function NodeHeader({ node }: { node: WorkNode }) {
  const Icon = node.icon;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-[#fbf8f1] text-xs font-black text-stone-900">
          {node.number}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-amber-800 sm:tracking-[0.18em]">
            {node.label}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-stone-700">
            {node.role}
          </p>
        </div>
      </div>
      <Icon className="h-5 w-5 shrink-0 text-stone-400" aria-hidden="true" />
    </div>
  );
}

function NodeCta({ node, solid = false }: { node: WorkNode; solid?: boolean }) {
  const className = solid
    ? 'mt-8 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2'
    : 'mt-8 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4';

  return (
    <Link href={node.href} className={className}>
      <span className="min-w-0 whitespace-normal">{node.cta}</span>
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function SystemList({ node, columns = false }: { node: WorkNode; columns?: boolean }) {
  return (
    <div className="mt-7 border-t border-stone-200 pt-6">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.08em] text-stone-600">
        {node.listLabel}
      </p>
      <div className={columns ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-3'}>
        {node.items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-gray-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ node }: { node: WorkNode }) {
  return (
    <article
      aria-labelledby={`work-node-${node.number}`}
      className="relative h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8"
    >
      <NodeHeader node={node} />

      <div className="mt-7">
        <h3 id={`work-node-${node.number}`} className="text-2xl font-bold leading-tight text-gray-950">
          {node.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-gray-700">{node.description}</p>
        {node.scenario && (
          <p className="mt-5 border-l-2 border-amber-700/40 pl-4 text-sm font-semibold leading-relaxed text-gray-800">
            {node.scenario}
          </p>
        )}
        <SystemList node={node} />
        <div className="mt-7 border-t border-gray-200 pt-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] text-stone-600">
            Hiring / Founder Signal
          </p>
          <p className="text-sm leading-relaxed text-gray-600">{node.signal}</p>
        </div>
        <NodeCta node={node} />
      </div>
    </article>
  );
}

export default function DesignWork() {
  return (
    <section id="work" className="relative bg-white pb-[96px] md:pb-[140px]" aria-label="Work">
      <div className="max-w-4xl mx-auto px-6 relative">
        <header className="relative pt-4 mb-20 md:mb-24">
          <div className="section-header-spacing" style={{ maxWidth: '576px', margin: '0 auto' }}>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Work / System Architecture
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Active Build
            </span>
          </div>

          <h1
            id="hade-ecosystem-title"
            className="hero-title font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left"
            style={{
              fontSize: 'clamp(2.125rem, 4.5vw, 3.75rem)',
              whiteSpace: 'normal',
              fontFamily: "'tiempos-headline-regular', serif",
              marginBottom: 'calc(1.32 * 1.5rem)',
            }}
          >
            <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">
              Systems and Architecture
            </span>
          </h1>

          <p
            className="text-xl text-gray-700 leading-relaxed"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}
          >
            My approach is rooted in systems thinking. I focus on how people, interfaces, environments, and technology interact as part of a larger whole, designing products that adapt to real-world context.
          </p>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
              HADE Ecosystem
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              This portfolio reads as a layered system: HADE Core Engine is the foundational decision infrastructure,
              Field Logistics is the real-world travel and adventure implementation, Digital Executor is the automated
              execution and resolution layer, and Historical Foundations represent the 10+ years of product, agency,
              and client work that made the system credible.
            </p>
            <div className="mt-5">
              <EvidenceLine items={ecosystemLayers} />
            </div>
          </div>
          </div>
        </header>

        <div
          className="section-header-spacing relative pt-4 mb-20 md:mb-24"
          style={{ maxWidth: '576px', margin: '0 auto' }}
          aria-labelledby="hade-ecosystem-title"
        >
          <article
            aria-labelledby="work-node-01"
            className="relative overflow-hidden rounded-lg border border-stone-200/80 bg-[#fbf8f1] p-6 shadow-[0_18px_48px_rgba(56,45,28,0.07)] md:p-9"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 88% 14%, rgba(217,119,6,0.09), transparent 30%),
                  linear-gradient(90deg, rgba(255,255,255,0.72), rgba(255,255,255,0.46))
                `,
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <NodeHeader node={hadeCore} />
                <h3
                  id="work-node-01"
                  className="mt-8 text-3xl font-bold leading-tight text-gray-950 md:text-5xl"
                  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                >
                  {hadeCore.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg">
                  {hadeCore.description}
                </p>
                <NodeCta node={hadeCore} solid />
              </div>

              <div className="border-t border-stone-200 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <SystemList node={hadeCore} />
                <div className="mt-7 border-t border-stone-200 pt-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] text-stone-600">
                    Hiring / Founder Signal
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700">{hadeCore.signal}</p>
                </div>
              </div>
            </div>
          </article>

          <div className="relative mx-auto hidden h-12 w-px bg-gray-200 md:block" aria-hidden="true" />

          <section aria-labelledby="applied-modules-title" className="relative">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">
                  Applied Modules
                </p>
                <h3
                  id="applied-modules-title"
                  className="mt-3 text-2xl font-bold leading-tight text-gray-950 md:text-4xl"
                  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                >
                  HADE in motion
                </h3>
              </div>
              <p className="max-w-sm text-sm font-semibold leading-relaxed text-gray-600">
                Two applied branches show the same decision engine operating in physical and operational environments.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {appliedModules.map((node) => (
                <ModuleCard key={node.title} node={node} />
              ))}
            </div>
          </section>

          <div className="relative mx-auto hidden h-12 w-px bg-gray-200 md:block" aria-hidden="true" />

          <section
            aria-labelledby="work-node-04"
            className="rounded-lg border border-gray-200 bg-gray-950 p-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:p-9"
          >
            <div className="space-y-8">
              <div>
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-gray-950">
                  <historicalFoundation.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-gray-400">
                  {historicalFoundation.label}
                </p>
                <h3
                  id="work-node-04"
                  className="text-3xl font-bold leading-tight text-white md:text-5xl"
                  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                >
                  {historicalFoundation.title}
                </h3>
                <p className="mt-5 text-base font-semibold leading-relaxed text-gray-200">
                  {historicalFoundation.role}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
                  {historicalFoundation.description}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="mb-5 flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-blue-300" aria-hidden="true" />
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-gray-300">
                    {historicalFoundation.listLabel}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {historicalFoundation.items.map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="text-sm font-bold leading-snug text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] text-gray-400">
                  Hiring / Founder Signal
                </p>
                <p className="max-w-2xl text-sm leading-relaxed text-gray-300">{historicalFoundation.signal}</p>
                <Link
                  href={historicalFoundation.href}
                  className="mt-7 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-gray-950 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950"
                >
                  <span className="min-w-0 whitespace-normal">{historicalFoundation.cta}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <div className="mx-auto mt-12 flex max-w-3xl items-center justify-center gap-3 border-t border-gray-200 pt-8 text-center text-sm font-semibold text-gray-500">
            <Cpu className="h-4 w-4" aria-hidden="true" />
            <span>Infrastructure to applied modules to production foundations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
