'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface MinimalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const MinimalButton = forwardRef<HTMLButtonElement, MinimalButtonProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative px-6 py-2.5 font-display text-[11px] tracking-[0.15em]',
          'transition-all duration-300',

          variant === 'primary' && [
            'bg-white text-black',
            'hover:bg-[#e0e0e0]',
          ],

          variant === 'secondary' && [
            'bg-transparent text-white',
            'border border-[#333] hover:border-white',
          ],

          variant === 'ghost' && [
            'bg-transparent text-[#888]',
            'hover:text-white',
          ],

          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MinimalButton.displayName = 'MinimalButton';
