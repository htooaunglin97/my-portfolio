import { supabase } from "@/lib/supabase";
import type { BlogPostInput } from "@/features/blog/schemas/blogSchema";
import type { BlogPost } from "@/features/blog/types/blogPost";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getBlogPostById(id: string): Promise<BlogPost> {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function uploadBlogCover(file: File): Promise<string> {
  const path = `${crypto.randomUUID()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
  const { error } = await supabase.storage.from("blog-covers").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) {
    throw new Error(error.message);
  }
  const { data } = supabase.storage.from("blog-covers").getPublicUrl(path);
  return data.publicUrl;
}

export async function createBlogPost(input: BlogPostInput & { cover_image_url?: string | null }) {
  const { error } = await supabase.from("blog_posts").insert({
    ...input,
    cover_image_url: input.cover_image_url ?? null,
  });
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateBlogPost(
  id: string,
  input: BlogPostInput & { cover_image_url?: string | null },
) {
  const { error } = await supabase.from("blog_posts").update(input).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

