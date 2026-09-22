import { Reveal } from '../components/Reveal'
import { WorksCarousel } from '../components/WorksCarousel'
import { works, worksSection } from '../data/works'
import './Works.css'

/**
 * O que fazemos — carrossel de trabalhos.
 * As fotografias falam por si: nenhuma legenda, título ou etiqueta sobre a imagem.
 */
export function Works() {
  return (
    <section className="section section--paper works-sec" id="trabalhos">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal fx="fade">
              <p className="eyebrow">{worksSection.eyebrow}</p>
            </Reveal>
            <Reveal fx="curtain" delay={90}>
              <h2 className="section-title works-sec__title">
                {worksSection.title} <em>{worksSection.titleAccent}</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={190}>
            <p>{worksSection.intro}</p>
          </Reveal>
        </div>
      </div>

      <Reveal fx="fade">
        <WorksCarousel items={works} label="Trabalhos da Eliarte & Papel" />
      </Reveal>
    </section>
  )
}
