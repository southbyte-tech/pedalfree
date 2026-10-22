import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Bike, BusFront, Check, ChevronDown, Heart, Leaf, Menu, MoveUpRight, Pause, Play, Sparkles, TrendingUp, Users, X, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ImpactSection from './components/ImpactSection'
import ContactDialog from './components/ContactDialog'
import Logo from './components/ui/Logo'
import PartnerLogo from './components/ui/PartnerLogo'

gsap.registerPlugin(ScrollTrigger, SplitText)

const faqs = [
  ['O que é o PedalFree?', 'O PedalFree é uma empresa de mobilidade que conecta marcas e pessoas para ampliar o acesso a bicicletas elétricas no dia a dia. O patrocínio ajuda a viabilizar esse acesso, enquanto as bicicletas oferecem espaço para a divulgação das marcas.'],
  ['Como as marcas participam do modelo?', 'As empresas podem apoiar a estrutura e o acesso às e-bikes, com possibilidade de divulgação nas bicicletas e em campanhas. Formatos, valores, entregas e métricas serão definidos na proposta de parceria.'],
  ['Como funciona o acesso às bicicletas?', 'O acesso é gratuito para pessoas vinculadas às marcas parceiras, como quem estuda ou trabalha na Unidavi, na Unimed ou na CINF. As bicicletas ficam em pontos e bicicletários definidos na cidade ou na própria empresa contratante, quando houver essa estrutura. As condições de acesso para pessoas sem vínculo com os parceiros ainda não foram definidas.'],
  ['Onde as bicicletas estão disponíveis?', 'Já estão disponíveis 3 bicicletas em Rio do Sul, uma para cada parceiro: na sede da CINF, na sede da Unidavi e no Hospital Regional, no ponto vinculado à Unimed. Neste momento, o PedalFree concentra sua atuação em Rio do Sul e região, para testar a expansão de forma gradual.'],
  ['Quem está por trás do PedalFree?', 'O PedalFree tem origem na Woie, que convidou a Southbyte para desenvolver a empresa. Conta com o apoio de Unidavi, CINF e Unimed. As possibilidades de participação de novos parceiros são discutidas com a equipe.'],
]

const campaigns = [
  { tab: 'Um novo caminho', heading: <>Seu próximo<br />ponto pode ser<br /><em>de partida.</em></>, detail: 'Uma alternativa para os trajetos do dia a dia.', tag: 'MENOS ESPERA. MAIS VIDA.' },
  { tab: 'Mais movimento', heading: <>O caminho<br />do trabalho.<br /><em>O seu ritmo.</em></>, detail: 'Assistência elétrica para uma rotina com mais movimento.', tag: 'TODO DIA PODE SER UM RECOMEÇO.' },
  { tab: 'Sua marca presente', heading: <>Sua marca<br />vai junto.<br /><em>A cidade muda.</em></>, detail: 'Conecte sua marca à mobilidade do dia a dia.', tag: 'PRESENÇA QUE FAZ DIFERENÇA.' },
]

const imagePath = (name: string) => `${import.meta.env.BASE_URL}images/${name}`

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const contactTriggerRef = useRef<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactRole, setContactRole] = useState<string | null>(null)
  const [campaign, setCampaign] = useState(0)
  const [paused, setPaused] = useState(false)
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const reduced = systemReduced || paused

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSystemReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'
    const media = gsap.matchMedia()
    if (reduced) return () => media.revert()
    let disposed = false
    document.fonts.ready.then(() => {
      if (disposed) return
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create('.hero-title', { type: 'words', mask: 'words', wordsClass: 'hero-word' })
        gsap.from(split.words, { yPercent: 110, rotation: 3, opacity: 0, stagger: .085, duration: 1.05, ease: 'power3.out', delay: .1 })
        gsap.from('.hero-reveal', { y: 22, opacity: 0, stagger: .12, duration: .85, delay: .45, ease: 'power2.out' })
        gsap.from('.hero-bike', { x: 65, opacity: 0, duration: 1.4, ease: 'power3.out', delay: .15 })
        gsap.to('.hero-bike-parallax', { y: 70, rotation: -2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
        gsap.to('.hero-orbit', { y: -100, rotation: 15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, { y: 38, opacity: 0, duration: .85, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 91%', once: true } })
        })
        gsap.fromTo('.manifesto-word', { color: '#adb7c1' }, { color: '#022647', stagger: .12, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 68%', end: 'bottom 62%', scrub: .6 } })
        gsap.fromTo('.life-photo img', { yPercent: -7, scale: 1.1 }, { yPercent: 7, scale: 1.04, ease: 'none', scrollTrigger: { trigger: '.life-photo', start: 'top bottom', end: 'bottom top', scrub: 1 } })
        gsap.fromTo('.life-photo', { clipPath: 'inset(0 5% round 24px)' }, { clipPath: 'inset(0 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.life-photo', start: 'top 85%', end: 'top 20%', scrub: 1 } })
        gsap.to('.poster-frame', { y: -24, rotation: -2, ease: 'none', scrollTrigger: { trigger: '.campaign-section', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      }, rootRef)
      ScrollTrigger.refresh()
    })
    return () => { disposed = true; media.revert() }
  }, [reduced])

  const openContact = (role = 'patrocinador') => {
    contactTriggerRef.current = menuOpen ? document.getElementById('menu-toggle') : document.activeElement as HTMLElement
    setMenuOpen(false)
    setContactRole(role)
  }
  const closeContact = () => {
    setContactRole(null)
    requestAnimationFrame(() => contactTriggerRef.current?.focus({ preventScroll: true }))
  }

  return <div ref={rootRef}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand-link" href="#inicio" aria-label="PedalFree, início"><Logo /></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} id="main-navigation" aria-label="Navegação principal">
          <a href="#empresa" onClick={() => setMenuOpen(false)}>A empresa</a><a href="#impacto" onClick={() => setMenuOpen(false)}>O impacto</a><a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a><a href="#parceiros" onClick={() => setMenuOpen(false)}>Quem pedala junto</a>
          <button className="button button-green mobile-contact" onClick={() => openContact()}>Faça parte <ArrowUpRight size={16} /></button>
        </nav>
        <button className="button button-green nav-cta" onClick={() => openContact()}>Faça parte do movimento <ArrowUpRight size={16} /></button>
        <button className="icon-button menu-toggle" id="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="conteudo">
      <section id="inicio" className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">

          <h1 id="hero-title" className="hero-title">O futuro<br />vai <em>de bike.</em></h1>
          <p className="hero-description hero-reveal">Conectamos marcas e pessoas para ampliar o acesso a e-bikes. Empresas apoiam a mobilidade e ganham visibilidade nos trajetos do dia a dia.</p>
          <div className="hero-actions hero-reveal"><button className="button button-green" onClick={() => openContact()}>Quero ser parceiro <ArrowUpRight size={18} /></button><a className="text-link" href="#impacto">Explore o impacto <span><ArrowDown size={16} /></span></a></div>
          <div className="hero-signoff hero-reveal"><span className="little-avatars" aria-hidden="true"><Users size={16} /><Bike size={16} /><Heart size={16} /></span><p>Bom para as pessoas.<br /><strong>Bom para a sua marca.</strong></p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
          <span className="visual-coordinate">UM NOVO JEITO DE IR.</span>
          <div className="hero-bike-parallax"><img className="hero-bike" src={imagePath('bike-woie.svg')} width="1365" height="886" fetchPriority="high" alt="Bicicleta elétrica preta da Woie, com quadro baixo, para-lamas e bagageiro." /></div>
          <div className="hero-note hero-reveal"><span className="note-icon"><Zap size={21} fill="currentColor" /></span><span>Uma dose extra<br />de <strong>liberdade.</strong></span><MoveUpRight size={16} /></div>
          <div className="bike-label"><span /> ASSISTÊNCIA ELÉTRICA. ENERGIA HUMANA.</div>
          <span className="concept-label">Bicicleta Woie</span>
        </div>
        <div className="hero-bottom"><span><Leaf size={16} /> Menos trânsito</span><span><Heart size={16} /> Mais vida ativa</span><span><TrendingUp size={16} /> Marcas com propósito</span><a href="#empresa">ROLE PARA DESCOBRIR <ArrowDown size={14} /></a></div>
      </section>

      <div className="support-strip"><div className="section-shell support-inner"><p>Uma empresa que já tem<br /><strong>gente boa por perto.</strong></p><div className="supporter-names" aria-label="Apoio de Unidavi, Cinf e Unimed"><PartnerLogo name="unidavi" /><PartnerLogo name="cinf" /><PartnerLogo name="unimed" /></div><a className="support-link" href="#parceiros">Conheça essa conexão <ArrowUpRight size={16} /></a></div></div>

      <section className="manifesto section-shell" id="empresa" aria-labelledby="manifesto-title">
        <div className="manifesto-side"><span className="asterisk" aria-hidden="true">✳</span></div>
        <div className="manifesto-content"><h2 id="manifesto-title">{'E se o caminho para o trabalho também fosse um caminho para'.split(' ').map((word, i) => <span className="manifesto-word" key={i}>{word} </span>)}<em>viver melhor?</em></h2><div className="manifesto-bottom"><p>O PedalFree une mobilidade e publicidade: o apoio das marcas ajuda a viabilizar o acesso às e-bikes, e as bicicletas levam a identidade dos patrocinadores pelos trajetos do dia a dia.</p></div></div>
      </section>

      <ImpactSection reduced={reduced} />

      <section className="how-section section-shell" id="como-funciona" aria-labelledby="how-title">
        <div className="section-heading" data-reveal><div><h2 id="how-title">Você apoia.<br /><em>A cidade se move.</em></h2></div><p>A publicidade ajuda a viabilizar a mobilidade.<br />A mobilidade leva sua marca para a vida real.</p></div>
        <div className="how-grid">
          <article className="how-card" data-reveal><div className="step-top"><span>01</span><ArrowUpRight size={20} /></div><div className="how-visual network-visual" aria-hidden="true"><svg viewBox="0 0 320 160"><path d="M40 42H100Q120 42 120 62V80H200Q220 80 220 60V42H280M40 125H100Q120 125 120 105V80M220 80V110Q220 125 240 125H280" /></svg><span className="network-node node-one"><Heart /></span><span className="network-node node-two"><TrendingUp /></span><span className="network-center"><Logo compact /></span><span className="network-node node-three"><Users /></span><span className="network-node node-four"><Leaf /></span></div><h3>Marcas impulsionam</h3><p>O patrocínio ajuda a viabilizar a estrutura e o acesso às e-bikes, com espaço para divulgação das marcas nas bicicletas.</p><span className="card-tag">APOIO QUE VIABILIZA <Sparkles size={12} /></span></article>
          <article className="how-card" data-reveal><div className="step-top"><span>02</span><ArrowUpRight size={20} /></div><div className="how-visual bike-card-visual" aria-hidden="true"><div className="mini-road" /><Bike size={104} strokeWidth={.85} /><span className="mini-electric"><Zap size={16} fill="currentColor" /></span></div><h3>Pessoas vão mais longe</h3><p>Pessoas vinculadas aos parceiros têm acesso gratuito às e-bikes nos bicicletários definidos. Uma alternativa com assistência elétrica para os trajetos do dia a dia.</p><span className="card-tag">UM NOVO JEITO DE IR <ArrowRight size={12} /></span></article>
          <article className="how-card" data-reveal><div className="step-top"><span>03</span><ArrowUpRight size={20} /></div><div className="how-visual ripple-visual" aria-hidden="true"><i /><i /><i /><span><Heart size={34} strokeWidth={1.2} /></span><small className="ripple-label label-a">PESSOAS</small><small className="ripple-label label-b">MARCAS</small><small className="ripple-label label-c">CIDADE</small></div><h3>O impacto circula</h3><p>As bicicletas conectam a divulgação das marcas ao deslocamento das pessoas, aproximando publicidade e mobilidade urbana.</p><span className="card-tag">CONEXÃO QUE PERMANECE <Heart size={12} /></span></article>
        </div>
      </section>

      <section className="life-photo" aria-labelledby="life-title"><img src={imagePath('morning-ride.webp')} alt="Cena ilustrativa de duas pessoas com capacete pedalando e-bikes em uma rua arborizada pela manhã." width="1600" height="1067" loading="lazy" /><div className="life-overlay" /><div className="life-content section-shell"><h2 id="life-title">O destino é o mesmo.<br /><em>A sua vida, em outro ritmo.</em></h2><span className="life-caption"><Bike size={18} /> MAIS MOVIMENTO CABE NO SEU DIA.</span></div><span className="life-credit">Cenário ilustrativo do PedalFree</span></section>

      <section className="campaign-section section-shell" aria-labelledby="campaign-title">
        <div className="campaign-copy" data-reveal><h2 id="campaign-title">A mudança começa<br /><em>no ponto de ônibus.</em></h2><p>Os conceitos de campanha abaixo convidam quem faz o mesmo trajeto todos os dias a conhecer outra possibilidade de deslocamento.</p><p>A assistência elétrica acompanha a pedalada. As campanhas destacam esse recurso e a possibilidade de incluir mais movimento na rotina.</p><div className="campaign-selector" role="group" aria-label="Escolher conceito de campanha">{campaigns.map((item, index) => <button key={item.tab} aria-pressed={campaign === index} className={campaign === index ? 'selected' : ''} onClick={() => setCampaign(index)}><span>0{index + 1}</span>{item.tab}<ArrowUpRight size={16} /></button>)}</div><span className="campaign-note">Explore acima os conceitos de campanha.</span></div>
        <div className="bus-scene" data-reveal><div className="bus-stop-sign"><BusFront size={22} /><span>UM NOVO<br />PONTO DE VISTA</span></div><div className="scene-orbit" aria-hidden="true" /><div className="poster-frame"><div className={`campaign-poster poster-${campaign}`} key={campaign}><Logo /><span className="poster-eyebrow">{campaigns[campaign].tag}</span><h3>{campaigns[campaign].heading}</h3><div className="poster-bike"><img src={imagePath('ebike-cutout.webp')} alt="" width="1440" height="960" loading="lazy" /></div><p>{campaigns[campaign].detail}</p><span className="poster-bottom">VEM DE PEDALFREE <ArrowUpRight size={20} /></span></div></div><span className="scene-caption">CONCEITO DE CAMPANHA · MÍDIA URBANA</span></div>
      </section>

      <section className="partners-section" id="parceiros" aria-labelledby="partners-title"><div className="section-shell"><div className="section-heading" data-reveal><div><h2 id="partners-title">Gente que acredita.<br /><em>Gente que faz junto.</em></h2></div><p>Com origem na Woie, desenvolvimento pela Southbyte<br />e apoio de Unidavi, CINF e Unimed.<br />Já são 3 bicicletas disponíveis em Rio do Sul, uma por parceiro.</p></div><div className="partner-grid" data-reveal><div className="origin-partner"><span className="partner-type">IDEALIZAÇÃO</span><PartnerLogo name="woie" /><p>A Woie deu origem ao PedalFree e convidou a Southbyte para desenvolver a empresa.</p></div><div className="partner-cell"><span className="partner-type">DESENVOLVIMENTO</span><PartnerLogo name="southbyte" /></div><div className="partner-cell"><span className="partner-type">APOIO</span><PartnerLogo name="unidavi" /></div><div className="partner-cell"><span className="partner-type">APOIO</span><PartnerLogo name="cinf" /></div><div className="partner-cell"><span className="partner-type">APOIO</span><PartnerLogo name="unimed" /></div></div><div className="partner-invitation"><span><span className="empty-partner"><span>+</span> SUA MARCA AQUI</span>O próximo capítulo pode ter a sua marca.</span><button className="text-link" onClick={() => openContact('parceiro')}>Vamos construir juntos <ArrowUpRight size={18} /></button></div></div></section>

      <section className="join-section section-shell" id="participe" aria-labelledby="join-title"><div className="section-heading" data-reveal><div><h2 id="join-title">Escolha como<br /><em>impulsionar o PedalFree.</em></h2></div><p>Recursos, visão de futuro ou vontade de colaborar.<br />Cada contribuição abre um novo caminho.</p></div><div className="join-grid"><article className="join-card featured" data-reveal><span className="join-icon"><Zap size={26} /></span><span className="join-card-type">PARA MARCAS</span><h3>Patrocine<br />o movimento.</h3><p>Converse sobre patrocínio, presença nas bicicletas e ações de divulgação vinculadas à mobilidade.</p><ul><li><Check size={16} /> Possibilidade de marca nas e-bikes</li><li><Check size={16} /> Formatos de campanha a combinar</li><li><Check size={16} /> Entregas definidas na parceria</li></ul><button className="button button-lime" onClick={() => openContact('patrocinador')}>Quero patrocinar <ArrowUpRight size={19} /></button></article><article className="join-card" data-reveal><span className="join-icon"><TrendingUp size={26} /></span><span className="join-card-type">PARA INVESTIDORES</span><h3>Invista em<br />novos caminhos.</h3><p>Conheça o modelo de negócio e converse sobre possibilidades de investimento no PedalFree.</p><ul><li><Check size={16} /> Modelo de negócio e operação</li><li><Check size={16} /> Possibilidades de investimento</li><li><Check size={16} /> Condições a discutir com a equipe</li></ul><button className="button button-outline" onClick={() => openContact('investidor')}>Quero conhecer a empresa <ArrowUpRight size={19} /></button></article><article className="join-card" data-reveal><span className="join-icon"><Users size={26} /></span><span className="join-card-type">PARA QUEM QUER SOMAR</span><h3>Conecte talentos.<br />Amplie possibilidades.</h3><p>Converse sobre como sua empresa ou instituição pode contribuir com conhecimento, estrutura ou conexões.</p><ul><li><Check size={16} /> Parceria técnica ou institucional</li><li><Check size={16} /> Apoio à estrutura e à operação</li><li><Check size={16} /> Conexão com a comunidade</li></ul><button className="button button-outline" onClick={() => openContact('parceiro')}>Quero ser parceiro <ArrowUpRight size={19} /></button></article></div></section>

      <section className="faq-section section-shell" aria-labelledby="faq-title"><div data-reveal><h2 id="faq-title">Boas perguntas.<br /><em>Novos caminhos.</em></h2><p>Saiba quem pode usar,<br />onde encontrar e como funciona.</p></div><div className="faq-list" data-reveal>{faqs.map(([question, answer], index) => <details key={question}><summary><span className="faq-index">0{index + 1}</span><span>{question}</span><ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>

      <section className="final-cta" aria-labelledby="final-title"><div className="cta-orbits" aria-hidden="true"><span /><span /><span /></div><div className="section-shell final-cta-inner" data-reveal><h2 id="final-title">Com a primeira<br /><em>pedalada.</em><span className="cta-arrow" aria-hidden="true">↗</span></h2><div className="final-cta-bottom"><p>O futuro da mobilidade se constrói junto.<br />Vamos colocar a sua marca nesse caminho?</p><button className="button button-lime" onClick={() => openContact()}>Faça parte do PedalFree <ArrowUpRight size={20} /></button></div></div></section>
    </main>

    <footer className="site-footer section-shell"><div className="footer-top"><a href="#inicio" aria-label="PedalFree, voltar ao início"><Logo /></a><p>Sua marca em movimento</p><a className="back-top" href="#inicio">De volta ao começo <ArrowUpRight size={17} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PedalFree · Uma empresa em movimento.</span><span>Idealizado pela <strong>Woie</strong>. Desenvolvido pela <strong>Southbyte</strong>.</span><button className="motion-toggle" aria-pressed={reduced} onClick={() => setPaused(!paused)} disabled={systemReduced}>{reduced ? <Play size={12} /> : <Pause size={12} />}{systemReduced ? 'Movimento reduzido' : paused ? 'Ativar animações' : 'Pausar animações'}</button></div></footer>
    {contactRole && <ContactDialog initialRole={contactRole} onClose={closeContact} />}
  </div>
}
