/* NL Coworking — interações do site */
(function () {
  'use strict';

  // Sempre abrir pelo topo (a animação de abertura é parte da apresentação).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) window.scrollTo(0, 0);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------
     Dados: estáticos (site-data.js) ou, no futuro, vindos de uma API.
     Gancho do painel administrativo: window.NL_SITE_ENDPOINT
     ------------------------------------------------------------------ */
  function loadData() {
    if (window.NL_SITE_ENDPOINT && window.fetch) {
      return fetch(window.NL_SITE_ENDPOINT, { headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .catch(function () { return window.NL_SITE; });
    }
    return Promise.resolve(window.NL_SITE);
  }

  var DATA = window.NL_SITE;

  function waLink(text) {
    var number = (DATA && DATA.contact && DATA.contact.whatsapp) || '5511911305969';
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
  }
  function brl(n) { return n.toLocaleString('pt-BR'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  function bindWhatsApp(root) {
    $$('[data-wa]', root).forEach(function (a) { a.href = waLink(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
  }

  /* ---------- nav ---------- */
  var nav = $('#nav'), fab = $('#fab'), hero = $('#inicio');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    fab.classList.toggle('is-visible', y > window.innerHeight * 0.8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = $('#navToggle'), drawer = $('#navDrawer');
  function setDrawer(open) {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    drawer.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    nav.style.color = open ? '#fff' : '';
  }
  toggle.addEventListener('click', function () { setDrawer(drawer.hidden); });
  $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) setDrawer(false); });

  /* ---------- navegação suave para âncoras com compensação da nav fixa ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === '#' || href === '#!') return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navH = (nav && nav.offsetHeight) || 60;
        var targetY = target.getBoundingClientRect().top + window.scrollY - navH + 10;
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
        if (history.pushState) history.pushState(null, null, href);
      }
    });
  });

  /* ---------- parallax do hero ---------- */
  var heroMedia = $('[data-parallax]');
  if (heroMedia && !reduceMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) heroMedia.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- reveals ---------- */
  var io = null;
  function observeReveals(root) {
    var els = $$('[data-reveal]:not(.in)', root);
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          io.unobserve(en.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    }
    els.forEach(function (el) {
      var siblings = $$('[data-reveal]', el.parentElement).filter(function (s) { return s.parentElement === el.parentElement; });
      el.style.setProperty('--d', (Math.max(0, siblings.indexOf(el)) * 0.1).toFixed(2) + 's');
      io.observe(el);
    });
  }

  /* ---------- espaço: foto sticky troca conforme a rolagem ---------- */
  (function space() {
    var items = $$('.space__item'), imgs = $$('#spaceStage img');
    if (!items.length || !('IntersectionObserver' in window)) return;
    var current = 0;
    function activate(i) {
      if (i === current) return;
      imgs.forEach(function (im) { im.classList.remove('was'); });
      imgs[current].classList.remove('on');
      imgs[current].classList.add('was');
      imgs[i].classList.add('on');
      items.forEach(function (it, k) { it.classList.toggle('is-active', k === i); });
      current = i;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) activate(items.indexOf(en.target));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    items.forEach(function (it) { obs.observe(it); });
  })();

  /* ---------- galeria: arrastar + botões ---------- */
  (function gallery() {
    var strip = $('#galStrip');
    if (!strip) return;
    var down = false, startX = 0, startLeft = 0, moved = false;
    strip.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      down = true; moved = false; startX = e.clientX; startLeft = strip.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; strip.classList.add('is-drag'); }
      strip.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () { down = false; strip.classList.remove('is-drag'); });
    strip.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    function by(dir) { strip.scrollBy({ left: dir * Math.max(320, strip.clientWidth * 0.6), behavior: reduceMotion ? 'auto' : 'smooth' }); }
    $('#galPrev').addEventListener('click', function () { by(-1); });
    $('#galNext').addEventListener('click', function () { by(1); });
  })();

  /* ---------- planos ---------- */
  var billingMode = 'semestral';

  function renderFlexible() {
    $('#plansFlex').innerHTML = DATA.coworking.flexible.map(function (p) {
      var msg = 'Olá! Tenho interesse no plano "' + p.name + '" (R$ ' + brl(p.price) + '/' + p.unit + ') do NL Coworking.';
      return '<article class="flex-plan" data-reveal="rise">' +
        '<div class="flex-plan__top"><h3>' + esc(p.name) + '</h3>' +
        '<p class="price"><span class="cur">R$</span><span class="amt">' + brl(p.price) + '</span><span class="per">/' + esc(p.unit) + '</span></p></div>' +
        '<p class="note">' + esc(p.note) + '</p>' +
        '<ul>' + p.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
        '<a class="btn btn--line btn--sm" href="' + waLink(msg) + '" target="_blank" rel="noopener">Reservar</a>' +
        '</article>';
    }).join('');
  }

  function planMessage(p) {
    var label = billingMode === 'semestral' ? 'plano semestral' : 'sem fidelidade (cancele quando quiser)';
    var price = billingMode === 'semestral' ? p.semestral : p.flexible;
    return 'Olá! Tenho interesse no plano "' + p.name + '", ' + label + ' (R$ ' + brl(price) + '/mês), do NL Coworking.';
  }

  function renderMonthly() {
    $('#plansMonthly').innerHTML = DATA.coworking.monthly.map(function (p, idx) {
      return '<article class="plan' + (p.featured ? ' plan--featured' : '') + '" data-reveal="rise" data-plan="' + idx + '">' +
        (p.featured ? '<span class="plan__chip">Mais completo</span>' : '') +
        '<div class="plan__head"><h3>' + esc(p.name) + '</h3>' +
        '<p class="plan__caption">' + esc(p.caption) + '</p></div>' +
        '<p class="price"><span class="cur">R$</span><span class="amt">' + brl(p.semestral) + '</span><span class="per">/mês</span></p>' +
        '<p class="plan__mode">Plano semestral</p>' +
        '<ul>' + p.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
        '<a class="btn ' + (p.featured ? 'btn--orange' : 'btn--ink') + '" href="' + waLink(planMessage(p)) + '" target="_blank" rel="noopener">Quero este plano</a>' +
        '</article>';
    }).join('');
  }

  function applyBilling(mode, animate) {
    billingMode = mode;
    $$('#billing button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === mode)); });
    placeThumb();
    $$('#plansMonthly .plan').forEach(function (el) {
      var p = DATA.coworking.monthly[+el.dataset.plan];
      var price = el.querySelector('.price'), amt = el.querySelector('.amt');
      var next = brl(mode === 'semestral' ? p.semestral : p.flexible);
      function swap() {
        amt.textContent = next;
        el.querySelector('.plan__mode').textContent = mode === 'semestral' ? 'Plano semestral' : 'Sem fidelidade — cancele quando quiser';
        el.querySelector('.btn').href = waLink(planMessage(p));
        price.classList.remove('swap');
      }
      if (animate && !reduceMotion) { price.classList.add('swap'); setTimeout(swap, 220); } else { swap(); }
    });
  }

  function placeThumb() {
    var sw = $('#billing'), on = $('#billing button[aria-pressed="true"]');
    if (!sw || !on) return;
    sw.style.setProperty('--x', on.offsetLeft + 'px');
    sw.style.setProperty('--w', on.offsetWidth + 'px');
  }

  function renderRooms() {
    $('#roomsList').innerHTML = DATA.rooms.map(function (r) {
      var title = r.name + (r.detail ? ' — ' + r.detail : '');
      var msg = r.price
        ? 'Olá! Gostaria de reservar: ' + title + ' (R$ ' + brl(r.price) + '/' + r.unit + ') no NL Coworking.'
        : 'Olá! Gostaria de receber uma proposta: ' + title + ' no NL Coworking.';
      return '<li class="room" data-reveal="rise">' +
        '<div class="room__title"><h3>' + esc(r.name) + '</h3><p>' + esc(r.detail || '') + '</p></div>' +
        '<div><ul class="room__items">' + r.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
        (r.footnote ? '<p class="room__foot">' + esc(r.footnote) + '</p>' : '') + '</div>' +
        '<div class="room__buy">' +
        (r.price
          ? '<p class="price"><span class="cur">R$</span><span class="amt">' + brl(r.price) + '</span><span class="per">/' + esc(r.unit) + '</span></p>'
          : '<p class="room__ask">Sob consulta</p>') +
        '<a class="link-arrow" href="' + waLink(msg) + '" target="_blank" rel="noopener">' + (r.price ? 'Reservar' : 'Pedir proposta') +
        ' <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
        '</div></li>';
    }).join('');
  }

  function initTabs() {
    var tabs = $$('.tabs [role="tab"]'), bar = $('.tabs__bar');
    function place() {
      var on = $('.tabs [aria-selected="true"]');
      bar.style.setProperty('--x', on.offsetLeft + 'px');
      bar.style.setProperty('--w', on.offsetWidth + 'px');
    }
    function select(tab) {
      tabs.forEach(function (t) {
        var sel = t === tab;
        t.setAttribute('aria-selected', String(sel));
        t.tabIndex = sel ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !sel;
        if (sel) observeReveals(panel);
      });
      place();
      if (tab.id === 'tab-cowork') placeThumb();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        n.focus(); select(n);
      });
    });
    place();
    window.addEventListener('resize', function () { place(); placeThumb(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(); placeThumb(); });
  }

  function initBilling() {
    $$('#billing button').forEach(function (b) {
      b.addEventListener('click', function () { if (b.dataset.mode !== billingMode) applyBilling(b.dataset.mode, true); });
    });
  }

  /* ---------- formulário → WhatsApp ---------- */
  (function form() {
    var f = $('#waForm');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#fName').value.trim(), field = $('#fName').closest('.field'), err = $('#fNameErr');
      if (!name) {
        field.classList.add('has-error');
        err.textContent = 'Informe seu nome para começarmos a conversa.';
        $('#fName').focus();
        return;
      }
      field.classList.remove('has-error'); err.textContent = '';
      var interest = $('#fInterest').value, msg = $('#fMsg').value.trim();
      var text = 'Olá! Meu nome é ' + name + '. Tenho interesse em: ' + interest + '.' + (msg ? '\n' + msg : '');
      window.open(waLink(text), '_blank', 'noopener');
      toast('Abrindo o WhatsApp…');
    });
    $('#fName').addEventListener('input', function () { this.closest('.field').classList.remove('has-error'); $('#fNameErr').textContent = ''; });
  })();

  /* ---------- copiar endereço ---------- */
  var copyBtn = $('#btnCopyAddr');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var full = (DATA && DATA.contact && DATA.contact.address && DATA.contact.address.full) ||
        'Rodovia Alberto Hinoto, 965 - Sala 23 (Edifício Comercial Arujazinho), Caputera, Arujá - SP, 07434-100';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(full).then(function () {
          toast('Endereço copiado com sucesso!');
        }).catch(function () {
          toast('Endereço: ' + full);
        });
      } else {
        toast('Endereço: ' + full);
      }
    });
  }

  /* ---------- toast + gancho da área do membro ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2800);
  }
  var member = $('#memberLink');
  if (member) member.addEventListener('click', function (e) {
    e.preventDefault();
    // Gancho: quando o painel administrativo existir, apontar este link para ele.
    if (window.NL_ADMIN_URL) { window.location.href = window.NL_ADMIN_URL; } else { toast('Área do membro em breve.'); }
  });

  var year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  /* ---------- boot ---------- */
  function boot(data) {
    DATA = data || DATA;
    renderFlexible(); renderMonthly(); renderRooms();
    $('#pixNote').textContent = DATA.payment || '';
    bindWhatsApp(document);
    initTabs(); initBilling(); applyBilling('semestral', false);
    observeReveals(document);
  }
  loadData().then(boot);
})();
