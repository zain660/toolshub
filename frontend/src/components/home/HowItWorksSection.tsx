import React from 'react';
import { MousePointerClick, UploadCloud, DownloadCloud, Sparkles } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      icon: MousePointerClick,
      title: 'Select Any Utility',
      description: 'Find what you need in seconds using our categorized menu or pressing Ctrl+K search.'
    },
    {
      step: '02',
      icon: UploadCloud,
      title: 'Paste Text or Drop Files',
      description: 'Add your documents, images, JSON snippets, or numbers. Everything processes securely and privately.'
    },
    {
      step: '03',
      icon: DownloadCloud,
      title: 'Instant Result & Download',
      description: 'Get immediate visual previews, copy the formatted output to clipboard, or download files with one click.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#07080d] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Effortless Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How ToolsHub Works
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Simple 3-step process designed for maximum productivity without obstacles.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connecting Line for desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-orange-500/20 via-orange-500/50 to-rose-500/20 -z-0" />

          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative z-10 p-8 rounded-2xl bg-[#0f111a] border border-white/10 hover:border-orange-500/40 transition-all duration-300 group text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              {/* Step Number Badge */}
              <span className="absolute -top-4 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-rose-600 text-white font-mono font-bold text-xs shadow-lg shadow-orange-500/30">
                STEP {s.step}
              </span>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 mt-2 mb-6">
                <s.icon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xs">
                {s.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
