/* ============================================================
   FAVICON — render logo centered in a square canvas to prevent
   the browser from stretching a non-square image in the tab
   ============================================================ */
(function () {
  const img = new Image();
  img.onload = function () {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const ratio = Math.min(size / img.width, size / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
    const link = document.querySelector("link[rel='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = canvas.toDataURL('image/png');
    document.head.appendChild(link);
  };
  img.src = 'assets/gdlogo.png';
})();

/* ============================================================
   SPLASH SCREEN
   ============================================================ */
(function () {
  document.body.style.overflow = 'hidden';
  const splash = document.getElementById('splash');
  const gd = splash.querySelector('.splash-gd');
  // GD animates in over 1.5s → hold briefly → blast out + fade bg
  setTimeout(function () {
    gd.classList.add('gd-exit');               // GD scales up + fades (0.5s)
    setTimeout(function () {
      splash.classList.add('splash-exit');     // bg fades (0.45s)
      setTimeout(function () {
        splash.remove();
        document.body.style.overflow = '';
      }, 460);
    }, 250);
  }, 1600);
})();

/* ============================================================
   THEME — dark default, persisted to localStorage
   ============================================================ */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? svgSun() : svgMoon();
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function svgSun() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}
function svgMoon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

const savedTheme = localStorage.getItem('pgd-theme') || 'dark';
applyTheme(savedTheme);
// mobile sync happens after themeToggleMobile is defined below

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('pgd-theme', next);
  });
}

/* ============================================================
   PROJECT DATA
   ============================================================ */
const projects = [
  {
    num: '06',
    title: 'VeriFeed',
    cat: 'AI · ML · Browser Extension',
    desc: 'Deepfake detection browser extension achieving 92.67% accuracy via ResNeXt50 + BiLSTM hybrid model. Real-time HOG-based frame analysis at 5 FPS with a bilingual EN/FIL chatbot at 95% intent accuracy.',
    tech: ['Python', 'Flask', 'PyTorch', 'OpenCV', 'NLP'],
    github: 'https://github.com/gwenndestura/VeriFeed.git',
    live: 'https://veri-feed-frontend.vercel.app',
    img: 'assets/projects/VeriFeed.png',
    bg: 'linear-gradient(135deg,#1a0533,#7c3aad)',
    date: '2024',
    type: 'project',
  },
  {
    num: '07',
    title: 'AutomaticQuatro',
    cat: 'Web App · Education',
    desc: 'Interactive simulator for DFA, PDA, and CFG with animated step-by-step D3.js visualizations, zoom/pan controls, real-time regex validation, and dual problem support.',
    tech: ['Vue 3', 'Vite', 'D3.js', 'Node.js'],
    github: 'https://github.com/gwenndestura/AutomaticQuatro.git',
    live: 'https://automaticquatro.vercel.app/',
    img: 'assets/projects/AutomaticQuatro.png',
    bg: 'linear-gradient(135deg,#0f2027,#2c5364)',
    date: '2024',
    type: 'project',
  },
  {
    num: '04',
    title: 'Bean There',
    cat: 'Full-Stack · Web App',
    desc: 'Full-stack café directory with authentication, reviews, and CRUD operations. Optimized relational schema for users, cafés, and products with real-time search and filtering.',
    tech: ['Django', 'Vue.js', 'MySQL', 'Tailwind CSS'],
    github: 'https://github.com/gwenndestura/BeanThere.git',
    live: 'https://bean-there-cd.vercel.app',
    img: 'assets/projects/BeanThere.png',
    bg: 'linear-gradient(135deg,#2d1b0e,#c17f4a)',
    date: '2024',
    type: 'project',
  },
  {
    num: '05',
    title: 'liPHt',
    cat: 'Web · Advocacy',
    desc: 'Digital advocacy platform promoting social causes and community awareness. Clean, accessible design for campaigns and community engagement with a focus on mobile usability.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/gwenndestura/LiPHt.git',
    live: 'https://lipht-advocacy.vercel.app',
    img: 'assets/projects/liPHt.png',
    bg: 'linear-gradient(135deg,#064e3b,#059669)',
    date: '2024',
    type: 'project',
  },
  {
    num: '03',
    title: 'HealthLine',
    cat: 'UI/UX · Prototype',
    desc: 'UI/UX prototype for a health services platform connecting patients to healthcare providers. Focused on accessibility, clear information hierarchy, and intuitive appointment flows.',
    tech: ['Figma', 'UI/UX Design'],
    figma: 'https://www.figma.com/design/9wy2qnyVTCscYROpkCiRaL/HealthLine?node-id=0-1&t=ATYtnM6yu5Ewhr5T-1',
    proto: 'https://www.figma.com/proto/9wy2qnyVTCscYROpkCiRaL/HealthLine?node-id=0-1&t=ATYtnM6yu5Ewhr5T-1',
    img: 'assets/projects/HealthLine.png',
    bg: 'linear-gradient(135deg,#0c2461,#4a69bd)',
    date: '2024',
    type: 'prototype',
  },
  {
    num: '02',
    title: 'Mooji',
    cat: 'UI/UX · Mobile Prototype',
    desc: 'Mood-tracking and journaling app prototype. Expressive visual design focused on emotional wellness through intuitive interactions, playful UI language, and calming color palettes.',
    tech: ['Figma', 'UI/UX Design'],
    figma: 'https://www.figma.com/design/cd8VLOU8Sun2EPsPw0gApQ/mooji?node-id=0-1&t=375atgmqKy3hZJmH-1',
    proto: 'https://www.figma.com/proto/cd8VLOU8Sun2EPsPw0gApQ/mooji?node-id=14-2654&starting-point-node-id=14%3A2654&t=HtWaTJW4sH4ynYd1-1',
    img: 'assets/projects/Mooji.png',
    bg: 'linear-gradient(135deg,#4a0072,#ce93d8)',
    date: '2024',
    type: 'prototype',
  },
  {
    num: '01',
    title: 'Zapp',
    cat: 'UI/UX · Mobile Prototype',
    desc: 'High-fidelity mobile prototype for an e-commerce and online shopping application. Features a bold visual identity, intuitive product browsing, streamlined checkout flows, and gesture-driven navigation.',
    tech: ['Figma', 'UI/UX Design'],
    figma: 'https://www.figma.com/design/hieG68XrBAf66lL4BeMYjI/Zapp?node-id=0-1&t=4cGijuZrbIdTaqDX-1',
    proto: 'https://www.figma.com/proto/hieG68XrBAf66lL4BeMYjI/Zapp?node-id=0-1&t=4cGijuZrbIdTaqDX-1',
    img: 'assets/projects/Zapp.png',
    bg: 'linear-gradient(135deg,#7f1d1d,#fca5a5)',
    date: '2024',
    type: 'prototype',
  },
  {
    num: '08',
    title: 'gwenndestura',
    cat: 'Portfolio · Web',
    desc: 'Personal portfolio website built from scratch as a Computer Science student specializing in Intelligent Systems. Designed and developed with a focus on clean UI, dark/light theming, smooth scroll animations, interactive project modals, and bento-style layouts. Deployed on Vercel.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    github: 'https://github.com/gwenndestura/gwenndestura.git',
    live: 'https://gwenndestura.vercel.app',
    img: 'assets/projects/gwenndestura.png',
    bg: 'linear-gradient(135deg,#070E1C,#1a3a6e)',
    date: '2025',
    type: 'project',
  },
];

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

/* Mobile menu toggle */
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* Mobile theme toggle */
const themeToggleMobile = document.getElementById('themeToggleMobile');
function syncMobileTheme(theme) {
  if (themeToggleMobile) {
    themeToggleMobile.innerHTML = theme === 'dark' ? svgSun() : svgMoon();
  }
}
syncMobileTheme(savedTheme);
if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    syncMobileTheme(next);
    localStorage.setItem('pgd-theme', next);
  });
}

/* ============================================================
   SCROLL SPY + MOVING SIDE NAV INDICATOR
   ============================================================ */
const sections      = document.querySelectorAll('section[id]');
const snavItems     = document.querySelectorAll('.snav-item[data-sec]');
const snavTrack     = document.getElementById('snavTrack');
const snavIndicator = document.getElementById('snavIndicator');
const snavActiveIcon = document.getElementById('snavActiveIcon');

const SECTION_ICONS = {
  home: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/>',
  stack: '<rect x="2" y="3" width="20" height="6" rx="1"/><rect x="2" y="10" width="20" height="6" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>',
  projects: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  experience: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  achievements: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17a2 2 0 0 1-2 2H6"/><path d="M14 14.66V17a2 2 0 0 1 2 2h2"/><path d="M6 2v7a6 6 0 0 0 12 0V2"/><line x1="12" y1="2" x2="12" y2="9"/>',
  contact: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
};

function getSnavDotCenter(sectionId) {
  const item = document.querySelector(`.snav-item[data-sec="${sectionId}"]`);
  if (!item || !snavTrack) return null;
  const dot = item.querySelector('.snav-dot');
  if (!dot) return null;
  const trackRect = snavTrack.getBoundingClientRect();
  const dotRect   = dot.getBoundingClientRect();
  return dotRect.top + dotRect.height / 2 - trackRect.top;
}

function updateSnavIndicator(sectionId, instant) {
  if (!snavIndicator || !snavTrack) return;
  const center = getSnavDotCenter(sectionId);
  if (center === null) return;

  if (instant) {
    snavIndicator.style.transition = 'none';
    snavIndicator.style.top = center + 'px';
    if (snavActiveIcon && SECTION_ICONS[sectionId]) {
      snavActiveIcon.innerHTML = SECTION_ICONS[sectionId];
    }
    /* re-enable transitions after the instant snap */
    requestAnimationFrame(() => {
      snavIndicator.style.transition = '';
    });
    return;
  }

  /* close → move → open */
  snavIndicator.classList.add('closing');

  setTimeout(() => {
    /* swap icon while hidden */
    if (snavActiveIcon && SECTION_ICONS[sectionId]) {
      snavActiveIcon.innerHTML = SECTION_ICONS[sectionId];
    }
    /* jump to new position (no slide transition while closed) */
    snavIndicator.style.transition = 'none';
    snavIndicator.style.top = center + 'px';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        snavIndicator.style.transition = '';
        snavIndicator.classList.remove('closing');
      });
    });
  }, 190); /* matches CSS 0.18s + tiny buffer */
}

let activeSec = 'home';

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activeSec = entry.target.id;
      snavItems.forEach(i => i.classList.remove('active'));
      const match = document.querySelector(`.snav-item[data-sec="${activeSec}"]`);
      if (match) match.classList.add('active');
      updateSnavIndicator(activeSec, false);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spy.observe(s));

/* Reposition indicator on resize — instant, no animation */
window.addEventListener('resize', () => updateSnavIndicator(activeSec, true), { passive: true });

/* Initial position after layout settles — instant */
requestAnimationFrame(() => updateSnavIndicator('home', true));

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));



/* ============================================================
   TYPEWRITER
   ============================================================ */
const typeEl = document.getElementById('typewriter');
const roles  = [
  'Full-Stack Developer',
  'AI/ML Researcher',
  'UI/UX Designer',
  'CS Student @ DLSU-D',
];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;

function tick() {
  if (!typeEl) return;
  const current = roles[roleIdx];
  if (deleting) {
    charIdx--;
    typeEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(tick, 420);
      return;
    }
    setTimeout(tick, 48);
  } else {
    charIdx++;
    typeEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(tick, 2000);
      return;
    }
    setTimeout(tick, 78);
  }
}
setTimeout(tick, 900);

/* ============================================================
   PROJECT FILTER BAR
   ============================================================ */
const filterTabs    = document.querySelectorAll('.f-tab');
const pcards        = document.querySelectorAll('.pcard');
const pcardSeeWrap  = document.querySelector('.btn-see-more[data-grid="pcard-grid"]')?.closest('.see-more-wrap');
let   pcardExpanded = false;

function applyProjectFilter() {
  const filter = document.querySelector('.f-tab.active')?.dataset.filter || 'all';

  pcards.forEach(card => {
    const type    = card.dataset.type || 'project';
    const isExtra = card.classList.contains('hidden-init');

    if (filter === 'all') {
      card.style.display = (isExtra && !pcardExpanded) ? 'none' : '';
    } else {
      // Explicit block overrides the hidden-init CSS rule
      card.style.display = (type === filter) ? 'block' : 'none';
      // Trigger reveal on first-time-visible extra cards
      if (type === filter && isExtra) revealObs.observe(card);
    }
  });

  // Show see-more wrap only in "all" view
  if (pcardSeeWrap) pcardSeeWrap.style.display = (filter === 'all') ? '' : 'none';
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyProjectFilter();
  });
});

/* ============================================================
   PROJECT MODAL
   ============================================================ */
const modal      = document.getElementById('modal');
const modalBack  = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');

const modalPreview = document.getElementById('modalPreview');
const modalPg      = document.getElementById('modalPg');
const modalNum     = document.getElementById('modalProjNum');
const modalTitle   = document.getElementById('modalTitle');
const modalCat     = document.getElementById('modalCat');
const modalDesc    = document.getElementById('modalDesc');
const modalTags    = document.getElementById('modalTags');
const modalLinks   = document.getElementById('modalLinks');
const modalPrev    = document.getElementById('modalPrev');
const modalNext    = document.getElementById('modalNext');

let currentProj = 0;

function openModal(idx) {
  currentProj = ((idx % projects.length) + projects.length) % projects.length;
  renderModal();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderModal() {
  const p = projects[currentProj];
  modalPreview.style.background = p.bg;
  modalPreview.style.backgroundImage = p.img ? `url(${p.img})` : '';
  modalPreview.style.backgroundSize  = 'cover';
  modalPreview.style.backgroundPosition = 'center top';
  if (modalPg)  modalPg.textContent  = `${String(currentProj + 1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  if (modalNum) modalNum.textContent  = `PROJECT · ${p.num}`;
  modalTitle.textContent = p.title;
  modalCat.textContent   = p.cat;
  modalDesc.textContent  = p.desc;

  modalTags.innerHTML = p.tech.map(t =>
    `<span class="ftag">${t}</span>`
  ).join('');

  const links = [];
  if (p.live)   links.push(`<a href="${p.live}"   target="_blank" rel="noopener" class="modal-link-live">↗ Visit Live</a>`);
  if (p.github) links.push(`<a href="${p.github}" target="_blank" rel="noopener" class="modal-link-gh">GitHub</a>`);
  if (p.figma)  links.push(`<a href="${p.figma}"  target="_blank" rel="noopener" class="modal-link-fig">Figma</a>`);
  if (p.proto)  links.push(`<a href="${p.proto}"  target="_blank" rel="noopener" class="modal-link-proto">▶ Prototype</a>`);
  modalLinks.innerHTML = links.join('');
}

/* Open triggers */
const featuredCard = document.querySelector('.featured[data-project]');
if (featuredCard) {
  featuredCard.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    openModal(parseInt(featuredCard.dataset.project));
  });
}

document.querySelectorAll('.pcard[data-project]').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    openModal(parseInt(card.dataset.project));
  });
});

/* Nav buttons */
if (modalPrev) modalPrev.addEventListener('click', e => { e.stopPropagation(); openModal(currentProj - 1); });
if (modalNext) modalNext.addEventListener('click', e => { e.stopPropagation(); openModal(currentProj + 1); });

/* Close */
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBack)  modalBack.addEventListener('click',  closeModal);

/* Keyboard */
document.addEventListener('keydown', e => {
  if (!modal || !modal.classList.contains('open')) return;
  if (e.key === 'Escape')     closeModal();
  if (e.key === 'ArrowLeft')  openModal(currentProj - 1);
  if (e.key === 'ArrowRight') openModal(currentProj + 1);
});

/* ============================================================
   SEE MORE / SHOW LESS — grid-level toggle
   ============================================================ */
document.querySelectorAll('.btn-see-more').forEach(btn => {
  const gridId   = btn.dataset.grid;
  const container = gridId === 'pcard-grid'
    ? document.querySelector('.pcard-grid')
    : document.getElementById(gridId);
  if (!container) return;

  const extras   = Array.from(container.querySelectorAll('.hidden-init'));
  const moreText = btn.textContent;
  const lessText = moreText.replace('Show all', 'Show less').replace('↓', '↑');
  let expanded   = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    if (gridId === 'pcard-grid') pcardExpanded = expanded;
    if (expanded) {
      extras.forEach(el => {
        el.classList.remove('hidden-init');
        el.style.display = '';
        revealObs.observe(el);
      });
      btn.textContent = lessText;
    } else {
      extras.forEach(el => {
        el.classList.add('hidden-init');
        el.style.display = 'none';
      });
      btn.textContent = moreText;
    }
  });
});

/* ============================================================
   ACHIEVEMENTS TABS
   ============================================================ */
const achTabs   = document.querySelectorAll('.ach-tab');
const achPanels = document.querySelectorAll('.ach-panel');

achTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    achTabs.forEach(t => t.classList.remove('active'));
    achPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.panel);
    if (target) target.classList.add('active');
  });
});

/* ============================================================
   CERT LIGHTBOX
   ============================================================ */
const certLightbox  = document.getElementById('certLightbox');
const certlbImgsEl  = document.getElementById('certLbImgs');
const certlbClose   = document.getElementById('certLbClose');
const certlbBack    = document.getElementById('certLbBackdrop');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const imgs = Array.from(card.querySelectorAll('.cert-img'));
    if (!imgs.length || !certLightbox || !certlbImgsEl) return;
    certlbImgsEl.innerHTML = imgs.map(img =>
      `<img src="${img.src}" alt="${img.alt}" />`
    ).join('');
    certlbImgsEl.className = 'certlb-imgs' + (imgs.length > 1 ? ' certlb-dual' : '');
    certLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  if (!certLightbox) return;
  certLightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (certlbClose) certlbClose.addEventListener('click', closeLightbox);
if (certlbBack)  certlbBack.addEventListener('click',  closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && certLightbox?.classList.contains('open')) closeLightbox();
});

/* ============================================================
   NAV SCROLL BEHAVIOR
   ============================================================ */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}


/* ============================================================
   3D CARD TILT
   ============================================================ */
document.querySelectorAll('.pcard, .featured').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transition = 'box-shadow .22s ease, border-color .22s ease';
    card.style.transform  = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = '';
    card.style.transform  = '';
  });
});

/* ============================================================
   TECH GRID STAGGER POP-IN
   ============================================================ */
document.querySelectorAll('.tech-grid').forEach(grid => {
  const tiles = Array.from(grid.querySelectorAll('.tech-tile'));
  tiles.forEach((tile, i) => {
    tile.style.opacity   = '0';
    tile.style.transform = 'translateY(14px) scale(.88)';
    tile.style.transition = `opacity .38s ease ${i * .04}s, transform .38s cubic-bezier(.34,1.56,.64,1) ${i * .04}s`;
  });
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      tiles.forEach(tile => { tile.style.opacity = '1'; tile.style.transform = ''; });
      obs.disconnect();
    }
  }, { threshold: .08 });
  obs.observe(grid);
});

/* ============================================================
   COUNT-UP NUMBERS
   ============================================================ */
function countUp(el) {
  const raw = el.textContent.trim();
  const m = raw.match(/^(\d+)(.*)$/);
  if (!m) return;
  const target = parseInt(m[1]), suffix = m[2];
  let n = 0;
  const steps = 36, interval = 900 / steps;
  const t = setInterval(() => {
    n = Math.min(n + target / steps, target);
    el.textContent = Math.round(n) + suffix;
    if (n >= target) clearInterval(t);
  }, interval);
}

function watchCountUp(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      el.querySelectorAll('.bento-val, .stat-val').forEach(countUp);
      obs.disconnect();
    }
  }, { threshold: .3 });
  obs.observe(el);
}
watchCountUp('.about-bento');
watchCountUp('.hero-stats');

/* ============================================================
   TIMELINE SLIDE-IN FROM LEFT
   ============================================================ */
document.querySelectorAll('.timeline').forEach(tl => {
  tl.querySelectorAll('.tl-item').forEach((item, i) => {
    item.classList.add('reveal-left');
    item.style.transitionDelay = `${i * .1}s`;
    revealObs.observe(item);
  });
});


/* ============================================================
   CURSOR SPOTLIGHT
   ============================================================ */
(function () {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  const half = 350;
  let visible = false;
  document.addEventListener('mousemove', e => {
    glow.style.transform = `translate(${e.clientX - half}px, ${e.clientY - half}px)`;
    if (!visible) { glow.style.opacity = '1'; visible = true; }
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    visible = false;
  });
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

/* ============================================================
   SECTION HEADER REVEALS
   ============================================================ */
document.querySelectorAll('.section-header, .section-hrow').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top >= window.innerHeight) {
    el.classList.add('reveal');
    revealObs.observe(el);
  }
});
