import { Logo } from './Logo'
import { Reveal } from './Reveal'
import { IconInstagram, IconWhatsApp } from './Icons'
import {
  BRAND_TAGLINE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOCATION,
  NAV_ITEMS,
  SITE_NAME,
  WHATSAPP_DISPLAY,
  WHATSAPP_MESSAGES,
  whatsappUrl,
} from '../data/site'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Reveal className="footer__brand" fx="up">
          <Logo variant="light" size="lg" />
          <p className="footer__tagline">{BRAND_TAGLINE}</p>
        </Reveal>

        <div className="footer__cols">
          <Reveal className="footer__col" delay={80}>
            <p className="footer__label">Localização</p>
            <p className="footer__value">{LOCATION.label}</p>
          </Reveal>

          <Reveal className="footer__col" delay={160}>
            <p className="footer__label">Contato</p>
            <a
              className="footer__link"
              href={whatsappUrl(WHATSAPP_MESSAGES.geral)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp />
              {WHATSAPP_DISPLAY}
            </a>
            <a
              className="footer__link"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconInstagram />
              {INSTAGRAM_HANDLE}
            </a>
          </Reveal>

          <Reveal as="nav" className="footer__col" delay={270} aria-label="Navegação do rodapé">
            <p className="footer__label">Navegar</p>
            <ul className="footer__nav">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a className="footer__link footer__link--plain" href={`#${item.id}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {SITE_NAME}. Todos os direitos reservados.
        </p>
        <p>Papelaria personalizada • {LOCATION.label}</p>
      </div>
    </footer>
  )
}
