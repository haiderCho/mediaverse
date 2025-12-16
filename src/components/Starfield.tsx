import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  className?: string;
}

/**
 * Deep Space Starfield Background Animation
 * Inspired by antigravity.google with nebula/deep space theme
 */
const Starfield: React.FC<StarfieldProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Deep space nebula colors
    const nebulaColors = [
      { r: 138, g: 43, b: 226 },   // Blue-violet
      { r: 75, g: 0, b: 130 },     // Indigo
      { r: 72, g: 61, b: 139 },    // Dark slate blue
      { r: 123, g: 104, b: 238 },  // Medium slate blue
      { r: 147, g: 112, b: 219 },  // Medium purple
    ];

    // Star particle
    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      brightness: number;
      twinkleSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Better z-depth distribution (more stars in middle distance)
        this.z = Math.pow(Math.random(), 0.7) * 1200;
        this.size = Math.random() * 2.5 + 0.5;
        
        // Random nebula color
        const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
        this.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        // Slow drift
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        
        // Twinkling effect
        this.brightness = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        // Drift movement
        this.x += this.vx;
        this.y += this.vy;

        // Slowly move toward viewer
        this.z -= 0.5;

        // Twinkling
        this.brightness += this.twinkleSpeed;
        if (this.brightness > 1 || this.brightness < 0.3) {
          this.twinkleSpeed *= -1;
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Reset if too close
        if (this.z < 1) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        if (!ctx) return;

        // Calculate perspective
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = this.size * scale;

        // Don't draw if off screen
        if (x2d < -50 || x2d > canvas.width + 50 || y2d < -50 || y2d > canvas.height + 50) {
          return;
        }

        // Draw star with glow
        const alpha = this.brightness * (1 - this.z / 1000);
        
        // Outer glow
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 4);
        gradient.addColorStop(0, this.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`));
        gradient.addColorStop(0.2, this.color.replace('rgb', 'rgba').replace(')', `, ${alpha * 0.5})`));
        gradient.addColorStop(1, this.color.replace('rgb', 'rgba').replace(')', ', 0)'));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x2d - size * 4, y2d - size * 4, size * 8, size * 8);

        // Core star
        ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create stars with better distribution
    const stars: Star[] = [];
    const starCount = 500;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Nebula effect (background glow)
    const drawNebula = () => {
      const time = Date.now() * 0.0001;
      
      // Create multiple nebula clouds
      for (let i = 0; i < 3; i++) {
        const x = canvas.width / 2 + Math.sin(time + i * 2) * canvas.width * 0.3;
        const y = canvas.height / 2 + Math.cos(time + i * 1.5) * canvas.height * 0.3;
        const size = canvas.width * 0.6;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        const color = nebulaColors[i % nebulaColors.length];
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.03)`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.01)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear with deep space black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula
      drawNebula();

      // Update and draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default Starfield;
