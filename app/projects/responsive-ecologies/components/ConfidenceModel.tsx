import { ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  confidenceBands,
  confidenceDimensions,
  confidenceSuppressionRules,
  type ConfidenceBand,
} from '../content';
import { SectionHeading, contentBounds } from './shared';

const bandClasses: Record<ConfidenceBand['id'], string> = {
  low: 'border-amber-200 bg-amber-50 text-amber-900',
  medium: 'border-sky-200 bg-sky-50 text-sky-900',
  high: 'border-emerald-200 bg-emerald-50 text-emerald-900',
};

const bandMarkerClasses: Record<ConfidenceBand['id'], string> = {
  low: 'bg-amber-500',
  medium: 'bg-sky-500',
  high: 'bg-emerald-600',
};

export default function ConfidenceModel() {
  return (
    <section
      id="confidence-model"
      aria-labelledby="confidence-model-title"
      className="bg-neutral-950 py-16 text-white md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="confidence-model-title"
          eyebrow="08 // Confidence Model"
          title="Confidence describes decision readiness, not certainty."
          intro="The model combines signal quality, evidence strength, agreement, and authority readiness. A high score may prepare a response for approval; it never grants the system permission to act."
          dark
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
          <figure
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 md:p-7"
            aria-describedby="confidence-dimensions-summary"
          >
            <p id="confidence-dimensions-summary" className="sr-only">
              Stewardship decision confidence is composed of five weighted dimensions:
              signal freshness, source quality, cross-signal agreement, evidence strength,
              and authority readiness.
            </p>

            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                  Decision confidence
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  Five visible inputs explain why a recommendation is—or is not—ready.
                </p>
              </div>
              <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-300">
                Total weight 100
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {confidenceDimensions.map((dimension) => (
                <article key={dimension.id} className="grid gap-3 md:grid-cols-[11rem_1fr] md:items-start">
                  <div>
                    <div className="flex items-baseline justify-between gap-3 md:block">
                      <h3 className="text-sm font-bold text-white">{dimension.name}</h3>
                      <p className="font-mono text-xs font-bold text-emerald-300 md:mt-1">
                        {dimension.weight}%
                      </p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${dimension.weight}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/15 p-4">
                    <p className="text-sm font-semibold leading-relaxed text-neutral-100">
                      {dimension.question}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                      Evidence: {dimension.evidence}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </figure>

          <div className="space-y-5">
            <div className="grid gap-3">
              {confidenceBands.map((band) => (
                <article key={band.id} className={`rounded-[1.25rem] border p-5 ${bandClasses[band.id]}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${bandMarkerClasses[band.id]}`} aria-hidden="true" />
                      <h3 className="text-sm font-black uppercase tracking-[0.1em]">
                        {band.label}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold">{band.range}</span>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-neutral-900">
                    {band.response}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-700">
                    {band.authority}
                  </p>
                </article>
              ))}
            </div>

            <aside className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/[0.08] p-5">
              <div className="flex gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
                <div>
                  <h3 className="font-tiempos text-xl font-bold text-white">
                    Suppression is a valid system response.
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {confidenceSuppressionRules.map((rule) => (
                      <li key={rule} className="flex gap-2 text-sm leading-relaxed text-neutral-300">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
