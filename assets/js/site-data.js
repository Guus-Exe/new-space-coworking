/*
  NL Coworking — fonte única de conteúdo do site.

  Preços, planos, salas e contatos são lidos DAQUI e renderizados pelo main.js.
  Gancho para o futuro painel administrativo: basta definir
      window.NL_SITE_ENDPOINT = 'https://.../api/site'
  antes de carregar o main.js e o site passa a buscar este mesmo formato (JSON)
  da API, sem alterar HTML/CSS. Enquanto isso, edite os valores abaixo.
*/
window.NL_SITE = {
  contact: {
    whatsapp: '5511911305969',
    phoneLabel: '(11) 91130-5969',
    email: 'nlcoworkingaruja@gmail.com',
    instagram: 'https://www.instagram.com/nlcoworking/',
    instagramHandle: '@nlcoworking',
    city: 'Arujá, SP',
    address: {
      street: 'Rodovia Alberto Hinoto, 965',
      unit: 'Sala 23',
      building: 'Edifício Comercial Arujazinho',
      district: 'Caputera',
      city: 'Arujá',
      state: 'SP',
      zip: '07434-100',
      full: 'Rodovia Alberto Hinoto, 965 - Sala 23 (Edifício Comercial Arujazinho), Caputera, Arujá - SP, 07434-100',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rodovia+Alberto+Hinoto%2C+965+-+Caputera%2C+Aruj%C3%A1+-+SP%2C+07434-100',
      wazeUrl: 'https://waze.com/ul?q=Rodovia%20Alberto%20Hinoto%20965%20Aruja'
    }
  },

  payment: 'Pagamentos realizados via PIX.',

  coworking: {
    flexible: [
      {
        id: 'hora',
        name: 'Por hora',
        price: 10,
        unit: 'hora',
        note: 'Mínimo de 2h de utilização',
        items: [
          'Mesa com posição aleatória (locais pré-estabelecidos)',
          'Utilização da copa',
          'Locker com valor adicional'
        ]
      },
      {
        id: 'diaria',
        name: 'Diária',
        price: 50,
        unit: 'dia',
        note: 'Um dia inteiro, sem compromisso',
        items: [
          'Mesa com posição aleatória (locais pré-estabelecidos)',
          'Utilização da copa',
          'Espaço locker incluso'
        ]
      }
    ],
    monthly: [
      {
        id: 'tres-vezes',
        name: 'Três vezes por semana',
        caption: 'Para quem alterna home office e escritório',
        semestral: 380,
        flexible: 420,
        featured: false,
        items: [
          'Mesa com posição aleatória',
          'Utilização da copa',
          'Locker incluso nos dias de utilização',
          '10 impressões P/B por mês (não acumulativas)'
        ]
      },
      {
        id: 'mensal-fixa',
        name: 'Posição fixa mensal',
        caption: 'A sua mesa, do jeito que você deixou',
        semestral: 630,
        flexible: 700,
        featured: true,
        items: [
          'Mesa com posição fixa',
          '1 cadeado para notebook/PC',
          'Utilização da copa',
          'Espaço locker fixo',
          '20 impressões P/B por mês (não acumulativas)',
          'Endereço comercial e gestão de correspondência'
        ]
      }
    ]
  },

  rooms: [
    {
      id: 'reuniao-4',
      name: 'Sala de reunião',
      detail: 'Até 4 pessoas',
      price: 45,
      unit: 'hora',
      items: ['Mesa e cadeiras confortáveis', 'Smart TV', 'Ar-condicionado', 'Lousa'],
      footnote: 'Consulte valores para planos mensais fixos.'
    },
    {
      id: 'reuniao-7',
      name: 'Sala de reunião',
      detail: 'Até 7 pessoas',
      price: 65,
      unit: 'hora',
      items: ['Mesa e cadeiras confortáveis', 'Smart TV', 'Ar-condicionado', 'Lousa'],
      footnote: 'Consulte valores para planos mensais fixos.'
    },
    {
      id: 'atendimento',
      name: 'Sala de atendimento',
      detail: 'Terapeutas, psicólogos e psicanalistas',
      price: 45,
      unit: 'hora',
      items: ['Poltronas confortáveis e ambiente decorado', 'Ar-condicionado', 'Lousa'],
      footnote: 'Consulte valores para planos mensais.'
    },
    {
      id: 'privativa',
      name: 'Sala privativa',
      detail: 'De 2 a 5 pessoas · plano semestral',
      price: null,
      items: ['Layout definido em conjunto', 'Ar-condicionado', 'Endereço comercial com gestão de correspondência']
    },
    {
      id: 'endereco',
      name: 'Endereço comercial e fiscal',
      detail: 'Plano anual',
      price: null,
      items: ['Endereço comercial e gestão de correspondência', 'Endereço fiscal e gestão de correspondência']
    }
  ]
};
