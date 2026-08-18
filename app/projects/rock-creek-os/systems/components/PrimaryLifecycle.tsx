import { ArrowDown, ArrowRight, RefreshCw, Users } from 'lucide-react';
import { cn } from '../../components/diagram-primitives';
import { hydrologyLifecycle, lifecycleFlows, primaryLifecycleCopy, type LifecycleFlow } from '../content/systems-data';
import { AtlasSectionHeader, EvidenceTierBadge } from './systems-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 02 · Primary System Deep Dive — Predictive Hydrological Activity
// Orchestration, as a five-stage lifecycle: Sense → Interpret → Decide →
// Adapt → Learn.
//
// Static, all five stages always visible — evolved from the previous Atlas's
// `DecisionArchitectureMap`, which rendered every decision tier fully
// expanded rather than gated behind interaction. Kept that choice
// deliberately: this page reads as an atlas (scan and compare), where
// Explorer reads as an investigation (click through one thing at a time).
//
// The three cross-stage flows below are evolved from the same component's
// "three flows connect the tiers" section — except here one of the three is
// named "Human Judgment" and is the one this whole page exists to make
// visible. Losing that flow would turn this from a stewardship architecture
// into an automation diagram, which is exactly the misreading the brief
// warns against.
// ─────────────────────────────────────────────────────────────────────────────

const flowIcons: Record<LifecycleFlow['direction'], typeof ArrowDown> = {
  down: ArrowRight,
  human: Users,
  return: RefreshCw,
};

export function PrimaryLifecycle() {
  return (
    <section
      id={primaryLifecycleCopy.id}
      aria-labelledby={`${primaryLifecycleCopy.id}-title`}
      className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50 py-16 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-8">
        <AtlasSectionHeader
          kicker={primaryLifecycleCopy.kicker}
          number={primaryLifecycleCopy.number}
          title={primaryLifecycleCopy.title}
          intro={primaryLifecycleCopy.intro}
        />
        <h3 id={`${primaryLifecycleCopy.id}-title`} className="sr-only">
          {primaryLifecycleCopy.title}
        </h3>

        {/* Five stages, always expanded */}
        <ol className="space-y-3" aria-label="Hydrological orchestration lifecycle, five stages">
          {hydrologyLifecycle.map((stage, index) => (
            <li key={stage.id}>
              <article className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rockcreek-200 bg-rockcreek-50 font-mono text-xs font-black text-rockcreek-700">
                      {stage.number}
                    </span>
                    <div>
                      <h4 className="font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                        {stage.label}
                      </h4>
                      <p className="mt-1 text-sm leading-snug text-neutral-600">{stage.summary}</p>
                    </div>
                  </div>
                  <EvidenceTierBadge tier={stage.tier} />
                </div>

                <div className="mt-5 grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] lg:items-stretch lg:gap-3">
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                      Inputs
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {stage.inputs.map((input) => (
                        <li key={input} className="text-sm leading-snug text-neutral-700">
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden="true">
                    <svg viewBox="0 0 12 12" fill="none" className="h-3.5 w-3.5 rotate-90 text-neutral-300 lg:rotate-0">
                      <path
                        d="M2 6h7M6 3l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="rounded-xl border border-rockcreek-200 bg-rockcreek-50/60 p-4">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-rockcreek-700">
                      Output
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-800">{stage.output}</p>
                  </div>
                </div>

                {stage.humanRole && (
                  <div className="mt-3 flex gap-3 rounded-xl border border-violet-200 bg-violet-50/70 p-4">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-violet-700" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-violet-700">
                        Human role
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{stage.humanRole}</p>
                    </div>
                  </div>
                )}
              </article>

              {index < hydrologyLifecycle.length - 1 && (
                <div className="flex justify-center py-1.5" aria-hidden="true">
                  <ArrowDown className="h-4 w-4 text-rockcreek-400" />
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* Cross-stage flows */}
        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 md:p-6">
          <header className="mb-5">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
              Three flows connect the five stages
            </p>
          </header>

          <div className="grid gap-3 md:grid-cols-3">
            {lifecycleFlows.map((flow) => {
              const Icon = flowIcons[flow.direction];
              const isHuman = flow.status === 'human';

              return (
                <article
                  key={flow.id}
                  className={cn(
                    'flex flex-col rounded-xl border p-5',
                    isHuman ? 'border-violet-300 bg-violet-50/60 ring-1 ring-violet-200' : 'border-neutral-200 bg-neutral-50',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn('h-4 w-4', isHuman ? 'text-violet-700' : 'text-neutral-400')} aria-hidden="true" />
                    <h4 className="text-sm font-bold text-neutral-950">{flow.name}</h4>
                  </div>
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-neutral-500">{flow.path}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{flow.note}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
