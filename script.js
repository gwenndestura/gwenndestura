/* ============================================================
   THEME TOGGLE
   ============================================================ */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

const saved = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', saved);
updateThemeIcon(saved);

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeBtn.innerHTML = theme === 'dark'
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
       </svg>`;
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ============================================================
   ACTIVE NAV ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   TYPEWRITER
   ============================================================ */
const roles = [
  'CS Student · Intelligent Systems',
  'Full-Stack Developer',
  'AI / ML Enthusiast',
  'UI / UX Designer',
  'Open Source Builder',
];

const typeEl = document.getElementById('typewriter');
let ri = 0, ci = 0, deleting = false, paused = false;

function type() {
  if (paused) { setTimeout(type, 1600); paused = false; return; }
  const word = roles[ri];
  typeEl.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
  let delay = deleting ? 45 : 80;
  if (!deleting && ci > word.length) { paused = true; deleting = true; }
  else if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; delay = 300; }
  setTimeout(type, delay);
}
type();

/* ============================================================
   PROJECT FILTER
   ============================================================ */
const filterTabs = document.querySelectorAll('.f-tab');
const projectCards = document.querySelectorAll('.pcard');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.type === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

/* ============================================================
   ACHIEVEMENTS TABS
   ============================================================ */
const achTabs = document.querySelectorAll('.ach-tab');
const achPanels = document.querySelectorAll('.ach-panel');

achTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    achTabs.forEach(t => t.classList.remove('active'));
    achPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.panel).classList.add('active');
  });
});
