import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
<<<<<<< HEAD
  const [lang, setLang] = useState<Language>("pt");
=======
  const [lang, setLang] = useState<Language>("en");
>>>>>>> 685d931351716fe5c007a93328cec9c978e4a597

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
