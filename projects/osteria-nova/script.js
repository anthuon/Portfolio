const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const dateInput = document.querySelector('#date');
dateInput.min = new Date().toISOString().split('T')[0];

document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const status = event.currentTarget.querySelector('.form-status');
  const name = new FormData(event.currentTarget).get('name').trim();
  status.textContent = `Danke, ${name}! Deine Anfrage ist eingegangen. Wir melden uns in Kürze.`;
  status.classList.add('success');
  event.currentTarget.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const mapButton = document.querySelector('#load-map');
const mapFrame = document.querySelector('.map-wrap iframe');
mapButton.addEventListener('click', () => {
  mapFrame.src = mapFrame.dataset.src;
  mapFrame.hidden = false;
  mapButton.remove();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
