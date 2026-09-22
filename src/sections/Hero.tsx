import { HeroVideo } from '../components/HeroVideo'
import { IconArrowRight, IconWhatsApp } from '../components/Icons'
import { hero } from '../data/hero'
import { WHATSAPP_MESSAGES, whatsappUrl } from '../data/site'
import './Hero.css'

/**
 * Primeira dobra.
 *
 * Entrada em sequência — identificador, headline, texto, CTAs e por último a
 * mídia — com atrasos curtos e o mesmo ease-out do resto do site.
 *
 * A mídia é um vídeo vertical que toca sozinho, mudo e em loop. A altura dele
 * manda no tamanho (largura derivada do formato 9:16), assim ele nunca fica
 * mais alto que a tela.
 */
export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__text">
            <p className="eyebrow enter" data-fx="up" style={{ '--d': '60ms' } as React.CSSProperties}>
              {hero.eyebrow}
            </p>

            <h1 className="hero__title enter" data-fx="up" style={{ '--d': '140ms' } as React.CSSProperties}>
              {hero.titleLead}{' '}
              <em className="hero__title-accent">{hero.titleAccent}</em>
            </h1>

            <p
              className="hero__subtitle enter"
              data-fx="up"
              style={{ '--d': '240ms' } as React.CSSProperties}
            >
              {hero.subtitle}
            </p>

            <div
              className="hero__actions enter"
              data-fx="up"
              style={{ '--d': '330ms' } as React.CSSProperties}
            >
              <a
                className="btn btn--primary"
                href={whatsappUrl(WHATSAPP_MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp />
                {hero.primaryCta}
              </a>
              <a className="btn btn--outline" href={hero.secondaryHref}>
                {hero.secondaryCta}
                <IconArrowRight />
              </a>
            </div>
          </div>

          <div
            className="hero__visual enter"
            data-fx="visual"
            style={{ '--d': '400ms' } as React.CSSProperties}
          >
            <p className="hero__note">
              <span aria-hidden="true" />
              {hero.note}
            </p>

            <div
              className="hero__frame mframe"
              style={{ '--hero-media-ratio': hero.video.ratio } as React.CSSProperties}
            >
              <HeroVideo video={hero.video} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
