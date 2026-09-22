import { Reveal } from '../components/Reveal'
import { IconWhatsApp } from '../components/Icons'
import { finalCta } from '../data/cta'
import { WHATSAPP_MESSAGES, whatsappUrl } from '../data/site'
import './FinalCta.css'

export function FinalCta() {
  return (
    <section className="section section--deep fcta" id="contato">
      <div className="container fcta__inner">
        <Reveal className="fcta__head" fx="curtain">
          <p className="eyebrow">{finalCta.eyebrow}</p>
          <h2 className="fcta__title">
            {finalCta.title} <em>{finalCta.titleAccent}</em>
          </h2>
        </Reveal>

        <Reveal delay={100} className="fcta__body">
          <p className="fcta__text">{finalCta.text}</p>
          <a
            className="btn btn--primary"
            href={whatsappUrl(WHATSAPP_MESSAGES.final)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp />
            {finalCta.cta}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
