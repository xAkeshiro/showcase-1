'use client';

import { useEffect, useRef, useState } from 'react';
import { useMouseRef } from './V2LayoutProvider';

// Dot follows the cursor exactly; ring trails with a lerp.
// All per-frame positioning is written straight to the DOM — the only
// React state here is low-frequency (visibility / hover class).

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useMouseRef();
  const ringPos = useRef({ x: -100, y: -100 });
  const hoverRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hoverRef.current = !!el.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]'
      );
    };
    window.addEventListener('mouseover', onOver, { passive: true });

    let raf = 0;
    let shown = false;
    const tick = () => {
      if (!shown) {
        shown = true;
        setVisible(true);
      }
      const m = mouseRef.current;
      ringPos.current.x += (m.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (m.y - ringPos.current.y) * 0.14;

      const hovering = hoverRef.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${m.x - 4}px, ${m.y - 4}px, 0) scale(${hovering ? 0.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0) scale(${hovering ? 1.5 : 1})`;
        ringRef.current.style.borderColor = hovering
          ? 'rgba(51, 51, 255, 0.9)'
          : 'rgba(255, 255, 255, 0.3)';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [mouseRef]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          mixBlendMode: 'difference',
          zIndex: 10001,
          pointerEvents: 'none',
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          zIndex: 10000,
          pointerEvents: 'none',
          transition: 'border-color 0.25s ease',
        }}
      />
    </>
  );
}
