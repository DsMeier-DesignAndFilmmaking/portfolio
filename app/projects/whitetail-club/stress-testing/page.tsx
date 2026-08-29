import React from 'react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';

import { SectionKicker } from '../components/SectionKicker';
import { WhitetailExperienceNav } from '../components/WhitetailExperienceNav';
import { Figure } from '../components/Figure';
import { PressureCases, ScenarioLoad, ResilienceBoundary } from '../components/StressLoad';
import { CONTENT_BOUNDS, stressTestingSections, GUARDRAIL, reviewFindings } from '../content';

/**
 * Whitetail Club & Shore Lodge — Stewardship Intelligence System.
 * Tab 3 of 4 — Stress Testing.
 *
 * The methodological arc: map the operating pressure and load the surfaces with
 * it (06), hand them to an independent adversarial review (07), and report the
 * one finding that stopped the work (08). Kept together on one tab because 08
 * depends on 06 and 07 for intelligibility — the approved audit's SF-6 finding.
 *
 * The asymmetry this page has to stay honest about: the pressure is operational,
 * every measurement is structural. No test in this project was run against a real
 * operating condition, which is why PressureCases is labelled as reasoning and
 * ScenarioLoad marks its quoted intervals as test content. See rule 6 in the
 * content.ts governance header before adding anything here.
 *
 * Framing copy was revised for the operational reframe; the findings, figures,
 * and every measured number are unchanged — including the two-tier finding
 * hierarchy inside 07 (primary A11/A3 cards, compact remainder) and the guardrail
 * block's back-reference to "both corrected findings above," which must stay bound
 * to those same two cards on this tab.
 */
export default function WhitetailStressTestingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#wt-wireframes"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      >
        Skip to content
      </a>

      <PageNavIndicator sections={stressTestingSections} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-amber-600" />
      <WhitetailExperienceNav />

      {/* ── 06 // OPERATIONAL STRESS TESTING ─────────────────── */}
      <section id="wt-wireframes" className="bg-neutral-50 pb-16 pt-8 md:pb-28 md:pt-12">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="06 // Operational Stress Testing"
            title="Load the hardest hour first, and measure what breaks."
          >
            <p>
              The hardest hour is not a busy one. It is a winterization commit with a blowout closing inside the
              day and a spray window closing behind it, made on zones that have not all been walked — where the
              cost of being wrong is a cracked mainline or a season of turf, and the decision cannot be revisited.
            </p>
            <p className="mt-4">
              The wireframes were built as a measurement instrument, not a presentation: real HTML at real pixel
              widths, loaded with real operating decisions rather than placeholder text. The riskiest surface was
              drawn first. What follows is honest about its own limits — the pressure is operational, and every
              measurement is structural.
            </p>
          </SectionKicker>

          <PressureCases />

          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 md:p-6">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">
              Test parameter — not a property fact
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-700">
              The sequencing surface was stress-tested at <strong>28 zones [DH]</strong>. This is a labeled design
              hypothesis used as a test floor, derived from the attested course scale. It is{' '}
              <strong>not</strong> a claim about how many zones the property has — no zone count is established
              anywhere in the research.
            </p>
          </div>

          <ScenarioLoad />

          <Figure
            label="Figure 02 — Sequencing surface, unnarrowed, 28 zones [DH]"
            src="/images/whitetail/d3-unnarrowed.png"
            alt="Decision wireframe listing all 28 test-parameter zones [DH] individually, overflowing its frame so the commit controls fall below the fold."
            width={1312}
            height={745}
            caption={
              <>
                Every zone itemized regardless of how well it is known. Measured overflow:{' '}
                <strong>+539px</strong> past the frame — the commit controls are unreachable without scrolling. The
                discomfort is the finding, and it was left in rather than tidied away.
              </>
            }
          />

          <Figure
            label="Figure 03 — Same decision, narrowed to weakly-grounded zones"
            src="/images/whitetail/d3-narrowed.png"
            alt="The same decision wireframe showing only six zones that need checking, each with a plain-language reason, fitting the frame with the commit controls visible."
            width={1312}
            height={745}
            caption={
              <>
                Only the zones a person actually has to look at before committing. Measured overflow:{' '}
                <strong>exactly 0px</strong>. The narrowing was not a stylistic preference — the unnarrowed frame
                proves it was necessary, and the architecture had independently predicted it.
              </>
            }
          />
        </div>
      </section>

      {/* ── 07 // INDEPENDENT ADVERSARIAL REVIEW ─────────────── */}
      <section id="wt-review" className="bg-white py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="07 // Independent Adversarial Review"
            title="Hand the work to someone whose job is to break it."
          >
            <p>
              The wireframes were reviewed by a process that did not build them and was deliberately not given the
              reasoning behind them — only the artifacts and the tests. A reviewer handed the defense will grade
              the defense.
            </p>
            <p className="mt-4">
              What the review looked for is not ugliness. It is a layout that quietly reinstates a ranking, a
              backlog, or a winner — because a surface that ranks zones by confidence during a closing window will
              send a crew to the wrong one, and it will look tidy doing it.
            </p>
          </SectionKicker>

          {/*
            Hierarchy only. All five findings and all fifteen Found/Corrected/Re-verified
            fields render, with their source text unchanged. The first two carry more
            visual weight because they are the two the guardrail block below refers to —
            this is emphasis, not a severity ranking the review never established.
          */}
          <div className="grid gap-6 lg:grid-cols-2">
            {reviewFindings.slice(0, 2).map((f) => (
              <article key={f.title} className="rounded-2xl border border-neutral-300 bg-white p-6 shadow-sm md:p-8">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-600">
                  {f.code === '—' ? 'Finding' : `Test ${f.code}`}
                </p>
                <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-neutral-950 md:text-2xl">
                  {f.title}
                </h3>
                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Found
                    </dt>
                    <dd className="mt-1.5 text-neutral-600">{f.found}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Corrected
                    </dt>
                    <dd className="mt-1.5 text-neutral-600">{f.fixed}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                      Re-verified
                    </dt>
                    <dd className="mt-1.5 text-neutral-700">{f.verified}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <p className="mt-10 flex items-center gap-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
            <span className="shrink-0">Three further findings from the same review</span>
            <span aria-hidden="true" className="h-px flex-1 bg-neutral-200" />
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {reviewFindings.slice(2).map((f) => (
              <article key={f.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-600">
                  {f.code === '—' ? 'Finding' : `Test ${f.code}`}
                </p>
                <h3 className="mt-2.5 font-tiempos text-base font-bold leading-tight text-neutral-950">{f.title}</h3>
                <dl className="mt-3.5 space-y-2.5 text-[13px] leading-relaxed">
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Found
                    </dt>
                    <dd className="mt-1 text-neutral-600">{f.found}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Corrected
                    </dt>
                    <dd className="mt-1 text-neutral-600">{f.fixed}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700">
                      Re-verified
                    </dt>
                    <dd className="mt-1 text-neutral-700">{f.verified}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <Figure
            label="Figure 04 — Contested condition, one of four arrangements compared"
            src="/images/whitetail/contest-grouped.png"
            alt="Wireframe of a contested condition showing two field observations as equal peers, an explanation reading 'Too close together to be change', and a single action: ask someone to look again."
            width={1312}
            height={322}
            caption={
              <>
                Two observations disagree. Neither is elevated, and there is deliberately{' '}
                <strong>no control that resolves the disagreement</strong> — no accept, no reject, no “mark
                correct.” Picking a winner in the interface would destroy one true account on no evidence. The only
                way out is a new observation.
              </>
            }
          />

          <div className="mt-8 rounded-2xl border border-neutral-900 bg-neutral-950 p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-400">
              The guardrail this section exists to demonstrate
            </p>
            <p className="mt-4 max-w-2xl font-tiempos text-xl font-bold leading-snug text-white md:text-2xl">
              “{GUARDRAIL}”
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400">
              Both corrected findings above are the same failure in different clothing: a layout decision quietly
              re-introducing a meaning the architecture had spent phases removing. Neither was visible as a rule
              violation. Both were visible as measurements.
            </p>
          </div>
        </div>
      </section>

      {/* ── 08 // THE CAPTURE ASYMMETRY ──────────────────────── */}
      <section id="wt-asymmetry" className="bg-neutral-50 py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="08 // The Finding That Stopped The Work"
            title="A conflict no static artifact could have shown."
          >
            <p>
              Because the capture surface was functional, it could be clicked. Clicking it produced a measurement
              that five static wireframes had no way to reveal — and the thing it threatens is the one the whole
              concept rests on.
            </p>
            <p className="mt-4">
              A crew turns over every season. What survives is whatever got written down, and the hardest thing to
              get written down is an absence: the valve that wasn’t there, the search that came back empty. Make
              that the expensive answer and the operation quietly stops accumulating the one record it cannot
              reconstruct later.
            </p>
          </SectionKicker>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Measured
              </p>
              <h3 className="mt-4 font-tiempos text-lg font-bold leading-tight text-neutral-950">
                Recording a find costs one tap. Recording an absence costs two.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                A tripwire written earlier in the project exists to catch exactly that asymmetry — because if
                reporting “I didn’t find it” is more expensive than reporting success, the interface teaches people
                what it values, whatever the training says.
              </p>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Reduced
              </p>
              <h3 className="mt-4 font-tiempos text-lg font-bold leading-tight text-neutral-950">
                The conflict turned out to be one question about six words.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                Analysis found the tripwire’s subject was ambiguous: it counts “the four outcomes,” but the model
                holds four <em>answers</em> and five stored <em>values</em>. Which layer it measures had never been
                stated — so the apparent contradiction was a scope question, not a broken architecture.
              </p>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                Mapped, not decided
              </p>
              <h3 className="mt-4 font-tiempos text-lg font-bold leading-tight text-neutral-950">
                Both answers were traced. Neither was selected.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                A further pass mapped what each reading would cost — how many decisions, how many amendments,
                whether architecture would have to change at all — and proved the question could not be reduced any
                further. It stopped there, deliberately.
              </p>
            </article>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-amber-800">
              Current status — unresolved
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-800">
              The consequence analysis <strong>did not select a reading</strong>, and the underlying question
              remains open pending an explicit decision. The measured asymmetry stands as recorded. Resolving it
              inside the design work — rather than surfacing it as a decision someone else owns — would have been
              faster and considerably less defensible.
            </p>
          </div>

          <ResilienceBoundary />
        </div>
      </section>
    </main>
  );
}
