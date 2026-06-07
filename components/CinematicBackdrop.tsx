"use client";

import { motion } from "framer-motion";

export default function CinematicBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#020617_0%,#04070d_45%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      <motion.div
        className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(251,113,133,0.18) 0%, rgba(251,113,133,0.02) 45%, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-130px] top-[20%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.02) 45%, transparent 70%)" }}
        animate={{ x: [0, 22, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-140px] bottom-[8%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.02) 45%, transparent 70%)" }}
        animate={{ x: [0, -18, 0], y: [0, 18, 0], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.55))]" />
    </div>
  );
}
