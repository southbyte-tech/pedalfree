export default function Logo({ compact = false }: { compact?: boolean }) {
  return <span className="logo">
    <svg viewBox="0 0 48 36" fill="none" aria-hidden="true">
      <circle cx="11" cy="25" r="8.5" /><circle cx="37" cy="25" r="8.5" />
      <path d="m11 25 10-18 6 18H11L32 10l5 15M17 7h10m1-5h7l-3 8" />
    </svg>
    {!compact && <span>pedal<span className="logo-light">free</span><span className="logo-dot">↗</span></span>}
  </span>
}
