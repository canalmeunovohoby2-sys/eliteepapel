import { Reveal } from '../components/Reveal'
import {
  TESTIMONIALS_ARE_PLACEHOLDER,
  testimonials,
  testimonialsSection,
} from '../data/testimonials'
import './Testimonials.css'

/**
 * Depoimentos — citações editoriais, sem cards e sem estrelas.
 * A frase de quem encomendou vem em primeiro lugar, na serifada de acento;
 * abaixo, o nome em caixa alta discreta.
 */
export function Testimonials() {
  return (
    <section className="section section--cream tst" id="depoimentos">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal fx="fade">
              <p className="eyebrow">{testimonialsSection.eyebrow}</p>
            </Reveal>
            <Reveal fx="curtain" delay={80}>
              <h2 className="section-title tst__title">
                {testimonialsSection.title} <em>{testimonialsSection.titleAccent}</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={170}>
            <p>{testimonialsSection.intro}</p>
          </Reveal>
        </div>

        {/* Aviso que só existe enquanto o conteúdo for de exemplo */}
        {TESTIMONIALS_ARE_PLACEHOLDER && (
          <Reveal className="tst__notice" fx="fade">
            <span aria-hidden="true" />
            Conteúdo de exemplo — substituir por depoimentos reais antes de publicar
          </Reveal>
        )}

        <ul className="tst__list" role="list">
          {testimonials.map((testimonial, i) => (
            <Reveal
              as="li"
              className="tst__item"
              key={testimonial.id}
              fx="up"
              delay={i * 130}
            >
              <span className="tst__mark" aria-hidden="true">
                &ldquo;
              </span>

              <blockquote className="tst__quote">
                <p>{testimonial.quote}</p>
              </blockquote>

              <div className="tst__who">
                <span className="tst__name">{testimonial.name}</span>
                <span className="tst__place">{testimonial.place}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
