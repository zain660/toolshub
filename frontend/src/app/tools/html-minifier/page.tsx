"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Code, Copy, Check, Download, Sparkles, Trash2, Sliders } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function HtmlMinifierPage() {
  const [input, setInput] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character set configuration -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToolsHub Utility Sample</title>
</head>
<body>
    <div class="container main-content">
        <h1>Welcome to ToolsHub</h1>
        <p>High performance online tools suite.</p>
    </div>
</body>
</html>`);

  const [removeComments, setRemoveComments] = useState(true);
  const [collapseWhitespace, setCollapseWhitespace] = useState(true);
  const [copied, setCopied] = useState(false);

  // Minify logic
  let minified = input;
  if (removeComments) {
    minified = minified.replace(/<!--[\s\S]*?-->/g, '');
  }
  if (collapseWhitespace) {
    minified = minified
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  const origBytes = new Blob([input]).size;
  const minBytes = new Blob([minified]).size;
  const reductionPercent = origBytes > 0 ? Math.max(0, Math.round(((origBytes - minBytes) / origBytes) * 100)) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([minified], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.html';
    a.click();
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <ToolLayout slug="html-minifier">
      <div className="space-y-6">
        
        {/* Top Control Bar & Stats */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeComments}
                onChange={(e) => setRemoveComments(e.target.checked)}
                className="rounded accent-orange-500 w-4 h-4"
              />
              <span>Strip HTML Comments</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={collapseWhitespace}
                onChange={(e) => setCollapseWhitespace(e.target.checked)}
                className="rounded accent-orange-500 w-4 h-4"
              />
              <span>Collapse Whitespace & Newlines</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {reductionPercent}% Size Reduction ({formatBytes(origBytes)} ➔ {formatBytes(minBytes)})
            </span>
          </div>
        </div>

        {/* Editor Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Original HTML ({formatBytes(origBytes)})</span>
              <button onClick={() => setInput('')} className="text-rose-400 hover:text-rose-300 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={14}
              placeholder="Paste HTML source code here..."
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-4 text-xs font-mono text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="text-emerald-400">Minified Output ({formatBytes(minBytes)})</span>
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button onClick={handleDownload} className="text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold">
                  <Download className="w-3.5 h-3.5" /> Download .html
                </button>
              </div>
            </div>
            <textarea
              value={minified}
              readOnly
              rows={14}
              className="w-full bg-[#0a0c14] border border-emerald-500/30 rounded-2xl p-4 text-xs font-mono text-emerald-300 focus:outline-none resize-none leading-relaxed"
            />
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
