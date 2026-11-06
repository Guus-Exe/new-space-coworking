# NL Coworking — site de apresentação

Site estático (HTML + CSS + JS), sem build. Para ver: abra `index.html` no navegador
ou rode `python -m http.server 5173` nesta pasta e acesse http://localhost:5173.

## Onde editar
- `assets/js/site-data.js` — preços, planos, salas, WhatsApp, e-mail, Instagram e endereço completo com links do Maps e Waze.
  É a fonte única de conteúdo: os planos da página são renderizados a partir dele.
- `assets/img/` — fotos (vieram do site atual; troque por fotos novas em alta resolução quando houver).
- `index.html` — textos das demais seções e mapa interativo oficial com pin do endereço.

## Gancho para o futuro painel administrativo
- Defina `window.NL_SITE_ENDPOINT = 'https://.../api/site'` antes do `main.js` e o site passa a ler
  o mesmo formato de `site-data.js` (JSON) dessa API. Se falhar, usa os dados locais.
- Defina `window.NL_ADMIN_URL` e o link "Área do membro" do rodapé passa a abrir o painel
  (hoje mostra "Área do membro em breve").
- Nenhum painel foi implementado.
