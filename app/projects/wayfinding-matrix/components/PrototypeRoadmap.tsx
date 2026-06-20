import { CheckCircle2, FlaskConical, ShieldCheck } from 'lucide-react';
import { evidenceBoundaries, futureValidation, roadmap } from '../content';

const contentBounds = 'container mx-auto px-6 md:px-8';

export default function PrototypeRoadmap() {
  return (
    <>
      <section id="prototype-roadmap" aria-labelledby="prototype-roadmap-title" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="prototype-roadmap-title"
            eyebrow="11 // Prototype Roadmap"
            title="Build evidence in layers before building infrastructure."
            intro="The roadmap begins with a bounded landscape and observable human decisions, then earns its way toward sensing, escalation, and a supervised field pilot."
          />

          <ol className="grid gap-5 md:grid-cols-2">
            {roadmap.map((phase) => (
              <li key={phase.phase} className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-lg font-black text-emerald-700">{phase.phase}</span>
                  <FlaskConical className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-tiempos text-2xl font-bold text-neutral-950">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{phase.objective}</p>
                <ul className="mt-5 space-y-2">
                  {phase.outputs.map((output) => (
                    <li key={output} className="flex gap-2 text-xs leading-relaxed text-neutral-700">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden="true" />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-neutral-200 pt-4 text-xs font-bold leading-relaxed text-emerald-900">
                  Gate: {phase.validationGate}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="evidence-boundaries" aria-labelledby="evidence-boundaries-title" className="scroll-mt-20 bg-amber-50 py-16 md:py-24">
        <div className={contentBounds}>
          <SectionHeading
            id="evidence-boundaries-title"
            eyebrow="12 // Evidence Boundaries"
            title="The architecture is credible only when its uncertainty stays visible."
            intro="This portfolio phase defines relationships, safeguards, and testable hypotheses. It does not present speculative sensing or emergency behavior as validated capability."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {evidenceBoundaries.map((boundary, index) => {
              const items = index === 0 ? boundary.supported : boundary.notClaimed;
              return (
                <article key={boundary.label} className={`rounded-[1.5rem] border p-6 md:p-8 ${
                  index === 0
                    ? 'border-emerald-200 bg-white'
                    : 'border-amber-300 bg-amber-100/60'
                }`}>
                  <div className="flex gap-3">
                    <ShieldCheck className={`mt-0.5 h-5 w-5 shrink-0 ${index === 0 ? 'text-emerald-700' : 'text-amber-800'}`} aria-hidden="true" />
                    <div>
                      <p className={`font-mono text-[10px] font-black uppercase tracking-[0.18em] ${index === 0 ? 'text-emerald-700' : 'text-amber-800'}`}>
                        {boundary.label}
                      </p>
                      <ul className="mt-5 space-y-3">
                        {items.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? 'bg-emerald-600' : 'bg-amber-700'}`} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="future-validation" aria-labelledby="future-validation-title" className="scroll-mt-20 bg-emerald-950 py-16 text-white md:py-24">
        <div className={contentBounds}>
          <header className="mb-10 max-w-3xl md:mb-14">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-emerald-300">
              13 // Future Validation
            </p>
            <h2 id="future-validation-title" className="mt-4 font-tiempos text-3xl font-bold leading-tight text-white md:text-5xl">
              The next version should be earned in the field.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-300 md:text-lg">
              Future work expands the concept only where research can establish signal
              reliability, guest acceptance, operational accountability, and safe failure modes.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {futureValidation.map((area, index) => (
              <article key={area.title} className={`rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 ${index === futureValidation.length - 1 ? 'md:col-span-2 xl:col-span-1' : ''}`}>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-emerald-300">
                  Validation {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-white">{area.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-300">{area.question}</p>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs font-semibold leading-relaxed text-emerald-100">
                  Evidence: {area.proof}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-4xl border-l-2 border-emerald-300 pl-5 font-tiempos text-2xl font-bold leading-relaxed text-white md:text-3xl">
            The Wayfinding Matrix is not a promise of invisible intelligence. It is a
            framework for deciding what a landscape should notice, when it should speak,
            and when a person must take responsibility.
          </p>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-emerald-700">{eyebrow}</p>
      <h2 id={id} className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">{intro}</p>
    </header>
  );
}
