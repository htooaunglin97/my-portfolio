import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { useBlogPosts } from "@/features/blog/hooks/useBlog";
import { BlogCard } from "@/features/blog/components/BlogCard";

const skills = [
  "TypeScript",
  "React",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Java",
  "Spring Boot",
  "Docker",
];

export function HomePage() {
  const projectsQuery = useProjects();
  const blogQuery = useBlogPosts();

  return (
    <Container>
      <Section className="pt-20">
        <div className="max-w-3xl space-y-6">
          <h3 className="text-1xl font-bold leading-tight sm:text-5xl">
            Htoo Aung Lin
          </h3>
          <p className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs text-primary">
            Full-Stack Developer
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Building robust products from backend architecture to polished UX.
          </h1>
          <p className="text-lg text-muted">
            I design and ship scalable web apps with React, TypeScript, and backend services powered by Spring Boot.
          </p>
          <div className="flex gap-3">
            <Link to="/projects">
              <Button>View Projects</Button>
            </Link>
            <a href="#contact">
              <Button variant="secondary">Contact Me</Button>
            </a>
          </div>
        </div>
      </Section>

      <Section id="about" title="About">
        <p className="max-w-3xl text-slate-300">
          I focus on maintainable systems, clean domain boundaries, and interfaces that feel responsive and
          intentional. This portfolio showcases selected production projects and technical writing from my
          day-to-day engineering work.
        </p>
      </Section>

      <Section id="skills" title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Featured Projects">
        {projectsQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
          </div>
        ) : null}
        {projectsQuery.error ? <ErrorState message={projectsQuery.error.message} /> : null}
        {projectsQuery.data && projectsQuery.data.length > 0 ? (
          <ProjectsGrid projects={projectsQuery.data.slice(0, 3)} />
        ) : null}
        {projectsQuery.data && projectsQuery.data.length === 0 ? (
          <EmptyState message="No projects published yet." />
        ) : null}
        <div className="mt-6">
          <Link to="/projects">
            <Button variant="secondary">See all projects</Button>
          </Link>
        </div>
      </Section>

      <Section id="blog" title="Latest Posts">
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
            {blogQuery.data.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : null}
        {blogQuery.data && blogQuery.data.length === 0 ? (
          <EmptyState message="No blog posts published yet." />
        ) : null}
        <div className="mt-6">
          <Link to="/blog">
            <Button variant="secondary">Read more</Button>
          </Link>
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </Section>
    </Container>
  );
}

