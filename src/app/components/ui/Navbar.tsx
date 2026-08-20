import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentLang: "pt" | "en";
  onLanguageChange: (lang: "pt" | "en") => void;
  onNavigate: (page: string) => void;
  showTalks?: boolean;
}

export function Navbar({ currentLang, onLanguageChange, onNavigate, showTalks = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseItems = {
    pt: [
     
      { label: "Sobre", value: "about" },
      { label: "Projetos", value: "work" },
      { label: "Palestras", value: "talks", conditional: true },
      { label: "Experiência", value: "experience" },
      { label: "Contato", value: "contact" },
    ],
    en: [
      { label: "Work", value: "work" },
      { label: "About", value: "about" },
      { label: "Talks", value: "talks", conditional: true },
      { label: "Experience", value: "experience" },
      { label: "Contact", value: "contact" },
    ],
  };

  const navItems = {
    pt: baseItems.pt.filter(i => !i.conditional || showTalks),
    en: baseItems.en.filter(i => !i.conditional || showTalks),
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/6"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex items-center justify-between h-20">

            <button
              onClick={() => handleNavigate("home")}
              className="text-lg font-semibold text-foreground hover:text-accent transition-colors tracking-tight"
            >
              Keziah Santos
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems[currentLang].map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavigate(item.value)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Language toggle */}
              {/*
              <div className="flex items-center gap-1 bg-[#F3F3F1] rounded-lg p-1">
                {(["pt", "en"] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => onLanguageChange(l)}
                    className={`px-3 py-1 rounded-md transition-all text-sm font-medium ${
                      currentLang === l
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              */}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-black/6 md:hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {navItems[currentLang].map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavigate(item.value)}
                  className="block w-full text-left text-lg text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
