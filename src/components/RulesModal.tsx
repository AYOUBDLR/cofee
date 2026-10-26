import React from 'react';
import { X, CheckCircle2, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  onProceed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF671F]" />
            <h2 className="text-lg font-bold text-slate-900">
              Official Program Rules & Eligibility
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close rules"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-sm text-slate-600">
          {/* Highlight Rule Box */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/60 text-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-[#E8590C] font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              Core Participation Requirement
            </div>
            <p className="font-semibold text-slate-900 text-base">
              Complete a short survey to unlock your exclusive reward.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upon successful completion of the 3-question survey, your personalized promotional discount voucher will be immediately generated and unlocked for mobile or in-store redemption.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-xs tracking-wider uppercase text-slate-400">
              Program Details & Terms
            </h3>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Eligibility & Selection</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Offered exclusively to selected patrons visiting this promotional portal. Valid for one (1) reward claim per verified customer or mobile device.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Survey Rule & Verification</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Participants must provide answers to all brief questions regarding their dining preferences. No payment or credit card is required to claim this reward.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Storewide Validity</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Vouchers are redeemable at participating Dunkin&apos; store locations nationwide, through drive-thru orders, and applicable for order ahead in the Dunkin&apos; app.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Expiration & Inventory Cap</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Allocated promotional codes remain active for 24 hours once issued or until daily store quotas are exhausted.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-Bit SSL Encrypted Verification • 100% Free & No Subscription</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onProceed();
            }}
            className="px-6 py-2.5 text-sm font-bold text-white bg-[#135bec] hover:bg-[#0f4ac4] rounded-full shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            I Understand, Continue →
          </button>
        </div>
      </div>
    </div>
  );
};
