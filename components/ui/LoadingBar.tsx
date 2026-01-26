'use client';

interface LoadingBarProps {
  progress: number;
}

export function LoadingBar({ progress }: LoadingBarProps) {
  return (
    <div className="w-64">
      <div className="flex justify-between mb-2 font-mono text-xs">
        <span className="text-[#888] tracking-[0.2em]">LOADING</span>
        <span className="text-white">{Math.round(progress)}%</span>
      </div>
      <div className="h-[2px] bg-[#222] overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
