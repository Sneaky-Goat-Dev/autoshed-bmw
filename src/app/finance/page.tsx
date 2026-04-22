'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { autoshedData } from '@/data/autoshed-data';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import FinanceCalculator from '@/components/FinanceCalculator';
import SignioFinanceForm from '@/components/SignioFinanceForm';

function FinancePageContent() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('vehicle');
  const { business, financeRequirements, vehicles } = autoshedData;

  // Find vehicle if ID is provided
  const selectedVehicle = vehicleId ? vehicles.find(v => v.id === vehicleId) : undefined;

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
              <FinanceCalculator vehiclePrice={selectedVehicle?.price || 900000} />
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-4">
                Finance Application
              </h2>
              <p className="text-meta-gray">
                Complete the form below to start your finance application. Your application will be
                submitted directly to our finance partners for assessment.
              </p>
            </div>

            {selectedVehicle && (
              <div className="mb-8 p-4 bg-gold/10 border border-gold/20">
                <p className="text-sm text-meta-gray mb-1">Applying for finance on:</p>
                <p className="font-bold text-near-black">
                  {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.variant}
                </p>
                <p className="text-gold font-bold">
                  R{selectedVehicle.price.toLocaleString()}
                </p>
              </div>
            )}

            <SignioFinanceForm vehicle={selectedVehicle} />
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

export default function FinancePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-meta-gray">Loading...</p>
        </div>
      </div>
    }>
      <FinancePageContent />
    </Suspense>
  );
}
