"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SpotlightCursor from "../components/SpotlightCursor";
import AnimatedGradientBackground from "../components/AnimatedGradientBackground";
import ContactForm from "../components/ContactForm";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { t, translations } from "../lib/translations";  // simple translation helper

const AnimatedSection = ({ children, delayChildren = false }: { children: React.ReactNode; delayChildren?: boolean }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, staggerChildren: delayChildren ? 0.1 : 0 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white scroll-smooth overflow-hidden">
      {/* Spotlight cursor (client-only) */}
      <SpotlightCursor />

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-white/5 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <LanguageSwitcher />
          <div className="flex gap-8 text-sm text-gray-400">
            {[
              "about",
              "expertise",
              "tools",
              "projects",
              "experience",
              "education",
              "contact",
            ].map((key, i) => (
              <motion.a
                key={i}
                href={`#${key}`}
                whileHover={{ color: "#ef4444", y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-red-500 transition cursor-pointer"
              >
                {t(key, lang)}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 pt-28 relative bg-black overflow-hidden">
        {/* Animated gradient background */}
        <AnimatedGradientBackground />

        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none z-5" />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.p
              className="text-gray-300 text-lg font-light tracking-wide"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {t("hi", lang)}
            </motion.p>

            <motion.h1
              className="relative text-5xl md:text-7xl font-black tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 -z-10 rounded-2xl blur-3xl bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-600 opacity-25" />
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-300 to-white">
                  Sai Krishna Rao
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-red-400 text-3xl md:text-4xl font-semibold">
                  Anugu
                </span>
              </span>
            </motion.h1>

            <motion.h2
              className="text-3xl md:text-5xl font-semibold text-gray-300 tracking-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t("title", lang)}
            </motion.h2>

            <motion.p
              className="text-gray-400 max-w-xl leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t("description", lang)}
            </motion.p>

            <motion.div
              className="flex gap-6 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                { label: t("github", lang), url: "https://github.com/SaiKrishnaRaoAnugu" },
                { label: t("linkedin", lang), url: "https://www.linkedin.com/in/saikrishnaraoanugu" },
                { label: t("downloadCv", lang), url: "/SaiKrishnaRao_Resume.pdf", download: true },
              ].map((btn, i) => (
                <motion.a
                  key={i}
                  href={btn.url}
                  target={btn.url.startsWith("http") ? "_blank" : undefined}
                  rel={btn.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  download={btn.download ? "SaiKrishnaRao_Resume.pdf" : undefined}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-white hover:border-red-500 hover:text-red-500 transition text-sm tracking-wide"
                >
                  {btn.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* PROFILE IMAGE */}
          <motion.div
            className="relative flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 40px rgba(239, 68, 68, 0.6)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src="/profile.jpg"
                alt="Sai Krishna Rao Anugu"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 max-w-4xl mx-auto">
        <AnimatedSection>
          <motion.h2
            className="text-2xl font-semibold mb-10 text-red-500 tracking-wide relative inline-block"
            style={{ fontFamily: 'var(--font-poppins)' }}
            whileInView={{ x: [0] }}
            transition={{ staggerChildren: 0.1 }}
          >
            ABOUT
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-red-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </motion.h2>

          <motion.p
            className="text-gray-300 leading-loose text-lg font-light"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            AI Software Engineer focused on backend architecture, AI integration,
            and scalable system design. At A-Team Event GmbH, I build API-driven
            backend systems with PostgreSQL and Supabase, develop AI-powered workflows
            using LLMs, and design modern frontend interfaces. Previously at Robert Bosch,
            I developed anomaly detection pipelines using deep learning and Generative AI,
            combining data science expertise with production engineering.
          </motion.p>
        </AnimatedSection>
      </section>

      {/* TECHNICAL EXPERTISE */}
      <section id="skills" className="py-32 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <motion.h2
              className="text-2xl font-semibold mb-20 text-red-500 tracking-wide text-center relative inline-block w-full"
              style={{ fontFamily: 'var(--font-poppins)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>TECHNICAL EXPERTISE</div>
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: "50%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-14"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {[
                {
                  title: "Backend & System Architecture",
                  skills: [
                    "• API Design & REST Architecture",
                    "• PostgreSQL & Supabase Integration",
                    "• Relational Database Modeling",
                    "• Authentication & Backend Logic",
                    "• Production-ready Deployment",
                  ],
                },
                {
                  title: "AI & Machine Learning Systems",
                  skills: [
                    "• LLM Integration & Prompt Engineering",
                    "• Generative AI Workflows",
                    "• Deep Learning & Anomaly Detection",
                    "• NLP & Text Processing Pipelines",
                    "• Model Deployment (AWS / Databricks)",
                  ],
                },
                {
                  title: "Data Engineering",
                  skills: [
                    "• ETL Pipeline Development",
                    "• Airflow Orchestration",
                    "• Data Cleaning & Validation",
                    "• Automated Reporting Pipelines",
                    "• Structured & Unstructured Data Processing",
                  ],
                },
                {
                  title: "Frontend & Product Development",
                  skills: [
                    "• Next.js & React Development",
                    "• Modern UI Design with Tailwind",
                    "• Responsive Interfaces",
                    "• Startup Product Development",
                    "• Cross-functional Collaboration",
                  ],
                },
              ].map((category, i) => (
                <motion.div
                  key={i}
                  className="p-8 border border-white/10 rounded-lg hover:border-red-500/50 transition relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
                    borderColor: "rgba(239, 68, 68, 0.5)",
                    y: -8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-500/0 to-red-500/0 opacity-0"
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <h3 className="text-lg font-semibold mb-6 text-white relative z-10 flex items-center gap-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                    <motion.span
                      className="w-1 h-1 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                    {category.title}
                  </h3>
                  <ul className="space-y-3 text-gray-400 relative z-10" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                    {category.skills.map((skill, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (i * 0.05) + (j * 0.03) }}
                        className="hover:text-red-400 transition"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* TOOLS & TECHNOLOGIES */}
      <section id="tools" className="py-32 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <motion.h2
              className="text-2xl font-semibold mb-20 text-red-500 tracking-wide text-center relative inline-block w-full"
              style={{ fontFamily: 'var(--font-poppins)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>{t("tools.heading", lang)}</div>
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: "50%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </motion.h2>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            >
              {[
                { name: "Python", symbol: "🐍", category: "Language" },
                { name: "PostgreSQL", symbol: "🐘", category: "Database" },
                { name: "Supabase", symbol: "🔷", category: "Backend" },
                { name: "LangChain", symbol: "⛓️", category: "AI Framework" },
                { name: "LLMs", symbol: "🤖", category: "AI/ML" },
                { name: "Mistral", symbol: "🌟", category: "LLM" },
                { name: "Ollama", symbol: "🦙", category: "LLM Runtime" },
                { name: "Next.js", symbol: "▲", category: "Frontend" },
                { name: "React", symbol: "⚛️", category: "Frontend" },
                { name: "Tailwind CSS", symbol: "🎨", category: "Styling" },
                { name: "Framer Motion", symbol: "✨", category: "Animation" },
                { name: "Streamlit", symbol: "🎈", category: "UI Framework" },
                { name: "Airflow", symbol: "🔄", category: "Orchestration" },
                { name: "FAISS", symbol: "🔍", category: "Vector DB" },
                { name: "AWS", symbol: "☁️", category: "Cloud" },
                { name: "Databricks", symbol: "🧱", category: "Data Platform" },
                { name: "PyTorch", symbol: "🔥", category: "Deep Learning" },
                { name: "TensorFlow", symbol: "📊", category: "ML Framework" },
                { name: "Pandas", symbol: "🐼", category: "Data Science" },
                { name: "NumPy", symbol: "📈", category: "Numerical" },
                { name: "Scikit-learn", symbol: "🤖", category: "ML" },
                { name: "Git", symbol: "🔀", category: "Version Control" },
                { name: "Docker", symbol: "🐳", category: "DevOps" },
                { name: "TypeScript", symbol: "📘", category: "Language" },
              ].map((tool, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-lg border border-white/10 hover:border-red-500/50 transition flex flex-col items-center justify-center gap-3 group relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
                    borderColor: "rgba(239, 68, 68, 0.5)",
                    y: -4,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-500/0 to-red-500/0 opacity-0"
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="text-4xl group-hover:scale-110 transition-transform duration-300"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.05 }}
                  >
                    {tool.symbol}
                  </motion.div>

                  <div className="text-center relative z-10">
                    <h4 className="font-semibold text-white text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {tool.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                      {tool.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
      <section id="projects" className="py-32 px-6 max-w-5xl mx-auto">
        <AnimatedSection>
          <motion.h2
            className="text-2xl font-semibold mb-20 text-red-500 tracking-wide text-center relative inline-block w-full"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>{t("projects.heading", lang)}</div>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-500"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>

          {translations[lang].projects.items.map((proj: any, idx: number) => (
            <motion.div
              key={idx}
              className="border border-white/10 p-10 rounded-lg hover:border-red-500/50 transition relative group mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ boxShadow: "0 0 40px rgba(239, 68, 68, 0.25)", y: -6 }}
              transition={{ duration: 0.3 }}
            >
            {/* Animated corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 border-t border-r border-red-500/30 rounded-tr-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.h3
              className="text-xl font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {proj.title}
            </motion.h3>

            <motion.p
              className="text-gray-400 leading-relaxed mb-6 font-light"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {proj.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.a
                href="https://github.com/SaiKrishnaRaoAnugu/SmartDoc-AI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-white hover:border-red-500 hover:text-red-500 transition text-sm tracking-wide inline-block"
              >
                {proj.repoLabel}
              </motion.a>
            </motion.div>
          </motion.div>
        ))}
        </AnimatedSection>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-32 px-6 max-w-5xl mx-auto">
        <AnimatedSection>
          <motion.h2
            className="text-2xl font-semibold mb-20 text-red-500 tracking-wide text-center relative inline-block w-full"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>{t("experience.heading", lang)}</div>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-500"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>

          <motion.div
            className="space-y-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {translations[lang].experience.entries.map((exp: any, i: number) => (
              <motion.div
                key={i}
                className="border-l-4 border-red-500/30 pl-8 hover:pl-10 transition-all relative group hover:border-red-500"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
              >
                {/* Animated dot */}
                <motion.div
                  className="absolute -left-3 top-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0b0b0b]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
                
                <motion.h3
                  className="text-lg font-semibold text-white group-hover:text-red-400 transition"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  {exp.title}
                </motion.h3>
                <motion.p
                  className="text-gray-500 text-sm mt-2 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 + 0.15 }}
                >
                  {exp.period}
                </motion.p>
                {exp.description && (
                  <motion.p
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                  >
                    {exp.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-32 px-6 bg-[#111] text-center">
        <AnimatedSection>
          <motion.h2
            className="text-2xl font-semibold mb-16 text-red-500 tracking-wide relative inline-block w-full"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>{t("education.heading", lang)}</div>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-500"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>

          <motion.div
            className="space-y-8 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          >
            {translations[lang].education.items.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                className="p-6 rounded-lg border border-white/10 hover:border-red-500/50 transition"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)", y: -4 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <p
                  className="text-gray-300 text-lg font-light"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 text-center">
        <AnimatedSection>
          <motion.h2
            className="text-2xl font-semibold mb-10 text-red-500 tracking-wide relative inline-block w-full"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>{t("contact.heading", lang)}</div>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-500"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>

          <motion.p
            className="text-gray-400 text-center mt-12 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {t("contact.intro", lang)}
          </motion.p>

          {/* Contact Info */}
          <motion.div
            className="flex justify-center gap-12 mt-10 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a
              href="mailto:saikrishnaraoanugu@gmail.com"
              className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              <span className="text-2xl">✉️</span>
              <span>saikrishnaraoanugu@gmail.com</span>
            </a>
            <a
              href="tel:+4917655096300"
              className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              <span className="text-2xl">📱</span>
              <span>+49 176 55096300</span>
            </a>
          </motion.div>

          <div className="mt-12">
            <ContactForm />
          </div>
        </AnimatedSection>
      </section>

    </main>
  );
}