import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Handle Mouse Move for Parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) * 0.05, // Sensitivity
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Star Configuration ---
    const starCount = 200; // Increased count
    const stars: { x: number; y: number; baseX: number; baseY: number; size: number; alpha: number; speed: number; twinkleSpeed: number }[] = [];

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      stars.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2,
        alpha: Math.random(),
        speed: Math.random() * 0.05 + 0.01,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // --- Nebula Cloud Configuration ---
    const colors = [
      { r: 74, g: 144, b: 226 },  // Blue
      { r: 124, g: 77, b: 255 },  // Violet
      { r: 220, g: 20, b: 60 },   // Crimson
      { r: 0, g: 255, b: 224 },   // Cyan
    ];

    const clouds: { x: number; y: number; radius: number; color: any; vx: number; vy: number; t: number }[] = [];
    const cloudCount = 6;

    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 400 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        t: Math.random() * Math.PI * 2,
      });
    }

    // --- Animation Loop ---
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse Parallax Offset
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Draw Nebula Clouds (Background Layer)
      ctx.globalCompositeOperation = 'screen';
      
      clouds.forEach(cloud => {
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;
        
        // Pulsate radius slightly
        const pulse = Math.sin(time + cloud.t) * 20;

        // Wrap around screen
        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
        if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;

        // Apply slight parallax to clouds (slower than stars)
        const drawX = cloud.x - mx * 0.5;
        const drawY = cloud.y - my * 0.5;

        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, cloud.radius + pulse);
        gradient.addColorStop(0, `rgba(${cloud.color.r}, ${cloud.color.g}, ${cloud.color.b}, 0.12)`);
        gradient.addColorStop(1, `rgba(${cloud.color.r}, ${cloud.color.g}, ${cloud.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(drawX, drawY, cloud.radius + pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Stars (Foreground Layer)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#FFF';
      
      stars.forEach(star => {
        // Twinkle
        star.alpha += Math.sin(time * 100 * star.twinkleSpeed) * 0.01;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;

        // Movement
        star.y -= star.speed;
        if (star.y < -10) {
            star.y = canvas.height + 10;
            star.x = Math.random() * canvas.width;
        }

        // Parallax
        const drawX = star.x - mx;
        const drawY = star.y - my;

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default SpaceBackground;