import { useEffect, useRef } from "react";

type Config = {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number; // between 0 and 1, lower = snappier
};

export default function useSpotlightEffect(config: Config = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cfg = {
    radius: 200,
    brightness: 0.15,
    color: "#ffffff",
    smoothing: 0.12,
    ...config,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // capture non-null typed references for use inside nested functions
    const c = canvas as HTMLCanvasElement;
    const context = ctx as CanvasRenderingContext2D;

    let width = 0;
    let height = 0;
    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let drawX = mouseX;
    let drawY = mouseY;

    const dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      width = c.clientWidth || window.innerWidth;
      height = c.clientHeight || window.innerHeight;
      c.width = Math.floor(width * dpr);
      c.height = Math.floor(height * dpr);
      c.style.width = width + "px";
      c.style.height = height + "px";
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      clear();
    }

    function clear() {
      context.clearRect(0, 0, width, height);
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onTouch(e: TouchEvent) {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }

    function draw() {
      // smoothing
      drawX += (mouseX - drawX) * (1 - Math.max(0.001, cfg.smoothing || 0.12));
      drawY += (mouseY - drawY) * (1 - Math.max(0.001, cfg.smoothing || 0.12));

      clear();

      // only draw when mouse is on screen
      if (drawX > -9998 && drawY > -9998) {
        const grad = context.createRadialGradient(drawX, drawY, 0, drawX, drawY, cfg.radius!);
        // inner color (bright)
        grad.addColorStop(0, hexToRgba(cfg.color!, cfg.brightness! * 1.4));
        // mid
        grad.addColorStop(0.4, hexToRgba(cfg.color!, cfg.brightness! * 0.7));
        // outer transparent
        grad.addColorStop(1, hexToRgba(cfg.color!, 0));

        context.globalCompositeOperation = "lighter";
        context.fillStyle = grad;
        context.beginPath();
        context.rect(0, 0, width, height);
        context.fill();
        context.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(draw);
    }

    function hexToRgba(hex: string, alpha = 1) {
      const h = hex.replace("#", "");
      const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current]);

  return canvasRef;
}
