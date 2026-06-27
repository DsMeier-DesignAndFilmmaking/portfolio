// All copy for the /services route. Keep the page.tsx thin; edit copy here.
// No published pricing by design — engagements open with a scoping call.

export const hero = {
  kicker: 'Engagements',
  title: 'Systems audits, adaptive logic framing, and structural design strategy.',
  deck: 'The practice, offered as work.',
  lede:
    'Most teams do not have a design problem. They have a systems problem wearing a design problem’s clothes — information lost between steps, logic that breaks when conditions change, friction at the seam between the digital and the operational. These three engagements name and resolve that.',
  ctaLabel: 'Book a scoping call',
  ctaHref:
    'mailto:danielstevenmeier@gmail.com?subject=Systems%20design%20engagement&body=A%20few%20lines%20on%20the%20system%2C%20the%20friction%2C%20and%20your%20timeline%3A',
} as const;

export interface Engagement {
  no: string;
  title: string;
  body: string;
  whenYouNeedIt: string;
  youGet: string;
}

export const engagements: Engagement[] = [
  {
    no: '01 /',
    title: 'Systems Audit',
    body: 'A structured read of how the current system loses information, agency, or recovery — across the digital, operational, and physical layers it actually spans.',
    whenYouNeedIt:
      'Something works on paper but breaks in the field, and no one can name where.',
    youGet:
      'A mapped system with the failure points located, ranked, and traced to cause.',
  },
  {
    no: '02 /',
    title: 'Adaptive Logic Framing',
    body: 'The decision logic for how AI workflows, state tracking, and semantic rules should behave when conditions change — written before anyone builds it.',
    whenYouNeedIt:
      'You are about to build automation or AI and the rules for “what happens when reality shifts” are undefined.',
    youGet:
      'A logic specification: states, signals, fallbacks, and the recovery path when the system is wrong.',
  },
  {
    no: '03 /',
    title: 'Structural Design Strategy',
    body: 'The component and decision architecture a team builds against — the structure that keeps the product coherent as it scales past its first version.',
    whenYouNeedIt:
      'The product is growing faster than its structure and every new feature costs more than the last.',
    youGet:
      'A component and information architecture, with the governing rules that hold it together.',
  },
];

export interface ProcessStep {
  no: string;
  title: string;
  body: string;
}

export const process: ProcessStep[] = [
  {
    no: '01',
    title: 'Scope',
    body: 'A call to locate the real system and the friction inside it. No charge — it is how we both decide there is a fit.',
  },
  {
    no: '02',
    title: 'Read',
    body: 'Field and artifact research: how the system behaves in use, not in the deck. Observation becomes structured evidence.',
  },
  {
    no: '03',
    title: 'Frame',
    body: 'The evidence becomes a framework — the audit, the logic spec, or the architecture — traceable back to what was observed.',
  },
  {
    no: '04',
    title: 'Hand off',
    body: 'A structure your team builds against, with the governing rules written down so it survives contact with the next decision.',
  },
];

export const fit = {
  good: [
    'You own a system that spans digital, operational, and physical layers.',
    'You are about to commit engineering to AI or automation and want the logic right first.',
    'A product works in demos but loses coherence as it scales.',
    'You want the structure and the reasoning, not just screens.',
  ],
  notYet: [
    'You need production visual design or a marketing site built.',
    'You want headcount augmentation rather than a bounded engagement.',
    'The decision is already made and you need execution, not framing.',
    'There is no system yet — only an idea looking for validation.',
  ],
} as const;

export const closer = {
  title: 'Start with the system, not the scope.',
  body: 'Send a few lines on the system, the friction, and your timeline. The first call is a scoping conversation — we use it to find the real problem and decide whether an engagement fits.',
  ctaLabel: 'Book a scoping call',
  ctaHref: hero.ctaHref,
} as const;
