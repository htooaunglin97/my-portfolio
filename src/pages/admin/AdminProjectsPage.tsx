import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { useDeleteProject, useProjects } from "@/features/projects/hooks/useProjects";

export function AdminProjectsPage() {
  const projectsQuery = useProjects();
  const deleteMutation = useDeleteProject();

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Project deleted.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link to="/admin/projects/new">
          <Button>New Project</Button>
        </Link>
      </div>

      {projectsQuery.error ? <ErrorState message={projectsQuery.error.message} /> : null}
      {projectsQuery.data && projectsQuery.data.length === 0 ? (
        <EmptyState message="No projects found." />
      ) : null}
      <div className="space-y-3">
        {projectsQuery.data?.map((project) => (
          <Card key={project.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-muted">{project.slug}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/projects/${project.id}/edit`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button variant="danger" onClick={() => void handleDelete(project.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

