'use client';

import { useState } from 'react';
import { autoshedData } from '@/data/autoshed-data';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import FinanceCalculator from '@/components/FinanceCalculator';
import { FinanceFormData } from '@/types';

export default function FinancePage() {
  const { business, financeRequirements, vehicles } = autoshedData;

  const [formData, setFormData] = useState<FinanceFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    employmentStatus: '',
    monthlyIncome: '',
    vehicleInterest: '',
    depositAmount: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClasses =
    'w-full px-4 py-3 border border-gray-200 text-sm focus:border-gold focus:ring-0 focus:outline-none bg-white';
  const labelClasses = 'block text-sm font-medium text-near-black mb-2';

  const financePartners = [
    'ABSA Vehicle Finance',
    'Wesbank',
    'MFC',
    'Standard Bank Vehicle Finance',
    'Nedbank Vehicle Finance',
    'FNB Vehicle Finance',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-dark-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">
            Vehicle Finance
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Finance Your Dream Vehicle
          </h1>
          <p className="text-lg text-silver max-w-2xl mx-auto">
            Tailored financing solutions through major finance houses with competitive rates
          </p>
        </div>
      </section>

      {/* Finance Overview Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                title="Affordable Finance Solutions"
                subtitle="Making your dream vehicle a reality with flexible payment options"
              />
              <div className="space-y-4 text-meta-gray leading-relaxed mb-8">
                <p>
                  At {business.name}, we understand that purchasing a premium vehicle is a significant
                  investment. That is why we have partnered with South Africa&apos;s leading financial
                  institutions to offer you competitive financing options tailored to your needs.
                </p>
                <p>
                  Our finance team has years of experience navigating the complexities of vehicle
                  finance. We work with you to find the best possible rates and terms, ensuring
                  your monthly payments fit comfortably within your budget.
                </p>
                <p>
                  As a registered Financial Services Provider ({business.fsp}), we are authorized
                  to provide comprehensive finance assistance through our NCA-approved credit centre.
                </p>
              </div>

              {/* Finance Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border-l-2 border-gold">
                  <h4 className="font-bold text-near-black mb-1">Competitive Rates</h4>
                  <p className="text-sm text-meta-gray">Access to prime interest rates</p>
                </div>
                <div className="p-4 bg-gray-50 border-l-2 border-gold">
                  <h4 className="font-bold text-near-black mb-1">Flexible Terms</h4>
                  <p className="text-sm text-meta-gray">24 to 84 month options</p>
                </div>
                <div className="p-4 bg-gray-50 border-l-2 border-gold">
                  <h4 className="font-bold text-near-black mb-1">Quick Approval</h4>
                  <p className="text-sm text-meta-gray">Fast turnaround times</p>
                </div>
                <div className="p-4 bg-gray-50 border-l-2 border-gold">
                  <h4 className="font-bold text-near-black mb-1">Expert Guidance</h4>
                  <p className="text-sm text-meta-gray">Personalized assistance</p>
                </div>
              </div>
            </div>

            {/* Finance Calculator */}
            <div>
              <FinanceCalculator vehiclePrice={900000} />
            </div>
          </div>
        </div>
      </section>

      {/* Finance Partners Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Finance Partners"
            subtitle="We work with South Africa's leading financial institutions"
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {financePartners.map((partner, index) => (
              <div
                key={index}
                className="bg-white p-6 flex items-center justify-center text-center border border-gray-200"
              >
                <span className="text-sm font-bold text-near-black uppercase tracking-wider">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 lg:py-24 bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Required Documents"
            subtitle="Have these ready to speed up your finance application"
            centered
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {financeRequirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-4 bg-dark-surface p-6">
                <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white text-sm">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-4">
                Finance Application
              </h2>
              <p className="text-meta-gray">
                Complete the form below to start your finance application. Our team will contact
                you within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 bg-gray-50">
                <div className="w-16 h-16 bg-gold mx-auto flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-near-black mb-2">Application Submitted</h3>
                <p className="text-meta-gray mb-6 max-w-md mx-auto">
                  Thank you for your finance application. Our team will review your details and
                  contact you within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button href="/vehicles" variant="primary">
                    Browse Vehicles
                  </Button>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        idNumber: '',
                        employmentStatus: '',
                        monthlyIncome: '',
                        vehicleInterest: '',
                        depositAmount: '',
                        message: '',
                      });
                    }}
                    variant="outline"
                  >
                    Submit Another Application
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className={labelClasses}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClasses}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="012 345 6789"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="idNumber" className={labelClasses}>
                        ID Number *
                      </label>
                      <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={13}
                        className={inputClasses}
                        placeholder="13-digit SA ID number"
                      />
                    </div>
                  </div>
                </div>

                {/* Employment Information */}
                <div>
                  <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
                    Employment Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="employmentStatus" className={labelClasses}>
                        Employment Status *
                      </label>
                      <select
                        id="employmentStatus"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select status</option>
                        <option value="employed">Employed (Full-time)</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="contract">Contract Worker</option>
                        <option value="part-time">Part-time Employed</option>
                        <option value="retired">Retired</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="monthlyIncome" className={labelClasses}>
                        Gross Monthly Income *
                      </label>
                      <select
                        id="monthlyIncome"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select range</option>
                        <option value="0-20000">R0 - R20,000</option>
                        <option value="20000-40000">R20,000 - R40,000</option>
                        <option value="40000-60000">R40,000 - R60,000</option>
                        <option value="60000-80000">R60,000 - R80,000</option>
                        <option value="80000-100000">R80,000 - R100,000</option>
                        <option value="100000+">R100,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Vehicle Interest */}
                <div>
                  <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
                    Vehicle Interest
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="vehicleInterest" className={labelClasses}>
                        Vehicle of Interest
                      </label>
                      <select
                        id="vehicleInterest"
                        name="vehicleInterest"
                        value={formData.vehicleInterest}
                        onChange={handleInputChange}
                        className={inputClasses}
                      >
                        <option value="">Select a vehicle (optional)</option>
                        {vehicles.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="depositAmount" className={labelClasses}>
                        Available Deposit
                      </label>
                      <select
                        id="depositAmount"
                        name="depositAmount"
                        value={formData.depositAmount}
                        onChange={handleInputChange}
                        className={inputClasses}
                      >
                        <option value="">Select range (optional)</option>
                        <option value="0">No deposit</option>
                        <option value="0-50000">Up to R50,000</option>
                        <option value="50000-100000">R50,000 - R100,000</option>
                        <option value="100000-200000">R100,000 - R200,000</option>
                        <option value="200000+">R200,000+</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClasses}>
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={inputClasses}
                        placeholder="Any additional information you would like to share..."
                      />
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-white p-4 border border-gray-200 text-xs text-meta-gray">
                  <p>
                    By submitting this form, you consent to {business.name} contacting you regarding
                    your finance application. Your personal information will be handled in accordance
                    with POPIA regulations. Finance subject to credit approval. Terms and conditions apply.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Finance Application'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-6">
            Need Help With Your Application?
          </h2>
          <p className="text-lg text-meta-gray max-w-2xl mx-auto mb-10">
            Our finance specialists are here to help. Contact us directly to discuss your
            options and get personalized advice.
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Our Finance Team
          </Button>
        </div>
      </section>
    </>
  );
}
