import { Lang } from "../context/LanguageContext";

// add as many keys as required; this is a starter set for hero and nav
export const translations: Record<Lang, any> = {
  en: {
    nav: {
      about: "About",
      expertise: "Expertise",
      tools: "Tools",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      hi: "Hi There! I'm",
      nameFirst: "Sai Krishna Rao",
      nameLast: "Anugu",
      title: "AI Software Engineer | Data Scientist",
      description:
        "AI Software Engineer building scalable backend systems, AI powered applications, and production ready data architectures.",
      github: "GitHub",
      linkedin: "LinkedIn",
      downloadCv: "Download CV",
    },
    about: {
      heading: "ABOUT",
      text: "AI Software Engineer focused on backend architecture, AI integration, and scalable system design. At A-Team Event GmbH, I build API-driven backend systems with PostgreSQL and Supabase, develop AI-powered workflows using LLMs, and design modern frontend interfaces. Previously at Robert Bosch, I developed anomaly detection pipelines using deep learning and Generative AI, combining data science expertise with production engineering.",
    },
    expertise: {
      heading: "TECHNICAL EXPERTISE",
      categories: {
        backend: {
          title: "Backend & System Architecture",
          skills: [
            "• API Design & REST Architecture",
            "• PostgreSQL & Supabase Integration",
            "• Relational Database Modeling",
            "• Authentication & Backend Logic",
            "• Production-ready Deployment",
          ],
        },
        ai: {
          title: "AI & Machine Learning Systems",
          skills: [
            "• LLM Integration & Prompt Engineering",
            "• Generative AI Workflows",
            "• Deep Learning & Anomaly Detection",
            "• NLP & Text Processing Pipelines",
            "• Model Deployment (AWS / Databricks)",
          ],
        },
        data: {
          title: "Data Engineering",
          skills: [
            "• ETL Pipeline Development",
            "• Airflow Orchestration",
            "• Data Cleaning & Validation",
            "• Automated Reporting Pipelines",
            "• Structured & Unstructured Data Processing",
          ],
        },
        frontend: {
          title: "Frontend & Product Development",
          skills: [
            "• Next.js & React Development",
            "• Modern UI Design with Tailwind",
            "• Responsive Interfaces",
            "• Startup Product Development",
            "• Cross-functional Collaboration",
          ],
        },
      },
    },
    tools: {
      heading: "TOOLS & TECHNOLOGIES",
    },
    projects: {
      heading: "PROJECTS",
      items: [
        {
          title: "SmartDoc AI — Local RAG-based Knowledge Assistant",
          description:
            "Developed an end-to-end Retrieval Augmented Generation (RAG) system using LangChain and Mistral LLM via Ollama for fully local inference. Implemented semantic document retrieval using FAISS vector database with HuggingFace embeddings and built a modern Streamlit interface for privacy-focused document question answering without external APIs.",
          repoLabel: "View GitHub Repository",
        },
      ],
    },
    experience: {
      heading: "EXPERIENCE",
      entries: [
        {
          title: "AI Software Engineer — A-Team Event GmbH(Siegen, Germany)",
          period: "08/2025 – Present",
          description:
            "Developing AI-integrated backend systems, managing PostgreSQL databases, implementing API architectures, and building modern frontend interfaces for startup-scale platforms.",
        },
        {
          title: "Data Scientist (Master Thesis) — Robert Bosch GmbH(Kusterdingen, Germany)",
          period: "01/2024 – 06/2024",
          description:
            "Designed anomaly detection systems using Generative AI, built ETL pipelines with Airflow, and deployed models in cloud environments.",
        },
        {
          title: "ML Engineer Intern — Robert Bosch GmbH(Kusterdingen, Germany)",
          period: "07/2023 – 12/2023",
          description:
            "Automated data pipelines, built KPI dashboards, and improved analysis workflows by 30%.",
        },
        {
          title: "Data Analyst Trainee — Brainnest(Bremen, Germany)",
          period: "01/2023 – 02/2023",
          description: "",
        },
        {
          title: "Working Student — Intelligent Systems Group(University of Siegen, Germany)",
          period: "06/2022 – 01/2023",
          description: "",
        },
        {
          title: "Graduate Engineer Trainee — Network Enhancers(Hyderabad, India)",
          period: "06/2019 – 06/2020",
          description: "",
        },
      ],
    },
    education: {
      heading: "EDUCATION",
      items: [
        {
          text: "M.Sc. Mechatronics (AI Specialization) — Universität Siegen (2021–2024)",
        },
        {
          text: "B.Tech Mechanical Engineering — JNTU Hyderabad (2015–2019)",
        },
      ],
    },
    contact: {
      heading: "CONTACT",
      intro:
        "Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.",
    },
  },
  de: {
    nav: {
      about: "Über",
      expertise: "Expertise",
      tools: "Werkzeuge",
      projects: "Projekte",
      experience: "Erfahrung",
      education: "Ausbildung",
      contact: "Kontakt",
    },
    hero: {
      hi: "Hallo! Ich bin",
      nameFirst: "Sai Krishna Rao",
      nameLast: "Anugu",
      title: "KI-Softwareentwickler | Data Scientist",
      description:
        "KI-Softwareentwickler, der skalierbare Backend-Systeme, KI-gestützte Anwendungen und produktionsbereite Datenarchitekturen entwickelt.",
      github: "GitHub",
      linkedin: "LinkedIn",
      downloadCv: "Lebenslauf herunterladen",
    },
    about: {
      heading: "ÜBER",
      text: "KI-Softwareentwickler mit Schwerpunkt auf Backend-Architektur, KI-Integration und skalierbarem Systemdesign. Bei A-Team Event GmbH baue ich API-gesteuerte Backend-Systeme mit PostgreSQL und Supabase, entwickle KI-gestützte Workflows mit LLMs und gestalte moderne Frontend-Oberflächen. Zuvor habe ich bei Robert Bosch Anomalieerkennungspipelines mit Deep Learning und Generativer KI entwickelt und dabei Data-Science-Expertise mit Produktionstechnik kombiniert.",
    },
    expertise: {
      heading: "TECHNISCHE EXPERTISE",
      categories: {
        backend: {
          title: "Backend- & Systemarchitektur",
          skills: [
            "• API-Design & REST-Architektur",
            "• PostgreSQL- & Supabase-Integration",
            "• Relationale Datenmodellierung",
            "• Authentifizierung & Backend-Logik",
            "• Produktionsbereite Bereitstellung",
          ],
        },
        ai: {
          title: "KI- & Maschinelles Lernen Systeme",
          skills: [
            "• LLM-Integration & Prompt Engineering",
            "• Generative KI-Workflows",
            "• Deep Learning & Anomalieerkennung",
            "• NLP- & Textverarbeitungspipelines",
            "• Modellbereitstellung (AWS / Databricks)",
          ],
        },
        data: {
          title: "Datenengineering",
          skills: [
            "• Entwicklung von ETL-Pipelines",
            "• Airflow-Orchestrierung",
            "• Datenbereinigung & Validierung",
            "• Automatisierte Berichtspipelines",
            "• Verarbeitung strukturierter & unstrukturierter Daten",
          ],
        },
        frontend: {
          title: "Frontend & Produktentwicklung",
          skills: [
            "• Next.js & React Entwicklung",
            "• Modernes UI-Design mit Tailwind",
            "• Responsive Oberflächen",
            "• Produktentwicklung in Startups",
            "• Interdisziplinäre Zusammenarbeit",
          ],
        },
      },
    },
    tools: {
      heading: "WERKZEUGE & TECHNOLOGIEN",
    },
    projects: {
      heading: "PROJEKTE",
      items: [
        {
          title: "SmartDoc AI — Lokaler RAG-basierter Wissensassistent",
          description:
            "Entwickelte ein komplettes Retrieval Augmented Generation (RAG) System mit LangChain und Mistral LLM über Ollama für vollständig lokale Inferenz. Implementierte semantische Dokumentenabrufung mit FAISS-Vektordatenbank und HuggingFace-Embeddings und baute eine moderne Streamlit-Oberfläche für datenschutzorientiertes Dokumenten-Question-Answering ohne externe APIs.",
          repoLabel: "GitHub-Repository ansehen",
        },
      ],
    },
    experience: {
      heading: "ERFAHRUNG",
      entries: [
        {
          title: "KI-Softwareentwickler — A-Team Event GmbH (Siegen, Deutschland)",
          period: "08/2025 – Gegenwart",
          description:
            "Entwicklung KI-integrierter Backend-Systeme, Verwaltung von PostgreSQL-Datenbanken, Implementierung von API-Architekturen und Aufbau moderner Frontend-Oberflächen für Plattformen im Startup-Maßstab.",
        },
        {
          title: "Data Scientist (Masterarbeit) — Robert Bosch GmbH (Kusterdingen, Deutschland)",
          period: "01/2024 – 06/2024",
          description:
            "Entwurf von Anomalieerkennungssystemen mit generativer KI, Aufbau von ETL-Pipelines mit Airflow und Bereitstellung von Modellen in Cloud-Umgebungen.",
        },
        {
          title: "ML Engineer Praktikant — Robert Bosch GmbH (Kusterdingen, Deutschland)",
          period: "07/2023 – 12/2023",
          description:
            "Automatisierte Datenpipelines, Erstellung von KPI-Dashboards und Verbesserung der Analyse-Workflows um 30 %.",
        },
        {
          title: "Data Analyst Trainee — Brainnest (Bremen, Deutschland)",
          period: "01/2023 – 02/2023",
          description: "",
        },
        {
          title: "Werkstudent — Intelligent Systems Group (Universität Siegen, Deutschland)",
          period: "06/2022 – 01/2023",
          description: "",
        },
        {
          title: "Graduate Engineer Trainee — Network Enhancers (Hyderabad, Indien)",
          period: "06/2019 – 06/2020",
          description: "",
        },
      ],
    },
    education: {
      heading: "AUSBILDUNG",
      items: [
        {
          text: "M.Sc. Mechatronik (KI-Spezialisierung) — Universität Siegen (2021–2024)",
        },
        {
          text: "B.Tech Maschinenbau — JNTU Hyderabad (2015–2019)",
        },
      ],
    },
    contact: {
      heading: "KONTAKT",
      intro:
        "Haben Sie eine Frage oder möchten Sie zusammenarbeiten? Füllen Sie das folgende Formular aus und ich melde mich so schnell wie möglich bei Ihnen.",
    },
  },
};

export function t(path: string, lang: Lang) {
  const parts = path.split(".");
  let val: any = translations[lang];
  for (const p of parts) {
    if (val == null) return path;
    val = val[p];
  }
  return val ?? path;
}
