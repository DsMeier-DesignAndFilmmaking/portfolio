"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SpontaneityEngine from './SpontaneityEngine';

interface LogicReceiptProps {
  projectData: {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    metrics: {
      arrivalConfidence: string;
      logicLatency: string;
    };
    systemSpecs: {
      slackDelta: string;
      confidence: number;
      energyCost: string;
      environment: {
        weather: string;
        crowds: string;
      };
    };
    content: {
      phase01: string;
      phase02: string;
      humanProblem: string;
    };
  };
}

const LogicReceipt: React.FC<LogicReceiptProps> = ({ projectData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      {/* Hero Section with Glassmorphism */}
      <div className="relative pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                System Surface Active
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              {projectData.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {projectData.subtitle}
            </p>
          </motion.div>

          {/* Human Problem Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    The Human Problem
                  </h3>
                  <p className="text-lg text-slate-800 leading-relaxed italic">
                    "{projectData.content.humanProblem}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spontaneity Engine Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <SpontaneityEngine
              slackDelta={projectData.systemSpecs.slackDelta}
              confidence={projectData.systemSpecs.confidence}
              energyCost={projectData.systemSpecs.energyCost}
              environment={projectData.systemSpecs.environment}
            />
          </motion.div>

          {/* System Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-8"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">System Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Arrival Confidence
                </div>
                <div className="text-3xl font-bold text-emerald-600">
                  {projectData.metrics.arrivalConfidence}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Logic Latency
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {projectData.metrics.logicLatency}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogicReceipt;
