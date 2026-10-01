"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Fingerprint, Copy, Check, Download, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UuidGeneratorPage() {
  const [count, setCount] = useState<number>(5);
  const [withHyphens, setWithHyphens] = useState<boolean>(true);
  const [isUpper, setIsUpper] = useState<boolean>(false);
  const [withBraces, setWithBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let u = window.crypto.randomUUID ? window.crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

      if (!withHyphens) u = u.replace(/-/g, '');
      if (isUpper) u = u.toUpperCase();
      if (withBraces) u = `{${u}}`;
      list.push(u);
    }
    setUuids(list);
  };

  React.useEffect(() => {
    generateUuids();
  }, [count, withHyphens, isUpper, withBraces]);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids_${uuids.length}.txt`;
    a.click();
  };

  return (
    <ToolLayout slug="uuid-generator">
      <div className="space-y-6">
        
        {/* Controls Bar */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Quantity Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">Count:</span>
              {[1, 5, 10, 25, 50].map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    count === n
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Checkbox Options */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withHyphens}
                  onChange={(e) => setWithHyphens(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4"
                />
                <span>Hyphens</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUpper}
                  onChange={(e) => setIsUpper(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4"
                />
                <span>UPPERCASE</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withBraces}
                  onChange={(e) => setWithBraces(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4"
                />
                <span>Braces &#123;&#125;</span>
              </label>
            </div>

            {/* Regenerate Button */}
            <button
              onClick={generateUuids}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 text-white text-xs font-bold flex items-center gap-2 shadow-md hover:opacity-95"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Regenerate
            </button>
          </div>
        </div>

        {/* Generated UUIDs List */}
        <div className="p-6 rounded-2xl bg-[#0a0c14] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Generated UUID v4 ({uuids.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAll}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'All Copied' : 'Copy All'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download .txt
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {uuids.map((u, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-orange-500/30 font-mono text-xs text-slate-200 transition-all group"
              >
                <span className="truncate">{u}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(u);
                  }}
                  className="text-slate-400 hover:text-orange-400 p-1 opacity-60 group-hover:opacity-100 transition-opacity"
                  title="Copy this UUID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
