'use client';

import { formatArknightsDate } from '@/lib/utils';

interface ArknightsDateProps {
  date: Date;
}

export function ArknightsDate({ date }: ArknightsDateProps) {
  return (
    <span className="font-mono text-[10px] text-[#888] tracking-[0.1em]">
      {formatArknightsDate(date)}
    </span>
  );
}
