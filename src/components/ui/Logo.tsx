export default function Logo({ compact = false }: { compact?: boolean }) {
  const base = import.meta.env.BASE_URL
  return <span className={`logo${compact ? ' logo-compact' : ''}`}>
    <svg viewBox={compact ? '130 290 660 560' : '130 235 1600 630'} role="img" aria-label="PedalFree">
      <image className="logo-color" href={`${base}images/logo-color.png`} width="1920" height="1080" />
      <image className="logo-navy" href={`${base}images/logo-navy.png`} width="1920" height="1080" />
      <image className="logo-white" href={`${base}images/logo-white.png`} width="1920" height="1080" />
    </svg>
  </span>
}
