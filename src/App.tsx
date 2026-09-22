import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Marquee } from './components/Marquee'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Works } from './sections/Works'
import { Signature } from './sections/Signature'
import { VideoShowcase } from './sections/VideoShowcase'
import { Process } from './sections/Process'
import { Testimonials } from './sections/Testimonials'
import { InstagramCta } from './sections/InstagramCta'
import { FinalCta } from './sections/FinalCta'
import { marqueeCaption, marqueeItems } from './data/marquee'

export function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Marquee items={marqueeItems} caption={marqueeCaption} />
        <About />
        <Works />
        <Signature />
        <VideoShowcase />
        <Process />
        <Testimonials />
        <InstagramCta />
        <FinalCta />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
