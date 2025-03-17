'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { uploadImage, deleteImage, getOptimizedImageUrl } from '@/lib/supabase/storage';

interface ImageUploaderProps {
  onImageUploaded?: (imageUrl: string, imagePath: string) => void;
  onImageRemoved?: (imagePath: string) => void;
  maxImages?: number;
  folder?: string;
  className?: string;
}

export default function ImageUploader({
  onImageUploaded,
  onImageRemoved,
  maxImages = 10,
  folder = 'listings',
  className = '',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; path: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the maximum
    if (uploadedImages.length + files.length > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update progress
        setUploadProgress(Math.round((i / files.length) * 100));
        
        // Upload to Supabase Storage
        const result = await uploadImage(file, folder);
        
        // Add to state
        setUploadedImages(prev => [...prev, result]);
        
        // Call callback if provided
        if (onImageUploaded) {
          onImageUploaded(result.url, result.path);
        }
      }
      
      // Reset the file input
      e.target.value = '';
    } catch (err) {
      console.error('Error uploading images:', err);
      setError('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = uploadedImages[index];
    
    try {
      // Delete from Supabase Storage
      await deleteImage(imageToRemove.path);
      
      // Remove from state
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
      
      // Call callback if provided
      if (onImageRemoved) {
        onImageRemoved(imageToRemove.path);
      }
    } catch (err) {
      console.error('Error removing image:', err);
      setError('Failed to remove image. Please try again.');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Input */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
            isUploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <div className="space-y-2 text-center">
                <div className="text-sm text-gray-500">Uploading... {uploadProgress}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <>
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, or WEBP (MAX. {maxImages} images)
                </p>
              </>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={isUploading || uploadedImages.length >= maxImages}
          />
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Image Preview */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">Uploaded Images</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={getOptimizedImageUrl(image.url, { width: 300, height: 300, quality: 80 })}
                    alt={`Uploaded image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
