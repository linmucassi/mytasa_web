'use client';

import { useState } from 'react';
import Image from 'next/image';
import { photos } from '@/lib/gallery';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // 201 = new subscriber, 409 = already subscribed (still show success)
      if (res.ok || res.status === 409) {
        setStatus('success');
        setEmail('');
      }
    } catch {
      // Silent fail — newsletter is non-critical
    }
  }

  return (
    <section className="px-3 md:px-5 pb-3 md:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-royal text-white">
        <Image
          src={photos.whiteHands.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal via-royal/85 to-royal/40" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <p className="eyebrow text-gold mb-5">/ Stay connected</p>
            <h2 className="display text-[2.5rem] sm:text-5xl md:text-7xl">
              Never miss
              <br />a <span className="text-gold">revival.</span>
            </h2>
          </div>
          <div>
            <p className="text-white/80 text-lg mb-6 max-w-md">
              Devotionals, event announcements and branch news — delivered to your inbox.
            </p>
            {status === 'success' ? (
              <div className="rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/20 p-6">
                <p className="font-display text-2xl font-bold text-gold">You&apos;re subscribed!</p>
                <p className="text-white/80 mt-1 text-sm">Thank you for joining the TASA community newsletter.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2 rounded-[1.75rem] sm:rounded-full bg-white p-2 shadow-2xl"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.ac.za"
                  required
                  className="flex-1 min-w-0 px-5 py-3 rounded-full text-ink placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gold text-ink px-7 py-3 rounded-full font-bold hover:bg-ink hover:text-white transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
