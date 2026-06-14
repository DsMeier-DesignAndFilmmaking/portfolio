import {
  BlueprintLane,
  BlueprintMoment,
  ConfidencePill,
  DiagramCard,
  DiagramConnector,
  DiagramShell,
  SignalBadge,
  type ConfidenceLevel,
  type DiagramTone,
} from './primitives';
import {
  operationsBlueprintLanes,
  operationsBlueprintMoments,
  operationsBlueprintStages,
} from './data';

const laneToneById: Record<string, DiagramTone> = {
  guest: 'ranch',
  'frontstage-staff': 'stewardship',
  'backstage-operations': 'operations',
  'stewardship-layer': 'signal',
  'companion-system': 'confidence',
  'recovery-layer': 'recovery',
};

const confidenceByType: Record<string, ConfidenceLevel> = {
  objective: 'medium',
  handoff: 'high',
  support: 'high',
  dependency: 'medium',
  constraint: 'medium',
  signal: 'medium',
  guidance: 'high',
  monitor: 'medium',
  prevention: 'recovery',
  trigger: 'low',
  recovery: 'recovery',
  outcome: 'high',
  learning: 'high',
};

const recoveryChain = [
  { label: 'Weather Shift', tone: 'signal' },
  { label: 'Alternatives surfaced', tone: 'confidence' },
  { label: 'Guide validates', tone: 'stewardship' },
  { label: 'Availability updated', tone: 'operations' },
  { label: 'Constraints applied', tone: 'signal' },
  { label: 'Guest chooses', tone: 'ranch' },
] satisfies Array<{ label: string; tone: DiagramTone }>;

function getMoment(stageId: string, laneId: string) {
  return operationsBlueprintMoments.find(
    (moment) => moment.stage === stageId && moment.lane === laneId
  );
}

function toneForLane(laneId: string): DiagramTone {
  return laneToneById[laneId] ?? 'neutral';
}

function confidenceForType(type: string): ConfidenceLevel {
  return confidenceByType[type] ?? 'medium';
}

function DesktopBlueprint() {
  return (
    <div className="hidden xl:block">
      <div className="grid grid-cols-[9.5rem_repeat(7,minmax(0,1fr))] gap-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-3">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Lanes
          </p>
        </div>

        {operationsBlueprintStages.map((stage, index) => (
          <div key={stage.id} className="rounded-2xl border border-neutral-200 bg-white p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">
                {String(index + 1).padStart(2, '0')}
              </p>
              <SignalBadge tone={stage.type === 'recovery' ? 'recovery' : stage.type === 'disruption' ? 'signal' : 'neutral'}>
                {stage.type}
              </SignalBadge>
            </div>
            <h3 className="mt-3 text-sm font-bold leading-snug text-neutral-950">
              {stage.stage}
            </h3>
          </div>
        ))}

        {operationsBlueprintLanes.map((lane) => (
          <div key={lane.id} className="contents">
            <div className="rounded-2xl border border-neutral-200 bg-white p-3">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                Lane
              </p>
              <h3 className="mt-2 text-sm font-bold leading-snug text-neutral-950">
                {lane.lane}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                {lane.type}
              </p>
            </div>

            {operationsBlueprintStages.map((stage, stageIndex) => {
              const moment = getMoment(stage.id, lane.id);

              if (!moment) {
                return (
                  <div
                    key={`${stage.id}-${lane.id}`}
                    className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50/60"
                    aria-hidden="true"
                  />
                );
              }

              return (
                <BlueprintMoment
                  key={moment.id}
                  index={stageIndex + 1}
                  title={moment.title}
                  description={moment.description}
                  meta={moment.type}
                  tone={toneForLane(lane.id)}
                  className={
                    moment.type === 'recovery' || stage.type === 'disruption'
                      ? 'ring-1 ring-emerald-100'
                      : ''
                  }
                >
                  {moment.confidenceImpact && (
                    <ConfidencePill level={confidenceForType(moment.type)} className="normal-case tracking-[0.08em]">
                      {moment.confidenceImpact}
                    </ConfidencePill>
                  )}
                </BlueprintMoment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileBlueprint() {
  return (
    <div className="space-y-4 xl:hidden">
      {operationsBlueprintStages.map((stage, stageIndex) => (
        <DiagramCard
          key={stage.id}
          label={`Stage ${String(stageIndex + 1).padStart(2, '0')}`}
          title={stage.stage}
          description={stage.description}
          tone={stage.type === 'recovery' ? 'recovery' : stage.type === 'disruption' ? 'signal' : 'neutral'}
          className="bg-white"
        >
          <div className="space-y-3">
            {operationsBlueprintLanes.map((lane) => {
              const moment = getMoment(stage.id, lane.id);

              if (!moment) {
                return null;
              }

              return (
                <BlueprintMoment
                  key={moment.id}
                  title={moment.title}
                  description={moment.description}
                  meta={lane.lane}
                  tone={toneForLane(lane.id)}
                >
                  <div className="flex flex-wrap gap-2">
                    <SignalBadge tone={toneForLane(lane.id)}>{moment.type}</SignalBadge>
                    {moment.confidenceImpact && (
                      <ConfidencePill level={confidenceForType(moment.type)}>
                        confidence note
                      </ConfidencePill>
                    )}
                  </div>
                  {moment.confidenceImpact && (
                    <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                      {moment.confidenceImpact}
                    </p>
                  )}
                </BlueprintMoment>
              );
            })}
          </div>
        </DiagramCard>
      ))}
    </div>
  );
}

function LaneRoleSummary() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {operationsBlueprintLanes.map((lane) => (
        <BlueprintLane
          key={lane.id}
          title={lane.title}
          description={lane.description}
          tone={lane.tone}
          className="bg-white"
        >
          <BlueprintMoment
            title="Role"
            description={lane.type}
            meta="lane"
            tone={lane.tone}
          />
          <BlueprintMoment
            title="Confidence job"
            description={lane.confidenceImpact}
            meta="impact"
            tone={lane.tone}
          />
          <BlueprintMoment
            title="Blueprint position"
            description={
              lane.id === 'recovery-layer'
                ? 'Enters visibly when disruption reduces confidence.'
                : 'Supports the journey before recovery is needed.'
            }
            meta="system"
            tone={lane.tone}
          />
        </BlueprintLane>
      ))}
    </div>
  );
}

function RecoveryHandoffChain() {
  return (
    <DiagramCard
      label="Recovery Handoff"
      title="A disruption becomes a coordinated service response."
      description="The recovery path is not a single recommendation. It is a chain of interpretation, human validation, operational coordination, stewardship constraints, and guest choice."
      tone="recovery"
      className="bg-white"
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {recoveryChain.map((item, index) => (
          <div key={item.label} className="flex flex-col lg:flex-row lg:items-center">
            <div className="rounded-xl border border-neutral-200 bg-white p-3">
              <SignalBadge tone={item.tone}>{item.label}</SignalBadge>
            </div>
            {index < recoveryChain.length - 1 && <DiagramConnector className="lg:px-1" />}
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

export default function OperationsServiceBlueprint() {
  return (
    <DiagramShell
      eyebrow="Operations Service Blueprint"
      title="How guest confidence is supported by the ranch operating system."
      description="A service blueprint that connects guest experience, staff action, operations, stewardship constraints, companion guidance, and recovery across the ranch journey."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="operations-service-blueprint-summary">
        <p id="operations-service-blueprint-summary" className="sr-only">
          This service blueprint illustrates how guest experiences, staff operations, stewardship constraints, guidance systems, and recovery mechanisms interact across the ranch journey.
        </p>

        <div className="space-y-6">
          <DiagramCard
            label="Blueprint Logic"
            title="The guest-facing promise depends on visible and invisible service work."
            description="Each stage pairs a guest objective with staff responsibilities, operational dependencies, stewardship considerations, companion contributions, and recovery triggers."
            tone="operations"
            className="bg-white"
          >
            <div className="flex flex-wrap gap-2">
              <SignalBadge tone="ranch">guest objective</SignalBadge>
              <SignalBadge tone="stewardship">staff responsibility</SignalBadge>
              <SignalBadge tone="operations">operational dependency</SignalBadge>
              <SignalBadge tone="signal">stewardship constraint</SignalBadge>
              <SignalBadge tone="confidence">companion contribution</SignalBadge>
              <SignalBadge tone="recovery">recovery trigger</SignalBadge>
            </div>
          </DiagramCard>

          <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/[0.03] md:p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                  Journey Blueprint
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  Recovery becomes visible when live conditions change, then each lane takes a distinct responsibility in restoring guest confidence.
                </p>
              </div>
              <ConfidencePill level="recovery">Recovery enters at disruption</ConfidencePill>
            </div>

            <DesktopBlueprint />
            <MobileBlueprint />
          </div>

          <RecoveryHandoffChain />
          <LaneRoleSummary />
        </div>
      </figure>
    </DiagramShell>
  );
}
