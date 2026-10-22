import { useEffect, useRef, useState } from 'react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

type Photo = { file: string; alt: string; title: string; width: number; height: number }

export default function PhotoViewer({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [zoom, setZoom] = useState(2)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    const dialog = dialogRef.current!
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={dialogRef} className="photo-viewer" aria-labelledby="photo-viewer-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="photo-viewer-toolbar"><h2 id="photo-viewer-title">{photo.title}</h2><div><button type="button" className="icon-button" onClick={() => { setZoom(zoom === 1 ? 2 : 1); if (imageRef.current) imageRef.current.style.transformOrigin = '50% 50%' }} aria-label={zoom === 1 ? 'Ampliar foto' : 'Ver foto inteira'}>{zoom === 1 ? <ZoomIn /> : <ZoomOut />}</button><button type="button" className="icon-button" onClick={onClose} aria-label="Fechar foto" autoFocus><X /></button></div></div>
    <div className="photo-viewer-window" tabIndex={0} aria-label="Área da foto. Mova o mouse ou arraste para explorar. Use as setas do teclado para mover." onPointerMove={event => {
      if (zoom === 1 || (event.pointerType !== 'mouse' && !event.buttons)) return
      const bounds = event.currentTarget.getBoundingClientRect()
      if (imageRef.current) imageRef.current.style.transformOrigin = `${Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100))}% ${Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100))}%`
    }} onPointerDown={event => event.currentTarget.setPointerCapture(event.pointerId)} onKeyDown={event => {
      const directions: Record<string, [number, number]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }
      const delta = directions[event.key]
      if (!delta || !imageRef.current || zoom === 1) return
      event.preventDefault()
      const origin = imageRef.current.style.transformOrigin.split(' ').map(parseFloat)
      imageRef.current.style.transformOrigin = `${Math.max(0, Math.min(100, (Number.isFinite(origin[0]) ? origin[0] : 50) + delta[0]))}% ${Math.max(0, Math.min(100, (Number.isFinite(origin[1]) ? origin[1] : 50) + delta[1]))}%`
    }}>
      <img ref={imageRef} src={`${import.meta.env.BASE_URL}images/${photo.file}`} alt={photo.alt} width={photo.width} height={photo.height} draggable={false} style={{ transform: `scale(${zoom})`, transformOrigin: '50% 50%' }} />
    </div>
    <p className="photo-viewer-hint">{zoom === 1 ? 'Foto inteira · Use o botão de zoom para explorar os detalhes.' : 'Mova o mouse, arraste ou use as setas para explorar os detalhes.'} · Esc para fechar</p>
  </dialog>
}
