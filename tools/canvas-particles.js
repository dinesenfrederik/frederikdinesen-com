class Particle {
    constructor(x, y, speedX, speedY, size, canvasWidth, canvasHeight, ctx) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;
        this.density = (Math.random() * 20) + 1;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 159, 10, 0.5)'; // Amber
        this.ctx.fill();
    }
    
    update(mouse) {
        // Bounce off edges
        if (this.x > this.canvasWidth || this.x < 0) this.speedX = -this.speedX;
        if (this.y > this.canvasHeight || this.y < 0) this.speedY = -this.speedY;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse interaction - repel
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (mouse.radius - distance) / mouse.radius;
                let directionX = forceDirectionX * force * this.density * 0.5;
                let directionY = forceDirectionY * force * this.density * 0.5;
                
                this.x -= directionX;
                this.y -= directionY;
            }
        }
        
        this.draw();
    }
}

export function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    const mouse = {
        x: null,
        y: null,
        radius: 120
    };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });
    
    function setupCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        
        const numParticles = Math.min((width * height) / 12000, 150);
        
        for (let i = 0; i < numParticles; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 1.5 + 0.5;
            const speedX = (Math.random() - 0.5) * 0.4;
            const speedY = (Math.random() - 0.5) * 0.4;
            particles.push(new Particle(x, y, speedX, speedY, size, width, height, ctx));
        }
    }
    
    function connect() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = dx * dx + dy * dy;
                
                if (distance < 15000) {
                    let opacityValue = 1 - (distance / 15000);
                    ctx.strokeStyle = `rgba(255, 159, 10, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(mouse);
        }
        connect();
    }
    
    window.addEventListener('resize', () => {
        setupCanvas();
    });
    
    setupCanvas();
    animate();
}
