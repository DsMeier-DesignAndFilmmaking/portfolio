"use client";

import React from "react";

type SystemNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  shape?: "circle" | "rect";
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
    width: 150,
    height: 70,
    color: "#0F766E",
    shape: "rect",
  },
  {
    id: "planning",
    label: "Travel Planning\nAssistant",
    x: 200,
    y: 120,
    width: 160,
    height: 70,
    color: "#059669",
    shape: "rect",
  },
  {
    id: "trust",
    label: "Trust &\nAuthenticity Layer",
    x: 70,
    y: 200,
    width: 120,
    height: 120,
    color: "#2563EB",
  },
  {
    id: "social",
    label: "Social Travel\nNetwork UX",
    x: 330,
    y: 200,
    width: 120,
    height: 120,
    color: "#7C3AED",
  },
  {
    id: "business",
    label: "Partner &\nBusiness Tools",
    x: 200,
    y: 330,
    width: 120,
    height: 120,
    color: "#EA580C",
  },
];

const connections: Connection[] = [
  { from: "trust", to: "planning" },
  { from: "planning", to: "core" },
  { from: "social", to: "core", dashed: true },
  { from: "trust", to: "core", dashed: true },
  { from: "business", to: "core", dashed: true },
];

export default function TravelAISystemsDiagram() {
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[440px] h-auto">
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
          {node.shape === "rect" ? (
            <rect
              x={node.x - node.width / 2}
              y={node.y - node.height / 2}
              rx="18"
              ry="18"
              width={node.width}
              height={node.height}
              fill={node.color}
            />
          ) : (
            <circle
              cx={node.x}
              cy={node.y}
              r={node.width / 2}
              fill={node.color}
            />
          )}

          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="12"
            fontWeight="600"
            style={{ lineHeight: "1.2em" }}
          >
            {node.label.split("\n").map((line, idx) => (
              <tspan
                key={idx}
                x={node.x}
                dy={idx === 0 ? "0" : "1.25em"}
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
