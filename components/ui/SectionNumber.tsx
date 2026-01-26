'use client';

import { formatSectionNumber } from '@/lib/utils';

interface SectionNumberProps {
  current: number;
  total: number;
  theme?: 'dark' | 'light';
}

export function SectionNumber({ current, total, theme = 'dark' }: SectionNumberProps) {
  const textColor = theme === 'dark' ? 'text-[#333]' : 'text-[#bbb]';

  return (
    <span className={`font-mono text-[10px] tracking-[0.15em] ${textColor}`}>
      {formatSectionNumber(current, total)}
    </span>
  );
}
