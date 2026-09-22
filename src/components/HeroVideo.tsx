import { useCallback, useEffect, useRef, useState } from 'react'
import type { VideoAsset } from '../types'
import { IconPause, IconPlay } from './Icons'
import './HeroVideo.css'

type HeroVideoProps = {
  video: VideoAsset
}

/** Formata segundos como "0:07". */
function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const min = Math.floor(total / 60)
  const sec = total % 60
  return `${min}:${String(sec).padStart(2, '0')}`
}

/**
 * Vídeo em destaque: toca sozinho, mudo e em loop, sem interface pesada.
 *
 * Controles: pausar/retomar e uma barra de posição arrastável, para voltar e
 * avançar em qualquer ponto. A barra é um <input type="range"> — funciona com
 * mouse, toque e teclado, e leitores de tela a anunciam como controle
 * deslizante, com o tempo atual e o total.
 *
 * Nunca toca com som: `muted` precisa estar no atributo, e não só na
 * propriedade, senão alguns navegadores bloqueiam a reprodução automática.
 */
export function HeroVideo({ video }: HeroVideoProps) {
  const elementRef = useRef<HTMLVideoElement | null>(null)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const hasVideo = Boolean(video.src) && !failed

  /**
   * Marca o vídeo como mudo no momento em que ele entra no DOM — antes de o
   * navegador decidir se libera o autoplay. Como atributo e como propriedade.
   */
  const setRef = useCallback((element: HTMLVideoElement | null) => {
    elementRef.current = element
    if (!element) return
    element.muted = true
    element.defaultMuted = true
    element.setAttribute('muted', '')
  }, [])

  /** Não gasta dados de quem está economizando ou em rede muito lenta. */
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection

    const economizando =
      connection?.saveData === true ||
      (typeof connection?.effectiveType === 'string' &&
        connection.effectiveType.includes('2g'))

    if (economizando) {
      element.pause()
      setPaused(true)
    }
  }, [])

  const toggle = () => {
    const element = elementRef.current
    if (!element) return
    if (element.paused) {
      element.play().catch(() => undefined)
    } else {
      element.pause()
    }
  }

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = elementRef.current
    const value = Number(event.target.value)
    setTime(value)
    if (element) element.currentTime = value
  }

  const progress = duration > 0 ? (time / duration) * 100 : 0

  return (
    <div className="hvideo">
      {hasVideo ? (
        <>
          <video
            ref={setRef}
            className="hvideo__el"
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-label={video.alt}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
            onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
            onLoadedMetadata={(event) => {
              const element = event.currentTarget
              element.muted = true
              setDuration(element.duration || 0)
              setPaused(element.paused)
            }}
            onError={() => setFailed(true)}
          />

          <div className="hvideo__controls">
            <button
              type="button"
              className="hvideo__toggle"
              onClick={toggle}
              aria-label={paused ? 'Reproduzir o vídeo' : 'Pausar o vídeo'}
            >
              {paused ? <IconPlay /> : <IconPause />}
            </button>

            {duration > 0 && (
              <input
                type="range"
                className="hvideo__seek"
                min={0}
                max={duration}
                step="any"
                value={time}
                onChange={seek}
                style={{ '--seek': `${progress}%` } as React.CSSProperties}
                aria-label="Posição do vídeo"
                aria-valuetext={`${formatTime(time)} de ${formatTime(duration)}`}
              />
            )}
          </div>
        </>
      ) : (
        <div className="media__ph" role="img" aria-label={video.alt}>
          <span className="media__ph-tag">
            <i aria-hidden="true" />
            {video.placeholder ?? 'Vídeo em breve'}
          </span>
        </div>
      )}
    </div>
  )
}
