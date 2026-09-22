import { useCallback, useEffect, useRef, useState } from 'react'
import type { WorkItem } from '../types'
import { Media } from './Media'
import { Lightbox } from './Lightbox'
import { IconArrowLeft, IconArrowRight, IconExpand } from './Icons'
import './WorksCarousel.css'

const pad = (value: number) => String(value).padStart(2, '0')

type WorksCarouselProps = {
  items: WorkItem[]
  label: string
}

/**
 * Carrossel editorial dos trabalhos.
 *
 * Organização:
 * - a foto ativa ocupa quase toda a largura, como um palco;
 * - a seguinte aparece apenas como um filete na borda direita, esmaecido por
 *   um degradê — nunca cortada a seco pela borda da tela;
 * - a faixa desliza sempre para a mesma posição, alinhada ao título da seção;
 * - controles em uma única linha: contador à esquerda, setas à direita e um
 *   fio de progresso logo abaixo.
 *
 * Estado real: índice controlado, setas, teclado, swipe nativo (scroll-snap)
 * e clique para ampliar a peça inteira, sem corte.
 *
 * Nenhuma legenda é sobreposta às fotografias.
 */
export function WorksCarousel({ items, label }: WorksCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const padRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)

  const total = items.length
  const current = items[Math.min(index, Math.max(total - 1, 0))]

  const reduceMotion = useCallback(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  /** Alinhamento exato: o slide para sempre na mesma coluna do título. */
  const scrollTo = useCallback(
    (target: number, smooth = true) => {
      const track = trackRef.current
      const slide = track?.children[target] as HTMLElement | undefined
      if (!track || !slide) return
      track.scrollTo({
        left: slide.offsetLeft - padRef.current,
        behavior: smooth && !reduceMotion() ? 'smooth' : 'auto',
      })
    },
    [reduceMotion],
  )

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(target, total - 1))
      setIndex(clamped)
      scrollTo(clamped)
    },
    [scrollTo, total],
  )

  /** Navegação dentro da visualização ampliada, com retorno circular. */
  const stepZoom = useCallback(
    (direction: number) => {
      if (total === 0) return
      const next = (index + direction + total) % total
      setIndex(next)
      scrollTo(next, false)
    },
    [index, scrollTo, total],
  )

  useEffect(() => {
    setIndex(0)
    const track = trackRef.current
    if (track) track.scrollTo({ left: 0, behavior: 'auto' })
  }, [items])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0

    const readPadding = () => {
      padRef.current = Number.parseFloat(window.getComputedStyle(track).paddingLeft) || 0
    }

    const measure = () => {
      frame = 0
      const slides = Array.from(track.children) as HTMLElement[]
      if (slides.length === 0) return
      const anchor = track.scrollLeft + padRef.current + 6
      let best = 0
      let bestDistance = Number.POSITIVE_INFINITY
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - anchor)
        if (distance < bestDistance) {
          bestDistance = distance
          best = i
        }
      })
      setIndex(best)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    const onResize = () => {
      readPadding()
      onScroll()
    }

    readPadding()
    measure()
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [items])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    }
  }

  if (total === 0 || !current) return null

  return (
    <div className="works">
      <div className="works__stage">
        <ul
          ref={trackRef}
          className="works__track"
          tabIndex={0}
          role="group"
          aria-roledescription="carrossel"
          aria-label={label}
          onKeyDown={onKeyDown}
        >
          {items.map((item, i) => (
            <li
              className={`works__slide${i === index ? ' is-active' : ''}`}
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Trabalho ${i + 1} de ${total}`}
            >
              <button
                type="button"
                className="works__open"
                onClick={() => setZoom(true)}
                aria-label={`Ampliar imagem — ${item.image.alt}`}
              >
                <Media
                  image={item.image}
                  ratio={item.image.ratio ?? '3 / 4'}
                  className="works__media"
                  priority={i < 2}
                />
                <span className="works__hint" aria-hidden="true">
                  Ampliar
                </span>
                <span className="works__icon" aria-hidden="true">
                  <IconExpand />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <span className="works__edge works__edge--left" aria-hidden="true" />
        <span className="works__edge works__edge--right" aria-hidden="true" />
      </div>

      <div className="works__bar">
        <span className="works__counter">
          <span aria-live="polite" aria-atomic="true">
            {pad(index + 1)}
          </span>
          <i aria-hidden="true">/</i>
          <span>{pad(total)}</span>
        </span>

        <div className="works__arrows">
          <button
            type="button"
            className="works__arrow"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Trabalho anterior"
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            className="works__arrow"
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            aria-label="Próximo trabalho"
          >
            <IconArrowRight />
          </button>
        </div>
      </div>

      <div className="works__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${(index + 1) / total})` }} />
      </div>

      <Lightbox
        open={zoom && Boolean(current)}
        onClose={() => setZoom(false)}
        label="Visualização ampliada do trabalho"
        counter={`${pad(index + 1)} / ${pad(total)}`}
        hasNavigation={total > 1}
        swipe
        onPrev={() => stepZoom(-1)}
        onNext={() => stepZoom(1)}
      >
        {current?.image.src ? (
          <img src={current.image.src} alt={current.image.alt} draggable={false} />
        ) : (
          <div className="works__ph" role="img" aria-label={current?.image.alt}>
            <span>{current?.image.placeholder ?? 'Foto em breve'}</span>
          </div>
        )}
      </Lightbox>
    </div>
  )
}
