import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve images directly from source (AutoTrader CDN + local /public) with no
    // optimization. Avoids Vercel's paid optimizer (was 402-ing) AND any
    // third-party resizer — so image rendering depends only on the AutoTrader CDN,
    // which is already a hard dependency. Trade-off: full-size images (no resizing).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.autotrader.co.za',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
