"use client";

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { 
  UploadCloud, 
  Download, 
  FileText, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  RefreshCw,
  Plus
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { PDFDocument } from 'pdf-lib';
import confetti from 'canvas-confetti';

interface PdfFileItem {
  id: string;
  file: File;
}

export default function MergePdfPage() {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [mergedUrl, setMergedUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesAdded = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const added: PdfFileItem[] = Array.from(newFiles)
      .filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'))
      .map(f => ({
        id: Math.random().toString(36).substring(2, 9),
        file: f
      }));
    setFiles(prev => [...prev, ...added]);
    setMergedUrl('');
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setMergedUrl('');
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles(prev => {
      const arr = [...prev];
      const temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
      return arr;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles(prev => {
      const arr = [...prev];
      const temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;
      return arr;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setLoading(true);

    try {
      // 1. Try Backend Laravel API
      const formData = new FormData();
      files.forEach(f => {
        formData.append('files[]', f.file);
      });

      const res = await fetch('http://localhost:8000/api/merge-pdf', {
        method: 'POST',
        body: formData
      }).catch(() => null);

      if (res && res.ok) {
        const blob = await res.blob();
        setMergedUrl(URL.createObjectURL(blob));
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        setLoading(false);
        return;
      }
    } catch (e) {
      console.log('Backend merge failed, falling back to pdf-lib client-side:', e);
    }

    // 2. Client-Side PDF-LIB Merge (Instant & 100% Reliable)
    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      setMergedUrl(URL.createObjectURL(blob));
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (err: any) {
      alert('Error merging PDFs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalSize = files.reduce((acc, curr) => acc + curr.file.size, 0);

  return (
    <ToolLayout slug="merge-pdf">
      <div className="space-y-8">
        
        {/* Upload Box */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-orange-500/30 hover:border-orange-500 rounded-3xl p-10 text-center cursor-pointer bg-white/[0.02] hover:bg-orange-500/[0.03] transition-all duration-300 group"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFilesAdded(e.target.files)} 
            multiple 
            accept="application/pdf" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {files.length > 0 ? 'Add more PDF files' : 'Select or drop multiple PDF files'}
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Select 2 or more PDF documents to combine into a single consolidated file.
          </p>
        </div>

        {/* Selected Files List with Reorder Controls */}
        {files.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Selected Documents ({files.length})</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-medium">
                  {formatBytes(totalSize)}
                </span>
              </div>
              <button
                onClick={() => { setFiles([]); setMergedUrl(''); }}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* List */}
            <div className="space-y-2">
              {files.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-white/10 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <FileText className="w-5 h-5 text-orange-400 shrink-0" />
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-200 truncate">{item.file.name}</p>
                      <p className="text-[11px] text-slate-400">{formatBytes(item.file.size)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      title="Move Up"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === files.length - 1}
                      title="Move Down"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFile(item.id)}
                      title="Remove"
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Merge Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleMerge}
                disabled={files.length < 2 || loading}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Merging {files.length} PDFs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Merge {files.length} PDF Documents</span>
                  </>
                )}
              </button>

              {mergedUrl && (
                <a
                  href={mergedUrl}
                  download="merged_document.pdf"
                  className="px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Merged PDF</span>
                </a>
              )}
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
