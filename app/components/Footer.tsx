import Link from 'next/link';
import Logo from './Logo';
import Arrow from './Arrow';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Events', href: '/events' },
      { label: 'Gallery', href: '/#gallery' },
      { label: 'Resources', href: '/#resources' },
      { label: 'Blog', href: '/#blog' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join TASA', href: '/register' },
      { label: 'Member Login', href: '/login' },
      { label: 'Testimonials', href: '/#testimonials' },
      { label: 'Find a Branch', href: '/#branches' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socials = [
  { label: 'X', handle: '@tasa_int', href: 'https://x.com/tasa_int' },
  { label: 'Instagram', handle: '@tasa_int', href: 'https://instagram.com/tasa_int' },
  { label: 'Facebook', handle: '@nationaltasa', href: 'https://facebook.com/nationaltasa' },
];

export default function Footer() {
  return (
    <footer className="px-3 md:px-5 pb-3 md:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink text-white grain">
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Logo tone="light" />
              <p className="mt-6 max-w-sm text-white/60 leading-relaxed">
                Twelve Apostles&apos; Students Association — a home for students growing in spirit,
                scholarship and service. Serving under TACC since 1993.
              </p>
              <a
                href="mailto:info@mytasa.org"
                className="mt-8 inline-flex items-center gap-3 font-display text-2xl md:text-3xl font-semibold hover:text-gold transition"
              >
                info@mytasa.org
                <Arrow className="w-5 h-5" />
              </a>
            </div>

            {columns.map((col) => (
              <div key={col.title} className="lg:col-span-2">
                <h4 className="eyebrow text-white/40 mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-white/80 hover:text-gold transition">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-3">
              <h4 className="eyebrow text-white/40 mb-5">Follow</h4>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-white/10 py-3 hover:border-gold transition"
                    >
                      <span>
                        <span className="text-white/90">{s.label}</span>{' '}
                        <span className="text-white/40 text-sm">{s.handle}</span>
                      </span>
                      <Arrow className="w-3.5 h-3.5 text-white/40 group-hover:text-gold group-hover:rotate-45 transition" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col md:flex-row gap-3 justify-between text-sm text-white/40 border-t border-white/10 pt-6">
            <p>&copy; {new Date().getFullYear()} TASA — Twelve Apostles&apos; Students Association.</p>
            <p>Proudly serving under the Twelve Apostles&apos; Church in Christ (TACC).</p>
          </div>

          {/* Giant wordmark */}
          <div aria-hidden="true" className="select-none pointer-events-none mt-6 -mb-[0.18em] leading-none">
            <span className="block display text-[27vw] lg:text-[22rem] text-center bg-gradient-to-b from-white/15 to-white/0 bg-clip-text text-transparent">
              TASA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
