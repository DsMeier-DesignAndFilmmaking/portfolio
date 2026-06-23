// Static Work section: no client hooks, no global navigation behavior.
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Compass,
  Layers3,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

type LinkedWorkCard = {
  title: string;
  label: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
};

type StaticWorkCard = {
  title: string;
  label: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  status?: string;
  href?: string;
  internalLink?: string;
};

type CardTone = 'teal' | 'violet' | 'amber' | 'blue';

// All color tokens written as full Tailwind class strings for correct purging
const TONE = {
  violet: {
    cardBorder: 'border-violet-100',
    cardBorderFeatured: 'border-violet-200',
    cardBorderDashed: 'border-violet-200',
    iconContainer: 'border-violet-100 bg-violet-50 text-violet-700',
    label: 'text-violet-700/65',
    cta: 'text-violet-700 hover:text-violet-800 focus:ring-violet-700',
    ctaHoverBg: 'hover:bg-violet-50/60 hover:text-violet-800',
    tagLinkTone: 'stone' as const,
    methodCta: 'text-violet-700 hover:text-violet-800 focus:ring-violet-700',
  },
  teal: {
    cardBorder: 'border-teal-100',
    cardBorderFeatured: 'border-teal-200',
    cardBorderDashed: 'border-teal-200',
    iconContainer: 'border-teal-100 bg-teal-50 text-teal-700',
    label: 'text-teal-700/65',
    cta: 'text-teal-700 hover:text-teal-800 focus:ring-teal-700',
    ctaHoverBg: 'hover:bg-teal-50/60 hover:text-teal-800',
    tagLinkTone: 'teal' as const,
    methodCta: 'text-teal-700 hover:text-teal-800 focus:ring-teal-700',
  },
  amber: {
    cardBorder: 'border-amber-100',
    cardBorderFeatured: 'border-amber-200',
    cardBorderDashed: 'border-amber-200',
    iconContainer: 'border-amber-100 bg-amber-50 text-amber-700',
    label: 'text-amber-700/65',
    cta: 'text-amber-700 hover:text-amber-800 focus:ring-amber-700',
    ctaHoverBg: 'hover:bg-amber-50/60 hover:text-amber-800',
    tagLinkTone: 'amber' as const,
    methodCta: 'text-amber-700 hover:text-amber-800 focus:ring-amber-700',
  },
  blue: {
    cardBorder: 'border-blue-100',
    cardBorderFeatured: 'border-blue-200',
    cardBorderDashed: 'border-blue-200',
    iconContainer: 'border-blue-100 bg-blue-50 text-blue-700',
    label: 'text-blue-700/65',
    cta: 'text-blue-700 hover:text-blue-800 focus:ring-blue-700',
    ctaHoverBg: 'hover:bg-blue-50/60 hover:text-blue-800',
    tagLinkTone: 'blue' as const,
    methodCta: 'text-blue-700 hover:text-blue-800 focus:ring-blue-700',
  },
} as const;

const NOTION_OS_URL = 'https://app.notion.com/p/Environmental-Systems-Design-OS-37defa67177f80fcb70dc324c03e2e7d?source=copy_link';

// Research section (teal)
const researchCards: StaticWorkCard[] = [
  {
    title: 'Environmental Systems Design OS',
    label: 'Research OS',
    description:
      'A working environment for capturing observations, identifying patterns, and developing reusable design frameworks.',
    tags: ['Audits', 'Patterns', 'Projects & Concepts', 'Portfolio Assets'],
    icon: Layers3,
    internalLink: '/projects/environmental-systems-design-os',
  },
];

// Frameworks section (violet)
const frameworkCards: LinkedWorkCard[] = [
  {
    title: 'The Architecture of Confidence',
    label: 'Framework',
    description:
      'A transferable framework for designing decision support that reduces uncertainty, preserves agency, and helps people recover when conditions change.',
    tags: ['Decision support', 'Confidence', 'Recovery'],
    cta: 'Explore Framework',
    href: '/projects/architecture-of-confidence',
    icon: ShieldCheck,
    
  },
];

// Concepts section (amber)
const conceptCards: StaticWorkCard[] = [
  {
    title: 'The Wayfinding Matrix',
    label: 'Concept',
    description:
      `An ambient, non-screen navigation framework for remote adventure parks and wilderness reserves. It matches a guest's real-time physical endurance data with changing weather patterns to deliver low-friction safety nets, allowing true off-grid spontaneity.`,
    tags: ['Ambient Intelligence', 'Intentional Spontaneity', 'Hushpitality'],
    icon: Compass,
    href: '/projects/wayfinding-matrix',
  },
  {
    title: 'The Intention Engine',
    label: 'Concept',
    description:
      `A semantic discovery and service recovery engine built for luxury ecotourism. It translates abstract human psychological states (burnout, transition) into highly specific spatial Blueprints and multi-sensory arrival-to-departure guest journeys.`,
    tags: ['Zero-Search Discovery', 'Psychological Blueprints', 'Whycations'],
    icon: BrainCircuit,
    href: '/projects/intention-engine',
  },
  {
    title: 'Responsive Ecologies',
    label: 'Concept',
    description:
      'A multi-agent AI land stewardship platform for backcountry outfitters and luxury eco-lodges. It processes edge-sensor telemetry (soil, fuel load, hydrology) to autonomously generate adaptive trail maintenance schedules and wildlife-safe guiding corridors.',
    tags: ['Predictive Agentic Modeling', 'Soft Adventure', 'Climate Resilience'],
    icon: Route,
    href: '/projects/responsive-ecologies',
  },
  {
    title: 'Adaptive Outdoor Hospitality Companion',
    label: 'Concept',
    description:
      'A systems design concept for confidence-centered outdoor hospitality, ranch operations, stewardship, guest guidance, and recovery. It is framed as a concept, not a shipped product.',
    tags: ['Hospitality', 'Stewardship', 'Recovery'],
    icon: Compass,
    href: '/projects/adaptive-ranch-experience-companion',
  },
];

// Builds & Implementation section (blue)
const buildsLinkedCards: LinkedWorkCard[] = [
  {
    title: 'Human Adaptive Decision Engine (HADE)',
    label: 'Experimental Build',
    description:
      'An adaptive decision-support engine that interprets live context signals and turns changing conditions into clearer next steps.',
    tags: ['AI reasoning', 'Context', 'Guidance'],
    cta: 'Explore Build',
    href: '/projects/travel-and-ai',
    icon: BrainCircuit,
    featured: true,
  },
  {
    title: 'Digital Executor',
    label: 'Experimental Build',
    description:
      'A service recovery and coordination concept for helping people move forward when plans break, vendors hand off, or next steps become unclear.',
    tags: ['Recovery', 'Operations', 'Handoffs'],
    cta: 'Explore Build',
    href: '/projects/digital-executor',
    icon: Zap,
  },
  {
    title: 'Field Notes',
    label: 'Experimental Build',
    description:
      'A place-aware product for capturing travel signals, environmental context, and local knowledge that can support better decisions in the moment.',
    tags: ['Travel signals', 'Place-aware', 'Field data'],
    cta: 'Explore Build',
    href: '/projects/field-notes',
    icon: MapPinned,
  },
];

const professionalPractice: LinkedWorkCard = {
  title: 'Selected Client Work',
  label: 'Professional Portfolio',
  description:
    'Over a decade designing digital products and services across healthcare, education, enterprise, commerce, and emerging technology.',
  tags: ['Healthcare', 'Higher education', 'Enterprise', 'Commerce', 'Emerging tech'],
  cta: 'View Selected Client Work',
  href: '/projects/previous',
  icon: Building2,
};

function TagList({
  tags,
  dark = false,
  compact = false,
  links,
  linkTone = 'stone',
}: {
  tags: string[];
  dark?: boolean;
  compact?: boolean;
  links?: Record<string, string>;
  linkTone?: 'blue' | 'neutral' | 'stone' | 'violet' | 'teal' | 'amber';
}) {
  const interactiveClasses =
    linkTone === 'blue'
      ? 'border-blue-100 bg-blue-50 text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
      : linkTone === 'neutral'
        ? 'border-neutral-200 bg-neutral-50 text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2'
        : linkTone === 'violet'
          ? 'border-violet-100 bg-violet-50 text-violet-700 transition-colors hover:border-violet-300 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2'
          : linkTone === 'teal'
            ? 'border-teal-100 bg-teal-50 text-teal-700 transition-colors hover:border-teal-300 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2'
            : linkTone === 'amber'
              ? 'border-amber-100 bg-amber-50 text-amber-700 transition-colors hover:border-amber-300 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2'
              : 'border-stone-200 bg-stone-50 text-stone-600 transition-colors hover:border-stone-300 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-700 focus:ring-offset-2';

  const staticClasses = dark
    ? 'border-white/10 bg-white/5 text-white/70'
    : compact
      ? 'border-stone-200 bg-white/70 text-stone-500'
      : linkTone === 'neutral'
        ? 'border-neutral-200 bg-neutral-50 text-neutral-700'
        : linkTone === 'violet'
          ? 'border-violet-100 bg-violet-50/70 text-violet-600'
          : linkTone === 'teal'
            ? 'border-teal-100 bg-teal-50/70 text-teal-600'
            : linkTone === 'amber'
              ? 'border-amber-100 bg-amber-50/70 text-amber-600'
              : 'border-stone-200 bg-stone-50 text-stone-600';

  return (
    <ul className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`} aria-label="Tags">
      {tags.map((tag) => {
        const href = links?.[tag];

        return (
          <li key={tag}>
            {href ? (
              <Link
                href={href}
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${interactiveClasses}`}
                aria-label={`View ${tag}`}
              >
                {tag}
              </Link>
            ) : (
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${staticClasses}`}
              >
                {tag}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SectionEyebrow({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 md:mb-7">
      <p
        id={id}
        className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500"
      >
        {children}
      </p>
    </div>
  );
}

function SystemDesignCard({ card, tone }: { card: LinkedWorkCard; tone: CardTone }) {
  const Icon = card.icon;
  const t = TONE[tone];

  return (
    <article
      className={`rounded-lg border bg-white px-6 py-6 shadow-sm md:px-7 md:py-7 ${
        card.featured ? t.cardBorderFeatured : t.cardBorder
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>{card.label}</p>
            <h3
              className="mt-1 text-2xl font-bold leading-tight text-gray-950"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
              {card.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base">{card.description}</p>

        <div className="mt-4">
          <TagList tags={card.tags} linkTone={t.tagLinkTone} />
        </div>
      </div>

      <div className="mt-6 flex">
        <Link
          href={card.href}
          className={`inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-4 ${t.cta}`}
        >
          {card.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function MethodCard({ card, tone }: { card: StaticWorkCard; tone: CardTone }) {
  const Icon = card.icon;
  const t = TONE[tone];

  return (
    <article className={`rounded-lg border bg-white p-5 shadow-sm ${t.cardBorder}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>{card.label}</p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-gray-950">{card.title}</h3>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.description}</p>
        <div className="mt-4">
          <TagList tags={card.tags} compact />
        </div>
      </div>
      <div className="mt-6 flex">
        {card.internalLink ? (
          <Link
            href={card.internalLink}
            className={`inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-4 ${t.methodCta}`}
          >
            Explore Research OS
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <a
            href={NOTION_OS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore Environmental Systems Design OS in Notion"
            className={`inline-flex min-h-[44px] items-center justify-start gap-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-4 ${t.methodCta}`}
          >
            Explore Notion OS
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function ProfessionalPracticeCallout({ card }: { card: LinkedWorkCard }) {
  const Icon = card.icon;

  return (
    <article
      aria-labelledby="professional-practice-card-title"
      className="rounded-lg border border-neutral-300 bg-white px-6 py-7 text-gray-950 shadow-sm md:px-8 md:py-8"
    >
      <div>
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] text-neutral-600">{card.label}</p>
              <h2
                id="professional-practice-card-title"
                className="mt-1 text-2xl font-bold leading-tight text-neutral-950"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                {card.title}
              </h2>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">{card.description}</p>
          <div className="mt-5">
            <TagList tags={card.tags} linkTone="neutral" />
          </div>
        </div>

        <div className="mt-6 flex">
          <Link
            href={card.href}
            className="inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            <span className="min-w-0 whitespace-normal">{card.cta}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ExplorationCard({ card, tone }: { card: StaticWorkCard; tone: CardTone }) {
  const Icon = card.icon;
  const t = TONE[tone];

  return (
    <article className={`rounded-lg border border-dashed bg-white p-5 ${t.cardBorderDashed}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconContainer}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className={`font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.24em] ${t.label}`}>
              {card.label}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-gray-950">
              {card.title}
            </h3>
          </div>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
          {card.description}
        </p>

        <div className="mt-5">
          <TagList tags={card.tags} compact />
        </div>

        {card.href && (
          <div className="mt-4 pt-2">
            <a
              href={card.href}
              aria-label={`Explore ${card.title}`}
              className={`group -ml-3 inline-flex min-h-[44px] items-center justify-start gap-2 rounded-lg px-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-4 ${t.cta} ${t.ctaHoverBg}`}
            >
              <span>Explore Project</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function DesignWork() {
  return (
    <section id="work" className="homepage-section relative bg-white" aria-label="Work">
      <div className="homepage-container relative">
        <header className="homepage-copy-column relative">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-medium text-gray-600">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Work
            </span>
          </div>

          <h1
            id="work-title"
            className="hero-title font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left"
            style={{
              fontSize: 'clamp(2.125rem, 4.5vw, 3.75rem)',
              whiteSpace: 'normal',
              fontFamily: "'tiempos-headline-regular', serif",
              marginBottom: 'calc(1.32 * 1.5rem)',
            }}
          >
            <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">
              Designing confidence across products, services, and environments.
            </span>
          </h1>

          <p
            className="text-xl text-gray-700 leading-relaxed"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}
          >
            Selected work exploring how people navigate complexity across products, services, and environments.
          </p>
        </header>

        <div className="homepage-copy-column relative mt-12 md:mt-16" aria-labelledby="work-title">
          {/* Research — teal */}
          <section aria-labelledby="research-title">
            <SectionEyebrow id="research-title">Research</SectionEyebrow>
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {researchCards.map((card) => (
                <MethodCard key={card.title} card={card} tone="teal" />
              ))}
            </div>
          </section>

          {/* Frameworks — violet */}
          <section aria-labelledby="frameworks-title" className="mt-14 md:mt-20">
            <SectionEyebrow id="frameworks-title">Frameworks</SectionEyebrow>
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {frameworkCards.map((card) => (
                <SystemDesignCard key={card.title} card={card} tone="violet" />
              ))}
            </div>
          </section>

          {/* Concepts — amber */}
          <section aria-labelledby="concepts-title" className="mt-14 md:mt-20">
            <SectionEyebrow id="concepts-title">Concepts</SectionEyebrow>
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {conceptCards.map((card) => (
                <ExplorationCard key={card.title} card={card} tone="amber" />
              ))}
            </div>
          </section>

          {/* Builds & Implementation — blue */}
          <section aria-labelledby="builds-title" className="mt-14 md:mt-20">
            <SectionEyebrow id="builds-title">Builds & Implementation</SectionEyebrow>
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {buildsLinkedCards.map((card) => (
                <SystemDesignCard key={card.title} card={card} tone="blue" />
              ))}
            </div>
            <div className="mt-5">
              <ProfessionalPracticeCallout card={professionalPractice} />
            </div>
          </section>

          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center justify-center gap-3 border-t border-stone-200 pt-8 text-center md:mt-20">
            <Sparkles className="h-4 w-4 text-stone-400" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 text-balance">
              Research, frameworks, concepts, and professional practice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
