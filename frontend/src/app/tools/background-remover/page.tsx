import dynamic from 'next/dynamic';

// Prevent SSR - @imgly/background-removal uses WebAssembly & WebGPU (browser-only)
const BackgroundRemoverTool = dynamic(
  () => import('./_client'),
  { ssr: false, loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#090a0f]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-orange-500 animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">Loading Background Remover…</p>
      </div>
    </div>
  )}
);

export default function BackgroundRemoverPage() {
  return <BackgroundRemoverTool />;
}
