"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { KeyRound, Copy, Check, ArrowLeftRight, Trash2, AlertCircle } from 'lucide-react';

export default function Base64Page() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello, ToolsHub Base64 Suite! 🚀');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // UTF-8 safe encode/decode
  const utf8ToBase64 = (str: string) => {
    try {
      const bytes = new TextEncoder().encode(str);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      return btoa(binString);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const base64ToUtf8 = (base64: string) => {
    try {
      const binString = atob(base64.trim());
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch (e: any) {
      throw new Error('Invalid Base64 string format');
    }
  };

  const processInput = (val: string, currentMode: 'encode' | 'decode') => {
    setInput(val);
    setError('');
    if (!val.trim()) { setOutput(''); return; }
    try {
      if (currentMode === 'encode') {
        setOutput(utf8ToBase64(val));
      } else {
        setOutput(base64ToUtf8(val));
      }
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  React.useEffect(() => {
    processInput(input, mode);
  }, []);

  return (
    <ToolLayout slug="base64-encoder-decoder">
      <div className="space-y-6">
        
        {/* Mode Selector */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setMode('encode'); processInput(input, 'encode'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'encode'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Encode Plain Text ➔ Base64
            </button>
            <button
              onClick={() => { setMode('decode'); processInput(input, 'decode'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'decode'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Decode Base64 ➔ Plain Text
            </button>
          </div>

          <button
            onClick={() => {
              const nextMode = mode === 'encode' ? 'decode' : 'encode';
              setMode(nextMode);
              setInput(output);
              processInput(output, nextMode);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-orange-400" /> Swap
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>{mode === 'encode' ? 'Input Text (UTF-8)' : 'Input Base64'}</span>
              <button onClick={() => { setInput(''); setOutput(''); }} className="text-rose-400 hover:text-rose-300 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => processInput(e.target.value, mode)}
              rows={12}
              placeholder="Paste or type text to convert..."
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-4 text-sm font-mono text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="text-emerald-400">{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</span>
              <button onClick={handleCopy} disabled={!output} className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold disabled:opacity-30">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={12}
              className="w-full bg-[#0a0c14] border border-emerald-500/30 rounded-2xl p-4 text-sm font-mono text-emerald-300 focus:outline-none resize-none leading-relaxed break-all"
            />
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
