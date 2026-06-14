import {
  ConfidencePill,
  DiagramCard,
  DiagramConnector,
  DiagramNode,
  DiagramShell,
  SignalBadge,
  type ConfidenceLevel,
} from './primitives';
import { ranchSignalGroups } from './data';

function confidenceLevelForGroup(groupId: string): ConfidenceLevel {
  if (groupId === 'environment' || groupId === 'operations') return 'medium';
  if (groupId === 'stewardship') return 'recovery';
  return 'high';
}

function SignalGroupCard({
  group,
  index,
}: {
  group: (typeof ranchSignalGroups)[number];
  index: number;
}) {
  return (
    <DiagramCard
      label={`Signal Group ${String(index + 1).padStart(2, '0')}`}
      title={group.title}
      description={group.description}
      tone={group.tone}
      className="h-full bg-white"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {group.signals.map((signal) => (
            <SignalBadge key={signal} tone={group.tone}>
              {signal}
            </SignalBadge>
          ))}
        </div>
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-3">
          <ConfidencePill level={confidenceLevelForGroup(group.id)}>
            Confidence impact
          </ConfidencePill>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600">
            {group.confidenceImpact}
          </p>
        </div>
      </div>
    </DiagramCard>
  );
}

function SignalLegend() {
  return (
    <DiagramCard
      label="Legend"
      title="Signals become useful when they explain confidence."
      description="Each group affects a different part of guest confidence: fit, readiness, trust, safety, or recovery."
      tone="neutral"
      className="bg-white"
    >
      <div className="flex flex-wrap gap-2">
        <SignalBadge tone="ranch">intent and comfort</SignalBadge>
        <SignalBadge tone="signal">live conditions</SignalBadge>
        <SignalBadge tone="operations">service feasibility</SignalBadge>
        <SignalBadge tone="stewardship">responsible participation</SignalBadge>
        <SignalBadge tone="confidence">human validation</SignalBadge>
      </div>
    </DiagramCard>
  );
}

function DesktopSignalMap() {
  const guest = ranchSignalGroups.find((group) => group.id === 'guest');
  const environment = ranchSignalGroups.find((group) => group.id === 'environment');
  const operations = ranchSignalGroups.find((group) => group.id === 'operations');
  const stewardship = ranchSignalGroups.find((group) => group.id === 'stewardship');
  const staffKnowledge = ranchSignalGroups.find((group) => group.id === 'staff-knowledge');

  return (
    <div className="hidden lg:block">
      <div className="grid gap-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] lg:items-end">
          {guest && <SignalGroupCard group={guest} index={0} />}
          <div className="flex justify-center pb-8" aria-hidden="true">
            <div className="h-px w-full bg-neutral-200" />
          </div>
          {environment && <SignalGroupCard group={environment} index={1} />}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(250px,0.8fr)_auto_minmax(0,1fr)] lg:items-center">
          {operations && <SignalGroupCard group={operations} index={2} />}
          <DiagramConnector />
          <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-center shadow-sm shadow-neutral-950/[0.03]">
            <DiagramNode
              label="Adaptive Ranch Context"
              description="A live interpretation layer that reads signals together before recommending guidance, recovery, or human validation."
              tone="confidence"
              className="bg-white p-5"
            />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <ConfidencePill level="high">Interpret</ConfidencePill>
              <ConfidencePill level="medium">Assess</ConfidencePill>
              <ConfidencePill level="recovery">Recover</ConfidencePill>
            </div>
          </div>
          <DiagramConnector />
          {stewardship && <SignalGroupCard group={stewardship} index={3} />}
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.7fr)_8rem_minmax(0,0.7fr)] lg:items-start lg:justify-center">
          <div aria-hidden="true" />
          <div className="flex justify-center pt-2" aria-hidden="true">
            <div className="flex h-10 w-px items-end justify-center bg-neutral-200">
              <svg className="h-3 w-3 rotate-90 text-neutral-300" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div aria-hidden="true" />
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {staffKnowledge && <SignalGroupCard group={staffKnowledge} index={4} />}
          <SignalLegend />
        </div>
      </div>
    </div>
  );
}

function MobileSignalMap() {
  return (
    <div className="space-y-4 lg:hidden">
      <DiagramNode
        label="Adaptive Ranch Context"
        description="The companion interprets guest, place, operations, stewardship, and staff knowledge signals together."
        tone="confidence"
        className="bg-white p-5"
      />

      {ranchSignalGroups.map((group, index) => (
        <SignalGroupCard key={group.id} group={group} index={index} />
      ))}

      <SignalLegend />
    </div>
  );
}

export default function RanchSignalMap() {
  return (
    <DiagramShell
      eyebrow="Ranch Signal Map"
      title="What the Adaptive Ranch Experience Companion interprets."
      description="A signal ecosystem for understanding guest readiness, live environmental context, operational feasibility, stewardship constraints, and staff knowledge before guidance is surfaced."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="ranch-signal-map-summary">
        <p id="ranch-signal-map-summary" className="sr-only">
          This signal map shows guest, environment, operations, stewardship, and staff knowledge signals interpreted as Adaptive Ranch Context to support confidence-centered guidance.
        </p>

        <DesktopSignalMap />
        <MobileSignalMap />
      </figure>
    </DiagramShell>
  );
}
