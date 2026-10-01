"use client";

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { 
  UploadCloud, 
  Download, 
  Sliders, 
  Sparkles, 
  Image as ImageIcon, 
  RotateCw, 
  CheckCircle2, 
  RefreshCw,
  FileText
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function CompressImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [quality, setQuality] = useState<number>(75);
  const [format, setFormat] = useState<string>('original');
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setOriginalSize(selected.size);
      setPreviewUrl(URL.createObjectURL(selected));
      setCompressedUrl('');
      setCompressedSize(0);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);

    try {
      // First attempt backend API, if backend is reachable
      const formData = new FormData();
      formData.append('image', file);
      formData.append('quality', quality.toString());
      formData.append('format', format);
      formData.append('rotate', rotation.toString());

      const res = await fetch('http://localhost:8000/api/compress-image', {
        method: 'POST',
        body: formData,
      }).catch(() => null);

      if (res && res.ok) {
        const blob = await res.blob();
        setCompressedSize(blob.size);
        setCompressedUrl(URL.createObjectURL(blob));
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        setLoading(false);
        return;
      }
    } catch (e) {
      console.log('Backend API failed, using client-side canvas fallback:', e);
    }

    // Client-side HTML5 Canvas Fallback (100% reliable)
    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      // Handle rotation
      if (rotation === 90 || rotation === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      let targetMime = file.type || 'image/jpeg';
      if (format === 'jpeg' || format === 'jpg') targetMime = 'image/jpeg';
      else if (format === 'webp') targetMime = 'image/webp';
      else if (format === 'png') targetMime = 'image/png';

      canvas.toBlob((blob) => {
        if (blob) {
          setCompressedSize(blob.size);
          setCompressedUrl(URL.createObjectURL(blob));
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
        setLoading(false);
      }, targetMime, quality / 100);

    } catch (err: any) {
      alert('Compression error: ' + err.message);
      setLoading(false);
    }
  };

  const savingsPercent = originalSize && compressedSize 
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <ToolLayout slug="compress-image">
      <div className="space-y-8">
        
        {/* Upload Zone */}
        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-orange-500/30 hover:border-orange-500 rounded-3xl p-12 text-center cursor-pointer bg-white/[0.02] hover:bg-orange-500/[0.03] transition-all duration-300 group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/jpeg,image/png,image/webp,image/gif" 
              className="hidden" 
            />
            <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Drop your image here, or browse</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Supports JPEG, PNG, WebP up to 25MB. Instant client & server compression.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Image Preview & Config Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Image Previews */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-[#090a0f] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                  <img 
                    src={compressedUrl || previewUrl} 
                    alt="Preview" 
                    className="max-h-[380px] w-auto object-contain rounded-xl shadow-lg"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
                    {compressedUrl ? 'Compressed Result' : 'Original Preview'}
                  </div>
                </div>

                {/* Reset or Upload New Image */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 truncate max-w-xs">{file.name} ({formatBytes(originalSize)})</span>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl('');
                      setCompressedUrl('');
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Choose Different Image
                  </button>
                </div>
              </div>

              {/* Right Column: Compression Controls */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0a0c13] border border-white/10 flex flex-col justify-between space-y-6">
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-white flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-orange-400" />
                        Compression Quality
                      </label>
                      <span className="text-sm font-mono font-bold text-orange-400">{quality}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="95"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>Max Compression</span>
                      <span>Balanced (75%)</span>
                      <span>Best Quality</span>
                    </div>
                  </div>

                  {/* Format Selector */}
                  <div>
                    <label className="text-sm font-bold text-white mb-2 block">Output Format</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['original', 'jpeg', 'webp', 'png'].map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setFormat(fmt)}
                          className={`py-2 px-2 text-xs font-semibold rounded-xl uppercase border transition-all ${
                            format === fmt
                              ? 'bg-orange-500/20 text-orange-400 border-orange-500/50'
                              : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rotation Button */}
                  <div>
                    <label className="text-sm font-bold text-white mb-2 block">Rotate Image</label>
                    <button
                      onClick={() => setRotation((rotation + 90) % 360)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <RotateCw className="w-4 h-4 text-orange-400" />
                      Rotate 90° (Current: {rotation}°)
                    </button>
                  </div>
                </div>

                {/* Savings Summary Banner */}
                {compressedSize > 0 && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold uppercase">Size Reduction</span>
                      <span className="text-lg font-black">{savingsPercent}% Saved</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>{formatBytes(originalSize)}</span>
                      <span>➔</span>
                      <span className="font-bold text-white">{formatBytes(compressedSize)}</span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="space-y-3">
                  <button
                    onClick={handleCompress}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Compressing Image...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>{compressedUrl ? 'Re-Compress with Settings' : 'Compress Image Now'}</span>
                      </>
                    )}
                  </button>

                  {compressedUrl && (
                    <a
                      href={compressedUrl}
                      download={`compressed_${file.name.replace(/\.[^/.]+$/, '')}.${format === 'original' ? 'jpg' : format}`}
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Compressed Image</span>
                    </a>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
