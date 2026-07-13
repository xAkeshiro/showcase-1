'use client';

import { ReactNode } from 'react';
import { useNav } from './V2LayoutProvider';

// Anchor that routes through the click-origin page transition.

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function TransitionLink({ href, children, className, onMouseEnter, onMouseLeave }: TransitionLinkProps) {
  const { navigate } = useNav();
  return (
    <a
      href={href}
      onClick={(e) => navigate(href, e)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      data-cursor="pointer"
    >
      {children}
    </a>
  );
}
