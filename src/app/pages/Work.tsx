import { motion } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ProjectCard } from "../components/ui/ProjectCard";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

const CHIP_COLORS = [
  { bg: "#F8E8D8", color: "#8C5A3A" },
  { bg: "#DDD4F8", color: "#5A4A8C" },
  { bg: "#D0F0D4", color: "#3A7A48" },
  { bg: "#F8D4E0", color: "#8C4A60" },
  { bg: "#FAF0C8", color: "#7A6800" },
  { bg: "#F0D4BA", color: "#7A4A22" },
  { bg: "#C8EEF0", color: "#2A6A70" },
  { bg: "#E0DCC8", color: "#625E3A" },
];
function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % CHIP_COLORS.length;
}

interface CMSProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

interface WorkProps {
  onNavigate: (page: string, projectId?: string) => void;
  extraProjects?: CMSProject[];
}

export function Work({ onNavigate, extraProjects = [] }: WorkProps) {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(extraProjects.map(p => p.category)))];

  const filteredProjects = filter === "all"
    ? extraProjects
    : extraProjects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <SectionHeader
          eyebrow="Portfolio"
          title={lang === "pt" ? "Todos os Projetos" : "All Projects"}
          description={
            lang === "pt"
              ? "Explore meu trabalho em design de produto, UX research e sistemas de design."
              : "Explore my work in product design, UX research, and design systems."
          }
          align="center"
        />

        {/* Filter */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-3 mb-16 flex-wrap">
            {categories.map(category => {
              const label = category === "all" ? (lang === "pt" ? "Todos" : "All") : category;
              const isActive = filter === category;
              const { bg, color } = CHIP_COLORS[hashStr(category)];
              return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className="px-5 py-2 rounded-full font-medium transition-all text-sm border"
                  style={isActive
                    ? { backgroundColor: bg, color, borderColor: "transparent" }
                    : { backgroundColor: "transparent", color: "#8F8F8F", borderColor: "#E6E3DE" }
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">
              {lang === "pt"
                ? "Nenhum projeto publicado ainda."
                : "No published projects yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  onClick={() => onNavigate("case", project.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
