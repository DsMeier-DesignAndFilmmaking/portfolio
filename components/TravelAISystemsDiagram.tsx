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

  /* ---------------- MOBILE STACK ---------------- */
  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-6 text-sm text-gray-700">
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

  /* ---------------- DESKTOP DIAGRAM ---------------- */
  return (
    <div className="flex justify-center lg:justify-end w-full">
      <div className="relative w-full max-w-[520px] aspect-square">
        <svg
          viewBox="0 0 520 520"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* === CONNECTIONS === */}

          {/* Trust → Planning */}
          <line
            x1="130"
            y1="260"
            x2="260"
            y2="150"
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Social → Core (optional) */}
          <line
            x1="390"
            y1="260"
            x2="260"
            y2="240"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Business → Core (optional) */}
          <line
            x1="260"
            y1="390"
            x2="260"
            y2="290"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Animated Planning → Core */}
          <motion.line
            x1="260"
            y1="175"
            x2="260"
            y2="225"
            stroke="#0F766E"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />

          {/* === MICRO LABELS === */}
          <text x="272" y="205" fontSize="11" fill="#475569">
            Shared signals
          </text>

          <text x="332" y="248" fontSize="11" fill="#64748B">
            Optional integration
          </text>

          {/* === NODES === */}

          {/* Planning Assistant */}
          <NodeRect
            x={260}
            y={140}
            w={220}
            h={72}
            label="Travel Planning Assistant"
            color="#059669"
          />

          {/* Core Engine */}
          <NodeRect
            x={260}
            y={260}
            w={240}
            h={80}
            label="Spontaneity Core Engine"
            color="#0F766E"
          />

          {/* Trust Layer */}
          <NodeCircle
            x={130}
            y={260}
            r={54}
            label="Trust & Authenticity"
            color="#2563EB"
          />

          {/* Social Network */}
          <NodeCircle
            x={390}
            y={260}
            r={54}
            label="Social Travel Network"
            color="#7C3AED"
          />

          {/* Business Tools */}
          <NodeCircle
            x={260}
            y={390}
            r={52}
            label="Partner Tools"
            color="#EA580C"
          />
        </svg>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ---------------- NODE COMPONENTS ------------------------ */
/* ========================================================= */

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
      transition={{ duration: 0.45 }}
    >
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx="18"
        fill={color}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="12"
        fontWeight="600"
      >
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
  const words = label.split(" ");
  const lines: string[][] = [];

  words.forEach((word) => {
    if (!lines.length || lines[lines.length - 1].join(" ").length > 12) {
      lines.push([word]);
    } else {
      lines[lines.length - 1].push(word);
    }
  });

  const visibleLines = lines.slice(0, 2);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
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
        {visibleLines.map((line, i) => (
          <tspan key={i} x={x} dy={i === 0 ? "0" : "1.2em"}>
            {line.join(" ")}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}
