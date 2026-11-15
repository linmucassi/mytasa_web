'use client';

import { useState } from 'react';
import PageHero from '../components/PageHero';
import Arrow from '../components/Arrow';
import { photos } from '@/lib/gallery';

const departments = [
  'General Enquiry',
  'Membership & Registration',
  'Events & Conferences',
  'Branch Support',
  'Donations & Resource Mobilisation',
  'Media & Communications',
  'Prayer Requests',
];

const socials = [
  { label: 'X', handle: '@tasa_int', href: 'https://x.com/tasa_int' },
  { label: 'Instagram', handle: '@tasa_int', href: 'https://instagram.com/tasa_int' },
  { label: 'Facebook', handle: '@nationaltasa', href: 'https://facebook.com/nationaltasa' },
];

const faqs = [
  {
    q: 'How do I join TASA?',
    a: 'Register on this site and then attend a branch meeting at your nearest university campus. All students are welcome regardless of background.',
  },
  {
    q: 'Is TASA affiliated with a church?',
    a: "TASA serves under the leadership of the Twelve Apostles' Church in Christ (TACC) but is student-led and administered.",
  },
  {
    q: 'Are there branches outside South Africa?',
    a: 'Yes, TASA has an international presence. Contact the national office for information on branches outside South Africa.',
  },
  {
    q: 'How can I get financial support as a student?',
    a: 'TASA has an Educational Fund Committee that handles bursary applications and academic support. Speak to your branch leader.',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('idle'); // reset any prior error
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? 'Failed to send message. Please try again.');
        return;
      }
      setStatus('success');
    } catch {
      alert('Network error. Please check your connection and try again.');
    }
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="/ Contact"
        title={<>Let&apos;s <span className="text-gold">talk.</span></>}
        intro="Reach out to the TASA national team or find your nearest branch."
        photo={photos.couple}
        position="50% 30%"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Contact info */}
          <aside className="lg:col-span-4 space-y-10">
            <div>
              <p className="eyebrow text-gray-500 mb-3">Email</p>
              <a href="mailto:info@mytasa.org" className="font-display text-3xl font-semibold hover:text-royal transition">
                info@mytasa.org
              </a>
            </div>

            <div>
              <p className="eyebrow text-gray-500 mb-2">Social</p>
              <ul>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-gray-300 py-3 hover:border-royal transition"
                    >
                      <span>
                        <span className="font-medium">{s.label}</span>{' '}
                        <span className="text-gray-500 text-sm">{s.handle}</span>
                      </span>
                      <Arrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-royal group-hover:rotate-45 transition" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-gray-500 mb-3">Departments</p>
              <ul className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <li key={dept} className="rounded-full bg-white ring-1 ring-ink/10 px-3 py-1.5 text-sm text-gray-700">
                    {dept}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] bg-ink text-white p-6">
              <h3 className="font-display text-xl font-bold mb-2">Find your branch</h3>
              <p className="text-white/65 text-sm">
                For branch-specific enquiries, contact your Provincial or Branch Executive Committee directly.
              </p>
            </div>
          </aside>

          {/* Contact form */}
          <div className="lg:col-span-8">
            {status === 'success' ? (
              <div className="rounded-[2rem] bg-white ring-1 ring-ink/5 p-12 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gold grid place-items-center text-3xl mb-5">✉️</div>
                <h2 className="display text-4xl mb-3">Message sent!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for reaching out. A member of the TASA team will get back to you within 2 business days.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({ name: '', email: '', department: '', subject: '', message: '' });
                  }}
                  className="bg-ink text-white px-8 py-3 rounded-full font-bold hover:bg-royal transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="rounded-[2rem] bg-white ring-1 ring-ink/5 p-6 md:p-10">
                <h2 className="display text-3xl md:text-4xl mb-8">Send a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-cross">*</span>
                      </label>
                      <input id="c-name" type="text" name="name" value={form.name} onChange={handleChange} required className="field" placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-cross">*</span>
                      </label>
                      <input id="c-email" type="email" name="email" value={form.email} onChange={handleChange} required className="field" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-dept" className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
                    <select id="c-dept" name="department" value={form.department} onChange={handleChange} className="field">
                      <option value="">Select a department (optional)</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject <span className="text-cross">*</span>
                    </label>
                    <input id="c-subject" type="text" name="subject" value={form.subject} onChange={handleChange} required className="field" placeholder="Brief subject of your message" />
                  </div>

                  <div>
                    <label htmlFor="c-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-cross">*</span>
                    </label>
                    <textarea id="c-message" name="message" value={form.message} onChange={handleChange} required rows={6} className="field resize-none" placeholder="Your message..." />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink text-white pl-7 pr-2 py-2 font-semibold hover:bg-royal transition"
                  >
                    Send message
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-gold text-ink transition-transform group-hover:rotate-45">
                      <Arrow />
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-gray-500">/ FAQ</p>
            <h2 className="display text-4xl md:text-5xl mt-4">Common questions.</h2>
          </div>
          <div className="lg:col-span-8 divide-y divide-gray-300 border-y border-gray-300">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-display text-xl font-semibold">
                  {q}
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-white ring-1 ring-ink/10 shrink-0 transition group-open:rotate-45 group-open:bg-gold">
                    +
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 max-w-2xl">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
