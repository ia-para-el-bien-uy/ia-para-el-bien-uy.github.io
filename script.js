document.getElementById('year').textContent = new Date().getFullYear();

// Language toggle (resilient to blocked localStorage / NoScript)
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const langBtn = document.getElementById('langBtn');
const htmlEl = document.documentElement;
if (store.get('bien-lang') === 'en') htmlEl.setAttribute('lang', 'en');
langBtn.addEventListener('click', () => {
  const cur = htmlEl.getAttribute('lang') || 'es';
  const next = cur === 'en' ? 'es' : 'en';
  htmlEl.setAttribute('lang', next);
  store.set('bien-lang', next);
});

// Nav horizontal (sin burger): scrollspy del link activo
const navLinks = Array.from(document.querySelectorAll('#navlinks a[href^="#"]'));
const navSections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if (navSections.length && 'IntersectionObserver' in window) {
  const setActive = (id) => {
    navLinks.forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
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

// FAQ accordion
document.querySelectorAll('.faq-q').forEach((q) => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const a = item.querySelector('.faq-a');
    const isOpen = item.classList.toggle('open');
    a.style.maxHeight = isOpen ? a.scrollHeight + 'px' : null;
  });
});

// Cookie bar
const cookie = document.getElementById('cookie');
if (!store.get('cookie-bien')) setTimeout(() => cookie.classList.add('show'), 900);
const dismiss = () => {
  cookie.classList.remove('show');
  store.set('cookie-bien', '1');
};
document.getElementById('cookieOk').addEventListener('click', dismiss);
document.getElementById('cookieNo').addEventListener('click', dismiss);
