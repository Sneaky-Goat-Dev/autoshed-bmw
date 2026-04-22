/**
 * AutoTrader Stock Sync Script
 *
 * This script fetches vehicle listings from the AutoTrader Syndication API
 * and saves them to a JSON file in the public directory.
 *
 * Usage:
 *   npx tsx scripts/sync-autotrader.ts
 *
 * Environment Variables Required:
 *   - AUTOTRADER_API_URL: The API endpoint URL
 *   - AUTOTRADER_USERNAME: API username
 *   - AUTOTRADER_PASSWORD: API password
 *   - AUTOTRADER_DEALER_ID: (Optional) Filter by dealer ID
 *
 * Note: API is rate limited to 9 requests per 60 minutes
 */

import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local if it exists (for local development)
// On Vercel, env vars are provided directly through process.env
try {
  const { config } = require('dotenv');
  config({ path: path.resolve(process.cwd(), '.env.local') });
} catch {
  // dotenv not available or .env.local doesn't exist - that's fine on Vercel
}

interface AutoTraderListing {
  id?: number;
  make: string;
  model: string;
  variant: string;
  newUsed: string;
  year: number;
  mileageInKm: number;
  price: string;
  colour: string;
  description: string;
  imageUrls: string[];
  bodyType: string;
  doors?: number;
  engineCapacityInCc?: number;
  fuelType: string;
  transmissionDrive?: string;
  transmission: string;
  dealerId: number;
  dealerLogoUrl?: string;
  tummCode?: string;
  registrationNumber?: string;
  stockNumber?: string;
  hoursInOperation?: number;
  serviceHistory?: string;
  vehicleCategory?: string;
  vehicleSubCategory?: string;
  features: string[];
}

interface VehicleStockData {
  lastUpdated: string;
  source: string;
  vehicleCount: number;
  vehicles: AutoTraderListing[];
}

async function fetchAutoTraderListings(): Promise<AutoTraderListing[] | null> {
  const apiUrl = process.env.AUTOTRADER_API_URL;
  const username = process.env.AUTOTRADER_USERNAME;
  const password = process.env.AUTOTRADER_PASSWORD;
  const dealerId = process.env.AUTOTRADER_DEALER_ID;

  if (!apiUrl || !username || !password) {
    console.warn('Missing environment variables - skipping sync');
    console.warn('Required: AUTOTRADER_API_URL, AUTOTRADER_USERNAME, AUTOTRADER_PASSWORD');
    return null;
  }

  console.log(`Fetching listings from: ${apiUrl}`);

  // Create Basic Auth token
  const authToken = Buffer.from(`${username}:${password}`).toString('base64');

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${authToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const listings: AutoTraderListing[] = await response.json();

  // Filter by dealer ID if specified
  if (dealerId) {
    const filteredListings = listings.filter(
      (listing) => listing.dealerId === parseInt(dealerId, 10)
    );
    console.log(`Filtered to ${filteredListings.length} listings for dealer ID: ${dealerId}`);
    return filteredListings;
  }

  return listings;
}

function formatEngineCapacity(ccValue?: number): string | undefined {
  if (!ccValue) return undefined;
  // Convert cc to formatted string (e.g., 1999 -> "1,999 cc")
  return `${ccValue.toLocaleString()} cc`;
}

function parsePrice(priceString: string): number {
  // API returns price as "183936,0000" - convert to number
  const cleanPrice = priceString.replace(',', '.');
  return Math.round(parseFloat(cleanPrice));
}

function transformListingToVehicle(listing: AutoTraderListing) {
  return {
    id: listing.id?.toString() || listing.stockNumber || `${listing.make}-${listing.model}-${listing.year}`,
    make: listing.make,
    model: listing.model,
    variant: listing.variant,
    newUsed: listing.newUsed,
    year: listing.year,
    price: parsePrice(listing.price),
    mileage: listing.mileageInKm,
    transmission: listing.transmission,
    fuelType: listing.fuelType,
    engineCapacity: formatEngineCapacity(listing.engineCapacityInCc),
    engineCapacityInCc: listing.engineCapacityInCc,
    doors: listing.doors,
    driveType: listing.transmissionDrive,
    color: listing.colour,
    serviceHistory: listing.serviceHistory,
    stockNumber: listing.stockNumber,
    registrationNumber: listing.registrationNumber,
    features: listing.features || [],
    description: listing.description || '',
    images: listing.imageUrls || [],
    bodyType: listing.bodyType,
    vehicleCategory: listing.vehicleCategory,
    vehicleSubCategory: listing.vehicleSubCategory,
    dealerId: listing.dealerId,
    dealerLogoUrl: listing.dealerLogoUrl,
  };
}

async function syncAutoTrader(): Promise<void> {
  console.log('='.repeat(50));
  console.log('AutoTrader Stock Sync');
  console.log('='.repeat(50));
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log('');

  try {
    // Fetch listings from API
    const listings = await fetchAutoTraderListings();

    // If we couldn't fetch (missing env vars), skip sync but don't fail
    if (listings === null) {
      console.log('Skipping sync - using existing data');
      console.log('='.repeat(50));
      return;
    }

    console.log(`Fetched ${listings.length} listings from AutoTrader API`);

    // Transform listings to our vehicle format
    const vehicles = listings.map(transformListingToVehicle);

    // Create the stock data object
    const stockData: VehicleStockData = {
      lastUpdated: new Date().toISOString(),
      source: 'AutoTrader Syndication API',
      vehicleCount: vehicles.length,
      vehicles: listings, // Store original API response
    };

    // Ensure public directory exists
    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write to JSON file
    const outputPath = path.join(publicDir, 'stock.json');
    fs.writeFileSync(outputPath, JSON.stringify(stockData, null, 2), 'utf-8');
    console.log(`Stock data saved to: ${outputPath}`);

    // Also save a transformed version for easier consumption
    const transformedData = {
      lastUpdated: new Date().toISOString(),
      source: 'AutoTrader Syndication API',
      vehicleCount: vehicles.length,
      vehicles: vehicles,
    };
    const transformedOutputPath = path.join(publicDir, 'vehicles.json');
    fs.writeFileSync(transformedOutputPath, JSON.stringify(transformedData, null, 2), 'utf-8');
    console.log(`Transformed vehicle data saved to: ${transformedOutputPath}`);

    console.log('');
    console.log('Sync completed successfully!');
    console.log(`Total vehicles: ${vehicles.length}`);

    // Show summary by make
    const makeCount: Record<string, number> = {};
    vehicles.forEach((v) => {
      makeCount[v.make] = (makeCount[v.make] || 0) + 1;
    });
    console.log('\nVehicles by make:');
    Object.entries(makeCount)
      .sort(([, a], [, b]) => b - a)
      .forEach(([make, count]) => {
        console.log(`  ${make}: ${count}`);
      });

  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }

  console.log('');
  console.log('='.repeat(50));
}

// Run the sync
syncAutoTrader();
