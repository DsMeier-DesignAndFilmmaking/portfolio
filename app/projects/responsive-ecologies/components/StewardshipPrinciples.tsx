import { stewardshipPrinciples } from '../content';
import { SectionHeading, contentBounds } from './shared';

export default function StewardshipPrinciples() {
  return (
    <section
      id="stewardship-principles"
      aria-labelledby="stewardship-principles-title"
      className="bg-emerald-950 py-16 text-white md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="stewardship-principles-title"
          eyebrow="05 // Stewardship Principles"
          title="The system is designed around care, accountability, and graceful uncertainty."
          intro="These principles govern how environmental intelligence becomes guidance and how guidance becomes action."
          dark
        />

        <div className="grid gap-5 md:grid-cols-2">
          {stewardshipPrinciples.map((principle) => (
            <article
              key={principle.id}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-8"
            >
              <p className="font-mono text-xl font-bold text-emerald-300">
                {principle.number}
              </p>
              <h3 className="mt-5 font-tiempos text-2xl font-bold leading-tight text-white">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                {principle.description}
              </p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                  System implication
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-200">
                  {principle.implication}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
