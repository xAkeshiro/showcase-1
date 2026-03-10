'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface MetaballCanvasProps {
  className?: string;
  opacity?: number;
}

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uEdgeColor;

  // Simplex 2D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float metaball(vec2 p, vec2 center, float radius) {
    float d = length(p - center);
    return radius / (d * d + 0.001);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime;

    // Metaball field - slow heavy movements
    float field = 0.0;
    field += metaball(p, vec2(sin(t * 0.3) * 0.8 + aspect * 0.5, cos(t * 0.2) * 0.6 + 0.5), 0.12);
    field += metaball(p, vec2(cos(t * 0.25) * 0.6 + aspect * 0.5, sin(t * 0.35) * 0.7 + 0.5), 0.10);
    field += metaball(p, vec2(sin(t * 0.4) * 0.5 + aspect * 0.3, cos(t * 0.3) * 0.4 + 0.6), 0.09);
    field += metaball(p, vec2(cos(t * 0.2) * 0.7 + aspect * 0.7, sin(t * 0.25) * 0.5 + 0.4), 0.11);
    field += metaball(p, vec2(sin(t * 0.35) * 0.4 + aspect * 0.4, cos(t * 0.45) * 0.3 + 0.7), 0.08);

    // Mouse-reactive metaball
    vec2 mouseUV = uMouse;
    mouseUV.x *= aspect;
    field += metaball(p, mouseUV, 0.08);

    // Noise distortion for organic wobble
    field += snoise(p * 2.0 + t * 0.3) * 0.15;

    // Threshold into sharp blobs
    float blob = smoothstep(0.95, 1.05, field);

    // Edge glow
    float edge = smoothstep(0.85, 0.95, field) - blob;

    // Color mixing
    vec3 blobColor = mix(uColor1, uColor2, snoise(p * 1.5 + t * 0.1) * 0.5 + 0.5);
    vec3 edgeColor = uEdgeColor;

    vec3 col = blobColor * blob + edgeColor * edge * 0.7;

    // Film grain
    float grain = fract(sin(dot(uv * t, vec2(12.9898, 78.233))) * 43758.5453);
    col += grain * 0.02;

    gl_FragColor = vec4(col, blob * 0.85 + edge * 0.3);
  }
`;

export function MetaballCanvas({ className = '', opacity = 1 }: MetaballCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX / window.innerWidth;
    mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
        uColor1: { value: new THREE.Color('#111111') },
        uColor2: { value: new THREE.Color('#1a1a1a') },
        uEdgeColor: { value: new THREE.Color('#333333') },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const animate = () => {
      // Smooth mouse lerp
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.05;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.05;

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMouse.value.set(smoothMouseRef.current.x, smoothMouseRef.current.y);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}
