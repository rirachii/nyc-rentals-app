# Imgproxy Configuration for NYC Rentals Platform

This document outlines the setup and configuration for using Imgproxy with Supabase Storage for image optimization in the NYC Rentals platform.

## Overview

We're using a combination of Supabase Storage for storing property images and Imgproxy for on-the-fly image optimization. This approach provides:

1. Efficient storage of original high-resolution images
2. Dynamic image resizing and optimization based on device needs
3. Format conversion to modern formats like WebP for better performance
4. Bandwidth savings through optimized delivery

## Implementation Details

### Storage Structure

- All property images are stored in the `property-images` bucket in Supabase Storage
- Images are organized in folders by listing ID
- Each image has a UUID-based filename to prevent collisions

### Image Optimization Parameters

Imgproxy allows for the following transformations:

- **Resizing**: Adjust width and height based on display context
- **Format Conversion**: Convert to WebP, JPEG, PNG, or AVIF
- **Quality Adjustment**: Balance between quality and file size
- **Fit Options**: Cover, contain, or fill to control how images are cropped

### Components

1. **Storage Utility (`/src/lib/supabase/storage.ts`)**
   - Handles bucket initialization
   - Provides upload and delete functions
   - Generates optimized image URLs

2. **ImageUploader Component (`/src/components/ui/ImageUploader.tsx`)**
   - Drag-and-drop interface for image uploads
   - Progress tracking
   - Preview of uploaded images
   - Delete functionality

3. **OptimizedImage Component (`/src/components/ui/OptimizedImage.tsx`)**
   - Wrapper for displaying optimized images
   - Automatically applies appropriate transformations

## Environment Variables

The following environment variables need to be set:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://otlefskeqtkaiutalyhv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Imgproxy Configuration
NEXT_PUBLIC_IMGPROXY_URL=https://imgproxy.example.com
```

## Usage Examples

### Uploading Images

```tsx
import { ImageUploader } from '@/components/ui/ImageUploader';

// In your component
<ImageUploader 
  onImageUploaded={(url, path) => {
    // Handle the uploaded image
    console.log('Image uploaded:', url, path);
  }}
  maxImages={5}
  folder="listings/123"
/>
```

### Displaying Optimized Images

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

// In your component
<OptimizedImage
  src="https://otlefskeqtkaiutalyhv.supabase.co/storage/v1/object/public/property-images/listings/123/image.jpg"
  alt="Beautiful apartment in Chelsea"
  width={800}
  height={600}
  quality={80}
  format="webp"
  fit="cover"
  className="rounded-lg"
/>
```

## Deployment Considerations

For production deployment, consider:

1. Setting up a dedicated Imgproxy instance or using a managed service
2. Configuring proper CORS settings in Supabase Storage
3. Implementing caching strategies for optimized images
4. Monitoring bandwidth usage and storage costs
