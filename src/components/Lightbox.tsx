import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { IconArrowLeft, IconArrowRight, IconClose } from './Icons'
import { useBodyLock } from '../hooks/useUi'
import './Lightbox.css'

type LightboxProps = {
  open: boolean
  onClose: () => void
  /** Rótulo acessível da caixa de diálogo. */
  label: string
  /** Legenda/título do item atual. */
  caption?: string
  /** Contador no formato "01 / 08". */
  counter?: string
  onPrev?: () => void
  onNext?: () => void
  hasNavigation?: boolean
  /** Habilita navegação por swipe no mobile. */
  swipe?: boolean
  children: ReactNode
}

/** Distância mínima para considerar um swipe intencional. */
const SWIPE_THRESHOLD = 56

/**
 * Visualização ampliada acessível: foco preso na caixa, Escape para fechar,
 * setas do teclado para navegar, swipe no mobile e medidas completas exibidas
 * sem corte (object-fit: contain).
 */
export function Lightbox({
  open,
  onClose,
  label,
  caption,
  counter,
  onPrev,
  onNext,
  hasNavigation = false,
  swipe = false,
  children,
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  useBodyLock(open)

  const goPrev = useCallback(() => onPrev?.(), [onPrev])
  const goNext = useCallback(() => onNext?.(), [onNext])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (hasNavigation && event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
        return
      }
      if (hasNavigation && event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
        return
      }
      if (event.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open, onClose, goPrev, goNext, hasNavigation])

  if (!open) return null

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={label}>
      <button
        type="button"
        className="lightbox__backdrop"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="lightbox__panel"
        onPointerDown={
          swipe
            ? (event) => {
                pointerStart.current = { x: event.clientX, y: event.clientY }
              }
            : undefined
        }
        onPointerUp={
          swipe
            ? (event) => {
                const start = pointerStart.current
                pointerStart.current = null
                if (!start) return
                const dx = event.clientX - start.x
                const dy = event.clientY - start.y
                if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
                if (dx < 0) goNext()
                else goPrev()
              }
            : undefined
        }
      >
        <div className="lightbox__bar">
          <div className="lightbox__meta">
            {caption && <span className="lightbox__caption">{caption}</span>}
            {counter && <span className="lightbox__counter">{counter}</span>}
          </div>

          <button
            ref={closeRef}
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Fechar visualização"
          >
            <IconClose />
          </button>
        </div>

        <div className="lightbox__body">{children}</div>

        {hasNavigation && (
          <div className="lightbox__nav">
            <button type="button" className="lightbox__arrow" onClick={goPrev} aria-label="Anterior">
              <IconArrowLeft />
            </button>
            <button type="button" className="lightbox__arrow" onClick={goNext} aria-label="Próximo">
              <IconArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
