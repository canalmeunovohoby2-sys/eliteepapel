export type ImageAsset = {
  /** Caminho do arquivo real em /public. Vazio = slot aguardando a foto da cliente. */
  src?: string
  alt: string
  /** Texto exibido no slot enquanto a foto real não chega. */
  placeholder?: string
  /** Ex.: '4 / 5', '3 / 4', '1 / 1' */
  ratio?: string
}

export type VideoAsset = {
  src?: string
  poster?: string
  alt: string
  placeholder?: string
  /** '9 / 16' para vertical, '16 / 9' para horizontal */
  ratio: string
}

export type NavItem = {
  label: string
  id: string
}

/** Trabalho exibido no carrossel de "O que fazemos". Só imagem, sem legenda. */
export type WorkItem = {
  id: string
  image: ImageAsset
}

export type ProcessStep = {
  index: string
  title: string
  description: string
}

export type Highlight = {
  title: string
  description: string
}

export type Testimonial = {
  id: string
  /** Texto do depoimento, em primeira pessoa. */
  quote: string
  /** Nome de quem depõe — de preferência como a cliente autorizou a exibir. */
  name: string
  /** Cidade/estado, exibido em caixa alta abaixo do nome. */
  place: string
}
