import { motion } from "motion/react";
import { Tag } from "../components/ui/Tag";
import { Button } from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { portfolioData } from "../data/portfolio";

interface CaseDetailProps {
  projectId: string;
  onNavigate: (page: string) => void;
}

export function CaseDetail({ projectId, onNavigate }: CaseDetailProps) {
  const { lang } = useLanguage();
  const data = portfolioData[lang];
  const project = data.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => onNavigate("work")}>Back to projects</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-8 md:px-24 mb-8">
        <button
          onClick={() => onNavigate("work")}
          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {lang === "pt" ? "Voltar aos projetos" : "Back to projects"}
        </button>
      </div>

      {/* Hero */}
      <section className="px-8 md:px-24 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {project.hero.title}
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-3xl">
              {project.hero.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 p-8 bg-secondary/30 rounded-2xl">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {lang === "pt" ? "Cliente" : "Client"}
                </p>
                <p className="text-lg font-medium text-foreground">
                  {project.hero.client}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {lang === "pt" ? "Papel" : "Role"}
                </p>
                <p className="text-lg font-medium text-foreground">
                  {project.hero.role}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {lang === "pt" ? "Ano" : "Year"}
                </p>
                <p className="text-lg font-medium text-foreground">
                  {project.hero.year}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Context */}
      <section className="px-8 md:px-24 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                {project.context.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.context.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-video bg-secondary rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="px-8 md:px-24 mb-24 bg-secondary/30 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {project.challenge.title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.challenge.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="px-8 md:px-24 mb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
            {project.process.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.name}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="px-8 md:px-24 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-video bg-secondary rounded-2xl order-2 md:order-1"
            />

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                {project.solution.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {project.solution.description}
              </p>
              <ul className="space-y-3">
                {project.solution.features.map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="px-8 md:px-24 mb-24 bg-accent/5 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
              {project.impact.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {project.impact.results.map((result, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border"
                >
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <p className="text-foreground text-lg">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <Button onClick={() => onNavigate("work")}>
            {lang === "pt" ? "Ver mais projetos" : "View more projects"}
          </Button>
        </div>
      </section>
    </div>
  );
}
