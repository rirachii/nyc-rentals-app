'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const listingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  neighborhood: z.string().min(1, 'Neighborhood is required'),
  borough: z.string().min(1, 'Borough is required'),
  address: z.string().min(5, 'Address is required'),
  unitNumber: z.string().optional(),
  zipCode: z.string().min(5, 'ZIP code is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  bedrooms: z.string().min(1, 'Number of bedrooms is required'),
  bathrooms: z.string().min(1, 'Number of bathrooms is required'),
  squareFeet: z.string().min(1, 'Square footage is required'),
  price: z.string().min(1, 'Price is required'),
  depositAmount: z.string().optional(),
  leaseLength: z.string().min(1, 'Lease length is required'),
  availableFrom: z.string().min(1, 'Availability date is required'),
  isFeatured: z.boolean().optional(),
  status: z.string().min(1, 'Status is required'),
});

type ListingFormValues = z.infer<typeof listingSchema>;

// Mock data for neighborhoods
const NEIGHBORHOODS = [
  { name: 'Chelsea', borough: 'Manhattan' },
  { name: 'West Village', borough: 'Manhattan' },
  { name: 'Upper East Side', borough: 'Manhattan' },
  { name: 'Upper West Side', borough: 'Manhattan' },
  { name: 'Financial District', borough: 'Manhattan' },
  { name: 'Williamsburg', borough: 'Brooklyn' },
  { name: 'Park Slope', borough: 'Brooklyn' },
  { name: 'DUMBO', borough: 'Brooklyn' },
  { name: 'Astoria', borough: 'Queens' },
  { name: 'Long Island City', borough: 'Queens' },
];

// Mock data for property types
const PROPERTY_TYPES = [
  'Apartment',
  'Condo',
  'Townhouse',
  'Loft',
  'Duplex',
  'Studio',
];

// Mock data for amenities
const AMENITIES = [
  'Dishwasher',
  'Washer/Dryer',
  'Hardwood Floors',
  'Stainless Steel Appliances',
  'Central Air',
  'Elevator',
  'Doorman',
  'Gym',
  'Roof Deck',
  'Balcony',
  'Terrace',
  'Pets Allowed',
  'Laundry in Building',
  'Storage Available',
  'Parking Available',
];

export default function NewListingPage() {
  const router = useRouter();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      borough: '',
      neighborhood: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      leaseLength: '12',
      status: 'available',
      isFeatured: false,
    },
  });

  const watchBorough = watch('borough');

  const filteredNeighborhoods = NEIGHBORHOODS.filter(
    (n) => n.borough === watchBorough
  );

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real application, you would upload these to Supabase storage
    // For now, we'll just create fake URLs
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const onSubmit = async (data: ListingFormValues) => {
    setIsSubmitting(true);

    // In a real application, this would send the data to your Supabase backend
    console.log('Form data:', {
      ...data,
      amenities: selectedAmenities,
      images: uploadedImages,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    router.push('/admin/dashboard?tab=listings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">NYC Rentals</span>
                <span className="ml-2 rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                  Admin
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                target="_blank"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Listing</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create a new rental listing with all details and images.
            </p>
          </div>
          <Link
            href="/admin/dashboard?tab=listings"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
              <p className="mt-1 text-sm text-gray-500">
                Provide the basic details about the rental property.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., Modern 2BR in Chelsea with Balcony"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    {...register('description')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Describe the property in detail..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="borough" className="block text-sm font-medium text-gray-700">
                    Borough
                  </label>
                  <select
                    id="borough"
                    {...register('borough')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select Borough</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Queens">Queens</option>
                    <option value="Bronx">Bronx</option>
                    <option value="Staten Island">Staten Island</option>
                  </select>
                  {errors.borough && (
                    <p className="mt-1 text-sm text-red-600">{errors.borough.message}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                    Neighborhood
                  </label>
                  <select
                    id="neighborhood"
                    {...register('neighborhood')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={!watchBorough}
                  >
                    <option value="">Select Neighborhood</option>
                    {filteredNeighborhoods.map((neighborhood) => (
                      <option key={neighborhood.name} value={neighborhood.name}>
                        {neighborhood.name}
                      </option>
                    ))}
                  </select>
                  {errors.neighborhood && (
                    <p className="mt-1 text-sm text-red-600">{errors.neighborhood.message}</p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., 123 W 23rd St"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="unitNumber" className="block text-sm font-medium text-gray-700">
                    Unit Number (optional)
                  </label>
                  <input
                    type="text"
                    id="unitNumber"
                    {...register('unitNumber')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., Apt 4B"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('zipCode')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., 10011"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Property Details</h2>
              <p className="mt-1 text-sm text-gray-500">
                Provide specific details about the property.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    {...register('propertyType')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select Property Type</option>
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.propertyType && (
                    <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    {...register('status')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="rented">Rented</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    {...register('bedrooms')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select</option>
                    <option value="0">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                  {errors.bedrooms && (
                    <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <select
                    id="bathrooms"
                    {...register('bathrooms')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5+</option>
                  </select>
                  {errors.bathrooms && (
                    <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    id="squareFeet"
                    {...register('squareFeet')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., 850"
                  />
                  {errors.squareFeet && (
                    <p className="mt-1 text-sm text-red-600">{errors.squareFeet.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Monthly Rent ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    {...register('price')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., 3500"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700">
                    Security Deposit ($)
                  </label>
                  <input
                    type="number"
                    id="depositAmount"
                    {...register('depositAmount')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., 7000"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="leaseLength" className="block text-sm font-medium text-gray-700">
                    Lease Length (months)
                  </label>
                  <select
                    id="leaseLength"
                    {...register('leaseLength')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                  {errors.leaseLength && (
                    <p className="mt-1 text-sm text-red-600">{errors.leaseLength.message}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700">
                    Available From
                  </label>
                  <input
                    type="date"
                    id="availableFrom"
                    {...register('availableFrom')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.availableFrom && (
                    <p className="mt-1 text-sm text-red-600">{errors.availableFrom.message}</p>
                  )}
                </div>

                <div className="sm:col-span-3 flex items-center pt-5">
                  <input
                    id="isFeatured"
                    type="checkbox"
                    {...register('isFeatured')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                    Feature this listing on the homepage
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Amenities</h2>
              <p className="mt-1 text-sm text-gray-500">
                Select all amenities that apply to this property.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`amenity-${amenity}`}
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`amenity-${amenity}`} className="text-gray-700">
                        {amenity}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Property Images</h2>
              <p className="mt-1 text-sm text-gray-500">
                Upload high-quality images of the property (maximum 10 images).
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadedImages.length >= 10}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Uploaded Images</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Property image ${index + 1}`}
                          className="h-24 w-full rounded-md object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedImages((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="absolute top-0 right-0 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Link
              href="/admin/dashboard?tab=listings"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
