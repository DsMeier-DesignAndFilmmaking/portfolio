'use client';

import React, { useState, useEffect } from 'react';

const TrustSignalDemo = () => {
  const [trustScore, setTrustScore] = useState(65);
  const [status, setStatus] = useState('Verifying...');
  const [sources, setSources] = useState(['Google API: OK']);

  useEffect(() => {
    const sequence = [
      { score: 45, status: 'Querying Sources...', sources: ['Google API: Connected'] },
      { score: 82, status: 'Cross-Referencing...', sources: ['Google: OK', 'OpenStreetMap: Verified'] },
      { score: 98, status: 'Consensus Reached', sources: ['Google: OK', 'OSM: Verified', 'Real-time Social: High Activity'] }
    ];

    let i = 0;
    const interval = setInterval(() => {
      setTrustScore(sequence[i].score);
      setStatus(sequence[i].status);
      setSources(sequence[i].sources);
      i = (i + 1) % sequence.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-8 bg-slate-900 rounded-2xl border border-slate-800 text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">Consensus Logic Simulator</h3>
          <p className="text-xs text-slate-400 font-mono">Module: Trust_Verification_v2.04</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-green-400">{trustScore}%</div>
          <div className="text-[10px] uppercase tracking-tighter text-slate-500">Integrity Score</div>
        </div>
      </div>

      {/* THE LIVE BAR */}
      <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700">
        <div 
          className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all duration-1000 ease-in-out"
          style={{ width: `${trustScore}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* LOG OUTPUT - Fixed height to prevent layout shift */}
        <div className="bg-black/50 p-4 rounded-lg border border-slate-700 font-mono text-[11px] min-h-[120px]">
          <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1">System Log:</div>
          <div className="text-green-400 animate-pulse">● {status}</div>
          <div className="min-h-[60px]">
            {sources.map((s, idx) => (
              <div key={idx} className="text-slate-300 mt-1">› {s}</div>
            ))}
            {/* Invisible placeholder to maintain height when sources < 3 */}
            {sources.length < 3 && (
              <>
                {Array.from({ length: 3 - sources.length }).map((_, idx) => (
                  <div key={`placeholder-${idx}`} className="text-transparent mt-1">› </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* SPONTANEITY PERMISSION - Fixed height to prevent layout shift */}
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col justify-center items-center text-center min-h-[120px]">
          <span className="text-[10px] uppercase text-slate-400 mb-2">Engine Recommendation</span>
          <div className="min-h-[40px] flex items-center justify-center">
            {trustScore > 90 ? (
              <div className="text-green-400 font-bold uppercase tracking-widest text-sm animate-bounce">✓ Safe to be Spontaneous</div>
            ) : (
              <div className="text-yellow-500 font-bold uppercase tracking-widest text-sm italic">Hold: Validating Pulse...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalDemo;
