import React, { useEffect, useRef } from 'react';

interface HyperspaceProps {
  className?: string;
}

/**
 * Hyperspace Warp Animation
 * High-speed radial star streaks for a "Warp Drive" effect.
 */
const Hyperspace: React.FC<HyperspaceProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    
    // Configuration
    const starCount = 800;
    const speed = 0.1; // Base Z speed
    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center.x = canvas.width / 2;
      center.y = canvas.height / 2;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Star Class
    class Star {
      x: number;
      y: number;
      z: number;
      pz: number; // Previous Z for trail calculation
      color: string;

      constructor() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * canvas.width;
        this.pz = this.z;
        
        // Cyberpunk/Sci-fi colors
        const colors = [
          '#ffffff', // White
          '#a5b4fc', // Indigo-300
          '#67e8f9', // Cyan-300
          '#c084fc', // Purple-400
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move star closer (decrease Z)
        this.z -= 15; // Speed of travel

        // Reset if it passes the viewer
        if (this.z < 1) {
          this.z = canvas.width;
          this.x = (Math.random() - 0.5) * canvas.width * 2;
          this.y = (Math.random() - 0.5) * canvas.height * 2;
          this.pz = this.z;
        }
      }

      draw() {
        if (!ctx) return;

        // Current position
        const sx = (this.x / this.z) * canvas.width + center.x;
        const sy = (this.y / this.z) * canvas.height + center.y;

        // Previous position (for trail/streak)
        // We calculate where it "was" slightly further back in Z to create a streak
        // Or simply map pz.
        // Let's use a simpler streak logic:
        // The "tail" is just a projection with a slightly higher Z
        const tailZ = this.z + 20; 
        const px = (this.x / tailZ) * canvas.width + center.x;
        const py = (this.y / tailZ) * canvas.height + center.y;

        // Don't draw if out of bounds (optimization)
        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) return;

        const size = (1 - this.z / canvas.width) * 2;
        
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Animation Loop
    const animate = () => {
      // Clear with slight fade for motion blur feel (optional, but pure clear is crisper for warp)
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Full clear

      // Draw subtle radial gradient center glow
      const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, canvas.height);
      gradient.addColorStop(0, '#1e1b4b'); // Indigo-950 center 
      gradient.addColorStop(1, '#020617'); // Slate-950 edge
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default Hyperspace;
