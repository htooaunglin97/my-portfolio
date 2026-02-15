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

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run SQL migration:

- Open Supabase SQL Editor.
- Execute file: `supabase/migrations/001_init.sql`.

3. Create admin auth user:

- Go to Supabase Dashboard -> Authentication -> Users.
- Create user manually (email/password).

4. Add that user to `admin_users`:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

5. Disable public signups:

- Supabase Dashboard -> Authentication -> Providers -> Email.
- Turn off `Enable email signups`.

6. Run app:

```bash
npm run dev
```

## Routes

### Public

- `/`
- `/projects`
- `/projects/:slug`
- `/blog`
- `/blog/:slug`

### Admin

- `/admin/login`
- `/admin`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/:id/edit`
- `/admin/blog`
- `/admin/blog/new`
- `/admin/blog/:id/edit`
- `/admin/messages`

## Supabase Policies Included

Migration includes:

- Public read on `projects`
- Public read on `blog_posts`
- Admin-only insert/update/delete on `projects` and `blog_posts`
- Anyone can insert `messages`
- Admin-only read `messages`
- Public read for `thumbnails` and `blog-covers` buckets
- Authenticated upload/update/delete for those buckets

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Import repository in Vercel.
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy.
