import {
  Flame,
  Map,
  Mountain,
  Route,
  Trees,
  Waves,
  Wrench,
} from 'lucide-react';
import { decisionDomains, type DecisionDomain } from '../content';
import { ConceptTag, SectionHeading, contentBounds } from './shared';
import EnvironmentalSignalMap from './EnvironmentalSignalMap';

const domainIcons = {
  terrain: Mountain,
  water: Waves,
  habitat: Trees,
  fire: Flame,
  access: Route,
  operations: Wrench,
} satisfies Record<DecisionDomain['icon'], typeof Mountain>;

export default function DomainAtlas() {
  return (
    <section
      id="domain-atlas"
      aria-labelledby="domain-atlas-title"
      className="bg-[#f5f3ec] py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="domain-atlas-title"
          eyebrow="07 // Domain Atlas"
          title="One landscape contains several interdependent decision domains."
          intro="Responsive Ecologies organizes the system around stewardship objectives, not software features. Each domain names the signals, decisions, and human stewards needed to care for a living place."
        />

        <p className="-mt-4 mb-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:-mt-8 md:mb-8 md:text-lg">
          Before signals become recommendations, they need to be interpreted across
          ecological, visitor, and operational conditions.
        </p>

        <EnvironmentalSignalMap />

        <div className="mb-7 flex flex-wrap gap-2" aria-label="Atlas legend">
          <ConceptTag>Signals describe conditions</ConceptTag>
          <ConceptTag>Decisions define responses</ConceptTag>
          <ConceptTag>Stewards retain authority</ConceptTag>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {decisionDomains.map((domain) => {
            const Icon = domainIcons[domain.icon];
            return (
              <article
                key={domain.id}
                className="rounded-[1.5rem] border border-stone-200 bg-white p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-stone-500">
                    Decision domain
                  </span>
                </div>

                <h3 className="mt-6 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                  {domain.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {domain.objective}
                </p>

                <div className="mt-6">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-sky-700">
                    Signals
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {domain.signals.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-800"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">
                    Decisions
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {domain.decisions.map((decision) => (
                      <span
                        key={decision}
                        className="rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800"
                      >
                        {decision}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-stone-200 pt-5">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700">
                    Stewardship owner
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-neutral-800">
                    {domain.steward}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="mt-8 rounded-[1.5rem] border border-emerald-900/10 bg-white p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 text-emerald-200">
              <Map className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                Current system boundary
              </p>
              <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                The atlas establishes the shared decision landscape.
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600">
                This view focuses on the objectives, signals, decisions, and accountable
                stewards that must align before deeper scenario modeling can be credible.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
