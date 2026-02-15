import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends PropsWithChildren {
  id?: string;
  title?: string;
  className?: string;
}

export function Section({ id, title, className, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("py-14 sm:py-20", className)}
    >
      {title ? <h2 className="mb-8 text-2xl font-semibold">{title}</h2> : null}
      {children}
    </motion.section>
  );
}

