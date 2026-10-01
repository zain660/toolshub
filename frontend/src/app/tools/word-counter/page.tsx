"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { FileSpreadsheet, Clock, Volume2, Share2, Copy, Check, Trash2 } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState(
    "ToolsHub is an all-in-one productivity and developer utilities suite built with high speed and zero tracking. You can analyze word frequency, check character limits, and polish copy instantly."
  );
  const [copied, setCopied] = useState(false);

  // Calculations
  const words = text.trim() ? (text.trim().match(/\S+/g) || []).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? (text.split(/[.!?]+/).filter(s => s.trim().length > 0)).length : 0;
  const paragraphs = text.trim() ? (text.split(/\n+/).filter(p => p.trim().length > 0)).length : 0;

  const readingTimeMin = (words / 225).toFixed(1);
  const speakingTimeMin = (words / 140).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ToolLayout slug="word-counter">
      <div className="space-y-6">
        
        {/* Top 6 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Words</span>
            <p className="text-2xl font-black text-white mt-1">{words}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Characters</span>
            <p className="text-2xl font-black text-orange-400 mt-1">{charsWithSpaces}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">No Spaces</span>
            <p className="text-2xl font-black text-amber-400 mt-1">{charsNoSpaces}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Sentences</span>
            <p className="text-2xl font-black text-rose-400 mt-1">{sentences}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Paragraphs</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">{paragraphs}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Reading Time</span>
            <p className="text-2xl font-black text-cyan-400 mt-1">~{readingTimeMin}m</p>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span>Type or paste your text</span>
            <div className="flex items-center gap-3">
              <button onClick={handleCopy} className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button onClick={() => setText('')} className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="Type or paste any content here..."
            className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-5 text-sm sm:text-base text-white focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Social Media Character Limit Indicators */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Social Media Length Check</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Twitter / X */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-white">Twitter / X Post</span>
                <span className={charsWithSpaces > 280 ? 'text-rose-400 font-bold font-mono' : 'text-slate-400 font-mono'}>
                  {charsWithSpaces} / 280
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${charsWithSpaces > 280 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                  style={{ width: `${Math.min(100, (charsWithSpaces / 280) * 100)}%` }}
                />
              </div>
            </div>

            {/* Instagram Caption */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-white">Instagram Caption</span>
                <span className="text-slate-400 font-mono">{charsWithSpaces} / 2200</span>
              </div>
              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-500 rounded-full"
                  style={{ width: `${Math.min(100, (charsWithSpaces / 2200) * 100)}%` }}
                />
              </div>
            </div>

            {/* LinkedIn Post */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-white">LinkedIn Post</span>
                <span className="text-slate-400 font-mono">{charsWithSpaces} / 3000</span>
              </div>
              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${Math.min(100, (charsWithSpaces / 3000) * 100)}%` }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
