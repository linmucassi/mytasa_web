import Image from 'next/image';
import type { Photo } from '@/lib/gallery';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  photo: Photo;
  position?: string;
};

/** Inset, rounded photographic header used by inner pages. */
export default function PageHero({ eyebrow, title, intro, photo, position = 'center' }: Props) {
  return (
    <div className="px-3 md:px-5 pt-3">
      <header className="relative overflow-hidden rounded-[2rem] bg-ink text-white min-h-[420px] md:min-h-[480px] flex items-end grain">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-60"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pb-12 md:pb-16 pt-32">
          <p className="eyebrow text-gold mb-5">{eyebrow}</p>
          <h1 className="display text-[2.75rem] sm:text-7xl md:text-8xl max-w-4xl">{title}</h1>
          {intro && <p className="mt-6 max-w-xl text-white/75 text-lg leading-relaxed">{intro}</p>}
        </div>
      </header>
    </div>
  );
}
