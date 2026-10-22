const partners = {
  unidavi: { label: 'Unidavi', viewBox: '489 163 942 754', height: 1080 },
  cinf: { label: 'CINF — Centro de Inovação Norberto Frahm', viewBox: '67 288 1725 366', height: 1080 },
  unimed: { label: 'Unimed', viewBox: '39 194 1842 413', height: 800 },
  woie: { label: 'Woie', viewBox: '420 352 1080 316', height: 1080 },
}

export default function PartnerLogo({ name }: { name: keyof typeof partners | 'southbyte' }) {
  if (name === 'southbyte') return <span className="partner-logo partner-logo-southbyte"><img src={`${import.meta.env.BASE_URL}images/southbyte-logotipo.svg`} alt="Southbyte" loading="lazy" /></span>
  const partner = partners[name]
  return <span className={`partner-logo partner-logo-${name}`}>
    <svg viewBox={partner.viewBox} role="img" aria-label={partner.label}>
      <image href={`${import.meta.env.BASE_URL}images/${name}.png`} width="1920" height={partner.height} />
    </svg>
  </span>
}
