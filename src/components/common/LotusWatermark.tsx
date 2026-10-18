import React, { memo } from 'react';

export interface LotusWatermarkProps {
  position?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'center'
    | 'center-right'
    | 'center-left';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  mirrored?: boolean;
  className?: string;
  glow?: boolean;
}

export const LotusWatermark: React.FC<LotusWatermarkProps> = memo(({
  position = 'bottom-right',
  size = 'md',
  opacity = 0.05,
  mirrored = false,
  className = '',
  glow = true,
}) => {
  const sizeClasses = {
    sm: 'w-28 sm:w-36 md:w-44',
    md: 'w-44 sm:w-56 md:w-68',
    lg: 'w-56 sm:w-72 md:w-88',
    xl: 'w-72 sm:w-96 md:w-[420px]',
  };

  const positionClasses = {
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'center-right': 'top-1/2 right-0 translate-x-1/4 -translate-y-1/2',
    'center-left': 'top-1/2 left-0 -translate-x-1/4 -translate-y-1/2',
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none select-none z-0 aspect-square overflow-hidden max-w-[45vw] sm:max-w-none ${positionClasses[position]} ${sizeClasses[size]} ${mirrored ? '-scale-x-100' : ''} ${className}`}
      style={{
        opacity,
        filter: glow ? 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.22))' : 'none',
      }}
    >
      <img
        src="/sacred-lotus.png"
        alt=""
        className="w-full h-full object-contain pointer-events-none select-none"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

LotusWatermark.displayName = 'LotusWatermark';
