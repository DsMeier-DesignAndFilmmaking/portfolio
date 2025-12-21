"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

/* ---------------- Media Query Hook (Inline) ---------------- */
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

/* ========================================================= */

export default function TravelAISystemsDiagram() {
  const isMobile = useMediaQuery("(max-width: 1023px)");

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
    <div className="flex justify-center lg:justify-end w-full">
      <div className="relative w-full max-w-[600px] aspect-[4/5]">
        <svg
          viewBox="0 0 520 650" /* Increased height to stop overlapping */
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* === CONNECTIONS === */}
          
          {/* Trust → Core */}
          <line x1="110" y1="320" x2="200" y2="320" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Social → Core */}
          <line x1="410" y1="320" x2="320" y2="320" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Business → Core */}
          <line x1="260" y1="500" x2="260" y2="370" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Animated Planning → Core */}
          <motion.line
            x1="260"
            y1="160"
            x2="260"
            y2="280"
            stroke="#0F766E"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />

          {/* === MICRO LABELS === */}
          <text x="270" y="220" fontSize="10" fill="#64748B" fontWeight="500">
            Shared signals
          </text>

          {/* === NODES === */}

          {/* Top Node: Planning Assistant */}
          <NodeRect
            x={260}
            y={110}
            w={200}
            h={60}
            label="Travel Planning Assistant"
            color="#059669"
          />

          {/* Center Node: Core Engine */}
          <NodeRect
            x={260}
            y={325}
            w={220}
            h={75}
            label="Spontaneity Core Engine"
            color="#0F766E"
          />

          {/* Left: Trust Layer */}
          <NodeCircle
            x={90}
            y={325}
            r={50}
            label="Trust & Authenticity"
            color="#2563EB"
          />

          {/* Right: Social Network */}
          <NodeCircle
            x={430}
            y={325}
            r={50}
            label="Social Travel Network"
            color="#7C3AED"
          />

          {/* Bottom: Business Tools */}
          <NodeCircle
            x={260}
            y={520}
            r={50}
            label="Partner Tools"
            color="#EA580C"
          />
        </svg>
      </div>
    </div>
  );
}

/* ---------------- NODE COMPONENTS ------------------------ */

function NodeRect({ x, y, w, h, label, color }: any) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="14" fill={color} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12" fontWeight="600">
        {label}
      </text>
    </motion.g>
  );
}

function NodeCircle({ x, y, r, label, color }: any) {
  const words = label.split(" ");
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <circle cx={x} cy={y} r={r} fill={color} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="600">
        {words.map((word: string, i: number) => (
          <tspan key={i} x={x} dy={i === 0 ? `-${(words.length - 1) * 0.6}em` : "1.2em"}>
            {word}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}