const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menü öffnen' : 'Menü schließen');
  navigation.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('load-map').addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.title = 'Standort von Werk & Wert auf Google Maps';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.src = 'https://www.google.com/maps?q=Wiesenstra%C3%9Fe+42%2C+13357+Berlin&output=embed';
  document.getElementById('map').replaceChildren(frame);
});

document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  status.textContent = 'Vielen Dank! Ihre Anfrage wurde vorbereitet. Wir melden uns bald bei Ihnen.';
  form.reset();
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('.section-head, .service-grid, .about-copy, .contact-form, .location-info').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}

