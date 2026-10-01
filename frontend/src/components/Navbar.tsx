"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  Flame,
  Star,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES, TOOLS, ToolCategory } from '@/data/tools';
import DynamicIcon from './DynamicIcon';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<ToolCategory>('pdf');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const activeCategoryTools = TOOLS.filter(t => t.category === selectedCategoryTab);
  const popularTools = TOOLS.filter(t => t.badge === 'Popular' || t.featured).slice(0, 6);

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#090a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40' 
            : 'bg-[#090a0f]/60 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-rose-600 p-[1.5px] shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-white">Tools</span>
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Hub</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    Pro
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 -mt-0.5 font-medium">Free Online Utility Suite</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              
              {/* Categorized Mega Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeDropdown === 'categories'
                      ? 'bg-white/10 text-orange-400 border border-orange-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span>Explore Tools</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'categories' ? 'rotate-180 text-orange-400' : ''}`} />
                </button>

                {/* Categorized Mega Menu Popover */}
                {activeDropdown === 'categories' && (
                  <div className="absolute top-full left-0 mt-3 w-[740px] bg-[#0f111a] border border-orange-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-12 divide-x divide-white/5">
                      
                      {/* Left: Category Tabs */}
                      <div className="col-span-5 p-3 bg-white/[0.02] space-y-1">
                        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                          Tool Categories
                        </div>
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onMouseEnter={() => setSelectedCategoryTab(cat.id)}
                            onClick={() => setSelectedCategoryTab(cat.id)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                              selectedCategoryTab === cat.id
                                ? 'bg-orange-500/15 text-orange-400 font-semibold border border-orange-500/30'
                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <DynamicIcon name={cat.iconName} size={16} className={selectedCategoryTab === cat.id ? 'text-orange-400' : 'text-slate-400'} />
                              <span>{cat.name}</span>
                            </div>
                            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400">
                              {TOOLS.filter(t => t.category === cat.id).length}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Right: Tools for Active Category */}
                      <div className="col-span-7 p-4 bg-[#11131e] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                            <div>
                              <h4 className="text-sm font-bold text-white">
                                {CATEGORIES.find(c => c.id === selectedCategoryTab)?.name}
                              </h4>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {CATEGORIES.find(c => c.id === selectedCategoryTab)?.tagline}
                              </p>
                            </div>
                            <Link
                              href={`/#category-${selectedCategoryTab}`}
                              onClick={() => setActiveDropdown(null)}
                              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                            >
                              View All <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-1 gap-2 max-h-[290px] overflow-y-auto pr-1">
                            {activeCategoryTools.map((tool) => (
                              <Link
                                key={tool.id}
                                href={`/tools/${tool.slug}`}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 group border border-transparent hover:border-orange-500/20 transition-all"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                                    <DynamicIcon name={tool.iconName} size={15} />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-slate-200 group-hover:text-orange-400 transition-colors">
                                        {tool.name}
                                      </span>
                                      {tool.badge && (
                                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                          {tool.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 line-clamp-1">
                                      {tool.shortDescription}
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            100% Free & No Signup
                          </span>
                          <span className="text-slate-400">Private Client Processing</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Popular Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'popular' ? null : 'popular')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeDropdown === 'popular'
                      ? 'bg-white/10 text-orange-400 border border-orange-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Popular Tools</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'popular' ? 'rotate-180 text-orange-400' : ''}`} />
                </button>

                {activeDropdown === 'popular' && (
                  <div className="absolute top-full left-0 mt-3 w-80 bg-[#0f111a] border border-orange-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50 p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>Top Trending</span>
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    {popularTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 group border border-transparent hover:border-orange-500/20 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                          <DynamicIcon name={tool.iconName} size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-200 group-hover:text-orange-400 truncate">
                            {tool.name}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {tool.categoryName}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link 
                href="/#benefits" 
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Benefits
              </Link>
              <Link 
                href="/#how-it-works" 
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                How It Works
              </Link>
              <Link 
                href="/#testimonials" 
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Reviews
              </Link>
              <Link 
                href="/#faq" 
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                FAQ
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2">
              
              {/* Search Icon Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/40 text-slate-400 hover:text-orange-400 transition-all duration-200"
                aria-label="Search tools"
                title="Search tools (Ctrl+K)"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              {/* All Tools CTA Button */}
              <Link
                href="/#tools-grid"
                className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 hover:opacity-95 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>All Tools</span>
              </Link>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white lg:hidden transition-all"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#0d0f17] px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300 space-y-4">
            
            {/* Search Button for Mobile */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-orange-400" />
                <span>Search 30+ tools...</span>
              </div>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded">Search</span>
            </button>

            {/* Categorized Accordion */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Browse Categories
              </div>

              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
                  <div className="p-3 bg-white/5 font-semibold text-sm flex items-center justify-between text-orange-400">
                    <div className="flex items-center gap-2">
                      <DynamicIcon name={cat.iconName} size={16} />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {TOOLS.filter(t => t.category === cat.id).length}
                    </span>
                  </div>
                  <div className="p-2 grid grid-cols-1 gap-1">
                    {TOOLS.filter(t => t.category === cat.id).map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/5 text-sm text-slate-300 hover:text-orange-400"
                      >
                        <DynamicIcon name={tool.iconName} size={14} className="text-slate-400" />
                        <span className="truncate">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/#benefits"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-sm text-slate-300 font-medium hover:text-orange-400"
              >
                Why Choose ToolsHub
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-sm text-slate-300 font-medium hover:text-orange-400"
              >
                How It Works
              </Link>
              <Link
                href="/#testimonials"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-sm text-slate-300 font-medium hover:text-orange-400"
              >
                User Reviews
              </Link>
              <Link
                href="/#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-sm text-slate-300 font-medium hover:text-orange-400"
              >
                Frequently Asked Questions
              </Link>
            </div>

          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
