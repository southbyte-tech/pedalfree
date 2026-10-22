import { useState } from 'react'
import { ArrowUpRight, MapPin, Maximize2, Instagram } from 'lucide-react'
import PhotoViewer from './PhotoViewer'

const photos = [
  { file: 'pedalfree-tres-bicicletas.webp', alt: 'As três bicicletas elétricas da operação do PedalFree, duas pretas e uma verde, reunidas ao ar livre.', title: 'Três bicicletas. Um movimento.', caption: 'As bicicletas que fazem parte da operação em Rio do Sul.', width: 2000, height: 1500 },
  { file: 'pedalfree-bicicletario-cinf.webp', alt: 'Bicicletas nos suportes verticais do bicicletário identificado como CINF.', title: 'Um ponto de acesso real.', caption: 'Registro do bicicletário na sede da CINF.', width: 1500, height: 2000 },
  { file: 'pedalfree-marcas-na-bicicleta.webp', alt: 'Detalhe de uma bicicleta Woie com as marcas Unimed, CINF e Unidavi aplicadas no painel lateral.', title: 'Sua marca em movimento.', caption: 'As marcas parceiras já acompanham as bicicletas.', width: 2000, height: 1500 },
]

const locations = [
  { partner: 'CINF', location: 'Bicicletário na sede da CINF', instagram: 'https://www.instagram.com/cinfaltovale/', maps: 'https://maps.app.goo.gl/EkurMYEN9LqUjE6y9' },
  { partner: 'Unidavi', location: 'Bicicletário na sede da Unidavi', instagram: 'https://www.instagram.com/universo.unidavi/', maps: 'https://maps.app.goo.gl/UXYdKea5wqF25GnD8' },
  { partner: 'Unimed', location: 'Bicicletário no Hospital Regional', instagram: 'https://www.instagram.com/unimedaltovale/', maps: 'https://maps.app.goo.gl/eaLL9JEK99kofuuY7' },
]

export default function OperationSection({ onContact }: { onContact: () => void }) {
  const [selected, setSelected] = useState(0)
  const [opened, setOpened] = useState(false)
  const photo = photos[selected]
  return <section className="campaign-section operation-section section-shell" aria-labelledby="campaign-title">
    <div className="operation-showcase">
      <div className="operation-copy" data-reveal>
        <div className="operation-heading">
          <h2 id="campaign-title">Sua marca em movimento.<br /><em>Já em Rio do Sul.</em></h2>
        </div>
        <div className="operation-topics" role="group" aria-label="Explorar a operação do PedalFree">
          {photos.map((item, index) => <button type="button" key={item.file} className={selected === index ? 'selected' : ''} aria-pressed={selected === index} aria-controls="operation-photo" onClick={() => setSelected(index)}>
            <span className="operation-topic-number">0{index + 1}</span><span><strong>{item.title}</strong><span>{item.caption}</span></span><ArrowUpRight size={18} aria-hidden="true" />
          </button>)}
        </div>
      </div>
      <figure id="operation-photo" className={`operation-photo operation-photo-${selected}`} data-reveal>
        <button type="button" className="operation-photo-frame" aria-label="Abrir e explorar foto" onClick={() => setOpened(true)}><img key={photo.file} src={`${import.meta.env.BASE_URL}images/${photo.file}`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /><span className="operation-photo-open"><Maximize2 size={15} /> Explorar foto</span></button>
      </figure>
    </div>
    <div className="operation-access-row"><p>Três bicicletas elétricas já fazem parte da rotina dos parceiros. O acesso é gratuito para pessoas vinculadas à Unidavi, à Unimed e à CINF.</p><button className="button button-green" onClick={onContact}>Quero ser parceiro <ArrowUpRight size={18} /></button></div>
    <div className="operation-locations" aria-label="Pontos de acesso em Rio do Sul" data-reveal>
      {locations.map(point => <article className="operation-point" key={point.partner}>
        <MapPin size={20} aria-hidden="true" /><div><h3>{point.partner}</h3><p>{point.location}</p><span>1 bicicleta na operação</span><div className="operation-point-links"><a href={point.maps} target="_blank" rel="noopener noreferrer" aria-label={`Ver localização do ponto ${point.partner} no Google Maps`}><MapPin size={14} aria-hidden="true" /> Ver no mapa <ArrowUpRight size={12} aria-hidden="true" /></a><a href={point.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${point.partner}`}><Instagram size={14} aria-hidden="true" /> Instagram <ArrowUpRight size={12} aria-hidden="true" /></a></div></div>
      </article>)}
    </div>
    {opened && <PhotoViewer photo={photo} onClose={() => setOpened(false)} />}
  </section>
}
