import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { uploadProjectThumbnail } from "@/features/projects/api/projectsApi";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { useProjectById, useUpdateProject } from "@/features/projects/hooks/useProjects";
import type { ProjectInput } from "@/features/projects/schemas/projectSchema";

export function AdminProjectEditPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const projectQuery = useProjectById(id);
  const updateMutation = useUpdateProject(id);

  const handleSubmit = async (values: ProjectInput & { thumbnailFile: File | null }) => {
    if (!projectQuery.data) return;

    try {
      let thumbnailUrl = projectQuery.data.thumbnail_url;
      if (values.thumbnailFile) {
        thumbnailUrl = await uploadProjectThumbnail(values.thumbnailFile);
      }
      await updateMutation.mutateAsync({
        title: values.title,
        slug: values.slug,
        description: values.description,
        content: values.content,
        github_url: values.github_url,
        live_url: values.live_url,
        thumbnail_url: thumbnailUrl,
      });
      toast.success("Project updated.");
      navigate("/admin/projects");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update project.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      {projectQuery.isLoading ? <Skeleton className="h-80 w-full" /> : null}
      {projectQuery.error ? <ErrorState message={projectQuery.error.message} /> : null}
      {projectQuery.data ? (
        <Card>
          <ProjectForm
            defaultValues={{
              title: projectQuery.data.title,
              slug: projectQuery.data.slug,
              description: projectQuery.data.description,
              content: projectQuery.data.content ?? "",
              github_url: projectQuery.data.github_url ?? "",
              live_url: projectQuery.data.live_url ?? "",
              thumbnail_url: projectQuery.data.thumbnail_url ?? undefined,
            }}
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
          />
        </Card>
      ) : null}
    </div>
  );
}

