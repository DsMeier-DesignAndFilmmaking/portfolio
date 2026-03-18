'use client';

import { motion, Variants } from 'framer-motion'; // Added Variants import

// ─── Data ────────────────────────────────────────────────────────────────────

const constraints = [
  {
    icon: '⚡',
    constraint: 'Latency must feel instant (<200ms), but real-world data is delayed.',
    response: 'Pre-compute likely scenarios during idle states so the answer is ready before the question.',
    behavior: 'Recommendations feel immediate. Controlled data staleness is an explicit tradeoff, not an oversight.',
  },
  {
    icon: '🧠',
    constraint: 'Travelers distrust stale or generic recommendations.',
    response: 'Weight signals by recency and verified human presence — prioritize the recently-visited over the widely-shared.',
    behavior: 'System surfaces live, credible environments over popular ones. Trust is earned through specificity.',
  },
  {
    icon: '🎯',
    constraint: 'Too many choices reduce action. Decision paralysis is a system failure.',
    response: 'Dopamine Governor limits output to a single primary suggestion. Confidence replaces optionality.',
    behavior: 'User receives one move. Not the best guess — the right call, given what the system knows right now.',
  },
  {
    icon: '🔒',
    constraint: 'User data privacy limits persistent cross-session tracking.',
    response: 'Local-first processing with ephemeral session memory. The system learns fast and forgets cleanly.',
    behavior: 'Adapts in-session without long-term profiling. Privacy is a design constraint, not a disclaimer.',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
      delay: i * 0.1,
    },
  }),
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Column config ────────────────────────────────────────────────────────────

const columns = [
  {
    key: 'constraint' as const,
    label: 'Constraint',
    sublabel: 'Reality',
    textClass: 'text-slate-100',
    labelClass: 'text-slate-300',
    dotClass: 'bg-slate-300',
    sublabelClass: 'text-slate-500', // Muted Reality
  },
  {
    key: 'response' as const,
    label: 'Design Response',
    sublabel: 'Reasoning',
    textClass: 'text-slate-200',
    labelClass: 'text-white/100',
    dotClass: 'bg-white/80',
    sublabelClass: 'text-white/50', // Muted Reasoning
  },
  {
    key: 'behavior' as const,
    label: 'System Behavior',
    sublabel: 'User Impact',
    textClass: 'text-white',
    labelClass: 'text-[#FFFFFF]/70',
    dotClass: 'bg-[#FFDD00] shadow-[0_0_8px_rgba(255,221,0,0.6)]',
    sublabelClass: 'text-[#FFDD00]/50', // Muted User Impact (tinted)
  },
];

// ─── Sub-components (defined before ConstraintMap to avoid hoisting issues) ───

function ColumnHeader({ col }: { col: typeof columns[number] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-1.5 h-1.5 rounded-full ${col.dotClass}`} />
        <span
          className={`text-xs font-semibold tracking-[0.18em] uppercase ${col.labelClass}`}
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          {col.label}
        </span>
      </div>
      <span
        className={`text-[11px] tracking-widest uppercase ml-3.5 ${col.sublabelClass}`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {col.sublabel}
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ConstraintMap() {
  return (
    <section
      aria-label="System Constraints"
      style={{ backgroundColor: '#0a0a0b' }}
      className="relative w-full overflow-hidden"
    >
      {/* Subtle noise texture — matches SpontaneityHero */}
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
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-white/20" />
            <span
              className="text-xs tracking-[0.2em] uppercase text-slate-500 font-medium"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              System Constraints
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: "'tiempos-headline-regular', serif" }}
          >
            Design Decisions Forced by Reality
          </h2>

          {/* Subtext */}
          <p
            className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Every behavior in this system exists because a constraint made it
            necessary. The logic isn&apos;t designed from preference — it&apos;s derived
            from the conditions the system must operate inside.
          </p>
        </motion.div>

        {/* ── Column headers (desktop only) ── */}
        {/* Uses the same 5-col template as the rows; odd children = content, even = arrow spacers */}
        <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr_40px_1fr] gap-0 mb-8 px-1">
          {/* Col 1 header */}
          <ColumnHeader col={columns[0]} />
          {/* Arrow spacer */}
          <div />
          {/* Col 2 header */}
          <ColumnHeader col={columns[1]} />
          {/* Arrow spacer */}
          <div />
          {/* Col 3 header */}
          <ColumnHeader col={columns[2]} />
        </div>

        {/* ── Top rule ── */}
        <div className="w-full h-px bg-white/[0.06] mb-0" />

        {/* ── Constraint rows ── */}
        <div>
          {constraints.map((row, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Desktop: 3-col grid with arrow connectors */}
              <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr_40px_1fr] gap-0 py-8 border-b border-white/[0.06]">

                {/* Col 1 — Constraint */}
                <div className="pr-4">
                  <div className="flex items-start gap-3">
                    <span className="text-base mt-0.5 opacity-60 select-none">{row.icon}</span>
                    <p
                      className="text-slate-400 text-sm md:text-[0.9375rem] leading-relaxed"
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {row.constraint}
                    </p>
                  </div>
                </div>

                {/* Arrow 1 */}
                <div className="flex items-center justify-center">
                  <ArrowConnector />
                </div>

                {/* Col 2 — Design Response */}
                <div className="px-2">
                  <p
                    className="text-slate-200 text-sm md:text-[0.9375rem] leading-relaxed"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {row.response}
                  </p>
                </div>

                {/* Arrow 2 */}
                <div className="flex items-center justify-center">
                  <ArrowConnector bright />
                </div>

                {/* Col 3 — System Behavior */}
                <div className="pl-4">
                  <p
                    className="text-white text-sm md:text-[0.9375rem] leading-relaxed font-medium"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {row.behavior}
                  </p>
                </div>
              </div>

              {/* Mobile: stacked card */}
              <div className="md:hidden py-8 border-b border-white/[0.06] space-y-5">
                {/* Constraint */}
                <div>
                  <MobileColumnLabel label="Constraint" sublabel="Reality" dotClass="bg-slate-600" labelClass="text-slate-600" />
                  <div className="flex items-start gap-2.5 mt-2">
                    <span className="text-sm opacity-50 select-none mt-0.5">{row.icon}</span>
                    <p
                      className="text-slate-400 text-sm leading-relaxed"
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {row.constraint}
                    </p>
                  </div>
                </div>

                {/* Mobile arrow */}
                <MobileArrow />

                {/* Design Response */}
                <div>
                  <MobileColumnLabel label="Design Response" sublabel="Reasoning" dotClass="bg-white/40" labelClass="text-white/50" />
                  <p
                    className="text-slate-200 text-sm leading-relaxed mt-2"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {row.response}
                  </p>
                </div>

                {/* Mobile arrow */}
                <MobileArrow bright />

                {/* System Behavior */}
                <div>
                  <MobileColumnLabel label="System Behavior" sublabel="User Impact" dotClass="bg-[#FFDD00]" labelClass="text-[#FFDD00]/60" />
                  <p
                    className="text-white text-sm leading-relaxed font-medium mt-2"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {row.behavior}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Micro statement ── */}
        <motion.p
          className="mt-14 md:mt-16 text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl italic"
          style={{ fontFamily: "'Roboto', sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          System behavior is not designed in isolation — it emerges from constraints,
          tradeoffs, and real-world conditions.
        </motion.p>

      </div>
    </section>
  );
}

function ArrowConnector({ bright = false }: { bright?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-px h-3 ${bright ? 'bg-white/20' : 'bg-white/10'}`} />
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        className={bright ? 'opacity-40' : 'opacity-20'}
      >
        <path
          d="M1 4h11M9 1l3 3-3 3"
          stroke="white"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={`w-px h-3 ${bright ? 'bg-white/20' : 'bg-white/10'}`} />
    </div>
  );
}

function MobileArrow({ bright = false }: { bright?: boolean }) {
  return (
    <div className="flex items-center gap-1 pl-1">
      <div className={`h-px w-3 ${bright ? 'bg-white/20' : 'bg-white/10'}`} />
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        className={bright ? 'opacity-40' : 'opacity-20'}
      >
        <path
          d="M4 1v9M1 7l3 3 3-3"
          stroke="white"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function MobileColumnLabel({
  label,
  sublabel,
  dotClass,
  labelClass,
}: {
  label: string;
  sublabel: string;
  dotClass: string;
  labelClass: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span
        className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${labelClass}`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {label}
      </span>
      <span
        className="text-[10px] tracking-widest uppercase text-slate-800"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        · {sublabel}
      </span>
    </div>
  );
}
