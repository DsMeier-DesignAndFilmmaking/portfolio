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

  // Bento-System Map Architecture: Foundational row at bottom, Applied row at top
  const centerX = 300; // Center of diagram
  const diagramHeight = 520;
  const diagramWidth = 600;
  
  // Block dimensions (Foundational larger, Applied smaller for hierarchy)
  const foundationalBlockWidth = 260;
  const foundationalBlockHeight = 130;
  const appliedBlockWidth = 170; // Increased for longer labels
  const appliedBlockHeight = 110; // Increased for better text fit
  
  // Foundational Row (Bottom): Side-by-side blocks
  const foundationalRowY = diagramHeight - 80; // Near bottom
  const foundationalGap = 48; // Consistent gap-12 spacing (48px)
  const foundationalTotalWidth = (foundationalBlockWidth * 2) + foundationalGap;
  const foundationalStartX = centerX - (foundationalTotalWidth / 2);
  
  const spontaneityNode = { 
    x: foundationalStartX + foundationalBlockWidth / 2, 
    y: foundationalRowY,
    w: foundationalBlockWidth,
    h: foundationalBlockHeight
  };
  const trustNode = { 
    x: foundationalStartX + foundationalBlockWidth + foundationalGap + foundationalBlockWidth / 2, 
    y: foundationalRowY,
    w: foundationalBlockWidth,
    h: foundationalBlockHeight
  };
  
  // Applied Row (Top): Horizontal row of 3 blocks
  const appliedRowY = 100; // Near top
  const appliedGap = 32; // Consistent gap-8 spacing (32px)
  const appliedTotalWidth = (appliedBlockWidth * 3) + (appliedGap * 2);
  const appliedStartX = centerX - (appliedTotalWidth / 2);
  
  // Ensure perfect centering: align foundational center with applied center
  const foundationalCenterX = centerX;
  const appliedCenterX = centerX;
  
  const appliedNode1 = { 
    x: appliedStartX + appliedBlockWidth / 2, 
    y: appliedRowY,
    w: appliedBlockWidth,
    h: appliedBlockHeight
  };
  const appliedNode2 = { 
    x: appliedStartX + appliedBlockWidth + appliedGap + appliedBlockWidth / 2, 
    y: appliedRowY,
    w: appliedBlockWidth,
    h: appliedBlockHeight
  };
  const appliedNode3 = { 
    x: appliedStartX + (appliedBlockWidth * 2) + (appliedGap * 2) + appliedBlockWidth / 2, 
    y: appliedRowY,
    w: appliedBlockWidth,
    h: appliedBlockHeight
  };
  
  // Connector: Vertical line from center of Foundation row branching to Applied blocks
  const foundationCenterX = centerX; // Perfectly centered
  const foundationCenterY = foundationalRowY; // Center Y of foundational row
  const foundationTopY = foundationalRowY - foundationalBlockHeight / 2; // Top edge of foundational blocks

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
            {/* Arrowhead marker for directional flow (pointing from Foundation to Applied) - high contrast */}
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M 0,0 L 0,6 L 9,3 z"
                fill="#0f172a"
              />
            </marker>
            
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
          
          {/* === BENTO-SYSTEM CONNECTORS === */}
          
          {/* Single vertical line from Foundation top edge branching to 3 Applied blocks */}
          <BentoConnector
            foundationCenterX={foundationCenterX}
            foundationTopY={foundationTopY}
            appliedNodes={[appliedNode1, appliedNode2, appliedNode3]}
            delay={0.4}
            colors={colors}
            lineTransition={lineTransition}
          />

          {/* === NODES === */}
          
          {/* FOUNDATIONAL ROW (Bottom): Solid dark blocks with white text */}
          <BentoFoundationalBlock 
            x={spontaneityNode.x} 
            y={spontaneityNode.y} 
            w={spontaneityNode.w} 
            h={spontaneityNode.h} 
            label="SPONTANEITY CORE ENGINE" 
            delay={0.2}
            techId="01_CORE"
          />
          
          <BentoFoundationalBlock 
            x={trustNode.x} 
            y={trustNode.y} 
            w={trustNode.w} 
            h={trustNode.h} 
            label="TRUST & AUTHENTICITY LAYER" 
            delay={0.3}
            techId="02_TRUST"
          />
          
          {/* APPLIED ROW (Top): Outline blocks with dark text */}
          <BentoAppliedBlock 
            x={appliedNode1.x} 
            y={appliedNode1.y} 
            w={appliedNode1.w} 
            h={appliedNode1.h} 
            label="CONTEXT-AWARE TRAVEL DECISION SYSTEM" 
            delay={0.8} 
          />
          <BentoAppliedBlock 
            x={appliedNode2.x} 
            y={appliedNode2.y} 
            w={appliedNode2.w} 
            h={appliedNode2.h} 
            label="SOCIAL MICRO-EVENTS" 
            delay={0.9} 
          />
          <BentoAppliedBlock 
            x={appliedNode3.x} 
            y={appliedNode3.y} 
            w={appliedNode3.w} 
            h={appliedNode3.h} 
            label="NARRATIVE TRAVEL GENERATOR" 
            delay={1.0} 
          />
          
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

/* BENTO CONNECTOR: 90-degree orthogonal routing with arrowheads - Foundation feeds Application flow */
function BentoConnector({ foundationCenterX, foundationTopY, appliedNodes, delay, colors, lineTransition }: any) {
  // Calculate connection points at node borders
  // Applied blocks: connect to top edge (y - h/2)
  const appliedTopY = appliedNodes[0].y - 55; // appliedBlockHeight / 2 = 110 / 2 = 55
  
  // Branching point (midway between foundation top and applied blocks top)
  const branchY = (foundationTopY + appliedTopY) / 2;
  
  // Create 90-degree orthogonal paths: vertical line from foundation top to branch point
  const verticalPath = `M ${foundationCenterX} ${foundationTopY} L ${foundationCenterX} ${branchY}`;
  
  // Branch paths: horizontal then vertical (90-degree routing) - connect to top edge of applied blocks
  const branchPaths = appliedNodes.map((node: any) => {
    const nodeTopY = node.y - 55; // appliedBlockHeight / 2 = 110 / 2 = 55
    // Horizontal segment from junction to node x, then vertical to node top
    return `M ${foundationCenterX} ${branchY} L ${node.x} ${branchY} L ${node.x} ${nodeTopY}`;
  });
  
  // Calculate annotation position (midpoint of vertical segment)
  const annotationX = foundationCenterX + 8;
  const annotationY = (foundationTopY + branchY) / 2;
  
  return (
    <g>
      {/* Main vertical line (2px slate-900 stroke with arrowhead at top) - high contrast ADA compliant */}
      <motion.path
        d={verticalPath}
        fill="none"
        stroke="#0f172a"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...lineTransition, delay }}
      />
      
      {/* Visual annotation: FEED_LOGIC label - high contrast */}
      <motion.text
        x={annotationX}
        y={annotationY}
        fontSize="8"
        fill="#0f172a"
        opacity="1"
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
        letterSpacing="0.1em"
        textAnchor="start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + lineTransition.duration }}
      >
        FEED_LOGIC
      </motion.text>
      
      {/* Junction node (4px solid circle) at branching point - high contrast */}
      <motion.circle
        cx={foundationCenterX}
        cy={branchY}
        r="4"
        fill="#0f172a"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: delay + lineTransition.duration }}
      />
      
      {/* Branch lines to applied blocks (1.5px slate-500 stroke, 90-degree routing, with arrowheads) */}
      {branchPaths.map((path: string, i: number) => {
        // Calculate annotation position for each branch (midpoint of horizontal segment)
        const node = appliedNodes[i];
        const branchMidX = (foundationCenterX + node.x) / 2;
        const branchMidY = branchY - 8; // Above the horizontal line
        
        return (
          <g key={i}>
            <motion.path
              d={path}
              fill="none"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...lineTransition, delay: delay + 0.2 + (i * 0.1) }}
            />
            
            {/* Animated pulse traveling from foundation to applied (dash-array animation) - high contrast */}
            <motion.path
              d={path}
              fill="none"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 12"
              strokeOpacity="0.8"
              initial={{ pathLength: 0, strokeDashoffset: 0 }}
              animate={{ 
                pathLength: 1,
                strokeDashoffset: [0, -20]
              }}
              transition={{ 
                pathLength: { ...lineTransition, delay: delay + 0.2 + (i * 0.1) },
                strokeDashoffset: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "linear",
                  delay: delay + lineTransition.duration + 0.5 + (i * 0.1)
                }
              }}
            />
          </g>
        );
      })}
    </g>
  );
}

/* VERTICAL SPINE CONNECTOR: Vertical line connecting foundational blocks (deprecated) */
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

/* ---------------- BENTO-SYSTEM NODE COMPONENTS ------------------------ */

/* FOUNDATIONAL BLOCK: Solid dark block (bg-slate-950) with white text and technical ID */
function BentoFoundationalBlock({ x, y, w, h, label, delay, techId }: any) {
  const words = label.split(" ");
  
  return (
    <motion.g 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay }}
      className="bento-foundational-node"
      style={{ opacity: 1 }}
    >
      {/* Solid dark block (bg-slate-950) with border-slate-800 - high contrast ADA compliant */}
      <rect 
        x={x - w / 2} 
        y={y - h / 2} 
        width={w} 
        height={h} 
        rx="4" 
        fill="#020617" 
        stroke="#1e293b"
        strokeWidth="2"
        className="bento-foundational-bg"
      />
      
      {/* Green system status dot (top-right corner) */}
      <circle 
        cx={x + w / 2 - 8} 
        cy={y - h / 2 + 8} 
        r="4" 
        fill="#22c55e" 
      />
      
      {/* Technical ID label (top-left corner, 8px white for ADA compliance) */}
      {techId && (
        <text 
          x={x - w / 2 + 6} 
          y={y - h / 2 + 10} 
          textAnchor="start" 
          fill="#FFFFFF" 
          fontSize="8" 
          fontWeight="400"
          fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
          letterSpacing="0.1em"
          opacity="1"
        >
          {techId}
        </text>
      )}
      
      {/* White text - ADA compliant high contrast (7:1+ ratio) */}
      <text 
        x={x} 
        y={y} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fill="#FFFFFF" 
        fontSize="14" 
        fontWeight="700"
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
        letterSpacing="0.05em"
        style={{ 
          textRendering: 'optimizeLegibility', 
          WebkitFontSmoothing: 'antialiased',
          opacity: 1,
          color: '#FFFFFF'
        }}
        opacity="1"
      >
        {words.map((word: string, i: number) => {
          const offset = (words.length - 1) * 0.3;
          const dyValue = i === 0 ? `-${offset}em` : "1.2em";
          return (
            <tspan key={i} x={x} dy={dyValue} opacity="1" fill="#FFFFFF">
              {word}
            </tspan>
          );
        })}
      </text>
    </motion.g>
  );
}

/* APPLIED BLOCK: Glass look (bg-white/10, border-slate-300) with dark text */
function BentoAppliedBlock({ x, y, w, h, label, delay }: any) {
  const words = label.split(" ");
  
  return (
    <motion.g 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay }}
      className="bento-applied-node"
      style={{ opacity: 1 }}
    >
      {/* Background (bg-white) - high contrast ADA compliant */}
      <rect 
        x={x - w / 2} 
        y={y - h / 2} 
        width={w} 
        height={h} 
        rx="4" 
        fill="#FFFFFF" 
        className="bento-applied-bg"
      />
      
      {/* Border (border-2 border-slate-950) - high contrast ADA compliant */}
      <rect 
        x={x - w / 2} 
        y={y - h / 2} 
        width={w} 
        height={h} 
        rx="4" 
        fill="none" 
        stroke="#020617" 
        strokeWidth="2"
        className="bento-applied-border"
      />
      
      {/* Dark text (text-slate-950) - ADA compliant high contrast (7:1+ ratio) */}
      <text 
        x={x} 
        y={y} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fill="#020617" 
        fontSize="14" 
        fontWeight="600"
        fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
        letterSpacing="0.05em"
        style={{ 
          textRendering: 'optimizeLegibility', 
          WebkitFontSmoothing: 'antialiased',
          opacity: 1,
          color: '#020617'
        }}
        opacity="1"
      >
        {words.map((word: string, i: number) => {
          // Better vertical centering: calculate offset based on total word count
          const totalWords = words.length;
          const lineHeight = 1.15; // Tighter line spacing
          const firstLineOffset = totalWords > 1 ? ((totalWords - 1) * lineHeight) / 2 : 0;
          const dyValue = i === 0 ? `-${firstLineOffset}em` : `${lineHeight}em`;
          return (
            <tspan key={i} x={x} dy={dyValue} opacity="1" fill="#020617">
              {word}
            </tspan>
          );
        })}
      </text>
    </motion.g>
  );
}

/* FOUNDATIONAL SYSTEMS: Heavy blueprint style - 1.5px solid border, inner glow, bold text (deprecated) */
function NodeRectFoundational({ x, y, w, h, label, delay }: any) {
  const idTag = "A1F3"; // 4-digit hex code ID tag
  
  return (
    <motion.g 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay }}
    >
      {/* Visual elements with filters */}
      <g filter="url(#foundationalGlow)">
        {/* Background with slate-50/50 tint */}
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="8" fill="rgba(248, 250, 252, 0.5)" />
        {/* Radial gradient overlay for inner glow */}
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="8" fill="url(#foundationalGradient)" />
        {/* Main rect with 1.5px solid border (heavy look) */}
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="8" fill="rgba(255, 255, 255, 0.9)" stroke="#1e293b" strokeWidth="1.5" strokeOpacity="0.4" filter="url(#innerGlow)" />
      </g>
      
      {/* Text elements at full opacity - pure black, no filters */}
      <g opacity="1">
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
          fill="#000000" 
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

function NodeCircleFoundational({ x, y, r, label, delay }: any) {
  const words = label.split(" ");
  const idTag = "B2E4"; // 4-digit hex code ID tag
  
  return (
    <motion.g 
      initial={{ opacity: 0, scale: 0.85 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.6, delay }}
    >
      {/* Visual elements with filters */}
      <g filter="url(#foundationalGlow)">
        {/* Background with slate-50/50 tint */}
        <circle cx={x} cy={y} r={r} fill="rgba(248, 250, 252, 0.5)" />
        {/* Radial gradient overlay for inner glow */}
        <circle cx={x} cy={y} r={r} fill="url(#foundationalGradient)" />
        {/* Main circle with 1.5px solid border (heavy look) */}
        <circle cx={x} cy={y} r={r} fill="rgba(255, 255, 255, 0.9)" stroke="#1e293b" strokeWidth="1.5" strokeOpacity="0.4" filter="url(#innerGlow)" />
      </g>
      
      {/* Text elements at full opacity - pure black, no filters */}
      <g opacity="1">
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
          fill="#000000" 
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
          fill="#000000" 
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