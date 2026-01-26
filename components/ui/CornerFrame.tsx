'use client';

import { cn } from '@/lib/utils';

interface CornerFrameProps {
  className?: string;
  borderColor?: string;
}

export function CornerFrame({
  className = '',
  borderColor = 'border-[#222]'
}: CornerFrameProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Top Left */}
      <div className={cn('absolute top-0 left-0 w-5 h-5 border-t border-l', borderColor)} />
      {/* Top Right */}
      <div className={cn('absolute top-0 right-0 w-5 h-5 border-t border-r', borderColor)} />
      {/* Bottom Left */}
      <div className={cn('absolute bottom-0 left-0 w-5 h-5 border-b border-l', borderColor)} />
      {/* Bottom Right */}
      <div className={cn('absolute bottom-0 right-0 w-5 h-5 border-b border-r', borderColor)} />
    </div>
  );
}
