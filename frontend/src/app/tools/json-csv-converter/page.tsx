"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { ArrowLeftRight, Copy, Check, Download, AlertCircle, FileSpreadsheet, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JsonCsvConverterPage() {
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');
  const [input, setInput] = useState(`[
  { "id": 1, "name": "John Doe", "role": "Developer", "city": "San Francisco" },
  { "id": 2, "name": "Sarah Connor", "role": "Designer", "city": "New York" },
  { "id": 3, "name": "Alex Smith", "role": "Product Manager", "city": "London" }
]`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertJsonToCsv = (jsonStr: string) => {
    try {
      if (!jsonStr.trim()) { setOutput(''); setError(''); return; }
      const parsed = JSON.parse(jsonStr);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (arr.length === 0) { setOutput(''); setError(''); return; }

      const headers = Array.from(new Set(arr.flatMap(obj => Object.keys(obj))));
      const csvRows = [
        headers.join(','),
        ...arr.map(row => headers.map(fieldName => {
          let val = row[fieldName] === undefined || row[fieldName] === null ? '' : String(row[fieldName]);
          if (val.includes(',') || val.includes('"') || val.includes('\n')) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(','))
      ];

      setOutput(csvRows.join('\n'));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const convertCsvToJson = (csvStr: string) => {
    try {
      if (!csvStr.trim()) { setOutput(''); setError(''); return; }
      const lines = csvStr.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
      if (lines.length < 1) { setOutput('[]'); setError(''); return; }

      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const obj: any = {};
        headers.forEach((h, index) => {
          let val: any = values[index] !== undefined ? values[index] : '';
          if (!isNaN(Number(val)) && val !== '') val = Number(val);
          obj[h] = val;
        });
        result.push(obj);
      }

      setOutput(JSON.stringify(result, null, 2));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    if (mode === 'json-to-csv') convertJsonToCsv(val);
    else convertCsvToJson(val);
  };

  const handleSwitchMode = () => {
    const nextMode = mode === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv';
    setMode(nextMode);
    setInput(output || '');
    if (nextMode === 'json-to-csv') convertJsonToCsv(output || '');
    else convertCsvToJson(output || '');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = mode === 'json-to-csv' ? 'csv' : 'json';
    const mime = mode === 'json-to-csv' ? 'text/csv' : 'application/json';
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_data.${ext}`;
    a.click();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  // Initial trigger
  React.useEffect(() => {
    convertJsonToCsv(input);
  }, []);

  return (
    <ToolLayout slug="json-csv-converter">
      <div className="space-y-6">
        
        {/* Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setMode('json-to-csv'); convertJsonToCsv(input); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'json-to-csv'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              JSON ➔ CSV
            </button>
            <button
              onClick={() => { setMode('csv-to-json'); convertCsvToJson(input); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'csv-to-json'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              CSV ➔ JSON
            </button>
          </div>

          <button
            onClick={handleSwitchMode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-orange-400" />
            <span>Swap Input/Output</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Parsing error: {error}</span>
          </div>
        )}

        {/* Editor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Input Box */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>{mode === 'json-to-csv' ? 'Input JSON Array' : 'Input CSV Content'}</span>
              <button 
                onClick={() => { setInput(''); setOutput(''); }} 
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              rows={14}
              placeholder={mode === 'json-to-csv' ? '[ { "name": "..." } ]' : 'name,age,email\n...'}
              className="w-full bg-black/40 border border-white/10 focus:border-orange-500 rounded-2xl p-4 text-xs sm:text-sm font-mono text-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Output Box */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span className="text-emerald-400">{mode === 'json-to-csv' ? 'Output CSV' : 'Output Formatted JSON'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" /> Export File
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={14}
              className="w-full bg-[#0a0c14] border border-emerald-500/30 rounded-2xl p-4 text-xs sm:text-sm font-mono text-emerald-300 focus:outline-none resize-none leading-relaxed"
            />
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
