"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Are all tools on ToolsHub completely free to use?',
      answer: 'Yes! 100% of our tools are completely free to use without any hidden paywalls, subscriptions, or credit card requirements.'
    },
    {
      question: 'Do you store or upload my files to your servers?',
      answer: 'No. Most utilities (like text cleaners, JSON converters, QR generators, and Hash generators) run purely in your client browser. For file-based tasks like PDF merging and Image compression, processing is done securely in ephemeral RAM with immediate automatic deletion.'
    },
    {
      question: 'Is there a limit on how many times I can use a tool?',
      answer: 'There are zero rate limits or daily caps. You can convert, format, or compress as many files as you need.'
    },
    {
      question: 'Can I use ToolsHub on my mobile phone or tablet?',
      answer: 'Absolutely. ToolsHub is fully responsive and optimized for mobile devices, tablets, laptops, and ultra-wide desktop monitors.'
    },
    {
      question: 'How do the AI tools work?',
      answer: 'Our AI text tools use lightweight on-device natural language processing and smart heuristics to rephrase, summarize, and enhance text directly without requiring an OpenAI account or paid API key.'
    },
    {
      question: 'How do I report a bug or request a new tool?',
      answer: 'We love hearing from our users! Feel free to reach out via our support email or GitHub community to request custom utilities or report issues.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#07080d] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Everything you need to know about our privacy, tools, and processing engine.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-[#10121b] border-orange-500/40 shadow-lg shadow-orange-500/5' 
                    : 'bg-[#0b0d14] border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-base font-bold transition-colors ${isOpen ? 'text-orange-400' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
