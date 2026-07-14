/* =========================================================================
   Interactions: reveal-on-scroll, active nav link, nav shadow, footer year,
   and the animated hero (a sound wave whose crests carry orbiting "particles"
   — music meets science). All vanilla JS, no dependencies.
   ========================================================================= */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------- footer year --------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ------------------ reveal on scroll ------------------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !prefersReduced) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  // Fallback: just show everything.
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* --------------- active nav + nav shadow --------------- */
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('main .section');
const navLinks = document.querySelectorAll('.nav__links a');

const linkFor = (id) =>
  document.querySelector(`.nav__links a[href="#${id}"]`);

if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('is-active'));
        const link = linkFor(entry.target.id);
        if (link) link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach((s) => spy.observe(s));
}

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

/* ------------------- animated hero --------------------- */
/* A layered sine wave (the "music") with points that pulse along it and
   drift like orbiting particles (the "science"). Respects reduced-motion. */
const canvas = document.getElementById('waveCanvas');
if (canvas && !prefersReduced) {
  const ctx = canvas.getContext('2d');
  let w, h, dpr, t = 0;
  const SCI = '#d63f2f', MUS = '#f5820a', ACC = '#e8613c';

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Three stacked waves, each a blend of two frequencies.
  const waves = [
    { amp: 0.10, freq: 1.4, speed: 0.6, color: SCI, alpha: 0.55, phase: 0 },
    { amp: 0.07, freq: 2.1, speed: -0.4, color: ACC, alpha: 0.45, phase: 1.5 },
    { amp: 0.13, freq: 0.9, speed: 0.3, color: MUS, alpha: 0.40, phase: 3.0 },
  ];

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const mid = h * 0.5;

    waves.forEach((wave, wi) => {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const nx = x / w;
        const y =
          mid +
          Math.sin(nx * Math.PI * 2 * wave.freq + t * wave.speed + wave.phase) *
            (h * wave.amp) +
          Math.sin(nx * Math.PI * 2 * wave.freq * 0.5 - t * wave.speed) *
            (h * wave.amp * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.alpha;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbiting particles riding the top wave.
      if (wi === 0) {
        for (let i = 0; i < 7; i++) {
          const px = ((i / 7) + (t * 0.02)) % 1;
          const x = px * w;
          const nx = px;
          const y =
            mid +
            Math.sin(nx * Math.PI * 2 * wave.freq + t * wave.speed + wave.phase) *
              (h * wave.amp) +
            Math.sin(nx * Math.PI * 2 * wave.freq * 0.5 - t * wave.speed) *
              (h * wave.amp * 0.4);
          const r = 2 + Math.sin(t * 2 + i) * 1.2;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1, r), 0, Math.PI * 2);
          ctx.fillStyle = i % 2 ? MUS : SCI;
          ctx.globalAlpha = 0.9;
          ctx.fill();
        }
      }
    });

    ctx.globalAlpha = 1;
    t += 0.016;
    requestAnimationFrame(draw);
  }
  draw();
}
