'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthShell from '../components/AuthShell';
import { photos } from '@/lib/gallery';

const provinces = [
  'Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape',
  'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape', 'International',
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    institution: '', province: '', yearOfStudy: '', agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError('');
  }

  function validateStep1() {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required.';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    return errs;
  }

  function validateStep2() {
    const errs: Record<string, string> = {};
    if (!form.institution.trim()) errs.institution = 'Institution is required.';
    if (!form.province) errs.province = 'Please select a province.';
    if (!form.agreeTerms) errs.agreeTerms = 'You must agree to the terms to register.';
    return errs;
  }

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    setApiError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          phone: form.phone || undefined,
          institution: form.institution,
          province: form.province,
          yearOfStudy: form.yearOfStudy || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? 'Registration failed. Please try again.');
        return;
      }

      router.push('/profile');
      router.refresh();
    } catch {
      setApiError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      photo={photos.anniversary}
      quote={<>Find your <span className="text-gold">people.</span></>}
      caption="Join a family of students across 9 provinces"
    >
          <p className="eyebrow text-royal mb-3">/ Join TASA</p>
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`grid place-items-center w-9 h-9 rounded-full text-sm font-bold transition ${step >= 1 ? 'bg-ink text-white' : 'bg-gray-100 text-gray-500'}`}>1</div>
            <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
              <div className={`h-1 rounded-full bg-gold transition-all duration-500 ${step === 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`grid place-items-center w-9 h-9 rounded-full text-sm font-bold transition ${step === 2 ? 'bg-ink text-white' : 'bg-gray-100 text-gray-500'}`}>2</div>
          </div>

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
              {apiError}
            </div>
          )}

          {step === 1 && (
            <>
              <h1 className="display text-4xl md:text-5xl mb-2">Create your account.</h1>
              <p className="text-gray-500 text-sm mb-6">Step 1 of 2 — Personal details</p>
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-cross">*</span></label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="field" placeholder="First name" />
                    {errors.firstName && <p className="text-cross text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-cross">*</span></label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="field" placeholder="Last name" />
                    {errors.lastName && <p className="text-cross text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-cross">*</span></label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" className="field" placeholder="your@email.com" />
                  {errors.email && <p className="text-cross text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="field" placeholder="+27 81 234 5678" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-cross">*</span></label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" className="field" placeholder="At least 8 characters" />
                  {errors.password && <p className="text-cross text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password <span className="text-cross">*</span></label>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" className="field" placeholder="Repeat your password" />
                  {errors.confirmPassword && <p className="text-cross text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="w-full bg-ink text-white py-3.5 rounded-full font-bold hover:bg-royal transition">Continue →</button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="display text-4xl md:text-5xl mb-2">Almost there.</h1>
              <p className="text-gray-500 text-sm mb-6">Step 2 of 2 — Your TASA details</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">School / Institution <span className="text-cross">*</span></label>
                  <input type="text" name="institution" value={form.institution} onChange={handleChange} className="field" placeholder="e.g. University of Cape Town or your high school" />
                  {errors.institution && <p className="text-cross text-xs mt-1">{errors.institution}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Province <span className="text-cross">*</span></label>
                  <select name="province" value={form.province} onChange={handleChange} className="field">
                    <option value="">Select your province</option>
                    {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.province && <p className="text-cross text-xs mt-1">{errors.province}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Year of Study</label>
                  <select name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange} className="field">
                    <option value="">Select year (optional)</option>
                    {['High School learner', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'Alumni'].map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <input type="checkbox" name="agreeTerms" id="agreeTerms" checked={form.agreeTerms} onChange={handleChange} className="mt-0.5 w-4 h-4 accent-blue-700" />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                    I agree to TASA&apos;s terms of membership and privacy policy. I confirm that I am a student (high school or tertiary) or recent graduate.
                  </label>
                </div>
                {errors.agreeTerms && <p className="text-cross text-xs">{errors.agreeTerms}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 ring-1 ring-ink/15 text-gray-700 py-3 rounded-full font-semibold text-sm hover:bg-paper transition">← Back</button>
                  <button type="submit" disabled={submitting} className="flex-1 bg-gold text-ink py-3 rounded-full font-bold hover:bg-ink hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? 'Creating account…' : 'Join TASA'}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-8 text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-royal font-semibold hover:underline">Sign in</Link>
          </div>
    </AuthShell>
  );
}
