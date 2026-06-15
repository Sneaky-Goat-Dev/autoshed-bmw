import { Pool } from 'pg';
import type { Vehicle, StockData } from '@/types';

/**
 * Server-side vehicle data access.
 *
 * Vehicles live in Supabase Postgres (table `public.vehicles`, full object in
 * the `data` jsonb column). We connect directly with `pg` via the connection
 * string in DATABASE_URL (Supabase transaction pooler) — this runs server-side
 * only and is the single source of truth. If the DB is unavailable we fall back
 * to the build-time public/vehicles.json so the site still renders.
 */

// Reuse one pool across hot reloads / serverless invocations.
const globalForPg = globalThis as unknown as { _vehiclesPool?: Pool };

function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  if (!globalForPg._vehiclesPool) {
    const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
    globalForPg._vehiclesPool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
      max: 3,
      connectionTimeoutMillis: 8000,
    });
  }
  return globalForPg._vehiclesPool;
}

async function readJsonFallback(): Promise<StockData | null> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'vehicles.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StockData;
    }
  } catch (error) {
    console.warn('[db] JSON fallback failed:', error);
  }
  return null;
}

/** Active vehicles only (what the website should display). */
export async function getActiveVehicles(): Promise<Vehicle[]> {
  const pool = getPool();
  if (pool) {
    try {
      const { rows } = await pool.query(
        'select data from public.vehicles where is_active = true order by created_at desc'
      );
      return rows.map((r) => r.data as Vehicle);
    } catch (error) {
      console.error('[db] getActiveVehicles failed, falling back to JSON:', error);
    }
  }
  const stock = await readJsonFallback();
  return stock?.vehicles ?? [];
}

/** Active vehicles plus metadata (lastUpdated = newest sync timestamp). */
export async function getStockData(): Promise<StockData> {
  const pool = getPool();
  if (pool) {
    try {
      const { rows } = await pool.query(
        `select data, last_seen_at from public.vehicles
         where is_active = true order by created_at desc`
      );
      const lastUpdated = rows.reduce<string>((max, r) => {
        const t = new Date(r.last_seen_at).toISOString();
        return t > max ? t : max;
      }, new Date(0).toISOString());
      return {
        lastUpdated: rows.length ? lastUpdated : new Date().toISOString(),
        source: 'Supabase',
        vehicleCount: rows.length,
        vehicles: rows.map((r) => r.data as Vehicle),
      };
    } catch (error) {
      console.error('[db] getStockData failed, falling back to JSON:', error);
    }
  }
  const stock = await readJsonFallback();
  return (
    stock ?? { lastUpdated: new Date().toISOString(), source: 'fallback', vehicleCount: 0, vehicles: [] }
  );
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  const vehicles = await getActiveVehicles();
  return vehicles.find((v) => v.id === id);
}
