import Link from 'next/link';
import { ArrowRight, Layers3, ShieldCheck } from 'lucide-react';
import {
  nextValidationSteps,
  relatedProjects,
} from '../content';
import { SectionHeading, contentBounds } from './shared';

export default function ProjectFooter() {
  return (
    <section
      id="project-footer"
      aria-labelledby="project-footer-title"
      className="bg-emerald-950 py-16 text-white md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="project-footer-title"
          eyebrow="11 // Next Direction"
          title="The next proof point is field validation, not more interface."
          intro="Responsive Ecologies now has a coherent narrative, decision model, confidence logic, recovery path, and evidence boundary. Future work should test those structures with real stewards before adding richer interaction."
          dark
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-7">
            <div className="flex gap-3">
              <Layers3 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                  Validation priorities
                </p>
                <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-white">
                  Move from internally coherent to externally credible.
                </h3>
              </div>
            </div>

            <ol className="mt-7 grid gap-4 md:grid-cols-2">
              {nextValidationSteps.map((step, index) => (
                <li key={step} className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="font-mono text-sm font-bold text-emerald-300">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-200">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </article>

          <aside className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/[0.08] p-6 md:p-8 lg:col-span-5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                  Evidence boundary
                </p>
                <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-white">
                  Concept architecture, not ecological outcome proof.
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-neutral-200">
                  The current work supports system architecture, artifact synthesis, and
                  validation planning. Live deployment, autonomous field control, and
                  measured ecological outcomes remain outside the evidence boundary.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
            Source projects
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <Link
                key={project.id}
                href={project.href}
                className="group rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-emerald-300/35 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-950"
              >
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-emerald-300">
                  {project.relationship}
                </p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-tiempos text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      {project.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-emerald-300 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-4xl border-l-2 border-emerald-300 pl-5 font-tiempos text-2xl font-bold leading-relaxed text-white md:text-3xl">
          Responsive Ecologies makes the Environmental Systems Design OS visible as a
          practice: research becomes evidence, evidence becomes artifacts, and artifacts
          become accountable stewardship decisions.
        </p>
      </div>
    </section>
  );
}
