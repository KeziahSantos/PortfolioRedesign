import { motion } from "motion/react";
import { Tag } from "./Tag";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  onClick: () => void;
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  onClick
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {image && (
        <div className="aspect-[16/9] bg-secondary overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-4 transition-all">
          <span>View case study</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
