import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { IconInstagram, IconWhatsApp } from './Icons'
import { useActiveSection, useBodyLock, useScrolled } from '../hooks/useUi'
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NAV_IDS,
  NAV_ITEMS,
  WHATSAPP_MESSAGES,
  whatsappUrl,
} from '../data/site'
import './Header.css'

export function Header() {
  const scrolled = useScrolled(40)
  const active = useActiveSection(NAV_IDS)
  const [open, setOpen] = useState(false)

  useBodyLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`hdr${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
        <div className="container hdr__inner">
          <a className="hdr__logo" href="#inicio" aria-label="Eliarte & Papel — ir para o início">
            <Logo />
          </a>

          <nav className="hdr__nav" aria-label="Navegação principal">
            <ul className="hdr__list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    className="hdr__link"
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hdr__actions">
            <a
              className="btn btn--primary btn--sm hdr__cta"
              href={whatsappUrl(WHATSAPP_MESSAGES.geral)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp />
              Falar no WhatsApp
            </a>

            <button
              type="button"
              className="hdr__burger"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div id="menu-mobile" className={`mmenu${open ? ' is-open' : ''}`}>
        <nav className="mmenu__nav" aria-label="Navegação principal (mobile)">
          <ul className="mmenu__list">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
                <a className="mmenu__link" href={`#${item.id}`} onClick={() => setOpen(false)}>
                  <span className="mmenu__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mmenu__foot">
          <a
            className="btn btn--primary btn--block"
            href={whatsappUrl(WHATSAPP_MESSAGES.geral)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <IconWhatsApp />
            Falar no WhatsApp
          </a>

          <a
            className="mmenu__social"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <IconInstagram />
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </>
  )
}
