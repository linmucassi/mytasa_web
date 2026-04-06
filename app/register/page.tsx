'use client';

import { useState } from 'react';
import Link from 'next/link';

const provinces = [
  'Western Cape',
  'Gauteng',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Free State',
  'Northern Cape',
  'International',
];

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    institution: '',
    province: '',
    yearOfStudy: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // TODO: connect to registration backend
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="text-6xl mb-4">🙏</div>
            <h1 className="text-3xl font-bold text-blue-700 mb-3">Welcome to TASA!</h1>
            <p className="text-gray-600 mb-6">
              Thank you, <strong>{form.firstName}</strong>! Your registration has been submitted.
              A confirmation email will be sent to <strong>{form.email}</strong> once our team
              verifies your details.
            </p>
            <Link
              href="/events"
              className="inline-block bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
            >
              Browse Upcoming Events
            </Link>
            <div className="mt-4">
              <Link href="/" className="text-blue-700 text-sm hover:underline">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="w-full max-w-lg">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-4xl font-bold text-blue-700">TASA</div>
            <div className="text-sm text-gray-500 mt-1">Evolution Through Christ</div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                step >= 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              1
            </div>
            <div className="flex-1 h-1 rounded-full bg-gray-200">
              <div
                className={`h-1 rounded-full bg-blue-700 transition-all ${step === 2 ? 'w-full' : 'w-0'}`}
              />
            </div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                step === 2 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              2
            </div>
          </div>

          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Your Account</h1>
              <p className="text-gray-500 text-sm mb-6">Step 1 of 2 — Personal details</p>

              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="+27 81 234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="At least 8 characters"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Repeat your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-3 rounded-full font-bold hover:bg-blue-800 transition"
                >
                  Continue →
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Almost There!</h1>
              <p className="text-gray-500 text-sm mb-6">Step 2 of 2 — Your TASA details</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={form.institution}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g. University of Cape Town"
                  />
                  {errors.institution && (
                    <p className="text-red-500 text-xs mt-1">{errors.institution}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    <option value="">Select your province</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.province && (
                    <p className="text-red-500 text-xs mt-1">{errors.province}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    name="yearOfStudy"
                    value={form.yearOfStudy}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    <option value="">Select year (optional)</option>
                    {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'Alumni'].map(
                      (y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    id="agreeTerms"
                    checked={form.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 accent-blue-700"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                    I agree to TASA&apos;s terms of membership and privacy policy. I confirm that I am a
                    student or recent graduate.
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 text-gray-900 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
                  >
                    Join TASA
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-700 font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
