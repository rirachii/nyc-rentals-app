'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SignInForm from '@/components/auth/SignInForm';

export default function AdminLoginPage() {
  const router = useRouter();
  
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Admin Dashboard Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your NYC Rentals listings
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignInForm />
        
        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
