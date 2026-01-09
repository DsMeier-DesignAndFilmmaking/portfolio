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

  // Monochromatic color scheme for technical schematic
  const colors = {
    foundational: "#1e293b", // High contrast for foundational systems
    applied: "#94a3b8", // Lower contrast for applied systems
    connector: "#cbd5e1", // Ultra-light gray for connectors
    connectorDot: "#64748b", // Medium gray for connection nodes
  };

  const lineTransition = { duration: 1.2, ease: "easeOut" };

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-6 text-sm text-gray-700 p-4">
        {["Spontaneity Core Engine", "Trust & Authenticity Layer", "Context-Aware Travel Decision System", "Social Micro-Events", "Narrative Travel Generator"].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`px-5 py-3 rounded-xl bg-white shadow-sm border text-center font-medium ${i === 1 ? 'border-2 border-gray-600 font-semibold' : ''}`}>
              {item}
            </div>
            {i < 4 && <span className="text-gray-400 mt-2">↓</span>}
          </div>
        ))}
      </div>
    );
  }

  // Vertical Spine Architecture: Foundational systems stacked vertically in center
  const spineX = 180; // Left-center position for the vertical spine
  const spineCenterY = 260; // Vertical center of the diagram
  
  // Foundational Systems: Stacked vertically (Power Column)
  // Trust Layer (top of spine)
  const trustNode = { x: spineX, y: spineCenterY - 100 };
  // Spontaneity Engine (bottom of spine)
  const spontaneityNode = { x: spineX, y: spineCenterY + 100 };
  
  // Vertical spacing between foundational blocks
  const verticalSpacing = spontaneityNode.y - trustNode.y; // 200px
  
  // Applied Systems: Branch out horizontally to the right
  // Horizontal spacing equals vertical spacing for geometric balance
  const horizontalSpacing = verticalSpacing; // 200px
  const branchStartX = spineX + 120; // Start of branching (right of spine)
  
  // Position applied systems vertically distributed, branching to the right
  const appliedNode1 = { 
    x: branchStartX + horizontalSpacing, 
    y: trustNode.y // Top applied system aligns with Trust Layer
  };
  const appliedNode2 = { 
    x: branchStartX + horizontalSpacing, 
    y: spineCenterY // Middle applied system at center
  };
  const appliedNode3 = { 
    x: branchStartX + horizontalSpacing, 
    y: spontaneityNode.y // Bottom applied system aligns with Spontaneity Engine
  };

  return (
    <div className="flex items-start justify-center lg:justify-end w-full h-full min-h-[600px] pt-16 lg:pt-24">
      <div 
        className="relative w-full max-w-[550px]"
        style={{
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0',
          opacity: 0.3
        }}
      >
        <svg viewBox="0 0 600 520" className="w-full h-auto block overflow-visible" preserveAspectRatio="xMidYMid meet">
          
          {/* === SVG FILTERS FOR HIGH-END ARCHITECTURAL SCHEMATIC === */}
          <defs>
            {/* Glass effect filter */}
            <filter id="glassEffect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feComponentTransfer in="blur" result="opacity">
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
            </filter>
            
            {/* Inner glow for foundational nodes (inset shadow effect) */}
            <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
              <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
              <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.03" intercept="0" />
              </feComponentTransfer>
              <feComposite in="SourceGraphic" in2="shadow" operator="over" />
            </filter>
            
            {/* Radial gradient for foundational nodes */}
            <radialGradient id="foundationalGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            
            {/* Outer glow for foundational systems */}
            <filter id="foundationalGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.05" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Drop shadow for applied systems (floating effect) */}
            <filter id="appliedDropShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feOffset in="blur" dx="0" dy="10" result="offsetBlur" />
              <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.1" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* === TECHNICAL SCHEMATIC CONNECTORS === */}
          
          {/* Vertical Spine Connection: Spontaneity Engine <-> Trust Layer (vertical line) */}
          <VerticalSpineConnector
            startX={spontaneityNode.x}
            startY={spontaneityNode.y - 55}
            endX={trustNode.x}
            endY={trustNode.y + 74}
            delay={0.4}
            colors={colors}
            lineTransition={lineTransition}
            annotation="CORE_SYNC"
          />

          {/* Spine -> Applied System 1 (90-degree circuit trace: horizontal then vertical) */}
          <CircuitTraceConnector
            startX={spontaneityNode.x + 162} // Right edge of Spontaneity Engine (w/2 = 324/2)
            startY={trustNode.y} // Align with Trust Layer
            endX={appliedNode1.x}
            endY={appliedNode1.y}
            nodeRadius={66}
            delay={0.8}
            colors={colors}
            lineTransition={lineTransition}
            pathId="path1"
            annotation="DATA_FLOW_01"
          />

          {/* Spine -> Applied System 2 (90-degree circuit trace) */}
          <CircuitTraceConnector
            startX={spontaneityNode.x + 162} // Right edge of Spontaneity Engine (w/2 = 324/2)
            startY={spineCenterY} // Center of spine
            endX={appliedNode2.x}
            endY={appliedNode2.y}
            nodeRadius={66}
            delay={0.8}
            colors={colors}
            lineTransition={lineTransition}
            pathId="path2"
            annotation="AUTH_LATENCY"
          />

          {/* Spine -> Applied System 3 (90-degree circuit trace) */}
          <CircuitTraceConnector
            startX={spontaneityNode.x + 162} // Right edge of Spontaneity Engine (w/2 = 324/2)
            startY={spontaneityNode.y} // Align with Spontaneity Engine
            endX={appliedNode3.x}
            endY={appliedNode3.y}
            nodeRadius={66}
            delay={0.8}
            colors={colors}
            lineTransition={lineTransition}
            pathId="path3"
            annotation="NARRATIVE_GEN"
          />

          {/* === NODES === */}
          
          {/* DUAL CORE: Foundational Systems */}
          {/* Spontaneity Engine (Foundational) */}
          <NodeRectFoundational 
            x={spontaneityNode.x} 
            y={spontaneityNode.y} 
            w={324} 
            h={110} 
            label="SPONTANEITY CORE ENGINE" 
            delay={0.2} 
          />
          
          {/* Trust Layer (Foundational) */}
          <NodeCircleFoundational 
            x={trustNode.x} 
            y={trustNode.y} 
            r={74} 
            label="TRUST & AUTHENTICITY LAYER" 
            delay={0.5} 
          />
          
          {/* APPLIED SYSTEMS: Orbit around dual core */}
          <NodeCircleApplied x={appliedNode1.x} y={appliedNode1.y} r={66} label="CONTEXT-AWARE TRAVEL DECISION SYSTEM" delay={1.2} idTag="C3D5" />
          <NodeCircleApplied x={appliedNode2.x} y={appliedNode2.y} r={66} label="SOCIAL MICRO-EVENTS" delay={1.2} idTag="D4E6" />
          <NodeCircleApplied x={appliedNode3.x} y={appliedNode3.y} r={66} label="NARRATIVE TRAVEL GENERATOR" delay={1.2} idTag="E5F7" />
          
          {/* Visual Legend */}
          <g>
            <text 
              x="20" 
              y="500" 
              fontSize="8" 
              fill="#64748b" 
              fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
              letterSpacing="0.1em"
            >
              <tspan x="20" dy="0">[●] FOUNDATION</tspan>
              <tspan x="20" dy="12">[○] APPLICATION</tspan>
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ---------------- CONNECTOR COMPONENTS ------------------------ */

/* DATA FLOW CIRCLE: Animated circle traveling along path using requestAnimationFrame */
function DataFlowCircle({ pathData, delay, colors }: any) {
  const pathRef = React.useRef<SVGPathElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    if (!pathRef.current) return;
    
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    let animationFrame: number | null = null;
    let startTime: number | null = null;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime - (delay * 1000);
      const elapsed = currentTime - startTime;
      const cycleTime = 4000; // 4 seconds per cycle (2s travel + 2s pause)
      const cycleProgress = (elapsed % cycleTime) / cycleTime;
      
      if (cycleProgress < 0.5) {
        // Travel phase (0-0.5 of cycle)
        const progress = cycleProgress * 2; // 0 to 1
        setIsVisible(true);
        const point = path.getPointAtLength(progress * pathLength);
        setPosition({ x: point.x, y: point.y });
      } else {
        // Pause phase (0.5-1.0 of cycle)
        setIsVisible(false);
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [pathData, delay]);
  
  return (
    <>
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="none"
        visibility="hidden"
      />
      {isVisible && (
        <circle
          cx={position.x}
          cy={position.y}
          r="2.5"
          fill={colors.connectorDot}
          opacity="0.8"
        />
      )}
    </>
  );
}

/* VERTICAL SPINE CONNECTOR: Vertical line connecting foundational blocks */
function VerticalSpineConnector({ startX, startY, endX, endY, delay, colors, lineTransition, annotation }: any) {
  // Vertical path (straight line)
  const pathData = `M ${startX} ${startY} L ${endX} ${endY}`;
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  return (
    <g>
      {/* Vertical connector line */}
      <motion.path
        d={pathData}
        fill="none"
        stroke={colors.connector}
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...lineTransition, delay }}
      />
      
      {/* Terminal circles (2px) at start and end */}
      <motion.circle 
        cx={startX} 
        cy={startY} 
        r="2" 
        fill={colors.connectorDot} 
        opacity="0.6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.6 }} 
        transition={{ duration: 0.2, delay: delay + lineTransition.duration }}
      />
      <motion.circle 
        cx={endX} 
        cy={endY} 
        r="2" 
        fill={colors.connectorDot} 
        opacity="0.6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.6 }} 
        transition={{ duration: 0.2, delay: delay + lineTransition.duration }}
      />
      
      {/* Technical annotation */}
      {annotation && (
        <motion.text
          x={midX + 8}
          y={midY}
          fontSize="7"
          fill="#0f172a"
          opacity="0.8"
          fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
          letterSpacing="0.1em"
          textAnchor="start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.2, delay: delay + lineTransition.duration }}
        >
          {annotation}
        </motion.text>
      )}
    </g>
  );
}

/* CIRCUIT TRACE CONNECTOR: 90-degree elbow (horizontal then vertical) with joint circles */
function CircuitTraceConnector({ startX, startY, endX, endY, nodeRadius, delay, colors, lineTransition, pathId, annotation }: any) {
  // Calculate connection points (accounting for node radius)
  const endAngle = Math.atan2(startY - endY, startX - endX);
  const endConnX = endX + nodeRadius * Math.cos(endAngle);
  const endConnY = endY + nodeRadius * Math.sin(endAngle);
  
  // 90-degree circuit trace: horizontal first, then vertical
  // Horizontal segment: from startX to endConnX
  // Vertical segment: from startY to endConnY
  const elbowX = endConnX; // Where horizontal meets vertical
  const elbowY = startY; // Where horizontal meets vertical
  
  // Create sharp 90-degree path (circuit trace style)
  const pathData = `M ${startX} ${startY} L ${elbowX} ${elbowY} L ${endConnX} ${endConnY}`;
  
  // Calculate annotation position (midpoint of horizontal segment)
  const annotationX = (startX + elbowX) / 2;
  const annotationY = startY - 8; // Above the horizontal line
  
  return (
    <g>
      {/* Circuit trace line (1px stroke, no dashes for clean PCB look) */}
      <motion.path
        d={pathData}
        fill="none"
        stroke={colors.connector}
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...lineTransition, delay }}
      />
      
      {/* Joint circle (2px) at the 90-degree bend */}
      <motion.circle 
        cx={elbowX} 
        cy={elbowY} 
        r="2" 
        fill={colors.connectorDot} 
        opacity="0.6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.6 }} 
        transition={{ duration: 0.2, delay: delay + lineTransition.duration }}
      />
      
      {/* Terminal circles (2px) at start and end */}
      <motion.circle 
        cx={startX} 
        cy={startY} 
        r="2" 
        fill={colors.connectorDot} 
        opacity="0.6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.6 }} 
        transition={{ duration: 0.2, delay: delay + lineTransition.duration }}
      />
      <motion.circle 
        cx={endConnX} 
        cy={endConnY} 
        r="2" 
        fill={colors.connectorDot} 
        opacity="0.6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.6 }} 
        transition={{ duration: 0.2, delay: delay + lineTransition.duration }}
      />
      
      {/* Technical annotation */}
      {annotation && (
        <motion.text
          x={annotationX}
          y={annotationY}
          fontSize="7"
          fill="#0f172a"
          opacity="0.8"
          fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
          letterSpacing="0.1em"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.2, delay: delay + lineTransition.duration }}
        >
          {annotation}
        </motion.text>
      )}
      
      {/* Animated data flow circle (travels along path every 4 seconds) */}
      <DataFlowCircle
        pathData={pathData}
        delay={delay + lineTransition.duration + 0.5}
        colors={colors}
      />
    </g>
  );
}

/* ---------------- NODE COMPONENTS ------------------------ */

/* FOUNDATIONAL SYSTEMS: Heavy blueprint style - 1.5px solid border, inner glow, bold text */
function NodeRectFoundational({ x, y, w, h, label, delay }: any) {
  const idTag = "A1F3"; // 4-digit hex code ID tag
  
  return (
    <motion.g 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay }}
      filter="url(#foundationalGlow)"
    >
      {/* Background with slate-50/50 tint */}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="8" fill="rgba(248, 250, 252, 0.5)" />
      {/* Radial gradient overlay for inner glow */}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="8" fill="url(#foundationalGradient)" />
      {/* Main rect with 1.5px solid border (heavy look) */}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="8" fill="rgba(255, 255, 255, 0.9)" stroke="#1e293b" strokeWidth="1.5" strokeOpacity="0.4" filter="url(#innerGlow)" />
      {/* Monospaced uppercase text - bold blueprint style (high contrast) */}
      <text 
        x={x} 
        y={y} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fill="#000000" 
        fontSize="10" 
        fontWeight="700"
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
        letterSpacing="0.2em"
        style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
      >
        {label}
      </text>
      {/* ID tag in corner */}
      <text 
        x={x - w / 2 + 6} 
        y={y - h / 2 + 10} 
        textAnchor="start" 
        fill="#0f172a" 
        fontSize="8" 
        fontWeight="400"
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
        letterSpacing="0.1em"
      >
        {idTag}
      </text>
    </motion.g>
  );
}

function NodeCircleFoundational({ x, y, r, label, delay }: any) {
  const words = label.split(" ");
  const idTag = "B2E4"; // 4-digit hex code ID tag
  
  return (
    <motion.g 
      initial={{ opacity: 0, scale: 0.85 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.6, delay }}
      filter="url(#foundationalGlow)"
    >
      {/* Background with slate-50/50 tint */}
      <circle cx={x} cy={y} r={r} fill="rgba(248, 250, 252, 0.5)" />
      {/* Radial gradient overlay for inner glow */}
      <circle cx={x} cy={y} r={r} fill="url(#foundationalGradient)" />
      {/* Main circle with 1.5px solid border (heavy look) */}
      <circle cx={x} cy={y} r={r} fill="rgba(255, 255, 255, 0.9)" stroke="#1e293b" strokeWidth="1.5" strokeOpacity="0.4" filter="url(#innerGlow)" />
      {/* Monospaced uppercase text - bold blueprint style (high contrast) */}
      <text 
        x={x} 
        y={y} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fill="#000000" 
        fontSize="10" 
        fontWeight="700"
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
        letterSpacing="0.2em"
        style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
      >
        {words.map((word: string, i: number) => (
          <tspan key={i} x={x} dy={i === 0 ? `-${(words.length - 1) * 0.5}em` : "1.1em"}>
            {word}
          </tspan>
        ))}
      </text>
      {/* ID tag in corner */}
      <text 
        x={x - r + 6} 
        y={y - r + 10} 
        textAnchor="start" 
        fill="#0f172a" 
        fontSize="8" 
        fontWeight="400"
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
        letterSpacing="0.1em"
      >
        {idTag}
      </text>
    </motion.g>
  );
}

/* APPLIED SYSTEMS: Light blueprint style - 1px dashed border, 70% opacity, regular text */
function NodeCircleApplied({ x, y, r, label, delay, idTag = "C3D5" }: any) {
  const words = label.split(" ");
  
  return (
    <motion.g 
      initial={{ opacity: 0, scale: 0.85 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.6, delay }}
      filter="url(#appliedDropShadow)"
    >
      {/* Visual elements with 70% opacity */}
      <g opacity="0.7">
        {/* Glass effect background */}
        <circle cx={x} cy={y} r={r} fill="rgba(255, 255, 255, 0.03)" />
        {/* Main circle with 1px dashed border */}
        <circle cx={x} cy={y} r={r} fill="rgba(255, 255, 255, 0.7)" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" strokeOpacity="0.3" />
      </g>
      
      {/* Text elements at full opacity for high contrast */}
      <g opacity="1">
        {/* Monospaced uppercase text - medium blueprint style (high contrast) */}
        <text 
          x={x} 
          y={y} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill="#000000" 
          fontSize="10" 
          fontWeight="500"
          fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
          letterSpacing="0.2em"
          style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
        >
          {words.map((word: string, i: number) => (
            <tspan key={i} x={x} dy={i === 0 ? `-${(words.length - 1) * 0.5}em` : "1.1em"}>
              {word}
            </tspan>
          ))}
        </text>
        {/* ID tag in corner */}
        <text 
          x={x - r + 6} 
          y={y - r + 10} 
          textAnchor="start" 
          fill="#0f172a" 
          fontSize="8" 
          fontWeight="400"
          fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
          letterSpacing="0.1em"
        >
          {idTag}
        </text>
      </g>
    </motion.g>
  );
}