import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/Card";
import { uploadBlogCover } from "@/features/blog/api/blogApi";
import { BlogForm } from "@/features/blog/components/BlogForm";
import { useCreateBlogPost } from "@/features/blog/hooks/useBlog";
import type { BlogPostInput } from "@/features/blog/schemas/blogSchema";

export function AdminBlogNewPage() {
  const navigate = useNavigate();
  const createMutation = useCreateBlogPost();

  const handleSubmit = async (values: BlogPostInput & { coverFile: File | null }) => {
    try {
      let coverImageUrl: string | null = null;
      if (values.coverFile) {
        coverImageUrl = await uploadBlogCover(values.coverFile);
      }
      await createMutation.mutateAsync({
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        cover_image_url: coverImageUrl,
      });
      toast.success("Blog post created.");
      navigate("/admin/blog");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create post.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Blog Post</h1>
      <Card>
        <BlogForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
      </Card>
    </div>
  );
}

