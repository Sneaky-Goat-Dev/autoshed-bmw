'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import type { Vehicle } from '@/types';

interface VehicleSelectProps {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}

function vehicleLabel(v: Vehicle): string {
  return `${v.year} ${v.make} ${v.model}${v.variant ? ` ${v.variant}` : ''}`.trim();
}

/**
 * Searchable vehicle dropdown. Type to filter the dealership's live stock;
 * selecting a vehicle calls onSelect so the parent can prefill fields.
 */
export default function VehicleSelect({ vehicles, onSelect }: VehicleSelectProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? vehicles.filter(
          (v) =>
            vehicleLabel(v).toLowerCase().includes(q) ||
            (v.stockNumber ?? '').toLowerCase().includes(q)
        )
      : vehicles;
    return list.slice(0, 50);
  }, [query, vehicles]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search our stock by make, model or year…"
        className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-gold focus:ring-0 focus:outline-none bg-white"
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto border border-gray-200 bg-white shadow-lg">
          {filtered.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(v);
                  setQuery(vehicleLabel(v));
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm hover:bg-gray-50"
              >
                <span className="text-near-black">{vehicleLabel(v)}</span>
                <span className="text-meta-gray whitespace-nowrap">R{v.price.toLocaleString()}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <div className="absolute z-20 mt-1 w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-meta-gray">
          No matching vehicles in stock
        </div>
      )}
    </div>
  );
}
