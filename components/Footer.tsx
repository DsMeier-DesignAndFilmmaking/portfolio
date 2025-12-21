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

  const colors = {
    planning: "#64748b",
    core: "#475569",
    trust: "#94a3b8",
    social: "#71717a",
    partner: "#a1a1aa",
    line: "#cbd5e1",
    activeLine: "#94a3b8" 
  };

  const lineTransition = { duration: 1, ease: "easeOut" };

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-6 text-sm text-gray-700 p-4">
        {["Spontaneous Signals", "Planning Assistant", "Spontaneity Core", "Social Travel Network", "Partner & Business Tools"].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="px-5 py-3 rounded-xl bg-white shadow-sm border text-center font-medium">{item}</div>
            {i < 4 && <span className="text-gray-400 mt-2">↓</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center lg:justify-end w-full h-full min-h-[500px] [perspective:1000px]">
      <motion.div 
        initial={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
        className="relative w-full max-w-[550px] transition-transform duration-700"
      >
        <svg viewBox="0 0 520 520" className="w-full h-auto block overflow-visible" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="4" dy="8" result="offsetblur" />
              <feComponentTransfer><feFuncA type="linear" slope="0.2" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* === OUTWARD FLOW CONNECTIONS === */}
          
          {/* Core (260,260) -> Top (Planning) */}
          <motion.line
            x1="260" y1="220" x2="260" y2="150"
            stroke={colors.activeLine} strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ ...lineTransition, delay: 0.6 }}
          />

          {/* Core (260,260) -> Left (Trust) */}
          <motion.line
            x1="190" y1="260" x2="110" y2="260"
            stroke={colors.line} strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ ...lineTransition, delay: 0.8 }}
          />

          {/* Core (260,260) -> Right (Social) */}
          <motion.line
            x1="330" y1="260" x2="410" y2="260"
            stroke={colors.line} strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ ...lineTransition, delay: 0.8 }}
          />

          {/* Core (260,260) -> Bottom (Partner) */}
          <motion.line
            x1="260" y1="300" x2="260" y2="380"
            stroke={colors.line} strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ ...lineTransition, delay: 1.0 }}
          />

          {/* === 3D NODES === */}
          <NodeRect x={260} y={120} w={200} h={60} label="Travel Planning Assistant" borderColor={colors.planning} delay={0.8} />
          <NodeRect x={260} y={260} w={220} h={75} label="Spontaneity Core Engine" borderColor={colors.core} delay={0.2} />
          <NodeCircle x={80} y={260} r={50} label="Trust & Authenticity" borderColor={colors.trust} delay={1.2} />
          <NodeCircle x={440} y={260} r={50} label="Social Travel Network" borderColor={colors.social} delay={1.2} />
          <NodeCircle x={260} y={410} r={50} label="Partner Tools" borderColor={colors.partner} delay={1.4} />
        </svg>
      </motion.div>
    </div>
  );
}

/* Node Components remain the same as previous 3D version */
function NodeRect({ x, y, w, h, label, borderColor, delay }: any) {
  return (
    <motion.g initial={{ opacity: 0, z: -50 }} animate={{ opacity: 1, z: 0 }} transition={{ duration: 0.6, delay }} filter="url(#shadow)">
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="12" fill="white" stroke={borderColor} strokeWidth="2" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#334155" fontSize="12" fontWeight="600">{label}</text>
    </motion.g>
  );
}

function NodeCircle({ x, y, r, label, borderColor, delay }: any) {
  const words = label.split(" ");
  return (
    <motion.g initial={{ opacity: 0, scale: 0.8, z: -50 }} animate={{ opacity: 1, scale: 1, z: 0 }} transition={{ duration: 0.6, delay }} filter="url(#shadow)">
      <circle cx={x} cy={y} r={r} fill="white" stroke={borderColor} strokeWidth="2" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#334155" fontSize="10" fontWeight="600">
        {words.map((word: string, i: number) => (
          <tspan key={i} x={x} dy={i === 0 ? `-${(words.length - 1) * 0.5}em` : "1.1em"}>{word}</tspan>
        ))}
      </text>
    </motion.g>
  );
}