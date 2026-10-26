import React, { useState } from 'react';

interface DunkinLogoProps {
  size?: number;
  className?: string;
  showHalo?: boolean;
}

export const DunkinLogo: React.FC<DunkinLogoProps> = ({
  size = 120,
  className = '',
  showHalo = true,
}) => {
  const [imgSrc, setImgSrc] = useState<string>('/assets/dunkin_logo.png');

  // Handle fallback if local asset fails to load
  const handleError = () => {
    if (imgSrc !== 'https://i.postimg.cc/zGd1NBGT/5af42b2e31010a24ac46d2cb5a0e60a6.png') {
      setImgSrc('https://i.postimg.cc/zGd1NBGT/5af42b2e31010a24ac46d2cb5a0e60a6.png');
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: 'auto' }}
    >
      {/* Ambient warm orange/pink halo glow */}
      {showHalo && (
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF671F]/20 to-[#DA1884]/20 blur-xl -z-10 animate-pulse pointer-events-none"
          style={{ animationDuration: '3.5s' }}
        />
      )}

      <img
        src={imgSrc}
        alt="Dunkin' Donuts Official Logo"
        onError={handleError}
        className="w-full h-auto max-h-[160px] object-contain drop-shadow-md select-none transition-transform duration-300 hover:scale-105"
        style={{ maxWidth: size }}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
