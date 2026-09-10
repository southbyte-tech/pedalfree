import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Bike, BusFront, Check, ChevronDown, Heart, Leaf, Menu, MoveUpRight, Pause, Play, Sparkles, TrendingUp, Users, X, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ImpactSection from './components/ImpactSection'
import ContactDialog from './components/ContactDialog'
import Logo from './components/ui/Logo'

gsap.registerPlugin(ScrollTrigger, SplitText)

const faqs = [
  ['O que é o PedalFree?', 'É um projeto de mobilidade que conecta marcas e pessoas para facilitar o acesso a bicicletas elétricas no deslocamento diário. A proposta é transformar o caminho para o trabalho em uma oportunidade de movimento, com empresas ajudando a viabilizar essa mudança.'],
  ['Como as marcas participam do modelo?', 'O patrocínio ajuda a viabilizar o acesso às e-bikes e a construção da operação. Em contrapartida, a marca pode estar presente nas bikes, em campanhas e em ativações locais. Formatos, valores, entregas e métricas serão definidos em conjunto na proposta de parceria.'],
  ['As bicicletas serão gratuitas?', 'O modelo de acesso está em construção. Queremos que o apoio das marcas reduza a barreira de custo e torne a e-bike uma alternativa acessível para o dia a dia. Preços, subsídios e condições de uso serão definidos antes da operação.'],
  ['O projeto já está disponível para o público?', 'Estamos reunindo parceiros para desenvolver a ideia e estruturar os próximos passos. Esta página apresenta a proposta e abre a conversa com apoiadores, investidores e patrocinadores. O início da operação e as regiões atendidas ainda serão comunicados.'],
  ['Quem está por trás da iniciativa?', 'A ideia nasceu na Woie, que convidou nosso grupo para desenvolvê-la. Hoje, o projeto conta com o apoio de Unidavi, Cinf e Unimed. Novos parceiros podem contribuir com recursos, conhecimento, estrutura e conexões.'],
]

const campaigns = [
  { tab: 'Um novo caminho', heading: <>Seu próximo<br />ponto pode ser<br /><em>de partida.</em></>, detail: 'Troque a espera por uma nova forma de ir.', tag: 'MENOS ESPERA. MAIS VIDA.' },
  { tab: 'Mais movimento', heading: <>O caminho<br />do trabalho.<br /><em>O seu ritmo.</em></>, detail: 'Uma e-bike. Uma rotina com mais movimento.', tag: 'TODO DIA PODE SER UM RECOMEÇO.' },
  { tab: 'Sua marca presente', heading: <>Sua marca<br />vai junto.<br /><em>A cidade muda.</em></>, detail: 'Apoie uma ideia que leva pessoas mais longe.', tag: 'PRESENÇA QUE FAZ DIFERENÇA.' },
]

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
        gsap.fromTo('.manifesto-word', { color: '#aeb7a9' }, { color: '#173d32', stagger: .12, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 68%', end: 'bottom 62%', scrub: .6 } })
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
          <a href="#projeto" onClick={() => setMenuOpen(false)}>O projeto</a><a href="#impacto" onClick={() => setMenuOpen(false)}>O impacto</a><a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a><a href="#parceiros" onClick={() => setMenuOpen(false)}>Quem pedala junto</a>
          <button className="button button-green mobile-contact" onClick={() => openContact()}>Faça parte <ArrowUpRight size={16} /></button>
        </nav>
        <button className="button button-green nav-cta" onClick={() => openContact()}>Faça parte do movimento <ArrowUpRight size={16} /></button>
        <button className="icon-button menu-toggle" id="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="conteudo">
      <section id="inicio" className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow hero-reveal"><span /> MOBILIDADE QUE MOVE MAIS.</span>
          <h1 id="hero-title" className="hero-title">O futuro<br />vai <em>de bike.</em></h1>
          <p className="hero-description hero-reveal">Sua marca pode transformar o caminho de muita gente. Conectamos apoio, e-bikes e uma vida com mais movimento.</p>
          <div className="hero-actions hero-reveal"><button className="button button-green" onClick={() => openContact()}>Quero impulsionar essa ideia <ArrowUpRight size={18} /></button><a className="text-link" href="#impacto">Explore o impacto <span><ArrowDown size={16} /></span></a></div>
          <div className="hero-signoff hero-reveal"><span className="little-avatars" aria-hidden="true"><Users size={16} /><Bike size={16} /><Heart size={16} /></span><p>Bom para as pessoas.<br /><strong>Bom para a sua marca.</strong></p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
          <span className="visual-coordinate">UM NOVO JEITO DE IR.</span>
          <div className="hero-bike-parallax"><img className="hero-bike" src="/images/ebike-cutout.webp" width="1440" height="960" fetchPriority="high" alt="Conceito de e-bike urbana verde floresta com pneus de faixa bege e bagageiro." /></div>
          <div className="hero-note hero-reveal"><span className="note-icon"><Zap size={21} fill="currentColor" /></span><span>Uma dose extra<br />de <strong>liberdade.</strong></span><MoveUpRight size={16} /></div>
          <div className="bike-label"><span /> ASSISTÊNCIA ELÉTRICA. ENERGIA HUMANA.</div>
          <span className="concept-label">Imagem conceitual</span>
        </div>
        <div className="hero-bottom"><span><Leaf size={16} /> Menos trânsito</span><span><Heart size={16} /> Mais vida ativa</span><span><TrendingUp size={16} /> Marcas com propósito</span><a href="#projeto">ROLE PARA DESCOBRIR <ArrowDown size={14} /></a></div>
      </section>

      <div className="support-strip"><div className="section-shell support-inner"><p>Uma ideia que já tem<br /><strong>gente boa por perto.</strong></p><div className="supporter-names" aria-label="Apoio de Unidavi, Cinf e Unimed"><span className="unidavi-name">UNIDAVI<span>UNIVERSIDADE</span></span><span className="cinf-name">cinf<span>●</span></span><span className="unimed-name">Unimed</span></div><a className="support-link" href="#parceiros">Conheça essa conexão <ArrowUpRight size={16} /></a></div></div>

      <section className="manifesto section-shell" id="projeto" aria-labelledby="manifesto-title">
        <div className="manifesto-side"><span className="eyebrow"><span /> NOSSO PONTO DE PARTIDA</span><span className="asterisk" aria-hidden="true">✳</span></div>
        <div className="manifesto-content"><h2 id="manifesto-title">{'E se o caminho para o trabalho também fosse um caminho para'.split(' ').map((word, i) => <span className="manifesto-word" key={i}>{word} </span>)}<em>viver melhor?</em></h2><div className="manifesto-bottom"><span className="small-index">01 / A IDEIA</span><p>Todos os dias, a mesma espera e o mesmo trânsito. O PedalFree nasce para abrir outra possibilidade: e-bikes acessíveis, viabilizadas por marcas que querem fazer parte de uma mudança real.</p></div></div>
      </section>

      <ImpactSection reduced={reduced} />

      <section className="how-section section-shell" id="como-funciona" aria-labelledby="how-title">
        <div className="section-heading" data-reveal><div><span className="eyebrow"><span /> UM CICLO EM QUE TODO MUNDO GANHA</span><h2 id="how-title">Você apoia.<br /><em>A cidade se move.</em></h2></div><p>A publicidade ajuda a viabilizar a mobilidade.<br />A mobilidade leva sua marca para a vida real.</p></div>
        <div className="how-grid">
          <article className="how-card" data-reveal><div className="step-top"><span>01</span><ArrowUpRight size={20} /></div><div className="how-visual network-visual" aria-hidden="true"><svg viewBox="0 0 320 160"><path d="M40 42H100Q120 42 120 62V80H200Q220 80 220 60V42H280M40 125H100Q120 125 120 105V80M220 80V110Q220 125 240 125H280" /></svg><span className="network-node node-one"><Heart /></span><span className="network-node node-two"><TrendingUp /></span><span className="network-center"><Logo compact /></span><span className="network-node node-three"><Users /></span><span className="network-node node-four"><Leaf /></span></div><h3>Marcas impulsionam</h3><p>Empresas apoiam a estrutura e o acesso às bikes. O investimento ganha presença e propósito no cotidiano.</p><span className="card-tag">APOIO QUE VIABILIZA <Sparkles size={12} /></span></article>
          <article className="how-card" data-reveal><div className="step-top"><span>02</span><ArrowUpRight size={20} /></div><div className="how-visual bike-card-visual" aria-hidden="true"><div className="mini-road" /><Bike size={104} strokeWidth={.85} /><span className="mini-electric"><Zap size={16} fill="currentColor" /></span></div><h3>Pessoas vão mais longe</h3><p>A e-bike vira uma alternativa para ir ao trabalho, com assistência elétrica e mais movimento na rotina.</p><span className="card-tag">UM NOVO JEITO DE IR <ArrowRight size={12} /></span></article>
          <article className="how-card" data-reveal><div className="step-top"><span>03</span><ArrowUpRight size={20} /></div><div className="how-visual ripple-visual" aria-hidden="true"><i /><i /><i /><span><Heart size={34} strokeWidth={1.2} /></span><small className="ripple-label label-a">PESSOAS</small><small className="ripple-label label-b">MARCAS</small><small className="ripple-label label-c">CIDADE</small></div><h3>O impacto circula</h3><p>Sua marca acompanha trajetos reais e ajuda a construir uma cidade com mais escolhas de mobilidade.</p><span className="card-tag">CONEXÃO QUE PERMANECE <Heart size={12} /></span></article>
        </div>
        <div className="model-note"><span className="note-dot" /><p>Estamos construindo o modelo com nossos parceiros. Valores e condições de acesso serão definidos antes da operação.</p></div>
      </section>

      <section className="life-photo" aria-labelledby="life-title"><img src="/images/morning-ride.webp" alt="Cena ilustrativa de duas pessoas com capacete pedalando e-bikes em uma rua arborizada pela manhã." width="1600" height="1067" loading="lazy" /><div className="life-overlay" /><div className="life-content section-shell"><span className="eyebrow light"><span /> A MELHOR PARTE É O CAMINHO</span><h2 id="life-title">O destino é o mesmo.<br /><em>A sua vida, em outro ritmo.</em></h2><span className="life-caption"><Bike size={18} /> MAIS MOVIMENTO CABE NO SEU DIA.</span></div><span className="life-credit">Cenário ilustrativo do projeto</span></section>

      <section className="campaign-section section-shell" aria-labelledby="campaign-title">
        <div className="campaign-copy" data-reveal><span className="eyebrow"><span /> DA ESPERA À PEDALADA</span><h2 id="campaign-title">A mudança começa<br /><em>no ponto de ônibus.</em></h2><p>É ali que queremos encontrar quem faz o mesmo trajeto todos os dias. Com pôsteres e banners que convidam a imaginar uma rotina diferente.</p><p>O valor gasto em passagens. O tempo parado no trânsito. E se tudo isso abrisse espaço para uma vida mais ativa?</p><div className="campaign-selector" role="group" aria-label="Escolher conceito de campanha">{campaigns.map((item, index) => <button key={item.tab} aria-pressed={campaign === index} className={campaign === index ? 'selected' : ''} onClick={() => setCampaign(index)}><span>0{index + 1}</span>{item.tab}<ArrowUpRight size={16} /></button>)}</div><span className="campaign-note">Explore acima os conceitos de campanha.</span></div>
        <div className="bus-scene" data-reveal><div className="bus-stop-sign"><BusFront size={22} /><span>UM NOVO<br />PONTO DE VISTA</span></div><div className="scene-orbit" aria-hidden="true" /><div className="poster-frame"><div className={`campaign-poster poster-${campaign}`} key={campaign}><Logo /><span className="poster-eyebrow">{campaigns[campaign].tag}</span><h3>{campaigns[campaign].heading}</h3><div className="poster-bike"><img src="/images/ebike-cutout.webp" alt="" width="1440" height="960" loading="lazy" /></div><p>{campaigns[campaign].detail}</p><span className="poster-bottom">VEM DE PEDALFREE <ArrowUpRight size={20} /></span></div></div><span className="scene-caption">CONCEITO DE CAMPANHA · MÍDIA URBANA</span></div>
      </section>

      <section className="partners-section" id="parceiros" aria-labelledby="partners-title"><div className="section-shell"><div className="section-heading" data-reveal><div><span className="eyebrow"><span /> NINGUÉM TRANSFORMA UMA CIDADE SOZINHO</span><h2 id="partners-title">Gente que acredita.<br /><em>Gente que faz junto.</em></h2></div><p>Uma ideia da Woie. Um grupo pronto para desenvolver.<br />E parceiros que ajudam esse futuro a sair do papel.</p></div><div className="partner-grid" data-reveal><div className="origin-partner"><span className="partner-type">IDEALIZAÇÃO</span><strong>woie<span>↗</span></strong><p>A ideia começou aqui. A Woie convidou nosso grupo para dar vida ao projeto.</p></div><div className="partner-cell"><span className="partner-type">APOIO</span><strong className="unidavi-name">UNIDAVI<span>UNIVERSIDADE</span></strong></div><div className="partner-cell"><span className="partner-type">APOIO</span><strong className="cinf-name">cinf<span>●</span></strong></div><div className="partner-cell"><span className="partner-type">APOIO</span><strong className="unimed-name">Unimed</strong></div></div><div className="partner-invitation"><span><span className="empty-partner"><span>+</span> SUA MARCA AQUI</span>O próximo capítulo pode ter a sua marca.</span><button className="text-link" onClick={() => openContact('parceiro')}>Vamos construir juntos <ArrowUpRight size={18} /></button></div></div></section>

      <section className="join-section section-shell" id="participe" aria-labelledby="join-title"><div className="section-heading" data-reveal><div><span className="eyebrow"><span /> EXISTE UM LUGAR PARA VOCÊ AQUI</span><h2 id="join-title">Escolha como<br /><em>mover essa ideia.</em></h2></div><p>Recursos, visão de futuro ou vontade de colaborar.<br />Cada contribuição abre um novo caminho.</p></div><div className="join-grid"><article className="join-card featured" data-reveal><span className="join-icon"><Zap size={26} /></span><span className="join-card-type">PARA MARCAS</span><h3>Patrocine<br />o movimento.</h3><p>Transforme presença de marca em uma experiência que acompanha a vida das pessoas.</p><ul><li><Check size={16} /> Marca em movimento nas e-bikes</li><li><Check size={16} /> Campanhas e ativações locais</li><li><Check size={16} /> Associação a uma rotina mais ativa</li></ul><button className="button button-lime" onClick={() => openContact('patrocinador')}>Quero patrocinar <ArrowUpRight size={19} /></button></article><article className="join-card" data-reveal><span className="join-icon"><TrendingUp size={26} /></span><span className="join-card-type">PARA INVESTIDORES</span><h3>Invista em<br />novos caminhos.</h3><p>Participe da construção de um modelo que conecta mobilidade, mídia e impacto positivo.</p><ul><li><Check size={16} /> Conversa sobre o modelo de negócio</li><li><Check size={16} /> Desenvolvimento do projeto</li><li><Check size={16} /> Visão de crescimento em conjunto</li></ul><button className="button button-outline" onClick={() => openContact('investidor')}>Quero conhecer o projeto <ArrowUpRight size={19} /></button></article><article className="join-card" data-reveal><span className="join-icon"><Users size={26} /></span><span className="join-card-type">PARA QUEM QUER SOMAR</span><h3>Conecte talentos.<br />Amplie possibilidades.</h3><p>Traga conhecimento, estrutura ou conexões para ajudar a tirar a ideia do papel.</p><ul><li><Check size={16} /> Parceria técnica ou institucional</li><li><Check size={16} /> Apoio à estrutura e à operação</li><li><Check size={16} /> Conexão com a comunidade</li></ul><button className="button button-outline" onClick={() => openContact('parceiro')}>Quero ser parceiro <ArrowUpRight size={19} /></button></article></div></section>

      <section className="faq-section section-shell" aria-labelledby="faq-title"><div data-reveal><span className="eyebrow"><span /> ANTES DA PRIMEIRA PEDALADA</span><h2 id="faq-title">Boas perguntas.<br /><em>Novos caminhos.</em></h2><p>Entenda a proposta e venha<br />construir as próximas respostas.</p></div><div className="faq-list" data-reveal>{faqs.map(([question, answer], index) => <details key={question}><summary><span className="faq-index">0{index + 1}</span><span>{question}</span><ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>

      <section className="final-cta" aria-labelledby="final-title"><div className="cta-orbits" aria-hidden="true"><span /><span /><span /></div><div className="section-shell final-cta-inner" data-reveal><span className="eyebrow light"><span /> GRANDES MUDANÇAS COMEÇAM COM UM PRIMEIRO PASSO.</span><h2 id="final-title">Ou com a primeira<br /><em>pedalada.</em><span className="cta-arrow" aria-hidden="true">↗</span></h2><div className="final-cta-bottom"><p>O futuro da mobilidade se constrói junto.<br />Vamos colocar a sua marca nesse caminho?</p><button className="button button-lime" onClick={() => openContact()}>Faça parte do PedalFree <ArrowUpRight size={20} /></button></div></div></section>
    </main>

    <footer className="site-footer section-shell"><div className="footer-top"><a href="#inicio" aria-label="PedalFree, voltar ao início"><Logo /></a><p>Marcas que apoiam. Pessoas que pedalam.<br />Cidades que se transformam.</p><a className="back-top" href="#inicio">De volta ao começo <ArrowUpRight size={17} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PedalFree · Um projeto em movimento.</span><span>Idealizado pela <strong>Woie</strong>. Desenvolvido em colaboração.</span><button className="motion-toggle" aria-pressed={reduced} onClick={() => setPaused(!paused)} disabled={systemReduced}>{reduced ? <Play size={12} /> : <Pause size={12} />}{systemReduced ? 'Movimento reduzido' : paused ? 'Ativar animações' : 'Pausar animações'}</button></div></footer>
    {contactRole && <ContactDialog initialRole={contactRole} onClose={closeContact} />}
  </div>
}
