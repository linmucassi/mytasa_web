export default function Arrow({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12L12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
