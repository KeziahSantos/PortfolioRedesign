import { motion } from "motion/react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  const baseStyles = "bg-white border border-border rounded-2xl p-6 transition-all duration-300";

  return (
    <motion.div
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: "var(--shadow-hover)"
      } : {}}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
