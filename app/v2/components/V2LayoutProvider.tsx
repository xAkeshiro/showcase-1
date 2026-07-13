'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  MutableRefObject,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

// ─── Mouse (ref-based: never triggers re-renders) ────────
// Consumers read this ref inside their own rAF loops. Updating a ref on
// mousemove instead of state is what keeps the WebGL layers from being
// torn down and rebuilt while the cursor moves.

export interface MousePosition {
  x: number;
  y: number;
  nx: number; // normalized 0-1
  ny: number; // normalized 0-1, flipped for GL
}

const MouseRefContext = createContext<MutableRefObject<MousePosition> | null>(null);

export function useMouseRef(): MutableRefObject<MousePosition> {
  const ref = useContext(MouseRefContext);
  if (!ref) throw new Error('useMouseRef must be used inside V2LayoutProvider');
  return ref;
}

// ─── Navigation with click-origin transitions ────────────

export type TransitionPhase = 'idle' | 'expanding' | 'hold' | 'contracting';

interface NavCtx {
  navigate: (href: string, e: React.MouseEvent) => void;
  isTransitioning: boolean;
}

interface TransitionCtx {
  phase: TransitionPhase;
  origin: { x: number; y: number };
}

const NavContext = createContext<NavCtx>({ navigate: () => {}, isTransitioning: false });
const TransitionContext = createContext<TransitionCtx>({ phase: 'idle', origin: { x: 0, y: 0 } });

export const useNav = () => useContext(NavContext);
export const usePageTransition = () => useContext(TransitionContext);

// ─── Provider ────────────────────────────────────────────

const EXPAND_MS = 450;
const HOLD_MS = 120;
const CONTRACT_MS = 420;

export function V2LayoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const mouseRef = useRef<MousePosition>({ x: 0, y: 0, nx: 0.5, ny: 0.5 });

  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const transitioningRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.nx = e.clientX / window.innerWidth;
      mouseRef.current.ny = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const navigate = useCallback(
    (href: string, e: React.MouseEvent) => {
      e.preventDefault();
      if (pathname === href || transitioningRef.current) return;

      transitioningRef.current = true;
      setOrigin({ x: e.clientX, y: e.clientY });
      setPhase('expanding');

      timersRef.current.push(
        setTimeout(() => {
          setPhase('hold');
          router.push(href);
        }, EXPAND_MS),
        setTimeout(() => {
          setPhase('contracting');
        }, EXPAND_MS + HOLD_MS),
        setTimeout(() => {
          setPhase('idle');
          transitioningRef.current = false;
        }, EXPAND_MS + HOLD_MS + CONTRACT_MS)
      );
    },
    [pathname, router]
  );

  return (
    <MouseRefContext.Provider value={mouseRef}>
      <NavContext.Provider value={{ navigate, isTransitioning: phase !== 'idle' }}>
        <TransitionContext.Provider value={{ phase, origin }}>
          {children}
        </TransitionContext.Provider>
      </NavContext.Provider>
    </MouseRefContext.Provider>
  );
}
