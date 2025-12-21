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

export default function TravelAISystemsDiagram() {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  /* ---------------- MOBILE STACK ---------------- */
  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-6 text-sm text-gray-700">
        {[
          "Trust & Authenticity Layer",
          "Travel Planning Assistant",
          "Spontaneity Core Engine",
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

  /* ---------------- DESKTOP SVG (Improved Layout) ---------------- */
return (
    <svg
      viewBox="0 0 520 520"
      className="w-full max-w-[520px] h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* === CONNECTIONS === */}
  
      {/* Trust → Planning */}
      <line
        x1="120"
        y1="260"
        x2="260"
        y2="150"
        stroke="#CBD5E1"
        strokeWidth="2"
      />
  
      {/* Social → Core (optional) */}
      <line
        x1="400"
        y1="260"
        x2="260"
        y2="230"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
  
      {/* Business → Core (optional) */}
      <line
        x1="260"
        y1="400"
        x2="260"
        y2="270"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
  
      {/* Animated Planning → Core */}
      <motion.line
        x1="260"
        y1="170"
        x2="260"
        y2="210"
        stroke="#0F766E"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      />
  
      {/* === MICRO LABELS === */}
      <text x="272" y="195" fontSize="11" fill="#475569">
        Shared signals
      </text>
  
      <text x="340" y="245" fontSize="11" fill="#64748B">
        Optional integration
      </text>
  
      {/* === NODES === */}
  
      {/* Planning Assistant */}
      <NodeRect
        x={260}
        y={140}
        w={200}
        h={72}
        label="Travel Planning Assistant"
        color="#059669"
      />
  
      {/* Core Engine */}
      <NodeRect
        x={260}
        y={240}
        w={210}
        h={76}
        label="Spontaneity Core Engine"
        color="#0F766E"
      />
  
      {/* Trust Layer */}
      <NodeCircle
        x={120}
        y={280}
        r={52}
        label="Trust & Authenticity Layer"
        color="#2563EB"
      />
  
      {/* Social Network */}
      <NodeCircle
        x={400}
        y={280}
        r={52}
        label="Social Travel Network"
        color="#7C3AED"
      />
  
      {/* Business Tools */}
      <NodeCircle
        x={260}
        y={420}
        r={52}
        label="Partner & Business Tools"
        color="#EA580C"
      />
    </svg>
  );
  


/* ---------- Node Components ---------- */

function NodeRect({
  x,
  y,
  w,
  h,
  label,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color: string;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="18" fill={color} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12" fontWeight="600">
        {label}
      </text>
    </motion.g>
  );
}

function NodeCircle({
    x,
    y,
    r,
    label,
    color,
  }: {
    x: number;
    y: number;
    r: number;
    label: string;
    color: string;
  }) {
    return (
      <motion.g
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <circle cx={x} cy={y} r={r} fill={color} />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="11"
          fontWeight="600"
        >
          {label
  .split(" ")
  .reduce((lines: string[][], word) => {
    if (!lines.length || lines[lines.length - 1].join(" ").length > 14) {
      lines.push([word]);
    } else {
      lines[lines.length - 1].push(word);
    }
    return lines;
  }, [])
  .map((line, i) => (
    <tspan key={i} x={x} dy={i === 0 ? "0" : "1.2em"}>
      {line.join(" ")}
    </tspan>
))}

        </text>
      </motion.g>
    );
  }
}
