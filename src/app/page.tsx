'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data for featured listings
const FEATURED_LISTINGS = [
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
];

// Mock data for neighborhoods
const NEIGHBORHOODS = [
  { name: 'Chelsea', borough: 'Manhattan', imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' },
  { name: 'Williamsburg', borough: 'Brooklyn', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' },
  { name: 'Astoria', borough: 'Queens', imageUrl: 'https://images.unsplash.com/photo-1624944556545-f0d6a7a7c7c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496588152823-86ff7695e68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="NYC Skyline"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect NYC Rental
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white">
            Browse thousands of listings across Manhattan, Brooklyn, Queens, and more.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="">All Neighborhoods</option>
                    <option value="manhattan">Manhattan</option>
                    <option value="brooklyn">Brooklyn</option>
                    <option value="queens">Queens</option>
                    <option value="bronx">Bronx</option>
                    <option value="staten-island">Staten Island</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
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
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Max Price
                  </label>
                  <select
                    id="price"
                    name="price"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="">Any</option>
                    <option value="2000">$2,000</option>
                    <option value="3000">$3,000</option>
                    <option value="4000">$4,000</option>
                    <option value="5000">$5,000</option>
                    <option value="7500">$7,500</option>
                    <option value="10000">$10,000+</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => router.push('/listings')}
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Search Listings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Listings Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Listings
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Check out our top picks for NYC rentals this week
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_LISTINGS.map((listing) => (
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
                      <span>{listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
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

          <div className="mt-12 text-center">
            <Link
              href="/listings"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View All Listings
              <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Neighborhoods Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Neighborhoods
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Explore NYC's most sought-after areas
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {NEIGHBORHOODS.map((neighborhood) => (
              <div key={neighborhood.name} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden">
                  <img
                    src={neighborhood.imageUrl}
                    alt={neighborhood.name}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{neighborhood.name}</h3>
                  <p className="text-sm text-gray-200">{neighborhood.borough}</p>
                  <Link
                    href={`/neighborhoods/${neighborhood.name.toLowerCase()}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-white hover:text-indigo-200"
                  >
                    Browse listings
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Finding your perfect NYC rental is easy with our platform
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Search</h3>
              <p className="mt-2 text-base text-gray-500">
                Browse thousands of verified listings across all NYC boroughs
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Tour</h3>
              <p className="mt-2 text-base text-gray-500">
                Schedule viewings with our experienced real estate brokers
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Rent</h3>
              <p className="mt-2 text-base text-gray-500">
                Apply online and get approved quickly with our streamlined process
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to find your new home?
              </h2>
              <p className="mt-3 max-w-md text-lg text-indigo-100">
                Start your search today and discover the perfect NYC rental apartment with our expert guidance.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 lg:justify-end">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Browse Listings
                </Link>
              </div>
              <div className="ml-4 inline-flex rounded-md shadow">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
