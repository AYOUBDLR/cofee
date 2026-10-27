/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { DunkinLogo } from './components/DunkinLogo.tsx';
import { TrustpilotBadge } from './components/TrustpilotBadge.tsx';
import { FaqSection } from './components/FaqSection.tsx';

export default function App() {
  const REDIRECT_URL = 'https://giftclick.org/aff_c?offer_id=1763&aff_id=144361';

  // Direct automatic redirection on click
  const handleRedirect = () => {
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = REDIRECT_URL;
        return;
      }
    } catch {
      // Cross-origin iframe boundary
    }

    try {
      window.location.assign(REDIRECT_URL);
    } catch {
      window.location.href = REDIRECT_URL;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1E1B18] flex flex-col justify-between selection:bg-orange-100 selection:text-orange-900">
      {/* Top Header & Hero Area */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 flex flex-col items-center text-center">
        {/* Brand Logo */}
        <div className="mb-6">
          <DunkinLogo width={145} />
        </div>

        {/* Savings Eyebrow */}
        <div className="inline-flex items-center gap-2 text-[#E65100] font-bold text-xs sm:text-sm tracking-wider uppercase mb-3">
          <CheckCircle2 className="w-4 h-4 text-[#FF671F] stroke-[2.2]" />
          <span>Dunkin&apos; Donuts Savings Offer</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1E1B18] tracking-tight leading-tight mb-3">
          Save up to <span className="text-[#FF671F]">$100</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#3A3530] font-medium max-w-xl mx-auto mb-3">
          Check your eligibility for{' '}
          <strong className="text-[#1E1B18] font-bold">
            up to $100 in Dunkin&apos; Donuts savings.
          </strong>
        </p>

        {/* Disclaimer Note */}
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#8A7438] font-medium mb-5">
          <ShieldCheck className="w-4 h-4 text-[#C4820A] shrink-0" />
          <span>Eligibility check and sponsored deals required.</span>
        </div>

        {/* Trustpilot Score Badge */}
        <div className="mb-10 sm:mb-12">
          <TrustpilotBadge />
        </div>

        {/* 3-Step Process Card Container */}
        <div className="w-full max-w-4xl bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 md:divide-x md:divide-stone-200/80">
            {/* Step 1 */}
            <div className="flex items-center gap-3.5 md:px-4 text-left">
              <span className="w-8 h-8 rounded-full border border-[#FF671F]/70 text-[#E65100] font-bold text-sm flex items-center justify-center shrink-0 bg-orange-50/50">
                1
              </span>
              <span className="text-sm md:text-base font-bold text-[#1E1B18] leading-snug">
                Check your savings eligibility
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3.5 md:px-4 text-left">
              <span className="w-8 h-8 rounded-full border border-[#FF671F]/70 text-[#E65100] font-bold text-sm flex items-center justify-center shrink-0 bg-orange-50/50">
                2
              </span>
              <span className="text-sm md:text-base font-bold text-[#1E1B18] leading-snug">
                Complete 4–5 sponsored deals
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3.5 md:px-4 text-left">
              <span className="w-8 h-8 rounded-full border border-[#FF671F]/70 text-[#E65100] font-bold text-sm flex items-center justify-center shrink-0 bg-orange-50/50">
                3
              </span>
              <span className="text-sm md:text-base font-bold text-[#1E1B18] leading-snug">
                Claim up to $100 in Dunkin&apos; Donuts savings
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA Button: CLAIM NOW -> */}
        <div className="w-full flex justify-center mb-16 sm:mb-20">
          <a
            href={REDIRECT_URL}
            target="_top"
            rel="noopener noreferrer"
            onClick={handleRedirect}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-12 sm:px-16 rounded-xl bg-[#FF671F] hover:bg-[#E65100] active:scale-[0.99] text-white font-extrabold text-base sm:text-lg tracking-wide uppercase shadow-lg shadow-orange-600/25 transition-all duration-200 cursor-pointer"
          >
            <span>Claim Now</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </a>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="w-full mb-12">
          <FaqSection />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full border-t border-stone-200/70 bg-[#FFFDF7] py-8 px-4 text-center">
        <p className="text-xs sm:text-sm text-[#7D756C] max-w-3xl mx-auto leading-relaxed">
          Promotional savings offer. Eligibility check and sponsored deals required. Savings up to
          $100, subject to terms and availability.
        </p>
      </footer>
    </div>
  );
}
