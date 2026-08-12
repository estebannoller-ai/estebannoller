// Animaciones solo si hay JS (mejora progresiva)
document.documentElement.classList.add('js');

// Nav compacta al scrollear
const nav = document.getElementById('nav');
const alScroll = () => nav.classList.toggle('compacta', window.scrollY > 40);
alScroll();
window.addEventListener('scroll', alScroll, { passive: true });

// Menú móvil
const btn = document.getElementById('btnMenu');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const abierto = menu.classList.toggle('abierto');
  btn.setAttribute('aria-expanded', abierto);
  btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  document.body.style.overflow = abierto ? 'hidden' : '';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('abierto');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

// Contacto. Con Access Key el mensaje se envía sin salir de la página; sin ella,
// se abre el correo del visitante ya redactado para que nada se pierda en silencio.
const form = document.getElementById('formContacto');
if (form) {
  const aviso = document.getElementById('avisoForm');
  const boton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = form.name.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.message.value.trim();

    if (!form.dataset.accessKey) {
      aviso.textContent = 'Abriendo tu correo con el mensaje listo para enviar…';
      window.location.href = 'mailto:noller@cdeldorado.gob.ar'
        + '?subject=' + encodeURIComponent(`Mensaje de ${nombre} desde la web`)
        + '&body=' + encodeURIComponent(`${mensaje}\n\n—\n${nombre}\n${email}`);
      return;
    }

    // Envío nativo: Web3Forms rechaza el envío por AJAX desde otros orígenes (CORS),
    // así que se postea el formulario y vuelve al sitio con ?enviado=1.
    boton.disabled = true;
    aviso.textContent = 'Enviando…';
    form.submit();
  });

  // Confirmación al volver de Web3Forms
  if (new URLSearchParams(location.search).has('enviado')) {
    aviso.textContent = '¡Listo! Recibí tu mensaje y te voy a responder.';
    document.getElementById('contacto').scrollIntoView();
    history.replaceState(null, '', location.pathname + '#contacto');
  }
}

// Revelado al entrar en pantalla
const io = new IntersectionObserver(entradas => {
  entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
