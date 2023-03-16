const canvas = document.getElementById('neuron-background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Neuron {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = 'rgba(173, 216, 230, 1)';
        ctx.strokeStyle = 'rgba(173, 216, 230, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

const neurons = [];

function init() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        neurons.push(new Neuron(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < neurons.length; i++) {
        neurons[i].update();
        neurons[i].draw();

        if (neurons[i].size <= 0.2) {
            neurons.splice(i, 1);
            i--;
        }
    }

    if (neurons.length < 100) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        neurons.push(new Neuron(x, y));
    }

    requestAnimationFrame(animate);
}

init();
animate();
