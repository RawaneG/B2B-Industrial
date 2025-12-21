import { useEffect, useRef } from 'react';

/**
 * Dark Veil Background - Inspired by ReactBits.dev
 * Creates a mysterious dark background with floating light particles
 * and smooth wave-like gradients
 * OPTIMIZED: Reduced particle count, throttled mouse events, optimized connection lines
 */
export default function DarkVeil({
  particleCount = 40, // Reduced from 80 for better performance
  particleColor = 'hsl(var(--brand-dark))',
  accentColor = 'hsl(var(--accent))',
  baseColor = 'hsl(var(--brand-dark))',
  speed = 1,
  blur = true,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const lastMouseMoveRef = useRef(0);
  const frameCountRef = useRef(0);

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
      // Throttle mouse events to max 30fps
      const now = Date.now();
      if (now - lastMouseMoveRef.current < 33) return;
      lastMouseMoveRef.current = now;

      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Resolve CSS variables in color strings for canvas (canvas can't parse var() directly)
    const resolveCssVars = (color) => {
      if (typeof window === 'undefined' || !color || !color.includes('var(')) return color;
      try {
        return color.replace(/var\((--[a-zA-Z0-9-_]+)\)/g, (_, name) =>
          getComputedStyle(document.documentElement).getPropertyValue(name).trim() || ''
        );
      } catch (e) {
        return color;
      }
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
      gradient.addColorStop(0, '#0a0712');
      gradient.addColorStop(0.5, resolveCssVars('hsl(var(--brand-dark))'));
      gradient.addColorStop(1, resolveCssVars(baseColor));

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
        veilGradient.addColorStop(0, `rgba(6, 0, 16, ${opacity})`);
        veilGradient.addColorStop(0.5, `rgba(6, 0, 16, ${opacity * 0.5})`);
        veilGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = veilGradient;
        ctx.fill();
      }
    };

    const drawParticles = () => {
      const { x: mouseX, y: mouseY, active } = mouseRef.current;

      // Helper to convert color (hex or hsl(var(...))) to a CSS color with alpha
      const colorWithAlpha = (color, alpha) => {
        if (!color) return `rgba(6,0,16,${alpha})`;
        const resolved = resolveCssVars(color);
        if (resolved.startsWith('#')) {
          const r = parseInt(resolved.slice(1, 3), 16);
          const g = parseInt(resolved.slice(3, 5), 16);
          const b = parseInt(resolved.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        // For hsl(...) forms, use the newer CSS syntax with slash alpha when possible
        if (resolved.startsWith('hsl')) {
          if (resolved.includes('/')) {
            return resolved.replace(/\/[^)]*\)/, `/${alpha})`);
          }
          return resolved.replace(/\)$/, ` / ${alpha})`);
        }
        return resolved;
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
        particleGradient.addColorStop(0, colorWithAlpha(particle.color, pulseOpacity));
        particleGradient.addColorStop(0.4, colorWithAlpha(particle.color, pulseOpacity * 0.3));
        particleGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = colorWithAlpha(particle.color, Math.min(1, pulseOpacity + 0.3));
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawMouseGlow = () => {
      if (!mouseRef.current.active) return;

      const { x, y } = mouseRef.current;
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
      glowGradient.addColorStop(0, 'rgba(6, 0, 16, 0.1)');
      glowGradient.addColorStop(0.3, 'rgba(6, 0, 16, 0.05)');
      glowGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawConnectionLines = () => {
      // Only draw connection lines every 3rd frame to reduce CPU usage
      if (frameCountRef.current % 3 !== 0) return;

      const particles = particlesRef.current;
      const maxConnections = 30; // Limit total connections
      let connectionCount = 0;

      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
        for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;

          // Quick distance check without sqrt when possible
          const distSquared = dx * dx + dy * dy;
          if (distSquared < 10000) { // 100 * 100
            const dist = Math.sqrt(distSquared);
            const opacity = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(6, 0, 16, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connectionCount++;
          }
        }
      }
    };

    const animate = () => {
      time += 0.01;
      frameCountRef.current++;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw layers
      drawVeil();
      drawConnectionLines();
      drawParticles();
      drawMouseGlow();

      // Add subtle vignette (only every other frame)
      if (frameCountRef.current % 2 === 0) {
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
      }

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
      style={{
        background: baseColor,
        willChange: 'transform',
      }}
    />
  );
}
