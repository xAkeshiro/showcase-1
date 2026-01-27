import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KUROSEI',
  description: 'KUROSEI Creative Studio - Design + Development + Motion',
  openGraph: {
    title: 'KUROSEI',
    description: 'KUROSEI Creative Studio - Design + Development + Motion',
    type: 'website',
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
