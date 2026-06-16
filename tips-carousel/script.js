const carousel = document.getElementById('carousel');
const dots = Array.from(document.querySelectorAll('.dot'));

function goToSlide(index) {
  const slideWidth = carousel.clientWidth;
  carousel.scrollTo({
    left: index * slideWidth,
    behavior: 'smooth'
  });
}

function setActiveDot(index) {
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

function getCurrentSlideIndex() {
  return Math.round(carousel.scrollLeft / carousel.clientWidth);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => goToSlide(index));
});

let scrollTimer;
carousel.addEventListener('scroll', () => {
  window.clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    setActiveDot(getCurrentSlideIndex());
  }, 80);
});

window.addEventListener('resize', () => {
  goToSlide(getCurrentSlideIndex());
});
