import { Reveal } from '../components/Reveal'
import { processSection } from '../data/process'
import './Process.css'

/**
 * Como funciona — linha editorial numerada, sem bloco de cards.
 */
export function Process() {
  return (
    <section className="section section--white proc" id="processo">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal fx="fade">
            <p className="eyebrow">{processSection.eyebrow}</p>
          </Reveal>
          <Reveal fx="curtain" delay={90}>
            <h2 className="section-title">
              {processSection.title} <em>{processSection.titleAccent}</em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p>{processSection.intro}</p>
          </Reveal>
        </div>

        <ol className="proc__steps">
          {processSection.steps.map((step, i) => (
            <Reveal as="li" className="proc__step" key={step.index} delay={i * 90}>
              <span className="proc__num">{step.index}</span>
              <h3 className="proc__title">{step.title}</h3>
              <p className="proc__desc">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
