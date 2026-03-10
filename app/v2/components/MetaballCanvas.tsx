'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useMouse } from './V2LayoutProvider';

interface MetaballCanvasProps {
  className?: string;
  style?: React.CSSProperties;
  blobColor?: string; // hex color for blobs
  bgColor?: string; // hex color for background
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

  // Simplex 2D noise
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
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.4;

    // Mouse in same coordinate space
    vec2 mouse = (uMouse - 0.5) * 2.0;
    mouse.x *= uResolution.x / uResolution.y;

    // Metaball field - slow, heavy, liquid movements
    float field = 0.0;

    // 5 autonomous blobs with different frequencies
    field += metaball(p, vec2(sin(t * 0.7) * 0.8, cos(t * 0.5) * 0.6), 0.14);
    field += metaball(p, vec2(cos(t * 0.4) * 0.7, sin(t * 0.8) * 0.7), 0.12);
    field += metaball(p, vec2(sin(t * 0.3 + 2.0) * 0.9, cos(t * 0.6 + 1.0) * 0.5), 0.16);
    field += metaball(p, vec2(cos(t * 0.5 + 3.0) * 0.6, sin(t * 0.4 + 2.0) * 0.8), 0.13);
    field += metaball(p, vec2(sin(t * 0.6) * 0.5, cos(t * 0.35) * 0.9), 0.11);

    // Mouse-reactive blob (slightly influenced by autonomous movement too)
    vec2 mouseBlob = mouse * 0.8 + vec2(sin(t * 0.2) * 0.1, cos(t * 0.15) * 0.1);
    field += metaball(p, mouseBlob, 0.10);

    // Noise distortion for organic wobble
    field += snoise(p * 2.0 + t * 0.3) * 0.15;

    // Threshold into sharp blobs
    float blob = smoothstep(0.95, 1.05, field);

    // Edge glow
    float edge = smoothstep(0.85, 0.95, field) - blob;

    // Color the output
    vec3 col = mix(uBgColor, uBlobColor, blob);

    // Add edge highlight
    vec3 edgeColor = mix(uBlobColor, uBgColor, 0.3);
    col += edgeColor * edge * 0.5;

    // Film grain
    float grain = (fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return new THREE.Vector3(
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    );
  }
  return new THREE.Vector3(0, 0, 0);
}

export function MetaballCanvas({
  className = '',
  style,
  blobColor = '#1a1a1a',
  bgColor = '#0a0a0a',
  opacity = 1,
}: MetaballCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMouse();
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      // Smooth mouse lerp (~200ms lag feel)
      smoothMouse.current.x += (mouse.normalized.x - smoothMouse.current.x) * 0.05;
      smoothMouse.current.y += (mouse.normalized.y - smoothMouse.current.y) * 0.05;

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [blobColor, bgColor, mouse.normalized.x, mouse.normalized.y]);

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
