const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export type ProjectTrack = 'independent-research-practice' | 'client-work';

export type IndependentResearchType = 'Research OS' | 'Framework' | 'Concept' | 'Experimental Build';
export type ClientWorkType = 'Higher Education' | 'Commerce' | 'Healthcare' | 'Enterprise' | 'Emerging Tech';
export type ProjectType = IndependentResearchType | ClientWorkType;
export type ProjectVisibility = 'public' | 'hidden' | 'draft' | 'deprecated';
export type PracticeOSCategory =
  | 'vision'
  | 'strategy'
  | 'research-program'
  | 'framework-library'
  | 'field-studies'
  | 'concepts'
  | 'consulting'
  | 'products'
  | 'marketing'
  | 'business-development'
  | 'career-strategy'
  | 'roadmap'
  | 'resources';
export type PracticeDomainTrack =
  | 'environmental-systems'
  | 'experience-design'
  | 'service-design'
  | 'outdoor-hospitality'
  | 'destination-development'
  | 'field-studies'
  | 'stewardship'
  | 'operations'
  | 'digital-products'
  | 'professional-validation';
export type PracticeAssetType =
  | 'research-os'
  | 'framework'
  | 'concept'
  | 'experimental-build'
  | 'case-study'
  | 'field-study'
  | 'resource';
export type ProjectMaturity = 'early' | 'developing' | 'strong' | 'operational' | 'archived';
export type EvidenceLevel = 'conceptual' | 'prototype' | 'case-study' | 'field-informed' | 'operational';
export type ProjectStatus = 'active' | 'in-development' | 'published' | 'archived';

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
  canonicalHref?: string;
  visibility?: ProjectVisibility;
  osCategory?: PracticeOSCategory | PracticeOSCategory[];
  practiceTrack?: PracticeDomainTrack | PracticeDomainTrack[];
  projectType?: PracticeAssetType;
  maturity?: ProjectMaturity;
  evidenceLevel?: EvidenceLevel;
  status?: ProjectStatus;
  redirectFrom?: string[];
  proofLabel?: string;
}

export const PROJECTS: ProjectRecord[] = [
  // ── Independent Research Practice ────────────────────────────────────────

  {
    id: 'environmental-systems-design-os',
    title: 'Environmental Systems Design OS',
    href: '/projects/environmental-systems-design-os',
    track: 'independent-research-practice',
    type: 'Research OS',
    canonicalHref: '/projects/environmental-systems-design-os',
    visibility: 'public',
    osCategory: ['research-program', 'framework-library', 'roadmap', 'resources'],
    practiceTrack: ['environmental-systems', 'stewardship', 'operations'],
    projectType: 'research-os',
    maturity: 'strong',
    evidenceLevel: 'field-informed',
    status: 'published',
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
    canonicalHref: '/projects/architecture-of-confidence',
    visibility: 'public',
    osCategory: ['framework-library', 'strategy', 'consulting'],
    practiceTrack: ['experience-design', 'service-design', 'operations'],
    projectType: 'framework',
    maturity: 'strong',
    evidenceLevel: 'field-informed',
    status: 'published',
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
    canonicalHref: '/projects/wayfinding-matrix',
    visibility: 'public',
    osCategory: ['concepts', 'framework-library', 'products'],
    practiceTrack: ['environmental-systems', 'experience-design', 'outdoor-hospitality'],
    projectType: 'concept',
    maturity: 'developing',
    evidenceLevel: 'conceptual',
    status: 'published',
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
    canonicalHref: '/projects/intention-engine',
    visibility: 'public',
    osCategory: ['concepts', 'framework-library', 'products'],
    practiceTrack: ['experience-design', 'service-design', 'destination-development'],
    projectType: 'concept',
    maturity: 'developing',
    evidenceLevel: 'conceptual',
    status: 'published',
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
    canonicalHref: '/projects/responsive-ecologies',
    visibility: 'public',
    osCategory: ['concepts', 'products', 'consulting'],
    practiceTrack: ['environmental-systems', 'stewardship', 'operations'],
    projectType: 'concept',
    maturity: 'strong',
    evidenceLevel: 'field-informed',
    status: 'published',
    summary:
      'A multi-agent AI land stewardship platform for backcountry outfitters and luxury eco-lodges. It processes edge-sensor telemetry (soil, fuel load, hydrology) to autonomously generate adaptive trail maintenance schedules and wildlife-safe guiding corridors.',
    tags: ['Predictive Agentic Modeling', 'Soft Adventure', 'Climate Resilience'],
    navStatus: 'Flagship Synthesis',
  },
  {
    id: 'rock-creek-os',
    title: 'Case Study: The Ranch at Rock Creek',
    href: '/projects/rock-creek-os',
    track: 'independent-research-practice',
    type: 'Concept',
    canonicalHref: '/projects/rock-creek-os',
    visibility: 'public',
    osCategory: ['concepts', 'consulting', 'strategy'],
    practiceTrack: ['environmental-systems', 'outdoor-hospitality', 'operations', 'stewardship'],
    projectType: 'concept',
    maturity: 'developing',
    evidenceLevel: 'conceptual',
    status: 'published',
    navTitle: 'Case Study: The Ranch at Rock Creek',
    summary:
      'A five-layer operating model and systems atlas for a remote, high-consequence hospitality landscape, where experience, operations, infrastructure, ecology, and landscape constrain and reinforce one another.',
    tags: ['Infrastructure', 'Resilience', 'Stewardship'],
  },
  {
    id: 'whitetail-club',
    title: 'Whitetail Club & Shore Lodge',
    href: '/projects/whitetail-club',
    track: 'independent-research-practice',
    type: 'Concept',
    canonicalHref: '/projects/whitetail-club',
    visibility: 'public',
    osCategory: ['concepts', 'field-studies'],
    practiceTrack: ['stewardship', 'operations', 'digital-products'],
    projectType: 'case-study',
    maturity: 'strong',
    // 'conceptual' on purpose: the system was never deployed and no field
    // validation occurred. Do not raise this to 'field-informed'.
    evidenceLevel: 'conceptual',
    status: 'published',
    summary:
      'A stewardship intelligence system for a mountain property, designed so the landscape keeps a record of what is known, how well it is known, and why each decision was made.',
    tags: ['Stewardship', 'Epistemic design', 'Field systems'],
    navTitle: 'Case Study: Whitetail Club & Shore Lodge',
  },
  {
    id: 'adaptive-ranch-experience-companion',
    title: 'Adaptive Outdoor Hospitality Companion',
    href: '/projects/adaptive-ranch-experience-companion',
    track: 'independent-research-practice',
    type: 'Concept',
    canonicalHref: '/projects/adaptive-ranch-experience-companion',
    visibility: 'public',
    osCategory: ['concepts', 'consulting', 'products'],
    practiceTrack: ['outdoor-hospitality', 'service-design', 'operations', 'stewardship'],
    projectType: 'concept',
    maturity: 'strong',
    evidenceLevel: 'field-informed',
    status: 'published',
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
    canonicalHref: '/projects/travel-and-ai',
    visibility: 'public',
    osCategory: ['products', 'concepts', 'framework-library'],
    practiceTrack: ['digital-products', 'destination-development', 'experience-design'],
    projectType: 'experimental-build',
    maturity: 'strong',
    evidenceLevel: 'prototype',
    status: 'published',
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
    canonicalHref: '/projects/digital-executor',
    visibility: 'public',
    osCategory: ['concepts', 'products'],
    practiceTrack: ['service-design', 'operations', 'digital-products'],
    projectType: 'experimental-build',
    maturity: 'early',
    evidenceLevel: 'conceptual',
    status: 'in-development',
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
    canonicalHref: '/projects/field-notes',
    visibility: 'public',
    osCategory: ['field-studies', 'research-program', 'products'],
    practiceTrack: ['field-studies', 'environmental-systems', 'digital-products'],
    projectType: 'experimental-build',
    maturity: 'developing',
    evidenceLevel: 'prototype',
    status: 'published',
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
    canonicalHref: '/projects/purdue',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'experience-design'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'Web and digital design projects focusing on enhancing UX, UI, and streamlining content management and information architecture.',
    proofLabel: 'Institutional information architecture and scalable CMS delivery.',
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
    canonicalHref: '/projects/previous/timbertech',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'experience-design'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary: 'A full redesign for TimberTech.com and their existing design system.',
    proofLabel: 'Commerce IA, content systems, design systems, and conversion pathways.',
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
    canonicalHref: '/projects/previous/healthcare',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'service-design'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A digital platform designed to connect healthcare professionals and patients across developing nations.',
    proofLabel: 'High-stakes service access, complex information flows, and trust-sensitive UX.',
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
    canonicalHref: '/projects/previous/mcdonalds-kiosk',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'experience-design'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    navTitle: "McDonald's Kiosk",
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
    proofLabel: 'Service interaction design, kiosk decision flows, and operational upsell logic.',
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
    canonicalHref: '/projects/previous/intel',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'digital-products'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A sustainability tracking application helping businesses monitor and reduce their environmental impact.',
    proofLabel: 'Enterprise research, sustainability concepts, and future-facing product strategy.',
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
    canonicalHref: '/projects/previous/nodalytics',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'digital-products'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
      proofLabel: 'Blockchain data, dashboard UX UI, Product Prototypes.',
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
    canonicalHref: '/projects/previous/newdea',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'digital-products'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
      proofLabel: 'Blockchain-based digital infrastructure tool, Interation design prototypes.',
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
    canonicalHref: '/projects/previous/doublegood',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'experience-design'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'Worked on UX and UI enhancements for a Chicago-based inner-city fundraising platform.',
      proofLabel: 'Mobile Web UX and UI design for fundraising platform.',
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
    canonicalHref: '/projects/previous/advisestream',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'digital-products'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
      proofLabel: 'Multi-stage funnel design, Rsponsive UI frameworks.',
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
    canonicalHref: '/projects/previous/sphere-software',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'digital-products'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
      proofLabel: 'Human Resources Application Suite, Digital Design, Product Leadership and Vision.',
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
    canonicalHref: '/projects/previous/havas-agency',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'experience-design'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
      proofLabel: 'Consumer Branding, UX leadership, Specifications.',
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
    canonicalHref: '/projects/previous/rich-products',
    visibility: 'public',
    osCategory: 'career-strategy',
    practiceTrack: ['professional-validation', 'experience-design'],
    projectType: 'case-study',
    maturity: 'archived',
    evidenceLevel: 'case-study',
    status: 'archived',
    summary:
      'A digital platform designed to connect healthcare professionals and resources across developing nations.',
      proofLabel: 'UX and UI Consulting, Design leadership, Informatiom Architecture.',
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
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageBlurDataURL?: string;
  imagePriority?: boolean;
  hideTags?: boolean;
}

export const TRACK_META: TrackMeta[] = [
  {
    track: 'independent-research-practice',
    order: 1,
    label: 'Systems Design Practice',
    subtext:
      'Translating complex environmental data into flexible, component-driven systems designed for real-world land dynamics and operations.',
    tags: ['Research', 'Frameworks', 'Concepts', 'Experimental Builds'],
    hideTags: true,
    href: '/practice',
    cta: 'Explore the Practice',
    image: `${basePath}/images/optimized/earth-map-xl.webp`,
    imageWidth: 1280,
    imageHeight: 640,
    imageAlt: 'A world map representing systems design research across environmental contexts.',
    imageBlurDataURL:
      'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoQAAgAA8BgJbACdAELTLaVciAA3mUCMhdHxwnbMwTKbah3ga+uq29xpB0G9fTlTtjuBoAA',
  },
  {
    track: 'client-work',
    order: 2,
    label: 'Shipped Projects & Client Work',
    subtext:
      '15+ years of design and resolving operational friction across higher education, healthcare, enterprise, and emerging tech.',
    tags: ['Healthcare', 'Higher education', 'Enterprise', 'Commerce', 'Emerging tech'],
    hideTags: true,
    href: '/projects/previous',
    cta: 'View Client Work',
    image: `${basePath}/images/chairliftAllScreens.png`,
    imageWidth: 1400,
    imageHeight: 800,
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
