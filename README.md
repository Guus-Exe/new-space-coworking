# New Space Coworking — Site & Material de Apresentação Comercial

Site institucional e catálogo comercial com imagens e preços fictícios para apresentação a clientes.

## Estrutura do Projeto
- `presentation_cards/` e `assets/cards/`: Imagens em alta resolução geradas com fotos reais do Google Maps de New Space Coworking, logotipo oficial transparente e preços fictícios.
  - `card_1_estacao_compartilhada.jpg` (1080×1080) — Hot Desk / Diária (R$ 39/dia ou R$ 12/h)
  - `card_2_mesa_fixa_mensal.jpg` (1080×1080) — Mesa Fixa Dedicada Mensal (R$ 590/mês)
  - `card_3_sala_de_reuniao.jpg` (1080×1080) — Sala de Reunião Executiva 8 pessoas (R$ 45/hora)
  - `card_4_endereco_fiscal.jpg` (1080×1080) — Endereço Fiscal & Escritório Virtual (R$ 120/mês)
  - `card_5_espaco_copa_cafe.jpg` (1080×1080) — Copa & Café Cortesia
  - `card_6_apresentacao_completa_1920x1080.jpg` (1920×1080) — Slide executivo completo com todos os planos
- `assets/js/site-data.js`: Dados comerciais, planos e preços renderizados no site.
- `assets/img/`: Logotipo oficial e fotos reais do espaço baixadas do Google Maps.
- `index.html`: Página principal com navegação, galeria do espaço, planos interativos, cards de apresentação para download e mapa com a localização oficial em Arujá.

## Como visualizar localmente
Execute no terminal:
```bash
python -m http.server 5173
```
E acesse no navegador: `http://localhost:5173`.
