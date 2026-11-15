'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Arrow from './Arrow';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Branches', href: '/#branches' },
  { label: 'Resources', href: '/#resources' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/contact' },
];

const mobileExtra = [{ label: 'Testimonials', href: '/#testimonials' }];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-3 md:py-4'
        }`}
      >
        <div className="px-3 md:px-5">
          <div
            className={`max-w-7xl mx-auto flex items-center justify-between rounded-full pl-3 pr-2 py-2 transition-all duration-300 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(10,14,36,0.25)] ring-1 ring-ink/5'
                : 'bg-transparent'
            }`}
          >
            <Logo />

            <ul className="hidden lg:flex items-center gap-1 rounded-full bg-white/70 ring-1 ring-ink/5 p-1">
              {navLinks.map(({ label, href }) => {
                const active =
                  href === pathname || (label === 'Branches' && pathname.startsWith('/branches/'));
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className={`block px-4 py-2 rounded-full text-sm font-medium transition ${
                        active ? 'bg-ink text-white' : 'text-gray-700 hover:text-ink hover:bg-gray-100'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-ink transition">
                Login
              </Link>
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 bg-ink text-white pl-5 pr-1.5 py-1.5 rounded-full text-sm font-semibold hover:bg-royal transition"
              >
                Join TASA
                <span className="grid place-items-center w-7 h-7 rounded-full bg-gold text-ink transition-transform group-hover:rotate-45">
                  <Arrow />
                </span>
              </Link>
            </div>

            <button
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full bg-ink text-white"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="flex flex-col gap-1.5">
                <span className="block w-5 h-0.5 bg-current" />
                <span className="block w-3.5 h-0.5 bg-current ml-auto" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-ink text-white transition-[opacity,visibility] duration-300 grain ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!open}
      >
        <div className="relative h-full flex flex-col px-6 py-5 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Logo tone="light" onClick={close} />
            <button
              onClick={close}
              aria-label="Close menu"
              className="grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white text-2xl"
            >
              ×
            </button>
          </div>
          <ul className="mt-12 space-y-1">
            {[{ label: 'Home', href: '/' }, ...navLinks, ...mobileExtra].map(({ label, href }, i) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={close}
                  className="flex items-baseline gap-4 py-2 display text-4xl sm:text-5xl hover:text-gold transition"
                >
                  <span className="eyebrow text-white/40 !text-[0.65rem]">{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10 flex gap-3">
            <Link href="/login" onClick={close} className="flex-1 text-center rounded-full border border-white/20 py-3.5 font-semibold">
              Login
            </Link>
            <Link href="/register" onClick={close} className="flex-1 text-center rounded-full bg-gold text-ink py-3.5 font-bold">
              Join TASA
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

