'use client';

import { URLDisplay } from '@/components/ui/URLDisplay';

const footerLinks = [
  {
    title: 'NAVIGATE',
    links: [
      { label: 'Index', href: '#hero' },
      { label: 'Information', href: '#news' },
      { label: 'Operator', href: '#characters' },
      { label: 'World', href: '#world' },
      { label: 'Media', href: '#media' },
    ],
  },
  {
    title: 'CONNECT',
    links: [
      { label: 'Twitter', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-[#1a1a1a]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[#333] flex items-center justify-center">
                <span className="font-display text-sm text-white">AK</span>
              </div>
              <div>
                <p className="font-display text-xs text-white tracking-[0.15em]">
                  ARKNIGHTS
                </p>
                <p className="font-body-jp text-[10px] text-[#666]">
                  明日方舟
                </p>
              </div>
            </div>
            <p className="font-body text-xs text-[#555] max-w-xs">
              A tactical RPG where you lead a team of Operators against a dystopian future.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-[10px] text-[#666] tracking-[0.2em] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-xs text-[#888] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[10px] text-[#444] tracking-wider">
            © 2026 ARKNIGHTS SHOWCASE
          </p>
          <URLDisplay />
        </div>
      </div>
    </footer>
  );
}
