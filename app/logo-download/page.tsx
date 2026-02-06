'use client';

import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const logos = [
  {
    name: 'Logo Mark',
    description: 'Icon only - Black',
    file: '/logo.svg',
    preview: 'bg-white',
  },
  {
    name: 'Logo Mark (White)',
    description: 'Icon only - White',
    file: '/logo-white.svg',
    preview: 'bg-black',
  },
  {
    name: 'Full Wordmark',
    description: 'Logo with KUROSEI text',
    file: '/logo-wordmark.svg',
    preview: 'bg-white',
  },
];

export default function LogoDownloadPage() {
  const handleDownload = (file: string, filename: string) => {
    const link = document.createElement('a');
    link.href = file;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#eee]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#666] hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="font-mono text-xs tracking-wider">BACK TO HOME</span>
          </Link>
          <span className="font-display text-sm tracking-[0.2em]">KUROSEI</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-[10px] text-[#999] tracking-wider block mb-4">
              BRAND ASSETS
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-black tracking-[0.05em] mb-4">
              LOGO DOWNLOAD
            </h1>
            <p className="font-body text-sm text-[#666] max-w-md mx-auto">
              Download our logo in SVG format for use in your projects.
              All assets are vector-based for maximum quality at any size.
            </p>
          </motion.div>

          {/* Logo Grid */}
          <div className="grid gap-8">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-white rounded-lg border border-[#eee] overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  {/* Preview */}
                  <div
                    className={`${logo.preview} p-12 flex items-center justify-center min-h-[200px] border-b md:border-b-0 md:border-r border-[#eee]`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.file}
                      alt={logo.name}
                      className="max-w-full max-h-[120px] object-contain"
                    />
                  </div>

                  {/* Info & Download */}
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="font-display text-xl text-black tracking-wider mb-2">
                      {logo.name}
                    </h2>
                    <p className="font-body text-sm text-[#666] mb-6">
                      {logo.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {/* Direct link */}
                      <a
                        href={logo.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] hover:bg-[#eee] text-black font-mono text-xs tracking-wider transition-colors rounded"
                      >
                        VIEW SVG
                      </a>

                      {/* Download button */}
                      <button
                        onClick={() =>
                          handleDownload(
                            logo.file,
                            logo.file.split('/').pop() || 'logo.svg'
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-[#222] text-white font-mono text-xs tracking-wider transition-colors rounded"
                      >
                        <Download size={14} />
                        DOWNLOAD
                      </button>
                    </div>

                    {/* Direct URL */}
                    <div className="mt-6 pt-4 border-t border-[#eee]">
                      <span className="font-mono text-[9px] text-[#999] tracking-wider block mb-1">
                        DIRECT URL
                      </span>
                      <code className="font-mono text-xs text-[#666] bg-[#f5f5f5] px-2 py-1 rounded block overflow-x-auto">
                        kurosei.studio{logo.file}
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Usage Guidelines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 p-8 bg-white rounded-lg border border-[#eee]"
          >
            <h3 className="font-display text-lg text-black tracking-wider mb-4">
              USAGE GUIDELINES
            </h3>
            <ul className="space-y-3 font-body text-sm text-[#666]">
              <li className="flex items-start gap-3">
                <span className="text-black">•</span>
                <span>Maintain clear space around the logo equal to the height of the star icon</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black">•</span>
                <span>Do not stretch, distort, or alter the logo proportions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black">•</span>
                <span>Use the white version on dark backgrounds for optimal visibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black">•</span>
                <span>Minimum size: 32px height for digital, 10mm for print</span>
              </li>
            </ul>
          </motion.div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#999] hover:text-black tracking-wider transition-colors"
            >
              <ArrowLeft size={14} />
              RETURN TO HOMEPAGE
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#eee] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-mono text-[9px] text-[#999] tracking-wider">
            © 2026 KUROSEI — ALL RIGHTS RESERVED
          </span>
        </div>
      </footer>
    </div>
  );
}
