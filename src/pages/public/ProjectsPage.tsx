import { Container } from "@/components/ui/Container";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProjectsPage() {
  const projectsQuery = useProjects();

  return (
    <Container>
      <Section title="Projects">
        {projectsQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
          </div>
        ) : null}
        {projectsQuery.error ? <ErrorState message={projectsQuery.error.message} /> : null}
        {projectsQuery.data && projectsQuery.data.length > 0 ? <ProjectsGrid projects={projectsQuery.data} /> : null}
        {projectsQuery.data && projectsQuery.data.length === 0 ? (
          <EmptyState message="No projects available yet." />
        ) : null}
      </Section>
    </Container>
  );
}

