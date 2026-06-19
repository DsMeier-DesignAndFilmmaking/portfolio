import { ShieldCheck, Sprout } from 'lucide-react';
import { projectMetadata } from '../content';
import { ConceptTag, SectionHeading, contentBounds } from './shared';

export default function ProjectFrame() {
  return (
    <section
      id="project-frame"
      aria-labelledby="project-frame-title"
      className="bg-neutral-950 py-16 text-white md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="project-frame-title"
          eyebrow="01 // Project Frame"
          title="A system for coordinated stewardship, not autonomous control."
          intro={projectMetadata.thesis}
          dark
        />

        <div className="grid gap-5 lg:grid-cols-12">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-5">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
              Practice position
            </p>
            <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
              The OS becomes an operating design method.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-neutral-300">
              Responsive Ecologies connects research, signals, decision models, system
              artifacts, authority, and recovery. Earlier confidence and hospitality
              systems become a framework for accountable care across living landscapes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {projectMetadata.audiences.map((audience) => (
                <ConceptTag key={audience} dark>
                  {audience}
                </ConceptTag>
              ))}
            </div>
          </article>

          <div className="grid gap-5 md:grid-cols-2 lg:col-span-7">
            <article className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                Current evidence supports
              </p>
              <ul className="mt-5 space-y-3">
                {projectMetadata.evidenceBoundary.supported.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-200">
                    <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/[0.07] p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                This phase does not claim
              </p>
              <ul className="mt-5 space-y-3">
                {projectMetadata.evidenceBoundary.notClaimed.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-200">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
