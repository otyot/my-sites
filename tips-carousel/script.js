const carousel = document.getElementById("carousel");
const slides = Array.from(carousel.children);
const dotsWrap = document.getElementById("dots");

const dots = slides.map((_, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.addEventListener("click", () => {
    carousel.scrollTo({
      left: index * carousel.clientWidth,
      behavior: "smooth"
    });
  });
  dotsWrap.appendChild(dot);
  return dot;
});

function updateDots() {
  const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

carousel.addEventListener("scroll", updateDots);
window.addEventListener("resize", updateDots);

updateDots();
