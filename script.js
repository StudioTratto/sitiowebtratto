const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
}

const body = document.body;

window.addEventListener('scroll', () => {
  if (nav.classList.contains('open')) return;
  if (window.scrollY > 60) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

if (nav) {
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle) menuToggle.classList.remove('open');
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

/* ===============================
   SERVICES ACCORDION
================================ */

const serviceItems = document.querySelectorAll('.service-item');

if (serviceItems.length > 0) {
  serviceItems.forEach(item => {
    const title = item.querySelector('.service-title');

    if (title) {
      title.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // cerrar todos
        serviceItems.forEach(i => i.classList.remove('active'));

        // si NO estaba activo, abrirlo (si estaba activo, se quedará cerrado)
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ===============================
   BENEFICIOS ACCORDION
================================ */

const beneficiosItems = document.querySelectorAll('.beneficios-item');

if (beneficiosItems.length > 0) {
  beneficiosItems.forEach(item => {
    const header = item.querySelector('.beneficios-header');

    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        beneficiosItems.forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}




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

/* =====================================================
   HERO SLIDESHOW – FADE CINEMATOGRÁFICO
===================================================== */

const slides = document.querySelectorAll('.hero-slides img');
let currentSlide = 0;
const slideInterval = 4500; // tiempo entre slides (ms)

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, slideInterval);

/* =====================================================
   HERO SLIDESHOW – CONTENCION CELULARES
===================================================== */

function setHeroHeight() {
  const hero = document.querySelector('.hero-slideshow');
  if (!hero) return;

  hero.style.height = window.innerHeight + 'px';
}

// inicial
setHeroHeight();

// cuando gira el teléfono
window.addEventListener('orientationchange', () => {
  setTimeout(setHeroHeight, 300);
});

// cuando cambia el tamaño
window.addEventListener('resize', () => {
  setHeroHeight();
});

/* =====================================================
   LOGO STUDIO TRATTO DEVUELVE AL INICIO
===================================================== */

const logoLink = document.querySelector('.logo-link');

if (logoLink) {
  logoLink.addEventListener('click', function (e) {
    // 1. Cerrar menú móvil siempre
    if (document.querySelector('.menu-toggle')?.classList.contains('open')) {
      document.querySelector('.menu-toggle').classList.remove('open');
      document.querySelector('.nav').classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    // 2. Verificar si es un enlace ancla (misma página)
    const href = this.getAttribute('href');
    const isAnchor = href.startsWith('#');

    // Si es ancla (estamos en index y href="#top"), prevenir default y scrolear
    if (isAnchor) {
      e.preventDefault();
      history.pushState(null, "", href);
      smoothScrollTo(0);
    }
    // Si no es ancla (ej: vamos de proyectos.html a index.html), dejar que navegue normal
  });
}

/* =====================================================
   GALERIA INTERACTIVA
===================================================== */

const galleryItems = document.querySelectorAll('.galeria .item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    galleryItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

/* ============================
   FADE IN AL HACER SCROLL
============================ */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

// ===============================
// RESET TOTAL AL VOLVER AL INDEX
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-go-home").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // reset TOTAL de estados
      sessionStorage.clear();
      localStorage.removeItem("introSeen");
      localStorage.removeItem("skipIntro");

      // navegación REAL (no scroll)
      window.location.href = "/index.html";
    });
  });
});

// ===============================
// PAGINA DE PROYECTOS
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-landing");

if (filterButtons.length > 0 && projects.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // estado activo
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      projects.forEach(project => {
        const category = project.dataset.category;

        if (filter === "all" || category === filter) {
          project.classList.remove("is-hidden");
        } else {
          project.classList.add("is-hidden");
        }
      });
    });
  });
}

// ===============================
// CARRUSEL DE CROQUIS — LOOP INFINITO
// ===============================

const track = document.querySelector(".js-carrusel-track");

if (track) {
  const items = Array.from(track.children);

  let position = 0;
  let speed = 0.4; // velocidad (ajustable)

  // duplicamos items
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  const totalWidth = items.reduce((acc, item) => {
    return acc + item.offsetWidth + 24; // gap
  }, 0);

  function animate() {
    position -= speed;

    if (Math.abs(position) >= totalWidth) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}



