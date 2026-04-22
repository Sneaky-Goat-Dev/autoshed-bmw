'use client';

import { useState, useEffect } from 'react';
import { Vehicle, StockData } from '@/types';
import { autoshedData } from '@/data/autoshed-data';

interface UseVehiclesResult {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: Error | null;
  lastUpdated: string | null;
}

/**
 * Hook to fetch vehicle data from the JSON file
 * Falls back to static data if the JSON file is not available
 */
export function useVehicles(): UseVehiclesResult {
  const [vehicles, setVehicles] = useState<Vehicle[]>(autoshedData.vehicles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch('/vehicles.json');
        if (response.ok) {
          const data: StockData = await response.json();
          setVehicles(data.vehicles);
          setLastUpdated(data.lastUpdated);
        }
        // If response is not ok, we keep the static data (already set as default)
      } catch (err) {
        // Keep static data as fallback, but log the error
        console.warn('Failed to fetch live stock data, using static data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch vehicles'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  return { vehicles, isLoading, error, lastUpdated };
}

/**
 * Hook to fetch a single vehicle by ID
 */
export function useVehicle(id: string): {
  vehicle: Vehicle | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  const { vehicles, isLoading, error } = useVehicles();
  const vehicle = vehicles.find((v) => v.id === id);

  return { vehicle, isLoading, error };
}
