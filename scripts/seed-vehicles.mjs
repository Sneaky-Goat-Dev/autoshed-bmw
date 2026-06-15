/**
 * One-off seed: load public/vehicles.json into the `vehicles` table.
 * Used to populate a fresh DB (prod or local) before the live sync takes over.
 *
 * Usage:  DATABASE_URL=postgres://... node scripts/seed-vehicles.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const stock = JSON.parse(readFileSync(join(__dirname, '..', 'public', 'vehicles.json'), 'utf-8'));
const vehicles = stock.vehicles ?? [];

const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
const pool = new pg.Pool({ connectionString, ssl: isLocal ? false : { rejectUnauthorized: false } });

let count = 0;
for (const v of vehicles) {
  await pool.query(
    `insert into public.vehicles (id, is_active, data, last_seen_at, updated_at)
     values ($1, true, $2::jsonb, now(), now())
     on conflict (id) do update
       set data = excluded.data, is_active = true, last_seen_at = now(), updated_at = now()`,
    [String(v.id), JSON.stringify(v)]
  );
  count++;
}

console.log(`Seeded ${count} vehicles.`);
await pool.end();
