'use client';

/**
 * Custom next/image loader.
 *
 * Bypasses Vercel's Image Optimization (which is a paid/quota-limited feature and
 * was returning 402 once the quota was hit, breaking every on-site image).
 *
 * - Local/public assets (e.g. /images/autoshed-logo.png) and data/blob URIs are
 *   served directly, untouched.
 * - Remote images (the AutoTrader vehicle photos) are resized for free via
 *   images.weserv.nl, which fetches the source, resizes to the requested width
 *   and returns WebP — no Vercel optimization cost.
 */
interface ImageLoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderArgs): string {
  // Serve local/public assets and inline URIs as-is (no optimization needed).
  if (!/^https?:\/\//i.test(src)) return src;

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 75),
    output: 'webp',
  });
  return `https://images.weserv.nl/?${params.toString()}`;
}
