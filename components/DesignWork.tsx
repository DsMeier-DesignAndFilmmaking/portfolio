// Static Work section: no client hooks, no global navigation behavior.
import Link from 'next/link';
import { Fragment } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
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
  description: string;
  items: string[];
  cta: string;
  href: string;
  icon: LucideIcon;
};

const hadeCore: WorkNode = {
  number: '01',
  title: 'HADE Core Engine',
  label: 'Core System',
  description:
    'A decision infrastructure system that turns live context into one trusted next action.',
  items: [
    'Context ingestion',
    'Adaptive decision logic',
    'Trust and confidence layer',
    'Human action surface',
  ],
  cta: 'Explore Core Engine',
  href: '/projects/travel-and-ai',
  icon: BrainCircuit,
};

const appliedModules: WorkNode[] = [
  {
    number: '02',
    title: 'Field Logistics',
    label: 'Travel + Exploration Module',
    description:
      'Applies HADE to live movement, weather, location, field notes, and real-world travel constraints.',
    items: [
      'Travel context',
      'Local signals',
      'Route viability',
      'Real-time adaptation',
    ],
    cta: 'Open Field Logistics',
    href: '/projects/field-notes',
    icon: MapPinned,
  },
  {
    number: '03',
    title: 'Digital Executor',
    label: 'Automation + Resolution Module',
    description:
      'Explores how HADE can move from recommendation into automated follow-through and operational recovery.',
    items: [
      'Service recovery',
      'Vendor coordination',
      'Multi-step workflows',
      'Resolution logic',
    ],
    cta: 'Explore Executor',
    href: '/projects/digital-executor',
    icon: Zap,
  },
];

const historicalFoundation: WorkNode = {
  number: '04',
  title: 'Work Foundations',
  label: 'EXPERIENCE & PRACTICE',
  description:
    'Ten years of client, agency, and product work that shaped the systems thinking behind HADE.',
  items: [
    'Healthcare',
    'Higher education',
    'Enterprise tools',
    'Commerce and data products',
    'And many more...',
  ],
  cta: 'View Previous Work',
  href: '/projects/previous',
  icon: Building2,
};

const ecosystemLayers = [
  {
    name: 'Core Engine',
    description: 'adaptive decision infrastructure',
  },
  {
    name: 'Field Logistics',
    description: 'travel and exploration systems',
  },
  {
    name: 'Digital Executor',
    description: 'autonomous execution workflows',
  },
  {
    name: 'Foundations',
    description: '10+ years designing products, systems, and experiences across industries. 40+ countries explored.',
  },
];

function EvidenceLine({ items }: { items: typeof ecosystemLayers }) {
  return (
    <ul className="flex w-full flex-col gap-2 text-sm leading-relaxed text-stone-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
      {items.map((item, index) => (
        <Fragment key={item.name}>
          {index > 0 && (
            <li aria-hidden="true" className="hidden text-stone-300/80 sm:block">
              /
            </li>
          )}
          <li className="min-w-0">
            <span className="font-bold text-stone-800">{item.name}</span>
            <span className="text-stone-500">: {item.description}</span>
          </li>
          {index < items.length - 1 && (
            <li aria-hidden="true" className="text-stone-300/80 sm:hidden">
              /
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
}

function NodeHeader({ node }: { node: WorkNode }) {
  const Icon = node.icon;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-[#fbf8f1] text-xs font-black text-stone-900">
          {node.number}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-amber-800 sm:tracking-[0.16em]">
            {node.label}
          </p>
        </div>
      </div>
      <Icon className="h-5 w-5 shrink-0 text-stone-400" aria-hidden="true" />
    </div>
  );
}

function NodeCta({ node, solid = false }: { node: WorkNode; solid?: boolean }) {
  const className = solid
    ? 'mt-7 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2'
    : 'mt-7 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4';

  return (
    <Link href={node.href} className={className}>
      <span className="min-w-0 whitespace-normal">{node.cta}</span>
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function ProofList({
  node,
  rule = true,
}: {
  node: WorkNode;
  rule?: boolean;
}) {
  return (
    <div className={rule ? 'mt-6 border-t border-stone-200 pt-5' : ''}>
      <div className="grid gap-3">
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
      className="relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-7"
    >
      <NodeHeader node={node} />

      <div className="mt-6 flex flex-1 flex-col">
        <h3 id={`work-node-${node.number}`} className="text-2xl font-bold leading-tight text-gray-950">
          {node.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-gray-700">{node.description}</p>
        <ProofList node={node} />
        <div className="flex-1" />
        <NodeCta node={node} />
      </div>
    </article>
  );
}

export default function DesignWork() {
  const HistoricalIcon = historicalFoundation.icon;

  return (
    <section id="work" className="relative bg-white pb-[96px] md:pb-[140px]" aria-label="Work">
      <div className="max-w-4xl mx-auto px-6 relative">
        <header className="relative pt-4 mb-8 md:mb-10">
          <div style={{ maxWidth: '576px', margin: '0 auto' }}>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Work / System Design & Architecture
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              DESIGNING & SHIPPING
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
            From Context to Action
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
              This project functions as a layered system: HADE Core Engine is the foundational decision infrastructure - which can serve as the core brain in a variety of industries and markets.
              
            </p>
            <div className="mt-5">
              <EvidenceLine items={ecosystemLayers} />
            </div>
          </div>
          </div>
        </header>

        <div
          className="section-header-spacing relative mb-20 md:mb-24"
          style={{ maxWidth: '576px', margin: '0 auto' }}
          aria-labelledby="hade-ecosystem-title"
        >
          <article
            aria-labelledby="work-node-01"
            className="relative overflow-hidden rounded-lg border border-stone-200/80 bg-[#fbf8f1] p-6 shadow-[0_18px_48px_rgba(56,45,28,0.07)] md:p-8"
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
            <div className="relative z-10">
              <NodeHeader node={hadeCore} />
              <h3
                id="work-node-01"
                className="mt-7 text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                {hadeCore.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg">
                {hadeCore.description}
              </p>
              <ProofList node={hadeCore} />
              <NodeCta node={hadeCore} solid />
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
                Two applied modules showing how the HADE system moves from decision logic into real-world use.
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
            className="rounded-lg border border-gray-200 bg-gray-950 p-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:p-8"
          >
            <div>
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-gray-950">
                <HistoricalIcon className="h-5 w-5" aria-hidden="true" />
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
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
                {historicalFoundation.description}
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                {historicalFoundation.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-white [&+&]:mt-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href={historicalFoundation.href}
                className="mt-7 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-gray-950 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                <span className="min-w-0 whitespace-normal">{historicalFoundation.cta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
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
