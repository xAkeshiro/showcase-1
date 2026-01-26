'use client';

import { cn } from '@/lib/utils';

interface CornerFrameProps {
  className?: string;
  borderColor?: string;
  theme?: 'dark' | 'light';
}

export function CornerFrame({
  className = '',
  borderColor,
  theme = 'dark',
}: CornerFrameProps) {
  const defaultBorderColor = theme === 'dark' ? 'border-[#222]' : 'border-[#ddd]';
  const finalBorderColor = borderColor || defaultBorderColor;

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Top Left */}
      <div className={cn('absolute top-0 left-0 w-5 h-5 border-t border-l', finalBorderColor)} />
      {/* Top Right */}
      <div className={cn('absolute top-0 right-0 w-5 h-5 border-t border-r', finalBorderColor)} />
      {/* Bottom Left */}
      <div className={cn('absolute bottom-0 left-0 w-5 h-5 border-b border-l', finalBorderColor)} />
      {/* Bottom Right */}
      <div className={cn('absolute bottom-0 right-0 w-5 h-5 border-b border-r', finalBorderColor)} />
    </div>
  );
}
