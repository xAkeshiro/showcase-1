import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KUROSEI',
  description: 'KUROSEI Creative Studio - Design + Development + Motion',
  openGraph: {
    title: 'KUROSEI',
    description: 'KUROSEI Creative Studio - Design + Development + Motion',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load fonts via CSS link - more reliable than next/font in some environments */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
