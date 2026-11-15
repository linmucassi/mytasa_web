'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '../components/PageHero';
import Arrow from '../components/Arrow';
import { photos, type Photo } from '@/lib/gallery';

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
  },
];

const categories: EventCategory[] = [
  'All', 'Conference', 'Spiritual', 'Academic', 'Social', 'Sports', 'Outreach',
];

const categoryColors: Record<Exclude<EventCategory, 'All'>, string> = {
  Conference: 'bg-blue-100 text-blue-800',
  Spiritual: 'bg-yellow-100 text-yellow-700',
  Academic: 'bg-emerald-100 text-emerald-800',
  Social: 'bg-orange-100 text-orange-800',
  Sports: 'bg-sky-100 text-sky-800',
  Outreach: 'bg-rose-100 text-rose-800',
};

const categoryPhotos: Record<Exclude<EventCategory, 'All'>, Photo> = {
  Conference: photos.crowdWide,
  Spiritual: photos.praise,
  Academic: photos.presenters,
  Social: photos.dance,
  Sports: photos.crowdDance,
  Outreach: photos.mother,
};

type EventTab = 'all' | 'upcoming' | 'past';

const tabs: { id: EventTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
];

/** An event stays open until the end of its last day (endDate, or date for one-day events). */
function isUpcoming(event: TasaEvent, now = new Date()) {
  const last = new Date(`${event.endDate ?? event.date}T23:59:59`);
  return last >= now;
}

function formatDate(dateStr: string, endDateStr?: string) {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const start = new Date(dateStr).toLocaleDateString('en-ZA', opts);
  if (!endDateStr) return start;
  const end = new Date(endDateStr).toLocaleDateString('en-ZA', opts);
  return `${start} – ${end}`;
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All');
  const [activeTab, setActiveTab] = useState<EventTab>('all');
  const [rsvpEvent, setRsvpEvent] = useState<TasaEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState('');

  const filtered = events
    .filter((e) => {
      const tabMatch =
        activeTab === 'all' || (activeTab === 'upcoming' ? isUpcoming(e) : !isUpcoming(e));
      const catMatch = activeCategory === 'All' || e.category === activeCategory;
      return tabMatch && catMatch;
    })
    // Upcoming first (soonest → latest), then past (most recent → oldest)
    .sort((a, b) => {
      const ua = isUpcoming(a), ub = isUpcoming(b);
      if (ua !== ub) return ua ? -1 : 1;
      return ua ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    });

  async function handleRsvp(e: React.FormEvent) {
    e.preventDefault();
    if (!rsvpEvent) return;
    if (!isUpcoming(rsvpEvent)) {
      setRsvpError('This event has already taken place.');
      return;
    }
    setRsvpLoading(true);
    setRsvpError('');
    try {
      const res = await fetch(`/api/events/${rsvpEvent.id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: rsvpName, email: rsvpEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRsvpError(data.error ?? 'RSVP failed. Please try again.');
        return;
      }
      setRsvpDone(true);
    } catch {
      setRsvpError('Network error. Please try again.');
    } finally {
      setRsvpLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="/ Events"
        title={<>Gather. Worship. <span className="text-gold">Grow.</span></>}
        intro="Conferences, revivals, academic workshops, outreach, sports days and fellowship — all in one place."
        photo={photos.crowdWide}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="inline-flex rounded-full bg-white ring-1 ring-ink/5 p-1 w-fit">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                  activeTab === id ? 'bg-ink text-white' : 'text-gray-600 hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? 'bg-royal text-white'
                    : 'bg-white text-gray-600 ring-1 ring-ink/10 hover:ring-royal hover:text-royal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 px-6 rounded-[2rem] bg-white ring-1 ring-ink/5">
            <p className="font-display text-2xl font-semibold">
              {activeCategory !== 'All'
                ? 'No events found for this filter.'
                : activeTab === 'upcoming'
                  ? 'No upcoming events right now.'
                  : activeTab === 'past'
                    ? 'No past events yet.'
                    : 'No events yet.'}
            </p>
            {activeTab === 'upcoming' && activeCategory === 'All' && (
              <p className="text-gray-500 mt-2">New events are announced soon — subscribe to the newsletter to hear first.</p>
            )}
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              {activeCategory !== 'All' && (
                <button onClick={() => setActiveCategory('All')} className="text-royal font-semibold hover:underline">
                  Clear filter
                </button>
              )}
              {activeTab === 'upcoming' && (
                <button onClick={() => setActiveTab('past')} className="text-royal font-semibold hover:underline">
                  Browse past events
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((event) => {
              const d = new Date(event.date);
              const photo = categoryPhotos[event.category];
              return (
                <article
                  key={event.id}
                  className="group rounded-[1.75rem] bg-white ring-1 ring-ink/5 p-3 flex flex-col sm:flex-row gap-4 hover:shadow-[0_20px_50px_-20px_rgba(10,14,36,0.3)] transition"
                >
                  <div className="relative sm:w-44 shrink-0 aspect-[16/9] sm:aspect-auto rounded-[1.25rem] overflow-hidden bg-ink">
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 176px, 100vw"
                      className={`object-cover transition duration-700 group-hover:scale-105 ${isUpcoming(event) ? 'opacity-90' : 'opacity-75 grayscale-[60%] group-hover:grayscale-0'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <div className="absolute left-4 bottom-3 text-white leading-none">
                      <span className="display text-5xl block">{d.getDate()}</span>
                      <span className="eyebrow text-gold">
                        {d.toLocaleDateString('en-ZA', { month: 'short' })} {d.getFullYear()}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-2 sm:p-3">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className={`text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${categoryColors[event.category]}`}>
                        {event.category}
                      </span>
                      <span className="eyebrow text-gray-400">{event.province}</span>
                    </div>

                    <h2 className="font-display text-2xl font-bold leading-tight">{event.title}</h2>

                    <dl className="mt-3 text-sm text-gray-500 space-y-1">
                      <div className="flex gap-2"><dt className="font-medium text-gray-700 w-12 shrink-0">Date</dt><dd>{formatDate(event.date, event.endDate)}</dd></div>
                      <div className="flex gap-2"><dt className="font-medium text-gray-700 w-12 shrink-0">Time</dt><dd>{event.time}</dd></div>
                      <div className="flex gap-2"><dt className="font-medium text-gray-700 w-12 shrink-0">Venue</dt><dd>{event.location}</dd></div>
                    </dl>

                    <p className="text-gray-600 text-sm flex-1 mt-4 mb-5">{event.description}</p>

                    {isUpcoming(event) ? (
                      <button
                        onClick={() => {
                          setRsvpEvent(event);
                          setRsvpDone(false);
                          setRsvpName('');
                          setRsvpEmail('');
                          setRsvpError('');
                        }}
                        className="self-start inline-flex items-center gap-3 rounded-full bg-gold text-ink pl-5 pr-1.5 py-1.5 font-semibold text-sm hover:bg-ink hover:text-white transition"
                      >
                        RSVP for this event
                        <span className="grid place-items-center w-7 h-7 rounded-full bg-ink text-gold">
                          <Arrow className="w-3 h-3" />
                        </span>
                      </button>
                    ) : (
                      <span className="self-start rounded-full bg-gray-100 text-gray-500 px-4 py-2 text-sm font-medium">
                        This event has passed — RSVPs closed
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Weekly schedule reminder */}
        <div className="relative overflow-hidden mt-16 rounded-[2rem] bg-royal text-white p-8 md:p-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-gold mb-4">/ Every week</p>
            <h2 className="display text-4xl md:text-5xl">Join our weekly activities.</h2>
            <p className="text-white/75 mt-4 max-w-lg">
              Beyond major events, TASA has a structured weekly programme at your branch. Find your branch and
              connect with your local community.
            </p>
          </div>
          <Link
            href="/#branches"
            className="inline-flex items-center gap-3 rounded-full bg-white text-ink pl-6 pr-2 py-2 font-semibold hover:bg-gold transition w-fit"
          >
            Find a branch near you
            <span className="grid place-items-center w-9 h-9 rounded-full bg-ink text-gold">
              <Arrow />
            </span>
          </Link>
        </div>
      </div>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div
          className="fixed inset-0 bg-ink/70 backdrop-blur-sm flex items-center justify-center z-[70] p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setRsvpEvent(null); }}
        >
          <div className="bg-paper rounded-[2rem] shadow-2xl max-w-md w-full p-8">
            {rsvpDone ? (
              <div className="text-center py-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gold grid place-items-center text-3xl mb-5">🙏</div>
                <h2 className="display text-3xl mb-3">You&apos;re registered!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for RSVPing to <strong>{rsvpEvent.title}</strong>. We look forward to seeing
                  you there.
                </p>
                <button
                  onClick={() => setRsvpEvent(null)}
                  className="bg-ink text-white px-8 py-3 rounded-full font-bold hover:bg-royal transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow text-royal mb-2">RSVP</p>
                <h2 className="font-display text-2xl font-bold leading-tight mb-6">{rsvpEvent.title}</h2>
                {rsvpError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
                    {rsvpError}
                  </div>
                )}
                <form onSubmit={handleRsvp} className="space-y-4">
                  <div>
                    <label htmlFor="rsvp-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      id="rsvp-name"
                      type="text"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      required
                      className="field"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="rsvp-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                      id="rsvp-email"
                      type="email"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      required
                      className="field"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRsvpEvent(null)}
                      className="flex-1 ring-1 ring-ink/15 text-gray-700 py-3 rounded-full font-semibold text-sm hover:bg-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={rsvpLoading}
                      className="flex-1 bg-gold text-ink py-3 rounded-full font-bold text-sm hover:bg-ink hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {rsvpLoading ? 'Submitting…' : 'Confirm RSVP'}
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
