"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

/* --- SPONTANEITY HERO --- */
export const SpontaneityHero = () => {
  return (
    <section className="relative w-full bg-[#0a0a0b] text-white overflow-hidden">
      <div className="container mx-auto px-6 py-32">

        {/* HEADER */}
        <div className="max-w-2xl mb-24">
        <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">
          System Overview
        </p>

        <h2
          className="mt-4 text-4xl md:text-5xl leading-[1.1] text-white"
          style={{ fontFamily: "'tiempos-headline-regular', serif" }}
        >
          Enabling Spontaneous Decisions Through Real-Time&nbsp;Systems
        </h2>

        <p className="mt-6 text-slate-400 text-lg leading-relaxed">
          HADE interprets live environmental signals, applies layered reasoning,
          and produces context-aware recommendations that evolve as conditions change —
          empowering travelers to act confidently and spontaneously in the&nbsp;moment.
        </p>
      </div>

        {/* SYSTEM CORE */}
        <div className="relative flex flex-col items-center">

          {/* L1 INPUTS */}
          <SystemNode
            label="L1 • Inputs"
            title="Live Signals from the Environment"
            subtitle="Location, weather, time, and activity telemetry"
            align="top"
          />

          <FlowLine />

          {/* L2 HADE ENGINE */}
          <SystemNode
            label="L2 • HADE Engine"
            title="Holistic Adaptive Decision Logic"
            subtitle="CATDS, Dopamine Governor, Trust Calibration, Heuristic Filter"
            highlight
            highlightColor="yellow"
          />

          {/* UGC LAYER */}
          <UserSignalBubble text="John Signaled a Local Volleyball Game" x="10%" y="15%" />
          <UserSignalBubble text="Jazz show just started" x="70%" y="25%" />
          <UserSignalBubble text="Hidden Rooftop Cafe" x="52%" y="48%" />

          <FlowLine active />

          {/* L3 OUTPUT */}
          <SystemNode
            label="L3 • Output"
            title="A Confident Next Move"
            subtitle="Enabling real-time decisions that lead to spontaneous action"
          />

          {/* L4 FEEDBACK */}
          <FeedbackLoop
            from="L3 • Output"
            to="L2 • HADE Engine"
            description="Live feedback adapts reasoning over time"
          />

          {/* LEFT CONTEXT */}
          <SideAnnotation
            side="left"
            title="Signals"
            items={[
              "Location, weather, time",
              "Movement + energy levels",
              "Live environmental activity",
              "Field Notes knowledge layer"
            ]}
          />

          {/* RIGHT CONTEXT */}
          <SideAnnotation
            side="right"
            title="Reasoning Components"
            items={[
              "CATDS: pattern recognition",
              "Dopamine Governor: suggestion pacing",
              "Trust Calibration: expert weighting",
              "Heuristic Filter: environmental alignment"
            ]}
          />

          {/* MICRO STATEMENT */}
          <p className="text-sm md:text-base lg:text-base text-slate-500 text-center mt-10 max-w-xs leading-relaxed">
            Designed to reduce hesitation and enable confident spontaneity as conditions&nbsp;evolve.
          </p>
        </div>
      </div>
    </section>
  );
};

const preventWidow = (text: string) => {
  const words = text.trim().split(" ");
  if (words.length < 2) return text;
  return [...words.slice(0, -2), words.slice(-2).join("\u00A0")].join(" ");
};

/* --- SYSTEM NODE --- */
const SystemNode = ({
  label,
  title,
  subtitle,
  highlight = false,
  highlightColor = "indigo",
  align = "center"
}: {
  label: string;
  title: string;
  subtitle?: string;
  highlight?: boolean;
  highlightColor?: "indigo" | "yellow";
  align?: "top" | "center";
}) => (
  <div className={`relative z-10 ${align === "top" ? "mb-6" : "my-6"}`}>
    <div
      className={`px-8 py-6 rounded-2xl border backdrop-blur-sm ${
        highlight
          ? `border-${highlightColor}-500/60 bg-${highlightColor}-500/10`
          : "border-slate-800 bg-[#0d0d0e]"
      }`}
    >
      <p className="text-[10px] tracking-widest uppercase text-slate-500 mb-2">
        {preventWidow(label)}
      </p>

      <p className="text-lg font-semibold text-white">
        {preventWidow(title)}
      </p>

      {subtitle && (
        <p className="text-sm text-slate-400 mt-1">
          {preventWidow(subtitle)}
        </p>
      )}
    </div>
  </div>
);

/* --- FLOW LINE --- */
const FlowLine = ({ active = false }: { active?: boolean }) => (
  <div className="relative h-16 flex items-center justify-center">
    <div className="w-px h-full bg-slate-800" />

    {active && (
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-indigo-400"
        animate={{ y: [0, 24, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    )}
  </div>
);

/* --- FEEDBACK LOOP --- */
const FeedbackLoop = ({
  from,
  to,
  description
}: {
  from: string;
  to: string;
  description: string;
}) => (
  <div className="relative w-full flex justify-center my-6">
    <motion.div
      className="absolute w-16 h-16 border-2 border-yellow-400 rounded-full flex items-center justify-center"
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
    >
      <RefreshCcw className="w-6 h-6 text-yellow-400" />
    </motion.div>
    <p className="text-[10px] text-slate-400 mt-20 text-center max-w-xs">{description}</p>
  </div>
);

/* --- SIDE ANNOTATION --- */
const SideAnnotation = ({
  side,
  title,
  items
}: {
  side: "left" | "right";
  title: string;
  items: string[];
}) => (
  <div
    className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${
      side === "left" ? "left-0 text-right pr-12" : "right-0 pl-12"
    } max-w-[260px]`}
  >
    <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
      {title}
    </p>

    <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

/* --- USER SIGNAL BUBBLES (UGC) --- */
const UserSignalBubble = ({
  text,
  x,
  y
}: {
  text: string;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute bg-yellow-500/20 text-white px-3 py-1 rounded-full text-[10px] font-mono shadow-sm"
    style={{ top: y, left: x }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 0.8, scale: 1 }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "mirror", delay: Math.random() }}
  >
    {text}
  </motion.div>
);