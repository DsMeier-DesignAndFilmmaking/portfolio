import {
  ConfidencePill,
  DiagramCard,
  DiagramConnector,
  DiagramNode,
  DiagramShell,
  SignalBadge,
  TraceRail,
  TraceStep,
} from './primitives';
import { recoveryAlternativePaths, recoveryPathSteps } from './data';
import type { ConfidenceLevel, DiagramTone } from './primitives';

const disruptionExamples = [
  'Weather shift',
  'Trail closure',
  'Guide reassignment',
  'Skill mismatch',
  'Family preference conflict',
  'Equipment readiness issue',
];

const recoveryPrinciples = [
  'Preserve original intent',
  'Explain what changed',
  'Reduce options',
  'Human validation',
  'Protect safety/stewardship',
  'Restore confidence',
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

function RecoveryDetails({
  step,
}: {
  step: (typeof recoveryPathSteps)[number];
}) {
  return (
    <div className="space-y-4 border-t border-neutral-100 pt-4">
      <ConfidencePill level={confidenceLevelByTone[step.tone]}>
        {step.confidenceImpact}
      </ConfidencePill>
      <div>
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-neutral-400">
          System Response
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
          {step.systemResponse}
        </p>
      </div>
    </div>
  );
}

function RecoveryStepCard({
  step,
  index,
}: {
  step: (typeof recoveryPathSteps)[number];
  index: number;
}) {
  return (
    <DiagramCard
      label={String(index + 1).padStart(2, '0')}
      title={step.title}
      description={step.description}
      tone={step.tone}
      className="h-full bg-white"
    >
      <RecoveryDetails step={step} />
    </DiagramCard>
  );
}

function AlternativePathCard({
  path,
}: {
  path: (typeof recoveryAlternativePaths)[number];
}) {
  return (
    <DiagramCard
      label="Alternative Path"
      title={`${path.original} -> ${path.alternative}`}
      description={path.humanHandoff}
      tone="ranch"
      className="bg-white"
    >
      <SignalBadge tone="confidence">{path.preservedIntent}</SignalBadge>
    </DiagramCard>
  );
}

function DesktopFlow() {
  const firstGroup = recoveryPathSteps.slice(0, 4);
  const secondGroup = recoveryPathSteps.slice(4, 7);
  const learningStep = recoveryPathSteps[7];

  return (
    <div className="hidden lg:block">
      <div className="grid gap-4 lg:grid-cols-4">
        {firstGroup.map((step, index) => (
          <RecoveryStepCard key={step.id} step={step} index={index} />
        ))}
      </div>

      <div className="flex justify-center py-5" aria-hidden="true">
        <DiagramConnector />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {secondGroup.map((step, index) => (
          <RecoveryStepCard key={step.id} step={step} index={index + firstGroup.length} />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-center">
          <DiagramNode
            label={`08 / ${learningStep.title}`}
            description={learningStep.description}
            tone={learningStep.tone}
            className="bg-white p-4"
          />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
              Repeat Pattern
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {learningStep.systemResponse}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFlow() {
  return (
    <TraceRail className="lg:hidden">
      {recoveryPathSteps.map((step, index) => (
        <TraceStep
          key={step.id}
          index={index + 1}
          title={step.title}
          description={step.description}
          meta={step.confidenceImpact}
          tone={step.tone}
        >
          <RecoveryDetails step={step} />
        </TraceStep>
      ))}
    </TraceRail>
  );
}

export default function RecoveryPathDiagram() {
  return (
    <DiagramShell
      eyebrow="Recovery Path Architecture"
      title="How disrupted ranch plans become confidence-restoring alternatives."
      description="A recovery model for translating disruption into intent preservation, staff handoffs, alternative paths, and learning signals."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="recovery-path-diagram-summary">
        <p id="recovery-path-diagram-summary" className="sr-only">
          This recovery diagram shows how ranch disruptions move through confidence drop, intent preservation, human handoff, alternative path, confidence restoration, and learning.
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,1fr)_minmax(240px,0.32fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <DiagramCard
              label="Disruption Context"
              title="Plans change. Confidence should not collapse."
              description="Recovery begins by naming what changed, protecting the original guest intent, and making ownership visible."
              tone="recovery"
              className="bg-white"
            >
              <div className="flex flex-wrap gap-2">
                {disruptionExamples.map((example) => (
                  <SignalBadge key={example} tone="signal">
                    {example}
                  </SignalBadge>
                ))}
              </div>
            </DiagramCard>
          </div>

          <div>
            <DesktopFlow />
            <MobileFlow />
          </div>

          <div className="space-y-4 lg:sticky lg:top-28">
            <DiagramCard
              label="Alternative Paths"
              title="The replacement must preserve the reason the guest cared."
              description="Alternatives are evaluated by preserved intent, staff ownership, and confidence fit."
              tone="ranch"
              className="bg-white"
            />
            <div className="grid gap-3">
              {recoveryAlternativePaths.map((path) => (
                <AlternativePathCard key={path.id} path={path} />
              ))}
            </div>
          </div>
        </div>

        <figcaption className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 md:p-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
            Key Recovery Principles
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {recoveryPrinciples.map((principle) => (
              <SignalBadge
                key={principle}
                tone={principle.includes('Human') || principle.includes('stewardship') ? 'stewardship' : principle.includes('confidence') ? 'confidence' : 'recovery'}
              >
                {principle}
              </SignalBadge>
            ))}
          </div>
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
