const game = document.getElementById("gameArea");
const score = document.getElementById("score");
const done = document.getElementById("completed");
const hint = document.getElementById("gameHint");
const TOTAL = 10;
let found = 0;
const hearts = [];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";

  const rect = game.getBoundingClientRect();
  const size = 40;
  const x = randomBetween(0, rect.width - size);
  const y = randomBetween(0, rect.height - size);

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  const speed = randomBetween(0.3, 0.7);
  const angle = randomBetween(0, Math.PI * 2);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  const item = {
    element: heart,
    x,
    y,
    vx,
    vy,
    found: false,
  };

  heart.addEventListener("click", () => {
    if (item.found) return;
    item.found = true;
    item.vx = 0;
    item.vy = 0;
    heart.classList.remove("running");
    heart.classList.add("caught");
    heart.style.pointerEvents = "none";

    found += 1;
    score.textContent = `${found} / ${TOTAL} Found`;

    playConfettiSound();
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => heart.remove(), 500);

    if (found === TOTAL) {
      hint.classList.add("hidden");
      setTimeout(() => {
        playConfettiSound();
        confetti({
          particleCount: 260,
          spread: 160,
          origin: { y: 0.5 },
        });
        done.classList.add("show");
      }, 700);
    }
  });

  hearts.push(item);
  game.appendChild(heart);
}

function updateHearts() {
  const rect = game.getBoundingClientRect();

  hearts.forEach((item) => {
    if (item.found) return;

    item.x += item.vx;
    item.y += item.vy;

    const width = item.element.offsetWidth;
    const height = item.element.offsetHeight;

    if (item.x < 0 || item.x > rect.width - width) {
      item.vx *= -1;
      item.x = Math.min(Math.max(item.x, 0), rect.width - width);
    }

    if (item.y < 0 || item.y > rect.height - height) {
      item.vy *= -1;
      item.y = Math.min(Math.max(item.y, 0), rect.height - height);
    }

    item.element.style.left = `${item.x}px`;
    item.element.style.top = `${item.y}px`;
  });

  requestAnimationFrame(updateHearts);
}

for (let i = 0; i < TOTAL; i += 1) {
  createHeart();
}

updateHearts();

document.getElementById("unlock").onclick = () => {
  document.body.classList.add("page-transitioning");
  setTimeout(() => {
    window.location.href = "letter.html";
  }, 250);
};