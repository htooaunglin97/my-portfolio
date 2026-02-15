import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/features/projects/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}>
      <Card className="h-full">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="mb-4 h-44 w-full rounded-lg object-cover"
            loading="lazy"
          />
        ) : (
          <div className="mb-4 flex h-44 items-center justify-center rounded-lg bg-slate-800 text-muted">
            No thumbnail
          </div>
        )}
        <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
        <p className="mb-5 text-sm text-muted">{project.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/projects/${project.slug}`}>
            <Button variant="secondary">Details</Button>
          </Link>
          {project.github_url ? (
            <a href={project.github_url} target="_blank" rel="noreferrer">
              <Button variant="ghost">GitHub</Button>
            </a>
          ) : null}
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noreferrer">
              <Button variant="ghost">Live Site</Button>
            </a>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}
