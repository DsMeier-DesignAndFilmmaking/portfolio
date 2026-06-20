import { AlertTriangle, ArrowDown, RefreshCw } from 'lucide-react';
import { recoverySteps, recoveryTriggers } from '../content';
import { SectionHeading, contentBounds } from './shared';

export default function RecoveryModel() {
  return (
    <section
      id="recovery-model"
      aria-labelledby="recovery-model-title"
      className="bg-[#f5f3ec] py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="recovery-model-title"
          eyebrow="09 // Recovery Model"
          title="When conditions or confidence change, the system restores orientation before momentum."
          intro="Recovery is not a hidden exception path. It pauses unsafe action, preserves the stewardship objective, routes revised authority, and records what the original model missed."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
          <aside className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 md:p-7">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
                  Recovery triggers
                </p>
                <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                  The plan changes when its assumptions stop holding.
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {recoveryTriggers.map((item) => (
                <article key={item.id} className="rounded-xl border border-amber-200 bg-white/75 p-4">
                  <h4 className="text-sm font-bold leading-relaxed text-neutral-900">
                    {item.trigger}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                    {item.systemResponse}
                  </p>
                </article>
              ))}
            </div>
          </aside>

          <figure
            className="rounded-[1.5rem] border border-stone-200 bg-white p-5 md:p-7"
            aria-describedby="recovery-path-summary"
          >
            <p id="recovery-path-summary" className="sr-only">
              The recovery path detects a break, stabilizes the decision, reframes
              reversible options, routes authority, and records learning.
            </p>

            <div className="flex items-center gap-3 border-b border-stone-200 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <RefreshCw className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-violet-700">
                  Recovery path
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  A visible sequence for regaining safe, accountable action.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {recoverySteps.map((step, index) => (
                <div key={step.id}>
                  <article className="grid gap-4 rounded-2xl border border-stone-200 bg-stone-50/60 p-5 md:grid-cols-[4rem_minmax(0,1fr)_11rem] md:items-start">
                    <p className="font-mono text-xl font-bold text-violet-700">
                      {step.number}
                    </p>
                    <div>
                      <h3 className="font-tiempos text-xl font-bold text-neutral-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {step.description}
                      </p>
                    </div>
                    <div className="rounded-xl border border-violet-100 bg-white p-3">
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-violet-700">
                        Owner
                      </p>
                      <p className="mt-1.5 text-xs font-semibold leading-relaxed text-neutral-700">
                        {step.owner}
                      </p>
                    </div>
                  </article>
                  {index < recoverySteps.length - 1 && (
                    <div className="flex justify-center py-1.5" aria-hidden="true">
                      <ArrowDown className="h-4 w-4 text-violet-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <figcaption className="mt-5 text-sm leading-relaxed text-neutral-500">
              Recovery preserves the stewardship objective while allowing the response
              path, confidence state, and accountable owner to change.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
