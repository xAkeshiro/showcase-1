'use client';

import { useEffect, useState, useRef } from 'react';
import { useTransition } from './V2LayoutProvider';

export function PageTransition() {
  const { active, origin, phase } = useTransition();
  const [radius, setRadius] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Calculate max radius needed to cover entire viewport from click position
  const getMaxRadius = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Max distance from origin to any corner
    const distances = [
      Math.sqrt(origin.x ** 2 + origin.y ** 2), // to top-left
      Math.sqrt((w - origin.x) ** 2 + origin.y ** 2), // to top-right
      Math.sqrt(origin.x ** 2 + (h - origin.y) ** 2), // to bottom-left
      Math.sqrt((w - origin.x) ** 2 + (h - origin.y) ** 2), // to bottom-right
    ];
    return Math.max(...distances) + 50; // buffer
  };

  useEffect(() => {
    if (phase === 'expanding') {
      const maxR = getMaxRadius();
      startTimeRef.current = performance.now();

      const animate = () => {
        const elapsed = performance.now() - startTimeRef.current;
        const progress = Math.min(elapsed / 400, 1); // 400ms expand
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setRadius(maxR * eased);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    } else if (phase === 'hold') {
      // Keep at max radius
      setRadius(getMaxRadius());
    } else if (phase === 'contracting') {
      const maxR = getMaxRadius();
      startTimeRef.current = performance.now();

      const animate = () => {
        const elapsed = performance.now() - startTimeRef.current;
        const progress = Math.min(elapsed / 400, 1); // 400ms contract
        // Ease-in cubic
        const eased = Math.pow(progress, 3);
        setRadius(maxR * (1 - eased));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setRadius(0);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    } else if (phase === 'idle') {
      setRadius(0);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, origin]);

  if (phase === 'idle' && radius === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        pointerEvents: phase !== 'idle' ? 'all' : 'none',
        // Circle clip-path from click origin
        clipPath: `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
      }}
    >
      {/* Solid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0a0a0a',
        }}
      />

      {/* Chromatic edge glow during transition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          background: `radial-gradient(circle at ${origin.x}px ${origin.y}px,
            rgba(255, 0, 80, 0.3) 0%,
            rgba(0, 200, 255, 0.2) 30%,
            rgba(120, 0, 255, 0.3) 60%,
            transparent 100%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Edge ring glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${origin.x}px ${origin.y}px,
            transparent ${Math.max(0, radius - 80)}px,
            rgba(255, 255, 255, 0.1) ${Math.max(0, radius - 40)}px,
            rgba(255, 255, 255, 0.05) ${radius}px,
            transparent ${radius + 1}px)`,
        }}
      />
    </div>
  );
}
