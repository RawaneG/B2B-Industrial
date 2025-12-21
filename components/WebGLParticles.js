import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * GPU-accelerated particle system with custom shaders
 * Creates thousands of particles with dynamic colors and mouse interaction
 */
function ParticleField() {
  const points = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  // Create particle geometry and shader material
  const { positions, sizes } = useMemo(() => {
    const count = 2000; // 2000 particles instead of 60
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles across 3D space
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, sizes };
  }, []);

  // Custom vertex shader - controls particle position and size
  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    attribute float size;
    varying vec3 vColor;

    void main() {
      vColor = vec3(0.85, 0.17, 0.22); // Safety red base color

      // Animate particles with sine waves
      vec3 pos = position;
      pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.5;
      pos.y += cos(uTime * 0.2 + position.x * 0.3) * 0.5;

      // Mouse interaction - push particles away
      vec2 toMouse = uMouse - pos.xy;
      float dist = length(toMouse);
      if (dist < 5.0) {
        float force = (5.0 - dist) / 5.0;
        pos.xy -= normalize(toMouse) * force * 2.0;
        vColor = vec3(0.97, 0.66, 0.05); // Change to accent yellow when near mouse
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  // Custom fragment shader - controls particle appearance
  const fragmentShader = `
    varying vec3 vColor;

    void main() {
      // Create circular particles with smooth edges
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);

      if (dist > 0.5) discard;

      // Soft glow effect
      float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
      alpha *= 0.8;

      gl_FragColor = vec4(vColor, alpha);
    }
  `;

  // Animate particles and update uniforms
  useFrame((state) => {
    if (points.current) {
      const material = points.current.material;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value = new THREE.Vector2(
        mousePos.current.x,
        mousePos.current.y
      );
    }
  });

  // Track mouse position
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 20 - 10;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 20 + 10;
    });
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * WebGL Particle Background Component
 * Renders a full-screen 3D particle system with GPU shaders
 */
export default function WebGLParticles() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={[1, 2]} // Optimize for retina displays
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
