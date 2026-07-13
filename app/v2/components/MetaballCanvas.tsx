'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMouseRef } from './V2LayoutProvider';

// Liquid metaball field. Initialized exactly once per mount — mouse input
// is read from a shared ref inside the render loop, so cursor movement
// never re-renders React or re-creates the WebGL context (the source of
// the flicker in the previous build). Rendering pauses when offscreen.

interface MetaballCanvasProps {
  className?: string;
  style?: React.CSSProperties;
  blobColor?: string;
  bgColor?: string;
  accent?: string; // edge tint
  opacity?: number;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uBlobColor;
  uniform vec3 uBgColor;
  uniform vec3 uAccent;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
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
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.0;
    float aspect = uResolution.x / uResolution.y;
    p.x *= aspect;

    float t = uTime * 0.35;

    vec2 mouse = (uMouse - 0.5) * 2.0;
    mouse.x *= aspect;

    // Slow, heavy, liquid movement
    float field = 0.0;
    field += metaball(p, vec2(sin(t * 0.7) * 0.8, cos(t * 0.5) * 0.6), 0.14);
    field += metaball(p, vec2(cos(t * 0.4) * 0.7, sin(t * 0.8) * 0.7), 0.12);
    field += metaball(p, vec2(sin(t * 0.3 + 2.0) * 0.9, cos(t * 0.6 + 1.0) * 0.5), 0.16);
    field += metaball(p, vec2(cos(t * 0.5 + 3.0) * 0.6, sin(t * 0.4 + 2.0) * 0.8), 0.13);
    field += metaball(p, vec2(sin(t * 0.6 + 4.0) * 0.5, cos(t * 0.35 + 3.0) * 0.9), 0.10);
    field += metaball(p, mouse * 0.8, 0.09);

    field += snoise(p * 2.0 + t * 0.3) * 0.14;

    float blob = smoothstep(0.95, 1.06, field);
    float edge = smoothstep(0.84, 0.95, field) - blob;

    vec3 col = mix(uBgColor, uBlobColor, blob);
    col += uAccent * edge * 0.35;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? new THREE.Vector3(parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255)
    : new THREE.Vector3(0, 0, 0);
}

export function MetaballCanvas({
  className = '',
  style,
  blobColor = '#111116',
  bgColor = '#050505',
  accent = '#0000ff',
  opacity = 1,
}: MetaballCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useMouseRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(800, 600) },
        uBlobColor: { value: hexToVec3(blobColor) },
        uBgColor: { value: hexToVec3(bgColor) },
        uAccent: { value: hexToVec3(accent) },
      },
    });
    scene.add(new THREE.Mesh(geometry, material));

    const clock = new THREE.Clock();
    const smooth = { x: 0.5, y: 0.5 };
    let visible = true;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // Pause rendering entirely while offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      smooth.x += (mouseRef.current.nx - smooth.x) * 0.05;
      smooth.y += (mouseRef.current.ny - smooth.y) * 0.05;

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMouse.value.set(smooth.x, smooth.y);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [blobColor, bgColor, accent, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
        ...style,
      }}
    />
  );
}
