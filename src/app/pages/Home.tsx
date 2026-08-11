import { motion } from "motion/react";
import { ProjectCard } from "../components/ui/ProjectCard";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { portfolioData } from "../data/portfolio";

interface CMSProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

interface HomeProps {
  onNavigate: (page: string, projectId?: string) => void;
  extraProjects?: CMSProject[];
  heroTitle?: string;
  heroSubtitle?: string;
  aboutBio?: string;
  aboutPhoto?: string | null;
  aboutCvFile?: string | null;
  aboutCvFileName?: string;
}

export function Home({ onNavigate, extraProjects = [], heroTitle, heroSubtitle, aboutBio, aboutPhoto, aboutCvFile, aboutCvFileName }: HomeProps) {
  const { lang } = useLanguage();
  const data = portfolioData[lang];
  const featuredProjects = extraProjects.slice(0, 4);

  return (
    <div className="min-h-screen">

      {/* ─── HERO — light gray band ────────────────────────────────────────────
          Very light gray, almost white. Dark text. First colour band.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-[#EEECEA] pt-40 pb-28 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            {/* Eyebrow */}
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-8 font-medium">
              Senior Product Designer
            </p>

            <h1 className="text-foreground mb-8 leading-tight">
              {heroTitle || data.hero.title}
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
              {heroSubtitle || data.hero.subtitle}
            </p>

            <Button onClick={() => onNavigate("work")}>{data.hero.cta.primary}</Button>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS — pure white band ───────────────────────────────
          Clean contrast after the dark hero. Cards stand out on white.
      ──────────────────────────────────────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="bg-card py-24 px-8 md:px-24">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow={lang === "pt" ? "Projetos em destaque" : "Featured work"}
              title={lang === "pt" ? "Casos selecionados" : "Selected cases"}
              description={
                lang === "pt"
                  ? "Projetos que demonstram minha abordagem estratégica e execução em design de produto."
                  : "Projects that demonstrate my strategic approach and execution in product design."
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
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

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button variant="secondary" onClick={() => onNavigate("work")}>
                {lang === "pt" ? "Ver todos os projetos" : "View all projects"}
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── ABOUT PREVIEW — soft gray band ───────────────────────────────────
          Third colour: secondary gray — quiet contrast after the white section.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-secondary py-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-12 md:gap-16 items-center ${aboutPhoto ? "md:grid-cols-[220px_1fr]" : "md:grid-cols-2"}`}>

            {/* Photo */}
            {aboutPhoto && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex justify-center md:justify-start"
              >
                <div className="w-44 md:w-full overflow-hidden rounded-2xl aspect-[3/4] bg-muted shadow-md">
                  <img
                    src={aboutPhoto}
                    alt="Keziah Santos"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </motion.div>
            )}

            {/* Text */}
            <motion.div
              initial={{ x: aboutPhoto ? 0 : -40, y: aboutPhoto ? 20 : 0, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-foreground mb-6">
                {lang === "pt" ? "Sobre mim" : "About me"}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {aboutBio ?? data.about.bio[0]}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Button onClick={() => onNavigate("about")}>
                  {lang === "pt" ? "Saiba mais" : "Learn more"}
                </Button>
                {aboutCvFile && (
                  <a
                    href={aboutCvFile}
                    download={aboutCvFileName ?? "CV.pdf"}
                    className="inline-flex items-center gap-2 px-5 py-4 rounded-lg border border-border text-foreground text-sm font-medium hover:border-foreground hover:bg-muted transition-all duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    {lang === "pt" ? "Baixar CV" : "Download CV"}
                  </a>
                )}
              </div>
            </motion.div>

            {/* Differentials — only when no photo */}
            {!aboutPhoto && (
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-5"
              >
                {data.about.differentials.map((diff, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    <p className="text-foreground">{diff}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
