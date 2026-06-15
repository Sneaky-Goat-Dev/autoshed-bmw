/**
 * AutoTrader -> Supabase sync (runs on the VPS via cron, every 10 min).
 *
 * Fetches the dealership's current AutoTrader listings and reconciles the
 * `vehicles` table:
 *   - present in API  -> upsert + is_active = true   (reactivates returning cars)
 *   - absent from API -> is_active = false           (deactivates sold/removed cars)
 * The full vehicle object is stored in the `data` jsonb column.
 *
 * Self-contained: only needs `pg` and Node's global fetch (Node 18+).
 *
 * Env: AUTOTRADER_API_URL, AUTOTRADER_USERNAME, AUTOTRADER_PASSWORD,
 *      AUTOTRADER_DEALER_ID (optional), DATABASE_URL
 */
import pg from 'pg';

const {
  AUTOTRADER_API_URL,
  AUTOTRADER_USERNAME,
  AUTOTRADER_PASSWORD,
  AUTOTRADER_DEALER_ID,
  DATABASE_URL,
} = process.env;

const log = (...a) => console.log(new Date().toISOString(), ...a);

function formatEngineCapacity(cc) {
  return cc ? `${cc.toLocaleString()} cc` : undefined;
}

function extractFeaturesFromDescription(description) {
  return (description || '')
    .split('\n')
    .filter((line) => line.trim().startsWith('•'))
    .map((line) => line.trim().replace(/^•\s*/, '').trim())
    .filter(Boolean);
}

function parsePrice(priceString) {
  // API returns price like "183936,0000"
  const clean = String(priceString ?? '').replace(',', '.');
  return Math.round(parseFloat(clean)) || 0;
}

function transformListingToVehicle(l) {
  return {
    id: l.id?.toString() || l.stockNumber || `${l.make}-${l.model}-${l.year}`,
    make: l.make,
    model: l.model,
    variant: l.variant,
    newUsed: l.newUsed,
    year: l.year,
    price: parsePrice(l.price),
    mileage: l.mileageInKm,
    transmission: l.transmission,
    fuelType: l.fuelType,
    engineCapacity: formatEngineCapacity(l.engineCapacityInCc),
    engineCapacityInCc: l.engineCapacityInCc,
    doors: l.doors,
    driveType: l.transmissionDrive,
    color: l.colour,
    serviceHistory: l.serviceHistory,
    stockNumber: l.stockNumber,
    registrationNumber: l.registrationNumber,
    features: l.features?.length > 0 ? l.features : extractFeaturesFromDescription(l.description),
    description: l.description || '',
    images: l.imageUrls || [],
    bodyType: l.bodyType,
    vehicleCategory: l.vehicleCategory,
    vehicleSubCategory: l.vehicleSubCategory,
    dealerId: l.dealerId,
    dealerLogoUrl: l.dealerLogoUrl,
  };
}

async function fetchListings() {
  if (!AUTOTRADER_API_URL || !AUTOTRADER_USERNAME || !AUTOTRADER_PASSWORD) {
    throw new Error('Missing AUTOTRADER_API_URL / AUTOTRADER_USERNAME / AUTOTRADER_PASSWORD');
  }
  const auth = Buffer.from(`${AUTOTRADER_USERNAME}:${AUTOTRADER_PASSWORD}`).toString('base64');
  const res = await fetch(AUTOTRADER_API_URL, {
    headers: { Authorization: `Basic ${auth}`, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`AutoTrader API failed: ${res.status} ${res.statusText}`);
  let listings = await res.json();
  if (!Array.isArray(listings)) throw new Error('AutoTrader API did not return an array');
  if (AUTOTRADER_DEALER_ID) {
    listings = listings.filter((l) => l.dealerId === parseInt(AUTOTRADER_DEALER_ID, 10));
  }
  return listings;
}

async function main() {
  if (!DATABASE_URL) throw new Error('Missing DATABASE_URL');

  const listings = await fetchListings();
  log(`Fetched ${listings.length} listings from AutoTrader`);

  const vehicles = listings.map(transformListingToVehicle).filter((v) => v.id);
  const ids = vehicles.map((v) => String(v.id));

  const pool = new pg.Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    await client.query('begin');

    for (const v of vehicles) {
      await client.query(
        `insert into public.vehicles (id, is_active, data, last_seen_at, updated_at)
         values ($1, true, $2::jsonb, now(), now())
         on conflict (id) do update
           set data = excluded.data, is_active = true, last_seen_at = now(), updated_at = now()`,
        [String(v.id), JSON.stringify(v)]
      );
    }

    // Safety: never deactivate everything on an empty/failed pull.
    if (vehicles.length > 0) {
      const res = await client.query(
        `update public.vehicles set is_active = false, updated_at = now()
         where is_active = true and id <> all($1::text[])`,
        [ids]
      );
      log(`Upserted ${vehicles.length} active; deactivated ${res.rowCount} no longer listed`);
    } else {
      log('WARNING: 0 listings returned — skipping deactivation to avoid wiping stock');
    }

    await client.query('commit');
  } catch (err) {
    await client.query('rollback');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }

  log('Sync complete');
}

main().catch((err) => {
  console.error(new Date().toISOString(), 'SYNC FAILED:', err.message);
  process.exit(1);
});
