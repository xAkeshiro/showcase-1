'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useMouse } from './V2LayoutProvider';

interface ChromaticOverlayProps {
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  blendMode?: string;
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
  uniform float uIntensity;

  // Simplex noise
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

  void main() {
    vec2 uv = vUv;

    // Mouse influence - stronger effect near cursor
    float mouseDist = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);

    // Noise-based UV distortion
    float noiseScale = 3.0;
    float noiseAmount = 0.005 * uIntensity;
    vec2 distort = vec2(
      snoise(uv * noiseScale + uTime * 0.5) * noiseAmount,
      snoise(uv * noiseScale + uTime * 0.5 + 100.0) * noiseAmount
    );

    // Mouse-reactive ripple
    float ripple = sin(mouseDist * 30.0 - uTime * 4.0) * mouseInfluence * 0.015;
    distort += vec2(ripple);

    // Chromatic aberration amount - increases near mouse
    float aberration = (0.004 + mouseInfluence * 0.015) * uIntensity;

    // RGB channel split UVs
    vec2 uvR = uv + distort + vec2(aberration, -aberration * 0.5);
    vec2 uvG = uv + distort;
    vec2 uvB = uv + distort - vec2(aberration, -aberration * 0.5);

    // Generate pattern for each channel
    float r = snoise(uvR * 6.0 + uTime * 0.3) * 0.5 + 0.5;
    float g = snoise(uvG * 6.0 + uTime * 0.3 + 50.0) * 0.5 + 0.5;
    float b = snoise(uvB * 6.0 + uTime * 0.3 + 100.0) * 0.5 + 0.5;

    // Color output - blue tinted, cleaner
    vec3 col = vec3(r * 0.02, g * 0.02, b * 0.08);

    // Very subtle scanlines
    float scanline = sin(uv.y * uResolution.y * 1.0) * 0.005;
    col += scanline;

    // Vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.7;
    col *= vignette;

    // Mouse glow
    col += mouseInfluence * vec3(0.1, 0.02, 0.15) * uIntensity;

    float alpha = (length(col) * 0.6 + mouseInfluence * 0.2) * uIntensity;

    gl_FragColor = vec4(col, alpha);
  }
`;

export function ChromaticOverlay({
  className = '',
  style,
  intensity = 1.0,
  blendMode = 'screen',
}: ChromaticOverlayProps) {
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
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
        uResolution: { value: new THREE.Vector2(800, 600) },
        uIntensity: { value: intensity },
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
  }, [intensity, mouse.normalized.x, mouse.normalized.y]);

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
        zIndex: 1,
        mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'],
        ...style,
      }}
    />
  );
}
