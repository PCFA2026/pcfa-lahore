"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { en } from "./lang-en";
import { zh } from "./lang-zh";
import type { Dict, Lang } from "./dictionary";

const messages: Record<Lang, Dict> = { en, zh };

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("pcfa-lang") as Lang | null;
    if (stored === "en" || stored === "zh") {
      // Schedule the update after hydration so we don't call setState
      // synchronously inside the effect body.
      queueMicrotask(() => setLangState(stored));
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("pcfa-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: messages[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
