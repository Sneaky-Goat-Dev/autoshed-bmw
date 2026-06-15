import { NextResponse } from 'next/server';
import { getStockData } from '@/lib/db';

// Always read live from the DB — never cache, so the site reflects the latest sync.
export const dynamic = 'force-dynamic';

export async function GET() {
  const stock = await getStockData();
  return NextResponse.json(stock);
}
