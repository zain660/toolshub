"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { BadgeDollarSign, DollarSign, Percent, Calendar, Sparkles } from 'lucide-react';

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('25000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [termYears, setTermYears] = useState<string>('5');

  const p = parseFloat(loanAmount) || 0;
  const annualRate = parseFloat(interestRate) || 0;
  const years = parseFloat(termYears) || 0;

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  // Monthly EMI
  let emi = 0;
  if (p > 0 && monthlyRate > 0 && totalMonths > 0) {
    emi = (p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else if (p > 0 && totalMonths > 0) {
    emi = p / totalMonths;
  }

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - p);

  return (
    <ToolLayout slug="loan-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Parameters */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            Financing & Loan Details
          </h3>

          <div>
            <label className="text-xs text-slate-300 font-bold mb-1.5 block">Loan Amount ($)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="25000"
                className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold mb-1.5 block">Annual Interest Rate (%)</label>
            <div className="relative">
              <Percent className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="6.5"
                className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold mb-1.5 block">Loan Term (Years)</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={termYears}
                onChange={(e) => setTermYears(e.target.value)}
                placeholder="5"
                className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Payment Schedule Summary */}
        <div className="lg:col-span-6 flex flex-col justify-between p-8 rounded-2xl bg-[#0a0c14] border border-white/10 space-y-6">
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Payment Breakdown</h3>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/15 via-[#111422] to-rose-500/5 border border-orange-500/30 text-center space-y-2">
              <span className="text-xs uppercase font-bold text-orange-300">Monthly Estimated EMI</span>
              <h2 className="text-4xl sm:text-5xl font-black text-orange-400 font-mono">
                ${!isNaN(emi) ? emi.toFixed(2) : '0.00'}
              </h2>
              <span className="text-xs text-slate-400 block">
                for {totalMonths} consecutive monthly payments
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Interest</span>
                <p className="text-2xl font-black text-amber-400 font-mono mt-1">
                  ${!isNaN(totalInterest) ? totalInterest.toFixed(2) : '0.00'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Repayment</span>
                <p className="text-2xl font-black text-white font-mono mt-1">
                  ${!isNaN(totalPayment) ? totalPayment.toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 flex items-center justify-between">
            <span>Principal: ${p.toLocaleString()} ({p > 0 && totalPayment > 0 ? ((p / totalPayment) * 100).toFixed(1) : 0}%)</span>
            <span>Interest: ${totalInterest.toFixed(0)} ({totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(1) : 0}%)</span>
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
