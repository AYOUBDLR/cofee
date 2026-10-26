/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Gift,
  Shield,
  Zap,
  Sparkles,
  Tag,
  Star,
  ArrowRight,
  Info,
  Clock,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { DunkinLogo } from './components/DunkinLogo.tsx';
import { BrushStroke } from './components/BrushStroke.tsx';
import { RulesModal } from './components/RulesModal.tsx';
import { SurveyFlow } from './components/SurveyFlow.tsx';
import { VerificationScreen } from './components/VerificationScreen.tsx';
import { RewardScreen } from './components/RewardScreen.tsx';
import { ViewState, VoucherDetails } from './types.ts';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [remainingCount, setRemainingCount] = useState(6718);
  const [activeVoucher, setActiveVoucher] = useState<VoucherDetails | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);
  // Live simulation to make remaining counter tick subtly
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingCount((prev) => (prev > 10 ? prev - 1 : prev));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Periodic subtle social proof popups
  useEffect(() => {
    const names = ['Michael R.', 'Jessica T.', 'Brandon K.', 'Sophia L.', 'David W.', 'Emily S.'];
    const cities = ['Boston, MA', 'Chicago, IL', 'New York, NY', 'Philadelphia, PA', 'Miami, FL'];

    const toastTimer = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setToastNotification(`${randomName} from ${randomCity} just claimed their reward!`);

      setTimeout(() => {
        setToastNotification(null);
      }, 4000);
    }, 18000);

    return () => clearInterval(toastTimer);
  }, []);

  const REDIRECT_URL = 'https://giftclick.org/aff_c?offer_id=1763&aff_id=144361';

  // Direct automatic redirection on click
  const handleRedirect = (e?: React.MouseEvent) => {
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

  const handleSurveyComplete = (voucher: VoucherDetails) => {
    setActiveVoucher(voucher);
    setViewState('verifying');
  };

  const handleVerificationDone = () => {
    setViewState('reward');
  };

  const handleResetToLanding = () => {
    setViewState('landing');
  };

  if (viewState === 'survey') {
    return (
      <SurveyFlow
        onBack={() => setViewState('landing')}
        onComplete={handleSurveyComplete}
      />
    );
  }

  if (viewState === 'verifying') {
    return <VerificationScreen onComplete={handleVerificationDone} />;
  }

  if (viewState === 'reward' && activeVoucher) {
    return <RewardScreen voucher={activeVoucher} onReset={handleResetToLanding} />;
  }

  return (
    <main className="min-h-screen bg-[#F6F7FB] flex flex-col items-center justify-start pt-8 pb-16 px-4 relative selection:bg-orange-100 selection:text-orange-900">
      {/* Dynamic Claim Notification Toast */}
      {toastNotification && (
        <div className="fixed top-4 right-4 z-40 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg shadow-slate-200/80 border border-slate-100 text-xs font-medium text-slate-700 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Top Dunkin' Donuts Logo Emblem */}
        <div className="mb-5">
          <DunkinLogo size={124} />
        </div>

        {/* Top Pill Action / Status */}
        <div className="mb-5">
          <a
            href={REDIRECT_URL}
            target="_top"
            rel="noopener noreferrer"
            onClick={handleRedirect}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#135bec] hover:bg-[#0f4ac4] text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>Claim Reward</span>
          </a>
        </div>

        {/* The Primary Offer Card */}
        <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/70 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle decorative top glow */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FF671F] via-[#DA1884] to-[#135bec]" />

          {/* EXCLUSIVE OFFER Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8590C] text-white text-[11px] md:text-xs font-black uppercase tracking-wider shadow-xs">
              EXCLUSIVE OFFER
            </span>
          </div>

          {/* Main Headline with Brush Stroke Underline */}
          <div className="mb-4 space-y-1 max-w-md">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827] tracking-tight leading-tight">
              You&apos;ve been selected for the{' '}
              <span className="relative inline-block text-slate-900">
                Dunkin&apos; Donuts Rewards Program
                <BrushStroke className="absolute -bottom-2 left-0 w-full h-3.5 text-[#FF671F] pointer-events-none" />
              </span>
            </h1>
          </div>

          {/* Subtext Rule Highlight Box */}
          <div className="mt-2 mb-6 p-4 rounded-2xl bg-orange-50/70 border border-orange-100 text-slate-700 max-w-sm w-full space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[#E8590C] font-bold text-xs uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4" />
              <span>Mandatory Program Rule</span>
            </div>
            <p className="text-sm md:text-base font-bold text-slate-900">
              Complete a short survey to unlock your exclusive reward.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Claim your instant promotional discount code directly to your device — valid for all orders today.
            </p>
          </div>

          {/* Stock Availability Pill: 6,718 left to claim */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{remainingCount.toLocaleString()} left to claim</span>
            </div>
          </div>

          {/* The Main CTA Button: Redirects to designated URL */}
          <a
            href={REDIRECT_URL}
            target="_top"
            rel="noopener noreferrer"
            onClick={handleRedirect}
            className="w-full py-4 px-8 rounded-full bg-[#135bec] hover:bg-[#0f4ac4] text-white font-bold text-lg md:text-xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2 mb-4 group cursor-pointer text-center"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 mb-8 flex-wrap">
            <div className="flex items-center gap-1.5 text-blue-600">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Instant Code</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-600">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Instant Access</span>
            </div>
          </div>

          {/* Three Feature Highlight Cards with Warm Yellow Icons */}
          <div className="grid grid-cols-3 gap-3 w-full pt-1">
            {/* Feature 1: Instant Savings */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#FFBE1A] flex items-center justify-center shadow-sm mb-2 text-slate-900">
                <Tag className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight">
                Instant Savings
              </span>
            </div>

            {/* Feature 2: Storewide Valid */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#FFBE1A] flex items-center justify-center shadow-sm mb-2 text-slate-900">
                <Star className="w-6 h-6 stroke-[2.2] fill-transparent" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight">
                Storewide Valid
              </span>
            </div>

            {/* Feature 3: Free Shipping / Delivery */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#FFBE1A] flex items-center justify-center shadow-sm mb-2 text-slate-900">
                <Sparkles className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight">
                Free Shipping
              </span>
            </div>
          </div>

          {/* Rule Breakdown Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => setIsRulesOpen(true)}
              className="inline-flex items-center gap-1 text-[#135bec] hover:underline font-medium"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Read Official Survey & Reward Rules</span>
            </button>

            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              SSL 256-Bit
            </span>
          </div>
        </div>

        {/* Footer info and security disclaimer */}
        <footer className="mt-8 text-center text-xs text-slate-400 max-w-sm space-y-2">
          <p>
            Promotional program for selected guests. Complete the quick verification survey to claim your unique digital discount coupon.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setIsRulesOpen(true)} className="hover:underline">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => setIsRulesOpen(true)} className="hover:underline">
              Privacy Notice
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Offer ends midnight
            </span>
          </div>
        </footer>
      </div>

      {/* Rules & Eligibility Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        onProceed={handleRedirect}
      />
    </main>
  );
}
