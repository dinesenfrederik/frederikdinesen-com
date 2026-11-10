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
        this.ctx.fillStyle = 'rgba(255, 159, 10, 0.7)'; // Amber
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = 'rgba(255, 159, 10, 0.4)';
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
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
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });
    
    function setupCanvas() {
        const rect = canvas.getBoundingClientRect();
        width = canvas.width = canvas.offsetWidth || rect.width || window.innerWidth;
        height = canvas.height = canvas.offsetHeight || rect.height || window.innerHeight;
        particles = [];
        
        const numParticles = Math.min((width * height) / 10000, 130);
        
        for (let i = 0; i < numParticles; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 1.6 + 0.6;
            const speedX = (Math.random() - 0.5) * 0.45;
            const speedY = (Math.random() - 0.5) * 0.45;
            particles.push(new Particle(x, y, speedX, speedY, size, width, height, ctx));
        }
    }
    
    function connect() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = dx * dx + dy * dy;
                
                if (distance < 16000) {
                    let opacityValue = 1 - (distance / 16000);
                    ctx.strokeStyle = `rgba(255, 159, 10, ${opacityValue * 0.22})`;
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

