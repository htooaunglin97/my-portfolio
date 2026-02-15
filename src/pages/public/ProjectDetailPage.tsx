import { Link, useParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/layout/Section";
import { useProjectBySlug } from "@/features/projects/hooks/useProjects";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { MarkdownRenderer } from "@/services/markdown";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const projectQuery = useProjectBySlug(slug);

  return (
    <Container>
      <Section>
        <Link to="/projects">
          <Button variant="ghost">&lt;- Back to projects</Button>
        </Link>
      </Section>
      <Section>
        {projectQuery.isLoading ? <Skeleton className="h-96" /> : null}
        {projectQuery.error ? <ErrorState message={projectQuery.error.message} /> : null}
        {projectQuery.data ? (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{projectQuery.data.title}</h1>
              <p className="text-muted">{projectQuery.data.description}</p>
            </div>
            {projectQuery.data.thumbnail_url ? (
              <img
                src={projectQuery.data.thumbnail_url}
                alt={projectQuery.data.title}
                className="h-80 w-full rounded-xl object-cover"
              />
            ) : null}
            {projectQuery.data.content ? <MarkdownRenderer content={projectQuery.data.content} /> : null}
            <div className="flex flex-wrap gap-2">
              {projectQuery.data.github_url ? (
                <a href={projectQuery.data.github_url} target="_blank" rel="noreferrer">
                  <Button variant="secondary">GitHub</Button>
                </a>
              ) : null}
              {projectQuery.data.live_url ? (
                <a href={projectQuery.data.live_url} target="_blank" rel="noreferrer">
                  <Button>Live Site</Button>
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </Section>
    </Container>
  );
}
