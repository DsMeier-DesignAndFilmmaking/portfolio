"use client";

import React from "react";

type SystemNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
};

type Connection = {
  from: string;
  to: string;
  dashed?: boolean;
};

const nodes: SystemNode[] = [
  {
    id: "core",
    label: "Spontaneity\nCore AI Engine",
    x: 200,
    y: 200,
    color: "#0F766E", // teal
  },
  {
    id: "trust",
    label: "Trust &\nAuthenticity Layer",
    x: 200,
    y: 60,
    color: "#2563EB", // blue
  },
  {
    id: "social",
    label: "Social Travel\nNetwork UX",
    x: 360,
    y: 200,
    color: "#7C3AED", // purple
  },
  {
    id: "business",
    label: "Partner &\nBusiness Tools",
    x: 200,
    y: 340,
    color: "#EA580C", // orange
  },
];

const connections: Connection[] = [
  { from: "trust", to: "core" },
  { from: "social", to: "core" },
  { from: "business", to: "core", dashed: true },
  { from: "trust", to: "social", dashed: true },
];

export default function TravelAISystemsDiagram() {
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-[420px] h-auto"
    >
      {/* Connections */}
      {connections.map((conn, i) => {
        const from = getNode(conn.from);
        const to = getNode(conn.to);

        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray={conn.dashed ? "6 6" : "0"}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={42}
            fill={node.color}
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="11"
            fontWeight="600"
          >
            {node.label.split("\n").map((line, idx) => (
              <tspan
                key={idx}
                x={node.x}
                dy={idx === 0 ? "0" : "1.2em"}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </svg>
  );
}
