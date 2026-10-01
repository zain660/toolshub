"use client";

import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Binary, Copy, Check, KeyRound, Sparkles } from 'lucide-react';

export default function HashGeneratorPage() {
  const [input, setInput] = useState('ToolsHub Secure Hashing');
  const [isUpper, setIsUpper] = useState(false);
  const [hashes, setHashes] = useState<{ [key: string]: string }>({
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
    'SHA-1': ''
  });
  const [copiedAlgo, setCopiedAlgo] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setHashes({ 'SHA-256': '', 'SHA-384': '', 'SHA-512': '', 'SHA-1': '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algos = ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-1'];

    algos.forEach(algo => {
      window.crypto.subtle.digest(algo, data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        if (isUpper) hashHex = hashHex.toUpperCase();
        setHashes(prev => ({ ...prev, [algo]: hashHex }));
      }).catch(err => console.error(err));
    });
  }, [input, isUpper]);

  const handleCopy = (algo: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedAlgo(algo);
    setTimeout(() => setCopiedAlgo(null), 1800);
  };

  return (
    <ToolLayout slug="hash-generator">
      <div className="space-y-6">
        
        {/* Input Area */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-white block">Input Text to Hash</label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isUpper}
                onChange={(e) => setIsUpper(e.target.checked)}
                className="rounded accent-orange-500 w-4 h-4"
              />
              <span>Uppercase Output</span>
            </label>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="Type any password, token, or string to compute checksums..."
            className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-sm font-mono text-white focus:outline-none resize-none"
          />
        </div>

        {/* Calculated Hash Outputs */}
        <div className="space-y-4">
          {Object.entries(hashes).map(([algo, hashVal]) => (
            <div
              key={algo}
              className="p-5 rounded-2xl bg-[#0a0c14] border border-white/10 hover:border-orange-500/30 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-400 font-mono uppercase tracking-wider">
                  {algo} Hash ({hashVal ? hashVal.length * 4 : 0} bits)
                </span>
                <button
                  onClick={() => handleCopy(algo, hashVal)}
                  disabled={!hashVal}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all disabled:opacity-30"
                >
                  {copiedAlgo === algo ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-xs text-slate-200 break-all select-all">
                {hashVal || <span className="text-slate-400 italic">Enter text above to compute {algo} hash</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </ToolLayout>
  );
}
