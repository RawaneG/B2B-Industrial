import { useEffect, useRef } from 'react';

/**
 * Aurora Background - Inspired by ReactBits.dev
 * Creates a beautiful animated aurora borealis effect
 */
export default function Aurora({
  colorStops = ['#d92c3a', '#f7a80d', '#1f2937', '#d92c3a'],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const animate = () => {
      time += 0.005 * speed;
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw aurora layers
      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Create wave points
        for (let x = 0; x <= canvas.width; x += 5) {
          const normalizedX = x / canvas.width;
          
          // Multiple sine waves for organic movement
          const wave1 = Math.sin(normalizedX * 3 + time + layerOffset) * amplitude;
          const wave2 = Math.sin(normalizedX * 5 + time * 1.5 + layerOffset) * amplitude * 0.5;
          const wave3 = Math.sin(normalizedX * 2 + time * 0.5 + layerOffset) * amplitude * 0.3;
          
          const combinedWave = wave1 + wave2 + wave3;
          const baseY = canvas.height * (0.3 + layer * 0.15);
          const y = baseY + combinedWave * 100;
          
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        // Create gradient for this layer
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        colorStops.forEach((color, i) => {
          const offset = (i / (colorStops.length - 1) + time * 0.1) % 1;
          gradient.addColorStop(Math.abs(offset), color);
        });

        ctx.fillStyle = gradient;
        ctx.globalAlpha = blend * (0.3 - layer * 0.08);
        ctx.fill();
      }

      // Add glow effect
      const glowGradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.2),
        canvas.height * 0.3,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      glowGradient.addColorStop(0, 'rgba(217, 44, 58, 0.15)');
      glowGradient.addColorStop(0.5, 'rgba(247, 168, 13, 0.05)');
      glowGradient.addColorStop(1, 'transparent');

      ctx.globalAlpha = 1;
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)' }}
    />
  );
}
