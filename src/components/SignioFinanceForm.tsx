'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import {
  FinanceApplicationFormData,
  SIGNIO_TITLES,
  SIGNIO_MARITAL_STATUS,
  SIGNIO_PROVINCES,
  SIGNIO_EMPLOYMENT_STATUS,
  SIGNIO_EMPLOYMENT_LEVELS,
  SIGNIO_INDUSTRY_TYPES,
  SIGNIO_RESIDENTIAL_STATUS,
  SIGNIO_BANKS,
  SIGNIO_ACCOUNT_TYPES,
  SIGNIO_RELATIVE_RELATIONS,
  SIGNIO_REPAYMENT_PERIODS,
} from '@/types/signio';
import { Vehicle } from '@/types';

interface SignioFinanceFormProps {
  vehicle?: Vehicle;
  onSuccess?: (referenceNumber: string) => void;
}

type FormStep = 'personal' | 'address' | 'employment' | 'income' | 'banking' | 'vehicle' | 'review';

const STEPS: { key: FormStep; label: string }[] = [
  { key: 'personal', label: 'Personal Details' },
  { key: 'address', label: 'Address' },
  { key: 'employment', label: 'Employment' },
  { key: 'income', label: 'Income & Expenses' },
  { key: 'banking', label: 'Banking' },
  { key: 'vehicle', label: 'Vehicle & Finance' },
  { key: 'review', label: 'Review & Submit' },
];

const initialFormData: FinanceApplicationFormData = {
  // Personal
  title: '',
  firstName: '',
  middleName: '',
  surname: '',
  idNumber: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  email: '',
  mobile: '',
  homePhone: '',
  workPhone: '',
  preferredLanguage: 'English',

  // Address
  addressLine1: '',
  addressLine2: '',
  suburb: '',
  city: '',
  province: '',
  postalCode: '',
  residentialStatus: '',
  yearsAtAddress: '',
  monthsAtAddress: '',

  // Employment
  employerName: '',
  occupation: '',
  industryType: '',
  employmentStatus: '',
  employmentLevel: '',
  employerAddress: '',
  employerSuburb: '',
  employerCity: '',
  employerProvince: '',
  employerPostalCode: '',
  yearsEmployed: '',
  monthsEmployed: '',

  // Income
  grossIncome: '',
  netIncome: '',
  otherIncome: '',
  totalIncome: '',

  // Expenses
  bondRent: '',
  vehicleInstallments: '',
  loanRepayments: '',
  creditCards: '',
  insurance: '',
  household: '',
  otherExpenses: '',
  totalExpenses: '',

  // Vehicle
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: '',
  vehiclePrice: '',
  vehicleCondition: 'Used',
  vehicleUse: 'Private',

  // Finance
  depositAmount: '',
  repaymentPeriod: '60',

  // Banking
  bankName: '',
  accountType: '',
  accountNumber: '',
  branchCode: '',

  // Next of Kin
  relativeName: '',
  relativeSurname: '',
  relativeRelation: '',
  relativePhone: '',

  // Consent
  marketingConsent: false,
  creditCheckConsent: false,

  // Additional
  additionalInfo: '',
};

export default function SignioFinanceForm({ vehicle, onSuccess }: SignioFinanceFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [formData, setFormData] = useState<FinanceApplicationFormData>(() => {
    if (vehicle) {
      return {
        ...initialFormData,
        vehicleMake: vehicle.make,
        vehicleModel: vehicle.model,
        vehicleYear: String(vehicle.year),
        vehiclePrice: String(vehicle.price),
        vehicleCondition: 'Used',
        vehicleUse: 'Private',
      };
    }
    return initialFormData;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    referenceNumber?: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputClasses =
    'w-full px-4 py-3 border border-gray-200 text-sm focus:border-gold focus:ring-0 focus:outline-none bg-white';
  const labelClasses = 'block text-sm font-medium text-near-black mb-2';
  const errorClasses = 'text-red-600 text-xs mt-1';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 'personal':
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.surname) newErrors.surname = 'Surname is required';
        if (!formData.idNumber) {
          newErrors.idNumber = 'ID number is required';
        } else if (!/^\d{13}$/.test(formData.idNumber)) {
          newErrors.idNumber = 'ID number must be 13 digits';
        }
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;

      case 'address':
        if (!formData.addressLine1) newErrors.addressLine1 = 'Address is required';
        if (!formData.suburb) newErrors.suburb = 'Suburb is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.province) newErrors.province = 'Province is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!formData.residentialStatus) newErrors.residentialStatus = 'Residential status is required';
        break;

      case 'employment':
        if (!formData.employerName) newErrors.employerName = 'Employer name is required';
        if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
        if (!formData.occupation) newErrors.occupation = 'Occupation is required';
        break;

      case 'income':
        if (!formData.grossIncome) newErrors.grossIncome = 'Gross income is required';
        if (!formData.netIncome) newErrors.netIncome = 'Net income is required';
        break;

      case 'banking':
        if (!formData.bankName) newErrors.bankName = 'Bank name is required';
        if (!formData.accountType) newErrors.accountType = 'Account type is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
        if (!formData.relativeName) newErrors.relativeName = 'Next of kin name is required';
        if (!formData.relativeSurname) newErrors.relativeSurname = 'Next of kin surname is required';
        if (!formData.relativePhone) newErrors.relativePhone = 'Next of kin phone is required';
        break;

      case 'vehicle':
        // Vehicle details are optional
        break;

      case 'review':
        if (!formData.creditCheckConsent) {
          newErrors.creditCheckConsent = 'You must consent to credit checks to proceed';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (!validateStep(currentStep)) return;

    const currentIndex = STEPS.findIndex((s) => s.key === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.findIndex((s) => s.key === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('review')) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Calculate totals before submission
      const totalIncome =
        parseFloat(formData.grossIncome || '0') + parseFloat(formData.otherIncome || '0');
      const totalExpenses =
        parseFloat(formData.bondRent || '0') +
        parseFloat(formData.vehicleInstallments || '0') +
        parseFloat(formData.loanRepayments || '0') +
        parseFloat(formData.creditCards || '0') +
        parseFloat(formData.insurance || '0') +
        parseFloat(formData.household || '0') +
        parseFloat(formData.otherExpenses || '0');

      const dataToSubmit = {
        ...formData,
        totalIncome: String(totalIncome),
        totalExpenses: String(totalExpenses),
      };

      const response = await fetch('/api/finance/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitResult({
          success: true,
          message: result.message,
          referenceNumber: result.referenceNumber,
        });
        if (onSuccess && result.referenceNumber) {
          onSuccess(result.referenceNumber);
        }
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Failed to submit application',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'An error occurred while submitting your application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-max">
        {STEPS.map((step, index) => {
          const currentIndex = STEPS.findIndex((s) => s.key === currentStep);
          const isActive = step.key === currentStep;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (isCompleted) setCurrentStep(step.key);
                }}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-gold'
                    : isCompleted
                      ? 'text-near-black cursor-pointer hover:text-gold'
                      : 'text-meta-gray cursor-default'
                }`}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center text-xs ${
                    isActive
                      ? 'bg-gold text-white'
                      : isCompleted
                        ? 'bg-near-black text-white'
                        : 'bg-gray-200 text-meta-gray'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 ${isCompleted ? 'bg-near-black' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPersonalStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="title" className={labelClasses}>Title *</label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_TITLES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.title && <p className={errorClasses}>{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="firstName" className={labelClasses}>First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="middleName" className={labelClasses}>Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="surname" className={labelClasses}>Surname *</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.surname && <p className={errorClasses}>{errors.surname}</p>}
        </div>
        <div>
          <label htmlFor="idNumber" className={labelClasses}>ID Number *</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            maxLength={13}
            className={inputClasses}
            placeholder="13-digit SA ID"
          />
          {errors.idNumber && <p className={errorClasses}>{errors.idNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="dateOfBirth" className={labelClasses}>Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="gender" className={labelClasses}>Gender *</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className={errorClasses}>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="maritalStatus" className={labelClasses}>Marital Status</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_MARITAL_STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClasses}>Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="mobile" className={labelClasses}>Mobile Number *</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="0XX XXX XXXX"
          />
          {errors.mobile && <p className={errorClasses}>{errors.mobile}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="homePhone" className={labelClasses}>Home Phone</label>
          <input
            type="tel"
            id="homePhone"
            name="homePhone"
            value={formData.homePhone}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="workPhone" className={labelClasses}>Work Phone</label>
          <input
            type="tel"
            id="workPhone"
            name="workPhone"
            value={formData.workPhone}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
        Residential Address
      </h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="addressLine1" className={labelClasses}>Street Address *</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="House number and street name"
          />
          {errors.addressLine1 && <p className={errorClasses}>{errors.addressLine1}</p>}
        </div>
        <div>
          <label htmlFor="addressLine2" className={labelClasses}>Address Line 2</label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="Complex, building, etc. (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="suburb" className={labelClasses}>Suburb *</label>
          <input
            type="text"
            id="suburb"
            name="suburb"
            value={formData.suburb}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.suburb && <p className={errorClasses}>{errors.suburb}</p>}
        </div>
        <div>
          <label htmlFor="city" className={labelClasses}>City/Town *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.city && <p className={errorClasses}>{errors.city}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="province" className={labelClasses}>Province *</label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.province && <p className={errorClasses}>{errors.province}</p>}
        </div>
        <div>
          <label htmlFor="postalCode" className={labelClasses}>Postal Code *</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            maxLength={4}
            className={inputClasses}
          />
          {errors.postalCode && <p className={errorClasses}>{errors.postalCode}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="residentialStatus" className={labelClasses}>Residential Status *</label>
          <select
            id="residentialStatus"
            name="residentialStatus"
            value={formData.residentialStatus}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_RESIDENTIAL_STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.residentialStatus && <p className={errorClasses}>{errors.residentialStatus}</p>}
        </div>
        <div>
          <label htmlFor="yearsAtAddress" className={labelClasses}>Years at Address</label>
          <input
            type="number"
            id="yearsAtAddress"
            name="yearsAtAddress"
            value={formData.yearsAtAddress}
            onChange={handleInputChange}
            min={0}
            max={99}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="monthsAtAddress" className={labelClasses}>Months</label>
          <input
            type="number"
            id="monthsAtAddress"
            name="monthsAtAddress"
            value={formData.monthsAtAddress}
            onChange={handleInputChange}
            min={0}
            max={11}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );

  const renderEmploymentStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
        Employment Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="employerName" className={labelClasses}>Employer Name *</label>
          <input
            type="text"
            id="employerName"
            name="employerName"
            value={formData.employerName}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="As per payslip"
          />
          {errors.employerName && <p className={errorClasses}>{errors.employerName}</p>}
        </div>
        <div>
          <label htmlFor="employmentStatus" className={labelClasses}>Employment Status *</label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_EMPLOYMENT_STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.employmentStatus && <p className={errorClasses}>{errors.employmentStatus}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="occupation" className={labelClasses}>Occupation *</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.occupation && <p className={errorClasses}>{errors.occupation}</p>}
        </div>
        <div>
          <label htmlFor="industryType" className={labelClasses}>Industry Type</label>
          <select
            id="industryType"
            name="industryType"
            value={formData.industryType}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_INDUSTRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="employmentLevel" className={labelClasses}>Employment Level</label>
          <select
            id="employmentLevel"
            name="employmentLevel"
            value={formData.employmentLevel}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_EMPLOYMENT_LEVELS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="yearsEmployed" className={labelClasses}>Years Employed</label>
          <input
            type="number"
            id="yearsEmployed"
            name="yearsEmployed"
            value={formData.yearsEmployed}
            onChange={handleInputChange}
            min={0}
            max={99}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="monthsEmployed" className={labelClasses}>Months</label>
          <input
            type="number"
            id="monthsEmployed"
            name="monthsEmployed"
            value={formData.monthsEmployed}
            onChange={handleInputChange}
            min={0}
            max={11}
            className={inputClasses}
          />
        </div>
      </div>

      <h4 className="text-md font-bold text-near-black mt-6 mb-4">Employer Address (Optional)</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="employerAddress" className={labelClasses}>Employer Address</label>
          <input
            type="text"
            id="employerAddress"
            name="employerAddress"
            value={formData.employerAddress}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="employerSuburb" className={labelClasses}>Suburb</label>
          <input
            type="text"
            id="employerSuburb"
            name="employerSuburb"
            value={formData.employerSuburb}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="employerCity" className={labelClasses}>City</label>
          <input
            type="text"
            id="employerCity"
            name="employerCity"
            value={formData.employerCity}
            onChange={handleInputChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="employerProvince" className={labelClasses}>Province</label>
          <select
            id="employerProvince"
            name="employerProvince"
            value={formData.employerProvince}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="employerPostalCode" className={labelClasses}>Postal Code</label>
          <input
            type="text"
            id="employerPostalCode"
            name="employerPostalCode"
            value={formData.employerPostalCode}
            onChange={handleInputChange}
            maxLength={4}
            className={inputClasses}
          />
        </div>
      </div>
    </div>
  );

  const renderIncomeStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
        Monthly Income
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="grossIncome" className={labelClasses}>Gross Monthly Income *</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="grossIncome"
              name="grossIncome"
              value={formData.grossIncome}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
          {errors.grossIncome && <p className={errorClasses}>{errors.grossIncome}</p>}
        </div>
        <div>
          <label htmlFor="netIncome" className={labelClasses}>Net Monthly Income (Take-home) *</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="netIncome"
              name="netIncome"
              value={formData.netIncome}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
          {errors.netIncome && <p className={errorClasses}>{errors.netIncome}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="otherIncome" className={labelClasses}>Other Income</label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-meta-gray">R</span>
          <input
            type="number"
            id="otherIncome"
            name="otherIncome"
            value={formData.otherIncome}
            onChange={handleInputChange}
            className={`${inputClasses} pl-8`}
            placeholder="0.00"
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-near-black mt-8 mb-4 pb-2 border-b border-gray-200">
        Monthly Expenses
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bondRent" className={labelClasses}>Bond/Rent Payment</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="bondRent"
              name="bondRent"
              value={formData.bondRent}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="vehicleInstallments" className={labelClasses}>Vehicle Installments</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="vehicleInstallments"
              name="vehicleInstallments"
              value={formData.vehicleInstallments}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="loanRepayments" className={labelClasses}>Personal Loan Repayments</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="loanRepayments"
              name="loanRepayments"
              value={formData.loanRepayments}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="creditCards" className={labelClasses}>Credit Card Payments</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="creditCards"
              name="creditCards"
              value={formData.creditCards}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="insurance" className={labelClasses}>Insurance</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="household" className={labelClasses}>Household Expenses</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="household"
              name="household"
              value={formData.household}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="otherExpenses" className={labelClasses}>Other Expenses</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="otherExpenses"
              name="otherExpenses"
              value={formData.otherExpenses}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankingStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
        Banking Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bankName" className={labelClasses}>Bank Name *</label>
          <select
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_BANKS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.bankName && <p className={errorClasses}>{errors.bankName}</p>}
        </div>
        <div>
          <label htmlFor="accountType" className={labelClasses}>Account Type *</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_ACCOUNT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.accountType && <p className={errorClasses}>{errors.accountType}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="accountNumber" className={labelClasses}>Account Number *</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.accountNumber && <p className={errorClasses}>{errors.accountNumber}</p>}
        </div>
        <div>
          <label htmlFor="branchCode" className={labelClasses}>Branch Code</label>
          <input
            type="text"
            id="branchCode"
            name="branchCode"
            value={formData.branchCode}
            onChange={handleInputChange}
            maxLength={6}
            className={inputClasses}
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-near-black mt-8 mb-4 pb-2 border-b border-gray-200">
        Next of Kin / Emergency Contact
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="relativeName" className={labelClasses}>First Name *</label>
          <input
            type="text"
            id="relativeName"
            name="relativeName"
            value={formData.relativeName}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.relativeName && <p className={errorClasses}>{errors.relativeName}</p>}
        </div>
        <div>
          <label htmlFor="relativeSurname" className={labelClasses}>Surname *</label>
          <input
            type="text"
            id="relativeSurname"
            name="relativeSurname"
            value={formData.relativeSurname}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.relativeSurname && <p className={errorClasses}>{errors.relativeSurname}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="relativeRelation" className={labelClasses}>Relationship</label>
          <select
            id="relativeRelation"
            name="relativeRelation"
            value={formData.relativeRelation}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Select</option>
            {SIGNIO_RELATIVE_RELATIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="relativePhone" className={labelClasses}>Phone Number *</label>
          <input
            type="tel"
            id="relativePhone"
            name="relativePhone"
            value={formData.relativePhone}
            onChange={handleInputChange}
            className={inputClasses}
          />
          {errors.relativePhone && <p className={errorClasses}>{errors.relativePhone}</p>}
        </div>
      </div>
    </div>
  );

  const renderVehicleStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
        Vehicle Details
      </h3>
      <p className="text-sm text-meta-gray mb-4">
        {vehicle
          ? 'Vehicle details have been pre-filled based on your selection.'
          : 'Enter the vehicle you are interested in financing (optional).'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="vehicleMake" className={labelClasses}>Make</label>
          <input
            type="text"
            id="vehicleMake"
            name="vehicleMake"
            value={formData.vehicleMake}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="e.g., BMW"
          />
        </div>
        <div>
          <label htmlFor="vehicleModel" className={labelClasses}>Model</label>
          <input
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder="e.g., 320i"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="vehicleYear" className={labelClasses}>Year</label>
          <input
            type="number"
            id="vehicleYear"
            name="vehicleYear"
            value={formData.vehicleYear}
            onChange={handleInputChange}
            min={1990}
            max={new Date().getFullYear() + 1}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="vehicleCondition" className={labelClasses}>Condition</label>
          <select
            id="vehicleCondition"
            name="vehicleCondition"
            value={formData.vehicleCondition}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <label htmlFor="vehicleUse" className={labelClasses}>Intended Use</label>
          <select
            id="vehicleUse"
            name="vehicleUse"
            value={formData.vehicleUse}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="Private">Private</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      <h3 className="text-lg font-bold text-near-black mt-8 mb-4 pb-2 border-b border-gray-200">
        Finance Requirements
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="vehiclePrice" className={labelClasses}>Vehicle Price</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="vehiclePrice"
              name="vehiclePrice"
              value={formData.vehiclePrice}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="depositAmount" className={labelClasses}>Deposit Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-meta-gray">R</span>
            <input
              type="number"
              id="depositAmount"
              name="depositAmount"
              value={formData.depositAmount}
              onChange={handleInputChange}
              className={`${inputClasses} pl-8`}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="repaymentPeriod" className={labelClasses}>Preferred Repayment Period (months)</label>
        <select
          id="repaymentPeriod"
          name="repaymentPeriod"
          value={formData.repaymentPeriod}
          onChange={handleInputChange}
          className={inputClasses}
        >
          {SIGNIO_REPAYMENT_PERIODS.map((p) => (
            <option key={p} value={p}>{p} months</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="additionalInfo" className={labelClasses}>Additional Information</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          rows={3}
          className={inputClasses}
          placeholder="Any additional information you would like to share..."
        />
      </div>
    </div>
  );

  const renderReviewStep = () => {
    const totalIncome =
      parseFloat(formData.grossIncome || '0') + parseFloat(formData.otherIncome || '0');
    const totalExpenses =
      parseFloat(formData.bondRent || '0') +
      parseFloat(formData.vehicleInstallments || '0') +
      parseFloat(formData.loanRepayments || '0') +
      parseFloat(formData.creditCards || '0') +
      parseFloat(formData.insurance || '0') +
      parseFloat(formData.household || '0') +
      parseFloat(formData.otherExpenses || '0');

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
          Review Your Application
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 border border-gray-200">
            <h4 className="font-bold text-near-black mb-3">Personal Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-meta-gray">Name:</span> {formData.title} {formData.firstName} {formData.surname}</p>
              <p><span className="text-meta-gray">ID Number:</span> {formData.idNumber}</p>
              <p><span className="text-meta-gray">Email:</span> {formData.email}</p>
              <p><span className="text-meta-gray">Mobile:</span> {formData.mobile}</p>
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-200">
            <h4 className="font-bold text-near-black mb-3">Address</h4>
            <div className="space-y-1 text-sm">
              <p>{formData.addressLine1}</p>
              {formData.addressLine2 && <p>{formData.addressLine2}</p>}
              <p>{formData.suburb}, {formData.city}</p>
              <p>{formData.province}, {formData.postalCode}</p>
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-200">
            <h4 className="font-bold text-near-black mb-3">Employment</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-meta-gray">Employer:</span> {formData.employerName}</p>
              <p><span className="text-meta-gray">Occupation:</span> {formData.occupation}</p>
              <p><span className="text-meta-gray">Status:</span> {formData.employmentStatus}</p>
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-200">
            <h4 className="font-bold text-near-black mb-3">Financial Summary</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-meta-gray">Gross Income:</span> R{Number(formData.grossIncome || 0).toLocaleString()}</p>
              <p><span className="text-meta-gray">Total Income:</span> R{totalIncome.toLocaleString()}</p>
              <p><span className="text-meta-gray">Total Expenses:</span> R{totalExpenses.toLocaleString()}</p>
              <p className="font-bold"><span className="text-meta-gray">Disposable:</span> R{(totalIncome - totalExpenses).toLocaleString()}</p>
            </div>
          </div>

          {formData.vehicleMake && (
            <div className="bg-white p-4 border border-gray-200">
              <h4 className="font-bold text-near-black mb-3">Vehicle</h4>
              <div className="space-y-1 text-sm">
                <p>{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</p>
                <p><span className="text-meta-gray">Price:</span> R{Number(formData.vehiclePrice || 0).toLocaleString()}</p>
                <p><span className="text-meta-gray">Deposit:</span> R{Number(formData.depositAmount || 0).toLocaleString()}</p>
                <p><span className="text-meta-gray">Term:</span> {formData.repaymentPeriod} months</p>
              </div>
            </div>
          )}

          <div className="bg-white p-4 border border-gray-200">
            <h4 className="font-bold text-near-black mb-3">Banking</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-meta-gray">Bank:</span> {formData.bankName}</p>
              <p><span className="text-meta-gray">Account:</span> ****{formData.accountNumber.slice(-4)}</p>
              <p><span className="text-meta-gray">Type:</span> {formData.accountType}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 space-y-4">
          <h4 className="font-bold text-near-black">Consent & Declaration</h4>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="creditCheckConsent"
              checked={formData.creditCheckConsent}
              onChange={handleInputChange}
              className="mt-1"
            />
            <span className="text-sm">
              I hereby give consent to the Credit Provider to make enquiries about my credit record
              with any credit agency and to obtain whatever information on me they might require to
              process the application. I also give consent to the Credit Provider to share my payment
              behavior with any credit agency. <span className="text-red-600">*</span>
            </span>
          </label>
          {errors.creditCheckConsent && <p className={errorClasses}>{errors.creditCheckConsent}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleInputChange}
              className="mt-1"
            />
            <span className="text-sm">
              I consent to receiving marketing communications regarding insurance and related products.
            </span>
          </label>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 text-sm">
          <p className="font-bold text-yellow-800 mb-2">Important Notice</p>
          <p className="text-yellow-700">
            By submitting this application, you confirm that all information provided is true and
            accurate. Finance is subject to credit approval. Terms and conditions apply. Your
            personal information will be processed in accordance with POPIA regulations.
          </p>
        </div>
      </div>
    );
  };

  if (submitResult) {
    return (
      <div className="text-center py-12 bg-gray-50">
        <div
          className={`w-16 h-16 mx-auto flex items-center justify-center mb-6 ${
            submitResult.success ? 'bg-gold' : 'bg-red-500'
          }`}
        >
          {submitResult.success ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-bold text-near-black mb-2">
          {submitResult.success ? 'Application Submitted' : 'Submission Failed'}
        </h3>
        <p className="text-meta-gray mb-4 max-w-md mx-auto">{submitResult.message}</p>
        {submitResult.referenceNumber && (
          <p className="text-sm bg-white inline-block px-4 py-2 border border-gray-200 mb-6">
            Reference Number: <span className="font-bold">{submitResult.referenceNumber}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/vehicles" variant="primary">
            Browse Vehicles
          </Button>
          <Button
            onClick={() => {
              setSubmitResult(null);
              setFormData(initialFormData);
              setCurrentStep('personal');
            }}
            variant="outline"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 sm:p-8">
      {renderStepIndicator()}

      <form onSubmit={(e) => e.preventDefault()}>
        {currentStep === 'personal' && renderPersonalStep()}
        {currentStep === 'address' && renderAddressStep()}
        {currentStep === 'employment' && renderEmploymentStep()}
        {currentStep === 'income' && renderIncomeStep()}
        {currentStep === 'banking' && renderBankingStep()}
        {currentStep === 'vehicle' && renderVehicleStep()}
        {currentStep === 'review' && renderReviewStep()}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep !== 'personal' && (
            <Button type="button" onClick={goToPreviousStep} variant="outline">
              Previous
            </Button>
          )}
          <div className="ml-auto">
            {currentStep !== 'review' ? (
              <Button type="button" onClick={goToNextStep} variant="primary">
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
