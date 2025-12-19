import { useEffect, useRef } from 'react';

/**
 * Dark Veil Background - Inspired by ReactBits.dev
 * Creates a mysterious dark background with floating light particles
 * and smooth wave-like gradients
 */
export default function DarkVeil({
  particleCount = 80,
  particleColor = '#d92c3a',
  accentColor = '#f7a80d',
  baseColor = '#0a0a0a',
  speed = 1,
  blur = true,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5 * speed,
          speedY: (Math.random() - 0.5) * 0.5 * speed,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.7 ? accentColor : particleColor,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const drawVeil = () => {
      // Create dark gradient base
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, '#111111');
      gradient.addColorStop(0.5, '#0a0a0a');
      gradient.addColorStop(1, baseColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated veil layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();

        const layerOffset = layer * 0.5;
        const amplitude = 50 + layer * 20;

        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            canvas.height * (0.3 + layer * 0.2) +
            Math.sin(x * 0.003 + time * 0.5 * speed + layerOffset) * amplitude +
            Math.sin(x * 0.007 + time * 0.3 * speed + layerOffset) * (amplitude * 0.5);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Create gradient for veil layer
        const veilGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const opacity = 0.03 - layer * 0.008;
        veilGradient.addColorStop(0, `rgba(217, 44, 58, ${opacity})`);
        veilGradient.addColorStop(0.5, `rgba(247, 168, 13, ${opacity * 0.5})`);
        veilGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = veilGradient;
        ctx.fill();
      }
    };

    const drawParticles = () => {
      const { x: mouseX, y: mouseY, active } = mouseRef.current;

      // Helper function to convert hex to rgba
      const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += particle.pulseSpeed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction
        if (active) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            particle.x -= (dx / dist) * force * 2;
            particle.y -= (dy / dist) * force * 2;
          }
        }

        // Pulsing opacity
        const pulseOpacity = Math.max(0, Math.min(1, particle.opacity + Math.sin(particle.pulse) * 0.2));

        // Draw particle with glow
        const glowSize = particle.size * 4;

        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowSize
        );
        particleGradient.addColorStop(0, hexToRgba(particle.color, pulseOpacity));
        particleGradient.addColorStop(0.4, hexToRgba(particle.color, pulseOpacity * 0.3));
        particleGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = hexToRgba(particle.color, Math.min(1, pulseOpacity + 0.3));
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawMouseGlow = () => {
      if (!mouseRef.current.active) return;

      const { x, y } = mouseRef.current;
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
      glowGradient.addColorStop(0, 'rgba(217, 44, 58, 0.1)');
      glowGradient.addColorStop(0.3, 'rgba(247, 168, 13, 0.05)');
      glowGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawConnectionLines = () => {
      const particles = particlesRef.current;
      ctx.strokeStyle = 'rgba(217, 44, 58, 0.05)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(217, 44, 58, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw layers
      drawVeil();
      drawConnectionLines();
      drawParticles();
      drawMouseGlow();

      // Add subtle vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleColor, accentColor, baseColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${blur ? 'backdrop-blur-[0.5px]' : ''} ${className}`}
      style={{ background: baseColor }}
    />
  );
}
