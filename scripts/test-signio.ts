/**
 * Signio UAT integration test
 *
 * Builds a realistic test applicant, prints the exact XML that will be sent to
 * Signio, and (if a password is configured) submits it to the UAT endpoint and
 * prints the response.
 *
 * Usage:
 *   npx tsx scripts/test-signio.ts
 *
 * Reads SIGNIO_* from .env.local. The live submission is skipped unless
 * SIGNIO_PASSWORD is set (Signio issues this via the Signing Boardroom reset).
 */

import { config } from 'dotenv';
import { buildSignioXML, validateSAIdNumber } from '../src/lib/signio';
import type { FinanceApplicationFormData } from '../src/types/signio';

config({ path: '.env.local' });

/**
 * Compute a 13th check digit so the ID passes validateSAIdNumber()
 * (index-based Luhn matching the app's own validator).
 */
function makeValidSaId(first12: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    let digit = parseInt(first12[i], 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  // 13th digit sits at an even index, so it is added as-is.
  const check = (10 - (sum % 10)) % 10;
  return first12 + String(check);
}

const idNumber = makeValidSaId('900101500908'); // DOB 1990-01-01, male, SA citizen

const applicant: FinanceApplicationFormData = {
  // Personal
  title: 'Mr',
  firstName: 'Test',
  middleName: '',
  surname: 'Applicant',
  idNumber,
  dateOfBirth: '1990-01-01',
  gender: 'Male',
  maritalStatus: 'Single',
  email: 'test.applicant@theautoshed.co.za',
  mobile: '082 123 4567',
  homePhone: '',
  workPhone: '',
  preferredLanguage: 'English',

  // Address
  addressLine1: '12 Test Street',
  addressLine2: '',
  suburb: 'Sandton',
  city: 'Johannesburg',
  province: 'Gauteng',
  postalCode: '2196',
  residentialStatus: 'Owner - Bonded',
  yearsAtAddress: '5',
  monthsAtAddress: '3',

  // Employment
  employerName: 'Test Employer (Pty) Ltd',
  occupation: 'Software Developer',
  industryType: 'FINANCIAL SERVICES',
  employmentStatus: 'Permanent',
  employmentLevel: 'Professional',
  employerAddress: '1 Office Park',
  employerSuburb: 'Rosebank',
  employerCity: 'Johannesburg',
  employerProvince: 'Gauteng',
  employerPostalCode: '2196',
  yearsEmployed: '4',
  monthsEmployed: '2',

  // Income
  grossIncome: '55000',
  netIncome: '38000',
  otherIncome: '0',
  totalIncome: '55000',

  // Expenses
  bondRent: '12000',
  vehicleInstallments: '0',
  loanRepayments: '0',
  creditCards: '2500',
  insurance: '1800',
  household: '6000',
  otherExpenses: '0',
  totalExpenses: '22300',

  // Vehicle
  vehicleMake: 'BMW',
  vehicleModel: '320i M Sport',
  vehicleYear: '2022',
  vehiclePrice: '650000',
  vehicleCondition: 'Used',
  vehicleUse: 'Private',

  // Finance
  depositAmount: '50000',
  repaymentPeriod: '72',

  // Banking
  bankName: 'FIRST NATIONAL BANK',
  accountType: 'Cheque',
  accountNumber: '62000000000',
  branchCode: '250655',

  // Next of Kin
  relativeName: 'Jane',
  relativeSurname: 'Applicant',
  relativeRelation: 'Spouse',
  relativePhone: '083 765 4321',

  // Consent
  marketingConsent: true,
  creditCheckConsent: true,

  // Additional
  additionalInfo: 'Automated UAT integration test submission.',
};

async function main() {
  const apiUrl = process.env.SIGNIO_API_URL;
  const username = process.env.SIGNIO_USERNAME;
  const password = process.env.SIGNIO_PASSWORD;
  const authToken = process.env.SIGNIO_AUTH_TOKEN;
  const dealerCode = process.env.SIGNIO_DEALER_CODE;

  console.log('=== Signio config check ===');
  console.log('SIGNIO_API_URL    :', apiUrl || '(missing)');
  console.log('SIGNIO_USERNAME   :', username || '(missing)');
  console.log('SIGNIO_PASSWORD   :', password ? '(set)' : '(MISSING)');
  console.log('SIGNIO_AUTH_TOKEN :', authToken ? `${authToken.slice(0, 8)}…` : '(missing)');
  console.log('SIGNIO_DEALER_CODE:', dealerCode || '(missing)');

  console.log('\n=== Validation ===');
  console.log('Test ID number          :', idNumber);
  console.log('Passes validateSAIdNumber:', validateSAIdNumber(idNumber));

  const xml = buildSignioXML(applicant, dealerCode || 'MISSING_DEALER_CODE');
  console.log('\n=== Generated XML payload ===');
  console.log(xml);

  if (!apiUrl || !username || !password || !authToken || !dealerCode) {
    console.log('\n>>> Skipping live submission — missing credential(s) above.');
    console.log('    Set SIGNIO_PASSWORD in .env.local and re-run to submit to UAT.');
    return;
  }

  const authHeader = Buffer.from(`${username}:${password}`).toString('base64');
  console.log('\n=== Submitting to Signio UAT ===');
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'X-Auth-Token': authToken,
      'Content-Type': 'application/xml',
      Accept: 'application/json',
    },
    body: xml,
  });

  const text = await res.text();
  console.log('HTTP status:', res.status, res.statusText);
  console.log('Response body:\n', text);

  try {
    const json = JSON.parse(text);
    if (json?.results?.referenceNumber) {
      console.log('\n✅ SUCCESS — reference number:', json.results.referenceNumber);
    }
  } catch {
    // non-JSON response already printed above
  }
}

main().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
