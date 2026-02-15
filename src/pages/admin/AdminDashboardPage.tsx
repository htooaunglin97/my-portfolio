import { Card } from "@/components/ui/Card";
import { useBlogPosts } from "@/features/blog/hooks/useBlog";
import { useMessages } from "@/features/contact/hooks/useMessages";
import { useProjects } from "@/features/projects/hooks/useProjects";

export function AdminDashboardPage() {
  const projectsQuery = useProjects();
  const blogQuery = useBlogPosts();
  const messagesQuery = useMessages();

  const stats = [
    { label: "Projects", value: projectsQuery.data?.length ?? 0 },
    { label: "Blog Posts", value: blogQuery.data?.length ?? 0 },
    { label: "Messages", value: messagesQuery.data?.length ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

