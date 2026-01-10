'use client';

import React from 'react';
import { Shield, FileCheck, Globe, Clock, Fingerprint } from 'lucide-react';

const VerificationPDFMockup = () => {
  return (
    <div className="bg-white min-h-screen p-12 max-w-4xl mx-auto shadow-2xl border border-gray-200 font-serif text-gray-900 relative overflow-hidden">
      {/* MOCKUP WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-12">
        <h1 className="text-9xl font-bold uppercase">Mockup Concept</h1>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase">Spontaneity Engine™</h1>
          <p className="text-xs font-sans text-slate-500 uppercase">Provenance & Integrity Verification Report</p>
        </div>
        <div className="text-right">
          <div className="bg-slate-900 text-white px-3 py-1 text-[10px] font-bold rounded">REF-PRO-8829-X</div>
          <p className="text-[10px] font-sans mt-1 text-slate-400 font-mono">Timestamp: 2026-01-10T15:45:02Z</p>
        </div>
      </div>

      {/* DEMO PURPOSES NOTE */}
      <div className="mb-6 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r">
        <p className="text-[10px] font-sans text-amber-800 font-semibold uppercase tracking-wide">
          ⚠️ For Demo Purposes Only — Conceptual Mockup
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4 mb-8 font-sans">
        <div className="p-4 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Entity Name</span>
          <p className="text-sm font-bold">The Blue Note Pop-up</p>
        </div>
        <div className="p-4 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Integrity Score</span>
          <p className="text-sm font-bold text-emerald-600">98% (High Confidence)</p>
        </div>
        <div className="p-4 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Verification Level</span>
          <p className="text-sm font-bold flex items-center gap-1"><Shield size={14}/> Tier 1 Expert</p>
        </div>
      </div>

      {/* AUDIT BODY */}
      <div className="space-y-6 font-sans">
        <div>
          <h3 className="text-xs font-bold uppercase border-b border-slate-200 pb-1 mb-3">1. Data Provenance Chain</h3>
          <table className="w-full text-[11px]">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="pb-2">Source Node</th>
                <th className="pb-2">Retrieval Method</th>
                <th className="pb-2 text-right">TTL/Freshness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2 font-bold">OpenStreetMap API</td>
                <td className="py-2">REST v2 (Encrypted)</td>
                <td className="py-2 text-right">0m 42s ago</td>
              </tr>
              <tr>
                <td className="py-2 font-bold">Twitter Social Stream</td>
                <td className="py-2">Real-time Firehose</td>
                <td className="py-2 text-right">2m 15s ago</td>
              </tr>
              <tr>
                <td className="py-2 font-bold">Instagram Places</td>
                <td className="py-2">Geotag Extraction</td>
                <td className="py-2 text-right">14m 02s ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase border-b border-slate-200 pb-1 mb-3">2. Conflict Resolution Analysis</h3>
          <div className="p-4 bg-slate-50 rounded text-[11px] leading-relaxed italic border-l-4 border-slate-300">
            "System identified conflict: Google Business API returned 'Permanently Closed'. Cross-validation via Social Stream and OSM activity (4 independent geotags in last 30 mins) triggered override. Conflict resolved in favor of Real-time activity. Liability coverage confirmed."
          </div>
        </div>
      </div>

      {/* FOOTER / SEALS */}
      <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2">
        <div className="flex items-center gap-4">
          <Fingerprint size={40} className="text-slate-300" />
          <div className="text-[9px] text-slate-400 uppercase font-sans">
            <p>Digital Signature Verified</p>
            <p className="font-mono">HASH: e3b0c44298fc1c149afbf4c8996fb</p>
          </div>
        </div>
        <div className="text-right flex justify-end gap-2">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500 rotate-12">
            <span className="text-[8px] font-bold uppercase leading-tight">Authentic<br/>Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPDFMockup;
