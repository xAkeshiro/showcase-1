'use client';

import { useRef, useEffect, useState } from 'react';
import { useMouse } from './V2LayoutProvider';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const mouse = useMouse();
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer (not touch)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    setVisible(true);

    // Track hover state for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsPointer(!!interactive);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop for smooth ring following
    let raf: number;
    const animate = () => {
      // Lerp ring position toward mouse
      ringPos.current.x += (mouse.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 5}px, ${mouse.y - 5}px) scale(${isPressed ? 0.8 : 1})`;
      }
      if (ringRef.current) {
        const scale = isPointer ? 1.5 : isPressed ? 0.9 : 1;
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${scale})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(raf);
    };
  }, [mouse.x, mouse.y, isPointer, isPressed]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot - follows mouse immediately */}
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
          zIndex: 10001,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          transition: 'width 0.15s, height 0.15s, background 0.15s',
          ...(isPointer ? { width: 6, height: 6, background: '#fff' } : {}),
        }}
      />
      {/* Outer ring - trails behind with lerp, blue accent on hover */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          zIndex: 10000,
          pointerEvents: 'none',
          transition: 'transform 0.1s ease-out, border-color 0.2s, opacity 0.2s',
          opacity: isPointer ? 1 : 0.3,
          borderColor: isPointer ? 'rgba(0, 0, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
        }}
      />
    </>
  );
}
