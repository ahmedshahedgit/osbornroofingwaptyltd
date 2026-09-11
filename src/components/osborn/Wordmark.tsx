/**
 * Placeholder typographic wordmark.
 * Swap the inner markup for an <img src={logo} /> once the official
 * Osborn Roofing WA logo file is supplied.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3 select-none">
      <span
        aria-hidden="true"
        className="burgundy-wash grid h-9 w-9 shrink-0 place-items-center border border-brass/40"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M2 13 12 5l10 8" stroke="currentColor" strokeWidth="2" className="text-brass" />
          <path d="M5 13v6h14v-6" stroke="currentColor" strokeWidth="1.2" className="text-bone/70" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display text-[0.95rem] font-extrabold tracking-[0.02em] uppercase">
          Osborn
        </span>
        <span className="text-[0.5rem] font-bold tracking-[0.32em] text-brass uppercase">
          {compact ? "Roofing WA" : "Roofing WA Pty Ltd"}
        </span>
      </span>
    </span>
  );
}
