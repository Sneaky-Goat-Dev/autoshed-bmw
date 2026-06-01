import type { FinanceApplicationFormData } from '@/types/signio';

/**
 * Format currency values for Signio (e.g., "10000.00")
 */
export function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  if (isNaN(num)) return '0.00';
  return num.toFixed(2);
}

/**
 * Escape special XML characters
 */
export function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Validate SA ID number (13 digits + Luhn checksum)
 */
export function validateSAIdNumber(idNumber: string): boolean {
  if (!/^\d{13}$/.test(idNumber)) return false;

  // Luhn algorithm validation
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    let digit = parseInt(idNumber[i], 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

/**
 * Transform form data to the Signio 3rd-party application XML format.
 * See "Signio 3rd Party External New Generic One-way Integration Spec V1.2".
 */
export function buildSignioXML(data: FinanceApplicationFormData, dealerCode: string): string {
  const fields: Array<{ name: string; value: string }> = [];

  // Helper to add field if value exists
  const addField = (name: string, value: string | undefined | null) => {
    if (value !== undefined && value !== null && value !== '') {
      fields.push({ name, value: String(value) });
    }
  };

  // Dealer/Source
  // Note: thirdPartyAppSource has a 15-character max per the Signio spec
  // ("Application Source Parameters"), so keep this value <= 15 chars.
  addField('thirdPartyVendorCode', dealerCode);
  addField('thirdPartyAppSource', 'Autoshed BMW');
  addField('xsdVersion', '1.0.0.2');

  // Personal Details
  addField('customerTitle', data.title);
  addField('customerFirstName', data.firstName);
  addField('customerMiddleName', data.middleName);
  addField('customerSurname', data.surname);
  addField('customerIdType', 'South African Valid ID');
  addField('customerIdNumber', data.idNumber);
  addField('customerDateOfBirth', data.dateOfBirth?.replace(/-/g, ''));
  addField('customerGender', data.gender);
  addField('customerMaritalStatus', data.maritalStatus);
  addField('customerEmail', data.email);
  addField('customerMobilePhoneNumber', data.mobile?.replace(/\s/g, ''));
  addField('customerHomePhoneNumber', data.homePhone?.replace(/\s/g, ''));
  addField('customerWorkPhoneNumber', data.workPhone?.replace(/\s/g, ''));
  addField('customerPreferredLanguage', data.preferredLanguage || 'English');
  addField('customerPreferredContactMethod', 'Cell phone');
  addField('mobileType', 'Contract');
  addField('customerNationality', 'SOUTH AFRICA');

  // Residential Address
  addField('customerResidentialAddressLine1', data.addressLine1);
  addField('customerResidentialAddressLine2', data.addressLine2);
  addField('customerResidentialAddressSuburb', data.suburb);
  addField('customerResidentialAddressCity', data.city);
  addField('customerResidentialAddressProvince', data.province);
  addField('customerResidentialAddressPostalCode', data.postalCode);
  addField('residentialStatus', data.residentialStatus);
  addField('customerPeriodAtCurrentAddressYears', data.yearsAtAddress);
  addField('customerPeriodAtCurrentAddressMonths', data.monthsAtAddress);
  addField('sameAsRes', 'Use Residential Address');

  // Employment Details
  addField('employerName', data.employerName);
  addField('customerOccupation', data.occupation);
  addField('employerIndustryType', data.industryType);
  addField('customerEmploymentStatus', data.employmentStatus);
  addField('employmentLevel', data.employmentLevel);
  addField('customerType', 'Private Individual');
  addField('employerAddressLine1', data.employerAddress);
  addField('employerSuburb', data.employerSuburb);
  addField('employerCity', data.employerCity);
  addField('employerProvince', data.employerProvince);
  addField('employerPostalCode', data.employerPostalCode);
  addField('customerPeriodAtCurrentEmployerYears', data.yearsEmployed);
  addField('customerPeriodAtCurrentEmployerMonths', data.monthsEmployed);

  // Income
  addField('sourceOfIncome', 'Salary');
  addField('sumIncomeCustomerGrossRemuneration', formatCurrency(data.grossIncome));
  addField('addIncomeCustomerNetTakeHomePay', formatCurrency(data.netIncome));
  addField('addIncomeCustomerOtherIncome', formatCurrency(data.otherIncome || '0'));
  addField('customerTotalMonthlyIncome', formatCurrency(data.totalIncome || data.grossIncome));

  // Expenses
  addField('totalCustomerBondAndRentPayment', formatCurrency(data.bondRent || '0'));
  addField('sumExpensesCustomerBondPayment', formatCurrency(data.bondRent || '0'));
  addField('sumExpensesCustomerVehicleInstallments', formatCurrency(data.vehicleInstallments || '0'));
  addField('sumExpensesCustomerLoanRepayments', formatCurrency(data.loanRepayments || '0'));
  addField('sumExpensesCustomerCreditCardRepayments', formatCurrency(data.creditCards || '0'));
  addField('sumExpensesCustomerInsurancePayments', formatCurrency(data.insurance || '0'));
  addField('sumExpensesCustomerHouseholdExpenses', formatCurrency(data.household || '0'));
  addField('sumExpensesCustomerOtherExpenses', formatCurrency(data.otherExpenses || '0'));
  addField('customerTotalExpenses', formatCurrency(data.totalExpenses || '0'));

  // Calculate disposable income
  const grossIncome = parseFloat(data.grossIncome) || 0;
  const totalExpenses = parseFloat(data.totalExpenses) || 0;
  const disposableIncome = grossIncome - totalExpenses;
  addField('customerDisposableIncome', formatCurrency(String(disposableIncome)));

  // Vehicle Details
  if (data.vehicleMake) {
    addField('articleType', 'Motor Vehicle');
    addField('articleCondition', data.vehicleCondition || 'Used');
    addField('articleUse', data.vehicleUse || 'Private');
    addField('make', data.vehicleMake.toUpperCase());
    addField('model', data.vehicleModel?.toUpperCase());
    addField('yearOfFirstRegistration', data.vehicleYear);
    addField('purchasePrice', formatCurrency(data.vehiclePrice));
    addField('retailValue', formatCurrency(data.vehiclePrice));
  }

  // Finance Details
  addField('cashDeposit', formatCurrency(data.depositAmount || '0'));
  addField('repaymentPeriod', data.repaymentPeriod);

  // Banking Details
  addField('customerBankAccountBank', data.bankName);
  addField('customerBankAccountType', data.accountType);
  addField('customerBankAccountNumber', data.accountNumber);
  addField('customerBankAccountBranchCode', data.branchCode);
  addField('customerBankAccountHolder', `${data.firstName} ${data.surname}`);
  addField('bankAccountHolderSameAsApplicant', '999');
  addField('paymentMethod', 'Debit Order');
  addField('settleExistingInstallment', 'No');

  // Next of Kin
  addField('relativeFirstNames', data.relativeName);
  addField('relativeSurname', data.relativeSurname);
  addField('relativeRelation', data.relativeRelation);
  addField('relativePhoneNumber', data.relativePhone?.replace(/\s/g, ''));
  addField('relativePreferredContactMethod', 'Cellphone');

  // Consent
  addField('marketingConsentIndicator', data.marketingConsent ? 'Yes' : 'No');
  addField('itcConcentIndicator', data.creditCheckConsent ? 'Yes' : 'No');

  // Build XML
  const fieldsXML = fields
    .map((f) => `<field formFieldName='${escapeXML(f.name)}'>${escapeXML(f.value)}</field>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<signioPackage>
<dataBundle>
${fieldsXML}
</dataBundle>
</signioPackage>`;
}
