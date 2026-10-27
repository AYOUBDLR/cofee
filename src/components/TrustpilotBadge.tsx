import React from 'react';

export const TrustpilotBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-[#EDFAF5] border border-emerald-200/80 shadow-xs ${className}`}
    >
      {/* Official Trustpilot Star Icon Box */}
      <div className="w-5 h-5 rounded-xs bg-[#00B67A] flex items-center justify-center shrink-0 shadow-xs">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5 text-white"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <span className="font-bold text-xs md:text-sm text-slate-900 tracking-tight">
        Trustpilot
      </span>

      <span className="w-px h-3.5 bg-slate-300/80" aria-hidden="true" />

      <span className="font-extrabold text-xs md:text-sm text-slate-800 tabular-nums">
        4.9
      </span>
    </div>
  );
};
