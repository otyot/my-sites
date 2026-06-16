const track = document.getElementById("track");
const slides = Array.from(track.children);
const dotsEl = document.getElementById("dots");

let index = 0, width = 0, startX = 0, currentX = 0, dragging = false;

const dots = slides.map((_, i) => {
  const b = document.createElement("button");
  b.className = "dot";
  b.type = "button";
  b.onclick = () => goTo(i);
  dotsEl.appendChild(b);
  return b;
});

function measure(){ width = track.getBoundingClientRect().width; }

function render(){
  track.style.transform = `translate3d(${index * width}px,0,0)`;
  slides.forEach((s,i)=>s.classList.toggle("active", i === index));
  dots.forEach((d,i)=>d.classList.toggle("active", i === index));
}

function goTo(i){
  index = Math.max(0, Math.min(i, slides.length - 1));
  render();
}

function start(x){
  measure(); dragging = true; startX = x; currentX = x;
  track.classList.add("dragging");
}

function move(x){
  if(!dragging) return;
  currentX = x;
  track.style.transform = `translate3d(${index * width + currentX - startX}px,0,0)`;
}

function end(){
  if(!dragging) return;
  const delta = currentX - startX;
  if(delta > width * 0.16 && index < slides.length - 1) index++;
  if(delta < -width * 0.16 && index > 0) index--;
  dragging = false;
  track.classList.remove("dragging");
  render();
}

track.addEventListener("touchstart", e => start(e.touches[0].clientX), {passive:true});
track.addEventListener("touchmove", e => move(e.touches[0].clientX), {passive:true});
track.addEventListener("touchend", end);

track.addEventListener("mousedown", e => { e.preventDefault(); start(e.clientX); });
window.addEventListener("mousemove", e => move(e.clientX));
window.addEventListener("mouseup", end);

window.addEventListener("resize", () => { measure(); render(); });

measure();
render();