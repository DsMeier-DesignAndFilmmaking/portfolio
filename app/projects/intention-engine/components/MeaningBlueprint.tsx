import { transformationBlueprint, translationStages, type TranslationStage } from '../content';
import { contentBounds, SectionHeading } from './shared';

const toneClasses: Record<TranslationStage['tone'], string> = {
  clay: 'border-orange-200 bg-orange-50 text-orange-900',
  moss: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  water: 'border-sky-200 bg-sky-50 text-sky-900',
  dawn: 'border-amber-200 bg-amber-50 text-amber-900',
  ink: 'border-violet-200 bg-violet-50 text-violet-900',
  lichen: 'border-lime-200 bg-lime-50 text-lime-900',
};

const blueprintPhases = [
  { label: 'Meaning', detail: 'Intent + desired shift', tone: 'bg-amber-300' },
  { label: 'Composition', detail: 'Environmental + experiential conditions', tone: 'bg-emerald-300' },
  { label: 'Integration', detail: 'Threshold + carry-forward', tone: 'bg-sky-300' },
];

function phaseForIndex(index: number) {
  if (index < 2) return blueprintPhases[0];
  if (index < 6) return blueprintPhases[1];
  return blueprintPhases[2];
}

export function MeaningTranslationModel() {
  return (
    <section id="meaning-translation" aria-labelledby="meaning-translation-title" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="meaning-translation-title"
          eyebrow="04 // Meaning Translation Model"
          title="Language becomes a design brief through explicit interpretive steps."
          intro="The model preserves the chain from what a guest says to the environmental and service conditions proposed in response."
        />
        <figure aria-describedby="meaning-translation-summary">
          <p id="meaning-translation-summary" className="sr-only">
            Six stages translate self-described intention into desired shift, experience
            qualities, environmental conditions, service requirements, and a blueprint output.
          </p>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            {translationStages.map((stage, index) => (
              <article key={stage.label} className={`rounded-2xl border p-5 ${toneClasses[stage.tone]}`}>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em]">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-tiempos text-xl font-bold text-neutral-950">{stage.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{stage.description}</p>
                <p className="mt-4 border-t border-current/15 pt-3 text-xs font-semibold leading-relaxed">{stage.example}</p>
              </article>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}

export default function TransformationBlueprint() {
  return (
    <section id="transformation-blueprint" aria-labelledby="transformation-blueprint-title" className="scroll-mt-20 bg-neutral-950 py-16 text-white md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="transformation-blueprint-title"
          eyebrow="05 // Signature Artifact"
          title="Transformation Blueprint Canvas"
          intro="A single canvas connects intention to environmental composition, service choreography, and the final act of integration."
          dark
        />
        <figure aria-describedby="blueprint-summary">
          <p id="blueprint-summary" className="sr-only">
            Nine connected blueprint dimensions move from intention and desired shift through
            environmental, spatial, sensory, and social conditions to threshold, integration,
            and departure.
          </p>
          <div className="mb-5 grid gap-2 sm:grid-cols-3" aria-label="Blueprint layer legend">
            {blueprintPhases.map((phase) => (
              <div key={phase.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${phase.tone}`} aria-hidden="true" />
                <div>
                  <p className="text-xs font-black text-white">{phase.label}</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-stone-400">{phase.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {transformationBlueprint.map((item, index) => {
              const phase = phaseForIndex(index);
              return (
                <article key={item.dimension} className={`relative rounded-[1.4rem] border p-5 ${
                  index < 2 ? 'border-amber-300/25 bg-amber-300/[0.08]' :
                  index < 6 ? 'border-emerald-300/20 bg-emerald-300/[0.06]' :
                  'border-sky-300/20 bg-sky-300/[0.06]'
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-stone-300">
                      {String(index + 1).padStart(2, '0')} / {phase.label}
                    </p>
                    <span className={`h-2 w-2 rounded-full ${phase.tone}`} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-tiempos text-2xl font-bold text-white">{item.dimension}</h3>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-stone-100">{item.value}</p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-stone-300">{item.designQuestion}</p>
                </article>
              );
            })}
          </div>
          <figcaption className="mt-6 border-l-2 border-amber-300 pl-4 text-sm leading-relaxed text-stone-300">
            The canvas is a design and discussion artifact. It makes interpretive assumptions
            visible before they become a guest journey.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
