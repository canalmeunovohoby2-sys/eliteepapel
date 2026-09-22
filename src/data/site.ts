import type { NavItem } from '../types'

/* ============================================================
   Marca
   ============================================================ */

export const SITE_NAME = 'Eliarte & Papel'
export const SITE_URL = 'https://eliarteepapel.com.br'

/**
 * Logo real da cliente: selo circular de papelaria criativa.
 * A logo não é redesenhada, recolorida nem distorcida em nenhum momento.
 * O wordmark tipográfico abaixo só entra em cena se o arquivo não carregar.
 */
export const LOGO = {
  src: '/midia/logo.png' as string | undefined,
  alt: 'Eliarte & Papel',
  /** Dimensões naturais do arquivo (quadrado), para evitar layout shift. */
  width: 500,
  height: 500,
  /** Wordmark tipográfico exibido apenas se a logo não carregar. */
  wordmark: 'Eliarte & Papel',
  wordmarkMark: 'E',
}

/* ============================================================
   Contato
   ============================================================ */

export const WHATSAPP_NUMBER = '5571984917373'
export const WHATSAPP_DISPLAY = '(71) 98491-7373'

export const INSTAGRAM_HANDLE = '@eliarteepapel'
export const INSTAGRAM_URL = 'https://www.instagram.com/eliarteepapel'

export const LOCATION = {
  city: 'Salvador',
  state: 'BA',
  country: 'Brasil',
  label: 'Salvador — BA',
}

export const BRAND_TAGLINE = 'Detalhes que transformam momentos em memórias.'

/* ============================================================
   Mensagens contextualizadas de WhatsApp
   ============================================================ */

export const WHATSAPP_MESSAGES = {
  geral: 'Olá! Conheci a Eliarte & Papel pelo site e gostaria de saber mais sobre os personalizados.',
  hero: 'Olá! Vim pelo site da Eliarte & Papel e quero encomendar um personalizado para a minha comemoração.',
  trabalhos:
    'Olá! Vi os trabalhos no site da Eliarte & Papel e gostaria de saber mais sobre um personalizado.',
  final:
    'Olá! Vim pelo site da Eliarte & Papel e gostaria de conhecer os personalizados disponíveis.',
} as const

export function whatsappUrl(message: string = WHATSAPP_MESSAGES.geral): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/* ============================================================
   Navegação
   ============================================================ */

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', id: 'inicio' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Trabalhos', id: 'trabalhos' },
  { label: 'Do seu jeito', id: 'seu-jeito' },
  { label: 'Vídeos', id: 'videos' },
  { label: 'Contato', id: 'contato' },
]

export const NAV_IDS = NAV_ITEMS.map((item) => item.id)
