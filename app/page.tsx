"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import ContactForm from "../components/ContactForm";
import Cursor from "../components/Cursor";
import LanguageSwitcher from "../components/LanguageSwitcher";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOOL_GROUPS = [
  {
    label: "Languages",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-300",
    tools: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "Bash"],
  },
  {
    label: "Backend & Frameworks",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-300",
    tools: ["FastAPI", "Next.js", "React", "Node.js", "Express.js"],
  },
  {
    label: "AI/ML & Data Science",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-300",
    tools: ["PyTorch", "TensorFlow", "Scikit-learn", "LangChain", "HuggingFace", "Ollama", "OpenAI API", "Jupyter", "Pandas", "NumPy"],
  },
  {
    label: "Vector DB & Data Tools",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-300",
    tools: ["FAISS", "PostgreSQL", "Supabase", "MongoDB", "Redis", "Pinecone"],
  },
  {
    label: "Cloud & DevOps",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-300",
    tools: ["AWS", "Docker", "Databricks", "Apache Airflow", "Git", "Streamlit"],
  },
];

const EXPERTISE_CARDS = [
  {
    symbol: "⚙",
    title: "Backend & System Architecture",
    skills: [
      "API Design & REST Architecture",
      "PostgreSQL & Supabase Integration",
      "Relational Database Modeling",
      "Authentication & Backend Logic",
      "Production-ready Deployment",
    ],
    gradientFrom: "rgba(239,68,68,0.12)",
    accent: "#ef4444",
    hoverBorder: "hover:border-red-500/40",
  },
  {
    symbol: "◎",
    title: "AI & Machine Learning",
    skills: [
      "LLM Integration & Prompt Engineering",
      "Generative AI Workflows",
      "Deep Learning & Anomaly Detection",
      "NLP & Text Processing Pipelines",
      "Model Deployment (AWS / Databricks)",
    ],
    gradientFrom: "rgba(139,92,246,0.12)",
    accent: "#8b5cf6",
    hoverBorder: "hover:border-purple-500/40",
  },
  {
    symbol: "⬡",
    title: "Data Engineering",
    skills: [
      "ETL Pipeline Development",
      "Airflow Orchestration",
      "Data Cleaning & Validation",
      "Automated Reporting Pipelines",
      "Structured & Unstructured Data Processing",
    ],
    gradientFrom: "rgba(59,130,246,0.12)",
    accent: "#3b82f6",
    hoverBorder: "hover:border-blue-500/40",
  },
  {
    symbol: "◻",
    title: "Frontend & Product",
    skills: [
      "Next.js & React Development",
      "Modern UI Design with Tailwind",
      "Responsive Interfaces",
      "Startup Product Development",
      "Cross-functional Collaboration",
    ],
    gradientFrom: "rgba(6,182,212,0.12)",
    accent: "#06b6d4",
    hoverBorder: "hover:border-cyan-500/40",
  },
];

const CODE_LINES = [
  [{ t: "# SmartDoc AI — Local RAG Pipeline", c: "#6b7280" }],
  [],
  [
    { t: "from", c: "#c084fc" },
    { t: " langchain_ollama ", c: "#e2e8f0" },
    { t: "import", c: "#c084fc" },
    { t: " Ollama", c: "#67e8f9" },
  ],
  [
    { t: "from", c: "#c084fc" },
    { t: " langchain_community.vectorstores ", c: "#e2e8f0" },
    { t: "import", c: "#c084fc" },
    { t: " FAISS", c: "#67e8f9" },
  ],
  [],
  [
    { t: "llm", c: "#67e8f9" },
    { t: " = ", c: "#e2e8f0" },
    { t: "Ollama", c: "#fde047" },
    { t: '(model="mistral")', c: "#e2e8f0" },
  ],
  [
    { t: "retriever", c: "#67e8f9" },
    { t: " = vectorstore.", c: "#e2e8f0" },
    { t: "as_retriever", c: "#fde047" },
    { t: "(k=", c: "#e2e8f0" },
    { t: "5", c: "#fb923c" },
    { t: ")", c: "#e2e8f0" },
  ],
  [],
  [
    { t: "response", c: "#67e8f9" },
    { t: " = qa_chain.", c: "#e2e8f0" },
    { t: "invoke", c: "#fde047" },
    { t: "(query)", c: "#e2e8f0" },
  ],
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTypewriter(words: string[], typingMs = 80, deletingMs = 40, pauseMs = 2200) {
  const [displayed, setDisplayed] = useState(words[0] ?? "");
  const wordIdx = useRef(0);
  const charIdx = useRef(words[0]?.length ?? 0);
  const phase = useRef<"typing" | "pausing" | "deleting">("pausing");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[wordIdx.current];
      if (phase.current === "pausing") {
        phase.current = "deleting";
        timer = setTimeout(tick, deletingMs);
      } else if (phase.current === "deleting") {
        if (charIdx.current > 0) {
          charIdx.current--;
          setDisplayed(word.slice(0, charIdx.current));
          timer = setTimeout(tick, deletingMs);
        } else {
          wordIdx.current = (wordIdx.current + 1) % words.length;
          phase.current = "typing";
          timer = setTimeout(tick, typingMs);
        }
      } else {
        const nextWord = words[wordIdx.current];
        if (charIdx.current < nextWord.length) {
          charIdx.current++;
          setDisplayed(nextWord.slice(0, charIdx.current));
          timer = setTimeout(tick, typingMs);
        } else {
          phase.current = "pausing";
          timer = setTimeout(tick, pauseMs);
        }
      }
    };
    timer = setTimeout(tick, pauseMs);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return displayed;
}

// ─── Shared Components ────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 28 : 0,
    x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-3">
      <span className="w-6 h-px bg-red-500" />
      <span
        className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: "var(--font-space-mono)" }}
      >
        {children}
      </span>
      <span className="w-6 h-px bg-red-500" />
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] ${className}`}
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      {children}
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

// ─── Background ───────────────────────────────────────────────────────────────

function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050508]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <motion.div
        className="absolute -top-64 -right-32 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(239,68,68,0.13) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[45%] -left-48 w-[560px] h-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 65%)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[18%] w-[440px] h-[440px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id: "about", label: t.nav.about },
    { id: "expertise", label: t.nav.expertise },
    { id: "tools", label: t.nav.tools },
    { id: "projects", label: t.nav.projects },
    { id: "experience", label: t.nav.experience },
    { id: "education", label: t.nav.education },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/75 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl shadow-black/30" : ""
      }`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="text-lg font-black tracking-tight overflow-hidden"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          <span className="text-red-500">S</span>
          <span className="text-white">K</span>
          <span className="text-white/30">.</span>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200 overflow-hidden"
              style={{ fontFamily: "var(--font-poppins)", letterSpacing: "0.3px" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function CodeCard() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span
            className="ml-2 text-[11px] text-gray-500"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            smartdoc_rag.py
          </span>
        </div>

        <div className="p-6 text-[13px] leading-7" style={{ fontFamily: "var(--font-space-mono)" }}>
          {CODE_LINES.map((line, li) => (
            <div key={li} className="min-h-[1.75rem]">
              {line.map((tok, ti) => (
                <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute -top-5 -right-4 px-3.5 py-2 rounded-xl border border-white/10 text-[11px] whitespace-nowrap"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          fontFamily: "var(--font-space-mono)",
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-green-400">✓ 1,247 vectors indexed</span>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 px-3.5 py-2 rounded-xl border border-white/10 text-[11px] whitespace-nowrap"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          fontFamily: "var(--font-space-mono)",
        }}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="text-cyan-400">⚡ 1.2s · Local · No API</span>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const focusPills = ["AI Systems", "Backend Engineering", "Data & ML", "Product Design"];
  const role = useTypewriter(
    lang === "en"
      ? ["AI Software Engineer", "Data Scientist", "Backend Architect", "ML Engineer"]
      : ["KI-Softwareentwickler", "Data Scientist", "Backend-Architekt", "ML Engineer"]
  );

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_430px] gap-16 items-center">
          <div>
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium mb-8 cinematic-pill"
              style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(15,23,42,0.85))",
                borderColor: "rgba(74, 222, 128, 0.22)",
                color: "#bbf7d0",
                fontFamily: "var(--font-dm-sans)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Open to opportunities
            </motion.div>

            <motion.p
              className="text-gray-300 text-xl mb-3"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {t.hi}
            </motion.p>

            <motion.h1
              className="font-black leading-[1.03] mb-5"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: "spring", stiffness: 90 }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 25%, #fca5a5 65%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.nameFirst}
              </span>
              <br />
              <span className="text-red-500">{t.nameLast}</span>
            </motion.h1>

            <motion.div
              className="flex items-center gap-2 mb-7 h-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span
                className="text-xl text-gray-300"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {role}
                <span className="text-red-500 animate-pulse ml-0.5">▋</span>
              </span>
            </motion.div>

            <motion.p
              className="text-gray-300/90 text-lg leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {t.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72 }}
            >
              {focusPills.map((pill) => (
                <span
                  key={pill}
                  className="cinematic-pill rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-slate-200/90"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="https://github.com/SaiKrishnaRaoAnugu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors overflow-hidden"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <GithubIcon /> {t.github}
              </a>
              <a
                href="https://www.linkedin.com/in/sai-krishna-rao-anugu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-full transition-colors overflow-hidden"
                style={{
                  background: "#0077b5",
                  fontFamily: "var(--font-poppins)",
                }}
              >
                <LinkedinIcon /> {t.linkedin}
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative cinematic-shell rounded-[28px] p-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Gradient glow ring */}
              <div
                className="absolute -inset-1.5 rounded-3xl opacity-70"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #8b5cf6, #3b82f6)",
                  filter: "blur(10px)",
                }}
              />
              <div className="relative rounded-[24px] overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-black/30">
                <Image
                  src="/profile.jpg"
                  alt="Sai Krishna Rao Anugu"
                  width={380}
                  height={460}
                  className="object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              className="cinematic-shell rounded-3xl px-4 py-4 w-full max-w-[380px] text-sm text-slate-200/90"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-rose-200/80" style={{ fontFamily: "var(--font-space-mono)" }}>
                Current focus
              </p>
              <p className="mt-2 text-base font-semibold text-white">Building AI products with real-world backend impact.</p>
              <p className="mt-2 text-slate-300/90">Fast APIs, ML pipelines, and clean interfaces for ambitious teams.</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span
            className="text-[10px] text-gray-600 tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-gray-600/60 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  const stats = [
    { value: "3+", label: "Years Exp.", color: "#ef4444" },
    { value: "2", label: "Companies", color: "#8b5cf6" },
    { value: "3+", label: "Projects", color: "#3b82f6" },
    { value: "M.Sc.", label: "AI Focus", color: "#06b6d4" },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>{t.heading}</SectionLabel>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_340px] gap-14 items-start mt-2">
          <FadeIn delay={0.1}>
            <h2
              className="text-3xl lg:text-4xl font-black mb-6 leading-[1.18]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Building{" "}
              <span className="text-red-500">intelligent systems</span>
              <br />
              that scale in production
            </h2>
            <p
              className="text-gray-400 text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t.text}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} direction="right">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <GlassCard key={s.label} className="p-5 text-center hover:border-white/15 transition-colors">
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ color: s.color, fontFamily: "var(--font-poppins)" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-gray-500 text-[11px] font-semibold tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {s.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Expertise ────────────────────────────────────────────────────────────────

function Expertise() {
  const { lang } = useLanguage();
  const t = translations[lang].expertise;

  return (
    <section id="expertise" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionLabel>{t.heading}</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-black"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            What I bring to the table
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4">
          {EXPERTISE_CARDS.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.09}>
              <div
                className={`group relative p-7 rounded-2xl border border-white/[0.07] transition-all duration-500 overflow-hidden ${card.hoverBorder}`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 0% 0%, ${card.gradientFrom} 0%, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="text-2xl mb-4"
                    style={{ color: card.accent }}
                  >
                    {card.symbol}
                  </div>
                  <h3
                    className="text-base font-bold text-white mb-5"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {card.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {card.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2.5 text-gray-400 text-sm"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: card.accent }}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tools ────────────────────────────────────────────────────────────────────

function Tools() {
  const { lang } = useLanguage();
  const t = translations[lang].tools;

  return (
    <section id="tools" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionLabel>{t.heading}</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-black mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            My Tech Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {t.description}
          </p>
        </FadeIn>

        <div className="space-y-7">
          {TOOL_GROUPS.map((group, gi) => (
            <FadeIn key={group.label} delay={gi * 0.07}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span
                  className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-600 w-32 shrink-0"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {group.label}
                </span>
                <span className="w-px h-4 bg-white/[0.08] shrink-0" />
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool, ti) => (
                    <motion.span
                      key={tool}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-medium border cursor-default select-none ${group.bg} ${group.border} ${group.text}`}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                      initial={{ opacity: 0, scale: 0.82 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: gi * 0.04 + ti * 0.035,
                        type: "spring",
                        stiffness: 280,
                        damping: 18,
                      }}
                      whileHover={{ scale: 1.1, y: -3 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function RAGDiagram() {
  const nodes = [
    { label: "Document", color: "#3b82f6" },
    { label: "Embeddings", color: "#8b5cf6" },
    { label: "FAISS Index", color: "#06b6d4" },
    { label: "Mistral LLM", color: "#ef4444" },
    { label: "Answer", color: "#22c55e" },
  ];

  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex flex-col items-center">
          <motion.div
            className="px-4 py-1.5 rounded-lg border text-[11px] font-bold"
            style={{
              borderColor: `${node.color}50`,
              background: `${node.color}18`,
              color: node.color,
              fontFamily: "var(--font-space-mono)",
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            {node.label}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              className="w-px h-5"
              style={{
                background: `linear-gradient(to bottom, ${node.color}60, ${nodes[i + 1].color}60)`,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.08 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;
  const project = t.items[0];

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionLabel>{t.heading}</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-black"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Things I&apos;ve built
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="relative rounded-3xl border border-white/[0.07] overflow-hidden p-8 lg:p-10 group"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div
              className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700"
              style={{
                background: "radial-gradient(circle, #ef4444, transparent 65%)",
                transform: "translate(35%, -35%)",
              }}
            />

            <div className="relative grid lg:grid-cols-[1fr_220px] gap-10 items-start">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium mb-5"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    borderColor: "rgba(34,197,94,0.2)",
                    color: "#4ade80",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Completed
                </div>

                <h3
                  className="text-2xl lg:text-[1.75rem] font-black text-white mb-4 leading-snug"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-gray-400 leading-relaxed mb-7 max-w-2xl"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["LangChain", "Mistral LLM", "Ollama", "FAISS", "HuggingFace", "Streamlit", "Python"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg border border-white/[0.07] text-gray-300 text-xs font-medium"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          fontFamily: "var(--font-space-mono)",
                        }}
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <a
                  href="https://github.com/SaiKrishnaRaoAnugu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white text-sm font-semibold rounded-full hover:bg-white/[0.07] hover:border-white/30 transition-all overflow-hidden"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  <GithubIcon /> {project.repoLabel}
                </a>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <RAGDiagram />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang].experience;

  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionLabel>{t.heading}</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-black"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            My journey
          </h2>
        </FadeIn>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-[22px] top-6 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-white/[0.06] to-transparent" />

          <div className="space-y-6">
            {t.entries.map((entry: { title: string; period: string; description: string }, i: number) => (
              <FadeIn key={entry.title} delay={i * 0.08}>
                <div className="relative pl-14">
                  <div
                    className={`absolute left-[15px] top-6 w-[15px] h-[15px] rounded-full border-2 -translate-x-1/2 transition-all ${
                      i === 0
                        ? "bg-red-500 border-red-500"
                        : "bg-[#050508] border-white/20"
                    }`}
                    style={
                      i === 0
                        ? { boxShadow: "0 0 14px rgba(239,68,68,0.7), 0 0 28px rgba(239,68,68,0.3)" }
                        : {}
                    }
                  />

                  <GlassCard
                    className={`p-5 transition-all duration-300 hover:border-white/15 ${
                      i === 0 ? "border-red-500/20" : ""
                    }`}
                  >
                    {i === 0 && (
                      <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold mb-2.5"
                        style={{
                          background: "rgba(239,68,68,0.08)",
                          borderColor: "rgba(239,68,68,0.2)",
                          color: "#f87171",
                          fontFamily: "var(--font-space-mono)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        CURRENT
                      </div>
                    )}
                    <h3
                      className="text-[15px] font-bold text-white mb-1.5 leading-snug"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {entry.title}
                    </h3>
                    <p
                      className="text-[11px] text-red-400 mb-2.5"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {entry.period}
                    </p>
                    {entry.description && (
                      <p
                        className="text-gray-400 text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {entry.description}
                      </p>
                    )}
                  </GlassCard>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────

function Education() {
  const { lang } = useLanguage();
  const t = translations[lang].education;

  const degrees = [
    {
      degree: "M.Sc.",
      field: "Mechatronics",
      spec: "AI Specialization",
      school: "Universität Siegen",
      location: "Germany · 2021–2024",
      color: "#8b5cf6",
    },
    {
      degree: "B.Tech",
      field: "Mechanical Engineering",
      spec: "",
      school: "JNTU Hyderabad",
      location: "India · 2015–2019",
      color: "#3b82f6",
    },
  ];

  return (
    <section id="education" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionLabel>{t.heading}</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-black"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Academic background
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {degrees.map((edu, i) => (
            <FadeIn key={edu.school} delay={i * 0.14}>
              <GlassCard className="p-7 hover:border-white/15 transition-colors group">
                <div
                  className="text-4xl font-black mb-3 transition-colors"
                  style={{ color: edu.color, fontFamily: "var(--font-poppins)" }}
                >
                  {edu.degree}
                </div>
                <div
                  className="text-white font-bold text-lg mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {edu.field}
                </div>
                {edu.spec && (
                  <span
                    className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-gray-400 mb-3"
                    style={{ background: "rgba(255,255,255,0.04)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {edu.spec}
                  </span>
                )}
                <div
                  className="text-gray-400 text-sm mt-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {edu.school}
                </div>
                <div
                  className="text-gray-600 text-xs mt-1"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {edu.location}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <SectionLabel>{t.heading}</SectionLabel>
          <h2
            className="text-3xl lg:text-4xl font-black mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Let&apos;s work together
          </h2>
          <p
            className="text-gray-400 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t.intro}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 max-w-4xl mx-auto">
          <FadeIn delay={0.1} direction="left">
            <div className="space-y-4">
              <GlassCard className="p-5">
                <div
                  className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-3"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Email
                </div>
                <a
                  href="mailto:saikrishna20rao@gmail.com"
                  className="text-[13px] text-gray-300 hover:text-red-400 transition-colors break-all overflow-hidden block"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  saikrishna20rao@gmail.com
                </a>
              </GlassCard>

              <GlassCard className="p-5">
                <div
                  className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-3"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Location
                </div>
                <p
                  className="text-sm text-gray-300"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Siegen, Germany
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <div
                  className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Connect
                </div>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://github.com/SaiKrishnaRaoAnugu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.07] text-gray-300 hover:text-white hover:border-white/20 transition-all text-sm overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    <GithubIcon /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sai-krishna-rao-anugu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm overflow-hidden transition-all"
                    style={{
                      background: "rgba(0,119,181,0.08)",
                      borderColor: "rgba(0,119,181,0.2)",
                      color: "#38bdf8",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    <LinkedinIcon /> LinkedIn
                  </a>
                </div>
              </GlassCard>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="right">
            <GlassCard className="p-7 lg:p-8">
              <ContactForm />
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-12 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-gray-600 text-sm"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          © 2025 Sai Krishna Rao Anugu
        </p>
        <p
          className="text-gray-700 text-[11px]"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          Next.js · Framer Motion · Tailwind CSS
        </p>
        <a
          href="#hero"
          className="text-[11px] text-gray-600 hover:text-red-400 transition-colors overflow-hidden"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          back to top ↑
        </a>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <BackgroundDecoration />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Tools />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
