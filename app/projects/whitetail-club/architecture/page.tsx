import React from 'react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';

import { SectionKicker } from '../components/SectionKicker';
import { WhitetailExperienceNav } from '../components/WhitetailExperienceNav';
import { Figure } from '../components/Figure';
import { LoopDiagram } from '../components/LoopDiagram';
import { LayerMap } from '../components/LayerMap';
import { CONTENT_BOUNDS, architectureSections, confidenceBands } from '../content';

/**
 * Whitetail Club & Shore Lodge — Stewardship Intelligence System.
 * Tab 2 of 4 — Architecture.
 *
 * Holds the three consecutively-numbered `// … Architecture` sections
 * (System, Epistemic, Interaction) as a single content cluster, unchanged
 * in copy or component from the prior single-route page. See
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

      {/* ── 03 // SYSTEM ARCHITECTURE ────────────────────────── */}
      <section id="wt-system" className={`bg-white pb-16 pt-8 md:pb-28 md:pt-12`}>
        <div className={CONTENT_BOUNDS}>
          <SectionKicker eyebrow="03 // System Architecture" title="One loop, and three annotations that carry it.">
            <p>
              A place becomes a condition, a condition informs a decision, a decision issues work, the work
              produces an observation — and the observation returns as the context on the next decision at that
              place.
            </p>
          </SectionKicker>
          <LoopDiagram />

          <Figure
            label="Figure 01 — Capture surface"
            src="/images/whitetail/capture-answers.png"
            alt="Capture wireframe showing one question, 'What did you find?', above four equally weighted answer buttons: Found it; Found the place — couldn't tell; Found something different; Not there."
            width={1312}
            height={455}
            caption={
              <>
                The loop above is only an argument until something records into it. This is the surface that closes
                it — the Observation step, drawn. All four answers carry identical weight, and none is a default.
                There is no separate submit control — answering <em>is</em> completing. This is also the surface on
                which the project’s hardest finding later surfaced, because it was built as working code rather
                than a picture.
              </>
            }
          />
        </div>
      </section>

      {/* ── 04 // EPISTEMIC ARCHITECTURE ─────────────────────── */}
      <section id="wt-epistemic" className="bg-neutral-50 py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="04 // Epistemic Architecture"
            title="Confidence appears as a reason, never as a score."
          >
            <p>
              A number invites comparison and hides its derivation. A sentence does neither. Render a band name as
              a chip and it becomes a score by social convention — people start saying “it’s an amber one,” and the
              ranking returns through language even with no number present.
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
            a real magnitude — never by confidence, because sorting five explanations converts them into a scale.
          </p>
        </div>
      </section>

      {/* ── 05 // INTERACTION ARCHITECTURE ───────────────────── */}
      <section id="wt-interaction" className="bg-white py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="05 // Interaction Architecture"
            title="Four surfaces, and the answers that had to stay peers."
          >
            <p>
              Place, Capture, Decision, Attention. The field question is “what did you find?” — never “did you
              complete this?” A completion question makes absence a sub-case of failure; a finding question makes
              it one of four answers.
            </p>
          </SectionKicker>

          <LayerMap />
        </div>
      </section>
    </main>
  );
}
