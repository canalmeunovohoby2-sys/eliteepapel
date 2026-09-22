import { useState } from 'react'
import { LOGO } from '../data/site'
import './Logo.css'

type LogoProps = {
  className?: string
  /** 'light' = sobre fundo escuro */
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * A logo real da Eliarte & Papel nunca é redesenhada, distorcida ou recolorida.
 * Enquanto o arquivo não é enviado, exibimos um wordmark tipográfico provisório —
 * discreto e assumidamente temporário.
 */
export function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps) {
  const [logoFailed, setLogoFailed] = useState(false)
  const showImage = Boolean(LOGO.src) && !logoFailed

  if (showImage) {
    return (
      <span className={['logo', `logo--${variant}`, `logo--${size}`, className].filter(Boolean).join(' ')}>
        <img
          className="logo__img"
          src={LOGO.src}
          alt={LOGO.alt}
          width={LOGO.width}
          height={LOGO.height}
          decoding="async"
          onError={() => setLogoFailed(true)}
        />
      </span>
    )
  }

  return (
    <span className={['logo', `logo--${variant}`, `logo--${size}`, className].filter(Boolean).join(' ')}>
      <span className="logo__mark" aria-hidden="true">
        {LOGO.wordmarkMark}
      </span>
      <span className="logo__name">
        Eliarte <em className="logo__amp">&amp;</em> Papel
      </span>
    </span>
  )
}
