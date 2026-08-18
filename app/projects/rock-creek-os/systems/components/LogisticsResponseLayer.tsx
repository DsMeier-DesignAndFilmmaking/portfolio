import { ArrowDown } from 'lucide-react';
import { logisticsChain, logisticsCopy } from '../content/systems-data';
import { AtlasSectionHeader } from './systems-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 04 · Logistics as the response layer — a single five-link propagation
// chain (not a comparison, not a decision tree), plus the "quiet
// infrastructure" design principle as a standalone callout.
//
// No prior Atlas component matched this shape exactly, so this one is new
// rather than evolved — but it reuses the same vertical numbered-card-plus-
// arrow rhythm every other section on this page already establishes, so it
// doesn't introduce a visual pattern nothing else on the page uses.
// ─────────────────────────────────────────────────────────────────────────────

export function LogisticsResponseLayer() {
  return (
    <section
      id={logisticsCopy.id}
      aria-labelledby={`${logisticsCopy.id}-title`}
      className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50 py-16 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <AtlasSectionHeader
              kicker={logisticsCopy.kicker}
              number={logisticsCopy.number}
              title={logisticsCopy.title}
              intro={logisticsCopy.intro}
              className="mb-8 md:mb-8"
            />
            <h3 id={`${logisticsCopy.id}-title`} className="sr-only">
              {logisticsCopy.title}
            </h3>

            <ol className="space-y-0" aria-label="Logistics propagation chain, five links">
              {logisticsChain.map((step, index) => (
                <li key={step.id}>
                  <div className="rounded-xl border border-neutral-200 bg-white p-4">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h4 className="mt-1 font-tiempos text-lg font-bold text-neutral-950">{step.label}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
                  </div>
                  {index < logisticsChain.length - 1 && (
                    <div className="flex justify-center py-1" aria-hidden="true">
                      <ArrowDown className="h-4 w-4 text-rockcreek-400" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 lg:sticky lg:top-28">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-300">
                {logisticsCopy.principleLabel}
              </p>
              <p className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
                {logisticsCopy.principle}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-neutral-400">{logisticsCopy.principleNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
