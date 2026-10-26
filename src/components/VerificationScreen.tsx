import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { DunkinLogo } from './DunkinLogo.tsx';

interface VerificationScreenProps {
  onComplete: () => void;
}

const VERIFICATION_STEPS = [
  'Verifying survey responses and eligibility...',
  'Checking available local store inventory...',
  'Authorizing unique promotional discount code...',
  'Reward unlocked successfully!',
];

export const VerificationScreen: React.FC<VerificationScreenProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < VERIFICATION_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 700);
          return prev;
        }
      });
    }, 750);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center bg-[#F8F9FD]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 text-center space-y-6">
        <DunkinLogo size={90} className="mx-auto" />

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900">
            Validating Your Reward
          </h2>
          <p className="text-xs text-slate-500">
            Please wait while we generate your exclusive Dunkin&apos; voucher
          </p>
        </div>

        <div className="space-y-3.5 text-left py-2">
          {VERIFICATION_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex || currentStepIndex === VERIFICATION_STEPS.length - 1;
            const isCurrent = idx === currentStepIndex && idx < VERIFICATION_STEPS.length - 1;

            return (
              <div
                key={step}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-50/60 text-emerald-800'
                    : isCurrent
                    ? 'bg-blue-50/70 text-[#135bec] font-semibold ring-1 ring-[#135bec]/20'
                    : 'text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#135bec] shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-200 shrink-0" />
                )}
                <span className="text-xs md:text-sm">{step}</span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secured with Dunkin&apos; Official Offer Gateway</span>
        </div>
      </div>
    </div>
  );
};
