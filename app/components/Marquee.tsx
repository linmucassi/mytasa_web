type Props = { items: string[]; className?: string };

/** Infinite horizontal ticker. Items are duplicated so the loop is seamless. */
export default function Marquee({ items, className = '' }: Props) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-label={items.join(', ')}>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 display text-4xl md:text-6xl whitespace-nowrap">
            {item}
            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-gold shrink-0" fill="currentColor">
              <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
