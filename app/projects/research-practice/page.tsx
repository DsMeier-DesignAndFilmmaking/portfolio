import type { Metadata } from 'next';
import HubNav from './HubNav';
import PipelineSection from './PipelineSection';
import { CONTENT_BOUNDS, COPY_MAX_WIDTH } from './layoutClasses';
import { independentResearchProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Systems Design Practice',
  description:
    'An independent systems design practice developing frameworks, concepts, and experimental products that explore decision-making, outdoor hospitality, stewardship, and environmental complexity.',
};

export default function ResearchPracticePage() {
  return (
    <>
      <HubNav />

      <main>
        {/* ── Hero / thesis ────────────────────────────────────────────── */}
        <section
          className="bg-white pb-16 pt-32"
          aria-labelledby="hub-headline"
        >
          <div className={CONTENT_BOUNDS}>
            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Systems Design Practice
            </p>

            <h1
              id="hub-headline"
              className="text-balance text-4xl font-bold leading-tight text-gray-950 md:text-5xl"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              Most design starts with a brief.
              <br />
              This one starts earlier.
            </h1>

            <div className={`mt-7 ${COPY_MAX_WIDTH} space-y-4 text-[1.05rem] leading-relaxed text-gray-700 text-pretty`}>
              <p>
              I study how people navigate complex environments—from landscapes and hospitality to digital products, wayfinding, and field operations.

              Each project begins with research, develops into a systems framework, and evolves into a working concept or prototype. Together, they form an independent systems design practice where every project builds on the last.
              </p>
              <p>
                What comes out is a connected pipeline. Observations become frameworks. Frameworks
                get stress-tested as concepts. Concepts that survive become builds. Every project
                here connects to the one before and after it. This is the research layer that
                makes the client work not a guess.
              </p>
            </div>
          </div>
        </section>

        {/* ── Pipeline accordion ───────────────────────────────────────── */}
        <PipelineSection projects={independentResearchProjects} />
      </main>
    </>
  );
}
