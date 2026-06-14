import {
  ConfidencePill,
  DiagramCard,
  DiagramNode,
  DiagramShell,
  SignalBadge,
} from './primitives';
import { guestConfidenceBreakdowns } from './data';
import type { DiagramTone, ConfidenceLevel } from './primitives';

const restorationMechanisms = [
  'Clarify Context',
  'Reduce Options',
  'Human Validation',
  'Preserve Choice',
  'Recovery Path',
];

const confidenceLevelByTone: Record<DiagramTone, ConfidenceLevel> = {
  ranch: 'medium',
  signal: 'medium',
  confidence: 'high',
  recovery: 'recovery',
  operations: 'medium',
  stewardship: 'high',
  neutral: 'medium',
};

function BreakdownDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
        {value}
      </p>
    </div>
  );
}

function BreakdownCard({
  breakdown,
  index,
}: {
  breakdown: (typeof guestConfidenceBreakdowns)[number];
  index: number;
}) {
  return (
    <DiagramCard
      label={String(index + 1).padStart(2, '0')}
      title={breakdown.title}
      tone={breakdown.tone}
      className="h-full bg-white"
    >
      <div className="flex flex-wrap gap-2">
        <ConfidencePill level={confidenceLevelByTone[breakdown.tone]}>
          Confidence reducer
        </ConfidencePill>
        <SignalBadge tone={breakdown.tone}>{breakdown.restoration}</SignalBadge>
      </div>

      <div className="mt-5 space-y-4 border-t border-neutral-100 pt-5">
        <BreakdownDetail label="Breakdown Trigger" value={breakdown.trigger} />
        <BreakdownDetail label="Confidence Reducer" value={breakdown.reducer} />
        <BreakdownDetail label="Restoration Mechanism" value={breakdown.restoration} />
      </div>
    </DiagramCard>
  );
}

export default function GuestConfidenceBreakdownModel() {
  const firstColumn = guestConfidenceBreakdowns.slice(0, 4);
  const secondColumn = guestConfidenceBreakdowns.slice(4);

  return (
    <DiagramShell
      eyebrow="Guest Confidence Breakdown Model"
      title="Where ranch guest confidence breaks down, and how the system restores it."
      description="A model for identifying the moments when uncertainty prevents participation, then pairing each breakdown with a confidence-restoring mechanism."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="guest-confidence-breakdown-summary">
        <p id="guest-confidence-breakdown-summary" className="sr-only">
          This model shows eight ranch guest confidence breakdown points and the restoration mechanisms used to rebuild confidence.
        </p>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.48fr)_minmax(0,1fr)] lg:items-center">
          <div className="grid gap-4">
            {firstColumn.map((breakdown, index) => (
              <BreakdownCard key={breakdown.id} breakdown={breakdown} index={index} />
            ))}
          </div>

          <div className="order-first lg:order-none">
            <div className="relative rounded-[1.75rem] border border-neutral-200 bg-white p-5 text-center shadow-sm shadow-neutral-950/[0.04] md:p-6">
              <div className="absolute left-1/2 top-full hidden h-8 w-px -translate-x-1/2 bg-neutral-200 lg:block" aria-hidden="true" />
              <div className="absolute bottom-full left-1/2 hidden h-8 w-px -translate-x-1/2 bg-neutral-200 lg:block" aria-hidden="true" />
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Central Concept
              </p>
              <h3 className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-4xl">
                Guest Confidence
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                The guest understands enough about place, activity, timing, etiquette, and fallback options to participate with agency.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <ConfidencePill level="high">Act with clarity</ConfidencePill>
                <ConfidencePill level="recovery">Recover gracefully</ConfidencePill>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <DiagramNode
                label="Breakdown"
                description="A moment where uncertainty increases cognitive, social, or operational load."
                tone="neutral"
              />
              <DiagramNode
                label="Restoration"
                description="A mechanism that narrows attention, validates readiness, or reveals a fallback."
                tone="confidence"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {secondColumn.map((breakdown, index) => (
              <BreakdownCard key={breakdown.id} breakdown={breakdown} index={index + firstColumn.length} />
            ))}
          </div>
        </div>

        <figcaption className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 md:p-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
            Restoration Mechanisms
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {restorationMechanisms.map((mechanism) => (
              <SignalBadge
                key={mechanism}
                tone={mechanism === 'Recovery Path' ? 'recovery' : mechanism === 'Human Validation' ? 'stewardship' : 'confidence'}
              >
                {mechanism}
              </SignalBadge>
            ))}
          </div>
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
