import { useEffect, useRef } from 'react';

/**
 * Animated Waves Background - Inspired by ReactBits.dev
 * Creates flowing wave lines that react to mouse movement
 */
export default function Waves({
  lineColor = '#d92c3a',
  backgroundColor = '#0a0a0a',
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 12,
  yGap = 36,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });

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
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const animate = () => {
      time += 1;
      ctx.fillStyle = backgroundColor;
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
        const hue = (j / rows) * 30; // Slight color variation
        gradient.addColorStop(0, `rgba(217, 44, 58, ${0.1 + (j / rows) * 0.15})`);
        gradient.addColorStop(0.5, `rgba(247, 168, 13, ${0.05 + (j / rows) * 0.1})`);
        gradient.addColorStop(1, `rgba(217, 44, 58, ${0.1 + (j / rows) * 0.15})`);
        
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
    />
  );
}
