'use client';

import { useState } from 'react';
import { explorer01 } from '../content/explorer-data';
import {
  ConceptDisclaimer,
  OutcomeCallout,
  SystemExplorerSection,
  SystemStepReveal,
  TensionAxis,
} from './explorer-primitives';

export function Explorer01RusticReliability() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <SystemExplorerSection
      id="explorer-01"
      number={explorer01.number}
      title={explorer01.title}
      intro={explorer01.intro}
      designQuestion={explorer01.designQuestion}
      tone="white"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <TensionAxis
          top={explorer01.tension.top}
          bottom={explorer01.tension.bottom}
          className="lg:col-span-3"
        />
        <div className="lg:col-span-9">
          <SystemStepReveal
            steps={explorer01.steps}
            activeIndex={activeStep}
            onStepChange={setActiveStep}
          />
          <OutcomeCallout label="Proposed Outcome">{explorer01.outcome}</OutcomeCallout>
          <ConceptDisclaimer>
            Progressive layers are conceptual design hypotheses from independent research — not measured operational data or implemented interventions.
          </ConceptDisclaimer>
        </div>
      </div>
    </SystemExplorerSection>
  );
}
