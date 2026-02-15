import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  getProjects,
  updateProject,
} from "@/features/projects/api/projectsApi";
import type { ProjectInput } from "@/features/projects/schemas/projectSchema";

const PROJECTS_QUERY_KEY = ["projects"] as const;

export function useProjects() {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: getProjects,
  });
}

export function useProjectBySlug(slug: string) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, "slug", slug] as const,
    queryFn: () => getProjectBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useProjectById(id: string) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, "id", id] as const,
    queryFn: () => getProjectById(id),
    enabled: Boolean(id),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ProjectInput & { thumbnail_url?: string | null }) => createProject(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ProjectInput & { thumbnail_url?: string | null }) => updateProject(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: [...PROJECTS_QUERY_KEY, "id", id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

