// ===============================
// GALERÍA PROYECTO — CASA GA
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const project = gallery.dataset.project;
  const total = parseInt(gallery.dataset.total, 10);

  // 👉 imágenes destacadas (2 columnas)
  const wideImages = [5, 7, 12];

  // ===============================
  // 1️⃣ CREAR IMÁGENES
  // ===============================
  for (let i = 1; i <= total; i++) {
    const figure = document.createElement("figure");

    if (wideImages.includes(i)) {
      figure.classList.add("is-wide");
    }

    const img = document.createElement("img");
    img.src = `../images/${project}/${String(i).padStart(2, "0")}.jpg`;
    img.alt = `Casa GA – Imagen ${i}`;
    img.loading = "lazy";

    figure.appendChild(img);
    gallery.appendChild(figure);
  }

  // ===============================
  // 2️⃣ FUNCIONES MASONRY
  // ===============================
  function resizeMasonryItem(item) {
    const rowHeight = parseInt(
      getComputedStyle(gallery).getPropertyValue("grid-auto-rows")
    );
    const gap = parseInt(
      getComputedStyle(gallery).getPropertyValue("gap")
    );

    const img = item.querySelector("img");
    if (!img.complete) return;

    const height = img.getBoundingClientRect().height;
    const rows = Math.ceil((height + gap) / (rowHeight + gap));
    item.style.setProperty("--rows", rows);
  }

  function resizeAllMasonryItems() {
    gallery.querySelectorAll("figure").forEach(item => {
      resizeMasonryItem(item);
    });
  }

  // ===============================
  // 3️⃣ CALCULAR AL CARGAR IMÁGENES
  // ===============================
  gallery.querySelectorAll("img").forEach(img => {
    img.onload = () => {
      resizeAllMasonryItems();
    };
  });

  // ===============================
  // 4️⃣ RECALCULAR AL REDIMENSIONAR
  // ===============================
  window.addEventListener("resize", () => {
    resizeAllMasonryItems();
  });
});



