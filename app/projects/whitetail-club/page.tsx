import React from 'react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import PracticeAnchor from '@/components/PracticeAnchor';

import { SectionKicker } from './components/SectionKicker';
import { Figure } from './components/Figure';
import { LoopDiagram } from './components/LoopDiagram';
import { LayerMap } from './components/LayerMap';
import { EvidenceBoundarySection, CrossProjectFooter } from './components/StaticSections';
import {
  CONTENT_BOUNDS,
  sectionNavigation,
  HERO,
  THESIS,
  GUARDRAIL,
  contextPoints,
  insufficientRows,
  confidenceBands,
  reviewFindings,
  practicePoints,
} from './content';

/**
 * Whitetail Club & Shore Lodge — Stewardship Intelligence System.
 *
 * Presentation layer over the frozen artifacts in docs/whitetail/. This page must not
 * introduce claims those artifacts do not support. See content.ts for the four source
 * governance rules that constrain every string on this page.
 */
export default function WhitetailClubPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#wt-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
      >
        Skip to Whitetail Club case study content
      </a>

      <PageNavIndicator sections={sectionNavigation} showDotsOnDesktop />
      <ProjectHeader focusRingClassName="focus-visible:ring-amber-600" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="wt-hero" className={`${CONTENT_BOUNDS} mt-[100px] pb-10 md:pb-12`}>
        <div className="max-w-3xl">
          <div className="mb-3">
            <ProjectBreadcrumb projectId="whitetail-club" />
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">
              {HERO.eyebrowLeft}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" aria-hidden="true" />
              {HERO.eyebrowRight}
            </span>
          </div>
          <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
            {HERO.title}
          </h1>
          <p className="mt-5 font-tiempos text-xl italic text-gray-500 md:text-2xl">{HERO.subtitle}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">{HERO.standfirst}</p>
        </div>
      </section>

      {/* Thesis, stated once, early. */}
      <section id="wt-thesis" className={`${CONTENT_BOUNDS} pb-16 md:pb-24`} aria-label="Design thesis">
        <blockquote className="max-w-3xl rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-10">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">Thesis</p>
          <p className="mt-5 font-tiempos text-2xl font-bold leading-snug text-neutral-950 md:text-3xl">
            “{THESIS}”
          </p>
        </blockquote>
      </section>

      {/* ── 01 // CONTEXT ────────────────────────────────────── */}
      <section id="wt-context" className="bg-white py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker eyebrow="01 // Context" title="One property, several landscapes, and a crew that changes every season.">
            <p>
              A mountain property in Idaho, managed as a single grounds operation. The research established its
              scale and its seasonal workforce model; it did not establish sensors, telemetry, or automated
              irrigation, and nothing here assumes them.
            </p>
          </SectionKicker>
          <div className="grid gap-6 md:grid-cols-3">
            {contextPoints.map((point, i) => (
              <article key={point.label} className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
                <p className="font-mono text-xl font-bold text-amber-500">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 font-tiempos text-xl font-bold leading-tight text-neutral-950">{point.label}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 // WHY CONVENTIONAL INTERFACES FAILED ─────────── */}
      <section id="wt-insufficient" className="bg-neutral-50 py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="02 // Why the obvious answers don’t work"
            title="Every conventional shape solves a problem this property doesn’t have."
          >
            <p>
              The root problem is not that work goes untracked. It is that the landscape has no addressable record
              of itself — so knowledge cannot be inherited, and each season starts closer to zero than it should.
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
                    Conventional shape
                  </th>
                  <th scope="col" className="px-6 py-4 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400">
                    Why it is insufficient here
                  </th>
                </tr>
              </thead>
              <tbody>
                {insufficientRows.map((row) => (
                  <tr key={row.conventional} className="border-b border-neutral-100 last:border-0">
                    <td className="px-6 py-5 align-top text-sm font-semibold text-neutral-900">{row.conventional}</td>
                    <td className="px-6 py-5 align-top text-sm leading-relaxed text-neutral-600">{row.fails}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 03 // SYSTEM ARCHITECTURE ────────────────────────── */}
      <section id="wt-system" className="bg-white py-16 md:py-28">
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

      {/* ── 06 // WIREFRAME STRESS TESTING ───────────────────── */}
      <section id="wt-wireframes" className="bg-neutral-50 py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="06 // Wireframe Stress Testing"
            title="Draw the hardest case first, at real density, with real content."
          >
            <p>
              The wireframes were built as a measurement instrument, not a presentation: real HTML at real pixel
              widths, with real reason phrases rather than placeholder text. The riskiest surface was drawn first.
            </p>
          </SectionKicker>

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
              that five static wireframes had no way to reveal.
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
        </div>
      </section>

      {/* ── 09 // SURFACES ───────────────────────────────────── */}
      <section id="wt-surfaces" className="bg-white py-16 md:py-28">
        <div className={CONTENT_BOUNDS}>
          <SectionKicker
            eyebrow="09 // The Resulting Surfaces"
            title="What the system looks like when it refuses to overstate."
          >
            <p>
              Wireframe stage only — structure, order, and real language, with no visual system applied. Visual
              design has not been authorized, and these are not finished screens.
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

      {/* ── 10 // EVIDENCE BOUNDARY ──────────────────────────── */}
      <EvidenceBoundarySection />

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
