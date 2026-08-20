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
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
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

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentSlide);
    });

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
