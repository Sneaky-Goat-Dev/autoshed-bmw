import { Vehicle, StockData } from '@/types';
import { autoshedData } from '@/data/autoshed-data';

// Base URL for fetching stock data - works both server-side and client-side
const getStockUrl = () => {
  // In browser, use relative URL
  if (typeof window !== 'undefined') {
    return '/vehicles.json';
  }
  // On server, we need to read from the file system
  return null;
};

/**
 * Fetches vehicle stock data from the JSON file
 * Falls back to static data if the JSON file is not available
 */
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    // Server-side: read from file system
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'public', 'vehicles.json');

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const stockData: StockData = JSON.parse(fileContent);
        return stockData.vehicles;
      }
    } else {
      // Client-side: fetch from URL
      const response = await fetch('/vehicles.json');
      if (response.ok) {
        const stockData: StockData = await response.json();
        return stockData.vehicles;
      }
    }
  } catch (error) {
    console.warn('Failed to load stock from JSON, using static data:', error);
  }

  // Fallback to static data
  return autoshedData.vehicles;
}

/**
 * Fetches the full stock data including metadata
 */
export async function getStockData(): Promise<StockData | null> {
  try {
    // Server-side: read from file system
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'public', 'vehicles.json');

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
      }
    } else {
      // Client-side: fetch from URL
      const response = await fetch('/vehicles.json');
      if (response.ok) {
        return await response.json();
      }
    }
  } catch (error) {
    console.warn('Failed to load stock data:', error);
  }

  return null;
}

/**
 * Gets a single vehicle by ID
 */
export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  const vehicles = await getVehicles();
  return vehicles.find((v) => v.id === id);
}

/**
 * Gets vehicles filtered by make
 */
export async function getVehiclesByMake(make: string): Promise<Vehicle[]> {
  const vehicles = await getVehicles();
  return vehicles.filter((v) => v.make.toLowerCase() === make.toLowerCase());
}

/**
 * Gets all unique makes from the stock
 */
export async function getUniqueMakes(): Promise<string[]> {
  const vehicles = await getVehicles();
  const makes = new Set(vehicles.map((v) => v.make));
  return Array.from(makes).sort();
}
