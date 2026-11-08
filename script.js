document.documentElement.classList.add('js');

document.getElementById('year').textContent = new Date().getFullYear();

// Language toggle (resilient to blocked localStorage / NoScript)
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const langBtn = document.getElementById('langBtn');
const htmlEl = document.documentElement;

// El nombre accesible debe contener el texto visible (WCAG 2.5.3): el boton
// muestra "EN" en espanol y "ES" en ingles, asi que el label cambia con el idioma.
function syncLangBtn() {
  const en = (htmlEl.getAttribute('lang') || 'es') === 'en';
  // axe (2.5.3) compara palabra por palabra: el texto visible va primero y suelto.
  langBtn.setAttribute('aria-label', en ? 'ES — switch language to Spanish' : 'EN — cambiar idioma a inglés');
}
if (store.get('bien-lang') === 'en') htmlEl.setAttribute('lang', 'en');
syncLangBtn();
langBtn.addEventListener('click', () => {
  const cur = htmlEl.getAttribute('lang') || 'es';
  const next = cur === 'en' ? 'es' : 'en';
  htmlEl.setAttribute('lang', next);
  store.set('bien-lang', next);
  syncLangBtn();
});

// Nav horizontal (sin burger): scrollspy del link activo
const navLinks = Array.from(document.querySelectorAll('#navlinks a[href^="#"]'));
const navSections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if (navSections.length && 'IntersectionObserver' in window) {
  const setActive = (id) => {
    navLinks.forEach((a) => {
      const active = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  navSections.forEach((s) => io.observe(s));
}

// FAQ accordion: aria-expanded + el panel cerrado sale del arbol de accesibilidad.
// Anima max-height y, al terminar la transicion, aplica hidden (cerrado) o
// max-height:none (abierto, para que el contenido reflowe al cambiar de ancho).
const FAQ_MS = 320;
document.querySelectorAll('.faq-q').forEach((q) => {
  const item = q.parentElement;
  const panel = document.getElementById(q.getAttribute('aria-controls'));
  if (!panel) return;
  let timer = 0;
  const settle = (fn) => {
    const done = () => {
      panel.removeEventListener('transitionend', onEnd);
      clearTimeout(timer);
      fn();
    };
    const onEnd = (e) => {
      if (e.target === panel && e.propertyName === 'max-height') done();
    };
    panel.addEventListener('transitionend', onEnd);
    timer = setTimeout(done, FAQ_MS);
  };
  q.addEventListener('click', () => {
    const open = q.getAttribute('aria-expanded') === 'true';
    q.setAttribute('aria-expanded', String(!open));
    item.classList.toggle('open', !open);
    if (open) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      requestAnimationFrame(() => { panel.style.maxHeight = '0px'; });
      settle(() => { if (q.getAttribute('aria-expanded') === 'false') panel.hidden = true; });
    } else {
      panel.hidden = false;
      panel.style.maxHeight = '0px';
      requestAnimationFrame(() => { panel.style.maxHeight = panel.scrollHeight + 'px'; });
      settle(() => { if (q.getAttribute('aria-expanded') === 'true') panel.style.maxHeight = 'none'; });
    }
  });
});

// Cookie bar: hidden hasta que aparece, para no dejar foco fuera de pantalla
const cookie = document.getElementById('cookie');
const hideCookie = () => {
  cookie.classList.remove('show');
  setTimeout(() => { cookie.hidden = true; }, 350);
};
if (!store.get('cookie-bien')) {
  setTimeout(() => {
    cookie.hidden = false;
    requestAnimationFrame(() => cookie.classList.add('show'));
  }, 900);
}
const dismiss = () => {
  hideCookie();
  store.set('cookie-bien', '1');
};
document.getElementById('cookieOk').addEventListener('click', dismiss);
document.getElementById('cookieNo').addEventListener('click', dismiss);

// Láminas-interludio: cada una entra cuando cruza el viewport (rotateInDownRight).
// Sin IO o con movimiento reducido, se muestran de entrada.
const plates = Array.from(document.querySelectorAll('.plate'));
if (plates.length) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = (el) => el.classList.add('is-in');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    plates.forEach(reveal);
  } else {
    const plateIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          reveal(entry.target);
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
    );
    plates.forEach((p) => plateIO.observe(p));
  }
}
