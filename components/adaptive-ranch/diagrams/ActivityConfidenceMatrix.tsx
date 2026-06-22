import {
  ConfidencePill,
  DiagramCard,
  DiagramShell,
  MatrixCell,
  MatrixGrid,
  SignalBadge,
} from './primitives';
import { activityConfidenceMatrix } from './data';

const matrixColumns = [
  'Skill Level',
  'Intensity',
  'Weather',
  'Social',
  'Recovery',
  'Support Strategy',
];

function confidenceLevelForActivity(activity: (typeof activityConfidenceMatrix)[number]) {
  if (activity.recoveryFlexibility === 'High') return 'high';
  if (activity.weatherSensitivity === 'High') return 'medium';
  return 'medium';
}

function demandTone(value: string) {
  if (value.toLowerCase().includes('high')) return 'recovery';
  if (value.toLowerCase().includes('medium')) return 'confidence';
  return 'stewardship';
}

function MatrixValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 px-3 py-2 lg:block lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
      <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400 lg:hidden">
        {label}
      </span>
      <SignalBadge tone={demandTone(value)}>{value}</SignalBadge>
    </div>
  );
}

function ActivityMobileCard({
  activity,
}: {
  activity: (typeof activityConfidenceMatrix)[number];
}) {
  return (
    <DiagramCard
      label="Activity"
      title={activity.activity}
      description={activity.primaryUncertainty}
      tone="neutral"
      className="bg-white"
    >
      <div className="flex flex-wrap gap-2">
        <ConfidencePill level={confidenceLevelForActivity(activity)}>
          {activity.recoveryFlexibility} recovery
        </ConfidencePill>
        <SignalBadge tone="ranch">{activity.supportNeed}</SignalBadge>
      </div>
      <div className="mt-5 grid gap-2">
        <MatrixValue label="Skill Level" value={activity.skillLevel} />
        <MatrixValue label="Physical Intensity" value={activity.intensity} />
        <MatrixValue label="Exposure" value={activity.exposure} />
        <MatrixValue label="Weather Sensitivity" value={activity.weatherSensitivity} />
        <MatrixValue label="Social Demand" value={activity.socialDemand} />
        <MatrixValue label="Logistical Complexity" value={activity.logisticalComplexity} />
        <MatrixValue label="Recovery Flexibility" value={activity.recoveryFlexibility} />
      </div>
    </DiagramCard>
  );
}

function DesktopMatrix() {
  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-[minmax(180px,0.9fr)_repeat(5,minmax(120px,0.7fr))_minmax(190px,1fr)] gap-2">
        <div className="rounded-xl border border-neutral-200 bg-white px-3 py-3">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
            Activity
          </p>
        </div>
        {matrixColumns.map((column) => (
          <div key={column} className="rounded-xl border border-neutral-200 bg-white px-3 py-3">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
              {column}
            </p>
          </div>
        ))}

        {activityConfidenceMatrix.map((activity) => (
          <div key={activity.id} className="contents">
            <MatrixCell
              title={activity.activity}
              description={activity.primaryUncertainty}
              tone="neutral"
              className="min-h-[132px] bg-white"
            />
            <MatrixCell title={activity.skillLevel} tone="stewardship" className="min-h-[132px] bg-white">
              <SignalBadge tone="stewardship">Skill</SignalBadge>
            </MatrixCell>
            <MatrixCell title={activity.intensity} tone={demandTone(activity.intensity)} className="min-h-[132px] bg-white">
              <SignalBadge tone={demandTone(activity.intensity)}>Intensity</SignalBadge>
            </MatrixCell>
            <MatrixCell title={activity.weatherSensitivity} tone={demandTone(activity.weatherSensitivity)} className="min-h-[132px] bg-white">
              <SignalBadge tone={demandTone(activity.weatherSensitivity)}>Weather</SignalBadge>
            </MatrixCell>
            <MatrixCell title={activity.socialDemand} tone={demandTone(activity.socialDemand)} className="min-h-[132px] bg-white">
              <SignalBadge tone={demandTone(activity.socialDemand)}>Social</SignalBadge>
            </MatrixCell>
            <MatrixCell title={activity.recoveryFlexibility} tone={demandTone(activity.recoveryFlexibility)} className="min-h-[132px] bg-white">
              <ConfidencePill level={confidenceLevelForActivity(activity)}>
                Recovery
              </ConfidencePill>
            </MatrixCell>
            <MatrixCell
              title={activity.supportNeed}
              description={`Exposure: ${activity.exposure} · Logistics: ${activity.logisticalComplexity}`}
              tone="ranch"
              className="min-h-[132px] bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMatrix() {
  return (
    <div className="lg:hidden">
      <MatrixGrid columns={2}>
        {activityConfidenceMatrix.map((activity) => (
          <ActivityMobileCard key={activity.id} activity={activity} />
        ))}
      </MatrixGrid>
    </div>
  );
}

export default function ActivityConfidenceMatrix() {
  return (
    <DiagramShell
      eyebrow="Activity Confidence Matrix"
      title="How activity types change the confidence support a guest needs."
      description="A compact comparison of outdoor hospitality experiences by skill, intensity, exposure, weather sensitivity, social demand, logistical complexity, recovery flexibility, and support strategy."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="activity-confidence-matrix-summary">
        <p id="activity-confidence-matrix-summary" className="sr-only">
          This matrix compares riding, hiking, paddling, wildlife viewing, guided tours, wellness experiences, and conservation activities by skill, intensity, exposure, weather sensitivity, social demand, logistical complexity, recovery flexibility, and support need.
        </p>

        <div className="mb-5 grid gap-4 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] md:items-center">
          <DiagramCard
            label="Reading the Matrix"
            title="Confidence demand is contextual."
            description="The same guest can feel confident in one activity and uncertain in another when skill, weather, social pressure, or fallback clarity changes."
            tone="confidence"
            className="bg-white"
          />
          <div className="flex flex-wrap gap-2 rounded-2xl border border-neutral-200 bg-white p-4">
            <SignalBadge tone="stewardship">Low demand</SignalBadge>
            <SignalBadge tone="confidence">Medium demand</SignalBadge>
            <SignalBadge tone="recovery">High demand</SignalBadge>
            <ConfidencePill level="high">Flexible recovery</ConfidencePill>
          </div>
        </div>

        <DesktopMatrix />
        <MobileMatrix />
      </figure>
    </DiagramShell>
  );
}
