import type { ProcessStep } from '../types'

export const processSection = {
  eyebrow: 'Como funciona',
  title: 'Da sua ideia até a peça',
  titleAccent: 'pronta.',
  intro: 'Um caminho simples, do primeiro recado ao personalizado fazendo parte da festa.',
  steps: [
    {
      index: '01',
      title: 'Você conta a sua ideia',
      description: 'Envie o tema, as cores e os detalhes da sua comemoração.',
    },
    {
      index: '02',
      title: 'A Eliarte cria',
      description: 'O personalizado é desenvolvido pensando na proposta da sua festa.',
    },
    {
      index: '03',
      title: 'Tudo ganha forma',
      description:
        'Depois da produção, seu pedido fica pronto para fazer parte da celebração.',
    },
  ] satisfies ProcessStep[],
}
