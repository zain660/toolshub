"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Percent, ArrowRight, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

export default function PercentageCalculatorPage() {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<string>('15');
  const [m1Y, setM1Y] = useState<string>('250');

  // Mode 2: X is what % of Y?
  const [m2X, setM2X] = useState<string>('45');
  const [m2Y, setM2Y] = useState<string>('180');

  // Mode 3: Increase/Decrease from X to Y
  const [m3X, setM3X] = useState<string>('80');
  const [m3Y, setM3Y] = useState<string>('120');

  // Mode 4: Add/Subtract X% to Y
  const [m4X, setM4X] = useState<string>('20');
  const [m4Y, setM4Y] = useState<string>('150');

  // Computations
  const r1 = (Number(m1X) * Number(m1Y)) / 100;
  const r2 = Number(m2Y) !== 0 ? (Number(m2X) / Number(m2Y)) * 100 : 0;
  const r3 = Number(m3X) !== 0 ? ((Number(m3Y) - Number(m3X)) / Number(m3X)) * 100 : 0;
  const r4Add = Number(m4Y) + (Number(m4Y) * (Number(m4X) / 100));
  const r4Sub = Number(m4Y) - (Number(m4Y) * (Number(m4X) / 100));

  return (
    <ToolLayout slug="percentage-calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: What is X% of Y? */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 hover:border-orange-500/30 transition-all space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Percent className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">What is X% of Y?</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span>What is</span>
            <input
              type="number"
              value={m1X}
              onChange={(e) => setM1X(e.target.value)}
              className="w-20 bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
            <span>% of</span>
            <input
              type="number"
              value={m1Y}
              onChange={(e) => setM1Y(e.target.value)}
              className="w-24 bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
            <span>?</span>
          </div>

          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
            <span className="text-xs text-orange-300 uppercase font-bold">Result</span>
            <span className="text-2xl font-black text-orange-400 font-mono">
              {!isNaN(r1) ? r1.toFixed(2) : '0.00'}
            </span>
          </div>
        </div>

        {/* Card 2: X is what % of Y? */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 hover:border-orange-500/30 transition-all space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Percent className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">X is What % of Y?</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="number"
              value={m2X}
              onChange={(e) => setM2X(e.target.value)}
              className="w-20 bg-black/40 border border-white/15 focus:border-amber-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={m2Y}
              onChange={(e) => setM2Y(e.target.value)}
              className="w-24 bg-black/40 border border-white/15 focus:border-amber-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
            <span>?</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
            <span className="text-xs text-amber-300 uppercase font-bold">Percentage</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {!isNaN(r2) ? r2.toFixed(2) : '0.00'}%
            </span>
          </div>
        </div>

        {/* Card 3: % Increase or Decrease */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 hover:border-rose-500/30 transition-all space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            {r3 >= 0 ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-rose-400" />}
            <h3 className="text-sm font-bold text-white">Percentage Change (Increase / Decrease)</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span>From</span>
            <input
              type="number"
              value={m3X}
              onChange={(e) => setM3X(e.target.value)}
              className="w-24 bg-black/40 border border-white/15 focus:border-rose-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
            <span>to</span>
            <input
              type="number"
              value={m3Y}
              onChange={(e) => setM3Y(e.target.value)}
              className="w-24 bg-black/40 border border-white/15 focus:border-rose-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            r3 >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'
          }`}>
            <span className="text-xs uppercase font-bold text-slate-300">
              {r3 >= 0 ? 'Increase' : 'Decrease'}
            </span>
            <span className={`text-2xl font-black font-mono ${r3 >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {r3 >= 0 ? '+' : ''}{!isNaN(r3) ? r3.toFixed(2) : '0.00'}%
            </span>
          </div>
        </div>

        {/* Card 4: Add / Subtract X% */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 hover:border-cyan-500/30 transition-all space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Add / Subtract % to Value</h3>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="number"
              value={m4X}
              onChange={(e) => setM4X(e.target.value)}
              className="w-20 bg-black/40 border border-white/15 focus:border-cyan-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
            <span>% on Value</span>
            <input
              type="number"
              value={m4Y}
              onChange={(e) => setM4Y(e.target.value)}
              className="w-24 bg-black/40 border border-white/15 focus:border-cyan-500 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Add (+{m4X}%)</span>
              <p className="text-lg font-black text-cyan-400 font-mono mt-0.5">{r4Add.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Subtract (-{m4X}%)</span>
              <p className="text-lg font-black text-rose-400 font-mono mt-0.5">{r4Sub.toFixed(2)}</p>
            </div>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
