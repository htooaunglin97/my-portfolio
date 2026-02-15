# Developer Portfolio (React + Supabase)

Production-ready personal portfolio web application built with:

- React + Vite + TypeScript
- Supabase (Auth + PostgreSQL + Storage)
- TailwindCSS
- React Router
- TanStack Query
- Zod + React Hook Form
- Framer Motion

## Project Structure

```text
.
|-- supabase/
|   `-- migrations/
|       `-- 001_init.sql
|-- src/
|   |-- app/
|   |   |-- providers/
|   |   `-- routes/
|   |-- components/
|   |   |-- feedback/
|   |   |-- layout/
|   |   `-- ui/
|   |-- features/
|   |   |-- auth/
|   |   |-- blog/
|   |   |-- contact/
|   |   `-- projects/
|   |-- hooks/
|   |-- lib/
|   |-- pages/
|   |   |-- admin/
|   |   `-- public/
|   |-- services/
|   `-- types/
|-- .env.example
|-- package.json
|-- tailwind.config.ts
|-- vite.config.ts
`-- vercel.json
```

## Environment Variables

Create `.env`:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

