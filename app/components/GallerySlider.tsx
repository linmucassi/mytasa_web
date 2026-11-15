'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';

export type Slide = { src: string; alt: string; w: number; h: number; day?: number };

const INTERVAL = 5000;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

/** Photo slideshow: crossfading stage, autoplay, thumbnail strip, day filter and full-screen view. */
export default function GallerySlider({ slides }: { slides: Slide[] }) {
  const days = [...new Set(slides.map((s) => s.day).filter((d): d is number => d !== undefined))].sort();
  const [day, setDay] = useState<number | 'all'>('all');
  const items = day === 'all' ? slides : slides.filter((s) => s.day === day);

  const [index, setIndex] = useState(0);
  // null = no choice yet → autoplay unless the visitor prefers reduced motion
  const [playChoice, setPlayChoice] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const playing = playChoice ?? !reducedMotion;
  const setPlaying = (fn: (p: boolean) => boolean) => setPlayChoice(fn(playing));
  const [hovering, setHovering] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = items.length;
  const current = items[Math.min(index, count - 1)];
  const next = items[(index + 1) % count];

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  // Autoplay (paused while hovering / in full screen)
  useEffect(() => {
    if (!playing || hovering || fullscreen || count < 2) return;
    const t = setTimeout(() => step(1), INTERVAL);
    return () => clearTimeout(t);
  }, [playing, hovering, fullscreen, index, count, step]);

  // Keep the active thumbnail in view — scroll the strip only, never the page
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[index];
    if (!strip || !thumb) return;
    const target = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: 'smooth' });
  }, [index, day]);

  // Full-screen keyboard controls
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [fullscreen, step]);

  if (!current) return null;
  const portrait = current.h > current.w;
  const pad = (n: number) => String(n).padStart(String(count).length, '0');

  return (
    <div>
      {/* Day filter */}
      {days.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {(['all', ...days] as const).map((d) => (
            <button
              key={d}
              onClick={() => {
                setDay(d);
                setIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                day === d ? 'bg-ink text-white' : 'bg-white ring-1 ring-ink/10 text-gray-600 hover:text-ink'
              }`}
            >
              {d === 'all' ? `All photos` : `Conference day ${d}`}
            </button>
          ))}
        </div>
      )}

      {/* Stage */}
      <div
        className="relative overflow-hidden rounded-[2rem] bg-ink aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] select-none"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Conference photo gallery"
      >
        {/* Blurred backdrop for portrait photos */}
        {portrait && (
          <Image key={`bg-${current.src}`} src={current.src} alt="" fill sizes="10vw" className="object-cover scale-110 blur-2xl opacity-60" />
        )}
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className={`${portrait ? 'object-contain' : 'object-cover'} animate-[slide-in_700ms_ease-out]`}
          aria-live="polite"
        />
        {/* Preload the next slide */}
        {next && next !== current && (
          <Image src={next.src} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="opacity-0 pointer-events-none" loading="eager" />
        )}

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/85 to-transparent pointer-events-none" />

        {/* Caption + counter */}
        <div className="absolute left-5 right-5 md:left-8 md:right-8 bottom-5 md:bottom-7 flex items-end justify-between gap-4 text-white">
          <p className="text-sm md:text-base text-white/85 max-w-xl line-clamp-2">{current.alt}</p>
          <p className="font-mono text-sm tabular-nums shrink-0">
            <span className="text-gold">{pad(index + 1)}</span>
            <span className="text-white/50"> / {count}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
            className="grid place-items-center w-11 h-11 rounded-full bg-ink/50 backdrop-blur text-white hover:bg-gold hover:text-ink transition"
          >
            {playing ? (
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M4 3h3v10H4zM9 3h3v10H9z" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M5 3l8 5-8 5z" /></svg>
            )}
          </button>
          <button
            onClick={() => setFullscreen(true)}
            aria-label="View full screen"
            className="grid place-items-center w-11 h-11 rounded-full bg-ink/50 backdrop-blur text-white hover:bg-gold hover:text-ink transition"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-white/90 text-ink shadow-lg hover:bg-gold transition"
        >
          ←
        </button>
        <button
          onClick={() => step(1)}
          aria-label="Next photo"
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-white/90 text-ink shadow-lg hover:bg-gold transition"
        >
          →
        </button>

        {/* Autoplay progress */}
        {playing && !hovering && count > 1 && (
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
            <div key={`${index}-${day}`} className="h-full bg-gold origin-left animate-[progress_5000ms_linear_forwards]" />
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div ref={stripRef} className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]" aria-label="Choose a photo">
        {items.map((s, i) => (
          <button
            key={s.src}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            onClick={() => go(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className={`relative shrink-0 w-24 h-16 md:w-28 md:h-[4.5rem] rounded-xl overflow-hidden transition ${
              i === index ? 'ring-[3px] ring-gold opacity-100' : 'opacity-55 hover:opacity-100'
            }`}
          >
            <Image src={s.src} alt="" fill sizes="112px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Full screen */}
      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFullscreen(false);
          }}
        >
          <div className="relative w-full h-full max-w-6xl">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center px-4 font-mono">
            {pad(index + 1)} / {count}
          </p>
          <button onClick={() => setFullscreen(false)} aria-label="Close" className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20">
            ×
          </button>
          <button onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-xl hover:bg-gold hover:text-ink transition">
            ←
          </button>
          <button onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-xl hover:bg-gold hover:text-ink transition">
            →
          </button>
        </div>
      )}
    </div>
  );
}
