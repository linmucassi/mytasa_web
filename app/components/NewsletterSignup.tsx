'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to email backend (SendGrid / Nodemailer)
    setStatus('success');
    setEmail('');
  }

  return (
    <section className="py-16 px-4 bg-blue-700 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Stay Connected</h2>
        <p className="text-blue-100 mb-8">
          Get TASA updates, devotionals, and event announcements delivered to your inbox.
        </p>

        {status === 'success' ? (
          <div className="bg-blue-600 rounded-xl py-6 px-8">
            <p className="text-yellow-300 font-semibold text-xl">You&apos;re subscribed!</p>
            <p className="text-blue-100 mt-2 text-sm">Thank you for joining the TASA community newsletter.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 max-w-sm px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
