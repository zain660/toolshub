"use client";

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { 
  UploadCloud, 
  Download, 
  FileText, 
  Scissors, 
  Sparkles, 
  RefreshCw,
  Layers,
  Check
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import confetti from 'canvas-confetti';
import { formatBytes } from '@/lib/utils';

interface SplitResult {
  pageNumber: number;
  url: string;
  size: number;
}

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all');
  const [pageRange, setPageRange] = useState<string>('1-2');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SplitResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setResults([]);

      try {
        const buffer = await selected.arrayBuffer();
        const pdf = await PDFDocument.load(buffer);
        const count = pdf.getPageCount();
        setPageCount(count);
        setPageRange(`1-${Math.min(count, 3)}`);
      } catch (err: any) {
        alert('Could not read PDF: ' + err.message);
      }
    }
  };

  const handleSplit = async () => {
    if (!file || pageCount === 0) return;
    setLoading(true);
    setResults([]);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const outputList: SplitResult[] = [];

      if (splitMode === 'all') {
        for (let i = 0; i < pageCount; i++) {
          const newDoc = await PDFDocument.create();
          const [copiedPage] = await newDoc.copyPages(pdf, [i]);
          newDoc.addPage(copiedPage);
          const pdfBytes = await newDoc.save();
          const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
          outputList.push({
            pageNumber: i + 1,
            url: URL.createObjectURL(blob),
            size: blob.size
          });
        }
      } else {
        // Range mode (e.g., 1-3 or 1,2,4)
        const parts = pageRange.split(',').map(p => p.trim());
        const selectedIndices = new Set<number>();

        for (const part of parts) {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n));
            if (!isNaN(start) && !isNaN(end)) {
              for (let j = Math.max(1, start); j <= Math.min(pageCount, end); j++) {
                selectedIndices.add(j - 1);
              }
            }
          } else {
            const num = parseInt(part);
            if (!isNaN(num) && num >= 1 && num <= pageCount) {
              selectedIndices.add(num - 1);
            }
          }
        }

        if (selectedIndices.size === 0) {
          throw new Error('Please specify valid page numbers within 1 to ' + pageCount);
        }

        const newDoc = await PDFDocument.create();
        const copied = await newDoc.copyPages(pdf, Array.from(selectedIndices));
        copied.forEach(p => newDoc.addPage(p));
        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        
        outputList.push({
          pageNumber: 1,
          url: URL.createObjectURL(blob),
          size: blob.size
        });
      }

      setResults(outputList);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (err: any) {
      alert('Error splitting PDF: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout slug="split-pdf">
      <div className="space-y-8">
        
        {/* File Upload Zone */}
        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-orange-500/30 hover:border-orange-500 rounded-3xl p-12 text-center cursor-pointer bg-white/[0.02] hover:bg-orange-500/[0.03] transition-all duration-300 group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="application/pdf" 
              className="hidden" 
            />
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <Scissors className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Select or drop a PDF file to split</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Extract every single page into separate documents or export custom page ranges.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* File Info Bar */}
            <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{file.name}</h4>
                  <p className="text-xs text-slate-400">{formatBytes(file.size)} • <span className="text-orange-400 font-semibold">{pageCount} total pages</span></p>
                </div>
              </div>
              <button
                onClick={() => { setFile(null); setResults([]); }}
                className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Choose another file
              </button>
            </div>

            {/* Split Settings */}
            <div className="p-6 rounded-2xl bg-[#0a0c14] border border-white/10 space-y-6">
              <div>
                <label className="text-sm font-bold text-white mb-3 block">Choose Split Mode</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSplitMode('all')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      splitMode === 'all'
                        ? 'bg-orange-500/15 border-orange-500/50 text-white shadow-lg shadow-orange-500/5'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm mb-1">
                      <span>Extract Every Page</span>
                      {splitMode === 'all' && <Check className="w-4 h-4 text-orange-400" />}
                    </div>
                    <p className="text-xs text-slate-400">Splits all {pageCount} pages into separate individual single-page PDFs.</p>
                  </button>

                  <button
                    onClick={() => setSplitMode('range')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      splitMode === 'range'
                        ? 'bg-orange-500/15 border-orange-500/50 text-white shadow-lg shadow-orange-500/5'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm mb-1">
                      <span>Extract Page Range</span>
                      {splitMode === 'range' && <Check className="w-4 h-4 text-orange-400" />}
                    </div>
                    <p className="text-xs text-slate-400">Export specific pages (e.g., 1-3, 5, 7-9) into a consolidated file.</p>
                  </button>
                </div>
              </div>

              {splitMode === 'range' && (
                <div>
                  <label className="text-sm font-bold text-white mb-2 block">
                    Page Range (Available: 1 to {pageCount})
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="e.g. 1-3, 5"
                    className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3.5 text-sm text-white focus:outline-none"
                  />
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleSplit}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Processing Pages...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{splitMode === 'all' ? `Split into ${pageCount} PDF Documents` : 'Extract Specified Range'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Grid */}
            {results.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#0a0c14] border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white">
                  Split Output ({results.length} {results.length === 1 ? 'file' : 'files'})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {results.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      download={splitMode === 'all' ? `page_${r.pageNumber}_${file.name}` : `extracted_pages_${file.name}`}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 text-center transition-all group"
                    >
                      <FileText className="w-8 h-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold text-white">
                        {splitMode === 'all' ? `Page ${r.pageNumber}` : 'Extracted PDF'}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{formatBytes(r.size)}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-orange-400 font-bold mt-2">
                        <Download className="w-3 h-3" /> Download
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
