"use client";

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Tag, DollarSign, Percent, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DiscountCalculatorPage() {
  const [price, setPrice] = useState<string>('120');
  const [discount, setDiscount] = useState<string>('25');
  const [extraCoupon, setExtraCoupon] = useState<string>('10');
  const [salesTax, setSalesTax] = useState<string>('8');

  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const c = parseFloat(extraCoupon) || 0;
  const t = parseFloat(salesTax) || 0;

  // 1. Initial discount
  const primarySavings = p * (d / 100);
  const afterPrimary = p - primarySavings;

  // 2. Extra coupon
  const extraSavings = afterPrimary * (c / 100);
  const afterCoupon = afterPrimary - extraSavings;

  // 3. Total savings before tax
  const totalSavings = primarySavings + extraSavings;

  // 4. Tax amount
  const taxAmount = afterCoupon * (t / 100);
  const finalPrice = afterCoupon + taxAmount;

  const totalDiscountPercentage = p > 0 ? ((p - afterCoupon) / p) * 100 : 0;

  return (
    <ToolLayout slug="discount-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            Discount & Price Parameters
          </h3>

          <div>
            <label className="text-xs text-slate-300 font-bold mb-1.5 block">Original Price ($)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100.00"
                className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold mb-1.5 block">Primary Discount (%)</label>
            <div className="relative">
              <Percent className="w-4 h-4 text-orange-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="20"
                className="w-full bg-black/40 border border-white/15 focus:border-orange-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold mb-1.5 block">Extra Promo / Coupon Discount (%) (Optional)</label>
            <div className="relative">
              <Percent className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={extraCoupon}
                onChange={(e) => setExtraCoupon(e.target.value)}
                placeholder="0"
                className="w-full bg-black/40 border border-white/15 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold mb-1.5 block">Sales Tax / VAT (%) (Optional)</label>
            <div className="relative">
              <Percent className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                value={salesTax}
                onChange={(e) => setSalesTax(e.target.value)}
                placeholder="0"
                className="w-full bg-black/40 border border-white/15 focus:border-white/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Summary Savings Cards */}
        <div className="lg:col-span-6 flex flex-col justify-between p-8 rounded-2xl bg-[#0a0c14] border border-white/10 space-y-6">
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Calculation Breakdown</h3>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-[#111624] to-emerald-500/5 border border-emerald-500/30 text-center space-y-2">
              <span className="text-xs uppercase font-bold text-emerald-300">Final Payable Price</span>
              <h2 className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">
                ${finalPrice.toFixed(2)}
              </h2>
              <span className="text-xs text-slate-400 block">
                (Original: ${p.toFixed(2)} • Total Discount: {totalDiscountPercentage.toFixed(1)}%)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                <span className="text-xs font-bold text-orange-300 uppercase">You Save</span>
                <p className="text-2xl font-black text-orange-400 font-mono mt-1">
                  ${totalSavings.toFixed(2)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Estimated Tax</span>
                <p className="text-2xl font-black text-white font-mono mt-1">
                  ${taxAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Primary Savings ({d}%):</span>
              <span className="font-mono text-slate-200">-${primarySavings.toFixed(2)}</span>
            </div>
            {c > 0 && (
              <div className="flex justify-between">
                <span>Extra Promo ({c}%):</span>
                <span className="font-mono text-slate-200">-${extraSavings.toFixed(2)}</span>
              </div>
            )}
            {t > 0 && (
              <div className="flex justify-between">
                <span>Tax Added ({t}%):</span>
                <span className="font-mono text-slate-200">+${taxAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
