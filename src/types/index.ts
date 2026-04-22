// Vehicle Types
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  engineCapacity?: string;
  doors?: number;
  driveType?: string;
  color?: string;
  serviceHistory?: string;
  stockNumber?: string;
  features: string[];
  description: string;
  images?: string[];
}

// Business Types
export interface Business {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  founded: string;
  fsp: string;
  insurancePartner: string;
}

// Contact Types
export interface Address {
  street: string;
  suburb: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Hours {
  weekdays: string;
  saturday: string;
  sunday: string;
  publicHolidays: string;
}

export interface Contact {
  phones: string[];
  email: string;
  address: Address;
  hours: Hours;
}

// Social Media Types
export interface Social {
  facebook: string;
  instagram: string;
}

// Service Types
export interface Service {
  title: string;
  description: string;
  icon: string;
}

// USP Types
export interface USP {
  title: string;
  description: string;
}

// Team Types
export interface Team {
  managingDirector: string;
  description: string;
}

// Meta Types
export interface Meta {
  title: string;
  description: string;
  keywords: string[];
}

// Complete Data Structure
export interface AutoshedData {
  business: Business;
  contact: Contact;
  social: Social;
  services: Service[];
  qualityStandards: string[];
  usps: USP[];
  team: Team;
  vehicles: Vehicle[];
  brands: string[];
  financeRequirements: string[];
  sellCarRequirements: string[];
  meta: Meta;
}

// Stock Data Types
export interface StockData {
  lastUpdated: string;
  source: string;
  vehicleCount: number;
  vehicles: Vehicle[];
}

// Form Types
export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicleId?: string;
}

export interface FinanceFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  employmentStatus: string;
  monthlyIncome: string;
  vehicleInterest?: string;
  depositAmount?: string;
  message?: string;
}

export interface SellCarFormData {
  name: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  mileage: string;
  condition: string;
  askingPrice?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
