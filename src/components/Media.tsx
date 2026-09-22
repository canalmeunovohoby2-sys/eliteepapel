import { useState, type CSSProperties } from 'react'
import type { ImageAsset } from '../types'

type MediaProps = {
  image?: ImageAsset
  className?: string
  ratio?: string
  zoom?: boolean
  priority?: boolean
  placeholderLabel?: string
  showTag?: boolean
  fit?: 'cover' | 'contain'
  onDark?: boolean
}

/**
 * Moldura de mídia da Eliarte & Papel.
 * Enquanto a foto real não chega, o slot exibe um aviso editorial discreto —
 * nunca uma imagem fictícia ou de banco de imagens.
 */
export function Media({
  image,
  className = '',
  ratio,
  zoom = false,
  priority = false,
  placeholderLabel = 'Foto em breve',
  showTag = true,
  fit = 'cover',
  onDark = false,
}: MediaProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(image?.src) && !failed
  const loading = priority ? 'eager' : 'lazy'
  const resolvedRatio = ratio ?? image?.ratio

  return (
    <div
      className={[
        'media',
        zoom ? 'media--zoom' : '',
        fit === 'contain' ? 'media--contain' : '',
        onDark ? 'media--on-dark' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={resolvedRatio ? ({ '--media-ratio': resolvedRatio } as CSSProperties) : undefined}
    >
      {showImage ? (
        <>
          {fit === 'contain' && (
            <img
              className="media__backdrop"
              src={image!.src}
              alt=""
              aria-hidden="true"
              loading={loading}
              decoding="async"
              onError={() => setFailed(true)}
            />
          )}
          <img
            className="media__img"
            src={image!.src}
            alt={image!.alt}
            loading={loading}
            decoding="async"
            fetchPriority={priority ? 'high' : undefined}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <div
          className="media__ph"
          role="img"
          aria-label={image?.alt ?? placeholderLabel}
        >
          {showTag && (
            <span className="media__ph-tag">
              <i aria-hidden="true" />
              {image?.placeholder ?? placeholderLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
