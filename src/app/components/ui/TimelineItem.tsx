import { motion } from "motion/react";

interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  description: string[];
  current?: boolean;
}

export function TimelineItem({
  role,
  company,
  period,
  description,
  current = false
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-12 border-l-2 border-border hover:border-accent transition-colors"
    >
      <div
        className={`absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px] ${
          current ? "bg-accent ring-4 ring-accent/20" : "bg-muted-foreground"
        }`}
      />

      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{role}</h3>
          <p className="text-lg text-accent font-medium">{company}</p>
          <p className="text-sm text-muted-foreground mt-1">{period}</p>
        </div>

        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="text-muted-foreground flex gap-2">
              <span className="text-accent mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
