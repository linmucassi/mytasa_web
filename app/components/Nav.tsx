'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/events' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Branches', href: '/#branches' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Resources', href: '/#resources' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-blue-700 font-bold text-xl tracking-tight flex items-center gap-2">
          <span>TASA</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-5 items-center">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-gray-700 font-medium hover:text-blue-700 transition text-sm"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-gray-700 font-medium hover:text-blue-700 transition text-sm"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition"
          >
            Join TASA
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current my-1.5 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <ul className="flex flex-col py-2">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="block px-6 py-3 text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-sm"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100 mt-1">
              <Link
                href="/login"
                className="block px-6 py-3 text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-sm"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                href="/register"
                className="block text-center bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition"
                onClick={() => setOpen(false)}
              >
                Join TASA
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
