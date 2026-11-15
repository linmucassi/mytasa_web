'use client';

import { useState } from 'react';
import Link from 'next/link';
import Arrow from './Arrow';
import { provinces, branchesIn, type Province } from '@/lib/branches';

/** Province accordion: click a province to reveal its branches; each branch links to its contact page. */
export default function ProvinceBranches() {
  const [open, setOpen] = useState<Province | null>(null);

  // Two independent columns so opening one province never leaves a gap beside it
  const half = Math.ceil(provinces.length / 2);
  const columns = [provinces.slice(0, half), provinces.slice(half)];

  return (
    <div className="grid gap-3 md:grid-cols-2 items-start">
      {columns.map((col, c) => (
        <ul key={c} className="space-y-3">
          {col.map((province) => {
        const list = branchesIn(province);
        const isOpen = open === province;
        const panelId = `province-${province.toLowerCase().replace(/[^a-z]+/g, '-')}`;
        return (
          <li
            key={province}
            className={`rounded-[1.25rem] ring-1 transition-colors ${
              isOpen ? 'bg-white/10 ring-gold/50' : 'bg-white/5 ring-white/10 hover:ring-white/25'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : province)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center gap-4 px-5 py-4 text-left"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${list.length ? 'bg-gold' : 'bg-white/25'}`} />
              <span className="flex-1 font-display text-lg md:text-xl font-semibold">{province}</span>
              <span className="eyebrow text-white/50">
                {list.length} {list.length === 1 ? 'branch' : 'branches'}
              </span>
              <span
                className={`grid place-items-center w-8 h-8 rounded-full transition ${
                  isOpen ? 'bg-gold text-ink rotate-180' : 'bg-white/10 text-white'
                }`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {/* Animated drop-down (grid-rows trick) */}
            <div
              id={panelId}
              role="region"
              aria-label={`${province} branches`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-3 pb-3">
                  {list.length ? (
                    <ul className="space-y-1.5">
                      {list.map((b) => (
                        <li key={b.slug}>
                          <Link
                            href={`/branches/${b.slug}`}
                            tabIndex={isOpen ? 0 : -1}
                            className="group flex items-center gap-4 rounded-xl bg-ink/60 px-4 py-3 hover:bg-white hover:text-ink transition"
                          >
                            <span className="flex-1 min-w-0">
                              <span className="block font-semibold">{b.name}</span>
                              <span className="block text-sm text-white/55 group-hover:text-gray-500 truncate">
                                {b.institution}
                                {b.city && ` · ${b.city}`}
                              </span>
                            </span>
                            <span className="eyebrow !text-[0.6rem] text-white/40 group-hover:text-gray-400 hidden sm:block">
                              {b.type}
                            </span>
                            <span className="grid place-items-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-gold group-hover:text-ink group-hover:rotate-45 transition shrink-0">
                              <Arrow className="w-3 h-3" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="rounded-xl bg-ink/60 px-4 py-4 text-sm text-white/60">
                      No branch listed here yet.{' '}
                      <Link href="/contact" tabIndex={isOpen ? 0 : -1} className="text-gold font-semibold hover:underline">
                        Contact the national office
                      </Link>{' '}
                      to find or plant one.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
          })}
        </ul>
      ))}
    </div>
  );
}
