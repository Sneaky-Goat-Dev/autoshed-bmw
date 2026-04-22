'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { formatPrice, formatMileage } from '@/utils/format';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = vehicle.images || [];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="group block bg-white">
      {/* Vehicle Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {images.length > 0 ? (
          <Image
            src={images[currentImageIndex]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={1}
                  d="M19 9l-7 7-7-7"
                />
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth={1}
                  d="M5 17h14M5 13h14M7 9h10l-2-4H9L7 9z"
                />
              </svg>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {vehicle.make} {vehicle.model}
              </p>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />

        {/* Navigation Arrows - Only show on hover and if multiple images */}
        {hasMultipleImages && (
          <>
            {/* Left Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-near-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-near-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {images.slice(0, 5).map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-gold' : 'bg-white/70'
                  }`}
                />
              ))}
              {images.length > 5 && (
                <span className="text-white text-xs ml-1">+{images.length - 5}</span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 border-l border-r border-b border-gray-200">
        {/* Title */}
        <h3 className="text-lg font-bold text-near-black leading-tight mb-1 group-hover:text-gold transition-colors">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-meta-gray mb-3">{vehicle.variant}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-meta-gray">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
            </svg>
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            <span>{vehicle.fuelType}</span>
          </div>
          {vehicle.driveType && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{vehicle.driveType}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-xl font-bold text-near-black">{formatPrice(vehicle.price)}</span>
          <span className="text-sm text-gold font-bold uppercase tracking-wider group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
