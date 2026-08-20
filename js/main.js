const menuToggle = document.querySelector("#menu-toggle");
const mainMenu = document.querySelector("#main-menu");
const year = document.querySelector("#current-year");
const carousel = document.querySelector("[data-carousel]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && mainMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (carousel) {
  const slides = [
    {
      src: "assets/img/gestion-01.jpeg",
      alt: "Maquinaria municipal trabajando sobre un camino de tierra junto a vecinos.",
      title: "Trabajo en caminos rurales",
      description: "Equipos municipales intervienen calles y caminos para mejorar la circulación de las comunidades.",
    },
    {
      src: "assets/img/rogelio-comunidad.webp",
      alt: "Rogelio Nerón junto a vecinos y referentes comunitarios.",
      title: "Liderazgo con respaldo comunitario",
      description: "Una gestión que nace del territorio y mantiene cercanía con vecinos, comunidades y referentes locales.",
    },
    {
      src: "assets/img/gestion-02.jpeg",
      alt: "Rogelio Nerón supervisando tareas de maquinaria en un camino afectado por barro.",
      title: "Supervisión en territorio",
      description: "La gestión acompaña los trabajos de campo y sigue de cerca las necesidades de cada zona.",
    },
    {
      src: "assets/img/gestion-03.jpeg",
      alt: "Retroexcavadora realizando mejoras sobre una calle del municipio.",
      title: "Mejoramiento de calles",
      description: "Maquinaria pesada al servicio del mantenimiento urbano y la conectividad vecinal.",
    },
    {
      src: "assets/img/gestion-05.jpeg",
      alt: "Maquinaria municipal estacionada y lista para tareas de obra pública.",
      title: "Herramientas para hacer gestión",
      description: "Equipamiento municipal preparado para responder a obras, emergencias y mantenimiento.",
    },
    {
      src: "assets/img/gestion-09.jpeg",
      alt: "Rogelio Nerón recibiendo un reconocimiento institucional en un acto público.",
      title: "Representación institucional",
      description: "Santa Victoria Este presente en espacios de gestión, articulación y reconocimiento público.",
    },
    {
      src: "assets/img/gestion-11.jpeg",
      alt: "Vecinos reunidos alrededor de colectivos y vehículos municipales.",
      title: "Acompañamiento comunitario",
      description: "Presencia municipal junto a vecinos, familias y comunidades del territorio.",
    },
    {
      src: "assets/img/gestion-15.jpeg",
      alt: "Vehículos municipales estacionados en una plaza arbolada.",
      title: "Movilidad para llegar más lejos",
      description: "Vehículos destinados a fortalecer la atención, el traslado y la presencia en los parajes.",
    },
  ];
  const image = carousel.querySelector("[data-carousel-image]");
  const title = carousel.querySelector("[data-carousel-title]");
  const description = carousel.querySelector("[data-carousel-description]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");
  let currentSlide = 0;
  let carouselTimer;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver imagen ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer?.appendChild(dot);
    return dot;
  });

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    const slide = slides[currentSlide];

    carousel.classList.add("is-changing");

    window.setTimeout(() => {
      if (image) {
        image.src = slide.src;
        image.alt = slide.alt;
      }

      if (title) {
        title.textContent = slide.title;
      }

      if (description) {
        description.textContent = slide.description;
      }

      carousel.classList.remove("is-changing");
    }, 180);

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentSlide);
      dot.setAttribute("aria-current", dotIndex === currentSlide ? "true" : "false");
    });
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const startCarousel = () => {
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(nextSlide, 5200);
  };

  prevButton?.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    startCarousel();
  });

  nextButton?.addEventListener("click", () => {
    nextSlide();
    startCarousel();
  });

  carousel.addEventListener("mouseenter", () => window.clearInterval(carouselTimer));
  carousel.addEventListener("mouseleave", startCarousel);

  showSlide(0);
  startCarousel();
}
