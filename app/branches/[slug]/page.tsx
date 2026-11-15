import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '../../components/PageHero';
import Arrow from '../../components/Arrow';
import { photos } from '@/lib/gallery';
import { branches, branchesIn, getBranch, officer, officerRoles } from '@/lib/branches';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return { title: 'Branch not found | TASA' };
  return {
    title: `${branch.name} | TASA Branches`,
    description: `Contact the ${branch.name} branch at ${branch.institution}, ${branch.province}: chairperson, secretary and PRO.`,
  };
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
const ICON_PHONE = 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z';
const ICON_MAIL = 'M4 6h16v12H4zM4 7l8 6 8-6';

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const siblings = branchesIn(branch.province).filter((b) => b.slug !== branch.slug);

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={`/ Branches · ${branch.province}`}
        title={branch.name}
        intro={branch.city ? `${branch.institution} — ${branch.city}` : branch.institution}
        photo={photos.groupB}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/#branches" className="hover:text-ink">Branches</Link></li>
            <li aria-hidden="true">/</li>
            <li>{branch.province}</li>
            <li aria-hidden="true">/</li>
            <li className="text-ink font-medium" aria-current="page">{branch.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Branch facts */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-[1.75rem] bg-ink text-white p-7">
              <p className="eyebrow text-gold">Branch details</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-white/50">Institution</dt>
                  <dd className="font-semibold mt-0.5">{branch.institution}</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-white/50">Type</dt>
                    <dd className="font-semibold mt-0.5">{branch.type}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">City</dt>
                    <dd className="font-semibold mt-0.5">{branch.city ?? '—'}</dd>
                  </div>
                </div>
                <div>
                  <dt className="text-white/50">Province</dt>
                  <dd className="font-semibold mt-0.5">{branch.province}</dd>
                </div>
                <div>
                  <dt className="text-white/50">Meetings</dt>
                  <dd className="font-semibold mt-0.5">
                    {branch.meeting
                      ? `${branch.meeting.day}, ${branch.meeting.time} · ${branch.meeting.venue}`
                      : 'Ask the branch secretary for the weekly programme'}
                  </dd>
                </div>
                {branch.email && (
                  <div>
                    <dt className="text-white/50">Branch email</dt>
                    <dd className="mt-0.5">
                      <a href={`mailto:${branch.email}`} className="font-semibold text-gold hover:underline break-all">
                        {branch.email}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-[1.75rem] bg-white ring-1 ring-ink/5 p-7">
              <p className="font-display text-lg font-bold">Can&apos;t reach the branch?</p>
              <p className="text-sm text-gray-600 mt-2">
                The national office can put you in touch with your branch committee.
              </p>
              <Link
                href="/contact"
                className="group mt-5 inline-flex items-center gap-3 rounded-full bg-ink text-white pl-5 pr-1.5 py-1.5 text-sm font-semibold hover:bg-royal transition"
              >
                Contact national office
                <span className="grid place-items-center w-7 h-7 rounded-full bg-gold text-ink transition-transform group-hover:rotate-45">
                  <Arrow className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </aside>

          {/* Officers */}
          <section className="lg:col-span-8" aria-labelledby="committee">
            <p className="eyebrow text-gray-500">/ Branch executive committee</p>
            <h2 id="committee" className="display text-[2.25rem] sm:text-4xl md:text-5xl mt-4">
              Who to contact.
            </h2>

            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {officerRoles.map(({ role, title }, i) => {
                const o = officer(branch, role);
                const hasContact = Boolean(o.phone || o.email);
                return (
                  <li key={role} className="rounded-[1.75rem] bg-white ring-1 ring-ink/5 p-6 flex flex-col">
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-paper font-mono text-sm">
                      0{i + 1}
                    </span>
                    <p className="eyebrow text-royal mt-6">{title}</p>
                    <p className={`font-display text-xl font-bold mt-2 ${o.name ? '' : 'text-gray-400'}`}>
                      {o.name ?? 'To be confirmed'}
                    </p>

                    <div className="mt-5 pt-5 border-t border-gray-200 space-y-2 text-sm flex-1">
                      {o.phone && (
                        <a href={`tel:${o.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2.5 text-gray-700 hover:text-royal">
                          <Icon d={ICON_PHONE} />
                          {o.phone}
                        </a>
                      )}
                      {o.email && (
                        <a href={`mailto:${o.email}`} className="flex items-center gap-2.5 text-gray-700 hover:text-royal break-all">
                          <Icon d={ICON_MAIL} />
                          {o.email}
                        </a>
                      )}
                      {!hasContact && <p className="text-gray-400">Contact details coming soon.</p>}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Other branches in the province */}
            <div className="mt-14">
              <p className="eyebrow text-gray-500">Other branches in {branch.province}</p>
              {siblings.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {siblings.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/branches/${b.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-ink/10 px-4 py-2 text-sm font-medium hover:ring-royal hover:text-royal transition"
                      >
                        {b.name}
                        <Arrow className="w-3 h-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-gray-500">This is the only listed branch in {branch.province} so far.</p>
              )}
              <Link href="/#branches" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-royal hover:underline">
                ← All provinces
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
