const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 0.3;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.25 + 0.05;
        this.direction = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        this.alpha += this.speed * this.direction;

        if (this.alpha >= 1) {
            this.alpha = 1;
            this.direction = -1;
        }

        if (this.alpha <= 0.1) {
            this.alpha = 0.1;
            this.direction = 1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 250; i++) {
    stars.push(new Star());
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();