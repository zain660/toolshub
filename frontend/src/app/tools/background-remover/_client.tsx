"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import ToolLayout from "@/components/ToolLayout";
import {
  UploadCloud,
  Download,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Eraser,
  Layers,
  Zap,
  Lock,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { formatBytes } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────── */
type Stage = "idle" | "loading-model" | "processing" | "done" | "error";

/* ─── Checkerboard canvas (shows transparency) ───────────── */
function CheckerCanvas({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!src || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const size = 16;
      for (let y = 0; y < canvas.height; y += size) {
        for (let x = 0; x < canvas.width; x += size) {
          ctx.fillStyle = (x / size + y / size) % 2 === 0 ? "#1e2035" : "#252840";
          ctx.fillRect(x, y, size, size);
        }
      }
      ctx.drawImage(img, 0, 0);
    };
    img.src = src;
  }, [src]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ maxWidth: "100%", height: "auto", ...style }}
    />
  );
}

/* ─── Before / After Slider ──────────────────────────────── */
function BeforeAfterSlider({ original, result }: { original: string; result: string }) {
  const [pct, setPct] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setPct(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none rounded-2xl overflow-hidden cursor-col-resize"
      onMouseDown={() => (dragging.current = true)}
      onMouseMove={(e) => { if (dragging.current) move(e.clientX); }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* Original */}
      <img src={original} alt="Original" className="block w-full h-auto object-cover" draggable={false} />

      {/* Result clipped overlay */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <CheckerCanvas
          src={result}
          style={{ position: "absolute", top: 0, left: 0, width: containerRef.current?.offsetWidth ?? "100%" } as React.CSSProperties}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(249,115,22,0.9)] z-20"
        style={{ left: `calc(${pct}% - 1px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-orange-400 shadow-xl flex items-center justify-center gap-0.5">
          <ChevronLeft className="w-3.5 h-3.5 text-orange-500" />
          <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 right-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur text-[11px] font-bold text-white border border-white/10 z-10">
        ORIGINAL
      </div>
      <div className="absolute top-3 left-4 px-2 py-1 rounded-md bg-orange-500/80 backdrop-blur text-[11px] font-bold text-white z-10">
        REMOVED
      </div>
    </div>
  );
}

/* ─── Main Tool Component ────────────────────────────────── */
export default function BackgroundRemoverClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl("");
    setResultBlob(null);
    setStage("idle");
    setProgress(0);
    setProgressLabel("");
    setErrorMsg("");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) loadFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) loadFile(e.dataTransfer.files[0]);
  }, []);

  /* ── AI removal ── */
  const handleRemove = async () => {
    if (!file) return;
    setStage("loading-model");
    setProgress(0);
    setProgressLabel("Initialising AI model…");

    try {
      const { removeBackground } = await import("@imgly/background-removal");

      setStage("processing");

      // publicPath points to jsDelivr CDN so ONNX Runtime WASM files are
      // loaded correctly (fixes "r_OrtGetInputOutputMetadata is not a function")
      const blob = await removeBackground(file, {
        publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/",
        model: "isnet_fp16",
        output: { format: "image/png", quality: 1 },
        progress: (key: string, current: number, total: number) => {
          const p = total > 0 ? Math.round((current / total) * 100) : 0;
          setProgress(p);
          if (key.includes("fetch")) setProgressLabel(`Downloading model… ${p}%`);
          else if (key.includes("compute")) setProgressLabel(`Processing… ${p}%`);
          else setProgressLabel(`Working… ${p}%`);
        },
      });

      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
      setStage("done");
      setProgress(100);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStage("error");
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = `${file?.name?.replace(/\.[^/.]+$/, "") ?? "image"}-no-bg.png`;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setOriginalUrl("");
    setResultUrl("");
    setResultBlob(null);
    setStage("idle");
    setProgress(0);
    setProgressLabel("");
    setErrorMsg("");
  };

  return (
    <ToolLayout slug="background-remover">
      <div className="space-y-8">

        {/* ── Upload Drop Zone ─── */}
        {!file && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`relative border-2 border-dashed rounded-3xl p-14 text-center cursor-pointer transition-all duration-300 group overflow-hidden
              ${isDragging
                ? "border-orange-500 bg-orange-500/10 scale-[1.01]"
                : "border-orange-500/30 hover:border-orange-500 bg-white/[0.02] hover:bg-orange-500/[0.03]"
              }`}
          >
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "700ms" }} />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />

            <div className="relative z-10">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border-2 border-orange-500/30 flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${isDragging ? "scale-110 border-orange-500" : "group-hover:scale-110 group-hover:border-orange-500"}`}>
                <UploadCloud className={`w-12 h-12 transition-colors ${isDragging ? "text-orange-400" : "text-orange-400/70 group-hover:text-orange-400"}`} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {isDragging ? "Drop it!" : "Drop your photo here"}
              </h3>
              <p className="text-slate-400 mb-6 text-sm max-w-sm mx-auto">
                AI removes backgrounds in seconds. No signup, no watermarks. Supports JPG, PNG, WebP.
              </p>

              <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:opacity-95 transition-all transform hover:-translate-y-0.5">
                Browse Files
              </button>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-3 mt-8 flex-wrap">
              {["Portraits", "Products", "Logos", "Pets", "Cars"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Processing ── */}
        {file && (stage === "loading-model" || stage === "processing") && (
          <div className="flex flex-col items-center justify-center py-16 gap-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-orange-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-4 border-orange-500/30 animate-ping" style={{ animationDelay: "150ms" }} />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Eraser className="w-10 h-10 text-orange-400 animate-pulse" />
              </div>
            </div>

            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>{progressLabel || "Starting…"}</span>
                <span className="text-orange-400 font-bold">{progress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 transition-all duration-300 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_1.5s_infinite]" />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center max-w-xs">
              {stage === "loading-model"
                ? "Downloading AI model (~20 MB). Cached after first use."
                : "Analysing edges and removing background with neural segmentation…"}
            </p>
          </div>
        )}

        {/* ── Error ── */}
        {file && stage === "error" && (
          <div className="flex flex-col items-center gap-5 py-10">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-center">
              <p className="font-bold text-white mb-1">Processing Failed</p>
              <p className="text-xs text-slate-400 max-w-sm">{errorMsg}</p>
            </div>
            <button onClick={reset} className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-bold transition-all">
              Try Again
            </button>
          </div>
        )}

        {/* ── Workspace (idle / done) ── */}
        {file && (stage === "idle" || stage === "done") && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: Image */}
            <div className="lg:col-span-8 space-y-4">

              {stage === "done" && resultUrl ? (
                <>
                  {/* Before/After Slider */}
                  <div className="rounded-2xl overflow-hidden border border-orange-500/20 shadow-xl shadow-orange-500/5">
                    <BeforeAfterSlider original={originalUrl} result={resultUrl} />
                  </div>

                  {/* Result preview */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden">
                    <div className="px-4 py-3 flex items-center gap-2 border-b border-emerald-500/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-400">Background removed!</span>
                      <span className="ml-auto text-xs text-slate-400">
                        Transparent PNG · {resultBlob ? formatBytes(resultBlob.size) : ""}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center min-h-[160px] bg-[#090a0f]">
                      <CheckerCanvas src={resultUrl} className="max-h-[200px] w-auto" />
                    </div>
                  </div>
                </>
              ) : (
                /* Original preview */
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#090a0f] flex items-center justify-center min-h-[320px] relative">
                  <img src={originalUrl} alt="Preview" className="max-h-[480px] w-auto object-contain" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-[11px] font-bold text-white border border-white/10">
                    ORIGINAL
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[60%]">{file.name} ({formatBytes(file.size)})</span>
                <button onClick={reset} className="flex items-center gap-1 hover:text-white font-semibold transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" /> Change Image
                </button>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="lg:col-span-4 space-y-4">

              <div className="p-5 rounded-2xl bg-[#0a0c13] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  AI Background Removal
                </h3>
                <p className="text-[12px] text-slate-400 leading-relaxed">
                  Powered by{" "}
                  <span className="text-orange-400 font-semibold">ISNet neural network</span>
                  {" "}— runs 100% in your browser. No uploads to any server.
                </p>

                {stage !== "done" ? (
                  <button
                    onClick={handleRemove}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Eraser className="w-5 h-5" />
                    Remove Background
                  </button>
                ) : (
                  <button
                    onClick={handleRemove}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 text-orange-400" />
                    Re-process Image
                  </button>
                )}

                {stage === "done" && resultBlob && (
                  <button
                    onClick={handleDownload}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PNG (Transparent)
                  </button>
                )}
              </div>

              {/* Info chips */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: <Lock className="w-4 h-4" />, label: "100% Private", sub: "Image never leaves your device", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
                  { icon: <Zap className="w-4 h-4" />, label: "AI-Powered", sub: "ISNet neural segmentation model", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                  { icon: <Layers className="w-4 h-4" />, label: "Transparent PNG", sub: "Perfect for design & presentations", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl border ${item.bg}`}>
                    <div className={item.color}>{item.icon}</div>
                    <div>
                      <p className={`text-xs font-bold ${item.color}`}>{item.label}</p>
                      <p className="text-[11px] text-slate-400">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {stage === "done" && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[11px] text-slate-400">
                    👆 <span className="font-semibold text-slate-300">Drag the divider</span> to compare original vs. result
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}
