'use client';

import { formatSectionNumber } from '@/lib/utils';

interface SectionNumberProps {
  current: number;
  total: number;
}

export function SectionNumber({ current, total }: SectionNumberProps) {
  return (
    <span className="font-mono text-[10px] text-[#333] tracking-[0.15em]">
      {formatSectionNumber(current, total)}
    </span>
  );
}
