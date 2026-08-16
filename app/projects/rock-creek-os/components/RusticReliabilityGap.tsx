import { ArrowDown } from 'lucide-react';
import {
  currentStateChain,
  futureStateChain,
  reliabilityGapFinding,
  reliabilityRisks,
  type ChainLink,
} from '../content/frameworks';
import { FrameworkShell, ToneChip, cn, toneStyles } from './diagram-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 02 · The Rustic Reliability Gap
//
// A before/after systems analysis rendered as two parallel four-step chains —
// current state (rose, risk-accumulating) and future state (teal,
// resilience-accumulating) — followed by the four named risks that make the
// current chain unstable.
// ─────────────────────────────────────────────────────────────────────────────

function Chain({
  steps,
  tone,
  label,
}: {
  steps: ChainLink[];
  tone: 'rose' | 'teal';
  label: string;
}) {
  const styles =
    tone === 'rose'
      ? { border: 'border-rose-200', bg: 'bg-rose-50/60', chip: 'border-rose-200 bg-rose-50 text-rose-700', arrow: 'text-rose-300' }
      : { border: 'border-teal-200', bg: 'bg-teal-50/60', chip: 'border-teal-200 bg-teal-50 text-teal-700', arrow: 'text-teal-300' };

  return (
    <div className={cn('rounded-2xl border p-4 md:p-6', styles.border, styles.bg)}>
      <p className={cn('inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]', styles.chip)}>
        {label}
      </p>

      <ol className="mt-5 space-y-2">
        {steps.map((step, index) => (
          <li key={step.id}>
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                Step {String(index + 1).padStart(2, '0')}
              </p>
              <h5 className="mt-2 font-tiempos text-lg font-bold leading-tight text-neutral-950">
                {step.label}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-1.5" aria-hidden="true">
                <ArrowDown className={cn('h-4 w-4', styles.arrow)} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function RusticReliabilityGap() {
  return (
    <FrameworkShell
      id="rcos-reliability-gap"
      eyebrow="Atlas 02"
      title="The Rustic Reliability Gap"
      description="A property built on heritage structures runs one causal chain today. A property built on infrastructure sovereignty could run a different one — the same capacity, spent in the opposite direction."
      summary={`A before-and-after systems analysis. The current-state chain runs from heritage structures through infrastructure limitations to operational risk to guest experience risk. The future-state chain runs from infrastructure sovereignty through operational resilience to experience reliability to stewardship outcomes. Four named risks explain why the current chain is unstable: structural obsolescence, connectivity risk, climate risk, and the authenticity paradox. ${reliabilityGapFinding}`}
      caption={reliabilityGapFinding}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Chain steps={currentStateChain} tone="rose" label="Current state" />
        <Chain steps={futureStateChain} tone="teal" label="Future state" />
      </div>

      {/* Named risks */}
      <section className="mt-6">
        <header className="mb-4">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Four named risks in the current chain
          </p>
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {reliabilityRisks.map((risk) => {
            const tone = toneStyles[risk.tone];
            return (
              <article key={risk.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', tone.dot)} aria-hidden="true" />
                    <h5 className="font-tiempos text-lg font-bold leading-tight text-neutral-950">
                      {risk.name}
                    </h5>
                  </div>
                  <ToneChip tone={risk.tone}>{tone.label}</ToneChip>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{risk.body}</p>
              </article>
            );
          })}
        </div>
      </section>
    </FrameworkShell>
  );
}
