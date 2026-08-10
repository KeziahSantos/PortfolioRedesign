import { motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/Card";
import { useLanguage } from "../context/LanguageContext";

interface SkillItem { name: string; description: string; }

interface AboutContent {
  photo: string | null;
  cvFile: string | null;
  cvFileName: string;
  bio: string[];
  bioEn?: string[];
  differentials: string[];
  differentialsEn?: string[];
  skills: SkillItem[];
}

interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  date: string;
  text: string;
  photo: string | null;
}

interface AboutProps {
  content: AboutContent;
  recommendations: Recommendation[];
}

function Avatar({ name, photo, size = 48 }: { name: string; photo: string | null; size?: number }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const colors = ["#4F5D75", "#6B6B70", "#1A1A1D", "#2D3748"];
  const color = colors[name.charCodeAt(0) % colors.length];

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
        draggable={false}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 text-white font-bold"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 280;
  const isLong = rec.text.length > LIMIT;
  const displayText = expanded || !isLong ? rec.text : rec.text.slice(0, LIMIT) + "…";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-background border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-foreground/20 hover:shadow-md transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar name={rec.name} photo={rec.photo} size={44} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm leading-tight">{rec.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {rec.role}{rec.company ? ` · ${rec.company}` : ""}
          </p>
          {rec.relationship && (
            <p className="text-[11px] text-muted-foreground/70 mt-1 italic">{rec.relationship}</p>
          )}
        </div>
        {/* LinkedIn logo mark */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" className="shrink-0 mt-0.5 opacity-60">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Quote */}
      <div className="relative">
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="absolute -top-1 -left-1 text-muted-foreground/20">
          <path d="M0 14V8.4C0 3.68 2.88 1.04 8.64 0l.96 1.68C6.72 2.32 5.2 3.6 4.8 5.6H8V14H0Zm12 0V8.4C12 3.68 14.88 1.04 20.64 0l.96 1.68c-2.88.64-4.4 1.92-4.8 3.92H20V14h-8Z" fill="currentColor"/>
        </svg>
        <p className="text-sm text-muted-foreground leading-relaxed pl-1">
          {displayText}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="mt-2 text-xs font-medium text-foreground hover:text-accent transition-colors"
          >
            {expanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>

      {/* Date */}
      {rec.date && (
        <p className="text-[11px] text-muted-foreground/60 mt-auto">{rec.date}</p>
      )}
    </motion.div>
  );
}

export function About({ content, recommendations }: AboutProps) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8 md:px-24">

        {/* Intro — photo + bio */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`grid gap-16 items-start mb-24 ${content.photo ? "md:grid-cols-[280px_1fr]" : ""}`}
        >
          {content.photo && (
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="relative w-56 md:w-full overflow-hidden rounded-2xl aspect-[3/4] bg-muted shadow-lg">
                <img src={content.photo} alt="Keziah Santos" className="w-full h-full object-cover" draggable={false} />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <p className="text-xs text-muted-foreground text-center md:text-left tracking-wide uppercase">
                Keziah Santos · Senior Product Designer
              </p>
            </div>
          )}

          <div>
            <h1 className={`font-bold text-foreground mb-8 tracking-tight leading-tight ${content.photo ? "text-3xl md:text-4xl" : "text-3xl md:text-5xl text-center"}`}>
              {lang === "pt" ? "Sobre Mim" : "About Me"}
            </h1>
            <div className="space-y-6">
              {((lang === "en" && content.bioEn && content.bioEn.length > 0) ? content.bioEn : content.bio).map((paragraph, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">{paragraph}</p>
              ))}
            </div>

            {/* CV download */}
            {content.cvFile && (
              <a
                href={content.cvFile}
                download={content.cvFileName}
                className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-xl border border-foreground text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-200 group"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {lang === "pt" ? "Baixar CV" : "Download CV"}
              </a>
            )}
          </div>
        </motion.div>

        {/* Differentials */}
        {content.differentials.length > 0 && (
          <div className="mb-24">
            <h3 className="text-3xl font-semibold text-foreground mb-8 text-center">
              {lang === "pt" ? "Diferenciais" : "Key Differentials"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {((lang === "en" && content.differentialsEn && content.differentialsEn.length > 0) ? content.differentialsEn : content.differentials).map((diff, i) => (
                <motion.div key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card hover={false} className="h-full">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p className="text-foreground text-lg">{diff}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {content.skills.length > 0 && (
          <div className="mb-24">
            <h3 className="text-3xl font-semibold text-foreground mb-8 text-center">
              {lang === "pt" ? "Habilidades" : "Skills"}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {content.skills.map((skill, i) => (
                <motion.div key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="h-full">
                    <h4 className="text-xl font-semibold text-foreground mb-3">{skill.name}</h4>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  {lang === "pt" ? "O que dizem sobre mim" : "What people say"}
                </p>
                <h3 className="text-3xl font-semibold text-foreground">
                  {lang === "pt" ? "Recomendações" : "Recommendations"}
                </h3>
              </div>
              {/* LinkedIn badge */}
              <a
                href="https://www.linkedin.com/in/keziahsantos/details/recommendations/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 text-xs text-muted-foreground border border-border hover:border-foreground/30 px-3 py-2 rounded-lg transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Ver no LinkedIn
              </a>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendations.map(rec => (
                <RecommendationCard key={rec.id} rec={rec} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
