import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Bike, Heart, RotateCcw, Route } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CrowdCanvas from './ui/CrowdCanvas'
import { calculateImpact, formatNumber, IMPACT_ASSUMPTIONS } from '../lib/impact'

export default function ImpactSection({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const manualRef = useRef(false)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [count, setCount] = useState(1)
  const [manual, setManual] = useState(false)
  const impact = calculateImpact(count)
  const stage = count < 20 ? 0 : count < 70 ? 1 : 2

  useEffect(() => {
    if (reduced) return
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 20%',
      end: 'bottom bottom',
      onUpdate: self => {
        if (!manualRef.current) setCount(Math.max(1, Math.round(self.progress * IMPACT_ASSUMPTIONS.maxBikes)))
      },
    })
    triggerRef.current = trigger
    return () => { trigger.kill(); triggerRef.current = null }
  }, [reduced])

  return <section id="impacto" className="impact-section" ref={sectionRef} aria-labelledby="impact-title">
    <div className="impact-sticky section-shell">
      <div className="section-heading impact-heading">
        <div><span className="eyebrow light"><span /> UM APOIO. MUITAS POSSIBILIDADES.</span>
          <h2 id="impact-title">Um movimento que<br /><em>só cresce.</em></h2></div>
        <p>Começa com uma marca. Continua com uma pessoa.<br className="desktop-break" /> E ganha força a cada nova pedalada.</p>
      </div>
      <div className="impact-playground">
        <div className="playground-top"><span className="live-label"><span /> EXPLORE O IMPACTO DO SEU APOIO</span><span className="simulation-tag">Cenário ilustrativo</span></div>
        <div className="crowd-area">
          <span className="crowd-caption" key={stage}>{['Uma marca acredita.', 'Mais pessoas entram no movimento.', 'Uma comunidade ganha um novo ritmo.'][stage]}</span>
          <CrowdCanvas count={count} reduced={reduced} />
          <span className="brand-seed"><span className="seed-dot" /> SUA MARCA IMPULSIONA</span>
        </div>
        <div className="impact-controls">
          <div className="range-heading"><label htmlFor="bikes-range">E se o seu apoio movimentasse…</label><output htmlFor="bikes-range"><strong>{count}</strong> {count === 1 ? 'pessoa' : 'pessoas'}?</output></div>
          <input id="bikes-range" type="range" min="1" max={IMPACT_ASSUMPTIONS.maxBikes} value={count} aria-describedby="impact-assumptions" style={{ '--range-progress': `${(count - 1) / 119 * 100}%` } as React.CSSProperties} onChange={event => {
            manualRef.current = true; setManual(true); setCount(Number(event.target.value))
          }} />
          <div className="range-labels"><span>1 pessoa</span><span className="range-instruction">Arraste e veja o movimento crescer <span aria-hidden="true">↔</span></span><span>120 pessoas</span></div>
        </div>
        <div className="impact-results" aria-live={manual ? 'polite' : 'off'} aria-atomic="true">
          <div><Bike size={19} /><p><strong data-testid="bikes-result">{formatNumber(impact.bikes)}</strong><span>e-bikes em circulação</span></p></div>
          <div><Route size={19} /><p><strong data-testid="trips-result">{formatNumber(impact.trips)}</strong><span>trajetos por mês</span></p></div>
          <div><Heart size={19} /><p><strong data-testid="hours-result">{formatNumber(impact.activeHours)}<small> h</small></strong><span>de movimento por mês</span></p></div>
        </div>
      </div>
      <div className="impact-footnote"><p id="impact-assumptions">Simulação: 1 pessoa por bike, 22 dias/mês, 2 trajetos e 30 min de pedal por dia. Não representa resultados atuais nem estimativa de alcance publicitário.</p>
        {manual && !reduced ? <button className="text-button light-text" onClick={() => { manualRef.current = false; setManual(false); setCount(Math.max(1, Math.round((triggerRef.current?.progress ?? 0) * 120))) }}><RotateCcw size={14} /> Seguir o scroll</button> : <span className="scroll-hint"><ArrowDown size={14} /> {reduced ? 'Experimente o controle acima' : 'Continue para expandir'}</span>}
      </div>
    </div>
  </section>
}
