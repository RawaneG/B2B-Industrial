import { useEffect, useRef } from 'react';

/**
 * Animated Grid Pattern Background - Inspired by ReactBits.dev
 * Creates a subtle animated grid with glowing intersections
 */
export default function GridPattern({
  gridSize = 60,
  lineColor = 'rgba(217, 44, 58, 0.1)',
  glowColor = 'rgba(247, 168, 13, 0.3)',
  speed = 1,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      time += 0.02 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        const x = i * gridSize;
        const offset = Math.sin(time + i * 0.1) * 2;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        
        for (let y = 0; y <= canvas.height; y += 20) {
          const waveOffset = Math.sin(time * 0.5 + y * 0.01 + i * 0.2) * offset;
          ctx.lineTo(x + waveOffset, y);
        }

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        const y = j * gridSize;
        const offset = Math.cos(time + j * 0.1) * 2;

        ctx.beginPath();
        ctx.moveTo(0, y);
        
        for (let x = 0; x <= canvas.width; x += 20) {
          const waveOffset = Math.cos(time * 0.5 + x * 0.01 + j * 0.2) * offset;
          ctx.lineTo(x, y + waveOffset);
        }

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw glowing intersections near mouse
      const { x: mouseX, y: mouseY } = mouseRef.current;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          const distToMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          );
          
          const maxDist = 200;
          
          if (distToMouse < maxDist) {
            const intensity = 1 - distToMouse / maxDist;
            const pulseIntensity = (Math.sin(time * 3 + i + j) + 1) * 0.5;
            
            const glow = ctx.createRadialGradient(x, y, 0, x, y, 15 * intensity);
            glow.addColorStop(0, glowColor.replace('0.3', String(0.6 * intensity * pulseIntensity)));
            glow.addColorStop(1, 'transparent');
            
            ctx.fillStyle = glow;
            ctx.fillRect(x - 20, y - 20, 40, 40);
            
            // Draw dot
            ctx.beginPath();
            ctx.arc(x, y, 2 + intensity * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(217, 44, 58, ${0.5 + intensity * 0.5})`;
            ctx.fill();
          } else {
            // Subtle pulsing dots at intersections
            const pulse = (Math.sin(time + i * 0.5 + j * 0.3) + 1) * 0.5;
            ctx.beginPath();
            ctx.arc(x, y, 1 + pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(217, 44, 58, ${0.1 + pulse * 0.1})`;
            ctx.fill();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gridSize, lineColor, glowColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)' }}
    />
  );
}
