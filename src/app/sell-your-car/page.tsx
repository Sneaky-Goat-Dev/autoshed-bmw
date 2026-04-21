'use client';

import { useState } from 'react';
import { autoshedData } from '@/data/autoshed-data';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import { SellCarFormData } from '@/types';

export default function SellYourCarPage() {
  const { business, sellCarRequirements, brands } = autoshedData;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const [formData, setFormData] = useState<SellCarFormData>({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    mileage: '',
    condition: '',
    askingPrice: '',
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

  const processSteps = [
    {
      number: '01',
      title: 'Submit Details',
      description: 'Fill out the form with your vehicle information and contact details.',
    },
    {
      number: '02',
      title: 'Vehicle Assessment',
      description: 'Our team will review your submission and arrange an inspection if required.',
    },
    {
      number: '03',
      title: 'Receive Offer',
      description: 'We provide a fair market valuation based on condition and current market trends.',
    },
    {
      number: '04',
      title: 'Complete Sale',
      description: 'Accept our offer and receive payment quickly with minimal paperwork.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-dark-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">
            Sell Your Vehicle
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Get a Fair Price for Your Car
          </h1>
          <p className="text-lg text-silver max-w-2xl mx-auto">
            Quick, hassle-free process with competitive market valuations
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Selling your vehicle has never been easier"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
                )}
                <div className="relative bg-white text-center">
                  <div className="w-16 h-16 bg-gold mx-auto flex items-center justify-center mb-6 relative z-10">
                    <span className="text-white text-xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-near-black mb-2">{step.title}</h3>
                  <p className="text-sm text-meta-gray leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sell To Us Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                title="Why Sell to The Autoshed?"
                subtitle="We make selling your vehicle simple and rewarding"
              />
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">Fair Market Valuations</h4>
                    <p className="text-sm text-meta-gray">
                      We use current market data to ensure you receive a competitive offer for your vehicle.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">Quick Payment</h4>
                    <p className="text-sm text-meta-gray">
                      Once the sale is agreed, we process payment promptly with no delays.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">No Hassle</h4>
                    <p className="text-sm text-meta-gray">
                      Avoid the stress of private sales, endless inquiries, and time-wasters.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">Trade-In Option</h4>
                    <p className="text-sm text-meta-gray">
                      Use your vehicle as a trade-in towards your next premium purchase.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 lg:py-24 bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What You Will Need"
            subtitle="Have these documents ready to speed up the process"
            centered
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {sellCarRequirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-3 bg-dark-surface p-4">
                <div className="w-8 h-8 bg-gold flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white text-sm">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-4">
                Get Your Valuation
              </h2>
              <p className="text-meta-gray">
                Complete the form below with your vehicle details and we will get back to you with
                a valuation.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 bg-gray-50">
                <div className="w-16 h-16 bg-gold mx-auto flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-near-black mb-2">Submission Received</h3>
                <p className="text-meta-gray mb-6 max-w-md mx-auto">
                  Thank you for submitting your vehicle details. Our team will review your
                  information and contact you within 24-48 hours with a valuation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button href="/vehicles" variant="primary">
                    Browse Our Inventory
                  </Button>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        vehicleMake: '',
                        vehicleModel: '',
                        vehicleYear: '',
                        mileage: '',
                        condition: '',
                        askingPrice: '',
                        message: '',
                      });
                    }}
                    variant="outline"
                  >
                    Submit Another Vehicle
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
                    Your Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className={labelClasses}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="John Doe"
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
                  </div>
                </div>

                {/* Vehicle Information */}
                <div>
                  <h3 className="text-lg font-bold text-near-black mb-4 pb-2 border-b border-gray-200">
                    Vehicle Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="vehicleMake" className={labelClasses}>
                        Make *
                      </label>
                      <select
                        id="vehicleMake"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select make</option>
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vehicleModel" className={labelClasses}>
                        Model *
                      </label>
                      <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                        placeholder="e.g., X5, C-Class, Macan"
                      />
                    </div>
                    <div>
                      <label htmlFor="vehicleYear" className={labelClasses}>
                        Year *
                      </label>
                      <select
                        id="vehicleYear"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mileage" className={labelClasses}>
                        Mileage (km) *
                      </label>
                      <input
                        type="number"
                        id="mileage"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className={inputClasses}
                        placeholder="e.g., 50000"
                      />
                    </div>
                    <div>
                      <label htmlFor="condition" className={labelClasses}>
                        Condition *
                      </label>
                      <select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select condition</option>
                        <option value="excellent">Excellent - Like new, no issues</option>
                        <option value="good">Good - Minor wear, well maintained</option>
                        <option value="fair">Fair - Some cosmetic or mechanical issues</option>
                        <option value="poor">Poor - Significant issues present</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="askingPrice" className={labelClasses}>
                        Asking Price (optional)
                      </label>
                      <input
                        type="text"
                        id="askingPrice"
                        name="askingPrice"
                        value={formData.askingPrice}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="R 000,000"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClasses}>
                        Additional Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={inputClasses}
                        placeholder="Tell us more about your vehicle - service history, modifications, any issues, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-white p-4 border border-gray-200 text-xs text-meta-gray">
                  <p>
                    By submitting this form, you consent to {business.name} contacting you regarding
                    your vehicle valuation. The valuation provided is an estimate and may vary upon
                    physical inspection of the vehicle. Your personal information will be handled
                    in accordance with POPIA regulations.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Valuation'}
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
            Looking to Upgrade?
          </h2>
          <p className="text-lg text-meta-gray max-w-2xl mx-auto mb-10">
            Trade in your current vehicle and drive away in something new. Browse our premium
            inventory to find your next dream car.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/vehicles" variant="primary" size="lg">
              Browse Inventory
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
