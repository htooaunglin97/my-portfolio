import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import type { BlogPost } from "@/features/blog/types/blogPost";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full">
      {post.cover_image_url ? (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="mb-4 h-44 w-full rounded-lg object-cover"
          loading="lazy"
        />
      ) : null}
      <p className="mb-2 text-xs text-muted">{format(new Date(post.created_at), "MMM d, yyyy")}</p>
      <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
      <p className="mb-4 text-sm text-muted">{post.excerpt}</p>
      <Link to={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
        Read article
      </Link>
    </Card>
  );
}
