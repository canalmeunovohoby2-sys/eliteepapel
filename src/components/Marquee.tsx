import { useEffect, useRef } from 'react'
import './Marquee.css'

type MarqueeProps = {
  items: string[]
  /** Legenda centralizada acima da faixa. */
  caption?: string
  /** Velocidade normal em px/s. */
  speed?: number
  /** Velocidade com o ponteiro sobre a faixa, em px/s. */
  hoverSpeed?: number
}

/**
 * Faixa de movimento contínuo, da esquerda para a direita.
 *
 * O deslocamento é calculado quadro a quadro (requestAnimationFrame) e escrito
 * direto no DOM: o loop é perfeitamente contínuo, sem saltos, e a velocidade
 * desacelera de forma suave no hover em vez de parar de repente.
 *
 * Com redução de movimento pedida pelo sistema, a faixa não congela: corre em
 * 70% do ritmo configurado. A redução é proporcional de propósito — assim
 * ajustar `speed` muda a velocidade percebida em qualquer máquina.
 *
 * O loop só roda enquanto a faixa está na tela.
 */
export function Marquee({
  items,
  caption,
  speed = 150,
  hoverSpeed = 60,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLUListElement>(null)
  const slowRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group || typeof window === 'undefined') return

    const reduce =
      Boolean(window.matchMedia) &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const baseSpeed = reduce ? speed * 0.7 : speed
    const idleSpeed = reduce ? speed * 0.55 : hoverSpeed

    let cancelled = false
    let frame = 0
    let running = false
    let distance = group.offsetWidth
    let offset = 0
    let current = baseSpeed
    let last = 0

    /** Mantém o deslocamento dentro de um ciclo, para nunca dar salto. */
    const normalize = () => {
      if (distance <= 0) return
      offset = -(((-offset % distance) + distance) % distance)
    }

    const measure = () => {
      distance = group.offsetWidth
      normalize()
    }

    const tick = (now: number) => {
      if (!running) return
      if (!last) last = now
      const delta = Math.min(64, now - last) / 1000
      last = now

      const target = slowRef.current ? idleSpeed : baseSpeed
      current += (target - current) * Math.min(1, delta * 2.4)

      offset += current * delta
      if (distance > 0 && offset >= 0) offset -= distance

      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || cancelled) return
      running = true
      last = 0
      frame = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { rootMargin: '20% 0px 20% 0px' },
    )

    observer.observe(track)
    window.addEventListener('resize', measure)

    // Reajusta quando as fontes terminam de carregar (a largura muda).
    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) measure()
        })
        .catch(() => undefined)
    }

    return () => {
      cancelled = true
      observer.disconnect()
      window.removeEventListener('resize', measure)
      stop()
    }
  }, [items, speed, hoverSpeed])

  return (
    <div className="marquee">
      {caption && <p className="marquee__caption">{caption}</p>}

      <div className="marquee__band">
        <div className="marquee__view">
          <div
            className="marquee__track"
            ref={trackRef}
            onPointerEnter={() => {
              slowRef.current = true
            }}
            onPointerLeave={() => {
              slowRef.current = false
            }}
          >
            <ul className="marquee__group" ref={groupRef}>
              {items.map((item) => (
                <li className="marquee__item" key={item}>
                  {item}
                </li>
              ))}
            </ul>

            <ul className="marquee__group" aria-hidden="true">
              {items.map((item) => (
                <li className="marquee__item" key={`${item}-copia`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
