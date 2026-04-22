'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { autoshedData } from '@/data/autoshed-data';
import Button from '@/components/Button';
import FinanceCalculator from '@/components/FinanceCalculator';
import VehicleCard from '@/components/VehicleCard';
import { formatPrice, formatMileage } from '@/utils/format';
import { EnquiryFormData } from '@/types';

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = use(params);
  const { vehicles, contact, business } = autoshedData;

  const vehicle = vehicles.find((v) => v.id === id);

  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'finance'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const vehicleImages = vehicle?.images || [];
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in the ${vehicle?.year} ${vehicle?.make} ${vehicle?.model} ${vehicle?.variant}. Please contact me with more information.`,
    vehicleId: id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!vehicle) {
    notFound();
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  // Get similar vehicles (same make, different id)
  const similarVehicles = vehicles
    .filter((v) => v.make === vehicle.make && v.id !== vehicle.id)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-meta-gray hover:text-gold transition-colors">
              Home
            </Link>
            <span className="text-meta-gray">/</span>
            <Link href="/vehicles" className="text-meta-gray hover:text-gold transition-colors">
              Vehicles
            </Link>
            <span className="text-meta-gray">/</span>
            <span className="text-near-black font-medium">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </nav>
        </div>
      </section>

      {/* Vehicle Header */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {vehicleImages.length > 0 ? (
                  <Image
                    src={vehicleImages[selectedImageIndex]}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="text-center">
                      <svg
                        className="w-24 h-24 mx-auto text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm uppercase tracking-wider">
                        {vehicle.make} {vehicle.model}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Thumbnail Grid */}
              {vehicleImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {vehicleImages.slice(0, 8).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-[4/3] overflow-hidden cursor-pointer transition-all ${
                        selectedImageIndex === index
                          ? 'ring-2 ring-gold'
                          : 'hover:opacity-80'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${vehicle.make} ${vehicle.model} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 25vw, 12vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div>
              <div className="mb-6">
                <p className="text-gold text-sm font-bold uppercase tracking-widest mb-2">
                  {vehicle.stockNumber || `Stock #${vehicle.id}`}
                </p>
                <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-near-black mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <p className="text-lg text-meta-gray">{vehicle.variant}</p>
              </div>

              {/* Price */}
              <div className="mb-8 p-6 bg-dark-bg">
                <p className="text-silver text-sm mb-1">Price</p>
                <p className="text-3xl lg:text-4xl font-bold text-white">{formatPrice(vehicle.price)}</p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 border-l-2 border-gold">
                  <p className="text-xs text-meta-gray uppercase tracking-wider mb-1">Mileage</p>
                  <p className="font-bold text-near-black">{formatMileage(vehicle.mileage)}</p>
                </div>
                <div className="p-4 bg-gray-50 border-l-2 border-gold">
                  <p className="text-xs text-meta-gray uppercase tracking-wider mb-1">Transmission</p>
                  <p className="font-bold text-near-black">{vehicle.transmission}</p>
                </div>
                <div className="p-4 bg-gray-50 border-l-2 border-gold">
                  <p className="text-xs text-meta-gray uppercase tracking-wider mb-1">Fuel Type</p>
                  <p className="font-bold text-near-black">{vehicle.fuelType}</p>
                </div>
                {vehicle.driveType && (
                  <div className="p-4 bg-gray-50 border-l-2 border-gold">
                    <p className="text-xs text-meta-gray uppercase tracking-wider mb-1">Drive Type</p>
                    <p className="font-bold text-near-black">{vehicle.driveType}</p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button href="#enquiry" variant="primary" size="lg" fullWidth>
                  Enquire Now
                </Button>
                <Button href={`tel:${contact.phones[0].replace(/\s/g, '')}`} variant="outline" size="lg" fullWidth>
                  Call {contact.phones[0]}
                </Button>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 text-sm text-meta-gray">
                <span>Share:</span>
                <button className="hover:text-gold transition-colors" aria-label="Share on Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="hover:text-gold transition-colors" aria-label="Share on WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </button>
                <button className="hover:text-gold transition-colors" aria-label="Copy Link">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'overview'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-meta-gray hover:text-near-black'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'features'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-meta-gray hover:text-near-black'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'finance'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-meta-gray hover:text-near-black'
              }`}
            >
              Finance
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="bg-white p-8">
                  <h2 className="text-2xl font-bold text-near-black mb-6">Vehicle Overview</h2>
                  <p className="text-meta-gray leading-relaxed mb-8">{vehicle.description}</p>

                  {/* Specifications */}
                  <h3 className="text-lg font-bold text-near-black mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-meta-gray">Make</span>
                      <span className="font-bold text-near-black">{vehicle.make}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-meta-gray">Model</span>
                      <span className="font-bold text-near-black">{vehicle.model}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-meta-gray">Variant</span>
                      <span className="font-bold text-near-black">{vehicle.variant}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-meta-gray">Year</span>
                      <span className="font-bold text-near-black">{vehicle.year}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-meta-gray">Mileage</span>
                      <span className="font-bold text-near-black">{formatMileage(vehicle.mileage)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-meta-gray">Transmission</span>
                      <span className="font-bold text-near-black">{vehicle.transmission}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-meta-gray">Fuel Type</span>
                      <span className="font-bold text-near-black">{vehicle.fuelType}</span>
                    </div>
                    {vehicle.engineCapacity && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-meta-gray">Engine Capacity</span>
                        <span className="font-bold text-near-black">{vehicle.engineCapacity}</span>
                      </div>
                    )}
                    {vehicle.driveType && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-meta-gray">Drive Type</span>
                        <span className="font-bold text-near-black">{vehicle.driveType}</span>
                      </div>
                    )}
                    {vehicle.doors && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-meta-gray">Doors</span>
                        <span className="font-bold text-near-black">{vehicle.doors}</span>
                      </div>
                    )}
                    {vehicle.color && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-meta-gray">Color</span>
                        <span className="font-bold text-near-black">{vehicle.color}</span>
                      </div>
                    )}
                    {vehicle.serviceHistory && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-meta-gray">Service History</span>
                        <span className="font-bold text-near-black">{vehicle.serviceHistory}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="bg-white p-8">
                  <h2 className="text-2xl font-bold text-near-black mb-6">Features & Equipment</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 py-2">
                        <div className="w-6 h-6 bg-gold flex-shrink-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-near-black">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Finance Tab */}
              {activeTab === 'finance' && (
                <div>
                  <FinanceCalculator vehiclePrice={vehicle.price} />
                </div>
              )}
            </div>

            {/* Enquiry Form Sidebar */}
            <div id="enquiry" className="lg:col-span-1">
              <div className="bg-white p-6 sticky top-24">
                <h3 className="text-lg font-bold text-near-black mb-6">Enquire About This Vehicle</h3>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gold mx-auto flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-near-black mb-2">Enquiry Sent</h4>
                    <p className="text-sm text-meta-gray mb-4">
                      Thank you! We will contact you shortly.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      size="sm"
                    >
                      Send Another Enquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
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
                        Email *
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
                        Phone *
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
                    <div>
                      <label htmlFor="message" className={labelClasses}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={inputClasses}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                    </Button>
                  </form>
                )}

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-meta-gray mb-4">Or contact us directly:</p>
                  <div className="space-y-2">
                    <a
                      href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-sm text-near-black hover:text-gold transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {contact.phones[0]}
                    </a>
                    <a
                      href={`mailto:${contact.email}?subject=Enquiry: ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="flex items-center gap-2 text-sm text-near-black hover:text-gold transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Vehicles Section */}
      {similarVehicles.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="heading-display text-3xl text-near-black mb-2">
                  Similar Vehicles
                </h2>
                <p className="text-meta-gray">Other {vehicle.make} models you might like</p>
              </div>
              <Button href={`/vehicles?make=${vehicle.make}`} variant="outline">
                View All {vehicle.make}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl text-white mb-6">
            Need Financing?
          </h2>
          <p className="text-lg text-silver max-w-2xl mx-auto mb-10">
            We offer competitive finance options through South Africa&apos;s leading financial
            institutions. Get pre-approved today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href={`/finance?vehicle=${vehicle.id}`} variant="primary" size="lg">
              Apply for Finance
            </Button>
            <Button href="/contact" variant="outlineLight" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
