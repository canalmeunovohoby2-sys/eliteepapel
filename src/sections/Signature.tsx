import { HeroVideo } from '../components/HeroVideo'
import { Reveal } from '../components/Reveal'
import { signature } from '../data/signature'
import './Signature.css'

/**
 * Do seu jeito — personalização.
 * Texto curto à esquerda e o vídeo real da produção à direita, com a mesma
 * moldura da primeira dobra.
 */
export function Signature() {
  return (
    <section className="section section--tint sig" id="seu-jeito">
      <div className="container sig__grid">
        <div className="sig__content">
          <Reveal fx="fade">
            <p className="eyebrow">{signature.eyebrow}</p>
          </Reveal>

          <Reveal fx="curtain" delay={80}>
            <h2 className="sig__title">
              {signature.title}
              <em>{signature.titleAccent}</em>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="sig__text">{signature.text}</p>
          </Reveal>

          <div className="sig__facets">
            {signature.facets.map((facet, i) => (
              <Reveal as="span" className="sig__facet" key={facet} delay={i * 80}>
                {facet}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal fx="clip" delay={140} className="sig__visual">
          <div
            className="sig__frame mframe"
            style={{ '--sig-media-ratio': signature.video.ratio } as React.CSSProperties}
          >
            <HeroVideo video={signature.video} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
