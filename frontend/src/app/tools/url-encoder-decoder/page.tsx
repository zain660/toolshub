"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Link2, Copy, Check, ArrowLeftRight, Trash2 } from 'lucide-react';

export default function UrlEncoderPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'uri'>('component');
  const [input, setInput] = useState('https://example.com/search?q=free tools & utilities=100%');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const processUrl = (text: string, currentMode: 'encode' | 'decode', type: 'component' | 'uri') => {
    setInput(text);
    if (!text.trim()) { setOutput(''); return; }
    try {
      if (currentMode === 'encode') {
        setOutput(type === 'component' ? encodeURIComponent(text) : encodeURI(text));
      } else {
        setOutput(type === 'component' ? decodeURIComponent(text) : decodeURI(text));
      }
    } catch (e: any) {
      setOutput('Error decoding URL: ' + e.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  React.useEffect(() => {
    processUrl(input, mode, encodeType);
  }, []);

  return (
    <ToolLayout slug="url-encoder-decoder">
      <div className="space-y-6">
        
        {/* Controls */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setMode('encode'); processUrl(input, 'encode', encodeType); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'encode' ? 'bg-orange-500 text-white shadow-md' : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Encode URL
            </button>
            <button
              onClick={() => { setMode('decode'); processUrl(input, 'decode', encodeType); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'decode' ? 'bg-orange-500 text-white shadow-md' : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Decode URL
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span>Encoding Mode:</span>
            <select
              value={encodeType}
              onChange={(e) => {
                const nextType = e.target.value as any;
                setEncodeType(nextType);
                processUrl(input, mode, nextType);
              }}
              className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
            >
              <option value="component">encodeURIComponent (Strict Param)</option>
              <option value="uri">encodeURI (Preserve Protocol/Host)</option>
            </select>
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>{mode === 'encode' ? 'Plain URL / Text' : 'Encoded URL Input'}</span>
              <button onClick={() => { setInput(''); setOutput(''); }} className="text-rose-400 hover:text-rose-300 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => processUrl(e.target.value, mode, encodeType)}
              rows={10}
              placeholder="Enter URL to encode or decode..."
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-4 text-sm font-mono text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="text-emerald-400">{mode === 'encode' ? 'Encoded URL' : 'Decoded URL Result'}</span>
              <button onClick={handleCopy} disabled={!output} className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold disabled:opacity-30">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={10}
              className="w-full bg-[#0a0c14] border border-emerald-500/30 rounded-2xl p-4 text-sm font-mono text-emerald-300 focus:outline-none resize-none leading-relaxed break-all"
            />
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
