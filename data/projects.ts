const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export type ProjectTrack = 'independent-research-practice' | 'client-work';

export type IndependentResearchType = 'Research OS' | 'Framework' | 'Concept' | 'Experimental Build';
export type ClientWorkType = 'Higher Education' | 'Commerce' | 'Healthcare' | 'Enterprise' | 'Emerging Tech';
export type ProjectType = IndependentResearchType | ClientWorkType;

export interface ProjectRecord {
  id: string;
  title: string;
  href: string;
  track: ProjectTrack;
  type: ProjectType;
  summary: string;
  tags: string[];
  navTitle?: string;   // overrides title in the nav dropdown when they differ
  navStatus?: string;  // e.g. 'Flagship Synthesis'
  imageUrl?: string;   // client-work representative image
  legacyLabel?: string; // backward-compat: the `year` display value used by previous/page.tsx
}

export const PROJECTS: ProjectRecord[] = [
  // ── Independent Research Practice ────────────────────────────────────────

  {
    id: 'environmental-systems-design-os',
    title: 'Environmental Systems Design OS',
    href: '/projects/environmental-systems-design-os',
    track: 'independent-research-practice',
    type: 'Research OS',
    summary:
      'A working environment for capturing observations, identifying patterns, and developing reusable design frameworks.',
    tags: ['Audits', 'Patterns', 'Projects & Concepts', 'Portfolio Assets'],
  
    navTitle: 'Research OS',},
  {
    id: 'architecture-of-confidence',
    title: 'The Architecture of Confidence',
    href: '/projects/architecture-of-confidence',
    track: 'independent-research-practice',
    type: 'Framework',
    summary:
      'A transferable framework for designing decision support that reduces uncertainty, preserves agency, and helps people recover when conditions change.',
    tags: ['Decision support', 'Confidence', 'Recovery'],
    navTitle: 'Architecture of Confidence',
  },
  {
    id: 'wayfinding-matrix',
    title: 'The Wayfinding Matrix',
    href: '/projects/wayfinding-matrix',
    track: 'independent-research-practice',
    type: 'Concept',
    navTitle: 'Wayfinding Matrix',
    summary:
      "An ambient, non-screen navigation framework for remote adventure parks and wilderness reserves. It matches a guest's real-time physical endurance data with changing weather patterns to deliver low-friction safety nets, allowing true off-grid spontaneity.",
    tags: ['Ambient Intelligence', 'Intentional Spontaneity', 'Hushpitality'],
  },
  {
    id: 'intention-engine',
    title: 'The Intention Engine',
    href: '/projects/intention-engine',
    track: 'independent-research-practice',
    type: 'Concept',
    navTitle: 'Intention Engine',
    summary:
      'A semantic discovery and service recovery engine built for luxury ecotourism. It translates abstract human psychological states (burnout, transition) into highly specific spatial Blueprints and multi-sensory arrival-to-departure guest journeys.',
    tags: ['Zero-Search Discovery', 'Psychological Blueprints', 'Whycations'],
  },
  {
    id: 'responsive-ecologies',
    title: 'Responsive Ecologies',
    href: '/projects/responsive-ecologies',
    track: 'independent-research-practice',
    type: 'Concept',
    summary:
      'A multi-agent AI land stewardship platform for backcountry outfitters and luxury eco-lodges. It processes edge-sensor telemetry (soil, fuel load, hydrology) to autonomously generate adaptive trail maintenance schedules and wildlife-safe guiding corridors.',
    tags: ['Predictive Agentic Modeling', 'Soft Adventure', 'Climate Resilience'],
    navStatus: 'Flagship Synthesis',
  },
  {
    id: 'adaptive-ranch-experience-companion',
    title: 'Adaptive Outdoor Hospitality Companion',
    href: '/projects/adaptive-ranch-experience-companion',
    track: 'independent-research-practice',
    type: 'Concept',
    summary:
      'A systems design concept for confidence-centered outdoor hospitality, ranch operations, stewardship, guest guidance, and recovery. It is framed as a concept, not a shipped product.',
    tags: ['Hospitality', 'Stewardship', 'Recovery'],
  },
  {
    id: 'travel-and-ai',
    title: 'Human Adaptive Decision Engine (HADE)',
    href: '/projects/travel-and-ai',
    track: 'independent-research-practice',
    type: 'Experimental Build',
    navTitle: 'HADE',
    summary:
      'An adaptive decision-support engine that interprets live context signals and turns changing conditions into clearer next steps.',
    tags: ['AI reasoning', 'Context', 'Guidance'],
  },
  {
    id: 'digital-executor',
    title: 'Digital Executor',
    href: '/projects/digital-executor',
    track: 'independent-research-practice',
    type: 'Experimental Build',
    summary:
      'A service recovery and coordination concept for helping people move forward when plans break, vendors hand off, or next steps become unclear.',
    tags: ['Recovery', 'Operations', 'Handoffs'],
  },
  {
    id: 'field-notes',
    title: 'Field Notes',
    href: '/projects/field-notes',
    track: 'independent-research-practice',
    type: 'Experimental Build',
    summary:
      'A place-aware product for capturing travel signals, environmental context, and local knowledge that can support better decisions in the moment.',
    tags: ['Travel signals', 'Place-aware', 'Field data'],
  },

  // ── Client Work ───────────────────────────────────────────────────────────

  {
    id: 'purdue',
    title: 'Purdue University',
    href: '/projects/purdue',
    track: 'client-work',
    type: 'Higher Education',
    summary:
      'Web and digital design projects focusing on enhancing UX, UI, and streamlining content management and information architecture.',
    tags: ['Higher Education'],
    imageUrl: `${basePath}/images/PU-Memorial-Mall-DJI.jpg`,
    legacyLabel: 'Web Design',
  },
  {
    id: 'timbertech',
    title: 'TimberTech',
    href: '/projects/previous/timbertech',
    track: 'client-work',
    type: 'Commerce',
    summary: 'A full redesign for TimberTech.com and their existing design system.',
    tags: ['Commerce'],
    imageUrl: `${basePath}/images/timbertech-card.jpg`,
    legacyLabel: 'Web Design',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    href: '/projects/previous/healthcare',
    track: 'client-work',
    type: 'Healthcare',
    summary:
      'A digital platform designed to connect healthcare professionals and patients across developing nations.',
    tags: ['Healthcare'],
    imageUrl: `${basePath}/images/healthcare-card.jpg`,
    legacyLabel: 'IA & UI',
  },
  {
    id: 'mcdonalds-kiosk',
    title: 'McDonalds Kiosk',
    href: '/projects/previous/mcdonalds-kiosk',
    track: 'client-work',
    type: 'Commerce',
    navTitle: "McDonald's Kiosk",
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    tags: ['Commerce'],
    imageUrl: `${basePath}/images/mcDonalds-card.jpg`,
    legacyLabel: 'Product Design',
  },
  {
    id: 'intel',
    title: 'Intel',
    href: '/projects/previous/intel',
    track: 'client-work',
    type: 'Enterprise',
    summary:
      'A sustainability tracking application helping businesses monitor and reduce their environmental impact.',
    tags: ['Enterprise'],
    imageUrl: `${basePath}/images/heroGraphic.jpg`,
    legacyLabel: 'Market Research',
  },
  {
    id: 'nodalytics',
    title: 'Nodalytics',
    href: '/projects/previous/nodalytics',
    track: 'client-work',
    type: 'Emerging Tech',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    tags: ['Emerging Tech'],
    imageUrl: `${basePath}/images/Nodalytics_heroGraphic-3.jpg`,
    legacyLabel: 'Product Design',
  },
  {
    id: 'newdea',
    title: 'Newdea',
    href: '/projects/previous/newdea',
    track: 'client-work',
    type: 'Enterprise',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    tags: ['Enterprise'],
    imageUrl: `${basePath}/images/newdea_hero_containerGraphic-5.jpg`,
    legacyLabel: 'Product Design',
  },
  {
    id: 'doublegood',
    title: 'DoubleGood',
    href: '/projects/previous/doublegood',
    track: 'client-work',
    type: 'Commerce',
    summary:
      'Worked on UX and UI enhancements for a Chicago-based inner-city fundraising platform.',
    tags: ['Commerce'],
    imageUrl: `${basePath}/images/doubleGoodImage.webp`,
    legacyLabel: 'Web Design (Mobile)',
  },
  {
    id: 'advisestream',
    title: 'AdviseStream',
    href: '/projects/previous/advisestream',
    track: 'client-work',
    type: 'Enterprise',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    tags: ['Enterprise'],
    imageUrl: `${basePath}/images/Advistestream_mockup-createReport.jpg`,
    legacyLabel: 'Product Design',
  },
  {
    id: 'sphere-software',
    title: 'Sphere Software',
    href: '/projects/previous/sphere-software',
    track: 'client-work',
    type: 'Emerging Tech',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    tags: ['Emerging Tech'],
    imageUrl: `${basePath}/images/chairliftAllScreens.png`,
    legacyLabel: 'Product & Web Design',
  },
  {
    id: 'havas-agency',
    title: 'Havas Agency',
    href: '/projects/previous/havas-agency',
    track: 'client-work',
    type: 'Enterprise',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    tags: ['Enterprise'],
    imageUrl: `${basePath}/images/havas-card.jpg`,
    legacyLabel: 'UX & Web Design',
  },
  {
    id: 'rich-products',
    title: 'Rich Products',
    href: '/projects/previous/rich-products',
    track: 'client-work',
    type: 'Enterprise',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    tags: ['Enterprise'],
    imageUrl: `${basePath}/images/websiteCards_template.png`,
    legacyLabel: 'IA & Web Design',
  },
];

export const independentResearchProjects = PROJECTS.filter(
  (p) => p.track === 'independent-research-practice',
);

export const clientWorkProjects = PROJECTS.filter(
  (p) => p.track === 'client-work',
);

// ── Track presentation metadata ──────────────────────────────────────────────
// Drives the two co-equal cards in the homepage Work section (and reusable by the
// Independent Research Practice hub page). `order` is the easily-swappable knob
// for which card leads — lower sorts first. Change the numbers to reorder; no JSX
// edits required.
export interface TrackMeta {
  track: ProjectTrack;
  order: number;
  label: string;
  subtext: string;
  tags: string[];
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  hideTags?: boolean;
}

export const TRACK_META: TrackMeta[] = [
  {
    track: 'independent-research-practice',
    order: 1,
    label: 'Systems Design Practice',
    subtext:
      'An independent systems design practice developing frameworks, concepts, and experimental products that explore decision-making, outdoor hospitality, stewardship, and environmental complexity.',
    tags: ['Research', 'Frameworks', 'Concepts', 'Experimental Builds'],
    hideTags: true,
    href: '/projects/research-practice',
    cta: 'Explore the Research Practice',
    image: `${basePath}/images/earth-map.jpg`,
    imageAlt: 'A world map representing systems design research across environmental contexts.',
  },
  {
    track: 'client-work',
    order: 2,
    label: 'Professional / Client Work',
    subtext:
      'Over a decade designing digital products and services across healthcare, education, enterprise, commerce, and emerging technology.',
    tags: ['Healthcare', 'Higher education', 'Enterprise', 'Commerce', 'Emerging tech'],
    hideTags: true,
    href: '/projects/previous',
    cta: 'View Selected Client Work',
    image: `${basePath}/images/chairliftAllScreens.png`,
    imageAlt:
      'Responsive product screens across desktop, tablet, and mobile from client engagements.',
  },
];

// Tracks in display order, paired with the projects that belong to each.
export const orderedTracks = [...TRACK_META]
  .sort((a, b) => a.order - b.order)
  .map((meta) => ({
    meta,
    projects: PROJECTS.filter((p) => p.track === meta.track),
  }));
