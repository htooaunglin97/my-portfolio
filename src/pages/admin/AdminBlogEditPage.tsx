import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { uploadBlogCover } from "@/features/blog/api/blogApi";
import { BlogForm } from "@/features/blog/components/BlogForm";
import { useBlogPostById, useUpdateBlogPost } from "@/features/blog/hooks/useBlog";
import type { BlogPostInput } from "@/features/blog/schemas/blogSchema";

export function AdminBlogEditPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const postQuery = useBlogPostById(id);
  const updateMutation = useUpdateBlogPost(id);

  const handleSubmit = async (values: BlogPostInput & { coverFile: File | null }) => {
    if (!postQuery.data) return;

    try {
      let coverImageUrl = postQuery.data.cover_image_url;
      if (values.coverFile) {
        coverImageUrl = await uploadBlogCover(values.coverFile);
      }
      await updateMutation.mutateAsync({
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        cover_image_url: coverImageUrl,
      });
      toast.success("Blog post updated.");
      navigate("/admin/blog");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update post.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      {postQuery.isLoading ? <Skeleton className="h-80 w-full" /> : null}
      {postQuery.error ? <ErrorState message={postQuery.error.message} /> : null}
      {postQuery.data ? (
        <Card>
          <BlogForm
            defaultValues={{
              title: postQuery.data.title,
              slug: postQuery.data.slug,
              excerpt: postQuery.data.excerpt,
              content: postQuery.data.content,
              cover_image_url: postQuery.data.cover_image_url ?? undefined,
            }}
            onSubmit={handleSubmit}
            isSubmitting={updateMutation.isPending}
          />
        </Card>
      ) : null}
    </div>
  );
}

