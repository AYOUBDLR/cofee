import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, MapPin, Smartphone, QrCode, ArrowLeft, Clock } from 'lucide-react';
import { VoucherDetails } from '../types.ts';
import { DunkinLogo } from './DunkinLogo.tsx';

interface RewardScreenProps {
  voucher: VoucherDetails;
  onReset: () => void;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({ voucher, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59); // 14:59 countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(voucher.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-center bg-[#F8F9FD]">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-slate-300/60 border border-slate-100 overflow-hidden relative">
        {/* Top Celebration Header */}
        <div className="bg-gradient-to-br from-[#FF671F] via-[#E65100] to-[#DA1884] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-15">
            <Sparkles className="w-24 h-24" />
          </div>

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Reward Successfully Unlocked
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {voucher.title}
            </h1>
            <p className="text-xs text-white/90">
              Your promotional voucher code has been validated and activated
            </p>
          </div>
        </div>

        {/* Voucher Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Logo & Expiry Notice */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DunkinLogo size={52} />
              <div>
                <p className="font-bold text-slate-800 text-sm">Dunkin&apos; Rewards Offer</p>
                <p className="text-xs text-slate-400">Single-use digital pass</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs border border-red-100">
              <Clock className="w-3.5 h-3.5" />
              <span>Expires in {formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Code Ticket Box */}
          <div className="p-5 rounded-2xl bg-[#FFF9F5] border-2 border-dashed border-[#FF671F]/40 text-center space-y-3 relative">
            <p className="text-xs font-bold text-[#E8590C] uppercase tracking-wider">
              Exclusive Voucher Code
            </p>

            <div className="text-2xl md:text-3xl font-mono font-extrabold text-slate-900 tracking-wider">
              {voucher.code}
            </div>

            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FF671F] hover:bg-[#E65100] text-white shadow-md shadow-orange-500/25 active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Voucher Code</span>
                </>
              )}
            </button>
          </div>

          {/* Barcode / QR Simulation */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <QrCode className="w-4 h-4 text-[#135bec]" />
              In-Store Scan Barcode
            </div>

            {/* Generated barcode lines */}
            <div className="flex items-end justify-center h-16 w-full max-w-[280px] gap-[3px] py-2 bg-white rounded-lg px-4 border border-slate-200">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 4, 1, 3, 2, 1, 4, 3, 2, 1, 3, 2].map(
                (weight, i) => (
                  <div
                    key={i}
                    className="bg-slate-900 rounded-xs"
                    style={{
                      width: `${weight * 2.2}px`,
                      height: i % 2 === 0 ? '100%' : '85%',
                    }}
                  />
                )
              )}
            </div>
            <p className="text-[11px] font-mono text-slate-500">
              AUTH REF: {voucher.securityHash} • ONE TIME USE
            </p>
          </div>

          {/* Redemption Steps */}
          <div className="space-y-3 pt-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              How To Redeem
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-[#135bec] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Dunkin&apos; App / Online</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Paste code into the promo field during mobile checkout.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF671F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">In-Store / Drive-Thru</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Show the barcode on this screen to your cashier at checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Return button */}
          <div className="pt-2">
            <button
              onClick={onReset}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Promo Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
