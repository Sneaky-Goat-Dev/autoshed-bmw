/**
 * Format a number as South African Rand currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-ZA').format(num);
}

/**
 * Format mileage with km suffix
 */
export function formatMileage(mileage: number): string {
  return `${formatNumber(mileage)} km`;
}

/**
 * Turn an AutoTrader enum code into a human-readable label.
 * e.g. "_4x4" -> "4x4", "FrontWheelDrive" -> "Front Wheel Drive",
 *      "SportsUtilityVehicle" -> "Sports Utility Vehicle".
 */
export function humanize(value?: string | null): string {
  if (!value) return '';
  return value
    .replace(/^_+/, '') // leading underscore (e.g. "_4x4" -> "4x4")
    .replace(/_+/g, ' ') // remaining underscores -> spaces
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase
    .replace(/\s+/g, ' ')
    .trim();
}

const SERVICE_HISTORY_LABELS: Record<string, string> = {
  Full: 'Full',
  FullByFranchise: 'Full (Franchise)',
  Partial: 'Partial',
  None: 'None',
  NoHistory: 'None',
};

/** Human-readable service-history label (e.g. "FullByFranchise" -> "Full (Franchise)"). */
export function formatServiceHistory(value?: string | null): string {
  if (!value) return '';
  return SERVICE_HISTORY_LABELS[value] ?? humanize(value);
}

/**
 * Calculate monthly payment for vehicle finance
 */
export function calculateMonthlyPayment(
  principal: number,
  interestRate: number,
  termMonths: number,
  deposit: number = 0
): number {
  const loanAmount = principal - deposit;
  const monthlyRate = interestRate / 100 / 12;

  if (monthlyRate === 0) {
    return loanAmount / termMonths;
  }

  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);

  return Math.round(payment);
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Get unique values from an array of vehicles for a specific property
 */
export function getUniqueValues<T, K extends keyof T>(items: T[], key: K): T[K][] {
  const values = items.map(item => item[key]);
  return [...new Set(values)].filter(Boolean) as T[K][];
}
