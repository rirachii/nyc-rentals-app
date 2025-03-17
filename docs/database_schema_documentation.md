# NYC Rentals Platform - Database Schema Documentation

## Overview
This document outlines the database schema design for the NYC Rentals platform, a full-stack application built with Next.js, React, and Supabase. The schema is designed to efficiently store and retrieve data for rental property listings in NYC.

## Tables

### Neighborhoods
Stores information about NYC neighborhoods and boroughs.
- `id`: UUID primary key
- `name`: Neighborhood name (e.g., "Chelsea", "Williamsburg")
- `borough`: Borough name (e.g., "Manhattan", "Brooklyn")
- `description`: Detailed description of the neighborhood
- `image_url`: URL to a representative image
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Amenities
Stores available amenities that can be associated with listings.
- `id`: UUID primary key
- `name`: Amenity name (e.g., "Dishwasher", "Elevator")
- `icon`: Icon identifier for UI display
- `category`: Category grouping (e.g., "Kitchen", "Building")
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Property Types
Defines different types of rental properties.
- `id`: UUID primary key
- `name`: Property type name (e.g., "Apartment", "Townhouse")
- `description`: Description of the property type
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Listings
The core table storing rental property listings.
- `id`: UUID primary key
- `title`: Listing title
- `description`: Detailed description
- `neighborhood_id`: Foreign key to neighborhoods
- `address`: Street address
- `unit_number`: Apartment/unit number
- `zip_code`: ZIP code
- `latitude`: Geographic coordinate
- `longitude`: Geographic coordinate
- `property_type_id`: Foreign key to property types
- `bedrooms`: Number of bedrooms
- `bathrooms`: Number of bathrooms (decimal for half-baths)
- `square_feet`: Size in square feet
- `price`: Monthly rental price
- `deposit_amount`: Security deposit amount
- `lease_length`: Lease duration in months
- `available_from`: Date when property becomes available
- `is_featured`: Boolean flag for featured listings
- `is_published`: Boolean flag for published/draft status
- `status`: Current status (available, pending, rented)
- `created_by`: Foreign key to auth.users
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Listing Images
Stores images associated with listings.
- `id`: UUID primary key
- `listing_id`: Foreign key to listings
- `url`: Original image URL
- `cdn_url`: CDN-optimized image URL
- `alt_text`: Alternative text for accessibility
- `is_primary`: Boolean flag for primary/featured image
- `display_order`: Integer for ordering images
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Listing Amenities
Junction table connecting listings with amenities.
- `listing_id`: Foreign key to listings
- `amenity_id`: Foreign key to amenities
- Composite primary key of both columns

### Inquiries
Stores user inquiries about listings.
- `id`: UUID primary key
- `listing_id`: Foreign key to listings
- `name`: Inquirer's name
- `email`: Inquirer's email
- `phone`: Inquirer's phone number
- `message`: Inquiry message
- `status`: Status of inquiry (new, contacted, scheduled, closed)
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Profiles
Extends the Supabase auth.users table with additional user information.
- `id`: UUID primary key (references auth.users)
- `first_name`: User's first name
- `last_name`: User's last name
- `role`: User role (user, admin, broker)
- `avatar_url`: URL to user's avatar
- `phone`: User's phone number
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

### Saved Listings
Junction table for users' saved/favorited listings.
- `user_id`: Foreign key to auth.users
- `listing_id`: Foreign key to listings
- `created_at`: Timestamp of creation
- Composite primary key of both columns

## Security

The schema implements Row Level Security (RLS) policies to ensure:
- Public data (listings, neighborhoods) is readable by everyone
- User data is protected and only accessible by the owner
- Admin operations are restricted to users with appropriate roles
- Automatic profile creation for new users via database triggers

## Indexes

Performance-optimized indexes are created for:
- Neighborhood searches by borough
- Listing searches by neighborhood, bedrooms, price, status, and featured status
- Image retrieval by listing
- Inquiry filtering by listing and status
- User filtering by role

## Relationships

The schema establishes these key relationships:
- Listings belong to neighborhoods and property types
- Listings have many images
- Listings have many amenities (many-to-many)
- Users can save many listings (many-to-many)
- Listings can have many inquiries
- Each user has one profile

This comprehensive schema design supports all the required functionality for the NYC Rentals platform while maintaining data integrity and security.
