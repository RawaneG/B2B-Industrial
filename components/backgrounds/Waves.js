import { useEffect, useRef } from 'react';

/**
 * Animated Waves Background - Inspired by ReactBits.dev
 * Creates flowing wave lines that react to mouse movement
 * OPTIMIZED: Increased gap spacing, throttled mouse events, reduced calculations
 */
export default function Waves({
  lineColor = 'hsl(var(--brand-dark))',
  backgroundColor = 'hsl(var(--brand-dark))',
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 16, // Increased from 12 for fewer points
  yGap = 48, // Increased from 36 for fewer points
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const lastMouseMoveRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let points = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points = [];
      const cols = Math.ceil(canvas.width / xGap) + 1;
      const rows = Math.ceil(canvas.height / yGap) + 1;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          points.push({
            x: i * xGap,
            y: j * yGap,
            originX: i * xGap,
            originY: j * yGap,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const handleMouseMove = (e) => {
      // Throttle mouse events to max 30fps
      const now = Date.now();
      if (now - lastMouseMoveRef.current < 33) return;
      lastMouseMoveRef.current = now;

      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
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

    const colorWithAlpha = (color, alpha) => {
      if (!color) return `rgba(6,0,16,${alpha})`;
      const resolved = resolveCssVars(color);
      if (resolved.startsWith('#')) {
        const r = parseInt(resolved.slice(1, 3), 16);
        const g = parseInt(resolved.slice(3, 5), 16);
        const b = parseInt(resolved.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      if (resolved.startsWith('hsl')) {
        if (resolved.includes('/')) {
          return resolved.replace(/\/[^)]*\)/, `/${alpha})`);
        }
        return resolved.replace(/\)$/, ` / ${alpha})`);
      }
      return resolved;
    };

    const animate = () => {
      time += 1;
      ctx.fillStyle = colorWithAlpha(backgroundColor, 1);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mouseRef.current;

      // Update points
      points.forEach((point, i) => {
        // Wave animation
        const waveX = Math.sin(time * waveSpeedX + point.originY * 0.01) * waveAmpX;
        const waveY = Math.cos(time * waveSpeedY + point.originX * 0.01) * waveAmpY;

        // Mouse interaction
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * maxCursorMove;
          const pushY = Math.sin(angle) * force * maxCursorMove;
          point.vx -= pushX * 0.02;
          point.vy -= pushY * 0.02;
        }

        // Spring back to origin with wave
        const targetX = point.originX + waveX;
        const targetY = point.originY + waveY;
        
        point.vx += (targetX - point.x) * tension;
        point.vy += (targetY - point.y) * tension;
        point.vx *= friction;
        point.vy *= friction;
        point.x += point.vx;
        point.y += point.vy;
      });

      // Draw horizontal wave lines
      const cols = Math.ceil(canvas.width / xGap) + 1;
      const rows = Math.ceil(canvas.height / yGap) + 1;

      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        
        for (let i = 0; i < cols; i++) {
          const point = points[j * cols + i];
          if (!point) continue;

          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            const prevPoint = points[j * cols + i - 1];
            if (prevPoint) {
              const midX = (prevPoint.x + point.x) / 2;
              const midY = (prevPoint.y + point.y) / 2;
              ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY);
            }
          }
        }

        // Gradient stroke based on row position
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, colorWithAlpha(backgroundColor, 0.06 + (j / rows) * 0.06));
        gradient.addColorStop(0.5, colorWithAlpha(backgroundColor, 0.03 + (j / rows) * 0.04));
        gradient.addColorStop(1, colorWithAlpha(backgroundColor, 0.06 + (j / rows) * 0.06));
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Add glow effect at mouse position
      if (mouseX > 0 && mouseY > 0) {
        const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
        glow.addColorStop(0, 'rgba(217, 44, 58, 0.1)');
        glow.addColorStop(0.5, 'rgba(247, 168, 13, 0.05)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        willChange: 'transform',
      }}
    />
  );
}
