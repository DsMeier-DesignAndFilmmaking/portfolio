'use client';

import React from 'react';
import { motion } from 'framer-motion';

const NarrativeDiagram = () => {
  const nodes = [
    { label: 'Arrival', delay: 0 },
    { label: 'Exploration', delay: 0.2 },
    { label: 'Familiarity', delay: 0.4 },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center justify-center py-8">
      {/* Vertical dotted line */}
      <div className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-gray-300/60" />
      
      {/* Nodes */}
      <div className="relative flex flex-col items-center justify-between h-full py-4 space-y-16">
        {nodes.map((node, index) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: node.delay }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Glowing node */}
            <div className="relative">
              {/* Outer glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl"
              />
              
              {/* Inner pulsing node */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: node.delay,
                }}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg border-2 border-blue-300/50 flex items-center justify-center"
              >
                {/* Center dot */}
                <div className="w-3 h-3 rounded-full bg-white" />
              </motion.div>
            </div>
            
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: node.delay + 0.3 }}
              className="mt-3 text-sm font-medium text-gray-700"
              style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
            >
              {node.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
      
      {/* Experience Path label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute -left-24 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 uppercase tracking-wider"
        style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
      >
        Experience Path
      </motion.div>
    </div>
  );
};

export default NarrativeDiagram;
