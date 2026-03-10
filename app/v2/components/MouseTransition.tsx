'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface MouseTransitionProps {
  active: boolean;
  clickOrigin: { x: number; y: number };
  onMidpoint: () => void;
  onComplete: () => void;
}

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uProgress;
  uniform vec2 uOrigin;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;

    vec2 p = uv - uOrigin;
    p.x *= aspect;

    float dist = length(p);
    float radius = uProgress * 2.5;

    // Sharp circle edge with chromatic fringe
    float circle = smoothstep(radius, radius - 0.03, dist);
    float edge = smoothstep(radius - 0.12, radius - 0.03, dist) - circle;

    // Color - dark fill with purple/white edge fringe
    vec3 col = vec3(0.04);
    col += vec3(edge * 0.7, edge * 0.15, edge * 0.85);

    gl_FragColor = vec4(col, circle + edge * 0.5);
  }
`;

export function MouseTransition({ active, clickOrigin, onMidpoint, onComplete }: MouseTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const progressRef = useRef(0);
  const phaseRef = useRef<'expanding' | 'contracting' | 'idle'>('idle');
  const midpointFired = useRef(false);
  const rafRef = useRef<number>(0);

  const setupRenderer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || rendererRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uProgress: { value: 0 },
        uOrigin: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      if (phaseRef.current === 'expanding') {
        progressRef.current += (1.0 - progressRef.current) * 0.06;
        if (progressRef.current > 0.95) {
          progressRef.current = 1.0;
          if (!midpointFired.current) {
            midpointFired.current = true;
            onMidpoint();
          }
          // Hold briefly then contract
          setTimeout(() => {
            phaseRef.current = 'contracting';
          }, 100);
        }
      } else if (phaseRef.current === 'contracting') {
        progressRef.current -= progressRef.current * 0.06;
        if (progressRef.current < 0.01) {
          progressRef.current = 0;
          phaseRef.current = 'idle';
          onComplete();
        }
      }

      material.uniforms.uProgress.value = progressRef.current;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [onMidpoint, onComplete]);

  useEffect(() => {
    const cleanup = setupRenderer();
    return cleanup;
  }, [setupRenderer]);

  useEffect(() => {
    if (active && materialRef.current) {
      const originX = clickOrigin.x / window.innerWidth;
      const originY = 1.0 - clickOrigin.y / window.innerHeight;
      materialRef.current.uniforms.uOrigin.value.set(originX, originY);

      progressRef.current = 0;
      midpointFired.current = false;
      phaseRef.current = 'expanding';
    }
  }, [active, clickOrigin]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 9998,
        pointerEvents: active ? 'all' : 'none',
        opacity: active || phaseRef.current !== 'idle' ? 1 : 0,
      }}
    />
  );
}
