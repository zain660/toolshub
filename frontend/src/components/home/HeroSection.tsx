"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { TOOLS } from '@/data/tools';
import DynamicIcon from '@/components/DynamicIcon';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const searchResults = searchQuery.trim() 
    ? TOOLS.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const trendingTags = [
    { name: 'Merge PDF', slug: 'merge-pdf' },
    { name: 'Compress Image', slug: 'compress-image' },
    { name: 'JSON to CSV', slug: 'json-csv-converter' },
    { name: 'QR Generator', slug: 'qr-code-generator' },
    { name: 'AI Rewriter', slug: 'ai-text-rewriter' },
    { name: 'Remove Duplicates', slug: 'remove-duplicate-lines' }
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      
      {/* Radial Orange Glow Ambient Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-rose-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-rose-500/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-orange-500/10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>30+ High-Performance Online Tools</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          <span className="text-slate-300 font-normal">100% Free Forever</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Supercharge Your Workflow with{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-rose-500 bg-clip-text text-transparent">
            Instant, Private Utilities
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Compress images, merge & split PDFs, format code, clean text data, calculate finances, and accelerate writing with AI. No sign-ups, no file storage, zero latency.
        </p>

        {/* Interactive Search Bar in Hero */}
        <div className="mt-10 max-w-2xl mx-auto relative">
          <div className={`relative flex items-center bg-[#11131e]/90 border rounded-2xl p-2 shadow-2xl transition-all duration-300 ${
            isFocused 
              ? 'border-orange-500/60 shadow-orange-500/20 ring-2 ring-orange-500/20' 
              : 'border-white/10 hover:border-white/20'
          }`}>
            <Search className="w-6 h-6 text-orange-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by tool name, format, or task (e.g., merge pdf, compress, json)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full bg-transparent px-3 py-2 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-white/5 rounded-lg mr-2"
              >
                Clear
              </button>
            )}
            <Link
              href="#tools-grid"
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 text-white text-sm font-bold shadow-lg shadow-orange-500/30 hover:opacity-95 shrink-0 transition-transform active:scale-95"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Autocomplete Dropdown Preview in Hero */}
          {isFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0f111a] border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden z-30 text-left p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
              {searchResults.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <DynamicIcon name={tool.iconName} size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-orange-400 flex items-center gap-2">
                        {tool.name}
                        {tool.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 font-medium">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{tool.shortDescription}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Trending Chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1 font-semibold text-slate-300">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Popular:
          </span>
          {trendingTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tools/${tag.slug}`}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/30 text-slate-300 hover:text-orange-400 transition-all"
            >
              {tag.name}
            </Link>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Free Forever</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <Lock className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Zero Data Storage</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Client-Side Speed</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
            <span>No Account Needed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
