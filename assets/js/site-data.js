/*
  New Space Coworking — Fonte de conteúdo do site.
  Preços fictícios e dados comerciais para apresentação para novo cliente.
*/
window.NL_SITE = {
  name: 'New Space Coworking',
  contact: {
    whatsapp: '5511974271649',
    phoneLabel: '(11) 97427-1649',
    email: 'contato@newspacecoworking.com.br',
    instagram: 'https://www.instagram.com/newspacecoworking/',
    instagramHandle: '@newspacecoworking',
    city: 'Arujá, SP',
    address: {
      street: 'R. Venceslau Braz, 33',
      unit: '',
      building: '',
      district: 'Jardim Rincão',
      city: 'Arujá',
      state: 'SP',
      zip: '07400-455',
      full: 'R. Venceslau Braz, 33 - Jardim Rincão, Arujá - SP, 07400-455',
      mapsUrl: 'https://www.google.com/maps/place/New+Space+Coworking/@-23.3979629,-46.360343,14z/data=!4m10!1m2!2m1!1scoworking+!3m6!1s0x94ce875f05c76f61:0x2efa873cfad1cbf4!8m2!3d-23.3979629!4d-46.3222342!15sCgljb3dvcmtpbmdaCyIJY293b3JraW5nkgEPY293b3JraW5nX3NwYWNlmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5hYVdSSGJIbDNSUkFC4AEA-gEECAsQPA!16s%2Fg%2F11t0m7mgbc?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D',
      wazeUrl: 'https://waze.com/ul?q=R.+Venceslau+Braz+33+Aruja'
    }
  },

  payment: 'Pagamentos realizados via PIX, Cartão ou Boleto.',

  coworking: {
    flexible: [
      {
        id: 'hora',
        name: 'Por hora',
        price: 12,
        unit: 'hora',
        note: 'Ideal para tarefas rápidas e foco imediato',
        items: [
          'Mesa compartilhada com tomada individual',
          'Wi-Fi Fibra 500 Mega de alta velocidade',
          'Café, água filtrada e copa à vontade',
          'Ambiente climatizado com ar-condicionado'
        ]
      },
      {
        id: 'diaria',
        name: 'Diária',
        price: 39,
        unit: 'dia',
        note: 'Dia inteiro com infraestrutura completa',
        items: [
          'Estação de trabalho compartilhada',
          'Wi-Fi Fibra 500 Mega estável',
          'Copa completa com café cortesia',
          'Acesso a lockers e armários privativos',
          'Estacionamento fácil no local'
        ]
      }
    ],
    monthly: [
      {
        id: 'tres-vezes',
        name: 'Plano 3x por semana',
        caption: 'Para quem alterna home office e escritório',
        semestral: 350,
        flexible: 390,
        featured: false,
        items: [
          '12 diárias livres por mês',
          'Wi-Fi Fibra de alta performance',
          'Copa com café e água inclusos',
          'Lockers nos dias de utilização',
          'Desconto exclusivo na locação de salas de reunião'
        ]
      },
      {
        id: 'mensal-fixa',
        name: 'Mesa Fixa Mensal (Dedicada)',
        caption: 'A sua estação exclusiva todo dia',
        semestral: 520,
        flexible: 590,
        featured: true,
        items: [
          'Mesa fixa 100% exclusiva e reservada',
          'Gaveteiro individual com chave',
          'Endereço comercial para divulgação',
          '2 horas de sala de reunião por mês inclusas',
          'Café, água filtrada e copa liberados',
          'Acesso prioritário de segunda a sábado'
        ]
      }
    ]
  },

  rooms: [
    {
      id: 'reuniao-8',
      name: 'Sala de Reunião Executiva',
      detail: 'Até 8 pessoas',
      price: 45,
      unit: 'hora',
      items: [
        'Mesa de conferência ampla e cadeiras executivas',
        'Smart TV de alta resolução para projeção',
        'Ar-condicionado e quadro branco',
        'Wi-Fi dedicado para videoconferências',
        'Café e água cortesia para clientes e convidados'
      ],
      footnote: 'Pacote turno 4 horas por R$ 150,00.'
    },
    {
      id: 'endereco-fiscal',
      name: 'Endereço Fiscal & Escritório Virtual',
      detail: 'Plano anual ou semestral',
      price: 120,
      unit: 'mês',
      items: [
        'Registro de CNPJ e alvará oficial em Arujá',
        'Endereço comercial para site, Google e cartões',
        'Gestão ativa e recebimento de correspondências',
        'Aviso imediato via WhatsApp a cada entrega recebida',
        'Descontos especiais na reserva de salas'
      ],
      footnote: 'Combo Fiscal + Comercial: R$ 160,00/mês.'
    },
    {
      id: 'atendimento',
      name: 'Sala de Atendimento Privativa',
      detail: 'Consultorias, psicólogos e atendimentos 1 a 1',
      price: 40,
      unit: 'hora',
      items: [
        'Poltronas confortáveis e decoração executiva',
        'Ambiente silencioso com privacidade acústica',
        'Ar-condicionado e iluminação agradável',
        'Recepção acolhedora para seus clientes'
      ],
      footnote: 'Consulte pacotes de horas mensais com desconto.'
    }
  ]
};

window.NEW_SPACE_SITE = window.NL_SITE;
