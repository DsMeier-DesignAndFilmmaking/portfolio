import type { Metadata } from 'next';
import HubNav from './HubNav';
import PipelineSection from './PipelineSection';
import { independentResearchProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Independent Research Practice | Dan Meier',
  description:
    'A self-directed research practice exploring systems design across outdoor, environmental, and hospitality contexts — frameworks, concepts, and experimental builds.',
};

export default function ResearchPracticePage() {
  return (
    <>
      <HubNav />

      <main>
        {/* ── Hero / thesis ────────────────────────────────────────────── */}
        <section
          className="border-b border-neutral-100 bg-white px-6 pb-16 pt-32"
          aria-labelledby="hub-headline"
        >
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              Independent Research Practice
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

            <div className="mt-7 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-gray-700 text-pretty">
              <p>
                I study environments that guide people through complexity: wayfinding systems,
                hospitality services, high-stakes decision support in the field. Not to describe
                them — to pull out the patterns that repeat underneath the surface variation.
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
