'use client';

import { useState } from 'react';
import Link from 'next/link';

type EventCategory = 'All' | 'Conference' | 'Spiritual' | 'Academic' | 'Social' | 'Sports' | 'Outreach';

interface TasaEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  province: string;
  category: Exclude<EventCategory, 'All'>;
  description: string;
  upcoming: boolean;
}

const events: TasaEvent[] = [
  {
    id: '1',
    title: 'TASA National Conference 2026',
    date: '2026-06-20',
    endDate: '2026-06-23',
    time: '08:00',
    location: 'University of Western Cape, Bellville',
    province: 'Western Cape',
    category: 'Conference',
    description:
      'Our flagship annual gathering bringing together all branches nationwide. Three days of worship, leadership sessions, workshops, and fellowship. All registered TASA members are encouraged to attend.',
    upcoming: true,
  },
  {
    id: '2',
    title: 'Gauteng Youth Revival',
    date: '2026-05-09',
    endDate: '2026-05-10',
    time: '18:00',
    location: 'University of Johannesburg, Auckland Park',
    province: 'Gauteng',
    category: 'Spiritual',
    description:
      'A powerful two-night revival led by the Gauteng Provincial Executive. Guest speakers, worship, and intercession. Open to all students.',
    upcoming: true,
  },
  {
    id: '3',
    title: 'Academic Excellence Workshop',
    date: '2026-04-26',
    time: '09:00',
    location: 'Cape Peninsula University of Technology, Cape Town',
    province: 'Western Cape',
    category: 'Academic',
    description:
      'Study skills, time management, and exam preparation workshop facilitated by academic mentors and TASA alumni. Bursary information session included.',
    upcoming: true,
  },
  {
    id: '4',
    title: 'KZN Branch Sports Day',
    date: '2026-04-18',
    time: '08:30',
    location: 'University of KwaZulu-Natal, Westville Campus',
    province: 'KwaZulu-Natal',
    category: 'Sports',
    description:
      'Friendly inter-branch competition in soccer, netball, and athletics. A day of healthy competition and fellowship for TASA KZN members.',
    upcoming: true,
  },
  {
    id: '5',
    title: 'Community Outreach – Gugulethu',
    date: '2026-04-11',
    time: '08:00',
    location: 'Gugulethu Community Centre, Cape Town',
    province: 'Western Cape',
    category: 'Outreach',
    description:
      'Feeding scheme, health awareness clinics, and evangelism drive in partnership with TACC. Volunteers needed — contact your branch leader.',
    upcoming: true,
  },
  {
    id: '6',
    title: 'Eastern Cape Leadership Summit',
    date: '2026-03-15',
    time: '09:00',
    location: 'Nelson Mandela University, Port Elizabeth',
    province: 'Eastern Cape',
    category: 'Conference',
    description:
      'Leadership training and strategic planning for branch executive committees in the Eastern Cape region.',
    upcoming: false,
  },
  {
    id: '7',
    title: 'Mpumalanga Social & Fellowship Day',
    date: '2026-03-08',
    time: '10:00',
    location: 'University of Mpumalanga, Nelspruit',
    province: 'Mpumalanga',
    category: 'Social',
    description:
      'An afternoon of games, testimonies, music, and food celebrating TASA fellowship in Mpumalanga.',
    upcoming: false,
  },
  {
    id: '8',
    title: 'National Bible Quiz Competition',
    date: '2026-02-22',
    time: '09:00',
    location: 'UNISA Main Campus, Pretoria',
    province: 'Gauteng',
    category: 'Spiritual',
    description:
      'Inter-branch Bible knowledge competition. Teams of three compete on Old and New Testament knowledge.',
    upcoming: false,
  },
];

const categories: EventCategory[] = [
  'All', 'Conference', 'Spiritual', 'Academic', 'Social', 'Sports', 'Outreach',
];

const categoryColors: Record<Exclude<EventCategory, 'All'>, string> = {
  Conference: 'bg-blue-100 text-blue-700',
  Spiritual: 'bg-purple-100 text-purple-700',
  Academic: 'bg-green-100 text-green-700',
  Social: 'bg-yellow-100 text-yellow-700',
  Sports: 'bg-orange-100 text-orange-700',
  Outreach: 'bg-red-100 text-red-700',
};

function formatDate(dateStr: string, endDateStr?: string) {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const start = new Date(dateStr).toLocaleDateString('en-ZA', opts);
  if (!endDateStr) return start;
  const end = new Date(endDateStr).toLocaleDateString('en-ZA', opts);
  return `${start} – ${end}`;
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [rsvpEvent, setRsvpEvent] = useState<TasaEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);

  const filtered = events.filter((e) => {
    const tabMatch = activeTab === 'upcoming' ? e.upcoming : !e.upcoming;
    const catMatch = activeCategory === 'All' || e.category === activeCategory;
    return tabMatch && catMatch;
  });

  function handleRsvp(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to backend
    setRsvpDone(true);
  }

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-3">Events</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Conferences, revivals, academic workshops, outreach, sports days, and fellowship — all in one place.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition ${
              activeTab === 'upcoming'
                ? 'bg-blue-700 text-white'
                : 'text-gray-600 hover:text-blue-700'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition ${
              activeTab === 'past'
                ? 'bg-blue-700 text-white'
                : 'text-gray-600 hover:text-blue-700'
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No events found for this filter.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-blue-700 font-semibold hover:underline"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${
                      categoryColors[event.category]
                    }`}
                  >
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{event.province}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h2>

                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <p>
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    {formatDate(event.date, event.endDate)}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Time:</span> {event.time}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Venue:</span> {event.location}
                  </p>
                </div>

                <p className="text-gray-600 text-sm flex-1 mb-6">{event.description}</p>

                {event.upcoming && (
                  <button
                    onClick={() => {
                      setRsvpEvent(event);
                      setRsvpDone(false);
                      setRsvpName('');
                      setRsvpEmail('');
                    }}
                    className="w-full bg-yellow-500 text-gray-900 py-2.5 rounded-full font-bold text-sm hover:bg-yellow-400 transition"
                  >
                    RSVP for this Event
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Weekly schedule reminder */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Join Our Weekly Activities</h2>
          <p className="text-gray-600 mb-6">
            Beyond major events, TASA has a structured weekly programme at your branch.
            Find your branch and connect with your local community.
          </p>
          <Link
            href="/#branches"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
          >
            Find a Branch Near You
          </Link>
        </div>
      </div>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setRsvpEvent(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            {rsvpDone ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">🙏</div>
                <h2 className="text-2xl font-bold text-blue-700 mb-2">You&apos;re registered!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for RSVPing to <strong>{rsvpEvent.title}</strong>. We look forward to seeing
                  you there.
                </p>
                <button
                  onClick={() => setRsvpEvent(null)}
                  className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-1">RSVP</h2>
                <p className="text-gray-500 text-sm mb-6">{rsvpEvent.title}</p>
                <form onSubmit={handleRsvp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRsvpEvent(null)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-500 text-gray-900 py-2.5 rounded-full font-bold text-sm hover:bg-yellow-400 transition"
                    >
                      Confirm RSVP
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
