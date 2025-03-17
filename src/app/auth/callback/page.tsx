'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        setError(error.message);
        return;
      }

      // Redirect to dashboard or home page after successful authentication
      router.push('/');
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-md">
        {error ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => router.push('/auth/signin')}
              className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-indigo-600">Completing Authentication</h1>
            <p className="mt-2 text-gray-600">Please wait while we complete the authentication process...</p>
            <div className="mt-4 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
