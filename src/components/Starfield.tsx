import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  className?: string;
}

/**
 * Deep Space Starfield Background Animation v2
 * Features:
 * - Orbital Rotation (stars orbit center)
 * - Mouse Parallax (tilt effect)
 * - Shooting Stars (random streaks)
 * - Pulsing Nebula
 */
const Starfield: React.FC<StarfieldProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const starCount = 600;
    const rotationSpeed = 0.0003;
    let mouseX = 0;
    let mouseY = 0;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
    });

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
      brightness: number;
      twinkleSpeed: number;
      angle: number;
      radius: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = Math.random() * 1000 + 100;
        this.size = Math.random() * 2 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * Math.max(canvas.width, canvas.height) * 1.5;
        
        const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
        this.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        this.brightness = Math.random();
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
      }

      update() {
        // Orbital rotation
        this.angle += rotationSpeed * (1000 / this.z); // Parallax rotation

        // Twinkling
        this.brightness += this.twinkleSpeed;
        if (this.brightness > 1 || this.brightness < 0.2) {
          this.twinkleSpeed *= -1;
        }
      }

      draw() {
        if (!ctx) return;

        // Project 3D orbit to 2D
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Apply mouse parallax to center
        const centerX = cx - mouseX * (1000 / this.z);
        const centerY = cy - mouseY * (1000 / this.z);

        const x2d = centerX + Math.cos(this.angle) * this.radius;
        const y2d = centerY + Math.sin(this.angle) * this.radius;

        // Don't draw if off screen
        if (x2d < -50 || x2d > canvas.width + 50 || y2d < -50 || y2d > canvas.height + 50) return;

        // Draw star
        const alpha = this.brightness * (1 - this.z / 2000);
        
        // Glow
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, this.size * 3);
        gradient.addColorStop(0, this.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`));
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x2d - this.size * 3, y2d - this.size * 3, this.size * 6, this.size * 6);

        ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        ctx.beginPath();
        ctx.arc(x2d, y2d, this.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Shooting Star logic
    class ShootingStar {
      x: number;
      y: number;
      len: number;
      speed: number;
      size: number;
      waitTime: number;
      active: boolean;
      angle: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.len = 0;
        this.speed = 0;
        this.size = 0;
        this.angle = 0;
        this.waitTime = Math.random() * 200;
        this.active = false;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1 + 0.1;
        this.waitTime = Math.random() * 800 + 200; // Frames to wait
        this.active = false;
        this.angle = Math.random() * Math.PI / 4 + Math.PI; // Diagonal down-left mostly
      }

      update() {
        if (this.active) {
          this.x -= this.speed * Math.cos(this.angle); // Movement
          this.y += this.speed * Math.sin(this.angle);
          if (this.x < -this.len || this.y > canvas.height + this.len) {
            this.reset();
          }
        } else {
          this.waitTime--;
          if (this.waitTime <= 0) {
            this.active = true;
          }
        }
      }

      draw() {
        if (!this.active || !ctx) return;
        
        const tailX = this.x + this.len * Math.cos(this.angle);
        const tailY = this.y - this.len * Math.sin(this.angle);

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    }

    // Initialize
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const shootingStar = new ShootingStar();

    // Animation Loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = '#020617'; // Keep trail/fade? No, clear for crisp movement
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle nebula clouds (noise based or simple gradients)
      const time = Date.now() * 0.0005;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100, 
        canvas.height / 2 + Math.cos(time) * 100, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(76, 29, 149, 0.15)'); // Violet center
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      shootingStar.update();
      shootingStar.draw();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', () => {});
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
