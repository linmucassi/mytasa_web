import Link from 'next/link';
import Image from 'next/image';

export const EMBLEM_SRC = '/assets/logos/web/tasa-emblem.png';

/**
 * TASA wordmark: official emblem + name.
 * On dark panels the emblem sits on a paper disc so the brown chain keeps its contrast.
 */
export default function Logo({ tone = 'dark', onClick }: { tone?: 'dark' | 'light'; onClick?: () => void }) {
  const light = tone === 'light';
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5 group" aria-label="TASA home">
      <span
        className={`relative grid place-items-center w-11 h-11 rounded-full transition-transform duration-500 group-hover:scale-105 ${
          light ? 'bg-paper p-1' : ''
        }`}
      >
        <Image src={EMBLEM_SRC} alt="" width={44} height={44} className="w-full h-full object-contain" />
      </span>
      <span className="leading-none">
        <span className={`block font-display font-extrabold text-xl tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          TASA
        </span>
        <span className={`block eyebrow !text-[0.58rem] mt-0.5 ${light ? 'text-white/60' : 'text-gray-500'}`}>
          Evolution through Christ
        </span>
      </span>
    </Link>
  );
}
