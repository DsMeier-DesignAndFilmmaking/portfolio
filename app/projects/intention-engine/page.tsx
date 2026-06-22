import {
  ArrowDown,
  CheckCircle2,
  Eye,
  HandHeart,
  Leaf,
  Map,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import IntentionEngineProjectHeader from './ProjectHeader';
import BlueprintLibrary, { EnvironmentalAffordances } from './components/EnvironmentalLibrary';
import HeroLandscape from './components/HeroLandscape';
import ServiceRecovery, { GuestJourney } from './components/JourneyRecovery';
import TransformationBlueprint, { MeaningTranslationModel } from './components/MeaningBlueprint';
import { contentBounds, SectionHeading } from './components/shared';
import {
  compositionDimensions,
  discoveryMismatch,
  ethics,
  operatingStages,
  sectionNavigation,
  validationAreas,
} from './content';

export default function IntentionEnginePage() {
  return (
    <div className="intention-engine-root min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <style>{`
        @media (max-width: 1023px) and (max-height: 760px) {
          .intention-engine-root nav[aria-label='Page section navigation'] {
            top: 55% !important;
            gap: 0.125rem !important;
          }
          .intention-engine-root nav[aria-label='Page section navigation'] > button {
            padding-top: 0.2rem !important;
            padding-bottom: 0.2rem !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .intention-engine-root,
          .intention-engine-root * {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <a
        href="#intention-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
      >
        Skip to The Intention Engine content
      </a>
      <PageNavIndicator sections={[...sectionNavigation]} showDotsOnDesktop />
      <IntentionEngineProjectHeader />
      <HeroLandscape />

      <section id="project-frame" aria-labelledby="project-frame-title" className="scroll-mt-20 bg-neutral-950 py-16 text-white md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="project-frame-title"
            eyebrow="02 // Project Frame"
            title="Meaning, delivery, and lived experience remain distinct."
            intro="The Intention Engine defines the desired transformation. The guest journey makes it tangible. HADE may support adaptive delivery when conditions change, but it does not define the intention."
            dark
          />
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {[
              ['Why', 'Intention Engine', 'Defines desired transformation, meaning, and the experiential blueprint.'],
              ['What', 'Guest Experience', 'Makes the blueprint real through landscape, space, senses, service, and human presence.'],
              ['Adaptive how', 'HADE', 'Helps delivery respond when live conditions change, without redefining the guest’s intention.'],
            ].map(([label, title, description], index) => (
              <div key={title} className="contents">
                <article className={`rounded-[1.5rem] border p-6 ${index === 0 ? 'border-amber-300/25 bg-amber-300/[0.08]' : 'border-white/10 bg-white/[0.04]'}`}>
                  <p className={`font-mono text-[10px] font-black uppercase tracking-[0.18em] ${index === 0 ? 'text-amber-200' : 'text-stone-400'}`}>{label}</p>
                  <h3 className="mt-4 font-tiempos text-2xl font-bold text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-stone-300">{description}</p>
                </article>
                {index < 2 && <div className="flex justify-center py-1 lg:items-center lg:px-1" aria-hidden="true"><ArrowDown className="h-5 w-5 text-stone-600 lg:-rotate-90" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="discovery-problem" aria-labelledby="discovery-problem-title" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="discovery-problem-title"
            eyebrow="03 // The Discovery Problem"
            title="Human intention arrives as meaning. Travel systems ask for inventory filters."
            intro="A person may understand the change they need before they understand the destination, activity, or schedule capable of supporting it."
          />
          <div className="overflow-hidden rounded-[1.5rem] border border-stone-200">
            <div className="grid grid-cols-2 bg-stone-950 text-white">
              <p className="p-4 font-mono text-[10px] font-black uppercase tracking-[0.16em]">Human language</p>
              <p className="border-l border-white/10 p-4 font-mono text-[10px] font-black uppercase tracking-[0.16em]">System language</p>
            </div>
            {discoveryMismatch.map((row) => (
              <div key={row.human} className="grid grid-cols-2 border-t border-stone-200 bg-white">
                <p className="p-4 font-tiempos text-lg font-bold italic text-neutral-900 md:p-6 md:text-2xl">{row.human}</p>
                <p className="border-l border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-stone-600 md:p-6">{row.system}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MeaningTranslationModel />
      <TransformationBlueprint />
      <EnvironmentalAffordances />
      <BlueprintLibrary />

      <section id="spatial-sensory" aria-labelledby="spatial-sensory-title" className="scroll-mt-20 bg-[#f5f0e6] py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="spatial-sensory-title"
            eyebrow="08 // Spatial & Sensory Composition"
            title="Experience design happens through sequence, material, atmosphere, and human contact."
            intro="The blueprint becomes environmental when intention changes how arrival, movement, dwell, sensory attention, solitude, and service are composed."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {compositionDimensions.map(([title, description], index) => (
              <article key={title} className="rounded-[1.4rem] border border-stone-200 bg-white p-5">
                <p className="font-mono text-sm font-black text-emerald-800">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-tiempos text-2xl font-bold text-neutral-950">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GuestJourney />
      <ServiceRecovery />

      <section id="operating-model" aria-labelledby="operating-model-title" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="operating-model-title"
            eyebrow="11 // Operating Model"
            title="A blueprint becomes credible through place knowledge and accountable hospitality."
            intro="The operating model is deliberately service-oriented. It connects guest meaning to environmental affordances, operational constraints, and human interpretation."
          />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            {operatingStages.map(([title, description], index) => (
              <article key={title} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <div className="flex items-center justify-between"><Map className="h-4 w-4 text-emerald-800" /><span className="font-mono text-[9px] font-black text-stone-500">{String(index + 1).padStart(2, '0')}</span></div>
                <h3 className="mt-4 font-tiempos text-xl font-bold text-neutral-950">{title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-700">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="evidence-ethics" aria-labelledby="evidence-ethics-title" className="scroll-mt-20 bg-amber-50 py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="evidence-ethics-title"
            eyebrow="12 // Evidence Boundaries & Ethics"
            title="Interpretation must remain consensual, explainable, and limited."
            intro="The concept works only if people remain authors of their own intention. It does not infer diagnoses, hidden traits, or therapeutic needs."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ethics.map(([title, description], index) => {
              const icons = [HandHeart, Eye, ShieldCheck, Leaf, Sparkles, CheckCircle2];
              const Icon = icons[index];
              return (
                <article key={title} className="rounded-[1.4rem] border border-amber-200 bg-white p-5">
                  <Icon className="h-5 w-5 text-amber-900" aria-hidden="true" />
                  <h3 className="mt-4 font-tiempos text-xl font-bold text-neutral-950">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">{description}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-7 rounded-[1.4rem] border border-amber-300 bg-amber-100/60 p-5 font-tiempos text-xl font-bold leading-relaxed text-neutral-950">
            The system interprets self-described intentions. It does not diagnose people.
          </p>
        </div>
      </section>

      <section id="related-hade" aria-labelledby="related-hade-title" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="related-hade-title"
            eyebrow="13 // Related System: HADE"
            title="The systems connect at delivery, not identity."
            intro="The Intention Engine explores what a guest may be seeking. HADE explores how delivery can respond when conditions change."
          />
          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 md:flex-row md:items-stretch md:p-7">
            {[
              ['Desired Transformation', 'Guest-authored why'],
              ['Intention Engine', 'Experience blueprint'],
              ['HADE', 'Adaptive delivery'],
              ['Guest Experience', 'Lived journey'],
            ].map(([title, description], index) => (
              <div key={title} className="contents">
                <article className={`flex-1 rounded-xl border p-4 ${index === 1 ? 'border-amber-200 bg-amber-50' : index === 2 ? 'border-sky-200 bg-sky-50' : 'border-stone-200 bg-white'}`}>
                  <h3 className="text-sm font-black text-neutral-950">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">{description}</p>
                </article>
                {index < 3 && <ArrowDown className="mx-auto h-4 w-4 text-stone-300 md:my-auto md:-rotate-90" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="future-validation" aria-labelledby="future-validation-title" className="scroll-mt-20 bg-stone-950 py-16 text-white md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="future-validation-title"
            eyebrow="14 // Future Validation"
            title="The concept must earn credibility through language, place, and service research."
            intro="Validation should test whether the framework preserves agency and produces coherent environmental experiences across teams and cultures."
            dark
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {validationAreas.map((area, index) => (
              <article key={area.title} className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-5">
                <p className="font-mono text-[9px] font-black text-amber-200">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-tiempos text-xl font-bold text-white">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-300">{area.question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="closing-reflection" aria-labelledby="closing-reflection-title" className="scroll-mt-20 bg-[#e8e1d2] py-20 md:py-28">
        <div className={contentBounds}>
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-800">15 // Closing Reflection</p>
          <h2 id="closing-reflection-title" className="mt-5 max-w-4xl font-tiempos text-4xl font-bold leading-tight text-neutral-950 md:text-6xl">
            Designing for&nbsp;Transformation.
          </h2>
          <p className="mt-7 max-w-4xl text-lg leading-relaxed text-neutral-700 md:text-2xl">
            Most travel systems optimize for transactions. This concept explores whether
            environmental experiences can instead be designed around restoration,
            perspective, curiosity, reflection, and meaningful change.
          </p>
        </div>
      </section>
    </div>
  );
}
