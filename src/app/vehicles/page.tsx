'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { autoshedData } from '@/data/autoshed-data';
import VehicleCard from '@/components/VehicleCard';
import SectionHeading from '@/components/SectionHeading';
import { getUniqueValues, formatPrice } from '@/utils/format';

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'mileage-asc';

function VehiclesContent() {
  const searchParams = useSearchParams();
  const initialMake = searchParams.get('make') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState(initialMake);

  // Update selected make when URL changes
  useEffect(() => {
    const make = searchParams.get('make') || '';
    setSelectedMake(make);
  }, [searchParams]);
  const [sortBy, setSortBy] = useState<SortOption>('price-desc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  const { vehicles } = autoshedData;

  // Get unique makes from vehicles
  const makes = useMemo(() => {
    return getUniqueValues(vehicles, 'make').sort();
  }, [vehicles]);

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.variant.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query)
      );
    }

    // Make filter
    if (selectedMake) {
      result = result.filter((v) => v.make === selectedMake);
    }

    // Price range filter
    result = result.filter((v) => v.price >= priceRange[0] && v.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
    }

    return result;
  }, [vehicles, searchQuery, selectedMake, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMake('');
    setPriceRange([0, 2000000]);
    setSortBy('price-desc');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-dark-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Our Vehicles
          </h1>
          <p className="text-lg text-silver max-w-2xl mx-auto">
            Explore our hand-selected inventory of premium luxury vehicles
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-200 text-sm focus:border-gold focus:ring-0"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-meta-gray"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Make Filter */}
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="px-4 py-3 border border-gray-200 text-sm bg-white focus:border-gold focus:ring-0 min-w-[150px]"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 border border-gray-200 text-sm bg-white focus:border-gold focus:ring-0 min-w-[180px]"
              >
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="year-desc">Year: Newest First</option>
                <option value="year-asc">Year: Oldest First</option>
                <option value="mileage-asc">Mileage: Low to High</option>
              </select>

              {/* Clear Filters */}
              {(searchQuery || selectedMake || priceRange[0] > 0 || priceRange[1] < 2000000) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 border border-gray-200 text-sm text-gold hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-sm text-meta-gray">Price Range:</span>
              <span className="text-sm font-bold">{formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</span>
              <input
                type="range"
                min={0}
                max={2000000}
                step={50000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="flex-1 h-2 bg-gray-200 appearance-none cursor-pointer accent-gold max-w-xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-meta-gray">
              Showing <span className="font-bold text-near-black">{filteredVehicles.length}</span> vehicles
              {selectedMake && <span> in <span className="font-bold text-near-black">{selectedMake}</span></span>}
            </p>
          </div>

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-near-black mb-2">No vehicles found</h3>
              <p className="text-meta-gray mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gold text-white font-bold uppercase tracking-wider hover:bg-gold-dark transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Loading fallback for Suspense
function VehiclesLoading() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-dark-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Our Vehicles
          </h1>
          <p className="text-lg text-silver max-w-2xl mx-auto">
            Explore our hand-selected inventory of premium luxury vehicles
          </p>
        </div>
      </section>

      {/* Loading State */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 w-3/4" />
                  <div className="h-4 bg-gray-200 w-1/2" />
                  <div className="h-6 bg-gray-200 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<VehiclesLoading />}>
      <VehiclesContent />
    </Suspense>
  );
}
