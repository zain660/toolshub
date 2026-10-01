"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Wand2, Sparkles, Copy, Check, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AiTextRewriterPage() {
  const [input, setInput] = useState(
    "We need to create a fast and powerful website that helps developers and designers with their everyday tasks without asking them to pay money or make an account."
  );
  const [tone, setTone] = useState<'professional' | 'creative' | 'concise' | 'casual' | 'academic'>('professional');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const synonymMap: { [key: string]: { [key: string]: string } } = {
    professional: {
      'fast': 'high-performance',
      'powerful': 'robust',
      'helps': 'empowers',
      'developers': 'engineers and technical teams',
      'everyday tasks': 'daily workflows',
      'pay money': 'require subscription fees',
      'make an account': 'mandatory registration',
      'need to': 'must endeavor to',
      'good': 'exceptional',
      'big': 'substantial'
    },
    creative: {
      'fast': 'lightning-quick',
      'powerful': 'magical',
      'helps': 'sparks joy for',
      'developers': 'builders and digital artisans',
      'everyday tasks': 'creative pursuits',
      'pay money': 'costing a single cent',
      'make an account': 'any login friction',
      'need to': 'are inspired to'
    },
    concise: {
      'We need to create': 'We will build',
      'fast and powerful': 'an efficient',
      'that helps developers and designers with their everyday tasks': 'for developers and designers',
      'without asking them to pay money or make an account': 'with free, instant access'
    },
    casual: {
      'We need to create': 'Let\'s build',
      'fast and powerful': 'super slick',
      'helps': 'gives a hand to',
      'everyday tasks': 'daily grind',
      'pay money': 'spending a dime',
      'make an account': 'signing up'
    },
    academic: {
      'We need to create': 'It is imperative to synthesize',
      'fast and powerful': 'an expedited and computationally proficient',
      'helps': 'facilitates productivity for',
      'everyday tasks': 'operational procedures',
      'pay money': 'monetary compensation',
      'make an account': 'user authentication'
    }
  };

  const handleRewrite = () => {
    if (!input.trim()) return;
    setLoading(true);

    setTimeout(() => {
      let result = input;
      const dict = synonymMap[tone] || {};

      Object.entries(dict).forEach(([key, val]) => {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        result = result.replace(regex, val);
      });

      if (tone === 'concise') {
        result = result.replace(/in order to/gi, 'to').replace(/due to the fact that/gi, 'because');
      }

      setOutput(result);
      setLoading(false);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones = [
    { id: 'professional', label: 'Professional & Business' },
    { id: 'creative', label: 'Creative & Engaging' },
    { id: 'concise', label: 'Concise & Direct (TL;DR)' },
    { id: 'casual', label: 'Casual & Friendly' },
    { id: 'academic', label: 'Academic & Formal' }
  ];

  return (
    <ToolLayout slug="ai-text-rewriter">
      <div className="space-y-6">
        
        {/* Tone Selector */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1">Tone:</span>
            {tones.map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  tone === t.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleRewrite}
            disabled={loading || !input.trim()}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            <span>{loading ? 'Rewriting Text...' : 'AI Rewrite'}</span>
          </button>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Original Text</span>
              <button onClick={() => { setInput(''); setOutput(''); }} className="text-rose-400 hover:text-rose-300 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder="Paste original text here..."
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-5 text-sm sm:text-base text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="text-emerald-400">Rewritten Output ({tone})</span>
              <button onClick={handleCopy} disabled={!output} className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold disabled:opacity-30">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Output'}</span>
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={12}
              placeholder="Rewritten text will appear here automatically..."
              className="w-full bg-[#0a0c14] border border-emerald-500/30 rounded-2xl p-5 text-sm sm:text-base text-emerald-200 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
