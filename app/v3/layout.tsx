import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KUROSEI — V3',
  description: 'KUROSEI Creative Studio - Design + Development + Motion (V3 Preview)',
  openGraph: {
    title: 'KUROSEI — V3',
    description: 'KUROSEI Creative Studio - Design + Development + Motion',
    type: 'website',
  },
};

export default function V3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
