import {
  ConfidencePill,
  DiagramCard,
  DiagramConnector,
  DiagramShell,
  SignalBadge,
  TraceRail,
  TraceStep,
} from './primitives';
import { weatherScenarioSteps } from './data';
import type { ConfidenceLevel, DiagramTone } from './primitives';

const confidenceLevelByTone: Record<DiagramTone, ConfidenceLevel> = {
  ranch: 'medium',
  signal: 'medium',
  confidence: 'high',
  recovery: 'recovery',
  operations: 'medium',
  stewardship: 'high',
  neutral: 'medium',
};

function StepDetails({
  step,
}: {
  step: (typeof weatherScenarioSteps)[number];
}) {
  return (
    <div className="space-y-4 border-t border-neutral-100 pt-4">
      <div className="flex flex-wrap gap-2">
        <ConfidencePill level={confidenceLevelByTone[step.tone]}>
          {step.confidenceState}
        </ConfidencePill>
        {step.signals.map((signal) => (
          <SignalBadge key={signal} tone={step.tone}>
            {signal}
          </SignalBadge>
        ))}
      </div>
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

function ScenarioStepCard({
  step,
  index,
}: {
  step: (typeof weatherScenarioSteps)[number];
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
      <StepDetails step={step} />
    </DiagramCard>
  );
}

function DesktopTimeline() {
  const topSteps = weatherScenarioSteps.slice(0, 4);
  const bottomSteps = weatherScenarioSteps.slice(4);

  return (
    <div className="hidden lg:block">
      <div className="grid gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        {topSteps.map((step, index) => (
          <ScenarioStepCard key={step.id} step={step} index={index} />
        ))}
      </div>

      <div className="grid gap-4 py-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center" aria-hidden="true">
        <div className="h-px bg-neutral-200" />
        <DiagramConnector />
        <div className="h-px bg-neutral-200" />
        <DiagramConnector />
        <div className="h-px bg-neutral-200" />
        <DiagramConnector />
        <div className="h-px bg-neutral-200" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        {bottomSteps.map((step, index) => (
          <ScenarioStepCard key={step.id} step={step} index={index + topSteps.length} />
        ))}
      </div>
    </div>
  );
}

function MobileTimeline() {
  return (
    <TraceRail className="lg:hidden">
      {weatherScenarioSteps.map((step, index) => (
        <TraceStep
          key={step.id}
          index={index + 1}
          title={step.title}
          description={step.description}
          meta={step.confidenceState}
          tone={step.tone}
        >
          <StepDetails step={step} />
        </TraceStep>
      ))}
    </TraceRail>
  );
}

export default function WeatherScenarioWalkthrough() {
  return (
    <DiagramShell
      eyebrow="Weather-Shifted Scenario Walkthrough"
      title="A horseback ride changes when the weather changes."
      description="A scenario trace showing how the companion interprets weather, guest confidence, family preferences, staff judgment, and recovery options before guidance reaches the guest."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="weather-scenario-walkthrough-summary">
        <p id="weather-scenario-walkthrough-summary" className="sr-only">
          This scenario trace shows how a weather-shifted horseback riding activity moves through signal detection, confidence drop, interpretation, human validation, recovery, and outcome.
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(240px,0.32fr)_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <DiagramCard
              label="Scenario Context"
              title="Guest ranch / horseback riding"
              description="A family has booked a guided horseback ride. Weather changes before the activity, and the system must preserve the guest's original outdoor intent while reducing risk and uncertainty."
              tone="ranch"
              className="bg-white"
            >
              <div className="space-y-4 border-t border-neutral-100 pt-4">
                <div className="flex flex-wrap gap-2">
                  <SignalBadge tone="ranch">Original intent: ride</SignalBadge>
                  <SignalBadge tone="signal">Weather shift</SignalBadge>
                  <SignalBadge tone="stewardship">Staff validation</SignalBadge>
                </div>
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-neutral-400">
                    Outcome Goal
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    Guest adapts to a safer or better-fit path while maintaining confidence and trust.
                  </p>
                </div>
              </div>
            </DiagramCard>
          </div>

          <div>
            <DesktopTimeline />
            <MobileTimeline />
          </div>
        </div>
      </figure>
    </DiagramShell>
  );
}
