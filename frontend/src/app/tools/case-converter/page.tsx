"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Copy, Check, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CaseConverterPage() {
  const [text, setText] = useState('welcome to toolshub super fast utility suite');
  const [copied, setCopied] = useState(false);

  // Transformations
  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1));
  };

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  const toPascalCase = (str: string) => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '_');
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-');
  };

  const toConstantCase = (str: string) => {
    return toSnakeCase(str).toUpperCase();
  };

  const toAlternatingCase = (str: string) => {
    return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
  };

  const applyTransformation = (transformed: string) => {
    setText(transformed);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transformations = [
    { label: 'Sentence case', fn: () => applyTransformation(toSentenceCase(text)) },
    { label: 'lower case', fn: () => applyTransformation(text.toLowerCase()) },
    { label: 'UPPER CASE', fn: () => applyTransformation(text.toUpperCase()) },
    { label: 'Title Case', fn: () => applyTransformation(toTitleCase(text)) },
    { label: 'camelCase', fn: () => applyTransformation(toCamelCase(text)) },
    { label: 'PascalCase', fn: () => applyTransformation(toPascalCase(text)) },
    { label: 'snake_case', fn: () => applyTransformation(toSnakeCase(text)) },
    { label: 'kebab-case', fn: () => applyTransformation(toKebabCase(text)) },
    { label: 'CONSTANT_CASE', fn: () => applyTransformation(toConstantCase(text)) },
    { label: 'aLtErNaTiNg cAsE', fn: () => applyTransformation(toAlternatingCase(text)) },
  ];

  return (
    <ToolLayout slug="case-converter">
      <div className="space-y-6">
        
        {/* Main Text Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Input / Output Text ({text.length} characters)</span>
            <div className="flex items-center gap-3">
              <button onClick={handleCopy} className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button onClick={() => setText('')} className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Type or paste your text to convert case..."
            className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-5 text-base text-white focus:outline-none resize-none leading-relaxed font-mono"
          />
        </div>

        {/* Transformation Action Buttons */}
        <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Click to Transform Text
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {transformations.map((t, i) => (
              <button
                key={i}
                onClick={t.fn}
                className="p-3 rounded-xl bg-white/5 hover:bg-orange-500/15 border border-white/5 hover:border-orange-500/40 text-slate-200 hover:text-orange-400 text-xs font-bold font-mono transition-all text-center"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
