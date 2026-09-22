import type { VideoAsset } from '../types'

export const videosSection = {
  eyebrow: 'Vídeos',
  title: 'Detalhes que a foto',
  titleAccent: 'não consegue mostrar.',
  intro:
    'O brilho do papel, o movimento das peças e o acabamento visto de perto — em vídeos feitos durante a produção e a montagem.',
}

/**
 * Quatro vídeos verticais, todos em 9:16, no formato de Stories e Reels.
 *
 * A moldura de cada um usa a proporção REAL do arquivo — assim nada é cortado
 * nem sobra tarja. Como os quatro estão em 9:16, a linha fica perfeitamente
 * uniforme.
 *
 * A composição se ajusta à quantidade de arquivos: quatro em uma linha no
 * desktop, dois por linha em telas médias e no mobile.
 *
 * O poster é opcional: sem ele, o player busca o primeiro quadro do próprio
 * vídeo para servir de thumbnail.
 */
export const videoItems: VideoAsset[] = [
  {
    src: '/midia/videos/video-01.mp4',
    poster: '/midia/videos/video-01-poster.jpg',
    alt: 'Vídeo de uma peça personalizada produzida pela Eliarte & Papel',
    placeholder: 'videos/video-01.mp4 — vertical 9:16',
    ratio: '9 / 16',
  },
  {
    src: '/midia/videos/video-02.mp4',
    poster: '/midia/videos/video-02-poster.jpg',
    alt: 'Vídeo de detalhes e acabamento de um personalizado',
    placeholder: 'videos/video-02.mp4 — vertical 9:16',
    ratio: '9 / 16',
  },
  {
    src: '/midia/videos/video-03.mp4',
    poster: '/midia/videos/video-03-poster.jpg',
    alt: 'Vídeo de um trabalho personalizado feito para uma comemoração',
    placeholder: 'videos/video-03.mp4 — vertical 9:16',
    ratio: '9 / 16',
  },
  {
    src: '/midia/videos/video-04.mp4',
    poster: '/midia/videos/video-04-poster.jpg',
    alt: 'Vídeo de peças de papelaria personalizada prontas para a festa',
    placeholder: 'videos/video-04.mp4 — vertical 9:16',
    ratio: '9 / 16',
  },
]
