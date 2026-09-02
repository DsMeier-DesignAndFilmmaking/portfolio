import React from 'react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import PracticeAnchor from '@/components/PracticeAnchor';

import { SectionKicker } from '../components/SectionKicker';
import { WhitetailExperienceNav } from '../components/WhitetailExperienceNav';
import { Figure } from '../components/Figure';
import { CrossProjectFooter } from '../components/StaticSections';
import { CONTENT_BOUNDS, resultingSurfacesSections, practicePoints } from '../content';

/**
 * Whitetail Club & Shore Lodge — Stewardship Intelligence System.
 * Tab 4 of 4 — Resulting Surfaces.
 *
 * The terminal tab: the three surviving wireframe surfaces, then what the
 * project demonstrates. `PracticeAnchor` and `CrossProjectFooter` render
 * only here, matching the Rock Creek benchmark's pattern of not repeating
 * footer chrome on every tab.
 */
export default function WhitetailResultingSurfacesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#wt-surfaces"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      >
        Skip to content
      </a>

      <PageNavIndicator sections={resultingSurfacesSections} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-amber-600" />
      <WhitetailExperienceNav />

      {/* ── 09 // SURFACES ───────────────────────────────────── */}
      <section id="wt-surfaces" className="bg-white pb-16 pt-8 md:pb-28 md:pt-12">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="09 // The Resulting Surfaces"
            title="What the system looks like when it refuses to overstate."
          >
            <p>
              Wireframe stage only, which includes structure, order, and real language, with no visual system applied.
            </p>
          </SectionKicker>

          <Figure
            label="Figure 05 — Place"
            src="/images/whitetail/place-surface.png"
            alt="Place wireframe showing what is normal at this location, a list of what has already been tried here including a failed search, and current conditions each with a plain-language reason."
            width={1312}
            height={601}
            caption={
              <>
                “Already tried here” sits above current conditions on purpose — it is the only thing preventing a
                second crew from repeating a search that already failed. Note the two adjacent absence states:{' '}
                <em>“Didn’t find it”</em> and <em>“confirmed not present”</em> are epistemically opposite and must
                never blur into each other.
              </>
            }
          />

          <Figure
            label="Figure 06 — Attention"
            src="/images/whitetail/attention.png"
            alt="Attention wireframe listing three items that need a person, each stating the reason it needs attention, with no count badge, checkbox, avatar or dismiss control."
            width={1312}
            height={285}
            caption={
              <>
                Derived and stateless: no count, no assignment, no dismissal, no completion. A count implies a
                target of zero, a target implies items you can clear, and clearing is a task-manager verb. Items
                leave only when the world changes.
              </>
            }
          />

          <Figure
            label="Figure 07 — Returned decision context"
            src="/images/whitetail/lasttime-block.png"
            alt="A single indivisible block reading: 2 Nov — delayed 45 min. Estimate held. Decided on: thaw lag never checked here at the time."
            width={1312}
            height={219}
            caption={
              <>
                The outcome and the grounds it rested on are <strong>one indivisible unit</strong>. Split them and
                a later styling pass can emphasize “it worked” over “we were guessing” — which is how a lucky guess
                hardens into institutional knowledge across seasons. This block exists to make that impossible.
              </>
            }
          />
        </div>
      </section>

      {/* ── 11 // WHAT THIS DEMONSTRATES ─────────────────────── */}
      <section id="wt-practice" className="bg-white py-20 md:py-36">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="11 // What This Demonstrates"
            title="The discipline is the deliverable."
          >
            <p>
              The problem generalizes well beyond one property: any managed landscape with seasonal turnover loses
              the same knowledge in the same way. What transfers is not the interface — it is the method.
            </p>
          </SectionKicker>

          {/*
            B7: the equal three-column rhythm is broken deliberately so the third point
            resolves the page instead of terminating a list. All three labels and bodies
            are unchanged; only their weight and order of appearance differ.
          */}
          <div className="grid gap-6 md:grid-cols-2">
            {practicePoints.slice(0, 2).map((point) => (
              <article key={point.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                <h3 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">{point.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{point.body}</p>
              </article>
            ))}
          </div>

          {practicePoints.slice(2).map((point) => (
            <article
              key={point.label}
              className="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50/60 p-8 md:mt-8 md:p-14"
            >
              <h3 className="max-w-3xl font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-4xl md:leading-[1.15]">
                {point.label}
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <PracticeAnchor />
      <CrossProjectFooter />
    </main>
  );
}
