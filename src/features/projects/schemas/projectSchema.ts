import { z } from "zod";

const optionalUrl = z
  .union([z.string().url("Provide a valid URL."), z.literal("")])
  .transform((value) => (value === "" ? null : value));

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required."),
  slug: z
    .string()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case for slug."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  content: z.string().optional(),
  github_url: optionalUrl,
  live_url: optionalUrl,
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const projectFormSchema = projectSchema.extend({
  thumbnailFile: z.custom<FileList | undefined>().optional(),
  thumbnail_url: z.string().nullable().optional(),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;
