import type { Testimonial } from '../types'

/**
 * ============================================================
 *  CONTEÚDO DE EXEMPLO — NÃO PUBLICAR COMO ESTÁ
 * ============================================================
 *
 * Os três depoimentos abaixo foram ESCRITOS PARA DEMONSTRAR O LAYOUT.
 * Eles não vieram da cliente e não correspondem a pessoas reais.
 *
 * Publicar depoimento inventado atribuído a uma pessoa nomeada é
 * publicidade enganosa (art. 37 do CDC) e expõe a Eliarte & Papel a
 * reclamação de consumidor e a autuação do CONAR.
 *
 * Enquanto TESTIMONIALS_ARE_PLACEHOLDER for `true`, o site exibe um aviso
 * discreto na própria seção — impossível publicar sem perceber.
 *
 * PARA PUBLICAR DE VERDADE:
 * 1. Peça autorização a cada cliente para exibir nome, cidade e o texto.
 * 2. Substitua os textos e nomes abaixo pelos depoimentos reais.
 * 3. Troque TESTIMONIALS_ARE_PLACEHOLDER para `false`.
 *
 * Se a cliente tiver prints de WhatsApp ou avaliações do Google, dá para
 * aproveitar como prova social real — me avise que eu adapto.
 */

export const TESTIMONIALS_ARE_PLACEHOLDER = true

export const testimonialsSection = {
  eyebrow: 'Depoimentos',
  title: 'Quem encomendou,',
  titleAccent: 'conta.',
  intro: 'O que as famílias que celebraram com a Eliarte & Papel dizem sobre o trabalho.',
}

export const testimonials: Testimonial[] = [
  {
    id: 'depoimento-01',
    quote:
      'Enviei o tema e as cores e recebi um topo de bolo muito melhor do que eu tinha imaginado. Ficou delicado, no ponto, e combinou com tudo na mesa.',
    name: 'Camila R.',
    place: 'Salvador — BA',
  },
  {
    id: 'depoimento-02',
    quote:
      'As lembrancinhas fizeram sucesso na festa. Vários convidados perguntaram onde eu tinha encomendado e levaram para casa achando lindo.',
    name: 'Juliana M.',
    place: 'Salvador — BA',
  },
  {
    id: 'depoimento-03',
    quote:
      'Desde a primeira conversa ficou claro que não era peça pronta. Explicaram cada detalhe com cuidado, ficou pronto no prazo e igualzinho ao que combinamos.',
    name: 'Patrícia S.',
    place: 'Salvador — BA',
  },
]
