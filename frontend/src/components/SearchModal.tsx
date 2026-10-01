"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS } from '@/data/tools';
import DynamicIcon from './DynamicIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools = TOOLS.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    t.categoryName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#11131d] border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden shadow-orange-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-4 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-orange-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search all 30+ tools by name, tag, keyword (e.g. compress, pdf, json, md5)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs bg-white/10 text-slate-400 rounded-md hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group border border-transparent hover:border-orange-500/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <DynamicIcon name={tool.iconName} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {tool.name}
                      </span>
                      {tool.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 group-hover:text-orange-400">
                  <span className="text-xs hidden sm:inline text-slate-400">{tool.categoryName}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <Sparkles className="w-8 h-8 text-orange-400/40 mx-auto mb-3" />
              <p className="text-slate-300 font-medium">No tools found for "{query}"</p>
              <p className="text-slate-400 text-xs mt-1">Try searching for keywords like "pdf", "image", "hash", "calc", or "text"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-mono text-slate-300">Tab</kbd>
            <span>or</span>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-mono text-slate-300">↑↓</kbd>
            <span>to navigate</span>
          </div>
          <span className="text-orange-400 font-medium">{filteredTools.length} tools available</span>
        </div>
      </div>
    </div>
  );
}
