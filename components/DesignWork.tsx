// Static Work section: no client hooks, no global navigation behavior.
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Cpu,
  Layers3,
  MapPinned,
  Network,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

const agenticStack = [
  {
    icon: MapPinned,
    step: '01',
    layer: 'Signal',
    metaphor: 'Substrate',
    functionalLabel: 'Substrate: Data Architecture',
    schematic: 'Environmental Signal Ingestion',
    title: 'Ingesting live environmental context',
    body: 'Weather shifts, local field notes, venue status, crowd patterns, and traveler state become structured inputs for the system.',
  },
  {
    icon: BrainCircuit,
    step: '02',
    layer: 'Logic',
    metaphor: 'The Brain',
    functionalLabel: 'Decision Logic: Agentic Reasoning',
    schematic: 'Context Translation Engine',
    title: 'Translating signals into a confident suggestion',
    body: 'The engine evaluates timing, energy, trust thresholds, and interruption cost before deciding whether the moment is worth surfacing.',
  },
  {
    icon: Sparkles,
    step: '03',
    layer: 'Action',
    metaphor: 'The Glass',
    functionalLabel: 'Interface Layer: Decision Surface',
    schematic: 'Real-World Action Surface',
    title: 'Enabling spontaneous real-world decisions',
    body: 'The interface presents one legible move with enough provenance to act immediately, without forcing another planning session.',
  },
];

const urbanLayers = [
  {
    icon: MapPinned,
    label: 'Signal Layer',
    title: 'Urban telemetry',
    body: 'A rainy Lisbon walk becomes a live decision state: location, weather persistence, venue availability, energy level, and local field notes.',
  },
  {
    icon: BrainCircuit,
    label: 'Logic Layer',
    title: 'Adaptive synthesis',
    body: 'HADE suppresses generic recommendations and tests whether the detour is viable, timely, trustworthy, and worth the interruption.',
  },
  {
    icon: Sparkles,
    label: 'Action Layer',
    title: 'One ambient nudge',
    body: 'The traveler receives a single move, such as a covered gallery loop, with a compact logic receipt instead of another list to parse.',
  },
];

const technicalProof = [
  {
    icon: Network,
    label: 'Deep-Dive 01',
    title: 'Agentic Architecture',
    body: 'A modular decision stack that connects context ingestion, suggestion logic, trust calibration, adaptation loops, and interface surfaces.',
    proof: ['Context engine', 'Suggestion engine', 'Adaptation loop'],
    href: '/projects/travel-and-ai',
    cta: 'View architecture',
  },
  {
    icon: ShieldCheck,
    label: 'Deep-Dive 02',
    title: 'Trust Logic',
    body: 'A transparency layer that turns AI reasoning into auditable product language through source freshness, confidence, and logic receipts.',
    proof: ['Logic receipts', 'Source freshness', 'Confidence thresholds'],
    href: '/projects/field-notes#fn-trust',
    cta: 'Explore trust layer',
  },
];

const partnerships = [
  'Healthcare access',
  'Higher education',
  'Food and CPG',
  'Enterprise dashboards',
  'Travel systems',
  'Commerce recovery',
  'Data products',
  'Brand platforms',
];

export default function DesignWork() {
  return (
    <section id="work" className="relative bg-white pb-[96px] md:pb-[140px]" aria-label="Design Work">
      <div className="space-y-20 md:space-y-28">
      <header className="max-w-4xl mx-auto px-6 relative pt-4 mb-20 md:mb-24"> 
  {/* Added mb-20 md:mb-28 to match your internal section spacing */}
  <div className="section-header-spacing" style={{ maxWidth: '576px', margin: '0 auto' }}>
    <h1
      className="hero-title font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left"
      style={{
        fontSize: 'clamp(2.125rem, 4.5vw, 3.75rem)',
        whiteSpace: 'normal',
        fontFamily: "'tiempos-headline-regular', serif",
        marginBottom: 'calc(1.32 * 1.5rem)',
      }}
    >
      <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">
        Design Work
      </span>
    </h1>

    <p
      className="text-xl text-gray-700 leading-relaxed"
      style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}
    >
      My approach is rooted in systems thinking. I focus on how people, interfaces, environments, and technology interact as part of a larger whole, designing products that adapt to real-world context.
    </p>
  </div>
</header>

{/* Main Content Wrapper */}
<div className="section-header-spacing" style={{ maxWidth: '576px', margin: '0 auto' }}>
  <div className="space-y-20 md:space-y-28">
    <section aria-labelledby="hade-system-title">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
          <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
          Macro // Philosophy
        </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                Active Build
              </span>
            </div>

            <h2
            id="hade-system-title"
            className="font-sf-pro-display text-left text-[clamp(2.25rem,5vw,3.00rem)] font-bold leading-[0.98] tracking-tight text-gray-950"
            style={{ fontFamily: "'tiempos-headline-regular', serif" }}
          >
            HADE: Human Adaptive Decision Engine
          </h2>

            <p
              className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl"
              style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
            >
              HADE explores a different approach: a real-time system that interprets live signals from context and turns them into high-confidence travel suggestions for spontaneous discovery.
            </p>

            <div className="mt-12">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">
                    Agentic Stack
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    Flagship Pilot: Urban Exploration &amp; Travel
                  </p>
                </div>
                <p className="hidden text-right text-xs font-semibold uppercase tracking-[0.14em] text-gray-400 sm:block">
                  Data architecture to decision surface
                </p>
              </div>

              <div className="grid overflow-hidden rounded-lg border border-gray-200 bg-white md:grid-cols-3 md:divide-x md:divide-gray-200">
                {agenticStack.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.layer} className="flex flex-col border-b border-gray-200 bg-gray-50 last:border-b-0 md:border-b-0">
                      <div className="flex items-center justify-between gap-4 bg-gray-950 px-5 py-4 text-white">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-200">
                          {item.step} // {item.layer}
                        </p>
                        <Icon className="h-4 w-4 text-blue-200" aria-hidden="true" />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                          {item.metaphor}
                        </p>
                        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-600">
                          {item.functionalLabel}
                        </p>
                        <h2 className="text-lg font-bold leading-snug text-gray-950">{item.title}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.body}</p>
                        <div className="mt-6 border-t border-gray-200 pt-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                            Schematic
                          </p>
                          <p className="mt-1 text-sm font-semibold text-gray-900">{item.schematic}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Meso: flagship application */}
          <section aria-labelledby="flagship-work-title" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">
                  Meso // Flagship Application
                </p>
                <h2
                  id="flagship-work-title"
                  className="text-3xl font-bold leading-tight text-gray-950 md:text-5xl"
                  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                >
                  Urban Exploration Case Study
                </h2>
              </div>

              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                The flagship case study shows how HADE moves from system philosophy into a product experience: detecting urban signals, reasoning through travel constraints, and surfacing one high-confidence action at the right moment.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {urbanLayers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.label} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-gray-950 shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">{layer.label}</p>
                    <h3 className="text-xl font-bold leading-snug text-gray-950">{layer.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{layer.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-lg bg-gray-950 text-white">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-6 md:p-10">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
                    <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                    HADE Live Scenario
                  </div>
                  <h3
                    className="max-w-xl text-2xl font-bold leading-tight md:text-4xl"
                    style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                  >
                    It starts raining. The system turns uncertainty into a move.
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
                    Instead of asking the traveler to re-plan, HADE checks live weather, movement state, field-note provenance, and detour viability, then offers a route that keeps exploration alive.
                  </p>
                  <Link
                    href="/projects/travel-and-ai"
                    className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-gray-950 transition-colors hover:bg-blue-100"
                  >
                    <span>Open flagship case study</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="border-t border-white/10 bg-white/[0.04] p-6 md:p-10 lg:border-l lg:border-t-0">
                  <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Logic Receipt</p>
                  <div className="space-y-4">
                    {[
                      ['Input', 'Rain onset, 85% confidence, Chiado active'],
                      ['Constraint', 'Stay in motion, low energy drain, 12 min route'],
                      ['Trust', 'Field note verified, venue open, crowd density low'],
                      ['Output', 'Covered gallery loop with arrival confidence'],
                    ].map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[88px_1fr] gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">{label}</span>
                        <span className="text-sm leading-relaxed text-gray-200">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Micro: technical proof and history */}
          <section aria-labelledby="technical-proof-title" className="space-y-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">
                Micro // Technical Proof
              </p>
              <h2
                id="technical-proof-title"
                className="text-3xl font-bold leading-tight text-gray-950 md:text-5xl"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                The system is backed by architecture, not just screens.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {technicalProof.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-7 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-950 text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">{item.label}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-950">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600">{item.body}</p>
                    <div className="mt-7 grid gap-3">
                      {item.proof.map((proof) => (
                        <div key={proof} className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                          <span>{proof}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={item.href}
                      className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-blue-600 transition-colors hover:text-blue-800"
                    >
                      <span>{item.cta}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="partnerships-title" className="space-y-8">
            <div className="section-header-spacing" style={{ maxWidth: '576px', margin: '0 auto' }}>
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">
                Foundation // Partnerships
              </p>
              <h2
                id="partnerships-title"
                className="text-3xl font-bold leading-tight text-gray-950 md:text-5xl"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                The Foundational Experience that Informed HADE
              </h2>
              <p className="mt-5 text-base leading-relaxed text-gray-600">
                The systems work sits on a long foundation of client, contract, freelance, and full-time design partnerships across complex organizations.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-950 text-white">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-gray-500">
                  10+ Years
                </p>
                <p className="mt-5 text-base leading-relaxed text-gray-600">
                  Prior roles and partnerships gave the HADE work its practical base: complex stakeholders, real constraints, operational systems, and product surfaces that needed to hold up outside ideal conditions.
                </p>
                <Link
                  href="/projects/previous"
                  className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-gray-950 transition-colors hover:border-gray-950"
                >
                  <span>View project archive</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {partnerships.map((partnership) => (
                  <div key={partnership} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <BookOpen className="mb-5 h-4 w-4 text-gray-400" aria-hidden="true" />
                    <p className="text-sm font-bold leading-snug text-gray-900">{partnership}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 border-t border-gray-200 pt-8 text-center text-sm font-semibold text-gray-500">
            <Cpu className="h-4 w-4" aria-hidden="true" />
            <span>Macro philosophy to flagship application to technical proof to professional foundation</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
