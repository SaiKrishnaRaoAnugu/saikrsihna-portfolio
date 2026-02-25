"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedGradientBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; size: number; duration: number; color: string; left: number; bottom: number }>>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    const generatedParticles = [...Array(6)].map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      duration: 10 + Math.random() * 8,
      color: ["rgba(239, 68, 68, 0.3)", "rgba(139, 92, 246, 0.3)", "rgba(34, 211, 238, 0.3)"][i % 3],
      left: Math.random() * 100,
      bottom: Math.random() * 30,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0099ff" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Animated Wave 1 - Red/Pink */}
        <motion.path
          d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z"
          fill="url(#grad1)"
          animate={{
            d: [
              "M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z",
              "M0,400 Q300,350 600,300 T1200,400 L1200,800 L0,800 Z",
              "M0,400 Q300,250 600,400 T1200,400 L1200,800 L0,800 Z",
              "M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Wave 2 - Purple/Blue */}
        <motion.path
          d="M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z"
          fill="url(#grad2)"
          animate={{
            d: [
              "M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z",
              "M0,500 Q300,450 600,400 T1200,500 L1200,800 L0,800 Z",
              "M0,500 Q300,350 600,500 T1200,500 L1200,800 L0,800 Z",
              "M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        {/* Animated Wave 3 - Cyan/Blue */}
        <motion.path
          d="M0,550 Q300,450 600,550 T1200,550 L1200,800 L0,800 Z"
          fill="url(#grad3)"
          animate={{
            d: [
              "M0,550 Q300,450 600,550 T1200,550 L1200,800 L0,800 Z",
              "M0,550 Q300,500 600,450 T1200,550 L1200,800 L0,800 Z",
              "M0,550 Q300,400 600,550 T1200,550 L1200,800 L0,800 Z",
              "M0,550 Q300,450 600,550 T1200,550 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />

        {/* Top gradient fade */}
        <linearGradient id="topGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <rect width="100%" height="200" fill="url(#topGrad)" />
      </svg>

      {/* Floating accent particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.color,
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, (particle.left * 80) / 100 - 40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.5,
          }}
        />
      ))}
    </div>
  );
}
