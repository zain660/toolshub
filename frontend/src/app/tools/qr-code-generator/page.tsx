"use client";

import React, { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Palette, 
  Wifi, 
  Globe, 
  Mail, 
  Phone,
  FileText
} from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';

export default function QrCodeGeneratorPage() {
  const [qrType, setQrType] = useState<'url' | 'text' | 'wifi' | 'email' | 'phone'>('url');
  const [urlInput, setUrlInput] = useState('https://toolshub.io');
  const [textInput, setTextInput] = useState('Hello from ToolsHub!');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiAuth, setWifiAuth] = useState('WPA');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute payload string
  const getPayload = () => {
    switch (qrType) {
      case 'url': return urlInput || 'https://';
      case 'text': return textInput || ' ';
      case 'wifi': return `WIFI:T:${wifiAuth};S:${wifiSsid};P:${wifiPass};;`;
      case 'email': return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
      case 'phone': return `tel:${phoneNum}`;
      default: return 'https://toolshub.io';
    }
  };

  useEffect(() => {
    const payload = getPayload();
    if (!payload.trim()) return;

    QRCode.toDataURL(payload, {
      width: 400,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor
      },
      errorCorrectionLevel: errorLevel
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [qrType, urlInput, textInput, wifiSsid, wifiPass, wifiAuth, emailTo, emailSubject, phoneNum, fgColor, bgColor, errorLevel]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode_${qrType}.png`;
    a.click();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleCopy = () => {
    if (!qrDataUrl) return;
    fetch(qrDataUrl)
      .then(res => res.blob())
      .then(blob => {
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <ToolLayout slug="qr-code-generator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Inputs & Customization */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* QR Type Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Choose QR Code Content Type
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'url', label: 'URL / Link', icon: Globe },
                { id: 'text', label: 'Plain Text', icon: FileText },
                { id: 'wifi', label: 'WiFi', icon: Wifi },
                { id: 'email', label: 'Email', icon: Mail },
                { id: 'phone', label: 'Phone', icon: Phone },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setQrType(t.id as any)}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    qrType === t.id
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-md font-bold'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="text-[11px]">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Type Specific Fields */}
          <div className="p-6 rounded-2xl bg-[#0a0c14] border border-white/10 space-y-4">
            {qrType === 'url' && (
              <div>
                <label className="text-sm font-bold text-white mb-2 block">Website URL</label>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3.5 text-sm text-white focus:outline-none"
                />
              </div>
            )}

            {qrType === 'text' && (
              <div>
                <label className="text-sm font-bold text-white mb-2 block">Text Content</label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={4}
                  placeholder="Type any message, note, or raw code..."
                  className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3.5 text-sm text-white focus:outline-none"
                />
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-white mb-1.5 block">Network SSID (Name)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="Home_WiFi_5G"
                    className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-white mb-1.5 block">Password</label>
                  <input
                    type="password"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="SecretWiFiPassword"
                    className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {qrType === 'email' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-white mb-1.5 block">Recipient Email</label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-white mb-1.5 block">Subject Line</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Inquiry from QR Code"
                    className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {qrType === 'phone' && (
              <div>
                <label className="text-sm font-bold text-white mb-2 block">Phone Number with Country Code</label>
                <input
                  type="tel"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  placeholder="+1 (555) 000-1234"
                  className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl p-3.5 text-sm text-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Color & Error Correction Customizer */}
          <div className="p-6 rounded-2xl bg-[#0a0c14] border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-orange-400" />
              Styling & Colors
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Foreground Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={fgColor} 
                    onChange={(e) => setFgColor(e.target.value)} 
                    className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-white uppercase">{fgColor}</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Background Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={bgColor} 
                    onChange={(e) => setBgColor(e.target.value)} 
                    className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-white uppercase">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-[#090b12] border border-white/10 space-y-6">
          <div className="text-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Live QR Preview</h3>
            <div className="p-6 rounded-2xl bg-white shadow-2xl inline-block max-w-[280px] mx-auto border-4 border-white">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Generated QR Code" className="w-full h-auto aspect-square" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                  <QrCode className="w-12 h-12 animate-pulse" />
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-4">Scan with any smartphone camera to test.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download High-Res PNG</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">QR Code Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Image to Clipboard</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
