const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

document.querySelectorAll('.back-top').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navLinks?.classList.toggle('open', !isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
