'use client';

import { useState } from 'react';

const departments = [
  'General Enquiry',
  'Membership & Registration',
  'Events & Conferences',
  'Branch Support',
  'Donations & Resource Mobilisation',
  'Media & Communications',
  'Prayer Requests',
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to backend / email service
    setStatus('success');
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-3">Contact Us</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Reach out to the TASA national team or find your nearest branch.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Get in Touch</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600 text-sm">info@mytasa.org</p>
                </div>
                <div>
                  <p className="font-semibold">Social Media</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <a
                        href="https://x.com/tasa_int"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-500 transition"
                      >
                        𝕏 @tasa_int
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://instagram.com/tasa_int"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-500 transition"
                      >
                        Instagram @tasa_int
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://facebook.com/nationaltasa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-500 transition"
                      >
                        Facebook @nationaltasa
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">Departments</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {departments.map((dept) => (
                  <li key={dept} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-700 flex-shrink-0" />
                    {dept}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-700 mb-2">Find Your Branch</h3>
              <p className="text-gray-600 text-sm">
                For branch-specific enquiries, contact your Provincial or Branch Executive Committee
                directly.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-5xl mb-4">✉️</div>
                <h2 className="text-2xl font-bold text-blue-700 mb-3">Message Sent!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. A member of the TASA team will get back to you within 2
                  business days.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({ name: '', email: '', department: '', subject: '', message: '' });
                  }}
                  className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Your full name"
                      />
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
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                      <option value="">Select a department (optional)</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 rounded-full font-bold hover:bg-blue-800 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
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
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
