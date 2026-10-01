"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { BarChart3, Filter, BookOpen, Clock, FileText, Sparkles } from 'lucide-react';

export default function KeywordDensityPage() {
  const [text, setText] = useState(
    "Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. High quality SEO content requires natural keyword density, comprehensive topic coverage, and fast page load speeds."
  );
  const [ngram, setNgram] = useState<1 | 2 | 3>(1);
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);

  const STOP_WORDS = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
    'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could',
    'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
    'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is',
    'it', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on',
    'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should',
    'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
    'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
    'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself'
  ]);

  // Clean and parse words
  const rawWords = text.toLowerCase().match(/\b[\w'-]+\b/g) || [];
  const totalWords = rawWords.length;
  const charsCount = text.length;
  const readingTimeMin = Math.max(1, Math.ceil(totalWords / 225));

  // Compute n-grams
  const frequencyMap: { [key: string]: number } = {};

  if (ngram === 1) {
    rawWords.forEach(w => {
      if (ignoreStopWords && STOP_WORDS.has(w)) return;
      if (w.length < 2) return;
      frequencyMap[w] = (frequencyMap[w] || 0) + 1;
    });
  } else if (ngram === 2) {
    for (let i = 0; i < rawWords.length - 1; i++) {
      const phrase = `${rawWords[i]} ${rawWords[i + 1]}`;
      if (ignoreStopWords && (STOP_WORDS.has(rawWords[i]) && STOP_WORDS.has(rawWords[i + 1]))) continue;
      frequencyMap[phrase] = (frequencyMap[phrase] || 0) + 1;
    }
  } else if (ngram === 3) {
    for (let i = 0; i < rawWords.length - 2; i++) {
      const phrase = `${rawWords[i]} ${rawWords[i + 1]} ${rawWords[i + 2]}`;
      frequencyMap[phrase] = (frequencyMap[phrase] || 0) + 1;
    }
  }

  const sortedKeywords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  return (
    <ToolLayout slug="keyword-density-checker">
      <div className="space-y-6">
        
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Words</span>
            <p className="text-2xl font-black text-white mt-1">{totalWords}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-400 font-semibold uppercase">Characters</span>
            <p className="text-2xl font-black text-orange-400 mt-1">{charsCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-400 font-semibold uppercase">Unique Keywords</span>
            <p className="text-2xl font-black text-amber-400 mt-1">{Object.keys(frequencyMap).length}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-400 font-semibold uppercase">Reading Time</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">~{readingTimeMin} min</p>
          </div>
        </div>

        {/* Controls & N-gram Tabs */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase mr-2">Phrase Length:</span>
            {[
              { id: 1, label: '1-Word Keywords' },
              { id: 2, label: '2-Word Phrases' },
              { id: 3, label: '3-Word Phrases' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setNgram(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  ngram === tab.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreStopWords}
              onChange={(e) => setIgnoreStopWords(e.target.checked)}
              className="rounded accent-orange-500 w-4 h-4"
            />
            <span>Filter Out Common Stop Words</span>
          </label>
        </div>

        {/* Two Columns: Text Input & Frequency Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Input Text Area */}
          <div className="lg:col-span-6 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Input Article or Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={14}
              placeholder="Paste article, blog post, or page copy to analyze..."
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-4 text-sm text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Keyword Frequency Table */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0a0c14] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Top Detected Keywords</span>
                <span className="text-xs font-bold text-slate-400 uppercase">Count / Density</span>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {sortedKeywords.map(([word, count]) => {
                  const pct = totalWords > 0 ? ((count / totalWords) * 100).toFixed(1) : '0';
                  return (
                    <div key={word} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200 capitalize">{word}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-white font-bold">{count}x</span>
                          <span className="text-orange-400 font-bold">({pct}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                          style={{ width: `${Math.min(100, Number(pct) * 10)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                {sortedKeywords.length === 0 && (
                  <p className="text-center text-slate-400 text-xs py-8">
                    Type or paste text on the left to see keyword density calculations.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
              <span>💡 Ideal target keyword density for SEO is 1.0% – 2.5%</span>
            </div>
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
