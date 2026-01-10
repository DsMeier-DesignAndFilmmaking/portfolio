'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, Clock, MapPin, Activity, Info, FileText, Download, Briefcase, CheckCircle2, FileCheck } from 'lucide-react';

const TrustPulseUI = () => {
  const [pulseScale, setPulseScale] = useState(1);
  const [showLog, setShowLog] = useState(false);

  // Logic to simulate real-time data "heartbeat"
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(prev => (prev === 1 ? 1.05 : 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const auditSteps = [
    { time: "0.0s", event: "Query initiated: 'Late night jazz in Soho'", type: "system" },
    { time: "0.4s", event: "LLM generated candidate: 'The Blue Note Pop-up'", type: "ai" },
    { time: "0.8s", event: "Retrieving Ground Truth via OpenStreetMap API...", type: "source" },
    { time: "1.2s", event: "Social Signal detected: 4 recent Instagram geotags ( < 15m ago)", type: "source" },
    { time: "1.5s", event: "Conflict Check: Google Maps lists 'Temporary Closure' — Resolving...", type: "logic" },
    { time: "1.8s", event: "Resolution: Social activity + OSM update overrides stale Google cache.", type: "logic" },
    { time: "2.1s", event: "Integrity Score: 98% (High Confidence)", type: "success" }
  ];

  const handleDownload = () => {
    // Simulating a route that renders the VerificationPDFMockup component
    window.open('/mockups/trust-verification-report', '_blank', 'width=850,height=1100');
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 space-y-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARD 1: THE "STATIC" PROBLEM */}
        <div className="relative group border-2 border-slate-200 bg-slate-50 rounded-2xl p-6 transition-all grayscale opacity-70 hover:opacity-80">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-400 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
            <Clock size={12} /> LATENT DATA (UNVERIFIED)
          </div>
          
          <div className="space-y-4 pt-2">
            <h4 className="text-xl font-semibold text-slate-700">Cozy Café & Bakery</h4>
            <p className="text-sm text-slate-500">"Great spot for early breakfast and quiet reading."</p>
            
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Source:</span>
                <span>FictionalReviews.com</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Last Verified:</span>
                <span className="text-red-400 font-bold">48h+ ago</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
              <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-red-600 leading-tight">
                High Risk: Location hours may have changed. No real-time activity detected.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2: THE "LIVE PULSE" SOLUTION */}
        <div 
          className="relative border-2 border-emerald-500 bg-white rounded-2xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all transform hover:scale-[1.02]"
          style={{ transform: `scale(${pulseScale})`, transition: 'transform 1.5s ease-in-out' }}
        >
          <div className="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 animate-pulse">
            <Activity size={12} /> LIVE PULSE: SPONTANEITY VERIFIED
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-start">
              <h4 className="text-xl font-bold text-slate-900">"The Blue Note Pop-up"</h4>
              <ShieldCheck className="text-emerald-500" size={24} />
            </div>
            <p className="text-sm text-slate-700 font-medium">Verified open now. Trending with locals in the last 15 mins.</p>
            
            <div className="space-y-3 border-t border-emerald-50 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Provenance</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-600">OpenStreetMap</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-600">Twitter Stream</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Freshness</span>
                <span className="text-emerald-600 font-mono font-bold text-xs flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                  2 mins ago
                </span>
              </div>
              
              {/* Trust Bar Logic */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-emerald-700">
                  <span>Authenticity Score</span>
                  <span>98%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[98%] shadow-[0_0_10px_#10b981]"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowLog(!showLog)}
              className="w-full mt-2 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Info size={14} /> {showLog ? "Close Audit Trail" : "View Source Chain"}
            </button>

            {showLog && (
              <div 
                className="mt-4 bg-slate-900 rounded-lg p-4 font-mono text-[10px] leading-relaxed border border-slate-700 shadow-inner"
                style={{
                  animation: 'slideDown 0.3s ease-out',
                }}
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                  <span className="text-slate-500 uppercase tracking-widest">Verification Audit Log</span>
                  <span className="text-emerald-500">ID: TRACE_8829_X</span>
                </div>
                <div 
                  className="space-y-1.5 h-48 overflow-y-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#475569 #1e293b'
                  }}
                >
                  {auditSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-slate-600 w-8 shrink-0">{step.time}</span>
                      <span className={
                        step.type === 'ai' ? 'text-purple-400' : 
                        step.type === 'source' ? 'text-blue-400' : 
                        step.type === 'logic' ? 'text-yellow-400' : 
                        step.type === 'success' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                      }>
                        {step.event}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-center">
                  <span className="text-slate-500 italic">Audit trail encrypted & stored for provenance verification.</span>
                </div>
              </div>
            )}

            {/* B2B Expert View & Download Section */}
            <div className="mt-6 pt-6 border-t-2 border-dashed border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Agent / B2B Tools</span>
                </div>
                <span className="bg-slate-100 text-slate-600 text-[9px] px-2 py-0.5 rounded font-mono">ID: REF-992-B2B</span>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <h5 className="text-[12px] font-bold text-slate-800 flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-emerald-500" /> 
                    Professional Liability Shield
                  </h5>
                  <p className="text-[10px] text-slate-500 leading-tight mt-1">
                    Export this verification chain as a certified document for client itineraries and liability protection.
                  </p>
                </div>
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold text-slate-700 transition-all shadow-sm shrink-0"
                >
                  <FileText size={14} />
                  Export .PDF
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 italic mb-4">
          *Conceptual UI demonstrating how architectural trust signals are translated into user confidence.
        </p>
        
        <div className="inline-block p-1 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-lg shadow-sm">
          <div className="bg-white rounded-md p-4 flex items-center gap-6 border border-slate-200 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" onClick={handleDownload}>
            <div className="bg-red-50 p-2 rounded text-red-500">
              <FileCheck size={32} />
            </div>
            <div className="text-left">
              <h5 className="text-[11px] font-bold text-slate-800 uppercase">View PDF Mockup Concept</h5>
              <p className="text-[10px] text-slate-400">Liability Shield Report: ID REF-PRO-8829-X</p>
            </div>
            <div className="ml-4 text-[9px] bg-slate-900 text-white px-2 py-1 rounded font-bold uppercase">
              Open Preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustPulseUI;
