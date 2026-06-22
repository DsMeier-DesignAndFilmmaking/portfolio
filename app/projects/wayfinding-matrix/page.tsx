import {
  AlertTriangle,
  ArrowDown,
  Binoculars,
  Compass,
  Eye,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import WayfindingMatrixProjectHeader from './ProjectHeader';
import AmbientGuidanceDiagram from './components/AmbientGuidanceDiagram';
import HeroLandscape from './components/HeroLandscape';
import NotionOSArchitecture from './components/NotionOSArchitecture';
import PrototypeRoadmap from './components/PrototypeRoadmap';
import SignalMatrix, { SystemModel } from './components/SignalMatrix';
import {
  guestJourney,
  operationsCapabilities,
  opportunityCards,
  problemCards,
  projectFrame,
  projectMetadata,
  sectionNavigation,
} from './content';

const contentBounds = 'container mx-auto px-6 md:px-8';

export default function WayfindingMatrixPage() {
  return (
    <div className="wayfinding-matrix-root min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-emerald-200/50">
      <style>{`
        @media (max-width: 1023px) and (max-height: 650px) {
          .wayfinding-matrix-root nav[aria-label='Page section navigation'] {
            top: 55% !important;
            gap: 0.125rem !important;
          }

          .wayfinding-matrix-root nav[aria-label='Page section navigation'] > button {
            padding-top: 0.2rem !important;
            padding-bottom: 0.2rem !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wayfinding-matrix-root,
          .wayfinding-matrix-root * {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <a
        href="#wayfinding-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        Skip to The Wayfinding Matrix content
      </a>

      <PageNavIndicator sections={[...sectionNavigation]} showDotsOnDesktop />
      <WayfindingMatrixProjectHeader />
      <HeroLandscape />

      <section id="project-frame" aria-labelledby="project-frame-title" className="scroll-mt-20 bg-neutral-950 py-16 text-white md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="project-frame-title"
            eyebrow="02 // Project Frame"
            title={'A navigation framework for attention-scarce, condition-rich\u00a0environments.'}
            intro={projectMetadata.thesis}
            dark
          />

          <div className="grid gap-5 lg:grid-cols-12">
            <article className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.08] p-6 md:p-8 lg:col-span-5">
              <Compass className="h-6 w-6 text-emerald-300" aria-hidden="true" />
              <p className="mt-5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                Design position
              </p>
              <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
                Navigation is a relationship between person, route, conditions, and recovery.
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-neutral-300">
                The matrix expands wayfinding beyond location. It asks whether the current
                route remains suitable, which choices are still available, and when an
                operator should become aware of an exception.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {projectMetadata.audiences.map((audience) => (
                  <span key={audience} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-neutral-300">
                    {audience}
                  </span>
                ))}
              </div>
            </article>

            <div className="grid gap-5 md:grid-cols-3 lg:col-span-7">
              {projectFrame.map((card, index) => (
                <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <p className="font-mono text-sm font-black text-emerald-300">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-300">{card.description}</p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-xs font-semibold leading-relaxed text-emerald-100">
                    {card.implication}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="problem" aria-labelledby="problem-title" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="problem-title"
            eyebrow="03 // Problem"
            title="Conventional wayfinding knows where someone is, but not what the moment demands."
            intro="Remote landscapes create compound decisions. A route, guest, and weather system can each look acceptable in isolation while their relationship is becoming unsafe or unrecoverable."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {problemCards.map((card, index) => {
              const icons = [Route, AlertTriangle, Eye];
              const Icon = icons[index];
              return (
                <article key={card.title} className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-6 md:p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-tiempos text-2xl font-bold leading-tight text-neutral-950">{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">{card.description}</p>
                  <p className="mt-5 border-t border-neutral-200 pt-4 text-xs font-bold leading-relaxed text-amber-900">{card.implication}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="opportunity" aria-labelledby="opportunity-title" className="scroll-mt-20 bg-emerald-50 py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="opportunity-title"
            eyebrow="04 // Opportunity"
            title="Make the environment quietly legible without turning the journey into an interface."
            intro="The opportunity is not to add more notifications. It is to create a restrained guidance language that helps guests notice meaningful change while preserving immersion and choice."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {opportunityCards.map((card, index) => {
              const icons = [ShieldCheck, Sparkles, Binoculars];
              const Icon = icons[index];
              return (
                <article key={card.title} className="rounded-[1.5rem] border border-emerald-900/10 bg-white p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                    <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-emerald-700">
                      Opportunity {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-tiempos text-2xl font-bold leading-tight text-neutral-950">{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">{card.description}</p>
                  <p className="mt-5 border-t border-emerald-100 pt-4 text-xs font-bold leading-relaxed text-emerald-900">{card.implication}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SystemModel />

      <section id="guest-journey" aria-labelledby="guest-journey-title" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="guest-journey-title"
            eyebrow="06 // Guest Journey"
            title="Support the arc of exploration without scripting every move."
            intro="The system changes posture across preparation, entry, exploration, adaptation, and return. Its role is strongest at transition points where uncertainty or consequence increases."
          />

          <ol className="relative grid gap-4 lg:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-emerald-200 lg:block" aria-hidden="true" />
            {guestJourney.map((step, index) => (
              <li key={step.moment} className="relative rounded-[1.5rem] border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-3 lg:block">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-emerald-600 bg-white font-mono text-[10px] font-black text-emerald-800">
                    {index + 1}
                  </span>
                  <h3 className="font-tiempos text-xl font-bold text-neutral-950 lg:mt-5">{step.moment}</h3>
                </div>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-neutral-600">Guest need</dt>
                    <dd className="mt-1.5 text-xs leading-relaxed text-neutral-700">{step.guestNeed}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-emerald-700">System role</dt>
                    <dd className="mt-1.5 text-xs leading-relaxed text-neutral-700">{step.systemRole}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-amber-800">Ambient response</dt>
                    <dd className="mt-1.5 text-xs font-semibold leading-relaxed text-neutral-800">{step.ambientResponse}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SignalMatrix />
      <AmbientGuidanceDiagram />

      <section id="operations-layer" aria-labelledby="operations-layer-title" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="operations-layer-title"
            eyebrow="09 // Operations Layer"
            title="Operators need meaningful exceptions, not a surveillance wall."
            intro="The operations layer turns aggregate landscape pressure, confidence gaps, and high-consequence exceptions into proportionate human action."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {operationsCapabilities.map((capability, index) => (
              <article key={capability.title} className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <Mountain className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-500">
                    Capability {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-tiempos text-2xl font-bold text-neutral-950">{capability.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{capability.description}</p>
                <div className="my-5 flex justify-center" aria-hidden="true">
                  <ArrowDown className="h-4 w-4 text-neutral-300" />
                </div>
                <ul className="space-y-2">
                  {capability.decisions.map((decision) => (
                    <li key={decision} className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-950">
                      {decision}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="mt-7 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
              <ShieldCheck className="h-6 w-6 text-amber-800" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-amber-800">
                  Operating boundary
                </p>
                <h3 className="mt-3 font-tiempos text-2xl font-bold text-neutral-950">
                  Awareness is scoped to actionability.
                </h3>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-neutral-700">
                  Operators see what they need to manage capacity, verify uncertainty, or
                  respond to potential distress. The concept does not assume continuous
                  identity tracking or unrestricted access to personal data.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <NotionOSArchitecture />
      <PrototypeRoadmap />
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  dark?: boolean;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <p className={`font-mono text-[10px] font-black uppercase tracking-[0.28em] ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>
        {eyebrow}
      </p>
      <h2 id={id} className={`mt-4 font-tiempos text-3xl font-bold leading-tight md:text-5xl ${dark ? 'text-white' : 'text-neutral-950'}`}>
        {title}
      </h2>
      <p className={`mt-5 text-base leading-relaxed md:text-lg ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}>
        {intro}
      </p>
    </header>
  );
}
