"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Layers, 
  Search,
  Filter
} from 'lucide-react';
import { TOOLS, CATEGORIES, ToolCategory } from '@/data/tools';
import DynamicIcon from '@/components/DynamicIcon';

export default function TopToolsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = 
      selectedFilter === 'all' ? true :
      selectedFilter === 'popular' ? (tool.badge === 'Popular' || tool.featured) :
      tool.category === selectedFilter;

    const matchesSearch = 
      !filterQuery.trim() ||
      tool.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tool.tags.some(t => t.toLowerCase().includes(filterQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const filterTabs = [
    { id: 'all', label: 'All Tools', icon: Layers },
    { id: 'popular', label: 'Popular', icon: Flame },
    { id: 'pdf', label: 'PDF Tools', icon: DynamicIcon, iconName: 'FileText' },
    { id: 'image', label: 'Image Tools', icon: DynamicIcon, iconName: 'Image' },
    { id: 'text', label: 'Text & Content', icon: DynamicIcon, iconName: 'Type' },
    { id: 'developer', label: 'Code & Dev', icon: DynamicIcon, iconName: 'Code2' },
    { id: 'calculators', label: 'Calculators', icon: DynamicIcon, iconName: 'Calculator' },
    { id: 'ai', label: 'AI Tools', icon: Sparkles },
  ];

  return (
    <section id="tools-grid" className="py-16 md:py-24 relative bg-[#090a0f]">
      
      {/* Background Subtle Gradient */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Suite Explorer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured & Top Utilities
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Choose from our curated lineup of instant, web-based tools designed with zero compromise on privacy and speed.
            </p>
          </div>

          {/* Inline Filter Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter these tools..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-[#11131d] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/40"
            />
          </div>
        </div>

        {/* Category Tabs Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-lg shadow-orange-500/20 border-transparent'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.icon === DynamicIcon && tab.iconName ? (
                  <DynamicIcon name={tab.iconName} size={15} />
                ) : (
                  // @ts-ignore
                  <tab.icon className="w-4 h-4" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#10121b] border border-white/10 hover:border-orange-500/40 hover:bg-[#151825] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 overflow-hidden"
            >
              {/* Card Ambient Hover Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/0 group-hover:bg-orange-500/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-rose-600 group-hover:text-white transition-all duration-300 shadow-md">
                    <DynamicIcon name={tool.iconName} size={22} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                      {tool.categoryName.split(' ')[0]}
                    </span>
                    {tool.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        tool.badge === 'Popular' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                        tool.badge === 'AI Powered' ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' :
                        'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title and Short Description */}
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {tool.shortDescription}
                </p>
              </div>

              {/* Card Footer: Tags & Action Button */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Free Instant Tool</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-orange-400 group-hover:text-orange-300">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No matching tools found</h3>
            <p className="text-sm text-slate-400 mt-1">Try another search term or reset your category filter.</p>
            <button
              onClick={() => { setSelectedFilter('all'); setFilterQuery(''); }}
              className="mt-4 px-4 py-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-xl text-xs font-bold hover:bg-orange-500/20"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
