'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// ─── Mouse Context ───────────────────────────────────────
interface MouseCtx {
  x: number;
  y: number;
  normalized: { x: number; y: number };
}

const MouseContext = createContext<MouseCtx>({
  x: 0,
  y: 0,
  normalized: { x: 0.5, y: 0.5 },
});

export const useMouse = () => useContext(MouseContext);

// ─── Navigation Context ──────────────────────────────────
interface NavCtx {
  navigate: (href: string, e: React.MouseEvent) => void;
  isTransitioning: boolean;
}

const NavContext = createContext<NavCtx>({
  navigate: () => {},
  isTransitioning: false,
});

export const useNav = () => useContext(NavContext);

// ─── Transition Context ──────────────────────────────────
interface TransitionCtx {
  active: boolean;
  origin: { x: number; y: number };
  phase: 'idle' | 'expanding' | 'hold' | 'contracting';
}

const TransitionContext = createContext<TransitionCtx>({
  active: false,
  origin: { x: 0, y: 0 },
  phase: 'idle',
});

export const useTransition = () => useContext(TransitionContext);

// ─── Layout Provider ─────────────────────────────────────
interface V2LayoutProviderProps {
  children: ReactNode;
}

export function V2LayoutProvider({ children }: V2LayoutProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Mouse state
  const [mouse, setMouse] = useState<MouseCtx>({
    x: 0,
    y: 0,
    normalized: { x: 0.5, y: 0.5 },
  });

  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'expanding' | 'hold' | 'contracting'>('idle');
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  // Track mouse position
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalized: {
          x: e.clientX / window.innerWidth,
          y: 1 - e.clientY / window.innerHeight, // flip Y for GL coords
        },
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Navigation function - captures click position for transition origin
  const navigate = useCallback((href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === href || isTransitioning) return;

    // Capture click position
    setTransitionOrigin({ x: e.clientX, y: e.clientY });
    setPendingRoute(href);
    setIsTransitioning(true);
    setTransitionPhase('expanding');

    // Phase 1: Circle expands from click point
    setTimeout(() => {
      setTransitionPhase('hold');
      // Actually navigate
      router.push(href);
    }, 450);

    // Phase 2: Circle contracts to reveal new page
    setTimeout(() => {
      setTransitionPhase('contracting');
    }, 550);

    setTimeout(() => {
      setTransitionPhase('idle');
      setIsTransitioning(false);
      setPendingRoute(null);
    }, 950);
  }, [pathname, isTransitioning, router]);

  return (
    <MouseContext.Provider value={mouse}>
      <NavContext.Provider value={{ navigate, isTransitioning }}>
        <TransitionContext.Provider
          value={{
            active: isTransitioning,
            origin: transitionOrigin,
            phase: transitionPhase,
          }}
        >
          {children}
        </TransitionContext.Provider>
      </NavContext.Provider>
    </MouseContext.Provider>
  );
}
