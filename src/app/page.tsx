import Link from 'next/link';
import { autoshedData } from '@/data/autoshed-data';
import VehicleCard from '@/components/VehicleCard';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';

export default function HomePage() {
  const { business, usps, services, vehicles } = autoshedData;
  const featuredVehicles = vehicles.slice(0, 6);

  return (
    <>
      {/* Hero Section - Dark with full-bleed automotive photography */}
      <section className="relative min-h-[90vh] flex items-center bg-dark-bg overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">
              Premium Luxury Vehicles
            </p>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6">
              {business.tagline}
            </h1>
            <p className="text-lg sm:text-xl text-silver max-w-xl mb-10 leading-relaxed">
              {business.description}. Over 70% of our business comes from repeat customers and referrals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/vehicles" variant="outlineLight" size="lg">
                View Inventory
              </Button>
              <Button href="/contact" variant="primary" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* USPs Section - White background */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="w-16 h-16 mx-auto lg:mx-0 bg-gold flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-near-black mb-2">{usp.title}</h3>
                <p className="text-sm text-meta-gray leading-relaxed">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Inventory Section - Light gray background */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 lg:mb-12">
            <SectionHeading
              title="Featured Vehicles"
              subtitle="Discover our hand-selected premium inventory"
            />
            <Button href="/vehicles" variant="outline" size="md">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - White background */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive automotive solutions tailored to your needs"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 border-b-2 border-gold hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-dark-bg flex items-center justify-center mb-4">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="text-lg font-bold text-near-black mb-2">{service.title}</h3>
                <p className="text-sm text-meta-gray leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark background with automotive image */}
      <section className="relative py-20 lg:py-32 bg-dark-bg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Ready to Find Your Perfect Vehicle?
            </h2>
            <p className="text-lg text-silver mb-10 leading-relaxed">
              Contact our team today and let us help you find the premium vehicle that matches your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/vehicles" variant="primary" size="lg">
                Browse Inventory
              </Button>
              <Button href="/finance" variant="outlineLight" size="lg">
                Finance Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Your Car CTA - White background */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Looking to Sell Your Car?"
                subtitle="Get a fair, hassle-free valuation for your vehicle. We buy quality used cars and offer competitive prices."
              />
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-near-black">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Quick and easy process
                </li>
                <li className="flex items-center gap-3 text-near-black">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fair market valuations
                </li>
                <li className="flex items-center gap-3 text-near-black">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fast payment
                </li>
                <li className="flex items-center gap-3 text-near-black">
                  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Trade-in options available
                </li>
              </ul>
              <Button href="/sell-your-car" variant="secondary" size="lg">
                Get a Valuation
              </Button>
            </div>
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80)',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

// Service Icon Component
function ServiceIcon({ icon }: { icon: string }) {
  const iconClass = "w-6 h-6 text-white";

  switch (icon) {
    case 'car':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    case 'credit-card':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case 'refresh':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'tag':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      );
    case 'truck':
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v1m-2 2l-4 4m0 0l-4-4m4 4V3m4 14a2 2 0 100 4 2 2 0 000-4zm-8 2h8" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}
