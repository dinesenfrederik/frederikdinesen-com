'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
}

export default function ArticleAmbience() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 500);

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 90,
    };

    // Initialize 35 particles
    const particleCount = Math.min(40, Math.floor((width * height) / 12000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off canvas boundaries
        if (p.x < 0 || p.x > width) p.speedX = -p.speedX;
        if (p.y < 0 || p.y > height) p.speedY = -p.speedY;

        // Mouse gentle repel
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // Pulse opacity
        p.opacity += Math.sin(Date.now() * 0.002 + i) * 0.005;
        const clampedOpacity = Math.max(0.15, Math.min(0.7, p.opacity));

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 159, 10, ${clampedOpacity})`;
        ctx.shadowColor = 'rgba(255, 159, 10, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-[550px] overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Studio Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#222228_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />

      {/* Atmospheric Amber Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
    </div>
  );
}
