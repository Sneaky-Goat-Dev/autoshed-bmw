#!/usr/bin/env bash
# Brings up the local test Postgres, applies the schema, and seeds it from
# public/vehicles.json. Run once (Docker must be running):
#   bash scripts/setup-local-db.sh
set -euo pipefail
cd "$(dirname "$0")/.."

LOCAL_URL="postgresql://postgres:postgres@localhost:5433/autoshed"

echo "→ Starting local Postgres (docker compose)…"
docker compose up -d db

echo "→ Waiting for Postgres to be ready…"
for _ in $(seq 1 30); do
  if docker compose exec -T db pg_isready -U postgres >/dev/null 2>&1; then break; fi
  sleep 1
done

echo "→ Applying schema…"
PGPASSWORD=postgres psql "$LOCAL_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/0001_vehicles.sql

echo "→ Seeding vehicles…"
DATABASE_URL="$LOCAL_URL" node scripts/seed-vehicles.mjs

echo "✓ Local DB ready: $LOCAL_URL"
echo "  next dev will use it via .env.development.local"
