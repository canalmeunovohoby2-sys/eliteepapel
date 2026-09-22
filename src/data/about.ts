import type { Highlight } from '../types'

export const about = {
  eyebrow: 'A marca',
  title: 'Cada detalhe começa com uma',
  titleAccent: 'ideia.',
  paragraphs: [
    'A Eliarte & Papel nasce do encontro entre papel, ideia e celebração. Cada peça é pensada a partir do que a festa quer contar — o tema, as cores, o nome de quem comemora.',
    'O trabalho é feito peça por peça, com atenção ao corte, à montagem e ao acabamento. É esse cuidado que faz um personalizado parecer único, e não apenas encomendado.',
  ],
  principles: [
    {
      title: 'Criatividade',
      description: 'Cada projeto parte da ideia de quem celebra, não de um modelo pronto.',
    },
    {
      title: 'Delicadeza',
      description: 'Materiais, cores e proporções escolhidos com sensibilidade.',
    },
    {
      title: 'Cuidado artesanal',
      description: 'Produção manual, atenta ao detalhe e ao acabamento de cada peça.',
    },
  ] satisfies Highlight[],
  /**
   * Espaço reservado para a foto pessoal/profissional da responsável.
   * Basta preencher `src` para o retrato entrar na composição.
   */
  owner: {
    src: undefined as string | undefined,
    name: '',
    role: '',
    alt: 'Retrato da responsável pela Eliarte & Papel',
    placeholder: 'Retrato da Eliarte (opcional)',
    ratio: '3 / 4',
  },
}
