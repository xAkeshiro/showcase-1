'use client';

import { useRef, useEffect, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      // Check if hovering interactive element
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsPointer(!!interactive);
    };

    window.addEventListener('mousemove', move);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 5}px, ${target.current.y - 5}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px) scale(${isPointer ? 1.5 : 1})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [isPointer]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot - follows immediately */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#fff',
          zIndex: 10000,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s',
          ...(isPointer ? { width: 16, height: 16, marginLeft: -3, marginTop: -3 } : {}),
        }}
      />
      {/* Outer ring - trails behind */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'transform 0.15s ease-out, opacity 0.3s',
          opacity: isPointer ? 0.6 : 0.3,
        }}
      />
    </>
  );
}
