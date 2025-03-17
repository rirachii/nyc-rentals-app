'use client';

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the bucket name for property images
export const PROPERTY_IMAGES_BUCKET = 'property-images';

// Initialize the storage bucket if it doesn't exist
export const initializeStorage = async () => {
  try {
    // Check if the bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === PROPERTY_IMAGES_BUCKET);
    
    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      const { error } = await supabase.storage.createBucket(PROPERTY_IMAGES_BUCKET, {
        public: true, // Make the bucket public so images can be accessed without authentication
        fileSizeLimit: 10485760, // 10MB limit per file
      });
      
      if (error) {
        console.error('Error creating storage bucket:', error);
        throw error;
      }
      
      console.log(`Storage bucket '${PROPERTY_IMAGES_BUCKET}' created successfully`);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
    throw error;
  }
};

// Upload an image to Supabase Storage
export const uploadImage = async (file: File, folder: string = 'listings') => {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExt}`;
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from(PROPERTY_IMAGES_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(PROPERTY_IMAGES_BUCKET)
      .getPublicUrl(data.path);
    
    return {
      path: data.path,
      url: publicUrl,
    };
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
};

// Delete an image from Supabase Storage
export const deleteImage = async (path: string) => {
  try {
    const { error } = await supabase.storage
      .from(PROPERTY_IMAGES_BUCKET)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw error;
  }
};

// Get optimized image URL with Imgproxy parameters
export const getOptimizedImageUrl = (url: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  fit?: 'cover' | 'contain' | 'fill';
}) => {
  // Default options
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
    fit = 'cover',
  } = options;
  
  // Base URL for Imgproxy
  const imgproxyUrl = process.env.NEXT_PUBLIC_IMGPROXY_URL || 'https://imgproxy.example.com';
  
  // Encode the original URL
  const encodedUrl = Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  // Construct the Imgproxy URL
  return `${imgproxyUrl}/insecure/rs:fit:${fit}:${width}:${height}:${quality}/plain/${encodedUrl}.${format}`;
};

export default supabase;
