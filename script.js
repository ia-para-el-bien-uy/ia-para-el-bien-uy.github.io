document.getElementById('year').textContent = new Date().getFullYear();
  // Language toggle (resilient to blocked localStorage / NoScript)
  const store = {
    get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
    set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
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
  const menuBtn = document.getElementById('menuBtn'), navlinks = document.getElementById('navlinks');
  menuBtn.addEventListener('click', () => { const open = navlinks.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open); });
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => { const item = q.parentElement, a = item.querySelector('.faq-a'); const isOpen = item.classList.toggle('open'); a.style.maxHeight = isOpen ? a.scrollHeight + 'px' : null; });
  });
  const cookie = document.getElementById('cookie');
  if (!store.get('cookie-bien')) setTimeout(() => cookie.classList.add('show'), 900);
  const dismiss = () => { cookie.classList.remove('show'); store.set('cookie-bien','1'); };
  document.getElementById('cookieOk').addEventListener('click', dismiss);
  document.getElementById('cookieNo').addEventListener('click', dismiss);