const nav = document.getElementById('site-nav');
const toggle = document.querySelector('.menu-toggle');
const yearEl = document.getElementById('year');
const reveals = document.querySelectorAll('.section, .tile, .feature-list li, .feature-cards li, .plan, .pipeline-card, .contact-form');

yearEl.textContent = new Date().getFullYear();

if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -10% 0px',
  }
);

reveals.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Added to waitlist!';
    form.reset();
    setTimeout(() => {
      button.disabled = false;
      button.textContent = 'Join the waitlist';
    }, 4000);
  });
}
