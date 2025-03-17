'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'Neighborhoods', href: '/neighborhoods' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-200 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">NYC Rentals</span>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-base font-medium',
                    pathname === link.href
                      ? 'text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-500'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link
              href="/auth/signin"
              className="inline-block rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-base font-medium',
                pathname === link.href
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-500'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
