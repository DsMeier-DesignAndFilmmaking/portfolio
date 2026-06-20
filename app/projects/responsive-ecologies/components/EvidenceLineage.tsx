import { FileSearch, Link2, ShieldCheck } from 'lucide-react';
import { evidenceLineage, type EvidenceLineageRecord } from '../content';
import { SectionHeading, contentBounds } from './shared';

const confidenceClasses: Record<EvidenceLineageRecord['confidence'], string> = {
  medium: 'border-sky-200 bg-sky-50 text-sky-800',
  high: 'border-emerald-200 bg-emerald-50 text-emerald-800',
};

export default function EvidenceLineage() {
  return (
    <section
      id="evidence-lineage"
      aria-labelledby="evidence-lineage-title"
      className="bg-white py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="evidence-lineage-title"
          eyebrow="10 // Evidence Lineage"
          title="Every major system claim keeps its source, maturity, and limitation visible."
          intro="Evidence lineage prevents the portfolio from presenting research hypotheses, inherited frameworks, and deployed knowledge as though they have equal certainty."
        />

        <figure aria-describedby="evidence-lineage-summary">
          <p id="evidence-lineage-summary" className="sr-only">
            Four evidence records connect system claims to source projects or research,
            identify confidence and maturity, list the parts of Responsive Ecologies they
            support, and state remaining limitations.
          </p>

          <div className="relative space-y-5 md:pl-10">
            <div className="absolute bottom-6 left-[13px] top-6 hidden w-px bg-stone-200 md:block" aria-hidden="true" />

            {evidenceLineage.map((record, index) => (
              <article
                key={record.id}
                className="relative rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm shadow-neutral-950/[0.03] md:p-7"
              >
                <span
                  className="absolute -left-[2.25rem] top-7 hidden h-7 w-7 items-center justify-center rounded-full border-2 border-emerald-600 bg-white md:flex"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                </span>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileSearch className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500">
                      Evidence {String(index + 1).padStart(2, '0')} / {record.evidenceType}
                    </p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${confidenceClasses[record.confidence]}`}>
                    {record.confidence} confidence
                  </span>
                </div>

                <h3 className="mt-5 max-w-4xl font-tiempos text-xl font-bold leading-snug text-neutral-950 md:text-2xl">
                  {record.claim}
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-[0.9fr_0.8fr_1.2fr]">
                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-500">
                      Source and maturity
                    </p>
                    <p className="mt-2 text-sm font-bold text-neutral-900">{record.source}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">
                      {record.maturity}
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-500">
                      Supports
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {record.supports.map((item) => (
                        <li key={item} className="flex gap-2 text-xs leading-relaxed text-neutral-700">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 md:col-span-2 xl:col-span-1">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-700">
                      Remaining limitation
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-700">
                      {record.limitation}
                    </p>
                    <p className="mt-3 flex items-center gap-2 font-mono text-[9px] font-bold text-neutral-500">
                      <Link2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="break-all">{record.traceabilityReference}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <figcaption className="mt-6 text-sm leading-relaxed text-neutral-500">
            These records are a curated portfolio snapshot of the Environmental Systems
            Design OS, not a live workspace integration.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
