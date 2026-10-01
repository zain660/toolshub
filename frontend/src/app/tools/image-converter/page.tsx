"use client";

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { 
  UploadCloud, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formats = [
    { id: 'png', label: 'PNG (Lossless, Transparency)' },
    { id: 'jpeg', label: 'JPG / JPEG (Standard)' },
    { id: 'webp', label: 'WebP (Modern Web Format)' },
    { id: 'gif', label: 'GIF' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setConvertedUrl('');
      setConvertedSize(0);
    }
  };

  const handleConvert = async () => {
    if (!file || !previewUrl) return;
    setLoading(true);

    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas rendering not supported');

      // If converting to JPEG, fill white background for transparency
      if (targetFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = targetFormat === 'jpeg' ? 'image/jpeg' :
                       targetFormat === 'webp' ? 'image/webp' :
                       targetFormat === 'gif' ? 'image/gif' : 'image/png';

      canvas.toBlob((blob) => {
        if (blob) {
          setConvertedSize(blob.size);
          setConvertedUrl(URL.createObjectURL(blob));
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
        setLoading(false);
      }, mimeType, 0.92);

    } catch (err: any) {
      alert('Conversion failed: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <ToolLayout slug="image-converter">
      <div className="space-y-8">
        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-orange-500/30 hover:border-orange-500 rounded-3xl p-12 text-center cursor-pointer bg-white/[0.02] hover:bg-orange-500/[0.03] transition-all duration-300 group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upload an image to convert</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Convert PNG, JPG, WebP, GIF, BMP, and SVG files instantly with no server upload.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-2xl bg-[#090b12] border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
                <img src={convertedUrl || previewUrl} alt="Preview" className="max-h-[350px] w-auto object-contain rounded-xl shadow-md" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{file.name} ({formatBytes(file.size)})</span>
                <button
                  onClick={() => { setFile(null); setConvertedUrl(''); }}
                  className="font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Choose New Image
                </button>
              </div>
            </div>

            {/* Right Controls */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0a0c14] border border-white/10 flex flex-col justify-between space-y-6">
              <div>
                <label className="text-sm font-bold text-white mb-3 block">Target Output Format</label>
                <div className="grid grid-cols-1 gap-2.5">
                  {formats.map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setTargetFormat(fmt.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        targetFormat === fmt.id
                          ? 'bg-orange-500/15 border-orange-500/50 text-white font-semibold shadow-lg shadow-orange-500/5'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm uppercase font-mono">{fmt.label}</span>
                      {targetFormat === fmt.id && <CheckCircle2 className="w-4 h-4 text-orange-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {convertedSize > 0 && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between font-bold">
                  <span>Converted Size: {formatBytes(convertedSize)}</span>
                  <span>Ready for Download</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleConvert}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Converting Format...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Convert to {targetFormat.toUpperCase()}</span>
                    </>
                  )}
                </button>

                {convertedUrl && (
                  <a
                    href={convertedUrl}
                    download={`converted_${file.name.replace(/\.[^/.]+$/, '')}.${targetFormat}`}
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {targetFormat.toUpperCase()} Image</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </ToolLayout>
  );
}
