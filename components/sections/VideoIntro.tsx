"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import styles from "@/styles/sections/VideoIntro.module.css";

const CinematicLayer = dynamic(() => import("@/components/three/CinematicLayer"), { ssr: false });

const TAGLINE = "Portfolio 2026";
const NAME_FIRST = "Sai Krishna";
const NAME_LAST = "Rao Anugu";
const ROLE = "AI Software Engineer · Backend Architect · Data Scientist";
const VIDEO_SRC = "/assets/about_me.mp4";

function scrollNext() {
  const main = document.querySelector("main");
  if (main) main.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const greetRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);

  const [playing, setPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    // check if video file likely exists (optimistic)
    setHasVideo(true);
  }, []);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo(greetRef.current, { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .fromTo(nameRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, "-=0.2")
      .fromTo(roleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1");
    return () => { tl.kill(); };
  }, []);

  // Fade in video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const t = gsap.fromTo(v, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" });
    return () => { t.kill(); };
  }, []);

  // Unmute after loader
  useEffect(() => {
    function onLoaderDismissed() {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
    }
    window.addEventListener("loader-dismissed", onLoaderDismissed);
    return () => window.removeEventListener("loader-dismissed", onLoaderDismissed);
  }, []);

  // Play after shatter animation
  useEffect(() => {
    function onAnimationDone() {
      const v = videoRef.current;
      if (!v) return;
      v.play().catch(() => {});
    }
    window.addEventListener("loader-animation-done", onAnimationDone);
    return () => window.removeEventListener("loader-animation-done", onAnimationDone);
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); }
  }

  function handleEnded() {
    const main = document.querySelector("main");
    if (main && main.scrollTop < window.innerHeight * 0.4) scrollNext();
  }

  return (
    <section className={styles.section}>
      {/* Blurred bg duplicate */}
      {hasVideo && (
        <video
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          aria-hidden="true"
          className={styles.bgVideo}
        />
      )}

      {/* Main video */}
      {hasVideo ? (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={handleEnded}
          onError={() => setHasVideo(false)}
          className={styles.mainVideo}
        />
      ) : (
        <div className={styles.videoPH} />
      )}

      <div className={styles.overlay} />
      {!isMobile && <CinematicLayer />}

      <div className={styles.heroContent}>
        <p ref={greetRef} className={styles.eyebrow}>{TAGLINE}</p>
        <h1 ref={nameRef} className={styles.name}>
          {NAME_FIRST}
          <br />
          {NAME_LAST}
        </h1>
        <p ref={roleRef} className={styles.role}>{ROLE}</p>
      </div>

      {hasVideo && !playing && (
        <button className={styles.playOverlay} onClick={togglePlay} aria-label="Play video">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="35" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <polygon points="29,20 56,36 29,52" fill="white" />
          </svg>
        </button>
      )}

      <button
        ref={scrollRef}
        className={styles.scrollCue}
        onClick={scrollNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </button>
    </section>
  );
}
