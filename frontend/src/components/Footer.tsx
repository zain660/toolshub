import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Github, 
  Twitter, 
  Linkedin,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { CATEGORIES, TOOLS } from '@/data/tools';

export default function Footer() {
  return (
    <footer className="bg-[#07080c] border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-white/5">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Private & Secure</h4>
              <p className="text-xs text-slate-400 mt-0.5">Files process in your browser and are never saved.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Blazing Fast Execution</h4>
              <p className="text-xs text-slate-400 mt-0.5">Optimized client algorithms & high speed Laravel APIs.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Zero Signup / Free Always</h4>
              <p className="text-xs text-slate-400 mt-0.5">No credit cards, no subscriptions, unlimited usage.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 p-[1px]">
                <div className="w-full h-full bg-[#0d0f17] rounded-[11px] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black text-white">Tools</span>
                <span className="text-xl font-black text-orange-400">Hub</span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              ToolsHub is a modern, high-performance suite of free online utilities designed for developers, designers, content writers, and digital professionals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:support@toolshub.io" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1: PDF & Image Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Documents & Media
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/compress-image" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  Compress Image
                </Link>
              </li>
              <li>
                <Link href="/tools/merge-pdf" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/split-pdf" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/image-converter" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  Image Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-code-generator" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/color-converter" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  Color Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Dev & Text Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Code & Text
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/json-csv-converter" className="text-slate-400 hover:text-orange-400 transition-colors">
                  JSON ⟷ CSV
                </Link>
              </li>
              <li>
                <Link href="/tools/hash-generator" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Hash Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/base64-encoder-decoder" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Base64 Encode/Decode
                </Link>
              </li>
              <li>
                <Link href="/tools/remove-duplicate-lines" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Remove Duplicates
                </Link>
              </li>
              <li>
                <Link href="/tools/keyword-density-checker" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Keyword Density
                </Link>
              </li>
              <li>
                <Link href="/tools/word-counter" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Word Counter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Calculators & AI */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Calculators & AI
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/ai-text-rewriter" className="text-slate-400 hover:text-orange-400 transition-colors">
                  AI Text Rewriter
                </Link>
              </li>
              <li>
                <Link href="/tools/ai-summarizer" className="text-slate-400 hover:text-orange-400 transition-colors">
                  AI Summarizer
                </Link>
              </li>
              <li>
                <Link href="/tools/percentage-calculator" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/discount-calculator" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Discount Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/loan-calculator" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/password-strength-checker" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Password Strength
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ToolsHub Inc. Built with Next.js, Tailwind CSS & Laravel API.</p>
          <div className="flex items-center gap-6">
            <Link href="/#faq" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/#faq" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/#faq" className="hover:text-slate-300 transition-colors">API Docs</Link>
            <Link href="/#faq" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
