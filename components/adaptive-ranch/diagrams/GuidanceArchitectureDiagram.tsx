import {
  ConfidencePill,
  DiagramCard,
  DiagramConnector,
  DiagramNode,
  DiagramShell,
  MatrixCell,
  MatrixGrid,
  SignalBadge,
} from './primitives';
import {
  guidanceAgencyRules,
  guidanceArchitectureFlow,
  guidanceCategories,
} from './data';

const guidanceStrategies = [
  'Clarify',
  'Confirm',
  'Recommend',
  'Offer Alternatives',
  'Reduce Options',
  'Delay Decision',
  'Escalate to Human Support',
  'Reframe Situation',
];

function FlowStep({
  item,
  index,
}: {
  item: (typeof guidanceArchitectureFlow)[number];
  index: number;
}) {
  return (
    <DiagramNode
      label={`${String(index + 1).padStart(2, '0')} / ${item.title}`}
      description={item.description}
      tone={item.tone}
      className="min-h-[128px] bg-white p-4"
    />
  );
}

function DesktopFlow() {
  return (
    <div className="hidden lg:block">
      <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        {guidanceArchitectureFlow.map((item, index) => (
          <div key={item.id} className="contents">
            <FlowStep item={item} index={index} />
            {index < guidanceArchitectureFlow.length - 1 && <DiagramConnector />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileFlow() {
  return (
    <div className="space-y-3 lg:hidden">
      {guidanceArchitectureFlow.map((item, index) => (
        <div key={item.id}>
          <FlowStep item={item} index={index} />
          {index < guidanceArchitectureFlow.length - 1 && <DiagramConnector />}
        </div>
      ))}
    </div>
  );
}

function GuidanceCategoryCard({
  category,
}: {
  category: (typeof guidanceCategories)[number];
}) {
  return (
    <MatrixCell
      label="Guidance Category"
      title={category.title}
      description={category.purpose}
      tone={category.id === 'recovery' ? 'recovery' : category.id === 'stewardship' ? 'stewardship' : 'neutral'}
      className="bg-white"
    >
      <div className="space-y-4 border-t border-neutral-100 pt-4">
        <ConfidencePill level={category.id === 'recovery' ? 'recovery' : 'medium'}>
          {category.confidenceImpact}
        </ConfidencePill>
        <div>
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-neutral-400">
            Example
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
            {category.example}
          </p>
        </div>
      </div>
    </MatrixCell>
  );
}

function AgencyRules() {
  return (
    <DiagramCard
      label="Agency Rules"
      title="Guidance supports choice. It does not command behavior."
      description="These rules prevent the companion from turning contextual support into command-and-control automation."
      tone="ranch"
      className="bg-white"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guidanceAgencyRules.map((rule) => (
          <div key={rule.id} className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
            <p className="text-sm font-bold leading-snug text-neutral-950">
              {rule.rule}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
              {rule.description}
            </p>
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

export default function GuidanceArchitectureDiagram() {
  return (
    <DiagramShell
      eyebrow="Guidance Architecture"
      title="How ranch signals become guidance without becoming commands."
      description="A guidance model for interpreting context, choosing the right strategy, preserving guest agency, and learning from outcomes."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="guidance-architecture-summary">
        <p id="guidance-architecture-summary" className="sr-only">
          This guidance architecture diagram shows how ranch signals become interpreted guidance strategies that preserve guest choice and support confident action.
        </p>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.03]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                  Signal to Agency Flow
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  The system interprets before it advises, then leaves the final decision with the guest.
                </p>
              </div>
              <ConfidencePill level="high">Choice-preserving guidance</ConfidencePill>
            </div>
            <DesktopFlow />
            <MobileFlow />
          </div>

          <DiagramCard
            label="Guidance Strategies"
            title="The system chooses a strategy before it chooses words."
            description="These strategies keep guidance proportional to the guest's uncertainty instead of turning every moment into an instruction."
            tone="confidence"
            className="bg-white"
          >
            <div className="flex flex-wrap gap-2">
              {guidanceStrategies.map((strategy) => (
                <SignalBadge
                  key={strategy}
                  tone={strategy.includes('Human') ? 'stewardship' : strategy.includes('Alternatives') || strategy.includes('Delay') ? 'recovery' : 'confidence'}
                >
                  {strategy}
                </SignalBadge>
              ))}
            </div>
          </DiagramCard>

          <MatrixGrid columns={3}>
            {guidanceCategories.map((category) => (
              <GuidanceCategoryCard key={category.id} category={category} />
            ))}
          </MatrixGrid>

          <AgencyRules />
        </div>
      </figure>
    </DiagramShell>
  );
}
