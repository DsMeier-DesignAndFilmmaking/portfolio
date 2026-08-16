import { ArrowDown, ArrowUp, HelpCircle, RefreshCw } from 'lucide-react';
import { decisionFinding, decisionFlows, decisionTiers, type DecisionFlow } from '../content/frameworks';
import {
  FailureCallout,
  FlowArrow,
  FrameworkShell,
  HealthBadge,
  MetaChip,
  ToneChip,
  cn,
  toneStyles,
} from './diagram-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 03 · Decision Architecture Map
//
// Four decision tiers rendered as Data Sources → Inputs → Decision → Outputs
// rows, each carrying its structural failure point and its named information
// gap. Cross-tier information flow is shown as three named loops with
// latency and health — the health badge doubles as the bottleneck marker —
// so the finding (every failure is a latency mismatch) is visible rather
// than asserted.
// ─────────────────────────────────────────────────────────────────────────────

const flowIcons: Record<DecisionFlow['direction'], typeof ArrowDown> = {
  down: ArrowDown,
  up: ArrowUp,
  return: RefreshCw,
};

const flowDirectionLabel: Record<DecisionFlow['direction'], string> = {
  down: 'Flows downward',
  up: 'Flows upward',
  return: 'Returns to the top',
};

export default function DecisionArchitectureMap() {
  return (
    <FrameworkShell
      id="rcos-decisions"
      eyebrow="Atlas 03"
      title="Decision Architecture Map"
      description="Four decision tiers, each with its own horizon, owner, data sources, inputs, and outputs — and each with one structural failure point and one named information gap."
      summary={`A decision architecture map covering four tiers: guest decisions on a horizon of minutes to hours, staff decisions across a shift, operational decisions across days to a season, and stewardship decisions across seasons to decades. Each tier lists its data sources, inputs, the decision it owns, its outputs, its failure point, and the information missing from it. Three cross-tier information flows connect them: authority flowing downward, constraint flowing upward, and demand pressure returning to the top — the second of which is a genuine bottleneck. ${decisionFinding}`}
      caption={decisionFinding}
    >
      {/* Decision tiers */}
      <div className="space-y-4">
        {decisionTiers.map((tier, index) => {
          const tone = toneStyles[tier.tone];

          return (
            <article
              key={tier.id}
              className={cn('rounded-2xl border p-4 md:p-6', tone.card)}
            >
              <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', tone.dot)} aria-hidden="true" />
                  <div>
                    <p className={cn('font-mono text-[10px] font-black uppercase tracking-[0.2em]', tone.text)}>
                      Tier {String(index + 1).padStart(2, '0')}
                    </p>
                    <h4 className="mt-2 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                      {tier.tier}
                    </h4>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <MetaChip>{tier.horizon}</MetaChip>
                  <ToneChip tone={tier.tone}>{tone.label}</ToneChip>
                </div>
              </header>

              <p className="mb-3 text-xs leading-relaxed text-neutral-500">
                <span className="font-mono font-bold uppercase tracking-[0.14em] text-neutral-400">Owner</span>{' '}
                {tier.owner}
              </p>

              <div className="mb-5 flex flex-wrap items-baseline gap-2 text-xs leading-relaxed text-neutral-500">
                <span className="font-mono font-bold uppercase tracking-[0.14em] text-neutral-400">
                  Data sources
                </span>
                <span>{tier.dataSources.join(' · ')}</span>
              </div>

              {/* Inputs → Decision → Outputs */}
              <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-3">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Inputs
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {tier.inputs.map((input) => (
                      <li key={input} className="text-sm leading-snug text-neutral-700">
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>

                <FlowArrow className="lg:px-1" />

                <div className={cn('flex flex-col justify-center rounded-xl border bg-white p-4', tone.card)}>
                  <p className={cn('font-mono text-[10px] font-black uppercase tracking-[0.18em]', tone.text)}>
                    The decision
                  </p>
                  <p className="mt-3 font-tiempos text-lg font-bold leading-snug text-neutral-950">
                    {tier.decision}
                  </p>
                </div>

                <FlowArrow className="lg:px-1" />

                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Outputs
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {tier.outputs.map((output) => (
                      <li key={output} className="text-sm leading-snug text-neutral-700">
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <FailureCallout label={tier.failurePoint.label}>{tier.failurePoint.body}</FailureCallout>

                <div className="rounded-xl border border-neutral-300 bg-white/70 p-4">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    Missing information
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{tier.missingInformation}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Cross-tier information flows */}
      <section className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-6">
        <header className="mb-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Feedback loops between tiers
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Three flows connect the four tiers. The <span className="font-semibold text-neutral-800">Constraint</span> flow
            is the decision bottleneck — marked broken below — because it is the only one still
            required to travel at the speed of the annual review.
          </p>
        </header>

        <div className="grid gap-3 md:grid-cols-3">
          {decisionFlows.map((flow) => {
            const Icon = flowIcons[flow.direction];

            return (
              <article key={flow.id} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                    <h4 className="text-sm font-bold text-neutral-950">{flow.name}</h4>
                  </div>
                  <HealthBadge health={flow.health} />
                </div>

                <p className="sr-only">{flowDirectionLabel[flow.direction]}.</p>

                <p className="mt-4 font-mono text-[11px] leading-relaxed text-neutral-500">{flow.path}</p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">{flow.note}</p>

                <p className="mt-4 border-t border-neutral-100 pt-3">
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">
                    Latency
                  </span>{' '}
                  <span className="text-xs font-semibold text-neutral-700">{flow.latency}</span>
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </FrameworkShell>
  );
}
