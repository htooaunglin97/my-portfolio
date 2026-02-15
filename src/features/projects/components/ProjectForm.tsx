import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  projectFormSchema,
  type ProjectFormInput,
  type ProjectInput,
} from "@/features/projects/schemas/projectSchema";

export type ProjectFormValues = ProjectFormInput;

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit: (values: ProjectInput & { thumbnailFile: File | null }) => Promise<void>;
  isSubmitting: boolean;
}

export function ProjectForm({ defaultValues, onSubmit, isSubmitting }: ProjectFormProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    defaultValues?.thumbnail_url ?? null,
  );
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      description: defaultValues?.description ?? "",
      content: defaultValues?.content ?? "",
      github_url: defaultValues?.github_url ?? "",
      live_url: defaultValues?.live_url ?? "",
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        const thumbnailFile = values.thumbnailFile?.item(0) ?? null;
        await onSubmit({
          title: values.title,
          slug: values.slug,
          description: values.description,
          content: values.content,
          github_url: values.github_url,
          live_url: values.live_url,
          thumbnailFile,
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
        <label className="mb-1 block text-sm">Description</label>
        <Textarea {...form.register("description")} />
        {form.formState.errors.description ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.description.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-1 block text-sm">Markdown Content</label>
        <Textarea className="min-h-48" {...form.register("content")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">GitHub URL</label>
          <Input {...form.register("github_url")} placeholder="https://github.com/username/repo" />
          {form.formState.errors.github_url ? (
            <p className="mt-1 text-xs text-red-300">{form.formState.errors.github_url.message}</p>
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm">Live URL</label>
          <Input {...form.register("live_url")} placeholder="https://your-project.com" />
          {form.formState.errors.live_url ? (
            <p className="mt-1 text-xs text-red-300">{form.formState.errors.live_url.message}</p>
          ) : null}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm">Thumbnail</label>
        <Input
          type="file"
          accept="image/*"
          {...form.register("thumbnailFile", {
            onChange: (event) => {
              const file = (event.target as HTMLInputElement).files?.item(0) ?? null;
              if (file) {
                setThumbnailPreview(URL.createObjectURL(file));
              }
            },
          })}
        />
        {thumbnailPreview ? (
          <img
            src={thumbnailPreview}
            alt="Thumbnail preview"
            className="mt-3 h-36 w-full max-w-md rounded-lg object-cover"
          />
        ) : null}
      </div>
      <Button type="submit" isLoading={isSubmitting}>
        Save Project
      </Button>
    </form>
  );
}
