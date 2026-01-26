'use client';

interface URLDisplayProps {
  url?: string;
}

export function URLDisplay({ url = 'HTTPS://ARKNIGHTS.GLOBAL/' }: URLDisplayProps) {
  return (
    <span className="font-mono text-[10px] text-[#333] tracking-[0.1em] uppercase">
      {url}
    </span>
  );
}
