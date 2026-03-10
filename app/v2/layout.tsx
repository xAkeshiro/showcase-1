import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KUROSEI — V2 WebGL',
  description: 'KUROSEI creative studio - WebGL enhanced experience',
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
