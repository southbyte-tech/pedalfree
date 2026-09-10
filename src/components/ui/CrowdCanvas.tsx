import { useEffect, useRef } from 'react'

const shirts = ['#426354', '#a8b998', '#d4a373', '#dfd9c7', '#78908c', '#d1ee87', '#c28365', '#6e7b55']
const skins = ['#c28e68', '#8b5c42', '#dfb591', '#674432', '#bd8663']
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

function line(ctx: CanvasRenderingContext2D, points: number[], color: string, width: number) {
  ctx.beginPath()
  ctx.moveTo(points[0], points[1])
  for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i], points[i + 1])
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()
}

function cyclist(ctx: CanvasRenderingContext2D, index: number, phase: number) {
  const shirt = shirts[index % shirts.length]
  const skin = skins[index % skins.length]
  // Each figure is painted back to front; the legs are linked to the crank.
  ctx.fillStyle = 'rgba(28,53,42,.09)'
  ctx.beginPath(); ctx.ellipse(0, 17, 30, 5, -.12, 0, Math.PI * 2); ctx.fill()
  for (const x of [-21, 21]) {
    ctx.beginPath(); ctx.ellipse(x, 4, 12, 14, -.2, 0, Math.PI * 2)
    ctx.strokeStyle = '#243c34'; ctx.lineWidth = 2.6; ctx.stroke()
    ctx.beginPath(); ctx.ellipse(x, 4, 9.6, 11.5, -.2, 0, Math.PI * 2)
    ctx.strokeStyle = '#b9b8a4'; ctx.lineWidth = 1; ctx.stroke()
    for (let j = 0; j < 6; j++) {
      const angle = phase + j * Math.PI / 3
      line(ctx, [x, 4, x + Math.cos(angle) * 10, 4 + Math.sin(angle) * 12], '#a1ac9b', .65)
    }
  }
  line(ctx, [-21, 4, -9, -16, 0, 5, -21, 4, 11, -13, 21, 4], '#426958', 3)
  line(ctx, [-12, -19, -3, -19], '#223b33', 3)
  line(ctx, [11, -13, 9, -24, 16, -25], '#223b33', 2)
  line(ctx, [-19, -12, -29, -11], '#243c34', 2)
  const footX = Math.cos(phase) * 6
  const footY = Math.sin(phase) * 6
  line(ctx, [-6, -28, -11, -9, -footX, 1 - footY], '#46524a', 5)
  line(ctx, [-6, -28, 5, -12, footX, 1 + footY], '#283e34', 5)
  line(ctx, [footX - 2, 2 + footY, footX + 5, 2 + footY], '#f3eee0', 3)
  line(ctx, [-6, -28, -2, -46], shirt, 12)
  line(ctx, [-3, -42, 7, -31, 14, -26], skin, 4)
  line(ctx, [-3, -42, 3, -34], shirt, 6)
  ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(0, -55, 6.3, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = index % 3 === 0 ? '#d1ee87' : '#203f34'
  ctx.beginPath(); ctx.ellipse(-1, -59, 7.2, 4.7, .2, 0, Math.PI * 2); ctx.fill()
  line(ctx, [-8, -43, -11, -29], '#203f34', 5)
}

export default function CrowdCanvas({ count, reduced }: { count: number; reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const countRef = useRef(count)

  useEffect(() => { countRef.current = count }, [count])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let width = 900, height = 420, frame = 0, visible = true
    let shown = countRef.current, last = 0, time = 0
    const observer = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    observer.observe(canvas)
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    visibility.observe(canvas)

    const render = (now: number) => {
      frame = requestAnimationFrame(render)
      if (!visible || document.hidden || now - last < 32) return
      const dt = Math.min((now - last) / 1000, .06)
      last = now
      if (!reduced) time += dt
      shown = reduced ? countRef.current : shown + (countRef.current - shown) * Math.min(dt * 6, 1)
      if (Math.abs(shown - countRef.current) < .03) shown = countRef.current
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2, cy = height * .56
      const zoom = Math.min(width / 800, height / 320) * (1.35 - Math.min(shown / 120, 1) * .55)
      const radius = 48 + Math.sqrt(shown) * 29
      for (let i = 0; i < 4; i++) {
        const r = radius * (.38 + i * .23)
        ctx.beginPath(); ctx.ellipse(cx, cy, r * zoom, r * zoom * .38, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(67,105,75,${.1 - i * .016})`; ctx.lineWidth = 1
        ctx.setLineDash(i % 2 ? [3, 8] : []); ctx.stroke(); ctx.setLineDash([])
      }
      const riders = Array.from({ length: Math.ceil(shown) }, (_, index) => {
        const angle = index * GOLDEN_ANGLE
        const spread = index === 0 ? 0 : 24 + Math.sqrt(index) * 30
        return { index, x: Math.cos(angle) * spread, y: Math.sin(angle) * spread * .41 }
      }).sort((a, b) => a.y - b.y)
      riders.forEach(({ index, x, y }) => {
        const alpha = Math.min(1, Math.max(0, shown - index))
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(cx + x * zoom, cy + y * zoom + (1 - alpha) * 16)
        ctx.scale(zoom * .74 * (.4 + alpha * .6), zoom * .74 * (.4 + alpha * .6))
        cyclist(ctx, index, time * 2.1 + index * 1.7)
        ctx.restore()
      })
    }
    frame = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect() }
  }, [reduced])

  return <canvas ref={canvasRef} className="crowd-canvas" role="img" aria-label={`Ilustração de uma comunidade com ${count} pessoas em e-bikes. O grupo cresce conforme o apoio simulado aumenta.`} />
}
