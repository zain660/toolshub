import React from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Alex Rivera',
      role: 'Senior Fullstack Engineer',
      company: 'CloudStack Labs',
      avatar: 'AR',
      rating: 5,
      comment: 'The JSON to CSV and Hash Generator are part of my daily debugging routine now. Super clean interface, zero annoying ads, and instant execution.'
    },
    {
      name: 'Sarah Chen',
      role: 'Content Strategy Lead',
      company: 'GrowthPulse Digital',
      avatar: 'SC',
      rating: 5,
      comment: 'The Keyword Density Checker and AI Text Rewriter have sped up our blog editorial pipeline dramatically. Having everything in one place is unmatched.'
    },
    {
      name: 'Marcus Vance',
      role: 'Creative Director & Designer',
      company: 'Studio Monochrome',
      avatar: 'MV',
      rating: 5,
      comment: 'Image compression without quality degradation is crucial for web assets. ToolsHub compresses our 4K PNGs effortlessly right in the browser.'
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Thousands Daily
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            See what developers, marketers, and creators say about ToolsHub.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0f111a] border border-white/5 hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 relative"
            >
              <Quote className="w-8 h-8 text-orange-500/20 absolute top-6 right-6" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role} • <span className="text-orange-400">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
