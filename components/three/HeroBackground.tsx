"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COLORS = ["#ffffff", "#fff9f0", "#ffe8cc", "#ffd4a0"];

function hexToColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}

function createSpriteTex(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.4)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    const tex = createSpriteTex();

    // Layer 1: small fast particles
    const N1 = 65;
    const geo1 = new THREE.BufferGeometry();
    const pos1 = new Float32Array(N1 * 3);
    const col1 = new Float32Array(N1 * 3);
    const vel1: { vx: number; vy: number; phase: number; speed: number }[] = [];

    for (let i = 0; i < N1; i++) {
      pos1[i * 3 + 0] = (Math.random() - 0.5) * 22;
      pos1[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos1[i * 3 + 2] = (Math.random() - 0.5) * 4;
      const c = hexToColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
      col1[i * 3 + 0] = c.r;
      col1[i * 3 + 1] = c.g;
      col1[i * 3 + 2] = c.b;
      vel1.push({
        vx: (Math.random() - 0.5) * 0.006,
        vy: Math.random() * 0.012 + 0.004,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.2,
      });
    }
    geo1.setAttribute("position", new THREE.BufferAttribute(pos1, 3));
    geo1.setAttribute("color", new THREE.BufferAttribute(col1, 3));

    const mat1 = new THREE.PointsMaterial({
      map: tex,
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pts1 = new THREE.Points(geo1, mat1);
    scene.add(pts1);

    // Layer 2: large bokeh blobs
    const N2 = 22;
    const geo2 = new THREE.BufferGeometry();
    const pos2 = new Float32Array(N2 * 3);
    const col2 = new Float32Array(N2 * 3);
    const vel2: { vx: number; vy: number; phase: number }[] = [];

    for (let i = 0; i < N2; i++) {
      pos2[i * 3 + 0] = (Math.random() - 0.5) * 22;
      pos2[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 2;
      const c = hexToColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
      col2[i * 3 + 0] = c.r;
      col2[i * 3 + 1] = c.g;
      col2[i * 3 + 2] = c.b;
      vel2.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: Math.random() * 0.006 + 0.001,
        phase: Math.random() * Math.PI * 2,
      });
    }
    geo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
    geo2.setAttribute("color", new THREE.BufferAttribute(col2, 3));

    const mat2 = new THREE.PointsMaterial({
      map: tex,
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pts2 = new THREE.Points(geo2, mat2);
    scene.add(pts2);

    const mouse = { x: 0, y: 0 };
    const camPos = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMove);

    const ro = new ResizeObserver(() => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
    });
    ro.observe(canvas);

    let lastTime = performance.now();
    let elapsed = 0;
    let animId: number;

    const animate = (ts: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime = ts;
      elapsed += dt;

      // Update layer 1
      for (let i = 0; i < N1; i++) {
        const { vx, vy, phase, speed } = vel1[i];
        pos1[i * 3 + 0] += vx + Math.sin(elapsed * speed + phase) * 0.003;
        pos1[i * 3 + 1] += vy;
        if (pos1[i * 3 + 1] > 7) pos1[i * 3 + 1] = -7;
        if (pos1[i * 3 + 0] > 11) pos1[i * 3 + 0] = -11;
        if (pos1[i * 3 + 0] < -11) pos1[i * 3 + 0] = 11;
      }
      geo1.attributes.position.needsUpdate = true;

      // Update layer 2
      for (let i = 0; i < N2; i++) {
        const { vx, vy, phase } = vel2[i];
        pos2[i * 3 + 0] += vx + Math.sin(elapsed * 0.15 + phase) * 0.002;
        pos2[i * 3 + 1] += vy;
        if (pos2[i * 3 + 1] > 7) pos2[i * 3 + 1] = -7;
      }
      geo2.attributes.position.needsUpdate = true;

      camPos.x += (mouse.x - camPos.x) * 0.02;
      camPos.y += (mouse.y - camPos.y) * 0.02;
      camera.position.x = camPos.x;
      camera.position.y = camPos.y;

      renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      geo1.dispose();
      geo2.dispose();
      mat1.dispose();
      mat2.dispose();
      tex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
