import React from 'react';

interface DunkinLogoProps {
  className?: string;
  width?: number;
}

export const DunkinLogo: React.FC<DunkinLogoProps> = ({
  className = '',
  width = 140,
}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/assets/dunkin_logo.png"
        alt="Dunkin' Donuts"
        width={width}
        className="h-auto max-h-[140px] object-contain drop-shadow-sm select-none hover:scale-105 transition-transform duration-300"
        loading="eager"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== 'https://i.postimg.cc/zGd1NBGT/5af42b2e31010a24ac46d2cb5a0e60a6.png') {
            target.src = 'https://i.postimg.cc/zGd1NBGT/5af42b2e31010a24ac46d2cb5a0e60a6.png';
          }
        }}
      />
    </div>
  );
};
