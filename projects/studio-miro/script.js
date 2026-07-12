const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const form = document.querySelector('#contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  status.textContent = 'Vielen Dank! Deine Anfrage ist bei uns angekommen.';
  form.reset();
});

document.querySelector('#load-map').addEventListener('click', () => {
  const map = document.querySelector('#map-placeholder');
  const iframe = document.createElement('iframe');
  iframe.title = 'Studio Miro auf Google Maps';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.src = 'https://www.google.com/maps?q=Oranienstra%C3%9Fe+44,+10969+Berlin&output=embed';
  map.replaceWith(iframe);
});

