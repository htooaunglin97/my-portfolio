import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogPostBySlug,
  getBlogPosts,
  updateBlogPost,
} from "@/features/blog/api/blogApi";
import type { BlogPostInput } from "@/features/blog/schemas/blogSchema";

const BLOG_QUERY_KEY = ["blog-posts"] as const;

export function useBlogPosts() {
  return useQuery({
    queryKey: BLOG_QUERY_KEY,
    queryFn: getBlogPosts,
  });
}

export function useBlogPostBySlug(slug: string) {
  return useQuery({
    queryKey: [...BLOG_QUERY_KEY, "slug", slug] as const,
    queryFn: () => getBlogPostBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useBlogPostById(id: string) {
  return useQuery({
    queryKey: [...BLOG_QUERY_KEY, "id", id] as const,
    queryFn: () => getBlogPostById(id),
    enabled: Boolean(id),
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BlogPostInput & { cover_image_url?: string | null }) => createBlogPost(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEY });
    },
  });
}

export function useUpdateBlogPost(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BlogPostInput & { cover_image_url?: string | null }) => updateBlogPost(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: [...BLOG_QUERY_KEY, "id", id] });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEY });
    },
  });
}

