import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { VideoAsset } from '../types'
import { IconPlay } from './Icons'
import './VideoPlayer.css'

type VideoPlayerProps = {
  video: VideoAsset
  /** Legenda editorial exibida abaixo do vídeo. */
  caption?: string
  className?: string
  onDark?: boolean
}

/**
 * Player de vídeo com apresentação autoral: preview, play discreto e
 * controles nativos liberados somente depois que o vídeo começa.
 * O formato do arquivo é sempre respeitado — vertical continua vertical.
 */
export function VideoPlayer({ video, caption, className = '', onDark = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [posterReady, setPosterReady] = useState(false)

  const hasVideo = Boolean(video.src) && !failed
  const hasPoster = posterReady

  /**
   * Sem poster próprio, o próprio vídeo serve de thumbnail: buscamos apenas os
   * metadados e pedimos o primeiro quadro, evitando uma caixa preta vazia.
   */
  const source =
    hasVideo && !hasPoster && video.src ? `${video.src}#t=0.1` : video.src

  /** O poster só entra na composição se o arquivo existir de verdade. */
  useEffect(() => {
    if (!video.poster) {
      setPosterReady(false)
      return
    }
    let active = true
    const probe = new Image()
    probe.onload = () => {
      if (active) setPosterReady(true)
    }
    probe.onerror = () => {
      if (active) setPosterReady(false)
    }
    probe.src = video.poster
    return () => {
      active = false
    }
  }, [video.poster])

  const handlePlay = () => {
    const element = videoRef.current
    setStarted(true)
    element?.play().catch(() => undefined)
  }

  return (
    <figure
      className={['vplayer', onDark ? 'vplayer--dark' : '', className].filter(Boolean).join(' ')}
    >
      <div
        className={`vplayer__frame${onDark ? ' media--on-dark' : ''}`}
        style={{ '--media-ratio': video.ratio } as CSSProperties}
      >
        {hasVideo ? (
          <div className="vplayer__stage">
            <video
              ref={videoRef}
              className="vplayer__video"
              src={source}
              poster={hasPoster ? video.poster : undefined}
              preload={hasPoster ? 'none' : 'metadata'}
              playsInline
              controls={started}
              aria-label={video.alt}
              onError={() => setFailed(true)}
            />

            {!started && (
              <>
                <span className="vplayer__veil" aria-hidden="true" />
                <button
                  type="button"
                  className="vplayer__play"
                  onClick={handlePlay}
                  aria-label={`Reproduzir vídeo: ${video.alt}`}
                >
                  <span className="vplayer__ring" aria-hidden="true">
                    <IconPlay />
                  </span>
                </button>
              </>
            )}
          </div>
        ) : (
          /* Só aparece quando o arquivo ainda não chegou. Sobre um vídeo real
             o fundo fica limpo: o primeiro quadro entra como thumbnail. */
          <div className="media__ph" role="img" aria-label={video.alt}>
            <span className="media__ph-tag">
              <i aria-hidden="true" />
              {video.placeholder ?? 'Vídeo em breve'}
            </span>
          </div>
        )}
      </div>

      {caption && <figcaption className="vplayer__caption">{caption}</figcaption>}
    </figure>
  )
}
