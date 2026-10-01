"use client";

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  return (
    <section className="py-20 bg-[#090a0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-r from-orange-950/40 via-[#121420] to-rose-950/40 border border-orange-500/30 overflow-hidden shadow-2xl shadow-orange-500/5">
          
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Ahead</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Get New Tools in Your Inbox
            </h2>
            
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              We release new developer and productivity tools every single week. Subscribe to receive monthly changelogs and utility tips. Zero spam.
            </p>

            {subscribed ? (
              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center gap-3 text-emerald-400 animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span className="font-bold text-base">You're on the list! Welcome to ToolsHub updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/15 focus:border-orange-500/60 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:opacity-95 shrink-0 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-slate-400">
              🔒 We respect your privacy. Unsubscribe anytime with 1-click.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
