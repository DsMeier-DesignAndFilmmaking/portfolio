'use client';

import { motion, Variants } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────

const phases = [
  {
    number: '01',
    label: 'Phase 1',
    title: 'Assisted Intelligence',
    description: 'Initial system driven by environmental signals and structured knowledge.',
    details: [
      'Uses location, weather, and Field Notes data',
      'Generates a single, confident recommendation',
      'Reactive — responds to context, does not yet adapt',
    ],
    outcome: 'Reduces decision fatigue and introduces confident spontaneity.',
    brightness: {
      card: 'border-white/[0.08] bg-white/[0.02]',
      label: 'text-slate-400', // Minimum accessible slate for dark BG
      title: 'text-slate-200',
      body: 'text-slate-300',
      detail: 'text-slate-400',
      outcome: 'text-slate-200',
      connector: 'bg-white/20',
      dot: 'bg-slate-500 border-slate-400',
      phase: 'text-slate-400',
    },
  },
  {
    number: '02',
    label: 'Phase 2',
    title: 'Adaptive Sessions',
    description: 'System begins learning within a live session.',
    details: [
      'Tracks movement, energy, and interaction patterns',
      'Adjusts recommendations in real time',
      'Session-based adaptation — no long-term memory',
    ],
    outcome: 'Feels responsive and aligned with traveler behavior.',
    brightness: {
      card: 'border-white/[0.12] bg-white/[0.03]',
      label: 'text-slate-300',
      title: 'text-white',
      body: 'text-slate-200',
      detail: 'text-slate-300',
      outcome: 'text-slate-100',
      connector: 'bg-white/30',
      dot: 'bg-slate-300 border-slate-200',
      phase: 'text-slate-300',
    },
  },
  {
    number: '03',
    label: 'Phase 3',
    title: 'Networked Intelligence',
    description: 'Human presence becomes part of the signal.',
    details: [
      'Integrates verified traveler and local activity data',
      'Real-time social and environmental awareness',
      'UGC layer introduces live trust signals',
    ],
    outcome: 'System feels alive, trustworthy, and socially aware.',
    brightness: {
      card: 'border-white/[0.18] bg-white/[0.04]',
      label: 'text-slate-200',
      title: 'text-white',
      body: 'text-white/90',
      detail: 'text-slate-200',
      outcome: 'text-slate-100',
      connector: 'bg-white/40',
      dot: 'bg-white border-white/60',
      phase: 'text-slate-200',
    },
  },
  {
    number: '04',
    label: 'Phase 4',
    title: 'Predictive Orchestration',
    description: 'System anticipates and guides ahead of the moment.',
    details: [
      'Predicts environmental shifts and opportunity windows',
      'Suggests actions before friction occurs',
      'Moves from reactive → proactive intelligence',
    ],
    outcome: 'Feels one step ahead of reality.',
    brightness: {
      card: 'border-[#FFDD00]/40 bg-[#FFDD00]/[0.05]', // Increased border opacity
      label: 'text-[#FFE64D]', // Lightened Amber for contrast
      title: 'text-white',
      body: 'text-slate-100',
      detail: 'text-slate-200',
      outcome: 'text-[#FFDD00]', 
      connector: 'bg-[#FFDD00]/40',
      dot: 'bg-[#FFDD00] border-white/50 shadow-[0_0_15px_rgba(255,221,0,0.6)]',
      phase: 'text-[#FFE64D]',
    },
  },
] as const;

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function HADERoadmap() {
  return (
    <section
      aria-label="System Evolution Roadmap"
      style={{ backgroundColor: '#0a0a0b' }}
      className="relative w-full overflow-hidden"
    >
      {/* Noise texture — matches ConstraintMap / SpontaneityHero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">

        {/* ── Section header ── */}
        <motion.div
          className="mb-16 md:mb-20"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-white/20" />
            <span
              className="text-xs tracking-[0.2em] uppercase text-slate-500 font-medium"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              System Evolution
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: "'tiempos-headline-regular', serif" }}
          >
            From Reactive Tool to Predictive Intelligence
          </h2>

          <p
            className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            HADE is designed to scale through four distinct levels of adaptation —
            each phase increasing the system&apos;s awareness, responsiveness, and
            ability to act ahead of the traveler&apos;s need.
          </p>
        </motion.div>

        {/* ── Connector line (desktop) ── */}
        <div className="hidden 2xl:block relative mb-0">
          <ConnectorTrack />
        </div>

 {/* ── Phase cards ── */}
<motion.div
  className={`
    grid grid-cols-1 
    /* Force 2x2 on Mobile-Large, Tablets, and MacBooks */
    md:grid-cols-2 
    /* Only go to 4-wide on massive desktop monitors */
    2xl:grid-cols-4 
    gap-8 lg:gap-10
  `}
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
>
  {phases.map((phase, i) => (
    <motion.div
      key={phase.number}
      variants={cardVariants}
      className="flex h-full"
    >
      {/* Card - Removed all 'md:border-t' references to fix the line issue */}
      <div
        className={`
          relative w-full rounded-2xl border p-8
          flex flex-col transition-all duration-500
          hover:bg-white/[0.04] hover:border-white/20
          ${phase.brightness.card}
          /* Standardizing border for clean 2x2 look */
          border-white/[0.08]
        `}
      >
        {/* Phase Label & Pulse */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-2 h-2 rounded-full ${phase.brightness.dot} shadow-[0_0_8px_currentColor]`} />
          <span
            className={`text-[10px] font-bold tracking-[0.2em] uppercase ${phase.brightness.phase}`}
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {phase.label}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-xl md:text-2xl font-bold leading-tight mb-4 ${phase.brightness.title}`}
          style={{ fontFamily: "'tiempos-headline-regular', serif" }}
        >
          {phase.title}
        </h3>

        {/* Description */}
        <p
          className={`text-[15px] leading-relaxed mb-6 opacity-80 ${phase.brightness.body}`}
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          {phase.description}
        </p>

        {/* Detail bullets - Flex-grow pushes the outcome to the bottom */}
        <ul className="space-y-3 mb-8 flex-grow">
          {phase.details.map((d, di) => (
            <li key={di} className="flex items-start gap-3">
              <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${phase.brightness.dot}`} />
              <span
                className={`text-[13px] leading-relaxed ${phase.brightness.detail}`}
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                {d}
              </span>
            </li>
          ))}
        </ul>

        {/* Outcome Box */}
        <div className={`
          mt-auto p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]
          text-[13px] leading-relaxed italic ${phase.brightness.outcome}
        `}>
          {phase.outcome}
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

        {/* ── Footer statement ── */}
        <motion.p
          className="mt-16 md:mt-20 text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl italic border-l border-white/[0.08] pl-5"
          style={{ fontFamily: "'Roboto', sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          HADE is not a static product — it is a system designed to evolve into a
          real-time intelligence layer for how people move through the world.
        </motion.p>

      </div>
    </section>
  );
}

// ─── Connector track (desktop) ────────────────────────────────────────────────

function ConnectorTrack() {
  return (
    <div className="relative h-px w-full mb-0" style={{ marginBottom: '-1px' }}>
      {/* Base line */}
      <div className="absolute inset-0 bg-white/[0.06]" />
      {/* Gradient overlay: left (muted) → right (bright/yellow) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.12) 60%, rgba(255,221,0,0.25) 100%)',
        }}
      />
    </div>
  );
}
