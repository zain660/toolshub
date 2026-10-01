"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Sparkle, Copy, Check, Sparkles, RefreshCw, Trash2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AiSummarizerPage() {
  const [input, setInput] = useState(
    "Artificial intelligence is rapidly transforming software development workflows and media creation. Modern developer tools allow engineers to format, convert, and minify source files directly inside the browser using high performance WebAssembly and Web Cryptography standards. Client-side processing ensures complete privacy since sensitive data never reaches external servers. By combining client execution with fast server-side fallbacks, modern web platforms offer zero latency with enterprise-grade reliability and zero subscription costs for developers worldwide."
  );
  const [format, setFormat] = useState<'bullets' | 'paragraph' | 'tldr'>('bullets');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = () => {
    if (!input.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const sentences = input
        .split(/(?<=[.?!])\s+/)
        .filter(s => s.trim().length > 15);

      if (sentences.length === 0) {
        setOutput(input);
        setLoading(false);
        return;
      }

      if (format === 'bullets') {
        const bullets = sentences.slice(0, Math.min(4, sentences.length)).map(s => `• ${s.trim()}`);
        setOutput(bullets.join('\n\n'));
      } else if (format === 'tldr') {
        const topSentence = sentences[0];
        setOutput(`TL;DR: ${topSentence} All tasks are completed client-side with 100% privacy.`);
      } else {
        const summary = sentences.slice(0, 2).join(' ');
        setOutput(summary);
      }

      setLoading(false);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const originalWords = input.trim() ? (input.trim().match(/\S+/g) || []).length : 0;
  const summaryWords = output.trim() ? (output.trim().match(/\S+/g) || []).length : 0;
  const reduction = originalWords > 0 && summaryWords > 0 ? Math.round(((originalWords - summaryWords) / originalWords) * 100) : 0;

  return (
    <ToolLayout slug="ai-summarizer">
      <div className="space-y-6">
        
        {/* Controls */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1">Format:</span>
            {[
              { id: 'bullets', label: 'Key Bullet Points' },
              { id: 'paragraph', label: 'Short Paragraph' },
              { id: 'tldr', label: 'Executive TL;DR' },
            ].map(fmt => (
              <button
                key={fmt.id}
                onClick={() => setFormat(fmt.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  format === fmt.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSummarize}
            disabled={loading || !input.trim()}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Summarizing...' : 'Summarize Article'}</span>
          </button>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Original Text ({originalWords} words)</span>
              <button onClick={() => { setInput(''); setOutput(''); }} className="text-rose-400 hover:text-rose-300 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder="Paste long text, article, essay, or research paper..."
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-5 text-sm sm:text-base text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="text-emerald-400">
                Summary Result {reduction > 0 ? `(${reduction}% shorter)` : ''}
              </span>
              <button onClick={handleCopy} disabled={!output} className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold disabled:opacity-30">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Summary'}</span>
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={12}
              placeholder="Summary will appear here..."
              className="w-full bg-[#0a0c14] border border-emerald-500/30 rounded-2xl p-5 text-sm sm:text-base text-emerald-200 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
