// Static Work section: no client hooks, no global navigation behavior.
import Link from 'next/link';
import { Fragment } from 'react';
import type { LucideIcon } from 'lucide-react';
import { HADE_DEMO_URL } from '@/app/projects/travel-and-ai/constants';
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Cpu,
  Layers3,
  MapPinned,
  ShieldCheck,
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
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
    ariaLabel?: string;
  };
  icon: LucideIcon;
};

const FIELD_NOTES_LIVE_PRODUCT_URL = 'https://downloadable-travel-packs.vercel.app/';

const hadeCore: WorkNode = {
  number: '01',
  title: 'HADE Core Engine',
  label: 'AI Decision Support',
  description:
    'Interprets live context signals and adaptive logic to turn changing conditions into clear, trusted next steps.',
  items: [
    'Context interpretation',
    'Adaptive decision logic',
    'Trust cues',
    'Clear next steps',
  ],
  cta: 'Explore System Design',
  href: '/projects/travel-and-ai',
  secondaryCta: {
    label: 'View Live Experience',
    href: HADE_DEMO_URL,
    external: true,
    ariaLabel: 'View HADE live demo in a new tab',
  },
  icon: BrainCircuit,
};

const appliedModules: WorkNode[] = [
  {
    number: '02',
    title: 'Architecture of Confidence',
    label: 'Systems Design Framework',
    description:
      'Explains how context, timing, cognitive load, human validation, and recovery paths help people act confidently in unfamiliar environments.',
    items: [
      'Context interpretation',
      'Confidence principles',
      'Autonomy preservation',
      'Recovery loops',
    ],
    cta: 'Explore Framework',
    href: '/projects/architecture-of-confidence',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Field Logistics',
    label: 'Place-Aware Product Design',
    description:
      'Interprets movement, weather, location, and local signals to support adaptive travel decisions in changing conditions.',
    items: [
      'Movement patterns',
      'Weather signals',
      'Travel conditions',
      'Environmental awareness',
    ],
    cta: 'Explore System Design',
    href: '/projects/field-notes',
    secondaryCta: {
      label: 'View Field Application',
      href: FIELD_NOTES_LIVE_PRODUCT_URL,
      external: true,
      ariaLabel: 'View Field Notes live product in a new tab',
    },
    icon: MapPinned,
  },
  {
    number: '04',
    title: 'Digital Executor',
    label: 'Operational Workflow Design',
    description:
      'Coordinates service recovery, vendor handoffs, workflow design, and resolution paths when real-world plans break down.',
    items: [
      'Service recovery',
      'Vendor coordination',
      'Workflow design',
      'Resolution paths',
    ],
    cta: 'Explore Case Study',
    href: '/projects/digital-executor',
    icon: Zap,
  },
];

const historicalFoundation: WorkNode = {
  number: '05',
  title: 'Professional Foundations',
  label: 'Shipped Client & Product Work',
  description:
    '10+ years delivering UX, product, and interface work across healthcare, education, enterprise, commerce, and emerging technology.',
  items: [
    'Healthcare products',
    'Education platforms',
    'Enterprise tools',
    'Commerce systems',
    'Data products',
  ],
  cta: 'View Previous Work',
  href: '/projects/previous',
  icon: Building2,
};

const ecosystemLayers = [
  {
    name: 'AI Decision Support',
    description: 'context interpretation and trusted next steps',
  },
  {
    name: 'Confidence Architecture',
    description: 'context, timing, autonomy, and recovery loops',
  },
  {
    name: 'Place-Aware Products',
    description: 'movement, weather, and travel conditions',
  },
  {
    name: 'Workflow Design',
    description: 'service recovery and resolution paths',
  },
  {
    name: 'Shipped Work',
    description: '10+ years delivering products across complex industries',
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
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-[#fbf8f1] text-xs font-semibold text-stone-900">
          {node.number}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium leading-snug text-amber-800">
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
    ? 'mt-8 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2'
    : 'mt-8 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4';

  if (node.secondaryCta) {
    const primaryClassName = solid
      ? 'group inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white/75 px-5 py-3 text-sm font-semibold text-gray-950 transition-all duration-200 ease-out hover:border-gray-400 hover:bg-white active:translate-y-px focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2'
      : 'group inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white/70 px-5 py-3 text-sm font-semibold text-blue-700 transition-all duration-200 ease-out hover:border-blue-300 hover:bg-white hover:text-blue-800 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4';
    const secondaryClassName = 'group inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 px-2 py-3 text-sm font-semibold text-gray-500 transition-all duration-200 ease-out hover:text-gray-900 active:translate-y-px focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-4';

    return (
      <div className="mt-8 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href={node.href} className={primaryClassName}>
          <span className="min-w-0 whitespace-normal">{node.cta}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <a
          href={node.secondaryCta.href}
          className={secondaryClassName}
          target={node.secondaryCta.external ? '_blank' : undefined}
          rel={node.secondaryCta.external ? 'noopener noreferrer' : undefined}
          aria-label={node.secondaryCta.ariaLabel}
        >
          <span className="min-w-0 whitespace-normal">{node.secondaryCta.label}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    );
  }

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
    <div className={rule ? 'mt-7 border-t border-stone-200 pt-6' : ''}>
      <div className="grid gap-y-3.5">
        {node.items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-gray-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
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
      className="relative flex h-full flex-col rounded-lg border border-gray-200 bg-white px-6 py-7 shadow-sm md:px-7 md:py-8"
    >
      <NodeHeader node={node} />

      <div className="mt-7 flex flex-1 flex-col">
        <h3 id={`work-node-${node.number}`} className="text-2xl font-bold leading-tight text-gray-950">
          {node.title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-gray-700">{node.description}</p>
        <ProofList node={node} />
        <div className="flex-1" />
        <NodeCta node={node} solid={Boolean(node.secondaryCta)} />
      </div>
    </article>
  );
}

export default function DesignWork() {
  const HistoricalIcon = historicalFoundation.icon;

  return (
    <section id="work" className="homepage-section relative bg-white" aria-label="Work">
      <div className="homepage-container relative">
        <header className="homepage-copy-column relative homepage-section-header">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-medium text-gray-600">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Evidence of Practice
            </span>
            <span className="inline-flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-medium text-gray-500">
              Built Work
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
            The work below shows that lens in practice: AI decision systems, place-aware products, service recovery workflows, and shipped client work across healthcare, education, enterprise, commerce, and emerging technology.
          </p>

          <div className="mt-7 rounded-lg border border-gray-200 bg-gray-50 p-5 md:mt-8">
            <p className="mb-3 text-sm font-medium text-gray-500">
              AI Decision Systems
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              HADE demonstrates how real-world context, AI reasoning, decision logic, and interface design can support clearer action across travel, service, and operational environments.
              
            </p>
            <div className="mt-5">
              <EvidenceLine items={ecosystemLayers} />
            </div>
          </div>
        </header>

        <div
          className="homepage-copy-column relative"
          aria-labelledby="hade-ecosystem-title"
        >
          <article
            aria-labelledby="work-node-01"
            className="relative overflow-hidden rounded-lg border border-stone-200/80 bg-[#fbf8f1] px-6 py-7 shadow-[0_18px_48px_rgba(56,45,28,0.07)] md:px-8 md:py-9"
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
                className="mt-8 text-3xl font-bold leading-tight text-gray-950 md:text-4xl"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                {hadeCore.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg">
                {hadeCore.description}
              </p>
              <ProofList node={hadeCore} />
              <NodeCta node={hadeCore} solid />
            </div>
          </article>

          <div className="h-10 md:relative md:mx-auto md:h-14 md:w-px md:bg-gray-200" aria-hidden="true" />

          <section aria-labelledby="applied-modules-title" className="relative">
            <div className="mb-8 flex flex-col items-start gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between md:mb-9">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Applied Products
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
                Three applied systems showing how decision logic moves into confidence, travel, and service use.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 md:gap-y-7">
              {appliedModules.map((node) => (
                <ModuleCard key={node.title} node={node} />
              ))}
            </div>
          </section>

          <div className="h-10 md:relative md:mx-auto md:h-14 md:w-px md:bg-gray-200" aria-hidden="true" />

          <section
            aria-labelledby="work-node-04"
            className="rounded-lg border border-gray-200 bg-gray-950 px-6 py-7 text-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:px-8 md:py-9"
          >
            <div>
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-gray-950">
                <HistoricalIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mb-4 text-sm font-medium text-gray-400">
                {historicalFoundation.label}
              </p>
              <h3
                id="work-node-04"
                className="text-3xl font-bold leading-tight text-white md:text-5xl"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                {historicalFoundation.title}
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300">
                {historicalFoundation.description}
              </p>

              <div className="mt-7 border-t border-white/10 pt-6">
                {historicalFoundation.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-white [&+&]:mt-3.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href={historicalFoundation.href}
                className="mt-8 inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                <span className="min-w-0 whitespace-normal">{historicalFoundation.cta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <div className="mx-auto mt-16 flex max-w-xl flex-col items-center justify-center gap-3 border-t border-stone-200 pt-8 text-center sm:mt-24">
  {/* A more relevant icon: Milestones/Layers/Network */}
  <Layers3 className="h-4 w-4 text-stone-400" aria-hidden="true" />
  
  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500">
    Evidence across AI products, field tools, service workflows, and shipped client work
  </p>
  
  <span className="text-xs font-medium tracking-wide text-stone-600">
    Decision support • Place-aware products • Operational workflows
  </span>
</div>
        </div>
      </div>
    </section>
  );
}
