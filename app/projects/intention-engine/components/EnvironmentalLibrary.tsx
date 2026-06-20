import { Flame, Footprints, Mountain, Trees, Waves, Wind } from 'lucide-react';
import { environmentalAffordances, intentionStates } from '../content';
import { contentBounds, SectionHeading } from './shared';

const affordanceIcons = [Mountain, Waves, Trees, Wind, Footprints, Flame];

export function EnvironmentalAffordances() {
  return (
    <section id="environmental-affordances" aria-labelledby="environmental-affordances-title" className="scroll-mt-20 bg-[#eeeade] py-16 md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="environmental-affordances-title"
          eyebrow="06 // Environmental Affordances"
          title="Landscapes offer different opportunities for transformation."
          intro="Environmental affordances describe what a place can support experientially. They are not universal meanings; each must be interpreted through ecology, culture, season, and the guest’s own language."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {environmentalAffordances.map((item, index) => {
              const Icon = affordanceIcons[index];
            return (
              <article key={item.affordance} className="rounded-[1.5rem] border border-stone-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-stone-600">
                    Environmental affordance
                  </p>
                </div>
                <h3 className="mt-5 font-tiempos text-2xl font-bold text-neutral-950">{item.affordance}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{item.designUse}</p>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-stone-200 pt-4">
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.13em] text-stone-600">Can support</span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-900">
                    {item.experienceSupport}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function BlueprintLibrary() {
  return (
    <section id="blueprint-library" aria-labelledby="blueprint-library-title" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="blueprint-library-title"
          eyebrow="07 // Initial Transformation Library"
          title="The same canvas produces different experiential compositions."
          intro="These are example intention states, not personality types. Each begins with guest language and remains open to revision."
        />
        <div className="grid gap-5 xl:grid-cols-2">
          {intentionStates.map((state) => (
            <article key={state.name} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6 md:p-7">
              <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">Example intention state</p>
                  <h3 className="mt-3 font-tiempos text-3xl font-bold text-neutral-950">{state.name}</h3>
                  <p className="mt-4 text-sm italic leading-relaxed text-neutral-700">{state.startingLanguage}</p>
                  <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-bold text-amber-950">{state.desiredShift}</p>
                </div>
                <dl className="divide-y divide-stone-200 border-t border-stone-200 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:border-t-0">
                  {[
                    ['Spatial rhythm', state.spatialRhythm],
                    ['Sensory profile', state.sensoryProfile],
                    ['Social permeability', state.socialPermeability],
                    ['Agency level', state.agencyLevel],
                    ['Threshold moment', state.thresholdMoment],
                    ['Recovery option', state.recoveryOption],
                  ].map(([term, description]) => (
                    <div key={term} className="py-3 first:pt-4 last:pb-0 sm:rounded-xl sm:border sm:border-stone-200 sm:bg-white sm:p-3">
                      <dt className="font-mono text-[9px] font-black uppercase tracking-[0.13em] text-stone-600">{term}</dt>
                      <dd className="mt-2 text-xs leading-relaxed text-neutral-700">{description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
