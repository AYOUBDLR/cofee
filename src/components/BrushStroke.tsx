import React from 'react';

export const BrushStroke: React.FC<{ className?: string }> = ({ className = 'w-full h-3' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 320 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M2.5 11.2C48.8 6.5 112.4 3.8 178.6 4.6C236.2 5.3 285.5 8.1 316.5 11.8C318.2 12 317.8 8.8 314.2 7.6C282.1 3.5 231.8 1.5 174.5 1.1C108.6 0.7 45.3 3.6 3.5 9.1C1.8 9.3 1.2 11.3 2.5 11.2Z"
        fill="#FF671F"
      />
    </svg>
  );
};
