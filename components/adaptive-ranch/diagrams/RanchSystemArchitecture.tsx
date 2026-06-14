import {
  ConfidencePill,
  DiagramCard,
  DiagramConnector,
  DiagramNode,
  DiagramShell,
  SignalBadge,
} from './primitives';
import {
  ranchArchitectureFlow,
  ranchArchitectureInputs,
  ranchRecoveryLoop,
} from './data';

function SignalCluster({
  item,
  index,
}: {
  item: (typeof ranchArchitectureInputs)[number];
  index: number;
}) {
  return (
    <DiagramCard
      label={`Signal ${String(index + 1).padStart(2, '0')}`}
      title={item.title}
      description={item.description}
      tone={item.tone}
      className="h-full bg-white"
    >
      {item.badges && (
        <div className="flex flex-wrap gap-2">
          {item.badges.map((badge) => (
            <SignalBadge key={badge} tone={item.tone}>
              {badge}
            </SignalBadge>
          ))}
        </div>
      )}
    </DiagramCard>
  );
}

function FlowNode({
  item,
  index,
}: {
  item: (typeof ranchArchitectureFlow)[number];
  index: number;
}) {
  return (
    <DiagramNode
      label={`${String(index + 1).padStart(2, '0')} / ${item.title}`}
      description={item.description}
      tone={item.tone}
      className="min-h-[112px] bg-white p-4"
    />
  );
}

function RecoveryCard({
  item,
}: {
  item: (typeof ranchRecoveryLoop)[number];
}) {
  return (
    <DiagramCard
      label="Loop"
      title={item.title}
      description={item.description}
      tone={item.tone}
      className="bg-white"
    >
      {item.badges && (
        <div className="flex flex-wrap gap-2">
          {item.badges.map((badge) => (
            <SignalBadge key={badge} tone={item.tone}>
              {badge}
            </SignalBadge>
          ))}
        </div>
      )}
    </DiagramCard>
  );
}

function MobileFlow() {
  return (
    <div className="lg:hidden">
      <div className="grid gap-4">
        {ranchArchitectureInputs.map((item, index) => (
          <SignalCluster key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="my-5 flex justify-center" aria-hidden="true">
        <div className="h-10 w-px bg-neutral-200" />
      </div>

      <div className="space-y-3">
        {ranchArchitectureFlow.map((item, index) => (
          <div key={item.id}>
            <FlowNode item={item} index={index} />
            {index < ranchArchitectureFlow.length - 1 && <DiagramConnector />}
          </div>
        ))}
      </div>

      <div className="my-5 flex justify-center" aria-hidden="true">
        <div className="h-10 w-px bg-neutral-200" />
      </div>

      <div className="grid gap-4">
        {ranchRecoveryLoop.map((item) => (
          <RecoveryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function DesktopFlow() {
  const recoveryLayer = ranchRecoveryLoop[0];
  const learningLoop = ranchRecoveryLoop[1];

  return (
    <div className="hidden lg:block">
      <div className="grid gap-4 lg:grid-cols-4">
        {ranchArchitectureInputs.map((item, index) => (
          <SignalCluster key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="flex justify-center py-6" aria-hidden="true">
        <div className="flex h-12 w-px items-end justify-center bg-neutral-200">
          <svg className="h-3 w-3 rotate-90 text-neutral-300" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.03]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
              Signal to Guidance Flow
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Signals are interpreted before the system asks a guest to act.
            </p>
          </div>
          <ConfidencePill level="high">Confidence-building loop</ConfidencePill>
        </div>

        <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
          {ranchArchitectureFlow.map((item, index) => (
            <div key={item.id} className="contents">
              <FlowNode item={item} index={index} />
              {index < ranchArchitectureFlow.length - 1 && <DiagramConnector />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] lg:items-center">
        <div className="h-px bg-neutral-200" aria-hidden="true" />
        <p className="text-center font-mono text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
          If confidence drops
        </p>
        <div className="h-px bg-neutral-200" aria-hidden="true" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
        <RecoveryCard item={recoveryLayer} />
        <DiagramConnector />
        <RecoveryCard item={learningLoop} />
      </div>
    </div>
  );
}

export default function RanchSystemArchitecture() {
  return (
    <DiagramShell
      eyebrow="Primary System Architecture"
      title="Adaptive Ranch Experience Companion architecture."
      description="A signal-to-guidance model for helping ranch guests understand activities, context, stewardship expectations, and recovery paths without losing agency."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="ranch-system-architecture-summary">
        <p id="ranch-system-architecture-summary" className="sr-only">
          This diagram shows how ranch guest, environmental, operational, and stewardship signals move through interpretation, confidence assessment, decision logic, guidance, action, recovery, and learning.
        </p>

        <MobileFlow />
        <DesktopFlow />

        <figcaption className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 md:p-5">
          <div className="grid gap-4 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] md:items-center">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
                Operating Thesis
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                The companion restores confidence by interpreting context before presenting guidance.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <SignalBadge tone="signal">Interpret context</SignalBadge>
              <SignalBadge tone="confidence">Assess confidence</SignalBadge>
              <SignalBadge tone="stewardship">Preserve choice</SignalBadge>
              <SignalBadge tone="recovery">Design recovery</SignalBadge>
            </div>
          </div>
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
