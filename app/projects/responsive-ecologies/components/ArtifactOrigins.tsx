import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { artifactOrigins, type ArtifactOrigin } from '../content';
import { SectionHeading, contentBounds } from './shared';

const artifactToneClasses: Record<ArtifactOrigin['tone'], string> = {
  cyan: 'border-cyan-200 bg-cyan-50/60 text-cyan-800',
  emerald: 'border-emerald-200 bg-emerald-50/60 text-emerald-800',
  stone: 'border-stone-200 bg-stone-50 text-stone-700',
};

export default function ArtifactOrigins() {
  return (
    <section
      id="artifact-origins"
      aria-labelledby="artifact-origins-title"
      className="bg-[#f5f3ec] py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="artifact-origins-title"
          eyebrow="02 // Artifact Origins"
          title="Responsive Ecologies evolves existing systems instead of starting from zero."
          intro="The project synthesizes proven patterns and inventoried artifacts from two public case studies with the research and traceability structure of the Environmental Systems Design OS."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {artifactOrigins.map((origin) => (
            <article
              key={origin.id}
              className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-6 md:p-7"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full border ${artifactToneClasses[origin.tone]}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
                    Source system
                  </p>
                  <h3 className="mt-2 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                    {origin.project}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                {origin.contribution}
              </p>

              <div className="mt-6 border-t border-stone-200 pt-5">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-stone-500">
                  Inherited artifacts
                </p>
                <ul className="mt-3 space-y-2">
                  {origin.artifacts.map((artifact) => (
                    <li key={artifact} className="flex gap-2 text-sm text-neutral-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" aria-hidden="true" />
                      <span>{artifact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`mt-6 rounded-xl border p-4 text-sm leading-relaxed ${artifactToneClasses[origin.tone]}`}>
                <span className="font-bold">Evolution: </span>
                {origin.evolution}
              </div>

              {origin.projectHref && (
                <Link
                  href={origin.projectHref}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4"
                >
                  Explore source project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-emerald-900/10 bg-emerald-950 p-6 text-white md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:p-8">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              Research
            </p>
            <p className="mt-2 text-sm text-neutral-300">Observations and evidence limits</p>
          </div>
          <ArrowRight className="hidden h-5 w-5 text-emerald-300 md:block" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              System artifacts
            </p>
            <p className="mt-2 text-sm text-neutral-300">Reusable models and decision structures</p>
          </div>
          <ArrowRight className="hidden h-5 w-5 text-emerald-300 md:block" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              Responsive Ecologies
            </p>
            <p className="mt-2 text-sm text-neutral-300">A coherent stewardship system</p>
          </div>
        </div>
      </div>
    </section>
  );
}
