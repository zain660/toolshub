import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Lock, 
  Smartphone, 
  Code2, 
  CheckCircle2 
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Lock,
      title: '100% Client-Side Privacy',
      description: 'Your sensitive text, images, and documents are processed locally in your browser. Files never touch third-party servers or persist in databases.',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Zap,
      title: 'Blazing Fast Performance',
      description: 'Powered by modern Web APIs, canvas rendering, and optimized Laravel backends. Experience sub-second conversions with zero queue wait times.',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Sparkles,
      title: 'Always 100% Free',
      description: 'No paywalls, no trial limits, no credit card prompts, and no watermarks on your merged documents or compressed images.',
      gradient: 'from-rose-500 to-orange-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile & Desktop Optimized',
      description: 'Engineered with responsive touch controls and fluid typography. Use every tool seamlessly whether on a 4K monitor or on a smartphone.',
      gradient: 'from-orange-600 to-rose-600'
    },
    {
      icon: Code2,
      title: 'Developer Grade Accuracy',
      description: 'Format compliant JSON, RFC-compliant UUIDs, Cryptographic Web Crypto hashing, and precise mathematical calculators built for engineering.',
      gradient: 'from-amber-600 to-orange-600'
    },
    {
      icon: ShieldCheck,
      title: 'No Registration Required',
      description: 'Jump straight into work without creating an account or logging in. Bookmark your favorite tools and use them whenever you need.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 relative bg-[#090a0f] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-rose-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why ToolsHub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built for Speed, Privacy, and Simplicity
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Say goodbye to cluttered ad-ridden websites, watermarked outputs, and sneaky subscription traps.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0f111a] border border-white/5 hover:border-orange-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-rose-600 group-hover:text-white transition-all duration-300 mb-6">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-orange-400/80 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Benefit</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
