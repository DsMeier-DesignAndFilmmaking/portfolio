"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Zap, ShieldCheck, Cpu, Users, RefreshCcw, ArrowDown, MapPin, Search, BrainCircuit, BookOpen, Lock, ExternalLink } from 'lucide-react';
import { HADE_DEMO_URL } from '@/app/projects/travel-and-ai/constants';

const preventWidow = (text: string) => {
  const words = text.trim().split(" ");
  if (words.length < 3) return text;
  return [...words.slice(0, -2), words.slice(-2).join("\u00A0")].join(" ");
};

export default function HADESystemDeepDive() {
  return (
    <section className="py-24 bg-white" aria-labelledby="system-design-title">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-12 md:mb-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5 text-black" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Layer 02 // Logic Handshake
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-snug" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
              Transforming Real-Time Signals Into Confident Moves
            </span>
            <span className="block mt-4 text-gray-700 text-lg md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance">
              From environmental telemetry to actionable insight, HADE enables travelers to act confidently in unplanned moments.
            </span>
          </h1>
        </header>

        {/* --- TWO-COLUMN SYSTEM GRID --- */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT: SYSTEM TRACE (INPUTS → LOGIC → OUTPUT) */}
          <div className="lg:col-span-7 space-y-12 relative">
            {/* Vertical Spine Line */}
            <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-neutral-200 hidden md:block" aria-hidden="true" />

            {/* 01 // INPUTS */}
            <div className="relative md:pl-16">
              <div className="absolute left-3.5 top-2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full hidden md:block" aria-hidden="true" />
              <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">01 // Inputs</span>
                    <h3 className="text-2xl font-bold text-neutral-900 italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Environmental & Traveler Signals
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full w-fit shadow-sm">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    <span className="text-[10px] font-bold uppercase text-neutral-600 tracking-tight">L1 Telemetry: Lisbon_Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: 'Location', val: 'Chiado, Lisbon' },
                    { label: 'Weather', val: 'Sudden Heavy Rain (85%)' },
                    { label: 'User State', val: 'Walking Exploration' },
                    { label: 'Energy', val: 'Moderate (3h Active)' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1" style={{ fontFamily: "'Roboto', sans-serif" }}>
                        {stat.label}
                      </p>
                      <p className="text-sm font-semibold text-neutral-800 tracking-tight" style={{ fontFamily: "'Roboto', sans-serif" }}>
                        {stat.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 02 // LOGIC / RETRIEVAL */}
            <div className="relative md:pl-16">
              <div className="absolute left-3.5 top-2 w-5 h-5 bg-white border-2 border-amber-500 rounded-full hidden md:block" aria-hidden="true" />
              <div className="bg-white rounded-3xl p-8 border-2 border-amber-100 shadow-xl shadow-amber-500/5">
                <div className="flex items-center gap-2 mb-6 text-amber-600">
                  <Search className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono">02 // Logic / Retrieval</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 italic">Activating the Field Note</h3>
                <p className="text-neutral-700 font-serif italic text-lg leading-relaxed">
                  “Chiado's hills become slick during rain. Local movement shifts to the covered gallery corridors.”
                </p>
              </div>
            </div>

            {/* 03 // SYNTHESIS / AGENTIC LOGIC */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
              className="relative md:pl-16"
            >
              <div className="absolute left-3.5 top-2 w-5 h-5 bg-white border-2 border-neutral-900 rounded-full hidden md:block" aria-hidden="true" />
              <div className="bg-neutral-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BrainCircuit className="w-48 h-48 text-white" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 text-[#FFDD00]">
                    <Cpu className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      03 // Synthesis Engine
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-8 italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    Agentic Logic
                  </h3>

                  <div className="grid gap-4">
                    {[
                      { 
                        title: "Predictive Validity", 
                        desc: "The engine confirms rain will persist for 60+ minutes, enabling the traveler to act confidently."
                      },
                      { 
                        title: "Trust Calibration", 
                        desc: "Fresh field notes from verified locals inform safe and spontaneous choices."
                      },
                      { 
                        title: "Heuristic Filter", 
                        desc: "Logic prioritizes movement opportunities over static returns, empowering unplanned exploration."
                      }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          <ShieldCheck className="w-4 h-4 text-[#FFDD00]" />
                          <p className="text-neutral-100 font-bold text-xs uppercase tracking-wide" style={{ fontFamily: "'Roboto', sans-serif" }}>
                            {item.title}
                          </p>
                        </div>
                        <p className="text-neutral-400 text-[11px] leading-relaxed max-w-xl text-balance" style={{ fontFamily: "'Roboto', sans-serif" }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 04 // LOGIC RECEIPT */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative md:pl-16"
            >
              <div className="absolute left-3.5 top-2 w-5 h-5 bg-[#FFDD00] rounded-full hidden md:block" aria-hidden="true" />
              <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono text-neutral-400" style={{ fontFamily: "'Roboto', sans-serif" }}>
                    04 // Logic Receipt
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-6 mt-3 italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  What Triggered This Suggestion
                </h3>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      label: "Signal",
                      value: "Chiado, Lisbon — Rain onset detected (85% confidence)",
                      bg: "bg-blue-50 border border-blue-100",
                      labelColor: "text-blue-600",
                      valueColor: "text-neutral-700",
                    },
                    {
                      label: "Field Note",
                      value: "Gallery corridors remain dry — locally verified, low crowd density",
                      bg: "bg-amber-50 border border-amber-100",
                      labelColor: "text-amber-600",
                      valueColor: "text-neutral-700",
                    },
                    {
                      label: "Synthesis",
                      value: "Bertrand Loop: 12 min walk, seating open, arrival confidence 95%+",
                      bg: "bg-neutral-900",
                      labelColor: "text-[#FFDD00]",
                      valueColor: "text-neutral-300",
                    },
                  ].map((signal, i) => (
                    <div key={i} className={`${signal.bg} rounded-2xl px-5 py-4 flex items-start gap-4`}>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap mt-0.5 ${signal.labelColor}`}
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                      >
                        {signal.label}
                      </span>
                      <span
                        className={`text-[11px] leading-relaxed ${signal.valueColor}`}
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                      >
                        {signal.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span
                    className="text-[10px] text-neutral-400 uppercase tracking-widest"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Confidence: 95% &nbsp;//&nbsp; Latency: 180ms
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: TRAVELER EXPERIENCE / DECISION UI */}
          <div className="lg:col-span-5 sticky top-32 pb-12 lg:pb-24">
            <div className="relative mx-auto w-full max-w-[320px] aspect-[9/19] bg-white rounded-[3rem] shadow-2xl border-[8px] border-neutral-900 overflow-hidden">
              {/* Status Bar */}
              <div className="h-6 w-full flex justify-between px-8 pt-4 items-center">
                <span className="text-[10px] font-bold">3:15</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-black rounded-full opacity-20" />
                  <div className="w-2 h-2 bg-black rounded-full opacity-20" />
                </div>
              </div>

              <div className="p-6 pt-12">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 font-sans">Synthesizing Field Notes</span>
                </div>

                {/* HADE ACTION CARD */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-[#F9F7F2] rounded-[2rem] p-6 shadow-xl border border-black/5"
                >
                  <p className="font-[Georgia,serif] italic text-2xl mb-4 text-neutral-900">
                    It&apos;s pouring.
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-8">
                    Take the <span className="text-black font-bold">Bertrand Loop </span> to stay in motion. It&apos;s dry, seating verified open — seize the spontaneous moment.
                  </p>

                  <button className="w-full py-4 bg-[#FFDD00] rounded-full text-xs font-black uppercase tracking-widest text-black shadow-lg active:scale-95 transition-transform mb-4">
                    Let&apos;s Go
                  </button>
                  
                  <button className="w-full text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-neutral-900 transition-colors">
                    Not the move?
                  </button>
                </motion.div>
                
                <p className="mt-8 text-center text-[10px] text-neutral-300 uppercase tracking-[0.3em]">
                  Agentic Logic V1.0
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* --- FOOTER: ITERATION EVIDENCE --- */}
<footer className="mt-12 md:mt-24 border-t border-neutral-100">
  <div className="container mx-auto px-6 pt-12 md:pt-24">

    {/* ── Header ── */}
    <div className="mb-12 max-w-xl">
      <span
        className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {preventWidow("Iteration Evidence")}
      </span>

      <h3
        className="text-2xl md:text-3xl font-bold mt-3 text-neutral-900 italic"
        style={{ fontFamily: "'tiempos-headline-regular', serif" }}
      >
        {preventWidow("What Broke, and What Changed")}
      </h3>

      <p
        className="text-sm text-neutral-500 mt-3 leading-relaxed"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {preventWidow(
          "Early iterations showed that reducing friction and increasing clarity mattered more than increasing system intelligence."
        )}
      </p>
    </div>

    {/* ── Grid ── */}
    <div className="grid md:grid-cols-3 gap-6 items-stretch">

      {/* ── Card 01 ── */}
      <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 flex flex-col gap-4 h-full">
        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">01</span>

        <h4 className="text-base font-bold text-neutral-900">
          {preventWidow("Suggestion Delivery")}
        </h4>

        {/* Diagram */}
        <div className="rounded-2xl bg-neutral-100 border border-neutral-200 p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 w-10 shrink-0">
              Before
            </span>
            <div className="flex items-center gap-1.5">
              <div className="px-2.5 py-1 bg-red-100 border border-red-200 rounded text-[10px] text-red-600 font-semibold">
                Modal
              </div>
              <span className="text-neutral-400 text-[11px]">→</span>
              <div className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-[10px] text-neutral-500 font-semibold">
                Decide ✕
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-neutral-200" />

          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 w-10 shrink-0">
              After
            </span>
            <div className="flex items-center gap-1">
              <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded text-[10px] text-emerald-700 font-semibold">
                Ambient
              </div>
              <span className="text-emerald-400 text-[11px]">→ → →</span>
              <span className="text-[10px] text-neutral-400 italic">
                {preventWidow("no pause")}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex-1">
            <p className="text-[11px] font-black text-red-400 uppercase tracking-widest mb-1.5">
              Before
            </p>
            <p className="text-[12px] text-neutral-700 leading-relaxed">
              {preventWidow(
                "Suggestions were introduced through explicit prompts that required an active decision."
              )}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex-1">
            <p className="text-[11px] font-black text-amber-500 uppercase tracking-widest mb-1.5">
              Why It Failed
            </p>
            <p className="text-[12px] text-neutral-700 leading-relaxed">
              {preventWidow(
                "This created friction during movement, forcing users to stop and evaluate instead of continuing naturally."
              )}
            </p>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-4 flex-1">
            <p className="text-[11px] font-black text-[#FFDD00] uppercase tracking-widest mb-1.5">
              What Changed
            </p>
            <p className="text-[12px] text-neutral-300 leading-relaxed">
              {preventWidow(
                "Shifted to a passive delivery model where suggestions appear as ambient guidance, allowing users to follow or ignore without interruption."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Card 02 ── */}
      <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 flex flex-col gap-4 h-full">
        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">02</span>

        <h4 className="text-base font-bold text-neutral-900">
          {preventWidow("Context Awareness")}
        </h4>

        <div className="space-y-2 flex-1 flex flex-col">
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex-1">
            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1.5">
              Before
            </p>
            <p className="text-[12px] text-neutral-700 leading-relaxed">
              {preventWidow(
                "System triggered suggestions based on single signals without broader contextual awareness."
              )}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex-1">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1.5">
              Why It Failed
            </p>
            <p className="text-[12px] text-neutral-700 leading-relaxed">
              {preventWidow(
                "Recommendations felt mistimed or irrelevant when user energy or intent did not align with the suggestion."
              )}
            </p>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-4 flex-1">
            <p className="text-[10px] font-black text-[#FFDD00] uppercase tracking-widest mb-1.5">
              What Changed
            </p>
            <p className="text-[12px] text-neutral-300 leading-relaxed">
              {preventWidow(
                "Introduced contextual filters that evaluate user state, effort, and situational relevance before triggering suggestions."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Card 03 ── */}
      <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 flex flex-col gap-4 h-full">
        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">03</span>

        <h4 className="text-base font-bold text-neutral-900">
          {preventWidow("Explainability")}
        </h4>

        <div className="space-y-2 flex-1 flex flex-col">
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100 flex-1">
            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1.5">
              Before
            </p>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              {preventWidow(
                "Recommendations were presented without visible reasoning or supporting context."
              )}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex-1">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1.5">
              Why It Failed
            </p>
            <p className="text-[12px] text-neutral-700 leading-relaxed">
              {preventWidow(
                "Users lacked confidence when they could not understand what influenced the suggestion."
              )}
            </p>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-4 flex-1">
            <p className="text-[10px] font-black text-[#FFDD00] uppercase tracking-widest mb-1.5">
              What Changed
            </p>
            <p className="text-[12px] text-neutral-300 leading-relaxed">
              {preventWidow(
                "Added a lightweight explanation layer that surfaces key signals, reinforcing trust without overwhelming the interface."
              )}
            </p>
          </div>
        </div>
      </div>

    </div>

    <div className="mt-12 flex flex-col items-start gap-5 border-t border-neutral-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p
        className="max-w-lg text-sm leading-relaxed text-neutral-500"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        See the active build after reviewing how the signal logic, confidence receipt,
        and delivery model come together.
      </p>
      <a
        href={HADE_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View HADE demo in a new tab"
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white transition hover:border-[#FFDD00] hover:bg-[#FFDD00] hover:text-black active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:w-auto"
      >
        [ View Demo ]
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  </div>
</footer>
      </div>
    </section>
  );
}
