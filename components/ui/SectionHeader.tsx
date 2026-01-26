'use client';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  titleEn: string;
  titleJp?: string;
  label?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({
  titleEn,
  titleJp,
  label,
  align = 'center'
}: SectionHeaderProps) {
  return (
    <div className={cn(
      align === 'center' && 'text-center',
      align === 'left' && 'text-left'
    )}>
      {label && (
        <span className="font-mono text-[10px] text-[#444] tracking-[0.2em] block mb-2">
          {label}
        </span>
      )}
      <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-white tracking-[0.15em]">
        {titleEn}
      </h2>
      {titleJp && (
        <p className="font-body-jp text-sm text-[#666] mt-2">
          {titleJp}
        </p>
      )}
    </div>
  );
}
