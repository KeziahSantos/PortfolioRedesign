import { motion } from "motion/react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignClass} gap-4 mb-12`}
    >
      {eyebrow && (
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          {eyebrow}
        </span>
      )}

      <h2 className="text-5xl font-bold text-foreground">
        {title}
      </h2>

      {description && (
        <p className="text-xl text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
