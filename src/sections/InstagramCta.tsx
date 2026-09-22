import { Reveal } from '../components/Reveal'
import { IconInstagram } from '../components/Icons'
import { instagramCta } from '../data/cta'
import { INSTAGRAM_URL } from '../data/site'
import './InstagramCta.css'

export function InstagramCta() {
  return (
    <section className="section section--paper ig">
      <div className="container">
        <div className="ig__panel">
          <div className="ig__text">
            <Reveal fx="fade">
              <p className="eyebrow">{instagramCta.eyebrow}</p>
            </Reveal>
            <Reveal fx="curtain" delay={80}>
              <h2 className="ig__title">
                {instagramCta.title} <em>{instagramCta.titleAccent}</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="ig__desc">{instagramCta.text}</p>
            </Reveal>
          </div>

          <Reveal fx="right" delay={140} className="ig__action">
            <p className="ig__handle">{instagramCta.handle}</p>
            <a
              className="btn btn--outline"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconInstagram />
              {instagramCta.cta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
