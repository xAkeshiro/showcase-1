import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper output for Vercel
  output: undefined, // Let Vercel auto-detect

  // Disable image optimization if causing issues (optional)
  images: {
    unoptimized: false,
  },

  // Ensure external fonts work
  experimental: {
    // Enable if needed for newer features
  },
};

export default nextConfig;
