export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  thumbnail_url: string | null;
  github_url: string | null;
  live_url: string | null;
  created_at: string;
  updated_at: string;
}

