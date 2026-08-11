import { motion } from "motion/react";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { portfolioData } from "../data/portfolio";

export function Contact() {
  const { lang } = useLanguage();
  const data = portfolioData[lang].contact;

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8 md:px-24">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            {data.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Email */}
          <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <a
                href={`mailto:${data.email}`}
                className="text-lg font-medium text-foreground hover:text-accent transition-colors"
              >
                {data.email}
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/keziahsantos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-foreground hover:text-accent transition-colors"
              >
                linkedin.com/in/keziahsantos
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {lang === "pt" ? "Localização" : "Location"}
              </p>
              <p className="text-lg font-medium text-foreground">
                {data.location}
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
