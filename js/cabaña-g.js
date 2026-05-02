// ===============================
// GALERÍA PROYECTO — CABAÑA G
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const project = gallery.dataset.project;
  const total = parseInt(gallery.dataset.total, 10);

  // 👉 imágenes destacadas (2 columnas)
  const wideImages = [1, 4, 7];

  // 👉 Lista de extensiones según el inventario de imágenes
  const extensions = {
    1: 'jpg',
    2: 'jpg',
    3: 'jpg',
    4: 'jpg',
    5: 'jpg',
    6: 'jpg',
    7: 'jpg',
    8: 'jpg',
    9: 'jpg',
    10: 'jpg',
    11: 'jpg',
    12: 'jpg',
    13: 'jpg'
  };

  // Array para guardar las rutas de las imágenes para el lightbox
  const imagesList = [];

  // ===============================
  // 1️⃣ CREAR IMÁGENES
  // ===============================
  for (let i = 1; i <= total; i++) {
    const figure = document.createElement("figure");

    if (wideImages.includes(i)) {
      figure.classList.add("is-wide");
    }

    const ext = extensions[i] || 'jpg';
    const imgSrc = `../images/${project}/${String(i).padStart(2, "0")}.${ext}`;
    imagesList.push(imgSrc);

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = `Cabaña G – Imagen ${i}`;
    img.loading = "lazy";

    // Al hacer click, abrir lightbox
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(i - 1));

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
    ) || 10;

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
  // 3️⃣ INIT MASONRY
  // ===============================
  gallery.querySelectorAll("img").forEach(img => {
    img.onload = () => {
      resizeAllMasonryItems();
    };
  });

  window.addEventListener("resize", () => {
    resizeAllMasonryItems();
  });

  // ===============================
  // 4️⃣ LIGHTBOX LOGIC
  // ===============================

  // Inject Lightbox HTML
  const lightboxHTML = `
    <div id="lightbox">
      <button class="lightbox-btn lightbox-close" aria-label="Cerrar">
        <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="lightbox-btn lightbox-prev" aria-label="Anterior">
        <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="lightbox-btn lightbox-next" aria-label="Siguiente">
        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <figure>
        <img src="" alt="Lightbox image">
      </figure>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", lightboxHTML);

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const btnClose = lightbox.querySelector(".lightbox-close");
  const btnPrev = lightbox.querySelector(".lightbox-prev");
  const btnNext = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scroll
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Enable scroll
  }

  function updateLightboxImage() {
    lightboxImg.src = imagesList[currentIndex];
  }

  function nextImage(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % imagesList.length;
    updateLightboxImage();
  }

  function prevImage(e) {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
    updateLightboxImage();
  }

  // Event Listeners
  btnClose.addEventListener("click", closeLightbox);
  btnNext.addEventListener("click", nextImage);
  btnPrev.addEventListener("click", prevImage);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

});
