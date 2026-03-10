'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface ShaderLoaderProps {
  onComplete: () => void;
  minimumLoadTime?: number;
}

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uFadeOut;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
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
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime * (1.0 + uFadeOut * 3.0); // Speed up on exit

    float field = 0.0;
    field += metaball(p, vec2(sin(t * 0.5) * 0.6 + aspect * 0.5, cos(t * 0.3) * 0.5 + 0.5), 0.14);
    field += metaball(p, vec2(cos(t * 0.3) * 0.7 + aspect * 0.4, sin(t * 0.4) * 0.6 + 0.5), 0.12);
    field += metaball(p, vec2(sin(t * 0.45) * 0.5 + aspect * 0.6, cos(t * 0.35) * 0.4 + 0.6), 0.10);

    field += snoise(p * 2.5 + t * 0.4) * 0.12;

    float blob = smoothstep(0.9, 1.1, field);
    float edge = smoothstep(0.75, 0.9, field) - blob;

    vec3 blobCol = vec3(0.06);
    vec3 edgeCol = vec3(0.18, 0.06, 0.22);

    vec3 col = blobCol * blob + edgeCol * edge;

    float grain = fract(sin(dot(uv * t, vec2(12.9898, 78.233))) * 43758.5453);
    col += grain * 0.015;

    gl_FragColor = vec4(col, (blob * 0.7 + edge * 0.3) * (1.0 - uFadeOut));
  }
`;

export function ShaderLoader({ onComplete, minimumLoadTime = 3000 }: ShaderLoaderProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeOutRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Progress animation
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / minimumLoadTime, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(interval);
        setTimeout(() => setShowLoader(false), 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [minimumLoadTime]);

  // WebGL shader background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uFadeOut: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uFadeOut.value = fadeOutRef.current;
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
    };
  }, []);

  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          exit={{ x: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onAnimationStart={() => {
            fadeOutRef.current = 1;
          }}
        >
          {/* Shader background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Loading content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo icon */}
            <motion.div
              className="relative w-24 h-24 mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <motion.div
                className="absolute inset-0 border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[15%] border border-white/25"
                initial={{ rotate: 45 }}
                animate={{ rotate: 405 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[30%] border border-white/15"
                initial={{ rotate: -30 }}
                animate={{ rotate: -390 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl text-white">★</span>
              </div>
            </motion.div>

            {/* KUROSEI text */}
            <div className="flex gap-1 mb-6">
              {'KUROSEI'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="font-display text-xl text-white tracking-[0.3em]"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white/60"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-mono text-[9px] text-white/30 tracking-widest mt-4"
            >
              {Math.round(progress * 100)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
