import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { useBlogPosts, useDeleteBlogPost } from "@/features/blog/hooks/useBlog";

export function AdminBlogPage() {
  const postsQuery = useBlogPosts();
  const deleteMutation = useDeleteBlogPost();

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Post deleted.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed.";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link to="/admin/blog/new">
          <Button>New Post</Button>
        </Link>
      </div>

      {postsQuery.error ? <ErrorState message={postsQuery.error.message} /> : null}
      {postsQuery.data && postsQuery.data.length === 0 ? <EmptyState message="No blog posts found." /> : null}

      <div className="space-y-3">
        {postsQuery.data?.map((post) => (
          <Card key={post.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-muted">{post.slug}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/blog/${post.id}/edit`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button variant="danger" onClick={() => void handleDelete(post.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

