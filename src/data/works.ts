import type { WorkItem } from '../types'

export const worksSection = {
  eyebrow: 'O que fazemos',
  title: 'Peças que dão nome à',
  titleAccent: 'festa.',
  intro:
    'Topos de bolo, personalizados, lembrancinhas e detalhes decorativos desenvolvidos para cada comemoração.',
}

/**
 * Trabalhos exibidos no carrossel — somente imagem, sem legenda sobre a foto.
 *
 * A lista contém exatamente as fotos que existem: nenhum espaço vazio.
 * Para publicar uma nova peça, salve o arquivo em /public/midia/fotos/ seguindo
 * a numeração (foto-11.jpeg, foto-12.jpeg...) e acrescente um item aqui.
 *
 * Todas as fotos estão em 3:4, o mesmo formato da moldura — por isso os cards
 * ficam rigorosamente do mesmo tamanho e nenhuma imagem é cortada.
 */
export const works: WorkItem[] = [
  {
    id: 'foto-01',
    image: {
      src: '/midia/fotos/foto-01.jpeg',
      alt: 'Conjunto personalizado do Stitch com display, número 4 e lembrancinhas em cone dentro de caixa rosa',
      placeholder: 'fotos/foto-01.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-02',
    image: {
      src: '/midia/fotos/foto-02.jpeg',
      alt: 'Display personalizado do Sonic em azul e amarelo com o nome Miguel',
      placeholder: 'fotos/foto-02.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-03',
    image: {
      src: '/midia/fotos/foto-03.jpeg',
      alt: 'Toppers de mesa no tema minha primeira volta ao sol, com sol sorridente e o número 1',
      placeholder: 'fotos/foto-03.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-04',
    image: {
      src: '/midia/fotos/foto-04.jpeg',
      alt: 'Três toppers de sol personalizados no tema minha primeira volta ao sol',
      placeholder: 'fotos/foto-04.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-05',
    image: {
      src: '/midia/fotos/foto-05.jpeg',
      alt: 'Lembrancinhas personalizadas em formato de caixinha com o tema minha primeira volta ao sol',
      placeholder: 'fotos/foto-05.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-06',
    image: {
      src: '/midia/fotos/foto-06.jpeg',
      alt: 'Topo de bolo da Hello Kitty com o nome Mariana visto de perto',
      placeholder: 'fotos/foto-06.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-07',
    image: {
      src: '/midia/fotos/foto-07.jpeg',
      alt: 'Caixinhas de lembrancinha personalizadas com o número 1 e o tema minha primeira volta ao sol',
      placeholder: 'fotos/foto-07.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-08',
    image: {
      src: '/midia/fotos/foto-08.jpeg',
      alt: 'Mesa de festa personalizada no tema 365 sorrisos, com bolo, cupcakes, docinhos e lembrancinhas',
      placeholder: 'fotos/foto-08.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-09',
    image: {
      src: '/midia/fotos/foto-09.jpeg',
      alt: 'Bolo decorado no tema 365 sorrisos com topper de sol, arco-íris e o número 1',
      placeholder: 'fotos/foto-09.jpeg',
      ratio: '3 / 4',
    },
  },
  {
    id: 'foto-10',
    image: {
      src: '/midia/fotos/foto-10.jpeg',
      alt: 'Docinhos servidos com toppers personalizados do tema 365 sorrisos',
      placeholder: 'fotos/foto-10.jpeg',
      ratio: '3 / 4',
    },
  },
]
