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
  eu: {
    nav: {
      about: "Sobre",
      expertise: "Experiencia",
      tools: "Herramientas",
      projects: "Proyectos",
      experience: "Experiencia",
      education: "Educación",
      contact: "Contacto",
    },
    hero: {
      hi: "¡Hola! Soy",
      nameFirst: "Sai Krishna Rao",
      nameLast: "Anugu",
      title: "Ingeniero de Software de IA | Científico de Datos",
      description:
        "Ingeniero de software de IA que construye sistemas de backend escalables, aplicaciones impulsadas por IA y arquitecturas de datos listas para producción.",
      github: "GitHub",
      linkedin: "LinkedIn",
      downloadCv: "Descargar CV",
    },
    about: {
      heading: "SOBRE",
      text: "Ingeniero de Software de IA enfocado en la arquitectura de backend, integración de IA y diseño de sistemas escalables. En A-Team Event GmbH, construyo sistemas de backend dirigidos por API con PostgreSQL y Supabase, desarrollo flujos de trabajo potenciado por IA usando LLMs y diseño interfaces frontend modernas. Anteriormente en Robert Bosch, desarrollé pipelines de detección de anomalías usando aprendizaje profundo y IA Generativa, combinando experiencia en ciencia de datos con ingeniería de producción.",
    },
    expertise: {
      heading: "EXPERIENCIA TÉCNICA",
      categories: {
        backend: {
          title: "Arquitectura de Backend y Sistemas",
          skills: [
            "• Diseño de API y Arquitectura REST",
            "• Integración PostgreSQL y Supabase",
            "• Modelado de Bases de Datos Relacionales",
            "• Autenticación y Lógica de Backend",
            "• Despliegue listo para producción",
          ],
        },
        ai: {
          title: "Sistemas de IA y Aprendizaje Automático",
          skills: [
            "• Integración de LLM y Prompt Engineering",
            "• Flujos de trabajo Generativos IA",
            "• Aprendizaje profundo y detección de anomalías",
            "• Pipelines de NLP y procesamiento de texto",
            "• Despliegue de modelos (AWS / Databricks)",
          ],
        },
        data: {
          title: "Ingeniería de Datos",
          skills: [
            "• Desarrollo de pipelines ETL",
            "• Orquestación Airflow",
            "• Limpieza y validación de datos",
            "• Pipelines de informes automatizados",
            "• Procesamiento de datos estructurados y no estructurados",
          ],
        },
        frontend: {
          title: "Frontend y Desarrollo de Productos",
          skills: [
            "• Desarrollo Next.js y React",
            "• Diseño UI moderno con Tailwind",
            "• Interfaces responsivas",
            "• Desarrollo de productos en startups",
            "• Colaboración interfuncional",
          ],
        },
      },
    },
    tools: {
      heading: "HERRAMIENTAS Y TECNOLOGÍAS",
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
