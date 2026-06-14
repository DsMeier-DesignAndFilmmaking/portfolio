import {
  ConfidencePill,
  DiagramCard,
  DiagramShell,
  MatrixCell,
  MatrixGrid,
  SignalBadge,
  type ConfidenceLevel,
  type DiagramTone,
} from './primitives';
import { applicationsMatrix } from './data';

const matrixColumns = [
  'Primary Guest Uncertainty',
  'Operational Complexity',
  'Environmental Variability',
  'Stewardship Sensitivity',
  'Recovery Importance',
  'Confidence Opportunity',
];

const transferabilityThemes = [
  'Activity Selection',
  'Environmental Awareness',
  'Stewardship Communication',
  'Operational Coordination',
  'Recovery Support',
  'Confidence Building',
];

function toneForValue(value: string): DiagramTone {
  const normalized = value.toLowerCase();

  if (normalized.includes('critical')) return 'recovery';
  if (normalized.includes('high')) return 'confidence';
  if (normalized.includes('medium')) return 'stewardship';
  return 'neutral';
}

function confidenceForValue(value: string): ConfidenceLevel {
  const normalized = value.toLowerCase();

  if (normalized.includes('critical')) return 'recovery';
  if (normalized.includes('high')) return 'high';
  if (normalized.includes('medium')) return 'medium';
  return 'low';
}

function DesktopMatrix() {
  return (
    <div className="hidden xl:block">
      <div className="grid grid-cols-[minmax(190px,1fr)_minmax(170px,1fr)_repeat(4,minmax(120px,0.72fr))_minmax(190px,1.1fr)] gap-2">
        <div className="rounded-xl border border-neutral-200 bg-white px-3 py-3">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
            Environment
          </p>
        </div>
        {matrixColumns.map((column) => (
          <div key={column} className="rounded-xl border border-neutral-200 bg-white px-3 py-3">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
              {column}
            </p>
          </div>
        ))}

        {applicationsMatrix.map((application) => (
          <div key={application.id} className="contents">
            <MatrixCell
              title={application.environment}
              description="Place-based hospitality context"
              tone="ranch"
              className="min-h-[130px] bg-white"
            />
            <MatrixCell
              title={application.guestUncertainty}
              tone="neutral"
              className="min-h-[130px] bg-white"
            />
            <MatrixCell
              title={application.operationalComplexity}
              tone={toneForValue(application.operationalComplexity)}
              className="min-h-[130px] bg-white"
            >
              <SignalBadge tone={toneForValue(application.operationalComplexity)}>
                operations
              </SignalBadge>
            </MatrixCell>
            <MatrixCell
              title={application.environmentalVariability}
              tone={toneForValue(application.environmentalVariability)}
              className="min-h-[130px] bg-white"
            >
              <SignalBadge tone={toneForValue(application.environmentalVariability)}>
                environment
              </SignalBadge>
            </MatrixCell>
            <MatrixCell
              title={application.stewardshipSensitivity}
              tone={toneForValue(application.stewardshipSensitivity)}
              className="min-h-[130px] bg-white"
            >
              <SignalBadge tone={toneForValue(application.stewardshipSensitivity)}>
                stewardship
              </SignalBadge>
            </MatrixCell>
            <MatrixCell
              title={application.recoveryImportance}
              tone={toneForValue(application.recoveryImportance)}
              className="min-h-[130px] bg-white"
            >
              <ConfidencePill level={confidenceForValue(application.recoveryImportance)}>
                recovery
              </ConfidencePill>
            </MatrixCell>
            <MatrixCell
              title={application.confidenceOpportunity}
              tone="confidence"
              className="min-h-[130px] bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function AttributeRow({
  label,
  value,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  tone?: DiagramTone;
}) {
  return (
    <div className="grid gap-2 rounded-xl border border-neutral-100 bg-neutral-50/70 px-3 py-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
      <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </p>
      <div className="min-w-0">
        {label.includes('Importance') || label.includes('Complexity') || label.includes('Variability') || label.includes('Sensitivity') ? (
          <SignalBadge tone={tone}>{value}</SignalBadge>
        ) : (
          <p className="text-sm leading-relaxed text-neutral-600">{value}</p>
        )}
      </div>
    </div>
  );
}

function MobileMatrix() {
  return (
    <div className="xl:hidden">
      <MatrixGrid columns={2}>
        {applicationsMatrix.map((application) => (
          <DiagramCard
            key={application.id}
            label="Environment"
            title={application.environment}
            description={application.guestUncertainty}
            tone="neutral"
            className="bg-white"
          >
            <div className="flex flex-wrap gap-2">
              <ConfidencePill level={confidenceForValue(application.recoveryImportance)}>
                {application.recoveryImportance} recovery
              </ConfidencePill>
              <SignalBadge tone={toneForValue(application.stewardshipSensitivity)}>
                {application.stewardshipSensitivity} stewardship
              </SignalBadge>
            </div>
            <div className="mt-5 grid gap-2">
              <AttributeRow
                label="Operational Complexity"
                value={application.operationalComplexity}
                tone={toneForValue(application.operationalComplexity)}
              />
              <AttributeRow
                label="Environmental Variability"
                value={application.environmentalVariability}
                tone={toneForValue(application.environmentalVariability)}
              />
              <AttributeRow
                label="Stewardship Sensitivity"
                value={application.stewardshipSensitivity}
                tone={toneForValue(application.stewardshipSensitivity)}
              />
              <AttributeRow
                label="Recovery Importance"
                value={application.recoveryImportance}
                tone={toneForValue(application.recoveryImportance)}
              />
              <AttributeRow
                label="Confidence Opportunity"
                value={application.confidenceOpportunity}
                tone="confidence"
              />
            </div>
          </DiagramCard>
        ))}
      </MatrixGrid>
    </div>
  );
}

function TransferabilityThemes() {
  return (
    <DiagramCard
      label="Transferability Themes"
      title="The same confidence mechanics appear across place-based experiences."
      description="These themes recur whenever guests must interpret activity fit, environmental change, operational constraints, and stewardship expectations."
      tone="stewardship"
      className="bg-white"
    >
      <div className="flex flex-wrap gap-2">
        {transferabilityThemes.map((theme) => (
          <SignalBadge
            key={theme}
            tone={
              theme.includes('Recovery')
                ? 'recovery'
                : theme.includes('Operational')
                  ? 'operations'
                  : theme.includes('Stewardship')
                    ? 'stewardship'
                    : theme.includes('Environmental')
                      ? 'signal'
                      : 'confidence'
            }
          >
            {theme}
          </SignalBadge>
        ))}
      </div>
    </DiagramCard>
  );
}

function TransferabilitySummary() {
  return (
    <DiagramCard
      label="Framework Transfer"
      title="Confidence-centered environmental systems design travels beyond ranches."
      description="The framework is transferable because uncertainty, guidance, confidence, and recovery occur across many place-based experiences."
      tone="confidence"
      className="bg-white"
    >
      <div className="grid gap-3 md:grid-cols-4">
        {['Uncertainty', 'Guidance', 'Confidence', 'Recovery'].map((mechanic) => (
          <div key={mechanic} className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
            <p className="text-sm font-bold leading-snug text-neutral-950">
              {mechanic}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              {mechanic === 'Uncertainty'
                ? 'Guests need help interpreting fit, conditions, and expectations.'
                : mechanic === 'Guidance'
                  ? 'The system translates context without removing choice.'
                  : mechanic === 'Confidence'
                    ? 'Trust grows when guests can see why an option fits.'
                    : 'Plans remain credible when alternatives preserve intent.'}
            </p>
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

export default function ApplicationsMatrixVisual() {
  return (
    <DiagramShell
      eyebrow="Applications Matrix"
      title="Where the Adaptive Ranch framework can transfer."
      description="A matrix for seeing ranch hospitality as one expression of a broader confidence-centered approach to environmental systems design."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="applications-matrix-summary">
        <p id="applications-matrix-summary" className="sr-only">
          This matrix compares how confidence-centered guidance systems apply across ranches, lodges, parks, resorts, and conservation environments.
        </p>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-950/[0.03] md:p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                  Transferability Matrix
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  The framework moves with the pattern: guests face uncertainty, the environment changes, operations carry constraints, and recovery protects trust.
                </p>
              </div>
              <ConfidencePill level="high">Beyond ranches</ConfidencePill>
            </div>

            <DesktopMatrix />
            <MobileMatrix />
          </div>

          <TransferabilityThemes />
          <TransferabilitySummary />
        </div>
      </figure>
    </DiagramShell>
  );
}
