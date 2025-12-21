"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

/* ---------------- Media Query Hook ---------------- */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

export default function TravelAISystemsDiagram() {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  /* Updated Neutral Palette for Borders */
  const colors = {
    planning: "#64748b", // Slate
    core: "#475569",     // Deep Slate
    trust: "#94a3b8",    // Light Slate
    social: "#71717a",   // Zinc
    partner: "#a1a1aa",  // Silver
    line: "#e2e8f0",     // Very light grey for background lines
    activeLine: "#94a3b8" 
  };

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-6 text-sm text-gray-700 p-4">
        {[
          "Spontaneous Signals",
          "Planning Assistant",
          "Spontaneity Core",
          "Social Travel Network",
          "Partner & Business Tools",
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="px-5 py-3 rounded-xl bg-white shadow-sm border text-center font-medium">
              {item}
            </div>
            {i < 4 && <span className="text-gray-400 mt-2">↓</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center lg:justify-end w-full h-full min-h-[500px]">
      <div className="relative w-full max-w-[550px]">
        <svg
          viewBox="0 0 520 520" 
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* === CONNECTIONS === */}
          <line x1="110" y1="260" x2="190" y2="260" stroke={colors.line} strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="410" y1="260" x2="330" y2="260" stroke={colors.line} strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="260" y1="380" x2="260" y2="300" stroke={colors.line} strokeWidth="1.5" strokeDasharray="4 4" />

          <motion.line
            x1="260"
            y1="150"
            x2="260"
            y2="220"
            stroke={colors.activeLine}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />

          {/* === NODES === */}
          <NodeRect
            x={260}
            y={120}
            w={200}
            h={60}
            label="Travel Planning Assistant"
            borderColor={colors.planning}
          />

          <NodeRect
            x={260}
            y={260}
            w={220}
            h={75}
            label="Spontaneity Core Engine"
            borderColor={colors.core}
          />

          <NodeCircle
            x={80}
            y={260}
            r={50}
            label="Trust & Authenticity"
            borderColor={colors.trust}
          />

          <NodeCircle
            x={440}
            y={260}
            r={50}
            label="Social Travel Network"
            borderColor={colors.social}
          />

          <NodeCircle
            x={260}
            y={410}
            r={50}
            label="Partner Tools"
            borderColor={colors.partner}
          />
        </svg>
      </div>
    </div>
  );
}

/* ---------------- NODE COMPONENTS ------------------------ */

function NodeRect({ x, y, w, h, label, borderColor }: any) {
  return (
    <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <rect 
        x={x - w / 2} 
        y={y - h / 2} 
        width={w} 
        height={h} 
        rx="12" 
        fill="white" 
        stroke={borderColor} 
        strokeWidth="2" 
      />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#334155" fontSize="12" fontWeight="600">
        {label}
      </text>
    </motion.g>
  );
}

function NodeCircle({ x, y, r, label, borderColor }: any) {
  const words = label.split(" ");
  return (
    <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <circle cx={x} cy={y} r={r} fill="white" stroke={borderColor} strokeWidth="2" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#334155" fontSize="10" fontWeight="600">
        {words.map((word: string, i: number) => (
          <tspan key={i} x={x} dy={i === 0 ? `-${(words.length - 1) * 0.5}em` : "1.1em"}>
            {word}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}