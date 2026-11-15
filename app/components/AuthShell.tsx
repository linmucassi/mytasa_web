import Image from 'next/image';
import type { Photo } from '@/lib/gallery';
import { EMBLEM_SRC } from './Logo';

type Props = {
  photo: Photo;
  quote: React.ReactNode;
  caption: string;
  children: React.ReactNode;
};

/** Split-screen layout for login / register: photo panel + form card. */
export default function AuthShell({ photo, quote, caption, children }: Props) {
  return (
    <div className="px-3 md:px-5 pb-6 pt-3">
      <div className="grid lg:grid-cols-2 gap-3 md:gap-4 min-h-[clamp(560px,calc(100svh-7rem),880px)]">
        <div className="relative hidden lg:flex overflow-hidden rounded-[2rem] bg-ink text-white grain">
          <Image src={photo.src} alt={photo.alt} fill preload sizes="50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div className="relative mt-auto p-10 xl:p-14">
            <p className="display text-5xl xl:text-6xl">{quote}</p>
            <p className="eyebrow text-white/60 mt-6">{caption}</p>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-[2rem] bg-white ring-1 ring-ink/5 px-5 py-12 md:p-12">
          <div className="w-full max-w-md">
            <Image src={EMBLEM_SRC} alt="TASA emblem" width={64} height={64} className="w-16 h-16 mb-8" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
