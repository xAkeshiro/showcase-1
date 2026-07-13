'use client';

import { useEffect, useRef } from 'react';
import { usePageTransition } from './V2LayoutProvider';

// Circle wipe that expands from the exact click coordinates.
// Radius is animated with rAF and written directly to the DOM node's
// clip-path — no per-frame React state, no layout thrash.

const EXPAND_MS = 450;
const CONTRACT_MS = 420;

function maxRadiusFrom(x: number, y: number) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return (
    Math.sqrt(
      Math.max(x, w - x) ** 2 + Math.max(y, h - y) ** 2
    ) + 40
  );
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

export function PageTransition() {
  const { phase, origin } = usePageTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const radiusRef = useRef(0);

  useEffect(() => {
    const overlay = overlayRef.current;
    const ring = ringRef.current;
    if (!overlay || !ring) return;

    const apply = (r: number) => {
      radiusRef.current = r;
      overlay.style.clipPath = `circle(${r}px at ${origin.x}px ${origin.y}px)`;
      ring.style.background = `radial-gradient(circle at ${origin.x}px ${origin.y}px,
        transparent ${Math.max(0, r - 40)}px,
        rgba(0, 0, 255, 0.25) ${Math.max(0, r - 16)}px,
        rgba(255, 255, 255, 0.06) ${r}px,
        transparent ${r + 1}px)`;
    };

    cancelAnimationFrame(rafRef.current);

    if (phase === 'expanding') {
      const maxR = maxRadiusFrom(origin.x, origin.y);
      const start = performance.now();
      const tick = () => {
        const t = Math.min((performance.now() - start) / EXPAND_MS, 1);
        apply(maxR * easeOutCubic(t));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else if (phase === 'hold') {
      apply(maxRadiusFrom(origin.x, origin.y));
    } else if (phase === 'contracting') {
      const startR = radiusRef.current;
      const start = performance.now();
      const tick = () => {
        const t = Math.min((performance.now() - start) / CONTRACT_MS, 1);
        apply(startR * (1 - easeInCubic(t)));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, origin]);

  // Provider timing removes the overlay right as the contract animation lands on 0.
  if (phase === 'idle') return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        pointerEvents: 'all',
        clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
        background: '#050505',
      }}
    >
      {/* Subtle blue glow radiating from the click point */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          background: `radial-gradient(circle at ${origin.x}px ${origin.y}px,
            rgba(0, 0, 255, 0.35) 0%,
            rgba(0, 0, 255, 0.08) 45%,
            transparent 75%)`,
        }}
      />
      {/* Leading edge ring */}
      <div ref={ringRef} style={{ position: 'absolute', inset: 0 }} />
      {/* Center mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl text-white/20 select-none">★</span>
      </div>
    </div>
  );
}
