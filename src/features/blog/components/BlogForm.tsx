import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  blogPostFormSchema,
  type BlogPostFormInput,
  type BlogPostInput,
} from "@/features/blog/schemas/blogSchema";

export type BlogFormValues = BlogPostFormInput;

interface BlogFormProps {
  defaultValues?: Partial<BlogFormValues>;
  onSubmit: (values: BlogPostInput & { coverFile: File | null }) => Promise<void>;
  isSubmitting: boolean;
}

export function BlogForm({ defaultValues, onSubmit, isSubmitting }: BlogFormProps) {
  const [coverPreview, setCoverPreview] = useState<string | null>(defaultValues?.cover_image_url ?? null);
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      excerpt: defaultValues?.excerpt ?? "",
      content: defaultValues?.content ?? "",
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        const coverFile = values.coverFile?.item(0) ?? null;
        await onSubmit({
          title: values.title,
          slug: values.slug,
          excerpt: values.excerpt,
          content: values.content,
          coverFile,
        });
      })}
    >
      <div>
        <label className="mb-1 block text-sm">Title</label>
        <Input {...form.register("title")} />
        {form.formState.errors.title ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.title.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm">Slug</label>
        <Input {...form.register("slug")} />
        {form.formState.errors.slug ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.slug.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm">Excerpt</label>
        <Textarea {...form.register("excerpt")} />
        {form.formState.errors.excerpt ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.excerpt.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm">Markdown Content</label>
        <Textarea className="min-h-64" {...form.register("content")} />
        {form.formState.errors.content ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.content.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm">Cover Image</label>
        <Input
          type="file"
          accept="image/*"
          {...form.register("coverFile", {
            onChange: (event) => {
              const file = (event.target as HTMLInputElement).files?.item(0) ?? null;
              if (file) {
                setCoverPreview(URL.createObjectURL(file));
              }
            },
          })}
        />
        {coverPreview ? (
          <img src={coverPreview} alt="Cover preview" className="mt-3 h-44 w-full rounded-lg object-cover" />
        ) : null}
      </div>
      <Button type="submit" isLoading={isSubmitting}>
        Save Post
      </Button>
    </form>
  );
}
