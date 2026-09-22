import { useState } from 'react'
import { Media } from '../components/Media'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { about } from '../data/about'
import { LOGO } from '../data/site'
import './About.css'

export function About() {
  const [logoFailed, setLogoFailed] = useState(false)
  const hasOwner = Boolean(about.owner.src)
  const showLogo = Boolean(LOGO.src) && !logoFailed

  return (
    <section className="section section--white about" id="sobre">
      <div className="container about__grid">
        {/* A marca em destaque: a logo é um selo circular, então ganha uma
            moldura redonda com passe-partout de papel e fio rosa. */}
        <Reveal className="about__visual" fx="scale">
          <div className="about__seal">
            {showLogo ? (
              <img
                className="about__seal-img"
                src={LOGO.src}
                alt={LOGO.alt}
                width={LOGO.width}
                height={LOGO.height}
                decoding="async"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <Logo size="lg" className="about__seal-fallback" />
            )}
          </div>
        </Reveal>

        <div className="about__content">
          <Reveal fx="fade">
            <p className="eyebrow">{about.eyebrow}</p>
          </Reveal>

          <Reveal fx="curtain" delay={80}>
            <h2 className="about__title">
              {about.title} <em>{about.titleAccent}</em>
            </h2>
          </Reveal>

          {about.paragraphs.map((paragraph, i) => (
            <Reveal delay={160 + i * 80} key={paragraph}>
              <p className="about__text">{paragraph}</p>
            </Reveal>
          ))}

          <dl className="about__principles">
            {about.principles.map((principle, i) => (
              <Reveal
                as="div"
                className="about__principle"
                key={principle.title}
                delay={i * 110}
              >
                <dt>{principle.title}</dt>
                <dd>{principle.description}</dd>
              </Reveal>
            ))}
          </dl>

          {/* Retrato da responsável: entra na composição assim que o arquivo existir. */}
          {hasOwner && (
            <Reveal delay={320} className="about__owner">
              <Media image={about.owner} ratio={about.owner.ratio} />
              {about.owner.name && (
                <p className="about__owner-name">
                  {about.owner.name}
                  {about.owner.role && <span>{about.owner.role}</span>}
                </p>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
