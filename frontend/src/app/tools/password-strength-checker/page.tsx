"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Copy, 
  Check, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Lock,
  Sparkles,
  Key
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('MySuperSecur3P@ss!');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generator Options
  const [genLength, setGenLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNums, setUseNums] = useState(true);
  const [useSyms, setUseSyms] = useState(true);

  // Criteria checks
  const hasMinLength = password.length >= 8;
  const hasStrongLength = password.length >= 14;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasMinLength) score++;
  if (hasStrongLength) score++;
  if (hasUpper && hasLower) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong', 'Uncrackable'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981', '#06b6d4'];
  const crackTimes = ['< 1 second', '2 minutes', '3 weeks', '400 years', '2 million years', '100+ billion years'];

  const generatePassword = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNums) chars += '0123456789';
    if (useSyms) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    const array = new Uint32Array(genLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < genLength; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout slug="password-strength-checker">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Strength Evaluator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-6">
            <label className="text-sm font-bold text-white block">Inspect Password Security</label>
            
            {/* Input with Show/Hide & Copy */}
            <div className="relative flex items-center">
              <Key className="w-5 h-5 text-orange-400 absolute left-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type or generate a password..."
                className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl pl-12 pr-24 py-4 text-base font-mono text-white focus:outline-none"
              />
              <div className="absolute right-3 flex items-center gap-1">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-slate-400 hover:text-white"
                  title="Toggle Visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 text-slate-400 hover:text-orange-400"
                  title="Copy Password"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Strength Score Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Entropy Rating</span>
                <span 
                  className="font-bold uppercase tracking-wider" 
                  style={{ color: strengthColors[Math.min(score, 5)] }}
                >
                  {password ? strengthLabels[Math.min(score, 5)] : 'No Password'}
                </span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden flex gap-1 p-0.5 border border-white/5">
                {[0, 1, 2, 3, 4].map(idx => (
                  <div
                    key={idx}
                    className="h-full flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: idx < score ? strengthColors[Math.min(score, 5)] : 'transparent'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Estimated Crack Time Banner */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Estimated Brute-Force Crack Time:</span>
              <span className="font-bold text-white font-mono text-sm">
                {password ? crackTimes[Math.min(score, 5)] : '—'}
              </span>
            </div>

            {/* Criteria Checklist */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Criteria Checklist</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`flex items-center gap-2 ${hasMinLength ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    {hasMinLength ? <Check className="w-3 h-3" /> : '•'}
                  </div>
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 ${hasStrongLength ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasStrongLength ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    {hasStrongLength ? <Check className="w-3 h-3" /> : '•'}
                  </div>
                  <span>14+ characters</span>
                </div>
                <div className={`flex items-center gap-2 ${hasUpper ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasUpper ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    {hasUpper ? <Check className="w-3 h-3" /> : '•'}
                  </div>
                  <span>Uppercase letters (A-Z)</span>
                </div>
                <div className={`flex items-center gap-2 ${hasLower ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasLower ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    {hasLower ? <Check className="w-3 h-3" /> : '•'}
                  </div>
                  <span>Lowercase letters (a-z)</span>
                </div>
                <div className={`flex items-center gap-2 ${hasNumber ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasNumber ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    {hasNumber ? <Check className="w-3 h-3" /> : '•'}
                  </div>
                  <span>Numbers (0-9)</span>
                </div>
                <div className={`flex items-center gap-2 ${hasSymbol ? 'text-emerald-400' : 'text-slate-400'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${hasSymbol ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    {hasSymbol ? <Check className="w-3 h-3" /> : '•'}
                  </div>
                  <span>Symbols (!@#$%)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Password Generator */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0a0c14] border border-white/10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Random Password Generator
              </h3>
            </div>

            {/* Length Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="text-slate-300 font-semibold">Password Length</span>
                <span className="font-mono font-bold text-orange-400 text-sm">{genLength} chars</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={genLength}
                onChange={(e) => setGenLength(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            {/* Character Set Checkboxes */}
            <div className="space-y-3 text-xs font-semibold text-slate-300">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4"
                />
                <span>Include Uppercase Letters (A-Z)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4"
                />
                <span>Include Lowercase Letters (a-z)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useNums}
                  onChange={(e) => setUseNums(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4"
                />
                <span>Include Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSyms}
                  onChange={(e) => setUseSyms(e.target.checked)}
                  className="rounded accent-orange-500 w-4 h-4"
                />
                <span>Include Special Symbols (!@#$%)</span>
              </label>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Secure Password</span>
          </button>
        </div>

      </div>
    </ToolLayout>
  );
}
