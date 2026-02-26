"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const toggle = () => {
    setLang(lang === "en" ? "eu" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="text-sm text-gray-400 hover:text-white transition px-2 py-1 border border-transparent hover:border-gray-400 rounded"
    >
      {lang.toUpperCase()}
    </button>
  );
}
