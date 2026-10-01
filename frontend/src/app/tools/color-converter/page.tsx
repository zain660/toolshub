"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Copy, Check, Palette, Sparkles, RefreshCw } from 'lucide-react';

export default function ColorConverterPage() {
  const [hex, setHex] = useState('#F97316');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const hexToRgb = (h: string) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    if (isNaN(num) || clean.length !== 6) return { r: 249, g: 115, b: 22 };
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    c = Math.round(((c - k) / (1 - k)) * 100);
    m = Math.round(((m - k) / (1 - k)) * 100);
    y = Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);
    return { c, m, y, k };
  };

  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const { c, m, y, k } = rgbToCmyk(r, g, b);

  // Luminance & WCAG Contrast
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const isLight = luminance > 0.5;

  const formats = [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
    { label: 'RGBA', value: `rgba(${r}, ${g}, ${b}, 1)` },
    { label: 'HSL', value: `hsl(${h}, ${s}%, ${l}%)` },
    { label: 'CMYK', value: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` },
    { label: 'CSS Variable', value: `--color-primary: ${hex};` }
  ];

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <ToolLayout slug="color-converter">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Color Picker & Visual Swatch */}
        <div className="lg:col-span-5 space-y-6">
          <div 
            className="p-8 rounded-3xl h-64 flex flex-col justify-between shadow-2xl transition-all border border-white/20"
            style={{ backgroundColor: hex }}
          >
            <div className="flex justify-between items-start">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md ${isLight ? 'bg-black/20 text-black' : 'bg-white/20 text-white'}`}>
                {isLight ? 'Light Color' : 'Dark Color'}
              </span>
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md ${isLight ? 'bg-black/20 text-black' : 'bg-white/20 text-white'}`}>
                Luminance: {(luminance * 100).toFixed(0)}%
              </span>
            </div>

            <div className="text-center">
              <h2 className={`text-3xl font-extrabold font-mono tracking-wider ${isLight ? 'text-black' : 'text-white'}`}>
                {hex.toUpperCase()}
              </h2>
            </div>

            <div className="flex justify-between text-xs font-mono font-medium">
              <span className={isLight ? 'text-black/70' : 'text-white/70'}>RGB({r}, {g}, {b})</span>
              <span className={isLight ? 'text-black/70' : 'text-white/70'}>HSL({h}°, {s}%, {l}%)</span>
            </div>
          </div>

          {/* Color Picker Bar */}
          <div className="p-6 rounded-2xl bg-[#0a0c14] border border-white/10 flex items-center justify-between gap-4">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-orange-400" />
              Pick or Enter Hex:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                maxLength={7}
                className="w-28 bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl px-3 py-2 text-sm font-mono text-white uppercase focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Conversions Table */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            All Standard Color Format Outputs
          </h3>

          <div className="space-y-3">
            {formats.map((fmt) => (
              <div
                key={fmt.label}
                className="p-4 rounded-xl bg-[#090b12] border border-white/10 hover:border-orange-500/30 flex items-center justify-between transition-all"
              >
                <div>
                  <span className="text-[11px] font-bold text-orange-400 uppercase font-mono block">
                    {fmt.label}
                  </span>
                  <span className="text-sm font-mono font-bold text-white mt-0.5 block">
                    {fmt.value}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(fmt.label, fmt.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  {copiedKey === fmt.label ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
