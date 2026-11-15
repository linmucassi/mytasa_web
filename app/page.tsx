import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from './components/NewsletterSignup';
import Reveal from './components/Reveal';
import Marquee from './components/Marquee';
import GallerySlider from './components/GallerySlider';
import ProvinceBranches from './components/ProvinceBranches';
import Arrow from './components/Arrow';
import { EMBLEM_SRC } from './components/Logo';
import { photos, gallerySlides } from '@/lib/gallery';

/* ── Content ─────────────────────────────────────────────── */

const stats = [
  { value: '1993', label: 'Founded by divine revelation' },
  { value: '30+', label: 'Years of student ministry' },
  { value: '9+', label: 'Provinces & international branches' },
  { value: '5', label: 'Developmental focus areas' },
];

const values = [
  { letter: 'C', text: 'Christian Enlightenment & Spiritual Transformation' },
  { letter: 'H', text: 'Human Wellness & Morality' },
  { letter: 'R', text: 'Restoration of Peace and Unity' },
  { letter: 'I', text: 'Intensive Promotion of Education' },
  { letter: 'S', text: 'Sustainable Spiritual Development' },
  { letter: 'T', text: "Thriving in God's Love and Fellowship" },
];

const emblem = [
  { name: 'Gold Chain', meaning: 'Unity, peace and love that binds us together' },
  { name: 'Red Cross', meaning: 'Source of our responsibilities and life' },
  { name: 'Blood', meaning: 'Christian teachings from the Apostles and sacrifices through tithes & offerings' },
  { name: 'Open Hands', meaning: 'Acceptance and appreciation of the teachings' },
];

const pillars = [
  { title: 'Academics', desc: 'Bursaries, study groups and career guidance.', outcome: 'Competitive graduates', photo: photos.presenters2 },
  { title: 'Spirituality', desc: 'Revivals, Bible studies, evangelism, choir and services.', outcome: 'God-loving citizens', photo: photos.praise },
  { title: 'Social (Ubuntu)', desc: 'Interfaith harmony, community outreach and teamwork.', outcome: 'Peace and unity', photo: photos.anniversary },
  { title: 'Health Awareness', desc: 'HIV/AIDS, wellness and substance-abuse education.', outcome: 'A healthy generation', photo: photos.drama },
  { title: 'Economic Empowerment', desc: 'Entrepreneurship, financial mentoring and job support.', outcome: 'National growth', photo: photos.speakerSmile },
];

const week = [
  { day: 'Mon', activity: 'Bible Studies & Cell Groups' },
  { day: 'Tue', activity: 'Worship & Music Practice' },
  { day: 'Wed', activity: 'Church Service' },
  { day: 'Thu', activity: 'Academic & Development Day' },
  { day: 'Fri', activity: 'TASA Social / Fellowship' },
  { day: 'Sat', activity: 'Evangelism & Crusades' },
  { day: 'Sun', activity: 'Church Service' },
];

const reasons = [
  'Spiritual transformation and growth',
  'Academic excellence & study buddies',
  'Lifelong brothers and sisters who guide you',
  'Fun yet fulfilling worship and fellowship',
  'Leadership development for campus and beyond',
];

const structure = [
  { title: 'National Conference', desc: 'The highest decision-making gathering of all branches.' },
  { title: 'National Executive Committee', desc: 'Leads the association between conferences.' },
  { title: 'Provincial Executive Committees', desc: 'Coordinate branches within each province.' },
  { title: 'Branch Executive Committees', desc: 'Run the weekly programme on every campus and school.' },
  { title: 'Members', desc: 'Students — the heartbeat of TASA.' },
];

const resources = [
  { title: 'Devotionals', desc: 'Daily reflections and spiritual growth materials.' },
  { title: 'Academic Support', desc: 'Study guides, career resources and bursary info.' },
  { title: 'Health & Wellness', desc: 'HIV awareness, mental health and wellness guides.' },
];

const posts = [
  { title: 'Building a Uniform TASA Identity', category: 'Leadership', photo: photos.groupC },
  { title: 'Faith & Academics: Finding Balance', category: 'Faith & Spirituality', photo: photos.zimStudent },
  { title: 'Leadership Lessons from the Apostles', category: 'Leadership', photo: photos.leader },
];

/* ── Small building blocks ───────────────────────────────── */

function Label({ n, children, tone = 'dark' }: { n: string; children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === 'light' ? 'text-white/50' : 'text-gray-500'}`}>
      <span className="text-cross">/ {n}</span>
      <span className={`h-px w-8 ${tone === 'light' ? 'bg-white/20' : 'bg-gray-300'}`} />
      {children}
    </p>
  );
}

function CTA({ href, children, variant = 'gold' }: { href: string; children: React.ReactNode; variant?: 'gold' | 'ink' | 'ghost' }) {
  const styles = {
    gold: 'bg-gold text-ink hover:bg-white',
    ink: 'bg-ink text-white hover:bg-royal',
    ghost: 'bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white hover:text-ink',
  }[variant];
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-semibold transition ${styles}`}>
      {children}
      <span className={`grid place-items-center w-9 h-9 rounded-full transition-transform group-hover:rotate-45 ${variant === 'gold' ? 'bg-ink text-gold' : variant === 'ink' ? 'bg-gold text-ink' : 'bg-white text-ink'}`}>
        <Arrow />
      </span>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section id="home" className="px-3 md:px-5">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-ink text-white min-h-[clamp(600px,calc(100svh-6rem),960px)] flex grain">
          <Image
            src={photos.heroCrowd.src}
            alt={photos.heroCrowd.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10 md:pb-14 flex flex-col">
            <div className="flex items-start justify-between">
              <p className="eyebrow text-white/70 max-w-[14rem] leading-relaxed">
                Twelve Apostles&apos; Students Association
              </p>
              <p className="eyebrow text-white/60 text-right leading-relaxed">Est. 1993</p>
            </div>

            <div className="mt-auto pt-24">
              <h1 className="display text-[15vw] sm:text-[12vw] lg:text-[9.5rem]">
                <span className="block">Evolution</span>
                <span className="block">
                  through <span className="text-gold">Christ</span>
                  <span className="text-cross">.</span>
                </span>
              </h1>

              <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="max-w-lg text-lg md:text-xl text-white/80 leading-relaxed">
                    A vibrant community of students growing together in spirit and purpose — rooted in the
                    Twelve Apostles&apos; Church in Christ.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <CTA href="/register">Join TASA now</CTA>
                    <CTA href="/events" variant="ghost">Explore events</CTA>
                  </div>
                </div>

                <Link
                  href="/#gallery"
                  aria-label="Students nationwide, one family in Christ — view the gallery"
                  className="group flex items-center gap-4 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/15 p-2 pr-4 w-fit hover:bg-white/20 hover:ring-gold/60 transition"
                >
                  <div className="flex -space-x-3">
                    {[photos.singing, photos.friends, photos.blueShirt, photos.zimStudent].map((ph) => (
                      <span key={ph.src} className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-ink transition-transform group-hover:-translate-y-0.5">
                        <Image src={ph.src} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-tight">
                    <span className="font-semibold">Students nationwide</span>
                    <br />
                    <span className="text-white/60">one family in Christ</span>
                  </p>
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-white/15 text-white group-hover:bg-gold group-hover:text-ink group-hover:rotate-45 transition">
                    <Arrow className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Marquee ─── */}
      <div className="py-8 md:py-10 text-ink">
        <Marquee items={['Spirituality', 'Academics', 'Ubuntu', 'Health', 'Empowerment', 'Leadership']} />
      </div>

      {/* ─── About ─── */}
      <section id="about" className="scroll-mt-24 px-6 md:px-10 max-w-7xl mx-auto pt-8 pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 items-end">
          <Reveal className="lg:col-span-7">
            <Label n="01">Who we are</Label>
            <h2 className="display text-[2.5rem] sm:text-5xl md:text-7xl mt-6">
              Born on campus.
              <br />
              <span className="text-gray-400">Grown in faith.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={150}>
            <p className="text-lg text-gray-600 leading-relaxed">
              Established by divine revelation in 1993 and officially registered in 1995 at the University of the
              Western Cape. Today TASA is international — in universities, colleges and high schools — open to all
              students with no prejudice of background or affiliation. We serve under the leadership of the Twelve
              Apostles&apos; Church in Christ while being student-driven.
            </p>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="border-t-2 border-ink pt-5">
              <p className="font-display text-5xl md:text-6xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-2 text-sm text-gray-500 max-w-[12rem]">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Vision / Mission / Motto bento */}
        <div className="mt-16 grid gap-4 md:grid-cols-3 md:grid-rows-2 md:h-[640px]">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink text-white md:row-span-2 min-h-[420px]">
            <Image src={photos.whiteGarments.src} alt={photos.whiteGarments.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="eyebrow text-gold mb-3">Vision</p>
              <p className="font-display text-2xl md:text-3xl font-semibold leading-tight">
                To be the Mass Based Christian Association of Choice in Institutions of Higher Learning.
              </p>
              <p className="mt-4 text-white/60 text-sm">Matthew 28:19</p>
            </div>
          </Reveal>

          <Reveal delay={100} className="md:col-span-2 rounded-[2rem] bg-royal text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <svg viewBox="0 0 24 24" className="absolute -right-10 -top-10 w-64 h-64 text-white/10" fill="currentColor" aria-hidden="true">
              <path d="M10 2h4v7h7v4h-7v9h-4v-9H3V9h7z" />
            </svg>
            <p className="eyebrow text-gold">Mission</p>
            <p className="relative font-display text-3xl md:text-4xl font-semibold leading-tight max-w-2xl mt-8">
              Value-adding and comprehensive Spiritual, Social, Economic and Academic development to students and
              communities.
            </p>
          </Reveal>

          <Reveal delay={200} className="rounded-[2rem] bg-gold text-ink p-8 flex flex-col justify-between">
            <p className="eyebrow">Motto</p>
            <div>
              <p className="display text-4xl">Evolution through Christ</p>
              <p className="mt-3 text-ink/70 text-sm">Philippians 4:13</p>
            </div>
          </Reveal>

          <Reveal delay={300} className="relative overflow-hidden rounded-[2rem] min-h-[260px]">
            <Image src={photos.anniversary.src} alt={photos.anniversary.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            <span className="absolute left-5 bottom-5 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold">
              30 years of TASA ✦
            </span>
          </Reveal>
        </div>
      </section>

      {/* ─── CHRIST values (dark) ─── */}
      <section className="px-3 md:px-5">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-ink text-white grain">
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Label n="02" tone="light">Our values</Label>
                <h2 className="display text-[2.5rem] sm:text-5xl md:text-7xl mt-6">
                  Six letters.
                  <br />
                  <span className="text-gold">One name.</span>
                </h2>
                <p className="mt-6 text-white/60 max-w-sm leading-relaxed">
                  Our CHRIST values shape how we study, worship and serve — on campus and beyond.
                </p>
              </Reveal>

              <Reveal delay={150} className="mt-12 relative aspect-[16/9] rounded-[1.75rem] overflow-hidden hidden lg:block">
                <Image src={photos.groupA.src} alt={photos.groupA.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </Reveal>
            </div>

            <ol className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
              {values.map(({ letter, text }, i) => (
                <Reveal as="li" key={letter} delay={i * 80} className="group flex items-center gap-6 md:gap-10 py-5 md:py-6">
                  <span className="display text-6xl md:text-8xl w-16 md:w-24 shrink-0 text-white/15 group-hover:text-gold transition-colors duration-500">
                    {letter}
                  </span>
                  <span className="font-display text-xl md:text-2xl font-medium text-white/85 group-hover:text-white transition">
                    {text}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Emblem */}
          <div className="relative border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20 grid gap-10 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 flex items-center gap-6 md:gap-8">
                <div className="relative shrink-0 w-32 h-32 md:w-44 md:h-44 rounded-full bg-paper p-3 md:p-4 shadow-[0_0_0_10px_rgba(246,244,239,0.06),0_0_0_22px_rgba(246,244,239,0.03)]">
                  <Image src={EMBLEM_SRC} alt="The TASA emblem: a red cross with drops of blood above open hands, encircled by a chain" width={176} height={176} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="eyebrow text-white/50">The meaning of our emblem</p>
                  <p className="font-display text-2xl md:text-3xl font-semibold mt-4">
                    Chain of <span className="text-gold">Unity</span> · Peace · Love
                  </p>
                </div>
              </div>
              <dl className="lg:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {emblem.map((e) => (
                  <div key={e.name} className="flex gap-4">
                    <span className="mt-2 w-2 h-2 rounded-full bg-cross shrink-0" />
                    <div>
                      <dt className="font-semibold">{e.name}</dt>
                      <dd className="text-white/60 text-sm mt-1">{e.meaning}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Developmental focus ─── */}
      <section id="pillars" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal>
            <Label n="03">Developmental focus</Label>
            <h2 className="display text-[2.5rem] sm:text-5xl md:text-7xl mt-6">
              Whole-person
              <br />
              formation.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-gray-600 max-w-sm">
              Five pillars that turn students into graduates who lead — in church, in community and in the economy.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:overflow-visible lg:max-w-7xl lg:mx-auto">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="snap-start shrink-0 w-[78%] sm:w-[45%] lg:w-auto">
              <article className="group h-full rounded-[1.75rem] bg-white ring-1 ring-ink/5 p-3 flex flex-col">
                <div className="relative aspect-[4/5] rounded-[1.25rem] overflow-hidden">
                  <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 1024px) 20vw, 80vw" className="object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700" />
                  <span className="absolute top-3 left-3 eyebrow rounded-full bg-white/90 px-3 py-1.5 text-ink">0{i + 1}</span>
                </div>
                <div className="p-3 pt-5 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 flex-1">{p.desc}</p>
                  <p className="mt-4 text-xs font-semibold text-royal flex items-center gap-2">
                    <Arrow className="w-3 h-3" /> {p.outcome}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Weekly rhythm ─── */}
      <section id="events" className="scroll-mt-24 px-6 md:px-10 max-w-7xl mx-auto pb-20 md:pb-28">
        <div className="rounded-[2rem] bg-white ring-1 ring-ink/5 p-6 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <Label n="04">Weekly rhythm</Label>
              <h2 className="display text-[2.25rem] sm:text-4xl md:text-6xl mt-6">A week with TASA.</h2>
            </div>
            <p className="text-gray-600 max-w-sm">
              Our structured week keeps you spiritually fed, academically sharp, and socially connected.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {week.map(({ day, activity }, i) => {
              const service = activity === 'Church Service';
              return (
                <Reveal as="li" key={day} delay={i * 60} className={`rounded-2xl p-5 flex lg:flex-col justify-between gap-4 min-h-[120px] lg:min-h-[180px] transition hover:-translate-y-1 ${service ? 'bg-royal text-white' : 'bg-paper'}`}>
                  <span className={`display text-3xl ${service ? 'text-gold' : 'text-ink'}`}>{day}</span>
                  <span className={`text-sm leading-snug ${service ? 'text-white/85' : 'text-gray-600'}`}>{activity}</span>
                </Reveal>
              );
            })}
          </ol>

          <div className="mt-10">
            <CTA href="/events" variant="ink">View all upcoming events</CTA>
          </div>
        </div>
      </section>

      {/* ─── Why join (pill mosaic) ─── */}
      <section id="whyjoin" className="px-6 md:px-10 max-w-7xl mx-auto pb-20 md:pb-28 grid gap-14 lg:grid-cols-2 items-center">
        <Reveal className="grid grid-cols-3 gap-3 h-[460px] md:h-[560px]">
          <div className="flex flex-col gap-3">
            <div className="relative flex-[3] rounded-full overflow-hidden bg-gold">
              <Image src={photos.singing.src} alt={photos.singing.alt} fill sizes="200px" className="object-cover" />
            </div>
            <div className="relative flex-[2] rounded-full overflow-hidden">
              <Image src={photos.friends.src} alt={photos.friends.alt} fill sizes="200px" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-10">
            <div className="relative flex-[2] rounded-full overflow-hidden">
              <Image src={photos.whiteSinging.src} alt={photos.whiteSinging.alt} fill sizes="200px" className="object-cover" />
            </div>
            <div className="relative flex-[3] rounded-full overflow-hidden bg-royal">
              <Image src={photos.gpTall.src} alt={photos.gpTall.alt} fill sizes="200px" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative flex-[3] rounded-full overflow-hidden">
              <Image src={photos.cheerTall.src} alt={photos.cheerTall.alt} fill sizes="200px" className="object-cover" />
            </div>
            <div className="relative flex-[2] rounded-full overflow-hidden">
              <Image src={photos.blueShirt.src} alt={photos.blueShirt.alt} fill sizes="200px" className="object-cover" />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Label n="05">Why TASA</Label>
            <h2 className="display text-[2.5rem] sm:text-5xl md:text-7xl mt-6">
              Find your
              <br />
              <span className="text-royal">people.</span>
            </h2>
          </Reveal>
          <ul className="mt-10 border-t border-gray-300">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r} delay={i * 80} className="flex items-center gap-5 border-b border-gray-300 py-4">
                <span className="eyebrow text-gray-400">0{i + 1}</span>
                <span className="text-lg font-medium">{r}</span>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10">
            <CTA href="/register">Join TASA today</CTA>
          </div>
        </div>
      </section>

      {/* ─── Structure ─── */}
      <section id="structure" className="px-6 md:px-10 max-w-7xl mx-auto pb-20 md:pb-28 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Label n="06">How we are organised</Label>
            <h2 className="display text-[2.25rem] sm:text-4xl md:text-6xl mt-6">From conference to campus.</h2>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
              <Image src={photos.elders.src} alt={photos.elders.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold text-ink px-4 py-2 text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-ink" />
              Student-led, church-guided
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ol className="space-y-0">
            {structure.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="group flex gap-5 py-6 border-b border-gray-300 first:pt-0">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-ink text-white font-mono text-sm shrink-0 group-hover:bg-royal transition">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold">{s.title}</h3>
                  <p className="text-gray-600 mt-1">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 text-sm text-gray-500">
            Supported by: Educational Fund Committee · Alumni Committee · Resource Mobilization Committee
          </p>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="scroll-mt-24 px-3 md:px-5 pb-20 md:pb-28">
        <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
          {[
            {
              quote: 'TASA gave me a spiritual family on campus when I felt alone. I graduated with distinction while growing deeper in faith.',
              who: 'Former member',
              where: 'UWC',
              photo: photos.whiteJoy,
              tone: 'bg-gold text-ink',
            },
            {
              quote: 'The leadership training through TASA shaped who I am today as a professional and as a servant of God.',
              who: 'TASA alumni',
              where: 'Gauteng',
              photo: photos.speakerFocus,
              tone: 'bg-royal text-white',
            },
          ].map((t, i) => (
            <Reveal key={t.who} delay={i * 120} className={`relative overflow-hidden rounded-[2rem] ${t.tone} grid sm:grid-cols-[1fr_40%] min-h-[380px]`}>
              <blockquote className="p-8 md:p-10 flex flex-col justify-between">
                <span className="display text-8xl leading-none opacity-30">&ldquo;</span>
                <p className="font-display text-2xl md:text-[1.7rem] font-medium leading-snug">{t.quote}</p>
                <footer className="mt-8 eyebrow opacity-70">
                  — {t.who}, {t.where}
                </footer>
              </blockquote>
              <div className="relative min-h-[240px]">
                <Image src={t.photo.src} alt={t.photo.alt} fill sizes="(min-width: 1024px) 20vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Branches ─── */}
      <section id="branches" className="scroll-mt-24 px-3 md:px-5 pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-ink text-white grain">
          <Image src={photos.groupB.src} alt={photos.groupB.alt} fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              <Reveal>
                <Label n="07" tone="light">Branches</Label>
                <h2 className="display text-[2.5rem] sm:text-5xl md:text-7xl mt-6">
                  There&apos;s a TASA
                  <br />
                  <span className="text-gold">near you.</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-white/70 text-lg max-w-md">
                  With branches in all major provinces and internationally, there is a TASA community on your campus
                  or at your high school — or one waiting to be planted.
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-14">
              <p className="eyebrow text-white/50 mb-4">Choose a province to see its branches</p>
              <ProvinceBranches />
            </Reveal>
            {/* Where TASA meets */}
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              <Reveal className="rounded-[1.5rem] bg-white/5 ring-1 ring-white/10 p-6 md:p-8">
                <p className="eyebrow text-white/50">Tertiary</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-3">Universities &amp; colleges</h3>
                <p className="text-white/65 mt-2">
                  Campus branches run weekly Bible studies, worship, academic days and fellowship.
                </p>
              </Reveal>
              <Reveal delay={100} className="rounded-[1.5rem] bg-gold text-ink p-6 md:p-8">
                <p className="eyebrow text-ink/60">Also in</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-3">TASA in High Schools</h3>
                <p className="text-ink/75 mt-2">
                  TASA is present in high schools too — growing learners in faith and study habits before they reach
                  campus.
                </p>
              </Reveal>
            </div>

            <p className="mt-8 text-sm text-white/40">
              Can&apos;t find your campus or school?{' '}
              <Link href="/contact" className="text-white/70 underline underline-offset-4 hover:text-gold">
                Contact the national office
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section id="gallery" className="scroll-mt-24 px-6 md:px-10 max-w-7xl mx-auto pb-20 md:pb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <Reveal>
            <Label n="08">Gallery</Label>
            <h2 className="display text-[2.5rem] sm:text-5xl md:text-7xl mt-6">
              Moments that
              <br />
              <span className="text-gray-400">move us.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-gray-600 max-w-sm">
              Scenes from the National Conference — worship, word, fellowship and joy. Let it play, or pick any
              photo from the strip below.
            </p>
          </Reveal>
        </div>
        <GallerySlider slides={gallerySlides} />
      </section>

      {/* ─── Resources & Blog ─── */}
      <section id="resources" className="scroll-mt-24 px-6 md:px-10 max-w-7xl mx-auto pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Label n="09">Resources</Label>
              <h2 className="display text-[2.25rem] sm:text-4xl md:text-6xl mt-6">Tools for the journey.</h2>
              <p className="mt-6 text-gray-600">
                Devotionals, Bible study guides, academic support, health awareness and financial literacy — all in one
                place.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
            {resources.map((r, i) => (
              <Reveal key={r.title} delay={i * 100} className="group rounded-[1.75rem] bg-white ring-1 ring-ink/5 p-7 flex flex-col justify-between min-h-[240px] hover:bg-ink hover:text-white transition-colors duration-500">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-paper text-ink group-hover:bg-gold transition font-mono text-sm">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{r.title}</h3>
                  <p className="text-sm text-gray-600 group-hover:text-white/70 mt-2 transition">{r.desc}</p>
                  <p className="eyebrow mt-5 text-gray-400">Coming soon</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div id="blog" className="scroll-mt-24 mt-20">
          <div className="flex items-end justify-between gap-6 mb-8">
            <Reveal>
              <Label n="10">Blog & articles</Label>
              <h2 className="display text-4xl md:text-5xl mt-6">From the community.</h2>
            </Reveal>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.title} delay={i * 100}>
                <article className="group">
                  <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden">
                    <Image src={post.photo.src} alt={post.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition duration-700" />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mt-5 group-hover:text-royal transition">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Full blog platform coming soon.</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Partners ─── */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 border-y border-gray-300 py-8">
          <p className="eyebrow text-gray-500 md:max-w-[12rem] text-center md:text-left">Our family of institutions</p>
          <div className="flex flex-1 flex-wrap items-center justify-center md:justify-around gap-10">
            <div className="flex items-center gap-4">
              <Image src="/assets/logos/web/tacc-mother-church-large.png" alt="Twelve Apostles' Church in Christ" width={60} height={50} className="h-12 w-auto" />
              <span className="leading-tight">
                <span className="block text-sm font-semibold">Twelve Apostles&apos; Church in Christ</span>
                <span className="block text-xs text-gray-500 mt-1">Our mother church</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/assets/logos/web/educational-fund-logo-3-03.png" alt="TACC Educational Fund" width={60} height={60} className="h-14 w-auto" />
              <span className="leading-tight">
                <span className="block text-sm font-semibold">TACC Educational Fund</span>
                <span className="block text-xs text-gray-500 mt-1">Run jointly by TACC &amp; TASA</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}
