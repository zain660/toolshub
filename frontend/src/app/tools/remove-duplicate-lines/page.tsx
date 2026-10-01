"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Copy, Check, Trash2, ArrowUpDown, Filter, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RemoveDuplicateLinesPage() {
  const [input, setInput] = useState(`apple\norange\nbanana\napple\ngrapes\norange\nwatermelon\nbanana\napple`);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [copied, setCopied] = useState(false);

  // Process text
  let lines = input.split('\n');
  const originalCount = lines.length;

  if (trimWhitespace) {
    lines = lines.map(l => l.trim());
  }

  if (removeEmpty) {
    lines = lines.filter(l => l.length > 0);
  }

  const seen = new Set<string>();
  const uniqueLines: string[] = [];

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueLines.push(line);
    }
  }

  if (sortOrder === 'asc') {
    uniqueLines.sort((a, b) => a.localeCompare(b));
  } else if (sortOrder === 'desc') {
    uniqueLines.sort((a, b) => b.localeCompare(a));
  }

  const output = uniqueLines.join('\n');
  const duplicatesRemoved = originalCount - uniqueLines.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned_unique_lines.txt';
    a.click();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <ToolLayout slug="remove-duplicate-lines">
      <div className="space-y-6">
        
        {/* Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded accent-orange-500 w-4 h-4"
              />
              <span>Case Sensitive</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={trimWhitespace}
                onChange={(e) => setTrimWhitespace(e.target.checked)}
                className="rounded accent-orange-500 w-4 h-4"
              />
              <span>Trim Whitespace</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeEmpty}
                onChange={(e) => setRemoveEmpty(e.target.checked)}
                className="rounded accent-orange-500 w-4 h-4"
              />
              <span>Strip Empty Lines</span>
            </label>

            <div className="flex items-center gap-1.5 ml-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-orange-400" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
              >
                <option value="none">Original Order</option>
                <option value="asc">Sort A ➔ Z</option>
                <option value="desc">Sort Z ➔ A</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {duplicatesRemoved} Duplicates Removed
            </span>
          </div>
        </div>

        {/* Text Areas Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Original Text ({originalCount} lines)</span>
              <button 
                onClick={() => setInput('')} 
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your lines here..."
              rows={14}
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-4 text-sm font-mono text-white focus:outline-none resize-none"
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="text-emerald-400">Clean Unique Text ({uniqueLines.length} lines)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" /> Export .txt
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={14}
              className="w-full bg-[#0a0c14] border border-emerald-500/30 rounded-2xl p-4 text-sm font-mono text-emerald-300 focus:outline-none resize-none"
            />
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
