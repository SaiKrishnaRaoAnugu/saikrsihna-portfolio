"use client";

import { useRef } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import profile from "@/data/profile.json";
import content from "@/data/content.json";
import styles from "@/styles/sections/PublicationsFooterSection.module.css";

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
};

export default function PublicationsFooterSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <div className={styles.vignetteOverlay} />
        <span className={styles.watermark} aria-hidden>CONTACT</span>

        {/* CTA section */}
        <div className={styles.ctaSection}>
          <p className={styles.ctaEyebrow}>{content.footer.eyebrow}</p>
          <h2 className={styles.ctaHeading}>
            {content.footer.ctaLines[0]}
            <br />
            {content.footer.ctaLines[1]}{" "}
            <span className={styles.ctaAccent}>{content.footer.ctaAccent}</span>
          </h2>

          <a
            href={`mailto:${profile.email}`}
            className={styles.talkBtn}
          >
            <FiMail size={14} />
            Get in touch
          </a>

          {/* Stats row */}
          <div className={styles.statsRow}>
            {profile.stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statVal}>{s.value}</div>
                <div className={styles.statLbl}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer bar */}
        <footer className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <span className={styles.footerMonogram}>
              <span className={styles.footerMonogramAccent}>S</span>K
              <span style={{ opacity: 0.3 }}>.</span>
            </span>
            <span className={styles.footerCopyright}>
              © 2026 Sai Krishna Rao Anugu
            </span>
          </div>

          <div className={styles.footerCenter}>
            <span className={styles.footerTech}>
              Next.js · GSAP · Three.js · Tailwind
            </span>
          </div>

          <div className={styles.footerRight}>
            {profile.socials.map((social) => {
              const Icon = SOCIAL_ICON_MAP[social.label];
              if (!Icon) return null;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerSocial}
                  aria-label={social.label}
                >
                  <Icon size={13} />
                </a>
              );
            })}
            <a href={`mailto:${profile.email}`} className={styles.footerEmail}>
              {profile.email}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
