-- Database Schema for NYC Rentals Platform

-- Neighborhoods Table
CREATE TABLE neighborhoods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  borough TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster neighborhood searches
CREATE INDEX idx_neighborhoods_borough ON neighborhoods(borough);

-- Amenities Table
CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property Types Table
CREATE TABLE property_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listings Table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  neighborhood_id UUID REFERENCES neighborhoods(id),
  address TEXT NOT NULL,
  unit_number TEXT,
  zip_code TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  property_type_id UUID REFERENCES property_types(id),
  bedrooms SMALLINT NOT NULL,
  bathrooms DECIMAL(3, 1) NOT NULL,
  square_feet INTEGER,
  price DECIMAL(10, 2) NOT NULL,
  deposit_amount DECIMAL(10, 2),
  lease_length INTEGER, -- in months
  available_from DATE NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'available', -- available, pending, rented
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster listing searches
CREATE INDEX idx_listings_neighborhood ON listings(neighborhood_id);
CREATE INDEX idx_listings_bedrooms ON listings(bedrooms);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_is_featured ON listings(is_featured);
CREATE INDEX idx_listings_is_published ON listings(is_published);

-- Listing Images Table
CREATE TABLE listing_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  cdn_url TEXT,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster image retrieval
CREATE INDEX idx_listing_images_listing_id ON listing_images(listing_id);

-- Listing Amenities Junction Table
CREATE TABLE listing_amenities (
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, amenity_id)
);

-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, scheduled, closed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster inquiry retrieval
CREATE INDEX idx_inquiries_listing_id ON inquiries(listing_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);

-- User Profiles Table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'user', -- user, admin, broker
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster profile searches
CREATE INDEX idx_profiles_role ON profiles(role);

-- Saved Listings Table
CREATE TABLE saved_listings (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);

-- Create RLS Policies
-- Enable Row Level Security
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;

-- Neighborhoods Policies
CREATE POLICY "Neighborhoods are viewable by everyone" 
ON neighborhoods FOR SELECT USING (true);

CREATE POLICY "Neighborhoods are insertable by admins" 
ON neighborhoods FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'broker')
  )
);

CREATE POLICY "Neighborhoods are updatable by admins" 
ON neighborhoods FOR UPDATE USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'broker')
  )
);

CREATE POLICY "Neighborhoods are deletable by admins" 
ON neighborhoods FOR DELETE USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin')
  )
);

-- Similar policies for other tables...

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
