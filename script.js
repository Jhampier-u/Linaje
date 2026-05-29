// year
document.getElementById('year').textContent = new Date().getFullYear();

// nav scroll bg
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll(); window.addEventListener('scroll', onScroll);

// burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open')));

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
}, { threshold:.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// gallery: curated set (skip foto-11 used in hero, foto-32 used in about)
const used = new Set([11, 32]);
const photos = [];
for (let i = 1; i <= 49; i++){
  if (used.has(i)) continue;
  photos.push(`img/foto-${String(i).padStart(2,'0')}.jpg`);
}
const grid = document.getElementById('galleryGrid');
grid.innerHTML = photos.map((src, i) =>
  `<figure data-i="${i}"><img src="${src}" loading="lazy" alt="Linaje · momento ${i+1}"></figure>`
).join('');

// lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let current = 0;
const show = (i) => {
  current = (i + photos.length) % photos.length;
  lbImg.src = photos[current];
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
};
const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); };
grid.querySelectorAll('figure').forEach(f =>
  f.addEventListener('click', () => show(+f.dataset.i)));
document.getElementById('lbClose').addEventListener('click', close);
document.getElementById('lbNext').addEventListener('click', () => show(current+1));
document.getElementById('lbPrev').addEventListener('click', () => show(current-1));
lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') show(current+1);
  if (e.key === 'ArrowLeft') show(current-1);
});
