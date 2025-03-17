'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Mock data for a single listing
const LISTING = {
  id: '1',
  title: 'Modern 2BR in Chelsea',
  description: 'This beautiful 2-bedroom apartment in the heart of Chelsea features hardwood floors, stainless steel appliances, and abundant natural light. Recently renovated with modern finishes throughout. The building offers a doorman, elevator, and laundry facilities. Located just steps from the High Line, Chelsea Market, and multiple subway lines.',
  neighborhood: 'Chelsea',
  borough: 'Manhattan',
  address: '123 W 23rd St',
  price: 3500,
  deposit: 7000,
  bedrooms: 2,
  bathrooms: 1,
  squareFeet: 850,
  availableFrom: '2025-04-01',
  leaseLength: 12,
  amenities: [
    'Dishwasher',
    'Hardwood Floors',
    'Stainless Steel Appliances',
    'Central Air',
    'Elevator',
    'Doorman',
    'Laundry in Building',
    'Pets Allowed',
  ],
  images: [
    {
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Living room with large windows',
    },
    {
      url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Modern kitchen with island',
    },
    {
      url: 'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Master bedroom',
    },
    {
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Modern bathroom',
    },
  ],
  broker: {
    name: 'Jane Smith',
    phone: '(212) 555-1234',
    email: 'jane.smith@nycrentals.com',
  },
};

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      message: `Hi, I'm interested in this ${LISTING.bedrooms} bedroom apartment in ${LISTING.neighborhood}. Please contact me with more information.`,
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    // In a real application, this would send the data to your Supabase backend
    console.log('Inquiry submitted:', data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setInquirySubmitted(true);
    reset();
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <Link href="/listings" className="text-gray-500 hover:text-gray-700">
                Listings
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <span className="text-gray-900">{LISTING.title}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <div className="relative h-96">
                <img
                  src={LISTING.images[activeImageIndex].url}
                  alt={LISTING.images[activeImageIndex].alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {LISTING.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`relative h-24 overflow-hidden rounded-md ${
                      index === activeImageIndex ? 'ring-2 ring-indigo-500' : ''
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Listing Details */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{LISTING.title}</h1>
                <span className="text-2xl font-bold text-indigo-600">${LISTING.price}/mo</span>
              </div>
              <p className="mb-4 text-lg text-gray-500">
                {LISTING.address}, {LISTING.neighborhood}, {LISTING.borough}
              </p>

              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-sm text-gray-500">Bedrooms</span>
                  <p className="text-lg font-medium text-gray-900">{LISTING.bedrooms}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-sm text-gray-500">Bathrooms</span>
                  <p className="text-lg font-medium text-gray-900">{LISTING.bathrooms}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-sm text-gray-500">Square Feet</span>
                  <p className="text-lg font-medium text-gray-900">{LISTING.squareFeet}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <span className="text-sm text-gray-500">Available</span>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(LISTING.availableFrom).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Description</h2>
                <p className="text-gray-700">{LISTING.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {LISTING.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Lease Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Lease Length</span>
                    <p className="text-gray-900">{LISTING.leaseLength} months</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Security Deposit</span>
                    <p className="text-gray-900">${LISTING.deposit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold text-gray-900">Interested in this property?</h2>
                <p className="mt-2 text-gray-500">Contact the listing broker or schedule a viewing</p>
              </div>

              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-medium text-gray-900">Listing Broker</h3>
                <p className="text-gray-700">{LISTING.broker.name}</p>
                <p className="text-gray-700">{LISTING.broker.phone}</p>
                <p className="text-gray-700">{LISTING.broker.email}</p>
              </div>

              {inquirySubmitted ? (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Inquiry Sent</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Thank you for your interest! The broker will contact you shortly.
                        </p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => setInquirySubmitted(false)}
                          className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                        >
                          Send another inquiry
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
