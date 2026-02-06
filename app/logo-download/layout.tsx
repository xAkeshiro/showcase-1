import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logo Download - KUROSEI',
  description: 'Download KUROSEI brand assets and logos in SVG format.',
};

export default function LogoDownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
