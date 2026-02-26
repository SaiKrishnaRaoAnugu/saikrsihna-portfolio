import { Lang } from "../context/LanguageContext";

// add as many keys as required; this is a starter set for hero and nav
export const translations: Record<Lang, Record<string, string>> = {
  en: {
    about: "About",
    expertise: "Expertise",
    tools: "Tools",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
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
  eu: {
    about: "Sobre",
    expertise: "Experiencia",
    tools: "Herramientas",
    projects: "Proyectos",
    experience: "Experiencia",
    education: "Educación",
    contact: "Contacto",
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
};

export function t(key: string, lang: Lang) {
  return translations[lang]?.[key] || key;
}
