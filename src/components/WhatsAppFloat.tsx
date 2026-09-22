import { useScrolled } from '../hooks/useUi'
import { WHATSAPP_MESSAGES, whatsappUrl } from '../data/site'
import { IconWhatsApp } from './Icons'
import './WhatsAppFloat.css'

/**
 * Atalho fixo para o WhatsApp. Só aparece depois que a pessoa passou da
 * primeira dobra, para não competir com a abertura da página.
 */
export function WhatsAppFloat() {
  const visible = useScrolled(560)

  return (
    <a
      className={`wfloat${visible ? ' is-visible' : ''}`}
      href={whatsappUrl(WHATSAPP_MESSAGES.geral)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Eliarte & Papel pelo WhatsApp"
      tabIndex={visible ? 0 : -1}
    >
      <IconWhatsApp className="wfloat__icon" />
      <span className="wfloat__label">Falar no WhatsApp</span>
    </a>
  )
}
