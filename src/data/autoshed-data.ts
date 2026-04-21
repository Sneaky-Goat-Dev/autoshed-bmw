import { AutoshedData } from '@/types';

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
  vehicles: [
    {
      id: "28327660",
      make: "Lexus",
      model: "RX",
      variant: "500h F Sport",
      year: 2025,
      price: 1469900,
      mileage: 10650,
      transmission: "Automatic",
      fuelType: "Hybrid",
      engineCapacity: "2,393 cc",
      doors: 5,
      driveType: "All Wheel Drive",
      color: "Silver",
      serviceHistory: "Full By Franchise",
      stockNumber: "70USD15516",
      features: [
        "F-Sport exterior & interior styling",
        "Mark Levinson premium sound system",
        "Heads-Up Display (HUD)",
        "360-degree surround-view camera",
        "Adaptive cruise control",
        "Blind-spot monitoring & lane assist",
        "Heated & ventilated electric memory seats",
        "Wireless Apple CarPlay & Android Auto",
        "Keyless entry & push-button start",
        "Electric tailgate & wireless charging"
      ],
      description: "Pinnacle of performance hybrid luxury with 273 kW and 460 Nm output. Low mileage with balance of Lexus factory service plan.",
      images: [
        "https://img.autotrader.co.za/43328687",
        "https://img.autotrader.co.za/43328731",
        "https://img.autotrader.co.za/43328713",
        "https://img.autotrader.co.za/43328733",
        "https://img.autotrader.co.za/43328711",
        "https://img.autotrader.co.za/43328735",
        "https://img.autotrader.co.za/43328730",
        "https://img.autotrader.co.za/43328688"
      ]
    },
    {
      id: "28376690",
      make: "Porsche",
      model: "Macan",
      variant: "S",
      year: 2021,
      price: 1274900,
      mileage: 34100,
      transmission: "Automatic (PDK)",
      fuelType: "Petrol",
      engineCapacity: "2,995 cc",
      doors: 5,
      driveType: "All Wheel Drive",
      color: "Carrera White",
      serviceHistory: "Full By Franchise",
      stockNumber: "TAS12576",
      features: [
        "3.0L V6 Turbo - 260kW / 480Nm",
        "0-100 km/h in 5.3 seconds",
        "Wireless Apple CarPlay",
        "Keyless Entry & Start",
        "Heated Front Seats",
        "Adaptive LED Headlights",
        "Park Distance Control with Reverse Camera",
        "Lane Change Assist",
        "Porsche Active Suspension Management (PASM)"
      ],
      description: "Premium Porsche Macan S with exceptional performance and full service history.",
      images: [
        "https://img.autotrader.co.za/43113007",
        "https://img.autotrader.co.za/37754868",
        "https://img.autotrader.co.za/44141178",
        "https://img.autotrader.co.za/44141173",
        "https://img.autotrader.co.za/37754865",
        "https://img.autotrader.co.za/44141303",
        "https://img.autotrader.co.za/37754880",
        "https://img.autotrader.co.za/37754881"
      ]
    },
    {
      id: "28344178",
      make: "Land Rover",
      model: "Defender",
      variant: "110 D240 X-Dynamic SE",
      year: 2021,
      price: 1099900,
      mileage: 64500,
      transmission: "Automatic",
      fuelType: "Diesel",
      engineCapacity: "1,999 cc",
      doors: 5,
      driveType: "4x4",
      color: "Silver",
      serviceHistory: "Full By Franchise",
      stockNumber: "TAS45576",
      features: [
        "19\" Alloy Wheels with 5 New Tyres",
        "Panoramic Sunroof",
        "Balance of 5-Year / 100,000 km Maintenance Plan",
        "360° Camera",
        "Blind Spot Assist",
        "Park Distance Control",
        "Emergency Lane Keep Assist",
        "Electric Memory Seats",
        "Climate Control",
        "Meridian Sound System",
        "Wireless Apple CarPlay & Android Auto"
      ],
      description: "Iconic Defender designed for long-distance touring, daily driving and serious adventure.",
      images: [
        "https://img.autotrader.co.za/43679143",
        "https://img.autotrader.co.za/43679024",
        "https://img.autotrader.co.za/43679040",
        "https://img.autotrader.co.za/43679057",
        "https://img.autotrader.co.za/43679021",
        "https://img.autotrader.co.za/43679048",
        "https://img.autotrader.co.za/43679028",
        "https://img.autotrader.co.za/43679071"
      ]
    },
    {
      id: "28383384",
      make: "Land Rover",
      model: "Defender",
      variant: "90 P400 X-Dynamic SE",
      year: 2021,
      price: 999900,
      mileage: 81000,
      transmission: "Automatic",
      fuelType: "Petrol",
      doors: 3,
      driveType: "4x4",
      color: "Green",
      serviceHistory: "Full By Franchise",
      features: ["Premium Interior", "Off-Road Capability", "Modern Technology"],
      description: "Compact Defender 90 with exceptional capability and style.",
      images: [
        "https://img.autotrader.co.za/44595385",
        "https://img.autotrader.co.za/44595408",
        "https://img.autotrader.co.za/44595390",
        "https://img.autotrader.co.za/44595429",
        "https://img.autotrader.co.za/44595399",
        "https://img.autotrader.co.za/44595414",
        "https://img.autotrader.co.za/44595419",
        "https://img.autotrader.co.za/44596530"
      ]
    },
    {
      id: "28168394",
      make: "BMW",
      model: "X3",
      variant: "M Competition",
      year: 2019,
      price: 929900,
      mileage: 102000,
      transmission: "Automatic",
      fuelType: "Petrol",
      driveType: "All Wheel Drive",
      features: ["M Performance Package", "Sport Exhaust", "Adaptive Suspension"],
      description: "High-performance BMW X3 M Competition with thrilling dynamics.",
      images: [
        "https://img.autotrader.co.za/40613074",
        "https://img.autotrader.co.za/40613095",
        "https://img.autotrader.co.za/40613092",
        "https://img.autotrader.co.za/40613079",
        "https://img.autotrader.co.za/40613084",
        "https://img.autotrader.co.za/40613102",
        "https://img.autotrader.co.za/40613086",
        "https://img.autotrader.co.za/40613100"
      ]
    },
    {
      id: "28355807",
      make: "Hyundai",
      model: "i30",
      variant: "N",
      year: 2025,
      price: 769900,
      mileage: 3990,
      transmission: "Automatic",
      fuelType: "Petrol",
      features: ["Performance Package", "Sport Seats", "Launch Control"],
      description: "Nearly new Hyundai i30 N with minimal mileage.",
      images: [
        "https://img.autotrader.co.za/43813624",
        "https://img.autotrader.co.za/43813642",
        "https://img.autotrader.co.za/43813629",
        "https://img.autotrader.co.za/43813637",
        "https://img.autotrader.co.za/43813634",
        "https://img.autotrader.co.za/43813640",
        "https://img.autotrader.co.za/43813639",
        "https://img.autotrader.co.za/43813632"
      ]
    },
    {
      id: "28427558",
      make: "Land Rover",
      model: "Range Rover Velar",
      variant: "D300 HSE",
      year: 2018,
      price: 749900,
      mileage: 69900,
      transmission: "Automatic",
      fuelType: "Diesel",
      driveType: "All Wheel Drive",
      features: ["HSE Specification", "Premium Sound", "Panoramic Roof"],
      description: "Elegant Range Rover Velar with premium HSE specification.",
      images: [
        "https://img.autotrader.co.za/45065075",
        "https://img.autotrader.co.za/45065088",
        "https://img.autotrader.co.za/45065134",
        "https://img.autotrader.co.za/45065093",
        "https://img.autotrader.co.za/45065081",
        "https://img.autotrader.co.za/45065108",
        "https://img.autotrader.co.za/45065143",
        "https://img.autotrader.co.za/45065148"
      ]
    },
    {
      id: "28227569",
      make: "BMW",
      model: "X3",
      variant: "xDrive20d M Sport",
      year: 2022,
      price: 739900,
      mileage: 61500,
      transmission: "Automatic",
      fuelType: "Diesel",
      driveType: "All Wheel Drive",
      features: ["M Sport Package", "Professional Navigation", "LED Headlights"],
      description: "BMW X3 M Sport with efficient diesel powertrain.",
      images: [
        "https://img.autotrader.co.za/41653907",
        "https://img.autotrader.co.za/41626966",
        "https://img.autotrader.co.za/41626969",
        "https://img.autotrader.co.za/41626972",
        "https://img.autotrader.co.za/41626961",
        "https://img.autotrader.co.za/41626974",
        "https://img.autotrader.co.za/41626987",
        "https://img.autotrader.co.za/41626994"
      ]
    },
    {
      id: "28461778",
      make: "Mercedes-Benz",
      model: "Vito",
      variant: "116 CDI Tourer Pro",
      year: 2023,
      price: 689900,
      mileage: 72000,
      transmission: "Automatic",
      fuelType: "Diesel",
      doors: 5,
      features: ["Tourer Pro Specification", "Passenger Comfort", "Premium Interior"],
      description: "Versatile Mercedes-Benz Vito Tourer with premium features.",
      images: [
        "https://img.autotrader.co.za/45780343",
        "https://img.autotrader.co.za/45780390",
        "https://img.autotrader.co.za/45780380",
        "https://img.autotrader.co.za/45780375",
        "https://img.autotrader.co.za/45780401",
        "https://img.autotrader.co.za/45780424",
        "https://img.autotrader.co.za/45780407",
        "https://img.autotrader.co.za/45780432"
      ]
    },
    {
      id: "28461784",
      make: "Porsche",
      model: "Macan",
      variant: "Macan",
      year: 2019,
      price: 689900,
      mileage: 133000,
      transmission: "Automatic",
      fuelType: "Petrol",
      driveType: "All Wheel Drive",
      features: ["Porsche Build Quality", "Sport Chrono", "Premium Audio"],
      description: "Entry-level Porsche Macan with excellent condition.",
      images: [
        "https://img.autotrader.co.za/46035291",
        "https://img.autotrader.co.za/46035297",
        "https://img.autotrader.co.za/46035302",
        "https://img.autotrader.co.za/46035326",
        "https://img.autotrader.co.za/46035333",
        "https://img.autotrader.co.za/46035371",
        "https://img.autotrader.co.za/46035339",
        "https://img.autotrader.co.za/46035331"
      ]
    },
    {
      id: "28344154",
      make: "Mercedes-Benz",
      model: "A-Class",
      variant: "A250 Sedan AMG Line",
      year: 2022,
      price: 684900,
      mileage: 24500,
      transmission: "Automatic",
      fuelType: "Petrol",
      features: ["AMG Line Package", "MBUX System", "Premium Sound"],
      description: "Sporty Mercedes-Benz A-Class with AMG styling.",
      images: [
        "https://img.autotrader.co.za/43660551",
        "https://img.autotrader.co.za/43660564",
        "https://img.autotrader.co.za/43660577",
        "https://img.autotrader.co.za/43660559",
        "https://img.autotrader.co.za/43660567",
        "https://img.autotrader.co.za/43660572",
        "https://img.autotrader.co.za/43660560",
        "https://img.autotrader.co.za/43660553"
      ]
    },
    {
      id: "28282751",
      make: "Ford",
      model: "Focus",
      variant: "RS",
      year: 2016,
      price: 649900,
      mileage: 50000,
      transmission: "Manual",
      fuelType: "Petrol",
      driveType: "All Wheel Drive",
      features: ["RS Performance", "Recaro Seats", "Launch Control", "Drift Mode"],
      description: "Legendary Ford Focus RS with all-wheel drive performance.",
      images: [
        "https://img.autotrader.co.za/42586121",
        "https://img.autotrader.co.za/42584152",
        "https://img.autotrader.co.za/42584157",
        "https://img.autotrader.co.za/42584154",
        "https://img.autotrader.co.za/42584160",
        "https://img.autotrader.co.za/42584156",
        "https://img.autotrader.co.za/42584168",
        "https://img.autotrader.co.za/42584151"
      ]
    }
  ],
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
