import Image from 'next/image';
import { ExternalLink, Layers3, ShieldCheck } from 'lucide-react';
import { contentBounds } from './shared';

const FIGMA_CONCEPT_URL = 'https://make-pluck-03979823.figma.site/';

const mobileConcepts = [
  {
    src: '/images/responsive-ecologies/mobile-screenConcept_home.png',
    step: '01',
    label: 'Today’s Stewardship',
    description:
      'Field teams see environmental status, priorities, and recent signals before entering the landscape.',
    alt: 'Responsive Ecologies mobile home screen showing environmental status, priority stewardship tasks, and a recent field signal for Ridgemont Ranch',
    width: 1024,
    height: 1536,
  },
  {
    src: '/images/responsive-ecologies/mobile-screenConcept_2.png',
    step: '02',
    label: 'Task Detail & Field Capture',
    description:
      'Crews receive task context, authority, confidence, required actions, and evidence capture tools.',
    alt: 'Responsive Ecologies mobile task screen for inspecting Meadow Section 4, showing risk context, confidence, authority, required actions, and evidence capture tools',
    width: 1024,
    height: 1536,
  },
  {
    src: '/images/responsive-ecologies/mobile-screenConcept_3.png',
    step: '03',
    label: 'Stewardship Outcome',
    description:
      'Field verification updates system understanding and recommends an actionable stewardship response.',
    alt: 'Responsive Ecologies mobile stewardship outcome screen showing completed field verification, updated environmental understanding, and a recommendation to suspend mowing operations',
    width: 853,
    height: 1844,
  },
] as const;

export default function ProductExperience() {
  return (
    <section
      id="product-experience"
      aria-labelledby="product-experience-title"
      className="scroll-mt-20 bg-[#f3f1e8] py-16 md:py-24"
    >
      <div className={contentBounds}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <header className="max-w-3xl lg:col-span-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-emerald-700">
              Product Experience
            </p>
            <h2
              id="product-experience-title"
              className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              Translating Stewardship Logic Into Operational Interfaces
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              <p>
                Responsive Ecologies is not a monitoring dashboard. It is a stewardship
                operating system that helps teams understand changing environmental
                conditions, coordinate responses, and maintain clear authority over decisions.
              </p>
              <p>
                The V1 interface concept explores how environmental signals, confidence,
                authority, and field execution can become a tangible product experience
                across desktop coordination and mobile stewardship workflows.
              </p>
            </div>
          </header>

          <aside className="rounded-[1.25rem] border border-emerald-900/10 bg-white p-5 shadow-sm shadow-emerald-950/[0.04] lg:col-span-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-950 text-emerald-200">
                <Layers3 className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                  Figma Make V1
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  Explore the first interface prototype for the Responsive Ecologies
                  stewardship operating system.
                </p>
              </div>
            </div>
            <a
              href={FIGMA_CONCEPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the Responsive Ecologies Figma concept in a new tab"
              className="group mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4 motion-reduce:transition-none"
            >
              <span>View Figma Concept</span>
              <ExternalLink
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          </aside>
        </div>

        <figure
          className="mt-10 overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-[#e8e3d4] shadow-xl shadow-emerald-950/[0.08] md:mt-14"
          aria-describedby="product-experience-caption"
        >
          <div className="border-b border-emerald-950/10 bg-white/70 px-5 py-4 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  Product evidence
                </p>
                <p className="mt-1 text-sm font-semibold text-neutral-800">
                  Desktop stewardship coordination overview
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
                <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                <span>Signals, authority, and action remain visible</span>
              </div>
            </div>
          </div>

          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/responsive-ecologies/product-experience-v1.png`}
            alt="Responsive Ecologies desktop dashboard showing environmental risk signals, stewardship actions, authority context, and recent field observations for Ridgemont Ranch"
            width={3024}
            height={1964}
            sizes="(min-width: 1280px) 1200px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 3rem)"
            className="h-auto w-full"
          />

          <figcaption
            id="product-experience-caption"
            className="border-t border-emerald-950/10 bg-white/80 p-5 text-sm leading-relaxed text-neutral-600 md:p-6"
          >
            The overview brings environmental conditions, recent signals, active
            stewardship work, and accountable roles into one operational frame without
            collapsing interpretation into automated control.
          </figcaption>
        </figure>

        <div className="mt-10 md:mt-14">
          <header className="max-w-2xl">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">
              Mobile stewardship workflow
            </p>
            <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
              Carrying decision context into the field
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
              The mobile concept carries one closed stewardship loop from awareness,
              through field action, to a documented operational outcome.
            </p>
          </header>

          <div className="mt-12 space-y-16 lg:space-y-24">
            {mobileConcepts.map((concept) => (
              <div
                key={concept.src}
                className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16"
              >
                <div className="space-y-3 lg:col-span-5">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                    {concept.step} / Mobile workflow
                  </p>
                  <h4 className="font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl">
                    {concept.label}
                  </h4>
                  <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
                    {concept.description}
                  </p>
                </div>

                <div className="overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-white p-4 shadow-lg shadow-emerald-950/[0.04] md:p-6 lg:col-span-7">
                  <div className="flex justify-center rounded-[1.25rem] bg-[#f7f4eb] p-6 sm:p-10 lg:p-8 xl:p-12">
                    <div className="relative aspect-[9/19] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[320px] xl:max-w-[340px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${concept.src}`}
                        alt={concept.alt}
                        fill
                        sizes="(min-width: 1280px) 340px, (min-width: 1024px) 320px, (min-width: 768px) 340px, 280px"
                        className="object-contain"
                        priority={concept.step === '01'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
