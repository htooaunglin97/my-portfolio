import { Container } from "@/components/ui/Container";
import { Section } from "@/components/layout/Section";
import { BlogCard } from "@/features/blog/components/BlogCard";
import { useBlogPosts } from "@/features/blog/hooks/useBlog";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

export function BlogPage() {
  const blogQuery = useBlogPosts();

  return (
    <Container>
      <Section title="Blog">
        {blogQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        ) : null}
        {blogQuery.error ? <ErrorState message={blogQuery.error.message} /> : null}
        {blogQuery.data && blogQuery.data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogQuery.data.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : null}
        {blogQuery.data && blogQuery.data.length === 0 ? <EmptyState message="No posts yet." /> : null}
      </Section>
    </Container>
  );
}

