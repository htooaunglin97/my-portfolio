import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z
    .string()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case for slug."),
  excerpt: z.string().min(12, "Excerpt must be at least 12 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const blogPostFormSchema = blogPostSchema.extend({
  coverFile: z.custom<FileList | undefined>().optional(),
  cover_image_url: z.string().nullable().optional(),
});

export type BlogPostFormInput = z.infer<typeof blogPostFormSchema>;
