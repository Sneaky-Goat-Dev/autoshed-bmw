import type { Metadata } from 'next';
import { getVehicleById } from '@/lib/db';
import { formatPrice, formatMileage } from '@/utils/format';
import VehicleDetailClient from './VehicleDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Per-vehicle Open Graph / Twitter tags so shared links (Facebook, WhatsApp,
// LinkedIn, etc.) unfurl into a rich card with the car's photo, title and price.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return { title: 'Vehicle Not Found | The Autoshed' };
  }

  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`.trim();
  const heading = `${name} — ${formatPrice(vehicle.price)}`;
  const specs = [
    formatMileage(vehicle.mileage),
    vehicle.transmission,
    vehicle.fuelType,
    vehicle.engineCapacity,
    vehicle.driveType?.replace(/([a-z])([A-Z])/g, '$1 $2'),
    vehicle.color,
  ]
    .filter(Boolean)
    .join(' · ');
  const features = (vehicle.features ?? []).slice(0, 4).join(', ');
  const description = `${formatPrice(vehicle.price)} · ${specs}.${
    features ? ` Features: ${features}.` : ''
  } Premium pre-owned ${vehicle.make} at The Autoshed.`;
  const image = vehicle.images?.[0];

  return {
    title: `${heading} | The Autoshed`,
    description,
    openGraph: {
      title: heading,
      description,
      type: 'website',
      siteName: 'The Autoshed',
      images: image ? [{ url: image, alt: name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: heading,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <VehicleDetailClient id={id} />;
}
