import { SectionHeader } from "../components/ui/SectionHeader";
import { TimelineItem } from "../components/ui/TimelineItem";
import { useLanguage } from "../context/LanguageContext";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string[];
  descriptionEn?: string[];
}

interface ExperienceProps {
  items: ExperienceItem[];
}

export function Experience({ items }: ExperienceProps) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-8 md:px-24">
        <SectionHeader
          eyebrow={lang === "pt" ? "Minha jornada" : "My journey"}
          title={lang === "pt" ? "Experiência Profissional" : "Professional Experience"}
          description={
            lang === "pt"
<<<<<<< HEAD
              ? "Mais de 20 anos criando produtos digitais que fazem a diferença."
              : "Over 20 years creating digital products that make a difference."
=======
              ? "Mais de 8 anos criando produtos digitais que fazem a diferença."
              : "Over 8 years creating digital products that make a difference."
>>>>>>> 685d931351716fe5c007a93328cec9c978e4a597
          }
        />

        <div className="mt-16">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              {lang === "pt" ? "Nenhuma experiência cadastrada ainda." : "No experience entries yet."}
            </p>
          ) : (
            items.map(exp => (
              <TimelineItem
                key={exp.id}
                role={exp.role}
                company={exp.company}
                period={exp.period}
                description={(lang === "en" && exp.descriptionEn && exp.descriptionEn.length > 0) ? exp.descriptionEn : exp.description}
                current={exp.current}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
