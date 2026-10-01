"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Share2, 
  Bookmark, 
  HelpCircle, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  ChevronDown
} from 'lucide-react';
import { getToolBySlug, TOOLS, CATEGORIES, ToolItem } from '@/data/tools';
import DynamicIcon from './DynamicIcon';
import confetti from 'canvas-confetti';

interface ToolLayoutProps {
  slug: string;
  children: React.ReactNode;
}

export default function ToolLayout({ slug, children }: ToolLayoutProps) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tool: ToolItem = getToolBySlug(slug) || {
    id: slug,
    slug,
    name: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Free online tool by ToolsHub.',
    description: 'Use our free tool online with zero signup, instant processing, and 100% privacy.',
    category: 'developer',
    categoryName: 'Utilities',
    iconName: 'Wrench',
    tags: [slug],
    features: ['Instant processing', '100% Client-side safe', 'Zero signup required'],
    faq: [
      { question: 'Is this tool free?', answer: 'Yes, all tools on ToolsHub are completely free forever.' }
    ]
  };

  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen py-10 bg-[#090a0f] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/#category-${tool.category}`} className="hover:text-white transition-colors">
            {tool.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-orange-400 font-medium">{tool.name}</span>
        </nav>

        {/* Tool Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 p-[1.5px] shadow-xl shadow-orange-500/20 shrink-0">
              <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center text-orange-400">
                <DynamicIcon name={tool.iconName} size={28} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {tool.name}
                </h1>
                {tool.badge && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                {tool.description}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isBookmarked 
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' 
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-orange-400' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save Tool'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Interactive Tool Workspace Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e101a] border border-orange-500/20 shadow-2xl shadow-black/60 relative mb-16">
          {children}
        </div>

        {/* Feature Highlights & Privacy Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Private & Client-Side</h4>
              <p className="text-xs text-slate-400 mt-1">Processed securely in memory. No logs, databases, or third-party sharing.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Instant Execution</h4>
              <p className="text-xs text-slate-400 mt-1">Zero queue wait times. Real-time conversion, formatting, and live previews.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Free Without Limits</h4>
              <p className="text-xs text-slate-400 mt-1">Unlimited usage forever. No credit cards, trial locks, or output watermarks.</p>
            </div>
          </div>
        </div>

        {/* Tool Key Features List */}
        {tool.features && tool.features.length > 0 && (
          <div className="p-8 rounded-2xl bg-[#0c0e17] border border-white/5 mb-16">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-400" />
              Key Features & Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tool.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tool SEO FAQs */}
        {tool.faq && tool.faq.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-400" />
              Frequently Asked Questions about {tool.name}
            </h3>
            <div className="space-y-3">
              {tool.faq.map((f, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl bg-[#0c0e17] border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-orange-400"
                  >
                    <span>{f.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-orange-400' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {f.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools Recommendation */}
        {relatedTools.length > 0 && (
          <div className="pt-8 border-t border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">More Related Utilities</h3>
              <Link href="/#tools-grid" className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/tools/${rel.slug}`}
                  className="p-5 rounded-2xl bg-[#0f111a] border border-white/5 hover:border-orange-500/30 hover:bg-[#141624] transition-all group flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                    <DynamicIcon name={rel.iconName} size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {rel.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
