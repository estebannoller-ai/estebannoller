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

// Contacto: si todavía no hay Access Key, el formulario abre el correo del visitante
// con el mensaje ya redactado, así ningún mensaje se pierde en silencio.
const form = document.getElementById('formContacto');
if (form && !form.dataset.accessKey) {
  const aviso = document.getElementById('avisoForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = form.name.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.message.value.trim();
    const cuerpo = `${mensaje}\n\n—\n${nombre}\n${email}`;
    aviso.textContent = 'Abriendo tu correo con el mensaje listo para enviar…';
    window.location.href = 'mailto:noller@cdeldorado.gob.ar'
      + '?subject=' + encodeURIComponent(`Mensaje de ${nombre} desde la web`)
      + '&body=' + encodeURIComponent(cuerpo);
  });
}

// Revelado al entrar en pantalla
const io = new IntersectionObserver(entradas => {
  entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
