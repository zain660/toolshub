import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES, TOOLS } from '@/data/tools';
import DynamicIcon from '@/components/DynamicIcon';

export default function CategoryExplorerSection() {
  return (
    <section className="py-16 md:py-24 bg-[#07080d] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Suites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore by Category
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every utility you need organized neatly into dedicated workspaces for developers, creators, and professionals.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS.filter(t => t.category === cat.id);
            return (
              <div
                key={cat.id}
                id={`category-${cat.id}`}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#0e1019] border border-white/10 hover:border-orange-500/40 hover:bg-[#131624] transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-rose-600 group-hover:text-white transition-all duration-300">
                      <DynamicIcon name={cat.iconName} size={28} />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {catTools.length} Tools
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-orange-400/90">
                    {cat.tagline}
                  </p>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Sample Tool Pills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {catTools.slice(0, 4).map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/5 hover:border-orange-500/30 text-slate-300 hover:text-orange-300 transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                    {catTools.length > 4 && (
                      <span className="text-xs px-2 py-1 text-slate-400">
                        +{catTools.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t border-white/5">
                  <Link
                    href={`/tools/${catTools[0]?.slug || ''}`}
                    className="flex items-center justify-between text-xs font-bold text-orange-400 hover:text-orange-300 group/link"
                  >
                    <span>Launch {cat.name} Suite</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
