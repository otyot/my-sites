const slides = Array.from(document.querySelectorAll(".slide"));
const dotsWrap = document.getElementById("dots");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const stage = document.getElementById("stage");

let current = 0;

const dots = slides.map((_, i) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.addEventListener("click", () => show(i));
  dotsWrap.appendChild(dot);
  return dot;
});

function show(i) {
  current = Math.max(0, Math.min(i, slides.length - 1));

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === current);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === current);
  });
}

next.addEventListener("click", () => show(current + 1));
prev.addEventListener("click", () => show(current - 1));

stage.addEventListener("click", (e) => {
  const x = e.clientX;
  const middle = window.innerWidth / 2;

  if (x > middle) {
    show(current + 1);
  } else {
    show(current - 1);
  }
});

show(0);
