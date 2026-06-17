const track = document.getElementById("track");
const slides = Array.from(track.children);
const dotsWrap = document.getElementById("dots");

let current = 0;
let startX = 0;
let currentX = 0;
let dragging = false;
let width = 0;

const dots = slides.map((_, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.addEventListener("click", () => goTo(index));
  dotsWrap.appendChild(dot);
  return dot;
});

function measure() {
  width = track.parentElement.offsetWidth;
}

function update() {
  track.style.transform = `translateX(${-current * width}px)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === current);
  });
}

function goTo(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  measure();
  update();
}

function onStart(x) {
  measure();
  dragging = true;
  startX = x;
  currentX = x;
  track.classList.add("dragging");
}

function onMove(x) {
  if (!dragging) return;

  currentX = x;
  const delta = currentX - startX;

  track.style.transform = `translateX(${(-current * width) + delta}px)`;
}

function onEnd() {
  if (!dragging) return;

  const delta = currentX - startX;
  const threshold = width * 0.18;

  if (delta < -threshold && current < slides.length - 1) {
    current++;
  } else if (delta > threshold && current > 0) {
    current--;
  }

  dragging = false;
  track.classList.remove("dragging");
  update();
}

track.addEventListener("touchstart", e => onStart(e.touches[0].clientX), { passive: true });
track.addEventListener("touchmove", e => onMove(e.touches[0].clientX), { passive: true });
track.addEventListener("touchend", onEnd);
track.addEventListener("touchcancel", onEnd);

track.addEventListener("mousedown", e => {
  e.preventDefault();
  onStart(e.clientX);
});

window.addEventListener("mousemove", e => onMove(e.clientX));
window.addEventListener("mouseup", onEnd);

window.addEventListener("resize", () => {
  measure();
  update();
});

measure();
update();