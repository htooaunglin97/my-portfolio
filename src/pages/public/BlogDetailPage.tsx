import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/layout/Section";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useBlogPostBySlug } from "@/features/blog/hooks/useBlog";
import { MarkdownRenderer } from "@/services/markdown";

export function BlogDetailPage() {
  const { slug = "" } = useParams();
  const postQuery = useBlogPostBySlug(slug);

  return (
    <Container>
      <Section>
        <Link to="/blog">
          <Button variant="ghost">&lt;- Back to blog</Button>
        </Link>
      </Section>
      <Section>
        {postQuery.isLoading ? <Skeleton className="h-96" /> : null}
        {postQuery.error ? <ErrorState message={postQuery.error.message} /> : null}
        {postQuery.data ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted">{format(new Date(postQuery.data.created_at), "MMMM d, yyyy")}</p>
              <h1 className="text-4xl font-bold">{postQuery.data.title}</h1>
              <p className="text-slate-300">{postQuery.data.excerpt}</p>
            </div>
            {postQuery.data.cover_image_url ? (
              <img
                src={postQuery.data.cover_image_url}
                alt={postQuery.data.title}
                className="h-80 w-full rounded-xl object-cover"
              />
            ) : null}
            <MarkdownRenderer content={postQuery.data.content} />
          </div>
        ) : null}
      </Section>
    </Container>
  );
}
