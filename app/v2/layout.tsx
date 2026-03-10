import type { Metadata } from 'next';
import { V2LayoutClient } from './V2LayoutClient';

export const metadata: Metadata = {
  title: 'KUROSEI — V2 WebGL',
  description: 'KUROSEI creative studio - WebGL enhanced experience with Buttermax-style effects',
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <V2LayoutClient>{children}</V2LayoutClient>;
}
