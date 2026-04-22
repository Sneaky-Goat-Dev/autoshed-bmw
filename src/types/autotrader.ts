// AutoTrader API Response Types
// Based on Syndication Endpoint Documentation v1.0

export interface AutoTraderListing {
  id?: number;
  make: string;
  model: string;
  variant: string;
  newUsed: 'New' | 'Used';
  year: number;
  mileageInKm: number;
  price: string; // API returns as string with comma e.g., "183936,0000"
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

export interface AutoTraderSyncResult {
  success: boolean;
  vehicleCount: number;
  timestamp: string;
  error?: string;
}

export interface VehicleStockData {
  lastUpdated: string;
  vehicles: AutoTraderListing[];
}
