const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('anton-theme');
if (storedTheme) root.dataset.theme = storedTheme;

function updateThemeIcon() {
  const dark = root.dataset.theme === 'dark';
  themeButton.querySelector('.theme-icon').textContent = dark ? '☼' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Helles Farbschema aktivieren' : 'Dunkles Farbschema aktivieren');
}
updateThemeIcon();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('anton-theme', root.dataset.theme);
  updateThemeIcon();
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const form = document.querySelector('.contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Bitte fülle alle Pflichtfelder aus.';
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent(`Projektanfrage: ${data.get('project')}`);
  const body = encodeURIComponent(`Hallo Anton,\n\nmein Name ist ${data.get('name')}.\n\n${data.get('message')}\n\nDu erreichst mich unter: ${data.get('email')}`);
  status.textContent = 'Deine E-Mail-App wird geöffnet …';
  window.location.href = `mailto:kontakt@antonpillath.de?subject=${subject}&body=${body}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
