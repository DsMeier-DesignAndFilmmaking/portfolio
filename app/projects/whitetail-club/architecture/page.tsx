import React from 'react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';

import { SectionKicker } from '../components/SectionKicker';
import { WhitetailExperienceNav } from '../components/WhitetailExperienceNav';
import { Figure } from '../components/Figure';
import { LoopDiagram } from '../components/LoopDiagram';
import { LayerMap } from '../components/LayerMap';
import { SystemsStack, BoundaryStrip } from '../components/SystemsStack';
import { CONTENT_BOUNDS, architectureSections, confidenceBands } from '../content';

/**
 * Whitetail Club & Shore Lodge — Stewardship Intelligence System.
 * Tab 2 of 4 — Architecture.
 *
 * Holds the three consecutively-numbered `// … Architecture` sections as a single
 * content cluster. The five named systems (Experience, Stewardship, Operations,
 * Infrastructure, Intelligence) are the spine; sections 04 and 05 sit beneath two of
 * them as evidence, which is why the section ids stay `wt-system` / `wt-epistemic` /
 * `wt-interaction` — the framing changed, the anchors and the facts did not. Operating
 * detail is tiered per rule 5 of the content.ts governance header. See
 * app/projects/whitetail-club/page.tsx for the tab-architecture rationale.
 */
export default function WhitetailArchitecturePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#wt-system"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      >
        Skip to content
      </a>

      <PageNavIndicator sections={architectureSections} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-amber-600" />
      <WhitetailExperienceNav />

      {/* ── 03 // STEWARDSHIP ARCHITECTURE ───────────────────── */}
      <section id="wt-system" className={`bg-white pb-16 pt-8 md:pb-28 md:pt-12`}>
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="03 // Stewardship Architecture"
            title="Five systems share one landscape, one crew, and one season."
          >
            <p>
              A property like this is not one operation. Turf agronomy, crew sequencing, irrigation and drainage,
              the field encounter itself, and the memory that has to outlast the season are five different kinds
              of judgment — and they all resolve on the same ground, inside the same four-to-five-month window.
            </p>
            <p className="mt-4">
              What connects them is not a dashboard. It is a single record of place: a condition is observed,
              a decision is made and its reasoning kept, work is issued, and what the crew found comes back as
              the context on the next decision at that same place. Strip the reasoning out and this is a
              work-order system.
            </p>
          </SectionKicker>

          <SystemsStack />

          <div className="mt-8 md:mt-10">
            <LoopDiagram />
          </div>

          <Figure
            label="Figure 01 — Capture surface"
            src="/images/whitetail/capture-answers.png"
            alt="Capture wireframe showing one question, 'What did you find?', above four equally weighted answer buttons: Found it; Found the place — couldn't tell; Found something different; Not there."
            width={1312}
            height={455}
            caption={
              <>
                The loop above is only an argument until a crew member records into it, gloves on, between jobs.
                This is the surface that closes it — the Observation step, drawn. All four answers carry identical
                weight, and none is a default.
                There is no separate submit control — answering <em>is</em> completing. This is also the surface on
                which the project’s hardest finding later surfaced, because it was built as working code rather
                than a picture.
              </>
            }
          />

          <BoundaryStrip />
        </div>
      </section>

      {/* ── 04 // INTELLIGENCE SYSTEMS ───────────────────────── */}
      <section id="wt-epistemic" className="bg-neutral-50 py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="04 // Intelligence Systems"
            title="Confidence appears as a reason, never as a score."
          >
            <p>
              A superintendent holding a forty-eight-hour fungicide window before dawn does not need a number
              attached to the moisture reading. They need to know who last stood there, when, and whether anything
              since then disagrees. That is a sentence, not a score.
            </p>
            <p className="mt-4">
              A number hides its derivation and invites comparison across places that were never measured the same
              way. Render a band name as a chip and it becomes a score by social convention — people start saying
              “it’s an amber one,” and the ranking returns through language with no number present.
            </p>
          </SectionKicker>

          <p
            aria-hidden="true"
            className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-300 md:hidden"
          >
            Scroll →
          </p>
          <div className="overflow-x-auto rounded-[1rem] border border-neutral-200 bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th scope="col" className="px-6 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                    What is true
                  </th>
                  <th scope="col" className="px-6 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                    What the interface says
                  </th>
                </tr>
              </thead>
              <tbody>
                {confidenceBands.map((band) => (
                  <tr key={band.reads} className="border-b border-neutral-100 last:border-0">
                    <td className="px-6 py-5 align-top text-sm leading-relaxed text-neutral-600">{band.meaning}</td>
                    <td className="px-6 py-5 align-top text-sm font-medium leading-relaxed text-neutral-900">
                      “{band.reads}”
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600">
            The internal vocabulary behind these sentences never reaches the interface. Lists sort by time-to-close —
            a real magnitude, and the one an irrigation blowout or a closing spray window actually runs on — never by
            confidence, because sorting five explanations converts them into a scale.
          </p>
        </div>
      </section>

      {/* ── 05 // EXPERIENCE SYSTEMS ─────────────────────────── */}
      <section id="wt-interaction" className="bg-white py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="05 // Experience Systems"
            title="Four surfaces, and the answers that had to stay peers."
          >
            <p>
              Place, Capture, Decision, Attention. Four surfaces, no fifth, because a crew member standing at a
              valve box in flat light is running one errand, not navigating a product.
            </p>
            <p className="mt-4">
              The field question is “what did you find?” — never “did you complete this?” A valve that isn’t where
              the old drawing puts it, an inlet nobody can locate under spring debris: a completion question files
              all of it under failure. A finding question makes it one of four answers — and absence is the answer
              this landscape most needs recorded.
            </p>
          </SectionKicker>

          <LayerMap />
        </div>
      </section>
    </main>
  );
}
