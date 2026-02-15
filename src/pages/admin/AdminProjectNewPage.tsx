import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/Card";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { useCreateProject } from "@/features/projects/hooks/useProjects";
import { uploadProjectThumbnail } from "@/features/projects/api/projectsApi";
import type { ProjectInput } from "@/features/projects/schemas/projectSchema";

export function AdminProjectNewPage() {
  const navigate = useNavigate();
  const createProjectMutation = useCreateProject();

  const handleSubmit = async (values: ProjectInput & { thumbnailFile: File | null }) => {
    try {
      let thumbnailUrl: string | null = null;
      if (values.thumbnailFile) {
        thumbnailUrl = await uploadProjectThumbnail(values.thumbnailFile);
      }
      await createProjectMutation.mutateAsync({
        title: values.title,
        slug: values.slug,
        description: values.description,
        content: values.content,
        github_url: values.github_url,
        live_url: values.live_url,
        thumbnail_url: thumbnailUrl,
      });
      toast.success("Project created.");
      navigate("/admin/projects");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create project.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Project</h1>
      <Card>
        <ProjectForm onSubmit={handleSubmit} isSubmitting={createProjectMutation.isPending} />
      </Card>
    </div>
  );
}

