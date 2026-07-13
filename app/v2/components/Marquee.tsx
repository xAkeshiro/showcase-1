'use client';

import { ReactNode } from 'react';

// Seamless CSS marquee — content is rendered twice and the track
// translates -50%, so the loop point is invisible.

interface MarqueeProps {
  children: ReactNode;
  duration?: number; // seconds per loop
  className?: string;
}

export function Marquee({ children, duration = 30, className = '' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="v2-marquee-track"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
