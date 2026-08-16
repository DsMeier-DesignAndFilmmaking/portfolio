'use client';

import { useState } from 'react';
import { explorer02 } from '../content/explorer-data';
import {
  ConceptDisclaimer,
  OutcomeCallout,
  SystemExplorerSection,
  SystemTradeoff,
  TensionAxis,
} from './explorer-primitives';

export function Explorer02GlazingParadox() {
  const [activeState, setActiveState] = useState<'a' | 'b'>('a');

  return (
    <SystemExplorerSection
      id="explorer-02"
      number={explorer02.number}
      title={explorer02.title}
      intro={explorer02.intro}
      tone="muted"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <TensionAxis
          top={explorer02.tension.top}
          bottom={explorer02.tension.bottom}
          className="lg:col-span-3"
        />
        <div className="lg:col-span-9">
          <SystemTradeoff
            stateA={explorer02.stateA}
            stateB={explorer02.stateB}
            activeState={activeState}
            onToggle={setActiveState}
          />

          {/* Proposed response — four-quadrant synthesis */}
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
              {explorer02.proposedResponse.label}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {explorer02.proposedResponse.elements.map((el) => (
                <article
                  key={el.id}
                  className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                >
                  <h4 className="font-tiempos text-lg font-bold text-neutral-950">{el.label}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{el.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-neutral-600">
              {explorer02.proposedResponse.synthesis}
            </p>
          </div>

          <OutcomeCallout label="Design Hypothesis">
            Neither extreme state is viable. The proposed response models an integrated tradeoff — preserving view quality while improving thermal performance through selective envelope intervention.
          </OutcomeCallout>
          <ConceptDisclaimer>
            Thermal load figures are modeled projections for tradeoff comparison, not measured building performance data.
          </ConceptDisclaimer>
        </div>
      </div>
    </SystemExplorerSection>
  );
}
