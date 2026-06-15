import { Vehicle, StockData } from '@/types';
import { getActiveVehicles, getStockData as getStockDataFromDb, getVehicleById as getVehicleByIdFromDb } from '@/lib/db';

/**
 * Vehicle stock access. The source of truth is Supabase (see @/lib/db).
 * These helpers are for server-side use; client components should fetch
 * `/api/vehicles` (e.g. via the useVehicles hook).
 */

export async function getVehicles(): Promise<Vehicle[]> {
  return getActiveVehicles();
}

export async function getStockData(): Promise<StockData | null> {
  return getStockDataFromDb();
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  return getVehicleByIdFromDb(id);
}

export async function getVehiclesByMake(make: string): Promise<Vehicle[]> {
  const vehicles = await getActiveVehicles();
  return vehicles.filter((v) => v.make.toLowerCase() === make.toLowerCase());
}

export async function getUniqueMakes(): Promise<string[]> {
  const vehicles = await getActiveVehicles();
  return Array.from(new Set(vehicles.map((v) => v.make))).sort();
}
