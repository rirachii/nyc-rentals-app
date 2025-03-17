'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data for listings
const LISTINGS = [
  {
    id: '1',
    title: 'Modern 2BR in Chelsea',
    neighborhood: 'Chelsea',
    borough: 'Manhattan',
    price: 3500,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 850,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: '2',
    title: 'Spacious 3BR with Balcony',
    neighborhood: 'Williamsburg',
    borough: 'Brooklyn',
    price: 4200,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: '3',
    title: 'Cozy 1BR in Astoria',
    neighborhood: 'Astoria',
    borough: 'Queens',
    price: 2200,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: '4',
    title: 'Luxury Studio in Financial District',
    neighborhood: 'Financial District',
    borough: 'Manhattan',
    price: 2800,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 550,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: '5',
    title: 'Renovated 2BR in Park Slope',
    neighborhood: 'Park Slope',
    borough: 'Brooklyn',
    price: 3800,
    bedrooms: 2,
    bathrooms: 1.5,
    squareFeet: 900,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: '6',
    title: 'Charming 1BR in West Village',
    neighborhood: 'West Village',
    borough: 'Manhattan',
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 600,
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },
];

export default function ListingsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    location: '',
    bedrooms: '',
    minPrice: '',
    maxPrice: '',
  });
  const [filteredListings, setFilteredListings] = useState(LISTINGS);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let results = [...LISTINGS];

    if (filters.location) {
      results = results.filter((listing) => 
        listing.borough.toLowerCase() === filters.location.toLowerCase() ||
        listing.neighborhood.toLowerCase() === filters.location.toLowerCase()
      );
    }

    if (filters.bedrooms) {
      if (filters.bedrooms === 'studio') {
        results = results.filter((listing) => listing.bedrooms === 0);
      } else {
        const bedroomCount = parseInt(filters.bedrooms, 10);
        if (filters.bedrooms === '3') {
          results = results.filter((listing) => listing.bedrooms >= 3);
        } else {
          results = results.filter((listing) => listing.bedrooms === bedroomCount);
        }
      }
    }

    if (filters.minPrice) {
      const minPrice = parseInt(filters.minPrice, 10);
      results = results.filter((listing) => listing.price >= minPrice);
    }

    if (filters.maxPrice) {
      const maxPrice = parseInt(filters.maxPrice, 10);
      results = results.filter((listing) => listing.price <= maxPrice);
    }

    setFilteredListings(results);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Filters Sidebar */}
          <div className="mb-8 w-full md:mb-0 md:w-1/4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="">All Locations</option>
                    <option value="manhattan">Manhattan</option>
                    <option value="brooklyn">Brooklyn</option>
                    <option value="queens">Queens</option>
                    <option value="bronx">Bronx</option>
                    <option value="staten island">Staten Island</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="">Any</option>
                    <option value="studio">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                    Min Price
                  </label>
                  <select
                    id="minPrice"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="">No Min</option>
                    <option value="1500">$1,500</option>
                    <option value="2000">$2,000</option>
                    <option value="2500">$2,500</option>
                    <option value="3000">$3,000</option>
                    <option value="3500">$3,500</option>
                    <option value="4000">$4,000</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                    Max Price
                  </label>
                  <select
                    id="maxPrice"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="">No Max</option>
                    <option value="2000">$2,000</option>
                    <option value="2500">$2,500</option>
                    <option value="3000">$3,000</option>
                    <option value="3500">$3,500</option>
                    <option value="4000">$4,000</option>
                    <option value="5000">$5,000</option>
                    <option value="6000">$6,000</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={applyFilters}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="w-full md:w-3/4">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Available Rentals</h1>
              <p className="text-sm text-gray-500">{filteredListings.length} listings found</p>
            </div>

            {filteredListings.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((listing) => (
                  <div key={listing.id} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden">
                      <img
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="inline-flex items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800">
                          {listing.neighborhood}, {listing.borough}
                        </span>
                        <span className="text-lg font-bold text-indigo-600">${listing.price}/mo</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{listing.title}</h3>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <span>{listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} ${listing.bedrooms === 1 ? 'Bed' : 'Beds'}`}</span>
                          <span>{listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                          <span>{listing.squareFeet} sq ft</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link
                          href={`/listings/${listing.id}`}
                          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => {
                    setFilters({
                      location: '',
                      bedrooms: '',
                      minPrice: '',
                      maxPrice: '',
                    });
                    setFilteredListings(LISTINGS);
                  }}
                  className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
