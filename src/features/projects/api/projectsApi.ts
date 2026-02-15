import { supabase } from "@/lib/supabase";
import type { ProjectInput } from "@/features/projects/schemas/projectSchema";
import type { Project } from "@/features/projects/types/project";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function uploadProjectThumbnail(file: File): Promise<string> {
  const sanitizedName = file.name.replace(/\s+/g, "-").toLowerCase();
  const path = `${crypto.randomUUID()}-${sanitizedName}`;
  const { error } = await supabase.storage.from("thumbnails").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("thumbnails").getPublicUrl(path);
  return data.publicUrl;
}

export async function createProject(input: ProjectInput & { thumbnail_url?: string | null }) {
  const { error } = await supabase.from("projects").insert({
    ...input,
    content: input.content ?? "",
    thumbnail_url: input.thumbnail_url ?? null,
  });
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateProject(
  id: string,
  input: ProjectInput & { thumbnail_url?: string | null },
) {
  const { error } = await supabase
    .from("projects")
    .update({
      ...input,
      content: input.content ?? "",
      thumbnail_url: input.thumbnail_url,
    })
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

