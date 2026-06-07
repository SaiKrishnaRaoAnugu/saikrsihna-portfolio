"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import profile from "@/data/profile.json";
import styles from "@/styles/sections/AboutSection.module.css";

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const [typedCount, setTypedCount] = useState(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const bioText = profile.bio;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollerEl = document.querySelector("main");
    if (!scrollerEl) return;
    // Capture as non-nullable so closures see Element, not Element|null
    const scroller: Element = scrollerEl;
    const sectionEl: HTMLElement = section;

    let isActive = false;
    let typeInterval: ReturnType<typeof setInterval> | null = null;

    function startTyping() {
      setTypedCount(0);
      let idx = 0;
      typeInterval = setInterval(() => {
        idx = Math.min(idx + 6, bioText.length);
        setTypedCount(idx);
        if (idx >= bioText.length && typeInterval) {
          clearInterval(typeInterval);
          typeInterval = null;
        }
      }, 16);
    }

    function resetAnim() {
      tlRef.current?.kill();
      if (typeInterval) { clearInterval(typeInterval); typeInterval = null; }
      setTypedCount(0);
      gsap.set(photoRef.current, { opacity: 0, x: -40 });
      gsap.set(contentRef.current, { opacity: 0, y: 25 });
      gsap.set(socialsRef.current, { opacity: 0, y: 15 });
    }

    function playAnim() {
      resetAnim();
      const tl = gsap.timeline();
      tlRef.current = tl;
      tl.to(photoRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0)
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.2)
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5)
        .call(startTyping, [], 0.6);
    }

    function onScroll() {
      const inRange = Math.abs(scroller.scrollTop - sectionEl.offsetTop) < window.innerHeight * 0.5;
      if (inRange && !isActive) { isActive = true; playAnim(); }
      if (!inRange && isActive) { isActive = false; resetAnim(); }
    }

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (typeInterval) clearInterval(typeInterval);
      tlRef.current?.kill();
    };
  }, [bioText]);

  const skillsDouble = [...profile.skills, ...profile.skills];

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Left photo column */}
      <div className={styles.photoCol}>
        <div ref={photoRef} className={styles.photoWrap}>
          <Image
            src="/profile.jpg"
            alt={profile.name.full}
            fill
            quality={85}
            sizes="30vw"
            className={styles.photoImg}
          />
          <div className={styles.photoOverlay} />
        </div>

        <span className={styles.signature} aria-hidden="true">
          {profile.name.first}
        </span>

        <div ref={socialsRef} className={styles.socials}>
          {profile.socials.map((social) => {
            const Icon = SOCIAL_ICON_MAP[social.label];
            if (!Icon) return null;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Right content column */}
      <div ref={contentRef} className={styles.content}>
        <p className={styles.whoLabel}>Who I Am</p>

        {/* Skills marquee */}
        <div className={styles.marqueeWrap} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {skillsDouble.map((skill, i) => (
              <span key={i} className={styles.marqueeItem}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Bio with typewriter */}
        <p ref={bioRef} className={styles.bio}>
          {bioText.split("").map((char, i) => {
            let cls = styles.untyped;
            if (i < typedCount - 1) cls = styles.typed;
            else if (i === typedCount - 1) cls = styles.lastTyped;
            return (
              <span key={i} className={cls}>{char}</span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
