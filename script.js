const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.header nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  nav.classList.toggle('open');
});

const body = document.body;

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    body.classList.add('scrolled');
  } else {
    body.classList.remove('scrolled');
  }
});

/* ===============================
   SERVICES ACCORDION
================================ */

const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
  const title = item.querySelector('.service-title');

  title.addEventListener('click', () => {
    // cerrar todos
    serviceItems.forEach(i => i.classList.remove('active'));

    // abrir el clickeado
    item.classList.add('active');
  });
});

/* ===============================
   BENEFICIOS ACCORDION
================================ */

const beneficiosItems = document.querySelectorAll('.beneficios-item');

beneficiosItems.forEach(item => {
  const title = item.querySelector('.beneficios-title');

  title.addEventListener('click', () => {
    // cerrar todos
    beneficiosItems.forEach(i => i.classList.remove('active'));

    // abrir el clickeado
    item.classList.add('active');
  });
});





/* ==============================================================
   02 -EFECTO DE OPACIDAD DOBRE EL ELEMENTO SELECCIONADO
============================================================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 220;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// =====================================================
// SCROLL CINEMATOGRÁFICO — DURACIÓN PROPORCIONAL
// =====================================================

function smoothScrollTo(targetY) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;

  // DURACIÓN CONTROLADA (tiempo de bajada scroll)
  const minDuration = 1600;
  const maxDuration = 3200;

  const duration = Math.min(
    Math.max(Math.abs(distance) * 0.55, minDuration),
    maxDuration
  );

  let startTime = null;

  function easeInOut(t) {
    return t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOut(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.pageYOffset - 200;
    history.pushState(null, "", link.getAttribute('href'));

    smoothScrollTo(targetY);
  });
});


/* =====================================================
   CONTACTO – DESPLEGAR FORMULARIO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".contact-intro");
  const form = document.getElementById("contactForm");

  if (!toggle || !form) return;

  toggle.addEventListener("click", () => {
    form.classList.toggle("open");
  });
});
