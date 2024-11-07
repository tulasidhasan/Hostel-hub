// background-animation.js
const canvas = document.createElement("canvas");
canvas.id = "background";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle properties
const particles = [];
const particleCount = 100;
const maxDistance = 150;

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "#00c4ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animate particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Draw lines between nearby particles
        for (let j = index + 1; j < particleCount; j++) {
            const otherParticle = particles[j];
            const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);
            if (distance < maxDistance) {
                ctx.strokeStyle = "rgba(0, 196, 255, " + (1 - distance / maxDistance) + ")";
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}

animate();
