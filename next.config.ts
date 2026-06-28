import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bypass Vercel's (paid, quota-limited) Image Optimization — which was
    // returning 402 and breaking every image — with a custom loader that resizes
    // remote images for free via images.weserv.nl. See src/lib/image-loader.ts.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
};

export default nextConfig;
