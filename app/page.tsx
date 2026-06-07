"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";

// Lazy-load heavy sections
const ScreenLoader = dynamic(() => import("@/components/sections/ScreenLoader"), { ssr: false });
const VideoIntro = dynamic(() => import("@/components/sections/VideoIntro"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { ssr: false });
const WorkExperienceSection = dynamic(() => import("@/components/sections/WorkExperienceSection"), { ssr: false });
const PublicationsFooterSection = dynamic(() => import("@/components/sections/PublicationsFooterSection"), { ssr: false });

// Custom cursor
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX; my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    }

    function tick() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(tick);

    const links = document.querySelectorAll("a, button");
    const enter = () => { ring.classList.add("cursor-hover"); dot.classList.add("cursor-hover"); };
    const leave = () => { ring.classList.remove("cursor-hover"); dot.classList.remove("cursor-hover"); };

    links.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export default function Page() {
  const [loaderDone, setLoaderDone] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const busyRef = useRef(false);
  const fadeRef = useRef<HTMLDivElement>(null);

  // Full-page wheel scroll between sections
  useEffect(() => {
    if (!loaderDone) return;
    const main = mainRef.current;
    if (!main) return;

    // Determine scroll targets (every 100vh increment, with intermediate points for tall sections)
    function getSnapTargets() {
      const children = Array.from(main!.children) as HTMLElement[];
      const targets: number[] = [];
      let acc = 0;
      const vh = window.innerHeight;
      children.forEach((child) => {
        targets.push(acc);
        const h = child.offsetHeight;
        const steps = Math.round(h / vh);
        for (let s = 1; s < steps; s++) {
          targets.push(acc + s * vh);
        }
        acc += h;
      });
      return targets;
    }

    function nearest(targets: number[], current: number) {
      return targets.reduce((a, b) =>
        Math.abs(b - current) < Math.abs(a - current) ? b : a
      );
    }

    function goTo(target: number, loop = false) {
      if (busyRef.current) return;
      busyRef.current = true;

      if (loop && fadeRef.current) {
        gsap.timeline()
          .to(fadeRef.current, { opacity: 1, duration: 0.35, ease: "power2.in" })
          .call(() => { main!.scrollTop = target; })
          .to(fadeRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" })
          .call(() => { busyRef.current = false; });
      } else {
        gsap.to(main, {
          scrollTop: target,
          duration: 0.85,
          ease: "power3.inOut",
          onComplete: () => { busyRef.current = false; },
        });
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (busyRef.current) return;

      const targets = getSnapTargets();
      const current = main!.scrollTop;
      const maxScroll = main!.scrollHeight - window.innerHeight;
      const direction = e.deltaY > 0 ? 1 : -1;

      const currentSnap = nearest(targets, current);
      const idx = targets.indexOf(currentSnap);
      const nextIdx = idx + direction;

      if (nextIdx < 0) return;
      if (nextIdx >= targets.length) {
        // Loop back to top
        goTo(0, true);
        return;
      }

      const target = targets[nextIdx] ?? currentSnap;
      goTo(Math.min(target, maxScroll));
    }

    // Touch support
    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY; }
    function onTouchEnd(e: TouchEvent) {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const fakeWheel = new WheelEvent("wheel", { deltaY: dy > 0 ? 100 : -100, cancelable: true });
      onWheel(fakeWheel);
    }

    main.addEventListener("wheel", onWheel, { passive: false });
    main.addEventListener("touchstart", onTouchStart, { passive: true });
    main.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      main.removeEventListener("wheel", onWheel);
      main.removeEventListener("touchstart", onTouchStart);
      main.removeEventListener("touchend", onTouchEnd);
    };
  }, [loaderDone]);

  return (
    <>
      <Cursor />

      {/* Fade overlay for loop transition */}
      <div
        ref={fadeRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#050505",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {!loaderDone && <ScreenLoader onDismiss={() => setLoaderDone(true)} />}

      <main ref={mainRef} style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
        <VideoIntro />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WorkExperienceSection />
        <PublicationsFooterSection />
      </main>
    </>
  );
}
