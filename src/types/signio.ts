/**
 * Signio Finance Application Types
 * Based on Signio 3rd Party External New Generic One-way Integration Spec V1.2
 */

export interface SignioApplicationData {
  // Dealer/Source
  thirdPartyVendorCode: string;
  thirdPartyEmail?: string;
  advertisementReference?: string;
  thirdPartyAppSource?: string;
  referrerName?: string;

  // Applicant Details
  customerFirstName: string;
  customerMiddleName?: string;
  customerSurname: string;
  customerIdType: 'South African Valid ID' | 'Passport';
  customerIdNumber: string;
  customerDateOfBirth?: string; // YYYYMMDD
  customerEmail?: string;
  customerMobilePhoneNumber?: string;
  customerHomePhoneNumber?: string;
  customerWorkPhoneNumber?: string;
  customerWorkPhoneNumberType?: 'Land line' | 'Cell';

  // Personal Details
  customerTitle?: string;
  customerGender?: 'Male' | 'Female';
  customerPreferredLanguage?: 'English' | 'Afrikaans';
  customerRaceEthnicGroup?: string;
  customerNationality?: string;
  customerMaritalStatus?: string;
  customerMaritalContract?: string;
  dateMarried?: string; // YYYYMMDD
  customerPreferredContactMethod?: string;
  mobileType?: 'Contract' | 'Pay-as-you-go';
  customerGraduate?: 'Yes' | 'No';

  // Residential Details
  customerResidentialAddressLine1?: string;
  customerResidentialAddressLine2?: string;
  customerResidentialAddressSuburb?: string;
  customerResidentialAddressCity?: string;
  customerResidentialAddressProvince?: string;
  customerResidentialAddressPostalCode?: string;
  residentialStatus?: string;
  customerPeriodAtCurrentAddressYears?: string;
  customerPeriodAtCurrentAddressMonths?: string;

  // Employment Details
  employerName?: string;
  customerOccupation?: string;
  employerIndustryType?: string;
  customerEmploymentStatus?: string;
  employmentLevel?: string;
  customerType?: string;
  employerAddressLine1?: string;
  employerAddressLine2?: string;
  employerSuburb?: string;
  employerCity?: string;
  employerProvince?: string;
  employerPostalCode?: string;
  customerPeriodAtCurrentEmployerYears?: string;
  customerPeriodAtCurrentEmployerMonths?: string;

  // Income Details
  sourceOfIncome?: string;
  sumIncomeCustomerGrossRemuneration?: string;
  sumIncomeCustomerMonthlyCommission?: string;
  sumIncomeCustomerCarAllowance?: string;
  sumIncomeCustomerOvertime?: string;
  addIncomeCustomerNetTakeHomePay?: string;
  addIncomeCustomerOtherIncome?: string;
  customerTotalMonthlyIncome?: string;

  // Expenses
  sumExpensesCustomerBondPayment?: string;
  sumExpensesCustomerRent?: string;
  totalCustomerBondAndRentPayment?: string;
  sumExpensesCustomerRates?: string;
  sumExpensesCustomerVehicleInstallments?: string;
  sumExpensesCustomerLoanRepayments?: string;
  sumExpensesCustomerCreditCardRepayments?: string;
  sumExpensesCustomerFurnitureAccounts?: string;
  sumExpensesCustomerClothingAccounts?: string;
  sumExpensesCustomerOverdraftRepayments?: string;
  sumExpensesCustomerInsurancePayments?: string;
  sumExpensesCustomerTelephonePayments?: string;
  sumExpensesCustomerTransport?: string;
  sumExpensesCustomerFoodAndEntertainment?: string;
  sumExpensesCustomerEducationCosts?: string;
  sumExpensesCustomerMaintenance?: string;
  sumExpensesCustomerHouseholdExpenses?: string;
  sumExpensesCustomerOtherExpenses?: string;
  customerTotalExpenses?: string;
  customerDisposableIncome?: string;

  // Vehicle Details
  articleType?: string;
  articleCondition?: 'New' | 'Used';
  articleUse?: 'Taxi' | 'Business' | 'Private';
  yearOfFirstRegistration?: string;
  make?: string;
  model?: string;
  mmCode?: string;
  retailValue?: string;
  purchasePrice?: string;
  articleColour?: string;
  registrationNumber?: string;
  stockNumber?: string;

  // Finance Details
  cashDeposit?: string;
  tradeInDeposit?: string;
  agreementType?: 'Installment Sale Agreement' | 'Lease Agreement';
  repaymentPeriod?: string;

  // Banking Details
  customerBankAccountBank?: string;
  customerBankAccountBranchName?: string;
  customerBankAccountBranchCode?: string;
  customerBankAccountHolder?: string;
  customerBankAccountNumber?: string;
  customerBankAccountType?: string;
  bankAccountHolderSameAsApplicant?: string;
  paymentMethod?: 'Cash' | 'Debit Order';

  // Settlement Details
  settleExistingInstallment?: 'Yes' | 'No';
  bankNameAccToSettle?: string;
  accountNumberToSettle?: string;
  settlementAmount?: string;
  monthlyInstallment?: string;

  // Relative/Next of Kin Details
  relativeFirstNames?: string;
  relativeSurname?: string;
  relativeRelation?: string;
  relativePhoneNumber?: string;
  relativePreferredContactMethod?: string;
  relativeAddressLine1?: string;
  relativeAddressLine2?: string;
  relativeAddressSuburb?: string;
  relativeAddressCity?: string;
  relativeResidentialProvince?: string;
  relativeAddressPostalCode?: string;

  // Consent
  marketingConsentIndicator?: 'Yes' | 'No';
  itcConcentIndicator?: 'Yes' | 'No';
  outstandingServiceConsent?: 'Yes' | 'No';

  // Additional
  salesperson?: string;
  xsdVersion?: string;
}

export interface SignioSubmissionResponse {
  results?: {
    message: string;
    referenceNumber: string;
  };
  error?: string;
}

export interface SignioDocumentUpload {
  clientIdNumber: string;
  thirdPartyId: string;
  supportingDocstype: string;
  fileContent: string; // Base64 encoded
}

// Form data structure for the frontend (simplified)
export interface FinanceApplicationFormData {
  // Personal
  title: string;
  firstName: string;
  middleName: string;
  surname: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  email: string;
  mobile: string;
  homePhone: string;
  workPhone: string;
  workPhoneType: string;
  preferredLanguage: string;

  // Address
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  residentialStatus: string;
  yearsAtAddress: string;
  monthsAtAddress: string;

  // Employment
  employerName: string;
  occupation: string;
  industryType: string;
  employmentStatus: string;
  employmentLevel: string;
  employerAddress: string;
  employerSuburb: string;
  employerCity: string;
  employerProvince: string;
  employerPostalCode: string;
  yearsEmployed: string;
  monthsEmployed: string;

  // Income
  grossIncome: string;
  netIncome: string;
  otherIncome: string;
  totalIncome: string;

  // Expenses
  bondRent: string;
  vehicleInstallments: string;
  loanRepayments: string;
  creditCards: string;
  insurance: string;
  household: string;
  otherExpenses: string;
  totalExpenses: string;

  // Vehicle (optional - can be pre-filled)
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePrice: string;
  vehicleCondition: string;
  vehicleUse: string;

  // Finance
  depositAmount: string;
  repaymentPeriod: string;

  // Banking
  bankName: string;
  accountType: string;
  accountNumber: string;
  branchCode: string;

  // Next of Kin
  relativeName: string;
  relativeSurname: string;
  relativeRelation: string;
  relativePhone: string;

  // Consent
  marketingConsent: boolean;
  creditCheckConsent: boolean;

  // Additional
  additionalInfo: string;
}

// Reference data for dropdowns
// NOTE: dropdown values below must match the Signio reference sheets exactly
// (Signio 3rd Party Integration Spec V1.2). Values that are not in the allowed
// list are rejected by some Finance Institutions even though the submit succeeds.
export const SIGNIO_TITLES = ['Mr', 'Mrs', 'Miss', 'Doctor', 'Advocate', 'Reverend', 'Professor'];

export const SIGNIO_MARITAL_STATUS = [
  'Single - Adult',
  'Single - Young',
  'Married',
  'Divorced',
  'Widow/er',
];

export const SIGNIO_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
];

export const SIGNIO_EMPLOYMENT_STATUS = [
  'Permanent',
  'Contractual',
  'Part time',
  'Student',
  'Self employed',
  'Pensioner',
  'Unemployed',
];

export const SIGNIO_EMPLOYMENT_LEVELS = [
  'Senior Management',
  'Management',
  'Supervisor',
  'Skilled Worker',
  'Semi-Skilled Worker',
  'Unskilled Worker',
  'Junior Position',
];

export const SIGNIO_INDUSTRY_TYPES = [
  'AGRICULTURE',
  'BUILDING AND CONSTRUCTION',
  'BUSINESS SERVICES',
  'COMMERCE',
  'COMMUNITY SERVICE',
  'EDUCATIONAL SERVICES - PRIVATE',
  'ELECTRICITY,GAS AND WATER',
  'ENTERTAINMENT/SPORTS/RECREATION',
  'ESCOM',
  'FINANCIAL',
  'GOVERNMENT',
  'MANUFACTURING',
  'MEDICAL SERVICES - PRIVATE',
  'MINING',
  'NON-PROFIT ORGANISATIONS',
  'PERSONAL SERVICES',
  'RETAIL',
  'TELKOM',
  'TRANSPORT/STORAGE/COMMUNICATION',
  'UNKNOWN',
];

export const SIGNIO_RESIDENTIAL_STATUS = [
  'Owner - Bonded',
  'Owner - Bond Free',
  'Tenant',
  'Lodger',
];

export const SIGNIO_BANKS = [
  'ABSA BANK',
  'AFRICAN BANK',
  'BIDVEST BANK',
  'CAPITEC BANK',
  'DISCOVERY BANK',
  'FIRST NATIONAL BANK',
  'INVESTEC BANK',
  'NEDBANK',
  'STANDARD BANK',
  'TYME BANK',
];

export const SIGNIO_ACCOUNT_TYPES = ['Cheque', 'Savings', 'Transmission'];

export const SIGNIO_PHONE_TYPES = ['Land line', 'Cell'];

export const SIGNIO_RELATIVE_RELATIONS = [
  'Aunt',
  'Brother',
  'Brother in Law',
  'Cousin',
  'Daughter',
  'Father',
  'Father in Law',
  'Friend',
  'Grandfather',
  'Grandmother',
  'Husband',
  'Mother',
  'Mother in Law',
  'Sister',
  'Sister in Law',
  'Son',
  'Uncle',
  'Wife',
];

// Signio offers terms up to 72 months (no 84). Values stay numeric — the API
// accepts them and the UI appends the "months" label.
export const SIGNIO_REPAYMENT_PERIODS = ['6', '12', '18', '24', '30', '36', '42', '48', '54', '60', '72'];
