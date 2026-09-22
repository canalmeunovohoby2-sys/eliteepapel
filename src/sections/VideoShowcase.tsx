import { Reveal } from '../components/Reveal'
import { VideoPlayer } from '../components/VideoPlayer'
import { videoItems, videosSection } from '../data/videos'
import './VideoShowcase.css'

/**
 * Vídeos reais em fundo profundo, como uma sala de projeção.
 * Quatro formatos verticais: uma linha no desktop, dois por linha no mobile —
 * o mesmo enquadramento de Stories e Reels que combina com o material da marca.
 */
export function VideoShowcase() {
  return (
    <section className="section section--deep vshow" id="videos">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal fx="fade">
            <p className="eyebrow">{videosSection.eyebrow}</p>
          </Reveal>
          <Reveal fx="curtain" delay={90}>
            <h2 className="section-title">
              {videosSection.title} <em>{videosSection.titleAccent}</em>
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p>{videosSection.intro}</p>
          </Reveal>
        </div>

        <div className="vshow__grid">
          {videoItems.map((video, i) => (
            <Reveal
              key={video.src ?? i}
              className="vshow__item"
              fx="scale"
              delay={i * 110}
            >
              <VideoPlayer video={video} onDark />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
