'use client';

import React from 'react';
import { getOptimizedImageUrl } from '@/lib/supabase/storage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  fit?: 'cover' | 'contain' | 'fill';
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  quality = 80,
  format = 'webp',
  fit = 'cover',
  className = '',
}: OptimizedImageProps) {
  // Only optimize if it's a Supabase URL
  const isSupabaseUrl = src.includes(process.env.NEXT_PUBLIC_SUPABASE_URL || '');
  
  // Get optimized URL if it's a Supabase URL
  const imageUrl = isSupabaseUrl 
    ? getOptimizedImageUrl(src, { width, height, quality, format, fit })
    : src;

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  );
}
