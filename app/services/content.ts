// All copy for the /services route. Keep the page.tsx thin; edit copy here.
// No published pricing by design — engagements open with a scoping call.

export const hero = {
  kicker: 'Engagements',
  title: 'Independent systems design for products, AI, and operational complexity.',
  deck:
    'I help teams diagnose complex systems, define adaptive decision logic, and create the structural frameworks products can grow on.',
  lede:
    'Most teams do not have a design problem. They have a systems problem: information disappears between steps, logic breaks when conditions change, and products become harder to evolve.',
  ctaLabel: 'Start a Scoping Call',
  ctaHref: '#contact-form',
} as const;

export const typicalProblems = {
  title: 'Typical Problems',
  intro:
    'This work is useful when the visible issue is only a symptom of a deeper system problem.',
  items: [
    'AI initiatives without clear decision logic',
    'Products becoming harder to evolve',
    'Operations disconnected from digital tools',
    'Teams solving symptoms instead of structure',
    'Experience breakdowns across physical and digital touchpoints',
    'Complex systems no one fully understands anymore',
  ],
} as const;

export interface Engagement {
  no: string;
  title: string;
  outcome: string;
  bestFor: string[];
  deliverables: string[];
}

export const engagements: Engagement[] = [
  {
    no: '01 /',
    title: 'Systems Audit',
    outcome: 'Find where information, decisions, and operations break down.',
    bestFor: [
      'Products that feel increasingly complex',
      'Disconnected teams or workflows',
      'Operational friction across digital and physical touchpoints',
    ],
    deliverables: [
      'System map',
      'Failure-point analysis',
      'Prioritized opportunities',
    ],
  },
  {
    no: '02 /',
    title: 'Adaptive Logic Framing',
    outcome:
      'Define how AI workflows, state tracking, and decision rules should behave when conditions change.',
    bestFor: [
      'AI or automation initiatives before build',
      'Undefined decision logic',
      'Systems that need fallbacks, recovery paths, or confidence states',
    ],
    deliverables: [
      'Logic specification',
      'State and signal model',
      'Fallback and recovery paths',
    ],
  },
  {
    no: '03 /',
    title: 'Structural Design Strategy',
    outcome:
      'Create the component, information, and decision architecture a product can scale against.',
    bestFor: [
      'Products growing past their first version',
      'Design systems without governing logic',
      'Teams adding features faster than structure can support',
    ],
    deliverables: [
      'Component architecture',
      'Information architecture',
      'Governing design rules',
    ],
  },
];

export const bestFor = [
  'Physical and digital systems',
  'AI or automation logic',
  'Service and operations friction',
] as const;

export interface ProcessStep {
  no: string;
  title: string;
  body: string;
}

export const process: ProcessStep[] = [
  {
    no: '01',
    title: 'Scoping Call',
    body: 'A focused conversation to locate the system, the friction, and whether there is a fit.',
  },
  {
    no: '02',
    title: 'System Read',
    body: 'Research across artifacts, workflows, user behavior, operational realities, and field conditions.',
  },
  {
    no: '03',
    title: 'Framework',
    body: 'The evidence becomes a system map, logic specification, or structural architecture.',
  },
  {
    no: '04',
    title: 'Handoff',
    body: 'Your team receives a clear structure, governing rules, and recommended next decisions.',
  },
];

export const proof = {
  title: 'Why This Practice',
  body:
    'The method combines independent systems research with a decade of shipped digital work.',
  points: [
    '10+ years designing digital products, enterprise systems, and complex information architectures',
    'Independent research practice focused on systems, decision logic, and adaptive experience design',
    'Published frameworks across AI, environmental systems, outdoor hospitality, and operational complexity',
    'Implementation experience across higher education, healthcare, enterprise, e-commerce, and service systems',
  ],
  links: [
    {
      eyebrow: 'Method source',
      title: 'Systems Design Practice',
      href: '/projects/research-practice',
    },
    {
      eyebrow: 'Delivery validation',
      title: 'Shipped Projects & Client Work',
      href: '/projects/previous',
    },
  ],
} as const;

export const fit = {
  good: [
    'You own a system that spans digital, operational, and physical layers.',
    'You are planning AI, automation, or adaptive workflows and need the logic clarified first.',
    'Your product works in demos but loses coherence as it scales.',
    'You want structure, reasoning, and decision rules — not just screens.',
  ],
  notYet: [
    'You need production visual design only.',
    'You need a marketing website built.',
    'You want headcount augmentation rather than a bounded engagement.',
    'The idea has not been validated enough to identify a real system.',
  ],
} as const;

export const faq = {
  title: 'Questions Before We Talk',
  items: [
    {
      question: 'What kind of teams is this for?',
      answer:
        'Product teams, founders, operators, innovation groups, and organizations working across digital, operational, and physical systems.',
    },
    {
      question: 'Do you implement the work?',
      answer:
        'The core engagement is strategy, structure, and documentation. Depending on scope, I can also support implementation planning or collaborate with existing product, design, and engineering teams.',
    },
    {
      question: 'How long does an engagement take?',
      answer:
        'Most engagements are scoped as bounded projects. The timeline depends on system complexity, research access, and the level of documentation needed.',
    },
    {
      question: 'What if I am not sure which engagement fits?',
      answer:
        'Start with a scoping call. The first conversation is used to identify the real system, the friction inside it, and whether one of the engagements is appropriate.',
    },
  ],
} as const;

export const contact = {
  kicker: '08 // Start a Scoping Call',
  title: 'Tell me about the system.',
  body: 'Share the system, where it is breaking down, and your timeline. The first conversation is a scoping call to find the real problem — not a sales pitch. I read every inquiry before responding.',
} as const;

export const closer = {
  title: 'Start with the system.',
  body: 'Send a few lines about the system, where it is breaking down, and what timeline you are working against. The first call is a scoping conversation, not a sales pitch.',
  ctaLabel: 'Book a Scoping Call',
  ctaHref: hero.ctaHref,
  support:
    'If there is a clear fit, we will define the right engagement. If not, I will tell you directly.',
} as const;
