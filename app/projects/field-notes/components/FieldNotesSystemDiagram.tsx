'use client';

import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fieldNotesLayers = [
  {
    dot: 'bg-neutral-400',
    label: 'Structured Content',
    tags: ['Arrival', 'Transit', 'Culture'],
  },
  {
    dot: 'bg-slate-400',
    label: 'Cached API Data',
    tags: ['Currency', 'Climate'],
  },
  {
    dot: 'bg-neutral-300',
    label: 'Offline Access',
    tags: ['No connection required'],
  },
];

const hadeOutputs = [
  'Spontaneous Moves',
  'Decision Playbooks',
  'Real-time Suggestions',
];

// Desktop bidirectional connector
function BiConnector() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center gap-2.5 w-20 shrink-0">
      {/* → right arrow (Field Notes → HADE: context flows right) */}
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-neutral-200" />
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="shrink-0">
          <path d="M0 0L6 4L0 8V0Z" fill="#d4d4d4" />
        </svg>
      </div>

      {/* Labels */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[8px] uppercase tracking-widest text-neutral-300 leading-none">context</span>
        <span className="text-[8px] uppercase tracking-widest text-neutral-300 leading-none">moves</span>
      </div>

      {/* ← left arrow (HADE → Field Notes: moves flow back) */}
      <div className="flex items-center w-full flex-row-reverse">
        <div className="flex-1 h-px bg-neutral-200" />
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="shrink-0">
          <path d="M6 0L0 4L6 8V0Z" fill="#d4d4d4" />
        </svg>
      </div>
    </div>
  );
}

function MobileConnector() {
  return (
    <div className="flex md:hidden flex-col items-center py-2">
      {/* Down: context */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] uppercase tracking-widest text-neutral-300">
          context
        </span>
        <div className="flex flex-col items-center">
          <div className="w-px h-4 bg-neutral-200" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 4L5 7L8 4"
              stroke="#d4d4d4"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Up: moves */}
      <div className="flex items-center gap-2 flex-row-reverse mt-2">
        <span className="text-[9px] uppercase tracking-widest text-neutral-300">
          moves
        </span>
        <div className="flex flex-col items-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 6L5 3L8 6"
              stroke="#d4d4d4"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="w-px h-4 bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}

// Simple downward arrow for mobile (Outputs section)
function MobileDownArrow() {
  return (
    <div className="flex md:hidden flex-col items-center py-2">
      <div className="w-px h-5 bg-neutral-200" />
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M0 0H8L4 5H0Z" fill="#d4d4d4" />
      </svg>
    </div>
  );
}

export function FieldNotesSystemDiagram() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-8">

        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-12 md:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-[#FFDD00]" />
            <span className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400">
              System Architecture
            </span>
          </div>
          <h2 className="font-tiempos text-2xl md:text-[2rem] font-bold text-neutral-900 leading-snug mb-3">
             An Adaptive System, Enhanced in Real Time
          </h2>
          <p className="text-base text-neutral-500 leading-relaxed">
            Field Notes combines structured guidance, live data, and adaptive intelligence to support decisions on the ground.
          </p>
        </motion.div>

        {/* Main diagram row */}
        <motion.div
          className="flex flex-col md:flex-row md:items-stretch"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >

          {/* ── LEFT: Field Notes Card ── */}
          <motion.div variants={fadeUp} className="flex-1 min-w-0">
            <div className="h-full bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 flex flex-col gap-5">

              {/* Card header */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                    <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="#525252" strokeWidth="1.25" />
                    <line x1="5" y1="5" x2="11" y2="5" stroke="#525252" strokeWidth="1.25" strokeLinecap="round" />
                    <line x1="5" y1="8" x2="11" y2="8" stroke="#525252" strokeWidth="1.25" strokeLinecap="round" />
                    <line x1="5" y1="11" x2="9" y2="11" stroke="#525252" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-black text-neutral-400 mb-0.5">Context Layer</p>
                  <h3 className="font-tiempos text-xl font-bold text-neutral-900">Field Notes</h3>
                </div>
              </div>

              <p className="text-sm text-neutral-500 leading-relaxed">
                An offline-first city intelligence layer — structured knowledge, cached live data, and local expertise always available on the ground.
              </p>

              {/* Internal layers — subtle breakdown */}
              <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-neutral-300 mb-0.5">Composed of</p>
                {fieldNotesLayers.map(({ dot, label, tags }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${dot}`} />
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                      <span className="text-[11px] font-black text-neutral-600 uppercase tracking-wide shrink-0">{label}</span>
                      {tags.map(tag => (
                        <span key={tag} className="text-[9px] text-neutral-400 bg-neutral-50 border border-neutral-100 rounded-full px-2 py-0.5 whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Connectors */}
          <BiConnector />
          <MobileConnector />

          {/* ── RIGHT: HADE Card ── */}
          <motion.div variants={fadeUp} className="flex-1 min-w-0">
            <div className="h-full bg-neutral-950 rounded-2xl p-6 md:p-8 flex flex-col gap-5">

              {/* Card header */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-[#FFDD00]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-black text-white/40 mb-0.5">Intelligence Layer</p>
                  <h3 className="font-tiempos text-xl font-bold text-white">HADE</h3>
                  <p className="text-[10px] text-white/30 mt-0.5">Spontaneity Engine</p>
                </div>
              </div>

              <p className="text-sm text-white/55 leading-relaxed">
                A real-time adaptive engine that ingests Field Notes context, interprets current conditions, and returns spontaneous, confidence-calibrated moves.
              </p>

              {/* Outputs */}
              <div className="border-t border-white/[0.08] pt-4 flex flex-col gap-2.5 mt-auto">
                <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/25 mb-0.5">Returns</p>
                {hadeOutputs.map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full bg-[#FFDD00]/60 shrink-0" />
                    <span className="text-[11px] font-black text-white/60 uppercase tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Mobile outputs label */}
        <div className="md:hidden">
          <MobileDownArrow />
        </div>

        {/* Feedback loop callout — full width below both cards */}
        <motion.div
          className="mt-5 md:mt-6 p-5 md:p-6 rounded-2xl border border-neutral-100 bg-neutral-50 flex items-start gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="w-1 self-stretch rounded-full bg-[#FFDD00] shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] font-black text-neutral-400 mb-1.5">The Feedback Loop</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              HADE outputs are injected back into Field Notes — or surface directly in the interface — creating a continuous{' '}
              <span className="text-neutral-700 font-medium">context → intelligence → suggestion</span>{' '}
              cycle that improves with every trip.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
