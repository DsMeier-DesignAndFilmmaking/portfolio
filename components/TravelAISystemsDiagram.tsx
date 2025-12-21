"use client";

import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Node = {
  id: string;
  label: string;
};

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

  /* ---------------- DESKTOP SVG ---------------- */
  return (
    <svg viewBox="0 0 440 420" className="w-full max-w-[460px] h-auto">
      {/* Static connections */}
      <line x1="220" y1="80" x2="220" y2="130" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="90" y1="210" x2="220" y2="170" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" />
      <line x1="350" y1="210" x2="220" y2="170" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" />
      <line x1="220" y1="300" x2="220" y2="235" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" />

      {/* Animated Planning → Core */}
      <motion.line
        x1="220"
        y1="130"
        x2="220"
        y2="170"
        stroke="#0F766E"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      />

      {/* Labels */}
      <text x="230" y="150" fontSize="11" fill="#475569">
        Shared Signals
      </text>
      <text x="310" y="190" fontSize="11" fill="#64748B">
        Optional Integration
      </text>

      {/* Nodes */}
      <NodeRect x={220} y={170} w={170} h={70} label="Spontaneity Core Engine" color="#0F766E" />
      <NodeRect x={220} y={100} w={180} h={70} label="Travel Planning Assistant" color="#059669" />
      <NodeCircle x={90} y={210} label="Trust & Authenticity Layer" color="#2563EB" />
      <NodeCircle x={350} y={210} label="Social Travel Network" color="#7C3AED" />
      <NodeCircle x={220} y={320} label="Partner & Business Tools" color="#EA580C" />
    </svg>
  );
}

/* ---------- Components ---------- */

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
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
  label,
  color,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
}) {
  return (
    <motion.g initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <circle cx={x} cy={y} r={55} fill={color} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="11"
        fontWeight="600"
      >
        {label.split(" ").map((word, i) => (
          <tspan key={i} x={x} dy={i === 0 ? "0" : "1.2em"}>
            {word}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}
