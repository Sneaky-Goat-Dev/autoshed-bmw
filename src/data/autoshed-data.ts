import { AutoshedData, Vehicle } from '@/types';
import vehiclesData from '../../public/vehicles.json';

// Import vehicles from synced AutoTrader data
const syncedVehicles: Vehicle[] = vehiclesData.vehicles as Vehicle[];

export const autoshedData: AutoshedData = {
  business: {
    name: "The Autoshed",
    tagline: "Defined by Excellence",
    description: "Premium luxury vehicles with exceptional personal service",
    longDescription: "The Autoshed is a premium luxury vehicle dealership with over 70% of business from repeat customers and referrals. With 28+ years of motor industry experience, we prioritize understanding customer needs and delivering tangible value. Our philosophy: 'If a vehicle isn't good enough for our family, it isn't good enough for yours.'",
    founded: "2022",
    fsp: "FSP 32023",
    insurancePartner: "Insurancewise"
  },
  contact: {
    phones: ["012 002 5488", "011 823 8400"],
    email: "sales@theautoshed.co.za",
    address: {
      street: "31 Kwartsiet Crescent",
      suburb: "Zwartkops Ext 15",
      city: "Centurion",
      postalCode: "0157",
      country: "South Africa"
    },
    hours: {
      weekdays: "09:00 - 17:00",
      saturday: "09:00 - 13:00",
      sunday: "Closed",
      publicHolidays: "Closed"
    }
  },
  social: {
    facebook: "https://facebook.com/TheAutoShedZA",
    instagram: "https://instagram.com/autoshedza"
  },
  services: [
    {
      title: "Vehicle Sales",
      description: "Premium luxury vehicles with comprehensive inspection and preparation",
      icon: "car"
    },
    {
      title: "Vehicle Finance",
      description: "Tailored financing solutions through major finance houses with full NCA credit centre approval",
      icon: "credit-card"
    },
    {
      title: "Trade-In",
      description: "Accept vehicles as trade-in with fair market valuations",
      icon: "refresh"
    },
    {
      title: "Sell Your Car",
      description: "Quick and easy process to sell your vehicle directly to us",
      icon: "tag"
    },
    {
      title: "Nationwide Delivery",
      description: "We arrange delivery anywhere in South Africa",
      icon: "truck"
    }
  ],
  qualityStandards: [
    "Digital bodywork inspection",
    "No mechanically deficient vehicles",
    "Service history and warranty validation",
    "Roadworthy tires and rims",
    "Expert pre-delivery service",
    "DEKRA roadworthy certification",
    "Extended warranties available",
    "Service plans available"
  ],
  usps: [
    {
      title: "70% Repeat Business",
      description: "Over 70% of our business comes from repeat customers and referrals"
    },
    {
      title: "28+ Years Experience",
      description: "Decades of motor industry expertise guiding every decision"
    },
    {
      title: "Autoshed Approved",
      description: "Only vehicles meeting our strict standards make it to sale"
    },
    {
      title: "Full Warranty",
      description: "Manufacturer warranties and maintenance plans remain valid"
    }
  ],
  team: {
    managingDirector: "Bryan Berger",
    description: "The leadership team includes Managing Director Bryan Berger, who has been with the organization since its inception, providing clients continuity."
  },
  // Vehicles loaded from synced AutoTrader data
  vehicles: syncedVehicles,
  brands: [
    "Audi", "BMW", "Citroen", "Ford", "Haval", "Hyundai", "Land Rover",
    "Lexus", "Mercedes-Benz", "Opel", "Peugeot", "Porsche", "Suzuki",
    "Volkswagen", "Volvo"
  ],
  financeRequirements: [
    "ID Document",
    "Driver's License",
    "Proof of Residence",
    "Payslip or Bank Statement"
  ],
  sellCarRequirements: [
    "ID Document",
    "Proof of Residence",
    "Proof of Ownership (NATIS document or settlement letter)",
    "Service History",
    "Vehicle Photos"
  ],
  meta: {
    title: "The Autoshed | Premium Luxury Vehicles | Centurion, South Africa",
    description: "Premium luxury vehicles with exceptional personal service. Over 70% repeat business. Financing available. Nationwide delivery.",
    keywords: ["luxury cars", "premium vehicles", "Centurion", "South Africa", "used cars", "car dealership", "vehicle finance"]
  }
};

export default autoshedData;
